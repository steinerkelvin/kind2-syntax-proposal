# Kind2 Tree-sitter Grammar and Parser

## Dev Requirements

- Node.js
- a C compiler

<!-- ```sh
yarn install
``` -->

```sh
npx tree-sitter generate
npx tree-sitter parse ./test.kind2
```

## Building

Requirements:
- the above
- Rust

```
npx tree-sitter generate
cargo build
```
