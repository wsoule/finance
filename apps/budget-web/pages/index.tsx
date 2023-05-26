import { FC, useState } from 'react';
import { useUserDetailsQuery } from '../generated/graphql';

export const Page: FC = () => {
  const [search, setSearch] = useState('foob');
  const [{ data: userDetails, fetching }] = useUserDetailsQuery({ //what is the data: userDetails
    variables: {
      input: { username : search }
    }
  });

  return (
    <>
      <div>
        <input
          onChange={(e): void => setSearch(e.currentTarget.value)}
          value={search}
        />
      </div>
      <div>
        {(!fetching && userDetails) ? (
          userDetails.userDetails?.email ?? 'Not Found'
        ) : 'Loading...'}
      </div>
    </>
  );
};

export default Page;