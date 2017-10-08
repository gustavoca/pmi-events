var utils = require('shipit-utils');
var chalk = require('chalk');

module.exports = shipit => {
  utils.registerTask(shipit, 'deploy:gitinit', () => {
    return shipit.remote(`cd ${shipit.config.deployTo}/current && git init -q`)
    .then(() => shipit.remote(`cd ${shipit.config.deployTo}/current && git add --all`))
    .then(() => shipit.remote(`cd ${shipit.config.deployTo}/current && git commit -m "vanilla deploy"`))
    .then(
      () => {
        shipit.log(chalk.green('Git Init ready'));
        shipit.emit('gitinited');
        return Promise.resolve();
      },
      () => {
        shipit.log(chalk.red('Git Init failure'));
        shipit.emit('gitnot_inited');
        return Promise.reject();
      }
    );
  });

  shipit.on('published', () => shipit.start('deploy:gitinit'));
};
