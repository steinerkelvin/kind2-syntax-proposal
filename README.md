# kind2-syntax-proposal

[Example File](./example.kind2)

[Grammar prototype](./ebnf.txt)

We'll be working on a tree-sitter grammar on [this PR on Kindelia/Kind2](https://github.com/Kindelia/Kind2/pull/20).

---

- Whitespace independent
- Context-free
- Simple and efficient parser
- (thus LR1)
- Readability
- Familiar syntax when possible

---

### Inspirations

- Kind 1
- Rust
- Typescript
- ML-like

### Implicit and erased params

TODO: discuss options.

- A. `<>` convey implicitness and tag to convey erasedness
- B. `<>` for both and `{}` for implicit
- C. `<>` for both (+ tags)

#### A. `<>` to convey implicitness and tag to convey erasedness

Implicit parameter: `<x: T>`.

Erased parameter alternatives:
```
1.  (-x: T)  |  <-x: T> 
2.  (~x: T)  |  <~x: T> 
3.  (#x: T)  |  <#x: T>
```

Very orthogonal. Kinda ugly.

#### B. `<>` for both and `{}` for implicit

```
(x: A)  ... normal
(-x: A) ... erased
{x: A}  ... implicit
<x: A>  ... implicit & erased
```

I don't like how this creates 4 different syntaxes for a parameter while we could have only 2.

#### C. `<>` convey both (+ tags)

Default on `()` is non-erased.
Default on `<>` is erased.

So we need a tag to convey both erasedness and non-erasedness:
```
(x: A)  ... normal
(-x: A) ... erased
<+x: A> ... implicit
<x: A>  ... implicit & erased
```

Still orthogonal and less ugly. `+` and `-` tags have naturally oppossite semantics so I'll non-ironically defend this option.
