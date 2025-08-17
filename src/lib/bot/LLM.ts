import OpenAI from "openai";
import { ChatModel, ChatCompletionMessageParam } from "openai/resources";
import { Timeout } from "./Timeout";
import { LLMError } from "./LLMError";

export class LLM {
	public readonly DEFAULT_TIMEOUT = 30000;
    public readonly DEFAULT_MODEL = "gpt-4o-mini";
    public readonly DEFAULT_PROMPT = "You are a helpful assistant. Give short and concise answers.";

	private openai: OpenAI;

	public messages: ChatCompletionMessageParam[] = [];
    
	constructor(
        public readonly apiKey: string,
		public readonly instructions: string = this.DEFAULT_PROMPT,
		public model: ChatModel = this.DEFAULT_MODEL,
		public timeout = this.DEFAULT_TIMEOUT
	) {
        this.openai = new OpenAI({
            apiKey: this.apiKey,
			dangerouslyAllowBrowser: true
        });

        this.messages.push({
            role: "system",
            content: this.instructions
        });
	}

	async submit<T extends string = string>(): Promise<T> {
		return Timeout(async () => {
			const completion = await this.openai.chat.completions.create({
				model: this.model,
				messages: this.messages,
				max_tokens: 3000
			});

			const response = completion.choices[0].message.content;

            // TO-DO: add tool calls
            // const toolCalls = completion.choices[0].message.tool_calls;

			if (!response) throw LLMError.EmptyResponse();

			this.messages.push({ role: "assistant", content: response });

			return response as T;
		}, this.timeout, LLMError.Timeout(this.timeout));
    }
} 