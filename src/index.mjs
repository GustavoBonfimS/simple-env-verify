#!/usr/bin/env node

import yargs from "yargs";
import chalk from "chalk";

import readEnv from "./utils/readEnv.mjs";

async function main() {
  const { log } = console;

  const options = yargs
    .usage("Usage: envy-verify --example <.env.example> --env <.env>")
    .option("ex", {
      alias: "example",
      describe: "Your .env example file",
      demandOption: true,
    })
    .option("en", {
      alias: "env",
      describe: "Your .env file",
      demandOption: true,
    }).argv;

  log(chalk.yellow("Reading example file..."));

  const envExample = await readEnv(options.ex);

  log(chalk.yellow("Reading env file..."));

  const env = await readEnv(options.en);

  Object.keys(envExample).forEach((key) => {
    if (key in env) {
      log(chalk.green(`✅ ${key} is ok`));
    } else {
      log(chalk.red(`❌ ${key} is missing`));
    }
  });
}

main();
