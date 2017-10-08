module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('./shipit-tasks/install-dependencies')(shipit);
  require('./shipit-tasks/restart')(shipit);
  require('./shipit-tasks/shared')(shipit);
  require('./shipit-tasks/init')(shipit);

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
