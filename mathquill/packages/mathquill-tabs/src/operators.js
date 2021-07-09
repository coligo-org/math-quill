const CUSTOM_OPERATORS = {
  Operators: {
    buttons: [
      ['+', '+'],
      ['\\times', '\\times'],
      ['\\cdot', '\\cdot'],
      ['<', '<'],
      ['\\sim', '\\sim'],
      ['-', '-'],
      ['\\div', '\\div'],
      ['>', '>'],
      ['\\approx', '\\approx'],
      ['\\neq', '\\neq'],
      ['\\ge', '\\ge'],
      ['\\cong', '\\cong'],
      ['\\pm', '\\pm'],
      ['=', '='],
      ['\\le', '\\le'],
    ],
  },
  Basic: {
    buttons: [
      ['\\\\a{^2}', '^2'],
      ['\\lvert{x}\\rvert', '\\mid'],
      ['\\frac{dx}{dy}', '\\dfrac{dx}{dy}'],
      [
        '\\frac{\\partial{x}}{\\partial{y}}',
        '\\dfrac{\\partial{x}}{\\partial{y}}',
      ],

      ['\\\\a{^x}', '^'],
      ['\\int', '\\int'],
      ['\\oint', '\\oint'],
      ['\\sqrt{x}', '\\sqrt'],

      ['\\\\a{_x}', '_{}'],
      ['\\log{_x}', '\\log_{}'],
      ['\\lim_{x\\to0}', '\\lim_{x\\to0}'],
      ['\\lim_{x \\to +\\infty}', '\\lim_{x \\to +\\infty}'],
      ['\\lim_{x \\to -\\infty}', '\\lim_{x \\to -\\infty}'],
      ['\\overleftarrow{AB}', '\\overleftarrow'],

      ['\\frac{x}{y}', '\\frac'],
      ['\\overline{xy}', '\\overline'],
      ['\\overrightarrow{AB}', '\\overrightarrow'],
      ['\\approx', '\\approx'],

      ['+', '+'],
      ['\\times', '\\times'],
      ['<', '<'],
      ['\\backsim', '\\backsim'],

      ['-', '-'],
      ['\\div', '\\div'],
      ['>', '>'],
      ['\\approx', '\\approx'],

      ['\\gtrapprox', '\\gtrapprox'],
      ['\\neq', '\\neq'],
      ['\\ge', '\\ge'],
      ['\\cong', '\\cong'],

      ['\\pm', '\\pm'],
      ['=', '='],
      ['\\le', '\\le'],
      ['\\approxeq', '\\approxeq'],
    ],
  },
  Advanced: {
    buttons: [
      ['\\sqrt[n]{x}', '\\nthroot'],
      ['\\sqrt[3]{x}', '\\sqrt[3]{}'],
    ],
  },
};
export default CUSTOM_OPERATORS;
