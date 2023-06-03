import { baseEnvironment } from './base-environment';
import { Environment } from './types';

export const environment: Environment = {
  ...baseEnvironment,
  isProd: true
};