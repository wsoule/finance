import { FormArrayValidation, FormGroupValidation, FormValidation } from '../validation';

export function extendValidation<T>(
  base: FormValidation<T>,
  extension: FormValidation<T> | null
): FormValidation<T>;
export function extendValidation<T>(
  base: FormValidation<T> | null,
  extension: FormValidation<T>
): FormValidation<T>;
export function extendValidation<T>(
  base: FormValidation<T> | null,
  extension: FormValidation<T> | null
): FormValidation<T> {
  const validation = {} as unknown as FormValidation<T>;
  if (!base || !extension) {
    return base ?? extension!;
  }

  if (base.control || extension.control) {
    validation.control = {
      label: extension.control?.label ?? base.control!.label,
      validators: (base.control?.validators ?? []).concat(extension.control?.validators ?? [])
    };
  }

  const baseIsArray = FormArrayValidation.isInstance(base);
  const extensionIsArray = FormArrayValidation.isInstance(extension);
  if (baseIsArray && extensionIsArray && (base.children || extension.children)) {
    const childrenCount = Math.max(base.children?.length ?? 0, extension.children?.length ?? 0);
    (validation as FormArrayValidation<any>).children = new Array(childrenCount).fill(null).map((_, i) => {
      const baseChild = (base.children && base.children[i]) ?? null;
      const extensionChild = (extension.children && extension.children[i]) ?? null;

      return extendValidation(baseChild, extensionChild!);
    });
  }

  const baseIsGroup = FormGroupValidation.isInstance(base);
  const extensionIsGroup = FormGroupValidation.isInstance(extension);
  if (baseIsGroup && extensionIsGroup && (base.children || extension.children)) {
    const children: Record<string, any> = {};
    new Set(Object.keys(base.children ?? {}).concat(Object.keys(extension.children ?? {}))).forEach((key): void => {
      const baseChild = (base.children && (base.children as any)[key]) ?? null;
      const extensionChild = (extension.children && (extension.children as any)[key]) ?? null;
      children[key] = extendValidation(baseChild, extensionChild);
    });
    (validation as FormGroupValidation<any>).children = children;
  }

  if (((base as any).children || (extension as any).children) && !(validation as any).children) {
    throw new Error([
      'extendValidation received validation of different types.',
      `base: ${JSON.stringify(base)};`,
      `extension: ${JSON.stringify(extension)};`
    ].join('\n'));
  }

  return validation;
}
