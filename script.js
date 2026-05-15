// Smooth Scrolling Effect for Sticky Navbar
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

// Simple Log for testing
console.log("Rouve Co. Website Loaded Successfully");