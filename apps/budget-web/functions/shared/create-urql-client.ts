import {
  cacheExchange,
  Cache,
  QueryInput
} from '@urql/exchange-graphcache';

import {
  Client,
  createClient,
  fetchExchange
} from 'urql';
import { environment } from '../../environments';
import {
  UserCreateMutation,
  UserDetailsDocument,
  UserDetailsQuery,
  UserLoginMutation,
  UserLogoutMutation
} from '../../generated/graphql';

function updateQuery<ResultT, QueryT>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  updateCallback: (result: ResultT, query: QueryT) => QueryT
): void {
  cache.updateQuery(queryInput, (query) => updateCallback(result, query as any) as any);
}

export function  createUrqlClient(): Client {

  return  createClient({
    url: `${environment.apiUrl}/graphql`,
    exchanges: [
      cacheExchange({
        updates: {
          Mutation: {

            userCreate: (result, _args, cache, _info) => {
              // Update userDetails when userCreate is called.
              updateQuery<UserCreateMutation, UserDetailsQuery>(
                cache,
                { query: UserDetailsDocument },
                result,
                (createResult, _oldUserDetails) => {
                  return {
                    userDetails: createResult.userCreate
                  };
                }
              );
            },
            userLogin: (result, _args, cache, _info) => {
              // Update userDetails when userLogin is called.
              console.log('did this');
              updateQuery<UserLoginMutation, UserDetailsQuery>(
                cache,
                { query: UserDetailsDocument },
                result,
                (loginResult, _oldUserDetails) => {
                  return {
                    userDetails: loginResult.userLogin
                  };
                }
              );
            },
            userLogout: (result, _args, cache, _info) => {
              // Update userDetails when userLogout is calld
              updateQuery<UserLogoutMutation, UserDetailsQuery>(
                cache,
                { query: UserDetailsDocument },
                result,
                (_logoutResult, _oldUserDetails) => {
                  return {
                    userDetails: null
                  };
                });
            }
          }
        }
      }),
      fetchExchange
    ]
  });
}
