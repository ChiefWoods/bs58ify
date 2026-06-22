# bs58ify CLI Design

## Goal

Replace the two positional-argument scripts with a distributable Commander CLI named `bs58ify`. The package will be published under the existing user-owned `bs58ify` npm package.

## CLI contract

The compiled executable exposes two required subcommands:

```sh
bs58ify encode <uint8array-json> <output-filepath>
bs58ify decode <base58-private-key> <output-filepath>
```

- `encode` parses a JSON array of byte values, Base58-encodes it, and writes the resulting text to `output-filepath`.
- `decode` Base58-decodes its input, serializes the bytes as a JSON array, and writes it to `output-filepath`.
- Commander owns command parsing, help output, required arguments, and non-zero failure behavior for invalid invocations.
- Invalid JSON or Base58 input must cause a non-zero command failure without reporting success.

## Architecture

Conversion logic moves into a small reusable module containing pure encode/decode functions. A CLI entry module owns only Commander configuration, conversion invocation, and file writes. This permits unit tests to exercise conversion semantics without spawning a process, while command tests validate the public CLI behavior.

The current root-level `bs58.ts` and `uint8array.ts` scripts are replaced by the unified CLI entry point and supporting module under `src/`.

## Packaging and build

- Set the package name to `bs58ify`.
- Add `commander` as a runtime dependency and `rolldown` as a development dependency.
- Add a `build` script that bundles the CLI to `dist/cli.js` for Node.js, preserving a `#!/usr/bin/env node` shebang.
- Add a `bin` mapping from `bs58ify` to `dist/cli.js`.
- Keep Bun as the package manager and test runner.

## Documentation and verification

The README will document installation, building locally, and both subcommands. Tests cover valid encode/decode conversions, malformed conversion inputs, CLI help, successful file output, and failure exit status. Verification runs the Bun test suite, TypeScript type checking, the Rolldown build, and the built `dist/cli.js` executable.
