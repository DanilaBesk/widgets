import type { RemoveUndefinedKeys } from './utility-types';

export const removeUndefinedKeys = <T extends object>(obj: T): RemoveUndefinedKeys<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined),
  ) as RemoveUndefinedKeys<T>;
};
