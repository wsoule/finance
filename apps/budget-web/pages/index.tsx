import { FC, useEffect, useState } from 'react';

export const Page: FC = () => {
  const [content, setContent] = useState<string | null>(null);
  useEffect(() => {
    (async (): Promise<void> => {
      const newContent = (await (await fetch('http://localhost:3333/api')).json()).message;
      setContent(newContent);
    })();
  }, []);

  return (
    <>{content ?? 'Loading...'}</>
  );
};

export default Page;