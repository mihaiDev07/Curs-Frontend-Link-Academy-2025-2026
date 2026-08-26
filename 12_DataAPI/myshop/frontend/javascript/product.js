function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get('id'));
}

async function loadProduct() {
    const detail = document.getElementById('productDetail');
    const id = getProductId();

    if (!id) {
        detail.innerHTML = '<p class="muted">ID produs lipsa.</p>';
        return;
    }

    try {
        const { data: product } = await api.get(`/products/${id}`);

        detail.innerHTML = `
      <div class="detail">
        <img src="${product.poza}" alt="${product.nume}" />
        <div>
          <h2>${product.nume}</h2>
          <p class="muted">Categorie: ${product.categorie}</p>
          <p class="price">${formatPrice(product.pret)}</p>
          <p>${product.descriere}</p>
          <div class="row" style="margin-top:14px;">
            <button id="addBtn" class="btn">Adauga in cos</button>
            <a href="index.html" class="btn secondary">Inapoi la lista</a>
          </div>
        </div>
      </div>
    `;

        document.getElementById('addBtn').addEventListener('click', () => {
            addToCart(product);
            document.getElementById('addBtn').textContent = 'Adaugat';
        });
    } catch (error) {
        detail.innerHTML = '<p class="muted">Produsul nu a fost gasit.</p>';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await bootNav();
    await loadProduct();
});
