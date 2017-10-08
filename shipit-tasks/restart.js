var utils = require('shipit-utils');
var chalk = require('chalk');

module.exports = function (shipit) {

  utils.registerTask(shipit, 'start', () =>
    shipit.remote(`cd ${shipit.config.deployTo}/current ; npm start`)
    .then(() => {
      shipit.log(chalk.green('services start done'));
      shipit.emit('started');
    })
  );

  utils.registerTask(shipit, 'stop', () =>
    shipit.remote(`cd ${shipit.config.deployTo}/current ; npm stop`)
    .then(() => {
      shipit.log(chalk.green('services stop done'));
      shipit.emit('stopped');
    })
  );

  utils.registerTask(shipit, 'restart', ['stop', 'start']);

  shipit.on('published', () => {
    shipit.start('restart');
  });

};
