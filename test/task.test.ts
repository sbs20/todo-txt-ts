import 'mocha/mocha';
import { assert } from 'chai';
import Task from '../src/task';
import { ITask } from '../src/types';

function assertEqual(expected: ITask, actual: ITask): void {
  assert.strictEqual(actual.isComplete, expected.isComplete);
  assert.strictEqual(actual.priority, expected.priority);
  assert.strictEqual(actual.body, expected.body);
  assert.deepStrictEqual(actual.contexts, expected.contexts);
  assert.deepStrictEqual(actual.projects, expected.projects);
  assert.deepStrictEqual(actual.fields, expected.fields);
  if (expected.creationDate === undefined) {
    assert.strictEqual(actual.creationDate, expected.creationDate);
  } else {
    assert.deepStrictEqual(actual.creationDate, expected.creationDate);
  }
  if (expected.completionDate === undefined) {
    assert.strictEqual(actual.completionDate, expected.completionDate);
  } else {
    assert.deepStrictEqual(actual.completionDate, expected.completionDate);
  }
}

describe('Task', () => {

  describe('parse', () => {
    it('incomplete', () => {
      const expected: ITask = {
        priority: 'A',
        isComplete: false,
        contexts: ['work'],
        projects: ['test'],
        fields: {},
        body: 'This is a test task'
      };

      assertEqual(expected, new Task('(A) This is a test task @work +test'));
      assertEqual(expected, new Task('(A) This is a test task +test @work'));
      assertEqual(expected, new Task('(A) +test @work This is a test task'));
      assertEqual(expected, new Task('(A) This is a +test @work test task'));
      assertEqual(expected, new Task('   (A) This is a  test   task    @work +test    '));

      expected.creationDate = new Date('2015-10-01');
      assertEqual(expected, new Task('(A) 2015-10-01 This is a +test @work test task'));

      expected.creationDate = new Date('2015-10-26');
      assertEqual(expected, new Task('(A) 2015-10-26 This is a +test @work test task'));

      delete expected.priority;
      assertEqual(expected, new Task('2015-10-26 This is a test task @work +test'));

      expected.projects.push('home');
      assertEqual(expected, new Task('2015-10-26 This is a test task +test @work +home'));

      expected.body += ' 2+2 3@3';
      expected.projects = [];
      expected.contexts = [];
      assertEqual(expected, new Task('2015-10-26 This is a test task 2+2 3@3'));

      delete expected.creationDate;
      assertEqual(expected, new Task('This is a test task 2+2 3@3'));
    });

    it('fields', () => {
      const expected: ITask = {
        priority: 'A',
        isComplete: false,
        contexts: ['play', 'work'],
        projects: ['test', 'project', 'improvement'],
        fields: {
          colour: 'green',
          due: 'tomorrow'
        },
        body: 'This is a test task'
      };

      assertEqual(expected, new Task('(A) This is a test task @play @work +test +project +improvement due:tomorrow colour:green'));
    });

    it('complete', () => {
      const expected: ITask = {
        priority: 'A',
        isComplete: true,
        completionDate: new Date('2018-03-27'),
        creationDate: new Date('2018-02-14'),
        contexts: [],
        projects: [],
        fields: {},
        body: 'Batteries'
      };
      
      // Non-standard but common
      assertEqual(expected, new Task('x 2018-03-27 (A) 2018-02-14 Batteries'));

      delete expected.priority;
      assertEqual(expected, new Task('x 2018-03-27 2018-02-14 Batteries'));

      expected.fields = {
        pri: 'A'
      };
      assertEqual(expected, new Task('x 2018-03-27 2018-02-14 Batteries pri:A'));

      expected.fields = {
        pri: '(A)'
      };
      assertEqual(expected, new Task('x 2018-03-27 2018-02-14 Batteries pri:(A)'));
    });

    it('actions', () => {
      const task = new Task('(A) A test task');
      task.complete(true);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      assertEqual({
        priority: 'A',
        isComplete: true,
        completionDate: today,
        contexts: [],
        projects: [],
        fields: {},
        body: 'A test task'
      }, task);
    });

    it('strange', () => {
      assert.strictEqual(Task.parse('').body, '');
      assert.strictEqual(Task.parse('(a) test').body, '(a) test');
      assert.strictEqual(Task.parse('2020-01-01').body, '');
      assert.strictEqual(Task.parse('Hello\nWorld').body, 'Hello World');
      assert.strictEqual(Task.parse('Hello\r\nWorld').body, 'Hello World');
      assert.strictEqual(Task.parse('Hello\n\n\n\nWorld').body, 'Hello World');
    })
  });

  it('stringify', () => {
    assert.strictEqual(
      Task.parse('   (A) This is a  test   task    @work +test    ').stringify(),
      '(A) This is a test task @work +test'
    );

    assert.strictEqual(
      Task.parse('(A) This is a test task @work @play +test due:tomorrow').stringify(),
      '(A) This is a test task @work @play +test due:tomorrow'
    );

    assert.strictEqual(
      Task.parse('(A) 2021-02-01 This is a test task @work @play +test due:tomorrow').stringify(),
      '(A) 2021-02-01 This is a test task @work @play +test due:tomorrow'
    );
  });
});