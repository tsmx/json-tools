# AGENTS.md — Coding Agent Guidelines for `@tsmx/json-tools`

## Project Overview

`@tsmx/json-tools` is a plain JavaScript (CommonJS) Node.js library. There is **no TypeScript, no build step, and no bundler**. The source files are the distribution files published directly to npm.

---

## Build / Lint / Test Commands

### Run all tests
```bash
npm test
```

### Run all tests with coverage report
```bash
npm run test-coverage
```
Coverage output is written to `coverage/` (gitignored).

### Run a single test file
```bash
npx jest test/jt-basic.test.js
```

### Run a single test by name (substring match against `it(...)` description)
```bash
npx jest --testNamePattern="tests getting the depth"
```

### Run a single test file filtered by test name
```bash
npx jest test/jt-transform.test.js --testNamePattern="toLLM for a simple"
```

### Run ESLint
```bash
npx eslint .
```
There is no separate lint script in `package.json`; invoke ESLint directly. ESLint uses flat config (`eslint.config.js`).

---

## Project Structure

```
json-tools.js          # Public API / entry point — all exports are wired here
functions/
  basic.js             # getDepth, isSimple, isComplex, typeStats
  obfuscate.js         # All obfuscation functions
  transform.js         # toMap, toArray, toProperties, toPropertiesFlat, toLLM
test/
  jt-basic.test.js
  jt-obfuscate.test.js
  jt-transform.test.js
  jt-complex.test.js
  test-helpers.js      # getTextFileContent() utility
  objects/             # Fixtures: *.json inputs + expected-*.txt outputs
```

---

## Module System

- **100% CommonJS** — use `require()` and `module.exports`. Never use ES module `import`/`export` syntax.
- Internal implementation modules in `functions/` receive `@tsmx/json-traverse` (`jt`) as an injected first parameter (dependency injection). The entry point `json-tools.js` is responsible for requiring `jt` and wiring it in.
- The public API in `json-tools.js` exports a single object with namespaced sub-objects (`obfuscate`, `transform`) and top-level functions (`getDepth`, `isSimple`, `isComplex`, `typeStats`).

```js
// functions/transform.js — implementation receives jt via DI
module.exports.toMap = (jt, obj, options) => { ... };

// json-tools.js — entry point wires jt in
const jt = require('@tsmx/json-traverse');
const transform = require('./functions/transform');
module.exports = {
    transform: {
        toMap: (obj, options) => transform.toMap(jt, obj, options)
    }
};
```

---

## Code Style

### Formatting
- **Indentation:** 4 spaces (never tabs).
- **Quotes:** Single quotes for all strings.
- **Semicolons:** Required on every statement.
- **Braces:** Opening brace on the same line as the statement.
- **No Prettier** — formatting is enforced solely by ESLint rules.

### Naming Conventions
- **Files:** `kebab-case` (e.g., `json-tools.js`, `test-helpers.js`, `jt-basic.test.js`).
- **Functions and variables:** `camelCase` (e.g., `getDepth`, `toPropertiesFlat`, `obfuscateKeyRegex`).
- **Constants in tests:** `camelCase`, not `SCREAMING_SNAKE_CASE` (e.g., `const defaultReplacement = '***'`).
- **Intentionally unused parameters:** prefix with `_` to suppress the ESLint `no-unused-vars` warning (e.g., `(_key, value) => { ... }`).

### Function Style
- Use **arrow functions** for exported module functions and callbacks.
- Use **named `function` declarations** for private helper functions inside a module.
- Use **default parameter values** liberally (e.g., `(replacement = '*', retain = 3, minreplace = 3)`).

```js
// Arrow function — exported
module.exports.obfuscateStrings = (jt, obj, replacement = '*', retain = 3) => { ... };

// Named declaration — private helper
function getPathString(path) { ... }
```

### Imports
- Group `require` calls at the top of the file.
- No sorting requirement, but production dependencies before internal modules is the convention.
- Test files always `require` the library under test at the top of the `describe` block, not at file scope, since `jest.resetModules()` is called in `beforeEach`.

---

## Types / Documentation

- No TypeScript. All type information is communicated via **JSDoc** comments on public API functions in `json-tools.js`.
- Use `@param {Type} name description` and `@returns {Type} description` tags.
- Use `@namespace` and `@module` for grouping in generated docs.
- Internal implementation files in `functions/` do not require JSDoc — document only the public surface in `json-tools.js`.

```js
/**
 * @param {Object} obj the object to obfuscate the strings in
 * @param {string} [replacement=*] the replacement character
 * @param {number} [retain=3] the left-most number of original characters to retain
 * @returns {Object} the obfuscated object
 */
```

---

## Error Handling

- The library performs **no defensive error handling** — no `try/catch`, no thrown errors, no custom `Error` classes.
- Functions assume valid JSON-compatible input. Do not add validation unless the feature explicitly requires it.
- Do not introduce error-handling patterns that diverge from this convention without a strong reason.

---

## Testing Conventions

- **Framework:** Jest v30. No separate `jest.config.js`; Jest uses default file discovery.
- **Test file naming:** `jt-<area>.test.js` inside `test/`.
- **Fixtures:** JSON input objects live in `test/objects/*.json`; expected text output lives in `test/objects/expected-*.txt`. Use the `getTextFileContent(fileName)` helper from `test-helpers.js` to read `.txt` fixtures.
- Always call `jest.resetModules()` in `beforeEach`.
- Require the module under test inside the `describe` block (after `resetModules` takes effect).

```js
describe('json-tools <area> functions test suite', () => {

    const jt = require('../json-tools');
    const { getTextFileContent } = require('./test-helpers');

    beforeEach(() => {
        jest.resetModules();
    });

    it('tests <description>', () => {
        const obj = require('./objects/some-fixture.json');
        expect(jt.someFunction(obj)).toStrictEqual(expectedValue);
    });
});
```

### Preferred assertion matchers
| Use case | Matcher |
|---|---|
| Primitive equality | `expect(x).toBe(y)` |
| Object / string equality | `expect(x).toStrictEqual(y)` |
| Truthiness | `expect(x).toBeTruthy()` / `.toBeFalsy()` |
| Existence | `expect(x).toBeDefined()` |

---

## Traversal Pattern

All JSON traversal uses `@tsmx/json-traverse`. The standard callback shape is:

```js
const callbacks = {
    processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
        // inspect or modify values
        // call cbSetValue(newValue) to update the value in place
    }
};
jt.traverse(obj, callbacks);
```

---

## CI / Compatibility

- CI runs tests on **Node 18, 20, 22, and 24** (see `.github/workflows/git-build.yml`).
- The `engines` field in `package.json` requires Node `>=18.0.0` and npm `>=9.0.0`.
- Do not use Node APIs unavailable in Node 18.
- The project has a single production dependency: `@tsmx/json-traverse`.
