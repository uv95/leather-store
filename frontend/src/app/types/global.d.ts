type OptionalRecord<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type AllOptional<T> = {
  [K in keyof T]?: T[K];
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
