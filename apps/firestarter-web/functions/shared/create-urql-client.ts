import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';
import { Client, createClient, fetchExchange } from 'urql';
import { environment } from '../../environments';
import {
  AccountDetailsDocument, AccountDetailsQuery, AccountUpdateBalanceMutation, TransactionCreateMutation,
  TransactionDeleteMutation, TransactionDetailsDocument, TransactionDetailsQuery, UserCreateMutation,
  UserDetailsDocument, UserDetailsQuery, UserLoginMutation, UserLogoutMutation
} from '../../generated/graphql';
import { authenticationErrorExchange } from '../exchanges/authentication-error-exchange';

function updateQuery<ResultT, QueryT>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  updateCallback: (result: ResultT, query: QueryT) => QueryT
): void {
  cache.updateQuery(queryInput, (query) => updateCallback(result, query as any) as any);
}

export function createUrqlClient(): Client {

  return createClient({
    url: `${environment.apiUrl}/graphql`,
    exchanges: [
      cacheExchange({
        updates: {
          Mutation: {
            accountUpdateBalance: (result, _args, cache, _info) => {
              // Update accountDetails cache when accountUpdateBalance is called.
              updateQuery<AccountUpdateBalanceMutation, AccountDetailsQuery>(
                cache,
                { query: AccountDetailsDocument },
                result,
                (accountBalanceResult, _oldAccountDetails) => {
                  return {
                    accountDetails: accountBalanceResult.accountUpdateBalance
                  };
                });
            },
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
              // Update userDetails when userLogout is called.
              updateQuery<UserLogoutMutation, UserDetailsQuery>(
                cache,
                { query: UserDetailsDocument },
                result,
                (_logoutResult, _oldUserDetails) => {
                  return {
                    userDetails: null
                  };
                });
            },
            transactionCreate: (result, _args, cache, _info) => {
              // updates transactionDetailsQuery cache when transactionCreate is called.
              updateQuery<TransactionCreateMutation, TransactionDetailsQuery>(
                cache,
                { query: TransactionDetailsDocument },
                result,
                (transactionDetailsResult, oldTransactionDetails) => {
                  return {
                    transactionDetails: [ transactionDetailsResult.transactionCreate, ...oldTransactionDetails.transactionDetails ]
                  };
                }
              );
              // TODO - fix this, is not updating accountbalance 
              // update Accountbalance cache when transactionCreate is called.
              // updateQuery<AccountUpdateBalanceMutation, AccountDetailsQuery>(
              //   cache,
              //   { query: AccountDetailsDocument },
              //   result,
              //   (accountDetails, _oldAccountDetails) => {
              //     return {
              //       accountDetails: accountDetails.accountUpdateBalance
              //     };
              //   }
              // );
            },
            transactionDelete: (result, _args, cache, _info) => {
              // updates the transactionDetailsQuery when the transactionDelete mutation is called.
              updateQuery<TransactionDeleteMutation, TransactionDetailsQuery>(
                cache,
                { query: TransactionDetailsDocument },
                result,
                (_transactionDetailsResult, oldTransactionDetails) => {
                  // create an array of the oldTransaction details & remove the deleted item
                  const oldTransactionDetailsArray = oldTransactionDetails.transactionDetails;
                  const itemToDelete = oldTransactionDetailsArray.findIndex((item) => {
                    return item.id === _transactionDetailsResult.transactionDelete.id;
                  });
                  if (itemToDelete > -1) {
                    oldTransactionDetailsArray.splice(itemToDelete, 1);
                  }
                  return {
                    transactionDetails: oldTransactionDetailsArray
                  };
                }
              );
            }
          }
        }
      }),
      authenticationErrorExchange,
      fetchExchange
    ],
    fetchOptions: {
      credentials: 'include' as const
    }
  });
}
