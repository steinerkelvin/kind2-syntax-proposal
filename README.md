# kind2-syntax-proposal

[Example File](./example.kind2)

[Grammar prototype](./ebnf.txt)

---

Please someone get me a decent tool to prototype grammars. I'm getting mad.

---

- Whitespace independent
- Context-free
- Simple and efficient parser
- Readability
- Familiar syntax when possible
- Tree-sitter?

### Inspirations

- Kind 1
- Rust
- Typescript
- ML-like

### Implicit and erased params

Implicit parameter:
```
<x: T>
```

TODO: rationale for preferring used `<>` to convey implicitness instead of erasedness.

Erased parameter alternatives:
```
1.  (-x: T)  |  <-x: T> 
2.  (~x: T)  |  <~x: T> 
3.  (#x: T)  |  <#x: T>
```

### TODO

- if-then-else
- other "control" structures
- ?
