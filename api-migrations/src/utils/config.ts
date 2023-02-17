import { AuthorizationHeader, MyUsers } from './types';
import { Knex } from 'knex';
import { Logger } from 'pino';

export async function getFirstAdminStaticToken(
  knex: Knex,
  logger: Logger
): Promise<AuthorizationHeader | undefined> {
  const user = (await knex
    .from('users')
    .join('roles', 'users.role', '=', 'roles.id')
    .where('roles.super_user', '=', 'true')
    .whereNotNull('token')
    .select('token')
    .first()) as MyUsers;

  if (!user || !user.token) {
    logger.warn(
      `Not able to retrieve an admin user with a static token from users collections`
    );
    return;
  }
  return { Authorization: `Bearer ${user.token}` };
}

export function getCustomerName() {
  return getMandatoryEnvVar('HF_CUSTOMER_NAME');
}

export function buildConnectionUrlFromEnvVariables() {
  const host = getMandatoryEnvVar('HOST');
  const port = getMandatoryEnvVar('PORT');
  return buildConnectionUrl(host, port);
}

export function buildConnectionUrl(
  host: string,
  port: string,
  protocol: 'http' | 'https' = 'http'
) {
  return `${protocol}://${host}:${port}`;
}

export function instantiateKnexInstanceFromValues(logger: Logger) {
  const dbClient = 'dbClientName';
  let connectionString = '';
  let connectionConfig: Knex.StaticConnectionConfig = {};
  try {
    connectionString = "postgres://mydbname"; // code to build it
  } catch (error) {
    logger.info(
      'Failed to get connectionString trying to build Knex.StaticConnectionConfig...'
    );
  }
  try {
    connectionConfig = {
      // set here connection config values
    };
  } catch (error) {
    logger.error(
      'Failed to build Knex.StaticConnectionConfig'
    );
  }

  return instantiateKnexInstance(
    dbClient,
    connectionString || connectionConfig
  );
}

export function instantiateKnexInstance(
  dbClient: string,
  connexion: string | Knex.StaticConnectionConfig
) {
  const knexConfig = {
    client: dbClient,
    connection: connexion,
    pool: {},
  } as Knex.Config;

  // eslint-disable-next-line  @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-call
  return require('knex')(knexConfig) as Knex;
}

/**
 * Get an environnement variable by name as a string, by default from process.env. Throw an error if the variable is not found, not a string or an empty string.
 * @param {string} name name of the environment variable
 * @param {NodeJS.ProcessEnv} [processEnv=process.env] [optional] containing the env variable, default to process.env
 * @param {string} [msg] [optional] message display if variable is not found or invalid.
 * @returns
 */
function getMandatoryEnvVar(
  name: string,
  processEnv = process.env,
  msg?: string
): string {
  const value = processEnv[name];
  if (value === undefined || value === null)
    throw new Error(msg || `Environment is missing variable ${name}`);
  if (value === '')
    throw new Error(msg || `Environment variable ${name} is an empty string`);
  if (typeof value !== 'string')
    throw new Error(msg || `Environment variable ${name} is not a string`);
  return value;
}
