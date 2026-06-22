import { expect, test } from 'bun:test';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createProgram } from './cli';

test('registers encode and decode commands', () => {
  expect(createProgram().commands.map((command) => command.name())).toEqual([
    'encode',
    'decode',
  ]);
});

test('writes encoded output', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'bs58ify-'));
  const output = join(directory, 'encoded.txt');

  await createProgram().parseAsync([
    'node',
    'bs58ify',
    'encode',
    '[1,2,3,4]',
    output,
  ]);

  expect(await readFile(output, 'utf8')).toBe('2VfUX');
});

test('rejects malformed command input', async () => {
  await expect(
    createProgram().parseAsync([
      'node',
      'bs58ify',
      'encode',
      'not-json',
      'out.txt',
    ]),
  ).rejects.toThrow();
});
