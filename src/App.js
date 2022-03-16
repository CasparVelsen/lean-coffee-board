import useSWR from 'swr';
import styled from 'styled-components';
import Entry from './components/Entry';
import EntryForm from './components/EntryForm';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function App() {
  const {
    data: entries,
    error: entriesError,
    mutate: mutateEntries,
  } = useSWR('/api/entries', fetcher, {
    refreshInterval: 1000,
  });

  if (entriesError) return <h1>Sorry, could not fetch.</h1>;

  return (
    <>
      <h1>Lean Coffee Board</h1>
      <EntryList role="list">
        {entries
          ? entries.map(({ text, author, _id }) => (
              <li key={_id}>
                <Entry text={text} author={author} />
              </li>
            ))
          : '...loading...'}
      </EntryList>
      <EntryForm onSubmit={handleNewEntry} />
    </>
  );

  async function handleNewEntry(text) {
    const newEntry = {
      text,
      author: 'Anonymous',
    };

    mutateEntries([...entries, newEntry], false);

    await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    });

    mutateEntries();
  }
}

const EntryList = styled.ul`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`;
