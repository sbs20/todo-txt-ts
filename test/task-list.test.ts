import 'mocha/mocha';
import { assert } from 'chai';
import { Task, TaskList } from '../src/index';

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

describe('TaskList.preserveSort', () => {
  it('General', () => {
    const val = 'task1\ntask2';
    const tasks = TaskList.parse(val);
    const task = tasks.items[0];
    tasks.items[0] = tasks.items[1];
    tasks.items[1] = task;

    assert.strictEqual(tasks.stringify(), val);
  });

  it('Add.Remove', () => {
    const val = 'task1\ntask2';
    let tasks = TaskList.parse(val);

    tasks.push(Task.parse('(A) task 3'));
    assert.strictEqual(tasks.items[2].index, 2);

    tasks.push(Task.parse('(A) task 4'));
    assert.strictEqual(tasks.items[3].index, 3);

    tasks.remove(tasks.items[1]);
    assert.strictEqual(tasks.items.filter(t => t.body.includes('task2')).length, 0);
    tasks.push(Task.parse('(A) task 5'));
    assert.strictEqual(tasks.items[3].index, 4);

    tasks = TaskList.parse(tasks.stringify());
    assert.strictEqual(tasks.items[3].index, 3);
  });

  describe('TaskList.sort', () => {
    it('General', () => {
      const val = '(B) 2005-01-01 task1\nx (A) 2004-01-01 task2\n(C) 2003-01-01 task4\n(C) 2002-01-01 task3';
      const tasks = TaskList.parse(val);
      tasks.sort('priority');
      assert.strictEqual(tasks.items[0].body, 'task2');
      assert.strictEqual(tasks.items[1].body, 'task1');
      assert.strictEqual(tasks.items[2].body, 'task4');
      assert.strictEqual(tasks.items[3].body, 'task3');

      tasks.sort('priority', 'body');
      assert.strictEqual(tasks.items[0].body, 'task2');
      assert.strictEqual(tasks.items[1].body, 'task1');
      assert.strictEqual(tasks.items[2].body, 'task3');
      assert.strictEqual(tasks.items[3].body, 'task4');

      tasks.sort('isComplete', 'priority', 'body');
      assert.strictEqual(tasks.items[0].body, 'task1');
      assert.strictEqual(tasks.items[1].body, 'task3');
      assert.strictEqual(tasks.items[2].body, 'task4');
      assert.strictEqual(tasks.items[3].body, 'task2');

      tasks.sort({ field: 'isComplete', direction: 'desc' }, 'priority', 'body');
      assert.strictEqual(tasks.items[0].body, 'task2');
      assert.strictEqual(tasks.items[1].body, 'task1');
      assert.strictEqual(tasks.items[2].body, 'task3');
      assert.strictEqual(tasks.items[3].body, 'task4');

      tasks.sort({ field: 'body', direction: 'desc' });
      assert.strictEqual(tasks.items[0].body, 'task4');
      assert.strictEqual(tasks.items[1].body, 'task3');
      assert.strictEqual(tasks.items[2].body, 'task2');
      assert.strictEqual(tasks.items[3].body, 'task1');

      tasks.sort({ field: 'creationDate', direction: 'desc' });
      assert.strictEqual(tasks.items[0].body, 'task1');
      assert.strictEqual(tasks.items[1].body, 'task2');
      assert.strictEqual(tasks.items[2].body, 'task4');
      assert.strictEqual(tasks.items[3].body, 'task3');
    });
  });  
});