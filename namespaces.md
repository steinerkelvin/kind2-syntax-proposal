### Modules / Namespaces / Field Access

`/List/Mappable.kind -> "List.Mappable"`. PLEASE DON'T.

---

Global name root
```
List: {
  root: (Type) 
  children: {
    Mappable: { root: (Mappable List) }
  }
}
```

---

Conflict yet to solve:

```
fn game.board.map (f: Func) (b: Board) : Board = ... 
```

```
record Board {
  map: Vec<Vec<T>>
}
game.board : Board = ...
```

```
main =
  game.board.map  // ?? How to resolve ambiguity?
  // my early proposal:
  //   you can't access the global definition if (game.board: Board) is bound
```
