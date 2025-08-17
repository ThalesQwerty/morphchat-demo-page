export type RecursivePartial<T> = {
    [K in keyof T]?: T[K] extends object ? RecursivePartial<T[K]> : T[K];
};