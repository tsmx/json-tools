---
name: project-settings-manager
description: A skill to manage and validate project settings in various configuration files like package.json, tsconfig.json, and vite.config.ts. Use when modifying or validating project-specific configurations.
---

# Project Settings Manager

## Overview

This skill provides a set of tools to safely and efficiently modify and validate common project configuration files.

## Tasks

### 1. Set Package Script

Adds or updates a script in the `package.json` file. This is useful for managing common development, build, and test commands.

### 2. Add TypeScript Config Type

Adds a type entry to the `types` array within the `compilerOptions` of `tsconfig.json` or `tsconfig.app.json`. This helps configure TypeScript to recognize global types.

### 3. Configure Vite Test Environment

Configures the `test` property in `vite.config.ts` to integrate testing frameworks like Vitest, setting globals, environment, and setup files.

### 4. Validate JSON File

Validates the syntax of a given JSON file. This ensures configuration files are well-formed before attempting modifications.

## Resources

### scripts/
Executable code for performing the specific tasks outlined above.

- `set_package_script.cjs`: Adds or updates a script in `package.json`.
- `add_tsconfig_type.cjs`: Adds a type to `tsconfig.json`.
- `configure_vite_test.cjs`: Configures Vitest in `vite.config.ts`.
- `validate_json.cjs`: Validates a JSON file.

### references/
(None for this skill)

### assets/
(None for this skill)