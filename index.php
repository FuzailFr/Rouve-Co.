<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rouve Co. | Modern Fashion & Essentials</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">ROUVE CO<span>.</span></div>
            <ul>
                <li><a href="#home">Beranda</a></li>
                <li><a href="#produk">Koleksi</a></li>
                <li><a href="#kontak">Kontak</a></li>
            </ul>
            <button id="cartToggle" class="btn btn-secondary cart-toggle" type="button">
                Keranjang <span id="cartCount">0</span>
            </button>
        </nav>
    </header>

    <section id="home" class="hero">
        <div class="hero-content">
            <span class="subtitle">ESTABLISHED 2026</span>
            <h1>Elevate Your Daily Style</h1>
            <p>Kombinasi kenyamanan maksimal dan desain modern dalam satu brand. Upgrade penampilanmu sekarang bersama Rouve Co.</p>
            <div class="cta-group">
                <a href="#produk" class="btn btn-primary">Lihat Koleksi</a>
                <a href="#kontak" class="btn btn-secondary">Hubungi Kami</a>
            </div>
        </div>
    </section>

    <section id="produk" class="products">
        <div class="section-header">
            <h2>Koleksi Terbaru</h2>
            <p>Temukan artikel pilihan yang dirancang untuk kenyamanan harian Anda.</p>
        </div>
        <div class="product-grid">
            <div class="card" data-id="1" data-name="Essential Tee" data-price="149000" data-description="T-shirt minimalis dengan bahan lembut, cocok untuk tampilan kasual harian." data-image="Product Image 1">
                <div class="img-placeholder">Product Image 1</div>
                <h3>Essential Tee</h3>
                <p class="price">Rp 149.000</p>
                <button class="buy-btn" type="button">Beli Sekarang</button>
            </div>
            <div class="card" data-id="2" data-name="Modern Hoodie" data-price="299000" data-description="Hoodie modern dengan potongan nyaman untuk gaya kasual hangat setiap hari." data-image="Product Image 2">
                <div class="img-placeholder">Product Image 2</div>
                <h3>Modern Hoodie</h3>
                <p class="price">Rp 299.000</p>
                <button class="buy-btn" type="button">Beli Sekarang</button>
            </div>
            <div class="card" data-id="3" data-name="Signature Cap" data-price="125000" data-description="Topi signature yang ringan dan mudah dipadukan dengan hampir semua outfit." data-image="Product Image 3">
                <div class="img-placeholder">Product Image 3</div>
                <h3>Signature Cap</h3>
                <p class="price">Rp 125.000</p>
                <button class="buy-btn" type="button">Beli Sekarang</button>
            </div>
        </div>
    </section>

    <section id="about" class="about">
        <div class="about-container">
            <h2>Tentang Rouve Co.</h2>
            <p>Rouve Co. adalah brand fashion yang berfokus pada estetika minimalis namun tetap fungsional. Kami percaya bahwa pakaian yang baik adalah investasi untuk kepercayaan diri Anda.</p>
        </div>
    </section>

    <footer id="kontak">
        <div class="footer-content">
            <div class="footer-brand">
                <div class="logo">ROUVE CO<span>.</span></div>
                <p>Modern fashion for the modern generation.</p>
            </div>
            <div class="footer-links">
                <h4>Navigasi</h4>
                <a href="#home">Beranda</a>
                <a href="#produk">Koleksi</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Rouve Co. - Final Project Wadhwani Entrepreneurship.</p>
        </div>
    </footer>

        <div id="productModal" class="modal hidden">
        <div class="modal-inner">
            <button id="closeProductModal" class="modal-close" type="button">&times;</button>
            <div class="modal-body">
                <div class="modal-image" id="modalProductImage">Product Image</div>
                <div class="modal-details">
                    <h3 id="modalProductName">Nama Produk</h3>
                    <p id="modalProductDescription">Deskripsi singkat produk akan muncul di sini.</p>
                    <p class="price" id="modalProductPrice">Rp 0</p>
                    <div class="modal-actions">
                        <label for="modalQuantity">Jumlah</label>
                        <input id="modalQuantity" type="number" min="1" value="1">
                        <button id="modalAddToCart" class="btn btn-primary" type="button">Tambah ke Keranjang</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="cartModal" class="modal hidden">
        <div class="modal-inner cart-modal-inner">
            <button id="closeCartModal" class="modal-close" type="button">&times;</button>
            <div class="modal-body cart-body">
                <h3>Keranjang Anda</h3>
                <div id="cartItems" class="cart-items"></div>
                <div class="cart-summary">
                    <p>Total: <strong id="cartTotal">Rp 0</strong></p>
                    <button id="checkoutBtn" class="btn btn-primary" type="button">Checkout</button>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
