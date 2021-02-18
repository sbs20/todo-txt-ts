import { ISortOption, ITask } from './types';

function compareValues<T extends unknown>(v1: T | undefined, v2: T | undefined): number {
  if (v1 === undefined && v2 === undefined) {
    return 0;
  } else if (v1 === undefined) {
    return -1;
  } else if (v2 === undefined) {
    return 1;
  }

  if (typeof v1 === 'number') {
    return v1 - (v2 as number);
  } else if (typeof v1 === 'string') {
    return v1.localeCompare(v2 as string);
  } else if (typeof v1 === 'boolean') {
    return (v1 ? 1 : 0) - (v2 ? 1 : 0);
  } else if (v1 instanceof Date) {
    return v1.valueOf() - (v2 as Date).valueOf();
  }
  return 0;
}

export class Sorter {
  options: ISortOption[];

  constructor(options: (keyof ITask|ISortOption)[]) {
    this.options = options.map(o => {
      if (typeof o === 'string') {
        return {
          field: o,
          direction: 'asc'
        } as ISortOption;
      }      
      o.direction = o.direction || 'asc';
      return o;
    });
  }

  compare(t1: ITask, t2: ITask): number {
    for (const comparison of this.options) {
      const result = compareValues(t1[comparison.field], t2[comparison.field]);
      if (result !== 0) {
        return result * (comparison.direction === 'desc' ? -1 : 1);
      }
    }
    return 0;
  }
}