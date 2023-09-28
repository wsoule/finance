import { FC } from 'react';
import { useAuthenticatedGuard } from '../../guards';
import { Page } from '../../components';

const loggedInGuards = [ useAuthenticatedGuard ];

export const DashboardPage: FC = () => {
  const routeGuards = loggedInGuards.map((guard) => guard());
  return (
    <>
      <title>Dashboard</title>
      <Page size={'large'} guards={routeGuards}>

      </Page>
    </>
  );
};


export default DashboardPage;