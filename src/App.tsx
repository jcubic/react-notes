import { useState, useEffect, useContext } from 'react';

import './App.css';

import { useSecureRPC } from './rpc';
import { TreeView } from './componets/TreeView';
import Login from './componets/Login'
import { useAuth, AuthContext } from './auth';

interface INote {
    id: number;
    name: string;
    user: string;
    content: string;
}

function App() {
  const { auth, setAuth } = useAuth();
  const [ note, setNote ] = useState<INote | null>(null);
  const {
    error,
    call: get_notes,
    result: notes,
    authError,
    isLoading
  } = useSecureRPC<INote[]>('get_notes');

  useEffect(() => {
    if (auth) {
      get_notes(auth.username);
    }
  }, [auth]);

  if(!auth) {
    return <Login setAuth={setAuth} />
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error || !notes) {
    return <p>error</p>;
  }
  if (authError) {
    return <p>Error: {authError}</p>;
  }

  // TODO: fix type of INote vs TreeNodeT
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <div className="App">
        <p>Welcome { auth.username }</p>
        <h1>This is { note?.name }</h1>
        <Test/>
        <textarea value={note?.content } />
        <TreeView data={notes} onChange={note => { setNote(note) }} />
      </div>
    </AuthContext.Provider>
  );
}

function Test() {
  const { auth } = useContext(AuthContext);
  if (auth?.token) {
    return <p>Token: <strong>{ auth.token }</strong></p>;
  }
  return <p>Pending...</p>
}

export default App;
