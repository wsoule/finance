import { Client } from 'urql';

export function createMockUrqlClient(): Client {
  return {
    executeQuery: jest.fn(() => {
      // Intentionally left blank.
    }),
    executeMutation: jest.fn(() => {
      // Intentionally left blank.
    }),
    executeSubscription: jest.fn(() => {
      // Intentionally left blank.
    })
  } as unknown as Client;
}