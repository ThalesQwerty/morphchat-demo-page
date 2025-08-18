import OpenAI from "openai";
import { ChatModel, ChatCompletionMessageParam, ChatCompletionTool, ChatCompletionMessageToolCall } from "openai/resources";
import { Timeout } from "./Timeout";
import { LLMError } from "./LLMError";
import { LLM_DEFAULTS } from "./constants";

export type LLM = Awaited<ReturnType<typeof createLLM>>;

export function createLLM(
    apiKey: string,
    instructions: string = LLM_DEFAULTS.PROMPT,
    model: ChatModel = LLM_DEFAULTS.MODEL,
    timeout: number = LLM_DEFAULTS.TIMEOUT
) {
    const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true
    });

    const messages: ChatCompletionMessageParam[] = [
        {
            role: "system",
            content: instructions
        }
    ];

    const llm = {
        apiKey,
        instructions,
        model,
        timeout,
        messages,
		setInstructions(newInstructions: string) {
			llm.messages[0] = {
				role: "system",
				content: newInstructions
			}
		},
        async submit(tools?: ChatCompletionTool[]) {
            return Timeout(async () => {
                const completion = await openai.chat.completions.create({
                    model: llm.model,
                    messages: llm.messages,
                    max_tokens: 3000,
                    tools
                });

                const response = completion.choices[0].message.content;
                const toolCalls = completion.choices[0].message.tool_calls;

                llm.messages.push({ role: "assistant", content: response, tool_calls: toolCalls });
                
                return {
                    response,
                    toolCalls: toolCalls as typeof toolCalls & { type: "function" }[]
                };
            }, llm.timeout, LLMError.Timeout(llm.timeout));
        },
        addToolResult(call: ChatCompletionMessageToolCall, result: unknown) {
            llm.messages.push({
                role: "tool",
                content: JSON.stringify(result),
                tool_call_id: call.id
            });
        }
    };

    return llm;
}