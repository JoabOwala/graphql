import { handleAuth, handleLogout } from './auth.js';
import { showLoginPage, showProfilePage } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('jwt');

    if (token) {
        showProfilePage();
    } else {
        showLoginPage();
    }

    // Add event listeners for login and logout
    const app = document.getElementById('app');
    app.addEventListener('submit', (e) => {
        if (e.target.id === 'login-form') {
            handleAuth(e);
        }
    });

    app.addEventListener('click', (e) => {
        if (e.target.id === 'logout-button') {
            handleLogout();
        }
    });
});
