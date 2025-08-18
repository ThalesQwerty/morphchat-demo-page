import { useMemo } from "react";
import { FilledWidgetConfig } from "../types/WidgetConfig";
import { ChatCompletionMessageToolCall } from "openai/resources/chat";
import { LLM } from "../bot/LLM";

export function useActions(config: FilledWidgetConfig) {
    const { prompt } = config;

    const actions = useMemo(() => prompt?.actions?.filter(action => !action.disabled).map(action => {
        // Ensure parameters are properly structured
        const properties: any = {};
        const required: string[] = [];
        
        if (action.parameters) {
            Object.entries(action.parameters).forEach(([key, param]) => {
                properties[key] = {
                    type: param.type,
                    ...(param.description && { description: param.description }),
                    ...(param.enum && { enum: param.enum })
                };
                
                if (param.required === true) {
                    required.push(key);
                }
            });
        }
        
        return <const>{
            type: "function",
            function: {
                name: action.name,
                description: action.description,
                parameters: {
                    type: "object",
                    properties,
                    ...(required.length > 0 && { required }),
                    additionalProperties: false
                }
            }
        };
    }), [prompt?.actions]);

    async function handleToolCalls(
        calls: ChatCompletionMessageToolCall[] & { type: "function" }[],
        llm: LLM
    ) {
        const promises: any[] = [];

        for (const item of calls ?? []) {
            if (item.type !== "function") continue;

            const action = prompt?.actions?.find(action => action.name === item.function.name);

            if (!action) continue;

            const args = JSON.parse(item.function.arguments ?? "{}");

            promises.push((async () => {
                const result = await action.function(args);
                llm.addToolResult(item, result);
                return result;
            })());
        }

        const results =  await Promise.all(promises);

        return results;
    }

    return {
        actions,
        handleToolCalls
    }
}