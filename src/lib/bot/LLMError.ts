export class LLMError extends Error {
    static Timeout(ms: number) {
        return new LLMError(`The model didn't respond in ${ms}ms`);
    }

    static EmptyResponse() {
        return new LLMError("The model returned an empty response");
    }
}