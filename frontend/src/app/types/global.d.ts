type OptionalRecord<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type AllOptional<T> = {
  [K in keyof T]?: T[K];
};
