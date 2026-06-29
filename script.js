const products = [
    {
        id: '1',
        name: 'Essential Tee',
        price: 149000,
        description: 'T-shirt minimalis dengan bahan lembut, cocok untuk tampilan kasual harian.',
        image: 'Product Image 1'
    },
    {
        id: '2',
        name: 'Modern Hoodie',
        price: 299000,
        description: 'Hoodie modern dengan potongan nyaman untuk gaya kasual hangat setiap hari.',
        image: 'Product Image 2'
    },
    {
        id: '3',
        name: 'Signature Cap',
        price: 125000,
        description: 'Topi signature yang ringan dan mudah dipadukan dengan hampir semua outfit.',
        image: 'Product Image 3'
    }
];

const cart = {};
const cartCountEl = document.getElementById('cartCount');
const cartToggle = document.getElementById('cartToggle');
const cartModal = document.getElementById('cartModal');
const productModal = document.getElementById('productModal');
const closeProductModal = document.getElementById('closeProductModal');
const closeCartModal = document.getElementById('closeCartModal');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const modalProductName = document.getElementById('modalProductName');
const modalProductDescription = document.getElementById('modalProductDescription');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductImage = document.getElementById('modalProductImage');
const modalQuantity = document.getElementById('modalQuantity');
const modalAddToCart = document.getElementById('modalAddToCart');

function formatPrice(value) {
    return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function updateCartCount() {
    const count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = count;
}

function renderCartItems() {
    const items = Object.values(cart);

    if (!items.length) {
        cartItemsContainer.innerHTML = '<p>Keranjang kosong. Tambahkan produk terlebih dahulu.</p>';
        cartTotalEl.textContent = 'Rp 0';
        updateCartCount();
        return;
    }

    cartItemsContainer.innerHTML = items.map(item => {
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <strong>${item.name}</strong>
                    <span>${formatPrice(item.price)} x ${item.quantity}</span>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-group">
                        <button class="decrease" type="button">−</button>
                        <span>${item.quantity}</span>
                        <button class="increase" type="button">+</button>
                    </div>
                    <button class="remove-item" type="button">Hapus</button>
                </div>
            </div>
        `;
    }).join('');

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalEl.textContent = formatPrice(total);
    updateCartCount();
}

function openCartModal() {
    renderCartItems();
    cartModal.classList.remove('hidden');
}

function closeCart() {
    cartModal.classList.add('hidden');
}

function openProductModal(product) {
    modalProductName.textContent = product.name;
    modalProductDescription.textContent = product.description;
    modalProductPrice.textContent = formatPrice(product.price);
    modalProductImage.textContent = product.image;
    modalQuantity.value = 1;
    modalAddToCart.dataset.productId = product.id;
    productModal.classList.remove('hidden');
}

function closeProduct() {
    productModal.classList.add('hidden');
}

function addToCart(productId, quantity) {
    const product = products.find(item => item.id === productId);
    if (!product) return;
    const qty = Math.max(1, parseInt(quantity, 10) || 1);

    if (cart[productId]) {
        cart[productId].quantity += qty;
    } else {
        cart[productId] = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: qty
        };
    }

    renderCartItems();
}

function removeFromCart(productId) {
    delete cart[productId];
    renderCartItems();
}

function changeCartQuantity(productId, delta) {
    if (!cart[productId]) return;
    cart[productId].quantity += delta;
    if (cart[productId].quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    renderCartItems();
}

document.querySelectorAll('.product-grid .card').forEach(card => {
    const productId = card.dataset.id;
    card.addEventListener('click', () => {
        const product = products.find(item => item.id === productId);
        if (product) openProductModal(product);
    });

    const buyButton = card.querySelector('.buy-btn');
    buyButton.addEventListener('click', event => {
        event.stopPropagation();
        addToCart(productId, 1);
        openCartModal();
    });
});

modalAddToCart.addEventListener('click', () => {
    const productId = modalAddToCart.dataset.productId;
    const quantity = parseInt(modalQuantity.value, 10) || 1;
    addToCart(productId, quantity);
    closeProduct();
    openCartModal();
});

cartToggle.addEventListener('click', openCartModal);
closeProductModal.addEventListener('click', closeProduct);
closeCartModal.addEventListener('click', closeCart);

cartItemsContainer.addEventListener('click', event => {
    const cartItem = event.target.closest('.cart-item');
    if (!cartItem) return;
    const id = cartItem.dataset.id;

    if (event.target.classList.contains('increase')) {
        changeCartQuantity(id, 1);
    }
    if (event.target.classList.contains('decrease')) {
        changeCartQuantity(id, -1);
    }
    if (event.target.classList.contains('remove-item')) {
        removeFromCart(id);
    }
});

checkoutBtn.addEventListener('click', () => {
    const itemCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    if (!itemCount) {
        alert('Keranjang Anda masih kosong. Tambahkan produk terlebih dahulu.');
        return;
    }
    alert(`Terima kasih! ${itemCount} produk berhasil dibeli.`);
    Object.keys(cart).forEach(key => delete cart[key]);
    renderCartItems();
    closeCart();
});

window.addEventListener('click', event => {
    if (event.target === productModal) {
        closeProduct();
    }
    if (event.target === cartModal) {
        closeCart();
    }
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '1rem 5%';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.padding = '1.5rem 5%';
        header.style.boxShadow = 'none';
    }
});

console.log('Rouve Co. Website Loaded Successfully');
