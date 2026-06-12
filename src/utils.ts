type ClassValue = string | number | false | null | undefined | Record<string, boolean | null | undefined>;

export function cx(...classes: ClassValue[]) {
  return classes
    .flatMap(value => {
      if (!value) return [];
      if (typeof value === "object") {
        return Object.entries(value)
          .filter(([, enabled]) => enabled)
          .map(([className]) => className);
      }
      return [String(value)];
    })
    .join(" ");
}
