#!/usr/bin/env node

const chalk = require('chalk');
const spawn = require('cross-spawn');
const os = require('os');
require('shelljs/global');
const program = require('commander');
const yo = require('./yo.js');

const script = process.argv[2];
const args = process.argv.slice(3);

const nodeVersion = process.versions.node;
const versions = nodeVersion.split('.');
const major = versions[0];
const minor = versions[1];
const platform = os.platform();

if (((major * 10) + (minor * 1)) < 65) {
  console.log(chalk.red(`Node version (${major}.${minor}) is not compatibile, ${chalk.cyan('must >= 6.5')}.`));
  console.log(chalk.red(`你的 Node 版本是 ${chalk.yellow(`${major}.${minor}`)}，请升级到${chalk.cyan(' 6.5 或以上')}.`));
  console.log();
  if (platform === 'darwin') {
    console.log(`推荐用 ${chalk.cyan('https://github.com/creationix/nvm')} 管理和升级你的 node 版本。`);
  } else if (platform === 'win32') {
    console.log(`推荐到 ${chalk.cyan('https://nodejs.org/')} 下载最新的 node 版本。`);
  }
  process.exit(1);
}

require('atool-monitor').emit();

var result;

program
  .version(require('../package.json').version);

program
  .command('new [app]')
  .description('new a react app/page/component')
  .action(function (app) {
    app = app || 'app';
    var generator = 'generator-react-multipage:' + app;
    console.log('generator: ' + generator);
    yo(generator, [], function () {
      console.log('yo ' + app  + ' success!');
    });
  });

program
  .command('page <name>')
  .description('new a react page')
  .action(function (name) {
    var generator = 'generator-react-multipage:page';
    console.log('generator: ' + generator);
    yo(generator, [name], function () {
      console.log('create page ' + name  + ' success!');
    });
  });

program
  .command('cpnt <name>')
  .description('new a react component')
  .action(function (name) {
    var generator = 'generator-react-multipage:component';
    console.log('generator: ' + generator);
    yo(generator, [name], function () {
      console.log('create component ' + name  + ' success!');
    });
  });

program
  .command('server')
  .alias('s')
  .description('start a develop server')
  .action(function () {
    result = spawn.sync(
      'node',
      [require.resolve(`../lib/${script}`)].concat(args),
      { stdio: 'inherit' }
    );
    process.exit(result.status);
  });

program
  .command('build')
  .alias('b')
  .option('-a, --analyze', 'Visualize and analyze your Webpack bundle.')
  .description('build code to build file')
  .action(function () {
    result = spawn.sync(
      'node',
      [require.resolve(`../lib/${script}`)].concat(args),
      { stdio: 'inherit' }
    );
    process.exit(result.status);
  });

program
  .command('test')
  .description('test')
  .action(function() {
    result = spawn.sync(
      'node',
      [require.resolve(`../lib/${script}`)].concat(args),
      { stdio: 'inherit' }
    );
    process.exit(result.status);
  })

program
  .command('rc <name>')
  .description('new a pure react component')
  .action(function (name) {
    var generator = 'generator-react-multipage:rc';
    console.log('generator: ' + generator);
    yo(generator, [name], function () {
      console.log('create component ' + name  + ' success!');
    });
  });

program.parse(process.argv);

// switch (script) {
//   case '-v':
//   case '--version':
//     console.log(require('../package.json').version);
//     break;
//   case 'build':
//   case 'server':
//   case 'test':
//     result = spawn.sync(
//       'node',
//       [require.resolve(`../lib/${script}`)].concat(args),
//       { stdio: 'inherit' }
//     );
//     process.exit(result.status);
//     break;
//   default:
//     console.log(`Unknown script ${chalk.cyan(script)}.`);
//     break;
// }
