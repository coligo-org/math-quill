const CUSTOM_OPERATORS = {
  Operators: {
    buttons: [
      ['+', '+'],
      ['-', '-'],
      ['\\cdot', '\\cdot'],
      ['\\times', '\\times'],
      ['\\div', '\\div'],
      ['\\frac{a}{b}', '\\frac'],
      ['=', '='],
      ['\\neq', '\\neq'],

      ['>', '>'],
      ['<', '<'],
      ['\\ge', '\\ge'],
      ['\\le', '\\le'],
      ['\\approx', '\\approx'],
      ['\\cong', '\\cong'],
      ['\\sim', '\\sim'],
      ['\\pm', '\\pm'],

      ['\\\\a{^2}', '^2'],
      ['\\\\a{^b}', '^{}'],
      ['\\\\a{_b}', '_{}'],
      ['\\lvert{x}\\rvert', '\\mid{}\\mid'],
    ],
  },
  Basic: {
    buttons: [
      ['\\sqrt{a}', '\\sqrt'],
      ['\\sqrt[2]{a}', '\\sqrt[2]{}'],
      ['\\sqrt[3]{a}', '\\sqrt[3]{}'],
      ['\\sqrt[b]{a}', '\\sqrt[b]{}'],

      ['\\log', '\\log'],
      ['\\log_{10}', '\\log_{10}'],
      ['\\log{_x}', '\\log_{}'],
      ['n \\choose k', '\\choose'],
      ['\\sum', '\\sum'],
      ['\\prod', '\\prod'],

      ['\\pi', '\\pi'],
      ['\\tau', '\\tau'],
      ['\\infty', '\\infty'],
    ],
  },
  Geometry: {
    buttons: [
      ['\\overline{ab}', '\\overline'],
      ['\\underline{ab}', '\\underline'],
      ['\\overleftarrow{AB}', '\\overleftarrow'],
      ['\\overrightarrow{AB}', '\\overrightarrow'],
      ['\\overleftrightarrow{AB}', '\\overleftrightarrow'],
      ['90\\degree', '\\degree'],
      ['\\measuredangle', '\\measuredangle'],
      ['\\angle', '\\angle'],
      ['\\equiv', '\\equiv'],
      ['\\perp', '\\perp'],
      ['\\parallel', '\\parallel'],
      ['\\triangle', '\\triangle'],
    ],
  },
  Advanced: {
    buttons: [
      ['\\int', '\\int'],
      ['\\oint', '\\oint'],
      ['\\partial', '\\partial'],
      ['\\frac{dx}{dy}', '\\dfrac{dx}{dy}'],
      [
        '\\frac{\\partial{x}}{\\partial{y}}',
        '\\dfrac{\\partial{x}}{\\partial{y}}',
      ],

      ['\\lim_{x\\to0}', '\\lim_{x\\to0}'],
      ['\\lim_{x \\to +\\infty}', '\\lim_{x \\to +\\infty}'],
      ['\\lim_{x \\to -\\infty}', '\\lim_{x \\to -\\infty}'],
    ],
  },
};
export default CUSTOM_OPERATORS;
