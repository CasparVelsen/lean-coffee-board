import useSWR from 'swr';
import styled from 'styled-components';
import Entry from './components/Entry';
import EntryForm from './components/EntryForm';
import NameForm from './components/NameForm';
import { useState } from 'react';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function App() {
  const [user, setUser] = useState('');
  const [userColor, setUserColor] = useState('');
  const [active, setActive] = useState(false);

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
      {!active && <NameForm onSubmit={handleNewUser} />}
      {active && (
        <EntryList role="list">
          {entries
            ? entries.map(({ text, author, color, createdAt, _id, tempId }) => (
                <li key={_id ?? tempId}>
                  <Entry
                    text={text}
                    author={author}
                    color={color}
                    createdAt={createdAt}
                  />
                </li>
              ))
            : '...loading...'}
        </EntryList>
      )}
      {active && <EntryForm onSubmit={handleNewEntry} />}
    </>
  );

  function handleNewUser(name, color) {
    setUser(name);
    setUserColor(color);
    setActive(!active);
  }

  async function handleNewEntry(text) {
    const newEntry = {
      text,
      author: user,
      color: userColor,
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
