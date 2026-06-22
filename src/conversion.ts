import bs58 from 'bs58';

export function encodeByteArray(input: string): string {
  const values: unknown = JSON.parse(input);

  if (
    !Array.isArray(values) ||
    values.some(
      (value) =>
        !Number.isInteger(value) || value < 0 || value > 255,
    )
  ) {
    throw new Error('Input must be a JSON array of bytes.');
  }

  return bs58.encode(new Uint8Array(values));
}

export function decodeBase58(input: string): string {
  return JSON.stringify(Array.from(bs58.decode(input)));
}
