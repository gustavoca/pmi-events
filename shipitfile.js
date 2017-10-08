module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-npm')(shipit);
  require('./tasks/fs_set_ip')(shipit);
  require('./tasks/restart')(shipit);
  require('./tasks/deploy-check')(shipit);
  require('./tasks/run-tests-remote')(shipit);
  require('./tasks/fs-check')(shipit);

  var packageFile = require('./package.json');

  var app = 'pmi-events';
  var deployUser = 'deploy';

  shipit.initConfig({
    default: {
      workspace: `/tmp/${app}`,
      deployTo: `/home/${deployUser}/apps/${app}`,
      repositoryUrl: 'git@github.com:nobelbiz/filter_engine.git',
      ignores: ['.git', 'node_modules', '.sync-config.cson'],
      keepReleases: 5,
      shallowClone: true,
      shared: ['tmp', 'node_modules', 'logs']
    },
    production: {
      servers: [{
        host: '34.236.227.254',
        user: deployUser
      }],
      branch: 'master'
    }
  });
};
