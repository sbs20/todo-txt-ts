# Development

## Use locally prior to publish

From the package: `npm link`
From the consumer: `npm link todo-txt-ts`

To undo, unlink in reverse
From the consumer: `npm unlink todo-txt-ts`
From the package: `npm unlink`

## Dependencies
* "@rollup/plugin-node-resolve": Build
* "@rollup/plugin-typescript": Build
* "@types/chai": Typescript types
* "@types/mocha": Typescript types
* "@typescript-eslint/eslint-plugin": Linting
* "@typescript-eslint/parser": Linting
* "chai": Test dev
* "del": Build
* "eslint": Linting
* "mocha": Unit testing
* "rollup": Build
* "rollup-plugin-terser": Build output
* "ts-mocha": Running typescript unit tests
* "ts-node": Running typescript
* "typescript": Typescript

## Publishing
See [https://zellwk.com/blog/publish-to-npm/](this).

## Reference
* [https://journal.artfuldev.com/write-tests-for-typescript-projects-with-mocha-and-chai-in-typescript-86e053bdb2b6](Typescript unit tests)
* [Deploying to NPM with Typescript and Rollup](https://levelup.gitconnected.com/how-to-deploy-an-npm-package-d75843fb77f1)
* [See how the pros do it](https://github.com/jakearchibald/idb)