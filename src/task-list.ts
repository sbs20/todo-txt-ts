import { Sorter } from './sorter';
import Task from './task';
import { ITask, ISortOption } from './types';

export default class TaskList {
  lineEnding: string;
  items: Task[];

  constructor(s?: string) {
    this.lineEnding = '\n';
    this.items = [];
    if (s) {
      if (/\r\n/.test(s)) {
        this.lineEnding = '\r\n';
      }
      this.load(s);
    }
  }

  load(s: string): void {
    this.items = s.split('\n')
      .map(e => e.trim())
      .filter(e => e.length > 0)
      .map((e, i) => Task.parse(e, i));
  }

  push(task: Task): void {
    const maxIndex = Math.max(...this.items.map(t => t.index));
    task.index = maxIndex + 1;
    this.items.push(task);
  }

  remove(task: Task): void {
    const index = this.items.indexOf(task);
    this.items.splice(index, 1);
  }

  sort(...sortOptions: (keyof ITask|ISortOption)[]): void {
    const sorter = new Sorter(sortOptions);
    this.items.sort((t1, t2) => sorter.compare(t1, t2));
  }

  stringify(): string {
    return [...this.items]
      .sort((t1, t2) => t1.index - t2.index)
      .map(t => t.stringify()).join(this.lineEnding);
  }

  static parse(s: string): TaskList {
    return new TaskList(s);
  }
}