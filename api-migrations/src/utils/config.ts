import { AuthorizationHeader } from './types';

export function getConnectionHeaders(): AuthorizationHeader | undefined {
  return { Authorization: `Bearer xxx` };
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
