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
    <AppWrapper>
      <StyledHeader>Lean Coffee Board</StyledHeader>
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
                    onDelete={() => handleDelete(_id)}
                  />
                </li>
              ))
            : '...loading...'}
        </EntryList>
      )}
      {active && <EntryForm onSubmit={handleNewEntry} />}
    </AppWrapper>
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

  async function handleDelete(_id) {
    const filteredEntries = entries.filter(entry => entry._id !== _id);
    mutateEntries(filteredEntries, false);

    await fetch('/api/entries', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
    });

    mutateEntries();
  }
}

const AppWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 60px auto 80px;
`;

const StyledHeader = styled.h1`
  background-color: #00e7c2;
  color: white;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(39, 50, 47, 0.25);
  font-family: 'Lobster', sans-serif;
  padding: 5px 0px;
  margin: 0;
`;

const EntryList = styled.ul`
  overflow-y: auto;
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`;
