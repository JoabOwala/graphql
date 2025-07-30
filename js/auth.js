import { graphqlQuery } from './graphql.js';
import { showProfilePage } from './ui.js';

const signInURL = 'https://learn.zone01kisumu.ke/api/auth/signin';

export async function handleAuth(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const credentials = btoa(`${username}:${password}`);

    try {
        const response = await fetch(signInURL, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });

        if (response.ok) {
            const jwt = await response.json();
            localStorage.setItem('jwt', jwt);
            showProfilePage();
        } else {
            const error = await response.json();
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = error.error || 'Invalid credentials';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Login error:', error);
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'An error occurred during login.';
        errorMessage.style.display = 'block';
    }
}

export function handleLogout() {
    localStorage.removeItem('jwt');
    window.location.reload();
}
