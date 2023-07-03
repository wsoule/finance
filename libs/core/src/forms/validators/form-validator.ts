export type FormValidator<T> =((value: T) => [string, any] | null);
