function resolveApiBaseUrl() {
    const { hostname, port, protocol } = window.location;
    const isBackendOrigin = (hostname === 'localhost' || hostname === '127.0.0.1') && port === '3000';

    if (isBackendOrigin) {
        return '/api';
    }

    if (protocol === 'https:') {
        console.warn('Live Server over HTTPS may block HTTP API requests. Prefer http://localhost:5500 for this app.');
    }

    return 'http://localhost:3000/api';
}

const api = axios.create({
    baseURL: resolveApiBaseUrl(),
    withCredentials: true
});

const CART_KEY = 'myshop_cart';

function getCart() {
    const cartRaw = localStorage.getItem(CART_KEY);
    return cartRaw ? JSON.parse(cartRaw) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
}

function getCartCount() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
}

function updateCartBadge() {
    const badge = document.getElementById('nav-cart-count');
    if (!badge) return;

    badge.textContent = String(getCartCount());
}

function addToCart(product) {
    const cart = getCart();
    const found = cart.find((item) => item.id === product.id);

    if (found) {
        found.qty += 1;
    } else {
        cart.push({
            id: product.id,
            nume: product.nume,
            pret: product.pret,
            poza: product.poza,
            qty: 1
        });
    }

    saveCart(cart);
}

function formatPrice(value) {
    return `${Number(value).toFixed(2)} RON`;
}

async function getCurrentUser() {
    try {
        const { data } = await api.get('/me');
        return data.loggedIn ? data.user : null;
    } catch (error) {
        return null;
    }
}

function setNavState(user) {
    const userNode = document.getElementById('nav-user');
    const adminLink = document.getElementById('nav-admin');
    const loginLink = document.getElementById('nav-login');
    const logoutBtn = document.getElementById('nav-logout');

    if (userNode) {
        userNode.textContent = user ? `Salut, ${user.prenume}` : 'Vizitator';
    }

    if (adminLink) {
        adminLink.style.display = user ? 'inline-block' : 'none';
    }

    if (loginLink) {
        loginLink.style.display = user ? 'none' : 'inline-block';
    }

    if (logoutBtn) {
        logoutBtn.style.display = user ? 'inline-block' : 'none';
        logoutBtn.onclick = async () => {
            await api.post('/logout');
            window.location.href = 'index.html';
        };
    }
}

async function bootNav() {
    const user = await getCurrentUser();
    setNavState(user);
    updateCartBadge();
    return user;
}
