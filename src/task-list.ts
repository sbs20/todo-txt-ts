import Task from './task';

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

  stringify(): string {
    return this.items
      .sort((t1, t2) => t1.index - t2.index)
      .map(t => t.stringify()).join(this.lineEnding);
  }

  static parse(s: string): TaskList {
    return new TaskList(s);
  }
}