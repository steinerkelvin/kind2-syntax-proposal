module.exports = grammar({
  name: 'kind2',

  // word: $ => $.name,

  extras: $ => [
    /\s+/,
    $._comment,
  ],
  inline: $ => [
    $.expr,
  ],

  rules: {
    source_file: $ => repeat($.decl),

    // Tokens

    _comment: $ => token(seq('//', /(.)*/)),

    name: _ => /[a-zA-Z_][a-zA-Z0-9_]*/,
    nat: _ => /[0-9]+/,
    float: _ => seq(/[0-9]+/, '.', /[0-9]+/),
    string: _ => seq("'", /[^']*/, "'"),

    let_end: _ => choice('in', ';'),

    // Expressions

    literal: $ => choice($.number, $.string),
    number: $ => choice($.nat, $.float),

    // Can be used everywhere
    expr: $ => alias(
      prec(1, choice(
        $._expr_parens,
        $._free_exprs,
      )),
      $.naked_expr,
    ),
    // Cannot be used everywhere
    naked_expr: $ => // alias(
      prec(0, choice(
        $._naked_exprs,     // TODO: test
        $._free_exprs,
      )),

    _expr_parens: $ => choice(
      seq('(', $._naked_exprs, ')'),
      seq('{', $._naked_exprs, '}'),
    ),

    // _alt_expr: $ =>
    //   choice(
    //     $.expr,
    //     seq($.naked_expr, ";"),
    //   ),

    _free_exprs: $ => choice(
      $.path,
      $.literal,
      $.let,
      $.lambda,
      $.forall,
      $.if,
    ),
    _naked_exprs: $ => choice(
      $.naked_app,
    ),

    // Atoms
    var: $ => $.name,
    path: $ => seq($.name, optional(repeat(seq('.', $.name)))),

    // Let
    let: $ => seq(
      "let",
      field('var', $.var),
      "=",
      field('expr', $.expr),
      optional($.let_end),
      field('body', $.expr),
    ),

    // Lambda and Forall
    lambda: $ => seq('@', field("params", $._lambda_params), field("body", $.expr)),
    forall: $ => seq('@', field("params", $._forall_params), field("body", $.expr)),

    _lambda_params: $ => repeat1(seq($.param, '=>')),
    _forall_params: $ => repeat1(seq($.forall_param, '->')),

    // Parameters
    param: $ => choice($.typed_param, $.name),
    forall_param: $ => choice(
      $.name,
      $.typed_param
    ),
    typed_param: $ => choice(
      seq('(', $.name, ':', $.naked_expr, ')'),
      seq('<', $.name, ':', $.naked_expr, '>'),
    ),

    // If-else
    if: $ => seq(
      "if",
      field('cond', $.expr),
      optional("then"),
      field('then', $.expr),
      "else",
      field('else', $.expr),
    ),

    // Function application
    naked_app: $ => prec.left(0, seq($.expr, repeat($.expr))),

    // Declarations
    // ------------

    decl: $ => choice($.type_decl, $.definition),

    type_decl: $ => seq(
      "type",
      field('id', $.name),
      field('params', optional($.typed_params)),
      "{",
      field('variants', optional($.variants)),
      "}",
    ),

    variants: $ => repeat1($.variant),
    variant: $ => choice(
      $.name,
      seq("{", $.name, repeat($.param), "}")
    ),

    definition: $ =>
      seq(
        // 'def',
        field("id", $.path),
        field("params", optional($.typed_params)),
        ':',
        field("type", $.expr),
        optional($._def),
      ),

    params: $ => repeat1($.param),
    typed_params: $ => repeat1($.typed_param),

    patterns: $ => repeat1($.pattern),
    pattern: $ => choice(
      field("id", $.name),
      $._destruct_pattern
    ),
    _destruct_pattern: $ =>
      choice(
        seq(
          '(',
          field("id", $.name),
          field("patterns", optional($.patterns)),
          ')',
        ),
        seq(
          '{',
          field("id", $.name),
          field("patterns", optional($.patterns)),
          '}',
        ),
      ),

    _def: $ =>
      choice(
        field('body', seq("=", $.expr)),
        field('rules', $.rules),
      ),

    rules: $ => seq("{", repeat($.rule), "}"),

    // single_def: $ => seq('=', $.expr),
    // fn_body: $ => seq("{", $.naked_expr, "}"),

    rule: $ =>
      seq(
        field('lhs', $._rule_lhs),
        "=",
        field('rhs', $.expr),
      ),

    _rule_lhs: $ => seq(
      field("id", $.path),
      field("patterns", optional($.patterns)),
    ),
  }
});
