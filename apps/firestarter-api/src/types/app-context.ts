import { Request, Response } from 'express';
import { Redis } from 'ioredis';

declare module 'express-session' {
  /** Declare additional session properties using [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html). */
  interface SessionData {
    userId: string;
  }
}

export interface AppContext {
  redis: Redis;
  request: Request;
  response: Response;
}