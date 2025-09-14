export type TrueKeys<T> = {
  [K in keyof T]-?: K extends string ? (T[K] extends true ? K : never) : never;
}[keyof T];

export type KeysToArray<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K][];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnionToMap<U extends Record<string, any>, K extends keyof U> = {
  [S in U as S[K]]: S;
};
