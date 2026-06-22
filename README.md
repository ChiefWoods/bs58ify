# bs58ify

A command-line utility for converting between Base58 strings and JSON byte arrays.

## Use the installed binary

Install the published package globally:

```sh
bun add -g bs58ify
```

The package exposes the `bs58ify` binary. Run it with no arguments, or pass `--help`,
to view the available subcommands:

```sh
bs58ify
```

You can also invoke it without a global installation:

```sh
bunx bs58ify
```

## Commands

Encode a JSON byte array as Base58:

```sh
bs58ify encode '[174,143,195,32,60,129,71,57,57,70,236,218,24,191,188,247,22,72,219,221,150,251,146,87,152,248,120,118,17,160,156,81,219,105,209,118,42,146,222,75,53,28,45,84,36,183,165,110,127,190,6,250,172,217,97,213,2,90,103,129,47,1,178,175]' base58.txt
```

Decode Base58 as a JSON byte array:

```sh
bs58ify decode 4VRWeP2rwPtCTVQg1LLYfwwxSbVW98wAmDK9HJXtmJZiA5FkXAKg6fgqSLMUzFSActLCfFJLXqt5RKUgbFF2d8Hc uint8array.json
```

Both commands require an output filepath and write the converted value to that file.
