async function loadProducts(category = '') {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '<p>Se incarca produse...</p>';

    try {
        const endpoint = category ? `/products?category=${encodeURIComponent(category)}` : '/products';
        const { data: products } = await api.get(endpoint);

        if (!products.length) {
            productsContainer.innerHTML = '<p class="muted">Nu exista produse pentru filtrul ales.</p>';
            return;
        }

        productsContainer.innerHTML = products.map((product) => `
      <article class="card">
        <img src="${product.poza}" alt="${product.nume}" />
        <div class="card-body">
          <h3>${product.nume}</h3>
          <p class="muted">${product.categorie}</p>
          <p class="price">${formatPrice(product.pret)}</p>
          <div class="row">
            <a class="btn secondary" href="product.html?id=${product.id}">Vezi produs</a>
            <button class="btn" data-add="${product.id}">Adauga in cos</button>
          </div>
        </div>
      </article>
    `).join('');

        productsContainer.querySelectorAll('[data-add]').forEach((btn) => {
            btn.addEventListener('click', () => {
                const id = Number(btn.dataset.add);
                const selected = products.find((p) => p.id === id);
                if (selected) {
                    addToCart(selected);
                    btn.textContent = 'Adaugat';
                    setTimeout(() => { btn.textContent = 'Adauga in cos'; }, 900);
                }
            });
        });
    } catch (error) {
        productsContainer.innerHTML = '<p class="muted">Eroare la incarcarea produselor.</p>';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await bootNav();
    await loadProducts();

    document.getElementById('filterBtn').addEventListener('click', async () => {
        const category = document.getElementById('categoryFilter').value.trim();
        await loadProducts(category);
    });

    document.getElementById('clearFilterBtn').addEventListener('click', async () => {
        document.getElementById('categoryFilter').value = '';
        await loadProducts();
    });
});
