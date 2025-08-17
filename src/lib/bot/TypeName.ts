export type TypeName = "string" | "number" | "integer" | "boolean" | "object" | "array" | "null";

export type NameToType<T extends TypeName> =
    T extends "string" ? string
    : T extends "number" | "integer" ? number
    : T extends "boolean" ? boolean
    : T extends "object" ? Record<string, unknown>
    : T extends "array" ? unknown[]
    : T extends "null" ? null
    : never;

type StringName<T> = T extends string ? "string" : never;
type NumberName<T> = T extends number ? "number" : never;
type BooleanName<T> = T extends boolean ? "boolean" : never;
type ArrayName<T> = T extends any[] ? "array" : never;
type ObjectName<T> = T extends Record<string, unknown> ? "object" : never;
type NullName<T> = T extends null ? "null" : never;

export type TypeToName<T> = StringName<T> | NumberName<T> | BooleanName<T> | ArrayName<T> | ObjectName<T> | NullName<T>;