function showAdminMessage(type, text) {
    const flash = document.getElementById('adminFlash');
    flash.className = `flash ${type}`;
    flash.textContent = text;
}

async function loadAdminProducts() {
    const list = document.getElementById('adminProducts');
    list.innerHTML = '<p>Se incarca...</p>';

    try {
        const { data: products } = await api.get('/products');
        list.innerHTML = products.map((product) => `
            <article class="card" data-card-id="${product.id}">
        <img src="${product.poza}" alt="${product.nume}" />
        <div class="card-body">
          <h3>#${product.id} ${product.nume}</h3>
          <p class="muted">${product.categorie}</p>
          <p class="price">${formatPrice(product.pret)}</p>
                    <div class="row">
                        <button class="btn secondary" data-edit-id="${product.id}">Edit</button>
                    </div>
        </div>
      </article>
    `).join('');

        list.querySelectorAll('[data-edit-id]').forEach((button) => {
            button.addEventListener('click', () => {
                const selectedId = Number(button.dataset.editId);
                const product = products.find((item) => item.id === selectedId);
                if (!product) {
                    showAdminMessage('error', 'Produsul selectat nu a fost gasit.');
                    return;
                }

                document.getElementById('editId').value = product.id;
                document.getElementById('editNume').value = product.nume || '';
                document.getElementById('editDescriere').value = product.descriere || '';
                document.getElementById('editPret').value = product.pret ?? '';
                document.getElementById('editPoza').value = product.poza || '';
                document.getElementById('editCategorie').value = product.categorie || '';

                list.querySelectorAll('.card.edit-selected').forEach((card) => {
                    card.classList.remove('edit-selected');
                });

                const currentCard = button.closest('.card');
                if (currentCard) {
                    currentCard.classList.add('edit-selected');
                }

                showAdminMessage('success', `Formular completat pentru produsul #${product.id}.`);
                document.getElementById('editForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    } catch (error) {
        list.innerHTML = '<p class="muted">Nu am putut incarca lista.</p>';
    }
}

function getEditPayload() {
    const payload = {};
    const nume = document.getElementById('editNume').value.trim();
    const descriere = document.getElementById('editDescriere').value.trim();
    const pret = document.getElementById('editPret').value.trim();
    const poza = document.getElementById('editPoza').value.trim();
    const categorie = document.getElementById('editCategorie').value.trim();

    if (nume) payload.nume = nume;
    if (descriere) payload.descriere = descriere;
    if (pret) payload.pret = Number(pret);
    if (poza) payload.poza = poza;
    if (categorie) payload.categorie = categorie;

    return payload;
}

document.addEventListener('DOMContentLoaded', async () => {
    const user = await bootNav();
    if (!user) {
        showAdminMessage('error', 'Acces interzis. Te rugam sa te loghezi.');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 900);
        return;
    }

    await loadAdminProducts();

    document.getElementById('addForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const payload = {
            nume: document.getElementById('addNume').value.trim(),
            descriere: document.getElementById('addDescriere').value.trim(),
            pret: Number(document.getElementById('addPret').value),
            poza: document.getElementById('addPoza').value.trim(),
            categorie: document.getElementById('addCategorie').value.trim()
        };

        try {
            await api.post('/products', payload);
            showAdminMessage('success', 'Produs adaugat cu succes.');
            document.getElementById('addForm').reset();
            await loadAdminProducts();
        } catch (error) {
            const message = error?.response?.data?.message || 'Nu am putut adauga produsul.';
            showAdminMessage('error', message);
        }
    });

    document.getElementById('editForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const productId = Number(document.getElementById('editId').value);
        const payload = getEditPayload();

        if (!productId) {
            showAdminMessage('error', 'Introdu un ID valid.');
            return;
        }

        if (!Object.keys(payload).length) {
            showAdminMessage('error', 'Completeaza cel putin un camp pentru editare.');
            return;
        }

        try {
            await api.put(`/products/${productId}`, payload);
            showAdminMessage('success', 'Produs actualizat cu succes.');
            document.getElementById('editForm').reset();
            await loadAdminProducts();
        } catch (error) {
            const message = error?.response?.data?.message || 'Nu am putut actualiza produsul.';
            showAdminMessage('error', message);
        }
    });
});
