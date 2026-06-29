// Array Data Produk Utama
const products = [
    {
        id: '1',
        name: 'Essential Tee',
        price: 149000,
        description: 'T-shirt minimalis dengan bahan lembut, cocok untuk tampilan kasual harian.',
        image: 'images/kaos.png'
    },
    {
        id: '2',
        name: 'Modern Hoodie',
        price: 299000,
        description: 'Hoodie modern dengan potongan nyaman untuk gaya kasual hangat setiap hari.',
        image: 'images/hoodie.png'
    },
    {
        id: '3',
        name: 'Signature Cap',
        price: 125000,
        description: 'Topi signature yang ringan dan mudah dipadukan dengan hampir semua outfit.',
        image: 'images/topi.png'
    }
];

// Inisialisasi State Keranjang Belanja Menggunakan LocalStorage
let cart = JSON.parse(localStorage.getItem('rouve_cart')) || {};

// Selektor DOM Halaman Utama
const cartCountEl = document.getElementById('cartCount');
const cartToggle = document.getElementById('cartToggle');
const cartModal = document.getElementById('cartModal');
const productModal = document.getElementById('productModal');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Selektor Tombol Tutup Halaman Utama
const closeProductModal = document.getElementById('closeProductModal');
const closeCartModal = document.getElementById('closeCartModal');

// Detail Modal Produk
const modalProductName = document.getElementById('modalProductName');
const modalProductDescription = document.getElementById('modalProductDescription');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductImage = document.getElementById('modalProductImage');
const modalQuantity = document.getElementById('modalQuantity');
const modalAddToCart = document.getElementById('modalAddToCart');

// Fungsi Utilitas Menyimpan State Keranjang
function saveCart() {
    localStorage.setItem('rouve_cart', JSON.stringify(cart));
    if (cartCountEl) updateCartCount();
}

// Format Harga Rupiah
function formatPrice(value) {
    return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Update Jumlah Total Item di Navigasi Bar Halaman Utama
function updateCartCount() {
    if (!cartCountEl) return;
    const count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = count;
}

// Toast Notifikasi Kustom Profesional
function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="check" style="width:16px; height:16px; stroke-width:3px;"></i> <span>${message}</span>`;
    container.appendChild(toast);
    
    if (window.lucide) lucide.createIcons();
    setTimeout(() => { toast.classList.add('show'); }, 50);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => { toast.remove(); }, 400);
    }, 3000);
}

// Render Item Belanjaan ke Modal di Halaman Utama
function renderCartItems() {
    if (!cartItemsContainer) return;
    const items = Object.values(cart);

    if (!items.length) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#666; font-size:0.9rem;">Keranjang kosong. Tambahkan produk terlebih dahulu.</p>';
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

// Fungsi Buka Tutup Modal Toko Halaman Utama
function openCartModal() { renderCartItems(); if(cartModal) cartModal.classList.remove('hidden'); }
function closeCart() { if(cartModal) cartModal.classList.add('hidden'); }
function closeProduct() { if(productModal) productModal.classList.add('hidden'); }

function openProductModal(product) {
    if(!productModal) return;
    modalProductName.textContent = product.name;
    modalProductDescription.textContent = product.description;
    modalProductPrice.textContent = formatPrice(product.price);
    
    // PERBAIKAN: Membungkus path gambar ke dalam tag <img> asli agar fotonya meluncur keluar
    modalProductImage.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;">`;
    
    modalQuantity.value = 1;
    modalAddToCart.dataset.productId = product.id;
    productModal.classList.remove('hidden');
}
// Logika Menambahkan Barang Ke Keranjang Belanja
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
    saveCart();
    showToast(`${product.name} dimasukkan ke keranjang`);
}

function removeFromCart(productId) {
    delete cart[productId];
    saveCart();
    renderCartItems();
}

