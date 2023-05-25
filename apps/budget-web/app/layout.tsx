import Head from 'next/head';
import './global.scss';

export const metadata = {
  title: 'Budget App',
  description: 'For All Your Budgeting Needs'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Head>
        <title>Welcome to budget-web!</title>
      </Head>
      <body>
        TOP OF LAYOUT
        {children}
        BOTTOM OF LAYOUT
      </body>
    </html>
  );
}
