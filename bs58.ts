import bs58 from 'bs58';

function encodeBase58(bytes: Uint8Array): string {
  return bs58.encode(bytes);
}

async function main() {
  const input = process.argv[2];
  const outputPath = process.argv[3];

  if (!input || !outputPath) {
    console.error('Usage: bun bs58.ts <uint8array-json> <output-filepath>');
    process.exit(1);
  }

  const arr = JSON.parse(input) as number[];
  const bytes = new Uint8Array(arr);
  const encoded = encodeBase58(bytes);

  await Bun.write(outputPath, encoded);
}

main();