function changeCartQuantity(productId, delta) {
    if (!cart[productId]) return;
    cart[productId].quantity += delta;
    if (cart[productId].quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    saveCart();
    renderCartItems();
}

// --- LOGIKA HALAMAN PEMBAYARAN & NOTA DOWNLOAD PDF (payment.html) ---
function updatePaymentInstructions() {
    const instructionContent = document.getElementById('instructionContent');
    if (!instructionContent) return;

    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const totalAmountText = document.getElementById('paymentTotalAmount').textContent;

    if (selectedMethod === "QRIS") {
        // Menggunakan API QR gratis untuk simulasi pembayaran QRIS dinamis profesional
        instructionContent.innerHTML = `
            <div class="qr-box">
                <p>Silakan pindai kode QRIS di bawah menggunakan aplikasi e-wallet Anda:</p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RouveCoPaymentTotal:${totalAmountText}" alt="QRIS QR Code">
                <small style="color:#777;">Otomatis diverifikasi oleh sistem</small>
            </div>
        `;
    } else if (selectedMethod === "BCA") {
        instructionContent.innerHTML = `
            <div class="va-box">
                <p>Transfer via Virtual Account Bank BCA:</p>
                <strong class="va-number">88012 0831 4452 167</strong>
                <p style="font-size:0.8rem; color:#666;">• Batas Pembayaran: 2 jam.<br>• Bisa dari m-BCA, KlikBCA, atau ATM BCA.</p>
            </div>
        `;
    } else if (selectedMethod === "Mandiri") {
        instructionContent.innerHTML = `
            <div class="va-box">
                <p>Transfer via Virtual Account Bank Mandiri:</p>
                <strong class="va-number">70014 0852 9941 114</strong>
                <p style="font-size:0.8rem; color:#666;">• Batas Pembayaran: 2 jam.<br>• Bisa dari Livin' by Mandiri atau ATM Mandiri.</p>
            </div>
        `;
    }
}

function initPaymentPage() {
    const paymentOrderList = document.getElementById('paymentOrderList');
    const paymentTotalAmount = document.getElementById('paymentTotalAmount');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const methodRadios = document.querySelectorAll('input[name="paymentMethod"]');

    if (!paymentOrderList || !paymentTotalAmount) return;

    const items = Object.values(cart);
    
    if (!items.length) {
        alert("Keranjang Anda kosong, silakan pilih produk terlebih dahulu.");
        window.location.href = "index.html";
        return;
    }

    // Render Ringkasan Pesanan di Sisi Kanan Form
    paymentOrderList.innerHTML = items.map(item => `
        <div class="pay-order-item">
            <span>${item.name} (x${item.quantity})</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');
    
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    paymentTotalAmount.textContent = formatPrice(total);

    // Jalankan instruksi default awal (QRIS)
    updatePaymentInstructions();

    // Dengarkan perubahan pilihan metode pembayaran oleh user
    methodRadios.forEach(radio => {
        radio.addEventListener('change', updatePaymentInstructions);
    });

    // Event Handler saat Menekan Tombol Eksekusi Bayar Final -> Cetak Nota
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
            const name = document.getElementById('customerName').value.trim();
            const phone = document.getElementById('customerPhone').value.trim();
            const address = document.getElementById('customerAddress').value.trim();
            const method = document.querySelector('input[name="paymentMethod"]:checked').value;

            if (!name || !phone || !address) {
                showToast('Harap lengkapi seluruh data pengiriman Anda.');
                return;
            }

            // Ganti Blok Formulir Menjadi Blok Nota Pembayaran Resmi
            document.getElementById('checkoutFormBlock').classList.add('hidden');
            const invoiceBlock = document.getElementById('invoiceBlock');
            invoiceBlock.classList.remove('hidden');

            // Generate Data ke Lembar Nota Kertas Kustom
            const randId = Math.floor(100000 + Math.random() * 900000);
            const currentDate = new Date().toISOString().split('T')[0];

            document.getElementById('invId').textContent = `#RC-${randId}`;
            document.getElementById('invDate').textContent = currentDate;
            document.getElementById('invName').textContent = name;
            document.getElementById('invPhone').textContent = phone;
            document.getElementById('invAddress').textContent = address;
            document.getElementById('invMethod').textContent = (method === "QRIS") ? "QRIS Digital Pay" : `Virtual Account ${method}`;
            
            // Render Items Tabel Faktur Nota
            const invItemsBody = document.getElementById('invItemsBody');
            invItemsBody.innerHTML = items.map(item => `
                <tr>
                    <td><strong>${item.name}</strong></td>
                    <td class="text-center">${item.quantity}</td>
                    <td class="text-right">${formatPrice(item.price * item.quantity)}</td>
                </tr>
            `).join('');

            document.getElementById('invTotalAmount').textContent = formatPrice(total);
            showToast('Faktur transaksi berhasil diterbitkan!');

            // Bersihkan data lokal keranjang
            localStorage.removeItem('rouve_cart');
            cart = {};
        });
    }

    // Fungsi Klik Aksi Pengunduhan Berkas PDF Nota Online
// Perbaikan Fungsi Unduh PDF Nota Online di dalam script.js
if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
        const element = document.getElementById('invoiceCaptureArea');
        const transactionId = document.getElementById('invId').textContent;
        
        // Pengaturan opsi parameter yang dioptimasi agar pas di kertas A4 secara presisi
        const opt = {
            margin:       [15, 15, 15, 15], // Mengatur batas atas, kiri, bawah, kanan (dalam mm) secara seimbang
            filename:     `Invoice_${transactionId}.pdf`,
            image:        { type: 'jpeg', quality: 1.0 }, // Menaikkan kualitas rendering gambar ke maksimal
            html2canvas:  { 
                scale: 3, // Meningkatkan resolusi text agar tidak blur/pecah saat di-zoom
                useCORS: true,
                logging: false,
                letterRendering: true
            },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Eksekusi download PDF secara aman
        html2pdf().set(opt).from(element).save().then(() => {
            showToast('PDF Berhasil diunduh dengan rapi!');
        });
    });
}
}

// --- INITIALIZATION EVENT LISTENERS PADA HALAMAN UTAMA ---
if (document.querySelector('.product-grid')) {
    updateCartCount();

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

    if (modalAddToCart) {
        modalAddToCart.addEventListener('click', () => {
            const productId = modalAddToCart.dataset.productId;
            const quantity = parseInt(modalQuantity.value, 10) || 1;
            addToCart(productId, quantity);
            closeProduct();
            openCartModal();
        });
    }

    if (cartToggle) cartToggle.addEventListener('click', openCartModal);
    if (closeProductModal) closeProductModal.addEventListener('click', closeProduct);
    if (closeCartModal) closeCartModal.addEventListener('click', closeCart);

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', event => {
            const cartItem = event.target.closest('.cart-item');
            if (!cartItem) return;
            const id = cartItem.dataset.id;

            if (event.target.classList.contains('increase')) changeCartQuantity(id, 1);
            if (event.target.classList.contains('decrease')) changeCartQuantity(id, -1);
            if (event.target.classList.contains('remove-item')) removeFromCart(id);
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const items = Object.values(cart);
            if (!items.length) {
                showToast('Keranjang Anda masih kosong.');
                return;
            }
            window.location.href = "payment.html";
        });
    }

    window.addEventListener('click', event => {
        if (event.target === productModal) closeProduct();
        if (event.target === cartModal) closeCart();
    });
}

// Efek Scroll Animasi Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (!header) return;
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

console.log('Rouve Co. System Engine Active.');