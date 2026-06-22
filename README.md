# bs58ify

A command-line utility for converting between Base58 strings and JSON byte arrays.

## Setup

```sh
bun install
bun run build
```

Run the built CLI locally with `node dist/cli.js`, or install the published package to
use the `bs58ify` command directly:

```sh
bun add -g bs58ify
```

## Usage

Encode a JSON byte array as Base58:

```sh
bs58ify encode '[1,2,3,4]' encoded.txt
```

Decode Base58 as a JSON byte array:

```sh
bs58ify decode 2VfUX decoded.json
```

Both commands require an output filepath and write the converted value to that file.
