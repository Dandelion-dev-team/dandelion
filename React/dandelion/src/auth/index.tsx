import { createAuthProvider } from 'react-token-auth';

type Session = { accessToken: string; refreshToken: string };



export const { useAuth, authFetch, login, logout } = createAuthProvider<Session>({
    getAccessToken: session => session.accessToken,
    storage: localStorage,
    onUpdateToken: token =>
        fetch('/update-token', {
            method: 'POST',
            body: token.refreshToken,
        }).then(r => r.json()),
});