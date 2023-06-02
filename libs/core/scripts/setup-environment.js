import { readFile, stat, writeFile } from 'fs/promises';

function getArgs() {
  return process.argv.slice(2).reduce((args, stringArg) => {
    const [key, value] = stringArg.split('=');
    args[key.replace(/^--/, '')] = value;
    return args;
  }, { path: '', env: ''});
}

function isInvalidArg(argValue) {
  return !argValue || argValue === 'undefined';
}

async function main() {
  const { path, env } = getArgs();
  if (isInvalidArg(path) || isInvalidArg(env)) {
    throw new Error(`'path' (${path}) & 'env' (${env}) arguments are required.`);
  }

  const environmentsPath = `${process.cwd()}/${path}/environments`;
  const environmentPath = `${environmentsPath}/${env}-environment.ts`;
  if (!(await stat(environmentsPath)).isDirectory()) {
    throw new Error(`'path' must be a directory (${environmentsPath}`);
  } else if (!(await stat(environmentPath)).isFile()) {
    throw new Error(`'env' must have an env file (${environmentPath}`);
  }

  await writeFile(
    `${environmentsPath}/environment.ts`,
    await readFile(environmentPath)
  );
}

main();
