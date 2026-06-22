import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { Command } from "commander";

import { decodeBase58, encodeByteArray } from "./conversion";

export function createProgram(): Command {
  const program = new Command()
    .name("bs58ify")
    .description("Encode and decode Base58 byte arrays.");

  return program
    .action(() => {
      program.outputHelp();
    })
    .addCommand(
      new Command("encode")
        .description("Encode a JSON byte array as Base58.")
        .argument("<uint8array>", "JSON array of bytes")
        .argument("<output>", "file to write the Base58 result to")
        .action(async (input: string, outputPath: string) => {
          await writeFile(outputPath, encodeByteArray(input));
        }),
    )
    .addCommand(
      new Command("decode")
        .description("Decode Base58 as a JSON byte array.")
        .argument("<base58>", "Base58-encoded value")
        .argument("<output>", "file to write the JSON result to")
        .action(async (input: string, outputPath: string) => {
          await writeFile(outputPath, decodeBase58(input));
        }),
    );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createProgram()
    .parseAsync()
    .catch((error: unknown) => {
      console.error(error instanceof Error ? error.message : error);
      process.exitCode = 1;
    });
}
