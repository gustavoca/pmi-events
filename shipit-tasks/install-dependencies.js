var utils = require('shipit-utils');
var chalk = require('chalk');

module.exports = function (shipit) {

  utils.registerTask(shipit, 'npm:install', () =>
    shipit.remote(`source ~/.ssh-agent ; npm -v && cd ${shipit.releasePath || shipit.currentPath} && npm i`)
    .then(() => {
      shipit.log(chalk.green('Npm modules ready'));
      shipit.emit('npm_installed');
      return Promise.resolve();
    }, () => {
      shipit.log(chalk.red('Npm installation failure'));
      shipit.emit('npm_not_installed');
      return Promise.reject();
    })
  );

  shipit.on('linked', () => {
    shipit.start('npm:install');
  });

};
