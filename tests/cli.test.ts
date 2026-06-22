import { expect, test } from "bun:test";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { createProgram } from "../src/cli";

test("registers encode and decode commands", () => {
  expect(createProgram().commands.map((command) => command.name())).toEqual(["encode", "decode"]);
});

test("writes encoded output", async () => {
  const directory = await mkdtemp(join(tmpdir(), "bs58ify-"));
  const output = join(directory, "encoded.txt");

  await createProgram().parseAsync(["node", "bs58ify", "encode", "[1,2,3,4]", output]);

  expect(await readFile(output, "utf8")).toBe("2VfUX");
});

test("rejects malformed command input", async () => {
  await expect(
    createProgram().parseAsync(["node", "bs58ify", "encode", "not-json", "out.txt"]),
  ).rejects.toThrow();
});

test("reports successful encode output", async () => {
  const directory = await mkdtemp(join(tmpdir(), "bs58ify-"));
  const output = join(directory, "encoded.txt");
  await Bun.$`bun run build`.quiet();

  const result = await Bun.$`node dist/cli.js encode '[1,2,3,4]' ${output}`.quiet();

  expect(result.stdout.toString()).toBe(`Encoded Base58 value written to ${output}\n`);
});

test("reports successful decode output", async () => {
  const directory = await mkdtemp(join(tmpdir(), "bs58ify-"));
  const output = join(directory, "decoded.json");
  await Bun.$`bun run build`.quiet();

  const result = await Bun.$`node dist/cli.js decode 2VfUX ${output}`.quiet();

  expect(result.stdout.toString()).toBe(`Decoded JSON byte array written to ${output}\n`);
});

test("builds a CLI with a Node shebang", async () => {
  const packageJson = await Bun.file("package.json").json();
  expect(packageJson.scripts.build).toBe("rolldown src/cli.ts --config rolldown.config.ts");
  expect(await Bun.file("rolldown.config.ts").exists()).toBe(true);

  const result = await Bun.$`bun run build`.quiet().nothrow();

  expect(result.exitCode).toBe(0);
  expect((await Bun.file("dist/cli.js").text()).startsWith("#!/usr/bin/env node")).toBe(true);

  const help = await Bun.$`node dist/cli.js --help`.quiet();
  expect(help.stdout.toString()).toContain("encode");
  expect(help.stdout.toString()).toContain("decode");

  const noArguments = await Bun.$`node dist/cli.js`.quiet().nothrow();
  expect(noArguments.exitCode).toBe(0);
  expect(noArguments.stdout.toString()).toContain("Usage: bs58ify");
});
