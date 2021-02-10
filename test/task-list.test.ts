import 'mocha/mocha';
import { assert } from 'chai';
import { TaskList } from '../src';

describe('TaskList.parse', () => {
  it('General', () => {
    assert.strictEqual(TaskList.parse('task1\ntask2').items.length, 2);
    assert.strictEqual(TaskList.parse('task1\rtask2').items.length, 1);
    assert.strictEqual(TaskList.parse('task1\r\ntask2').items.length, 2);
  });
});

describe('TaskList.stringify', () => {
  it('General', () => {
    const tasks = TaskList.parse('task1\ntask2');
    tasks.items[1].isComplete = true;
    tasks.items[1].priority = 'A';
    assert.strictEqual(
      tasks.stringify(),
      'task1\nx (A) task2');

    assert.strictEqual(tasks.items[0].index, 0);
    assert.strictEqual(tasks.items[1].index, 1);
  });
});

describe('TaskList.preserveLineEndings', () => {
  it('General', () => {
    let val = 'task1\ntask2';
    assert.strictEqual(TaskList.parse(val).stringify(), val);

    val = 'task1\r\ntask2\r\ntask3';
    assert.strictEqual(TaskList.parse(val).stringify(), val);

    val = 'task1\r\ntask2\ntask3';
    assert.notStrictEqual(TaskList.parse(val).stringify(), val);
  });
});