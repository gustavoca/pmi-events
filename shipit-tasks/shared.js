var utils = require('shipit-utils');
var chalk = require('chalk');

module.exports = shipit => {
  utils.registerTask(shipit, 'deploy:link', () => {
    if (!shipit.releasePath) {
      return Promise.reject('Cannot get release path');
    }

    var sharedResources = shipit.config.shared || [];

    return Promise.all(sharedResources.map(sharedResource => {
      var sharedPath = `${shipit.releasePath}/../../shared/${sharedResource}`;
      return shipit.remote(`mkdir -p ${sharedPath}`)
      .then(() => shipit.remote(`rm -rf ${shipit.releasePath}/${sharedResource}`))
      .then(() => shipit.remote(`ln -s ${sharedPath} ${shipit.releasePath}/${sharedResource}`));
    }))
    .then(
      () => {
        shipit.log(chalk.green('Shared links ready'));
        shipit.emit('linked');
        return Promise.resolve();
      },
      () => {
        shipit.log(chalk.red('Shared links failure'));
        shipit.emit('not_linked');
        return Promise.reject();
      }
    );
  });

  shipit.on('updated', () => shipit.start('deploy:link'));
};
