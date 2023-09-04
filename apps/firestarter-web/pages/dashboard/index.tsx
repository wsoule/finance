import {
  FC,
  useEffect,
  useState
} from 'react';
import { useAuthenticatedGuard } from '../../guards';
import { Page } from '../../components';
import { convertToMoney } from '@finance/core';
import { Loading } from '@finance/react';
import {
  useAccountDetailsQuery,
  useUserDetailsQuery
} from '../../generated/graphql';
import {
  Heading,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber
} from '@chakra-ui/react';

const loggedInGuards = [ useAuthenticatedGuard ];

export const DashboardPage: FC = () => {
  const [ { data: accountData, fetching: accountDetailsFetching } ] = useAccountDetailsQuery();
  const [ { data: userData, fetching: userDetailsFetching } ] = useUserDetailsQuery();
  const { balance, updatedAt: accountUpdatedAt, id: accountId } = accountData?.accountDetails ?? { balance: 0 };
  const { username, id: userId } = userData?.userDetails ?? {};
  const [ dashboardPageFormat, setDashboardPageFormat ] = useState<JSX.Element>();
  const routeGuards = loggedInGuards.map((guard) => guard());

  /** set the updatedAt number to be a readable format: Day, month date, year, time.*/
  const updatedAtString = (updatedAtNumber: number | undefined): string => {
    return ((updatedAtNumber) ? new Date(updatedAtNumber).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }) : 'no date available');
  };

  useEffect(() => {
    if (userDetailsFetching || accountDetailsFetching) {
      setDashboardPageFormat(<Loading isLoading={true} />);
    } else {
      setDashboardPageFormat(
        <>
          <Heading key={userId} mb={4}>Welcome {username}</Heading>
          <Stat borderWidth={'1px'} borderRadius={'lg'} padding={'2'} key={accountId}>
            <StatLabel>Balance</StatLabel>
            <StatNumber>{convertToMoney(balance)}</StatNumber>
            <StatLabel>Last Updated</StatLabel>
            <StatHelpText>{updatedAtString(accountUpdatedAt)}</StatHelpText>
          </Stat>
        </>
      );
    }
  }, [ accountDetailsFetching, accountId, accountUpdatedAt, balance, userDetailsFetching, userId, username ]);

  return (
    <>
      <title>Dashboard</title>
      <Page size={'large'} guards={routeGuards}>
        {dashboardPageFormat}
      </Page>
    </>
  );
};

export default DashboardPage;
