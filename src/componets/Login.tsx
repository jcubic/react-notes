import { useState, useEffect } from 'react';
import { useRPC } from '../rpc';
import { setAuth } from '../auth';
import ErrorBoundary from '../error';

type LoginProps = {
    setAuth: setAuth
};

function Login({ setAuth }: LoginProps) {
    const { error, call, result: token, isLoading } = useRPC<string>('login');
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

export default Login;
