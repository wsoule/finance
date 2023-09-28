import { baseEnvironment } from './base-environment';
import { Environment } from './types';

export const environment: Environment = {
  ...baseEnvironment,
  urls: {
    web: 'http://localhost:4200'
  }
};