# TodoTxtTs

Typescript implementation of [todotxt](https://github.com/todotxt/todo.txt) API
which offers:

* Parsing
* Serialization
* Simple task interface
* Line ending preservation
* Multifield sorting

## Install

```console
npm i todo-txt-ts
```

## Example

Tasks look like this

```typescript
export interface ITask {
  isComplete: boolean;
  projects: string[];
  contexts: string[];
  dueDate?: Date;
  completionDate?: Date;
  creationDate?: Date;
  priority?: Priority;
  fields: Dictionary<string>;
  body: string;
  raw?: string;
  index?: number;
}
```

You can deal with file content or tasks.

```javascript
const tasks = TaskList.parse('(A) Phone mum\nx 2021-01-04 Clean the car');
const completed = tasks.items.filter(t => t.isComplete);
console.log(completed[0].body); // Clean the car

const important = tasks.items.filter(t => t.priority === 'A');
console.log(completed[0].body); // Phone mum


const task = Task.parse('(A) This is a test task @work +test due:tomorrow');
console.log(task);
/*
{
  priority: 'A',
  isComplete: false,
  contexts: ['work'],
  projects: ['test'],
  fields: {
    'due': 'tomorrow'
  },
  body: 'This is a test task'
}
*/

console.log(task.stringify());
/*
'(A) This is a test task @work +test due:tomorrow'
*/

// Do you own sorting natively
tasks.items.sort((t1, t2) => t1.raw.localeCompare(t2.raw));

// Or use the sort method which takes a spread array of parameters which can be
// strings or SortOptions
tasks.sort(
  { field: 'isComplete', direction: 'desc' }, // lists completed first
  'priority', // (A) -> (Z) -> undefined
  'body');
```

## Exclusions

Magic dates (today, tomorrow, etc) are not supported. The only two hard dates in
the spec are completion and creation dates - both of which are concrete. Other
dates such as due dates may be relative but are not part of the spec and so are
left to the UI / application layer.

Filtering is natively available and not implemented here.

## Acknowledgements

* Borrows unit testing from
  * [todotxt.net](https://github.com/benrhughes/todotxt.net)
  * [todo-txt-js](https://github.com/roufamatic/todo-txt-js)
