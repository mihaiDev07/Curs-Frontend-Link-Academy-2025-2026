document.addEventListener('DOMContentLoaded', onDetailsLoad);

async function getProducts() {
    const response = await fetch('makeup.json');
    const products = await response.json();
    return products;
}

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get('id'));
    return Number.isNaN(id) ? null : id;
}

function formatValue(value, fallback = 'N/A') {
    if (value === null || value === undefined || value === '') {
        return fallback;
    }

    return value;
}

function renderProduct(product) {
    const colors = (product.product_colors || []).map(function (color) {
        const colorName = formatValue(color.colour_name, 'Unnamed');
        return `<span class="badge me-2 mb-2" style="background:${color.hex_value}; color:#fff;">${colorName}</span>`;
    }).join('');

    const html = `
        <div class="col-lg-5 mb-4">
            <img src="${formatValue(product.image_link, '')}" alt="${formatValue(product.name)}" class="img-fluid rounded shadow-sm">
        </div>
        <div class="col-lg-7">
            <h2 class="mb-3">${formatValue(product.name)}</h2>
            <p class="mb-1"><strong>Brand:</strong> ${formatValue(product.brand)}</p>
            <p class="mb-1"><strong>Type:</strong> ${formatValue(product.product_type)}</p>
            <p class="mb-1"><strong>Category:</strong> ${formatValue(product.category)}</p>
            <p class="mb-1"><strong>Price:</strong> ${formatValue(product.price)}</p>
            <p class="mb-1"><strong>Rating:</strong> ${formatValue(product.rating)}</p>
            <p class="mt-3">${formatValue(product.description)}</p>
            <div class="mt-3">
                <strong>Colors:</strong>
                <div class="mt-2">${colors || '<span>N/A</span>'}</div>
            </div>
            <div class="mt-4">
                <a href="${formatValue(product.product_link, '#')}" target="_blank" rel="noopener" class="btn btn-primary me-2">Product Page</a>
                <a href="${formatValue(product.website_link, '#')}" target="_blank" rel="noopener" class="btn btn-outline-primary">Website</a>
            </div>
        </div>
    `;

    document.getElementById('productDetails').innerHTML = html;
}

function renderError(message) {
    document.getElementById('productDetails').innerHTML = `
        <div class="col-12">
            <div class="alert alert-warning">${message}</div>
        </div>
    `;
}

async function onDetailsLoad() {
    document.getElementById('loader').classList.remove('hidden');

    try {
        const productId = getProductIdFromUrl();

        if (productId === null) {
            renderError('Product id is missing from URL.');
            return;
        }

        const products = await getProducts();
        const product = products.find(function (p) {
            return p.id === productId;
        });

        if (!product) {
            renderError('Product not found.');
            return;
        }

        renderProduct(product);
    } catch (error) {
        renderError('Products could not be loaded.');
        console.error(error);
    } finally {
        document.getElementById('loader').classList.add('hidden');
    }
}
