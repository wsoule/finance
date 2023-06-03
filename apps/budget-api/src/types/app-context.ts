import { Request, Response } from 'express';

declare module 'express-session' {
  /** Declare additional session properties using [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html). */
  interface SessionData {
    userId: string;
  }
}

export interface AppContext {
  request: Request;
  response: Response;
}