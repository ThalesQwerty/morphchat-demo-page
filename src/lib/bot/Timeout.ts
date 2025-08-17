export function Timeout<
    C extends (...args: any[]) => any,
    E = unknown
>(callback: C, timeout: number, error?: E): Promise<ReturnType<C>> {
    return new Promise(async (resolve, reject) => {
        const countdown = setTimeout(() => {
            reject(error || new Error("Timeout"));
        }, timeout);

        try {
            const result = await callback();
            clearTimeout(countdown);
            resolve(result);
        } catch (error) {
            clearTimeout(countdown);
            reject(error);
        }
    });
}