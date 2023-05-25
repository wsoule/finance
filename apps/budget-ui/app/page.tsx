export default async function Index(): Promise<JSX.Element> {
  const content = await fetch('http://localhost:3333/api');

  return (
    <div>
      {(await content.json()).message}
    </div>
  );

}
