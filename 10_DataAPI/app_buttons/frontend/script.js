const API_URL = 'http://localhost:3000';

// Elementele din DOM
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const count1 = document.getElementById('count1');
const count2 = document.getElementById('count2');
const message = document.getElementById('message');

// Inițializează aplicația
async function initApp() {
    try {
        const response = await axios.get(`${API_URL}/api/clicks`);
        count1.textContent = response.data.button1;
        count2.textContent = response.data.button2;
        message.textContent = ' Conectat la server';
        message.style.color = '#4CAF50';
    } catch (error) {
        console.error('Eroare la inițializare:', error);
        message.textContent = '✗ Eroare la conectare. Asigură-te că serverul rulează!';
        message.style.color = '#f44336';
    }
}

// Înregistrează click pentru buton 1
btn1.addEventListener('click', async () => {
    try {
        const response = await axios.post(`${API_URL}/api/click/button1`);
        count1.textContent = response.data.button1;
        message.textContent = '✓ Click înregistrat!';
        message.style.color = '#4CAF50';
    } catch (error) {
        console.error('Eroare la click:', error);
        message.textContent = '✗ Eroare la trimiterea click-ului';
        message.style.color = '#f44336';
    }
});

// Înregistrează click pentru buton 2
btn2.addEventListener('click', async () => {
    try {
        const response = await axios.post(`${API_URL}/api/click/button2`);
        count2.textContent = response.data.button2;
        message.textContent = 'Click înregistrat!';
        message.style.color = '#4CAF50';
    } catch (error) {
        console.error('Eroare la click:', error);
        message.textContent = 'Eroare la trimiterea click-ului';
        message.style.color = '#f44336';
    }
});

// Inițializează aplicația la încărcare
window.addEventListener('load', initApp);
