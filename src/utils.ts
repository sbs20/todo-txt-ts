export function tryParseDate(s: string): Date | null {
  if (/\d{4}-\d{2}-\d{2}/.test(s)) {
    return new Date(s);
  }

  return null;
}

export function today(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

export function spliceWhere<T>(items: T[], predicate: (s: T) => boolean): T[] {
  const result: T[] = [];
  for (let index = 0; index < items.length; index++) {
    if (predicate(items[index])) {
      result.push(items[index]);
      items.splice(index, 1);
      index--;
    }
  }
  return result;
}

export function formatDate(date: Date): string {
  return [
    `${date.getFullYear()}`,
    `0${date.getMonth() + 1}`.slice(-2),
    `0${date.getDate()}`.slice(-2),
  ].join('-');
}
