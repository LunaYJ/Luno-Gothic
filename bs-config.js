module.exports = {
  files: [
    'assets/built/**/*.{css,js,map}',
    '*.hbs',
    'partials/**/*.hbs'
  ],
  proxy: process.env.GHOST_URL || 'http://localhost:2368',
  port: 3001,
  open: false,
  ui: false,
  notify: false,
  ghostMode: false
};
