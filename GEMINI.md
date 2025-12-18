# Project: json-tools

## Project Overview

This is a JavaScript library named `@tsmx/json-tools`. Its purpose is to provide a comprehensive toolkit for analyzing, transforming, and obfuscating JSON objects. It is particularly useful for pre-processing and optimizing JSON data, for example, in AI applications to reduce token count and secure sensitive data.

The main technologies used are:
- **Node.js**: The runtime environment.
- **Jest**: The testing framework.
- **@tsmx/json-traverse**: A dependency for traversing JSON objects.

The project is structured into a main file `json-tools.js` that exports functions from three modules located in the `functions` directory:
- `basic.js`: Contains utility functions for analyzing JSON objects (e.g., getting depth, checking complexity, getting type stats).
- `obfuscate.js`: Contains functions for obfuscating sensitive data in JSON objects (e.g., credit card numbers, IP addresses).
- `transform.js`: Contains functions for transforming JSON objects into other formats (e.g., to an array, a map, or a token-optimized LLM representation).

## Building and Running

### Installation

To install the dependencies, run:

```bash
npm install
```

### Running Tests

To run the tests, use the following command:

```bash
npm test
```

To run the tests with coverage, use:

```bash
npm run test-coverage
```

## Development Conventions

The project uses ESLint for linting. The configuration can be found in `eslint.config.js`. All code should be formatted according to the rules in this file.

The project uses Jest for testing. All test files are located in the `test` directory and have the `.test.js` extension. New features should be accompanied by corresponding tests.
