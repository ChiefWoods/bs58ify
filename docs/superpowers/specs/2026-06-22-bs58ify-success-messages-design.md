# bs58ify Success Messages Design

## Goal

Provide clear confirmation after each successful file conversion without exposing converted values in terminal output.

## Behavior

- After `encode` finishes writing its output file, it writes `Encoded Base58 value written to <output>` to standard output.
- After `decode` finishes writing its output file, it writes `Decoded JSON byte array written to <output>` to standard output.
- A message is emitted only after `writeFile` resolves successfully.
- Failed conversions or file writes retain their existing non-zero failure behavior and emit no success message.

## Verification

CLI tests will capture standard output for each successful subcommand and assert the exact message. Existing error-path and built-binary tests remain in place.
