module.exports = {
  default: {
    // paths: ['features/**/*.feature'], 
    loader: ['ts-node/esm'],
    import: ['support/**/*.ts', 'step-definitions/**/*.ts'],
    format: ['progress-bar', 'html:reports/cucumber-report.html'],
    publishQuiet: true
  }
};