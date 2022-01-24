import { createAuthProvider } from 'react-token-auth'

type Session = { accessToken: string; refreshToken: string }

export const { useAuth, authFetch, login, logout } = createAuthProvider<Session>({    
    getAccessToken: session => session.accessToken,
    storage: localStorage,
    onUpdateToken: token =>
        fetch('http://127.0.0.1:5000/api/refresh', {
            method: 'POST',
            body: token.accessToken,
        }).then(r => r.json()),
});