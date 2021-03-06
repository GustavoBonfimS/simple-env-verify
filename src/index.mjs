#!/usr/bin/env node

import yargs from 'yargs';
import chalk from 'chalk';

import readEnv from './utils/readEnv.mjs';

async function main() {
  const { log } = console;

  const options = yargs
    .usage('Usage: simple-env-verify --example <.env.example> --env <.env>')
    .option('example', {
      alias: 'ex',
      describe: 'Your .env example file',
      demandOption: true,
    })
    .option('env', {
      alias: 'en',
      describe: 'Your .env file',
      demandOption: true,
    })
    .option('error', {
      alias: 'e',
      describe: 'Throw an error if a variable is missing',
      type: 'boolean',
      default: false,
    }).argv;

  log(chalk.yellow('Reading example file...'));

  const envExample = await readEnv(options.ex);

  log(chalk.yellow('Reading env file...'));

  const env = await readEnv(options.en);

  Object.keys(envExample).forEach((key) => {
    if (key in env) {
      if (env[key]) {
        log(chalk.green(`✅ ${key} is ok`));
      } else {
        log(chalk.yellow(`❓ ${key} is on .env but without value`));
      }
    } else {
      log(chalk.red(`❌ ${key} is missing`));
      if (options.error) {
        throw new Error(`${key} is missing`);
      }
    }
  });
}

main();
