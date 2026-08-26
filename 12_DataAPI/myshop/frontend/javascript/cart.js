function renderCart() {
    const cartWrap = document.getElementById('cartWrap');
    const cart = getCart();

    if (!cart.length) {
        cartWrap.innerHTML = '<p class="muted">Cosul este gol.</p>';
        return;
    }

    const total = cart.reduce((sum, item) => sum + Number(item.pret) * Number(item.qty), 0);

    cartWrap.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Produs</th>
          <th>Pret</th>
          <th>Cantitate</th>
          <th>Subtotal</th>
          <th>Actiuni</th>
        </tr>
      </thead>
      <tbody>
        ${cart.map((item) => `
          <tr>
            <td>${item.nume}</td>
            <td>${formatPrice(item.pret)}</td>
            <td>${item.qty}</td>
            <td>${formatPrice(item.pret * item.qty)}</td>
            <td>
              <button class="btn secondary" data-minus="${item.id}">-</button>
              <button class="btn" data-plus="${item.id}">+</button>
              <button class="btn secondary" data-remove="${item.id}">Sterge</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <h3>Total: ${formatPrice(total)}</h3>
    <div class="row">
      <button id="clearCart" class="btn secondary">Goleste cos</button>
    </div>
  `;

    cartWrap.querySelectorAll('[data-plus]').forEach((btn) => {
        btn.addEventListener('click', () => updateQty(Number(btn.dataset.plus), 1));
    });

    cartWrap.querySelectorAll('[data-minus]').forEach((btn) => {
        btn.addEventListener('click', () => updateQty(Number(btn.dataset.minus), -1));
    });

    cartWrap.querySelectorAll('[data-remove]').forEach((btn) => {
        btn.addEventListener('click', () => removeItem(Number(btn.dataset.remove)));
    });

    document.getElementById('clearCart').addEventListener('click', () => {
        saveCart([]);
        renderCart();
    });
}

function updateQty(id, delta) {
    const cart = getCart();
    const item = cart.find((entry) => entry.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        const next = cart.filter((entry) => entry.id !== id);
        saveCart(next);
    } else {
        saveCart(cart);
    }

    renderCart();
}

function removeItem(id) {
    const cart = getCart().filter((item) => item.id !== id);
    saveCart(cart);
    renderCart();
}

document.addEventListener('DOMContentLoaded', async () => {
    await bootNav();
    renderCart();
});
