import { useState, useEffect, useContext } from 'react';

import './App.css';
import { useRPC } from './rpc';
import ErrorBoundary from './error';

import { AuthContext, useAuth, setAuth } from './auth';


type LoginProps = {
    setAuth: setAuth
};

function Login({ setAuth }: LoginProps) {
    const { error, call, result: token, isLoading } = useRPC('login');
    const [ username, setUserName ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    useEffect(() => {
        if (username && token) {
            setAuth({ username, token });
        }
    }, [token, setAuth, username]);

    if (isLoading) {
        return <p>Loading....</p>;
    }

    return (
        <ErrorBoundary>
          <form onSubmit={() => call(username, password)}>
            <label>
              <p>Username</p>
              <input type="text" onChange={e => setUserName(e.target.value)} />
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
            { error && <p className="error">{ error }</p> }
          </form>
        </ErrorBoundary>
    );
}

function App() {
  const { auth, setAuth } = useAuth();

  if(!auth) {
    return <Login setAuth={setAuth} />
  }

  return (
      <AuthContext.Provider value={{ auth, setAuth }}>
        <div className="App">
          <p>Welcome { auth.username }</p>
        </div>
        <Test/>
      </AuthContext.Provider>
  );
}

function Test() {
    const { auth } = useContext(AuthContext);
    if (auth?.token) {
        return <p>{ auth.token }</p>;
    }
    return <></>
}

export default App;
