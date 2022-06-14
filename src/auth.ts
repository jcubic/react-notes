import { useState, useEffect, Dispatch, SetStateAction, createContext } from 'react';

type setAuth = Dispatch<SetStateAction<IAuth | null>>;

type AuthContext = {
    auth: IAuth | null,
    setAuth: setAuth | null
};

interface IAuth {
    username: string | null;
    token: string | null;
}

const AuthContext = createContext({} as AuthContext);

const LS_KEY = 'notes_auth';

function getStorageAuth(): IAuth | null {
    const data = localStorage.getItem(LS_KEY);
    if (!data) {
        return null;
    }
    return JSON.parse(data);
}

function setStorageAuth(auth: IAuth): void {
    localStorage.setItem(LS_KEY, JSON.stringify(auth));
}

function useAuth() {
    const [auth, setAuth] = useState<IAuth | null>(null);

    useEffect(() => {
        if (auth) {
            setStorageAuth(auth);
        }
    }, [auth]);

    useEffect(() => {
        const auth = getStorageAuth();
        if (auth) {
            setAuth(auth);
        }
    }, [setAuth]);

    return { auth, setAuth };
}

export { useAuth, AuthContext, type setAuth }
