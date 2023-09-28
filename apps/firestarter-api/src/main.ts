import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { default as bodyParser } from 'body-parser';
import { default as RedisStore } from 'connect-redis';
import { default as cors } from 'cors';
import { default as express, Express } from 'express';
import { default as expressSession } from 'express-session';
import { createServer as createHttpServer } from 'http';
import { default as IoRedis, Redis } from 'ioredis';
import { join as pathJoin } from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { DataSource } from 'typeorm';
import { entities } from './entities';
import { environment } from './environments';
import { resolvers } from './resolvers';
import { AppContext } from './types';
import { getEnvVariable } from './environments/base-environment';

async function addGraphQLMiddleware(
  app: Express,
  redisClient: Redis
): Promise<void> {
  const httpServer = createHttpServer(app);
  const graphQlServer = new ApolloServer({
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer })
    ],
    schema: await buildSchema({
      resolvers,
      validate: true
    })
  });

  await graphQlServer.start();

  app.use(
    '/graphql',
    expressMiddleware(graphQlServer, {
      context: async ({ req, res }): Promise<AppContext> => {
        return {
          redis: redisClient,
          request: req,
          response: res
        };
      }
    })
  );
}

async function addRedisSessionMiddleware(
  app: Express,
  client: Redis
): Promise<void> {
  const dayInMilliseconds = 24 * 60 * 60 * 1000;
  const { isProd, session } = environment;

  app.use(
    expressSession({
      name: session.cookieName,
      cookie: {
        httpOnly: true,
        maxAge: 30 * dayInMilliseconds,
        sameSite: 'lax',
        secure: isProd
      },
      resave: false,
      saveUninitialized: false,
      secret: session.secret,
      store: new RedisStore({
        client,
        disableTouch: true
      })
    })
  );
  console.log('getting to redis');
}

async function initializeDataSource(): Promise<void> {
  const { databaseOptions } = environment;
  const dataSource = new DataSource({
    ...databaseOptions,
    entities
  });
  await dataSource.initialize();
}

async function main(): Promise<void> {
  const app = express();

  app.use(cors({
    credentials: true,
    origin: environment.urls.web
  }));

  app.use(bodyParser.json());

  app.use('/assets', express.static(pathJoin(__dirname, 'assets')));

  app.get('/api', (_req, res) => {
    res.send({ message: 'Welcome to firestarter-api' });
  });

  const redisClient = new IoRedis(getEnvVariable('REDIS_URL'));

  console.log('starting up redis stuff');

  await Promise.all([
    addGraphQLMiddleware(app, redisClient),
    addRedisSessionMiddleware(app, redisClient),
    initializeDataSource()
  ]);

  console.log('got past starting up');
  
  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });

  server.on('error', console.error);
}

main();
