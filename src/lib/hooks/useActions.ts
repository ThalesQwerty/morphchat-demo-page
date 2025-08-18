import { useMemo } from "react";
import { FilledWidgetConfig } from "../types/WidgetConfig";
import { ChatCompletionMessageToolCall } from "openai/resources/chat";
import { LLM } from "../bot/LLM";

export function useActions(config: FilledWidgetConfig) {
    const { prompt } = config;

    const actions = useMemo(() => prompt?.actions?.filter(action => !action.disabled).map(action => <const>({
        type: "function",
        function: {
            name: action.name,
            description: action.description,
            parameters: {
                type: "object",
                properties: action.parameters,
                required: Object.keys(action.parameters ?? {}).filter(key => action.parameters?.[key]?.required),
                additionalProperties: false
            }
        }
    })), [prompt?.actions]);

    async function handleToolCalls(
        calls: ChatCompletionMessageToolCall[] & { type: "function" }[],
        llm: LLM
    ) {
        const promises: any[] = [];

        for (const item of calls ?? []) {
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