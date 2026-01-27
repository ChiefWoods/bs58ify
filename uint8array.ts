import bs58 from 'bs58';

async function main() {
  // Pass in private key in base58 and .json filepath to write to

  const encoded = process.argv[2];
  const filepath = process.argv[3];

  if (!encoded || !filepath) {
    console.error('Usage: bun uint8array.ts <base58-encoded-private-key> <output-filepath>');
    process.exit(1);
  }

  const decoded = bs58.decode(encoded!);
  const arr = Array.from(decoded);
  const output = JSON.stringify(arr);

  await Bun.write(filepath!, output);
}

main();