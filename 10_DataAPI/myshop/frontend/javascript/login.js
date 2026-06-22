function showLoginMessage(type, text) {
    const flash = document.getElementById('loginFlash');
    flash.className = `flash ${type}`;
    flash.textContent = text;
}

document.addEventListener('DOMContentLoaded', async () => {
    const user = await bootNav();

    if (user) {
        showLoginMessage('success', 'Esti deja logat. Redirectionare catre admin...');
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 800);
        return;
    }

    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const mail = document.getElementById('mail').value.trim();
        const parola = document.getElementById('parola').value;

        try {
            await api.post('/login', { mail, parola });
            showLoginMessage('success', 'Login reusit. Mergi catre administrare...');
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 800);
        } catch (error) {
            const message = error?.response?.data?.message || 'Nu s-a putut realiza login-ul.';
            showLoginMessage('error', message);
        }
    });
});
