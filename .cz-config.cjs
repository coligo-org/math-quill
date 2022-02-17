// This File extension is cjs this file should be commonjs and
// We have type module in package.json
module.exports = {
  types: [
    { value: 'feat', name: 'feat:    A commit that has a new feature' },
    {
      value: 'enhance',
      name: 'enhance:    A commit that has adds new code functionality',
    },
    { value: 'fix', name: 'fix:     A commit that has a bug fix' },
    { value: 'docs', name: 'docs:    A commit that has docs updates' },
    {
      value: 'style',
      name: 'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
    },
    {
      value: 'refactor',
      name: 'refactor: A commit that has tweaking for previously written code\n  to make it more readable or more clear but adds nothing new',
    },
    {
      value: 'perf',
      name: 'perf:     A commit that has an improvement for performance',
    },
    {
      value: 'chore',
      name: 'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
    },
    { value: 'revert', name: 'revert:   Revert to a commit' },
    { value: 'test', name: 'test:     A commit that add one or more tests' },
  ],

  scopes: [{ name: 'technical' }, { name: 'release' }],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  /*
    scopeOverrides: {
      fix: [
        {name: 'merge'},
        {name: 'style'},
        {name: 'e2eTest'},
        {name: 'unitTest'}
      ]
    },
    */
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    // // used if allowCustomScopes is true
    // // customScope: "Denote the SCOPE of this change:",
    scope: 'Denote the SCOPE of this change ',
    subject:
      'Write a SHORT, IMPERATIVE tense description of the change (required):\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer:
      'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },

  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  //   skipQuestions: [],

  // limit subject length
  subjectLimit: 72,
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
};
