// JavaScript Document
        const products = [
            {
                id: 1,
                name: "Base de Maquillaje Pro Glow",
                price: 29.99,
                rating: 4.8,
                image: "image/Base de Maquillaje Pro Glow.jpeg"
            },
            {
                id: 2,
                name: "Set de Brochas Premium",
                price: 45.50,
                rating: 4.9,
                image: "image/Set de Brochas Premium.jpg"
            },
            {
                id: 3,
                name: "Paleta de Sombras Ultimate",
                price: 38.75,
                rating: 4.7,
                image: "image/Paleta de Sombras Ultimate.jpg"
            },
            {
                id: 4,
                name: "Labial Mate Larga Duración",
                price: 18.99,
                rating: 4.5,
                image: "image/Labial Mate Larga Duración.jpg"
            },
            {
                id: 5,
                name: "Máscara de Pestañas Voluminizadora",
                price: 22.50,
                rating: 4.6,
                image: "image/Máscara de Pestañas Voluminizadora.jpeg"
            },
            {
                id: 6,
                name: "Corrector de Ojeras Iluminador",
                price: 19.99,
                rating: 4.8,
                image: "image/Corrector de Ojeras Iluminador.jpg"
            },
            {
                id: 7,
                name: "Fijador de Maquillaje en Spray",
                price: 24.99,
                rating: 4.7,
                image: "image/Fijador de Maquillaje en Spray.jpeg"
            },
            {
                id: 8,
                name: "Iluminador Facial Brillante",
                price: 27.50,
                rating: 4.9,
                image: "image/Iluminador Facial Brillante.jpg"
            }
        ];

        // DOM Elements
        const productsContainer = document.getElementById('products-container');
        const carouselInner = document.querySelector('.carousel-inner');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const modal = document.getElementById('cart-modal');
        const closeModal = document.querySelector('.close-modal');
        const continueShoppingBtn = document.getElementById('continue-shopping');
        const newsletterForm = document.getElementById('newsletter-form');

        // Generate stars based on rating
        function generateStars(rating) {
            let stars = '';
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 >= 0.5;
            
            for (let i = 0; i < fullStars; i++) {
                stars += '★';
            }
            
            if (halfStar) {
                stars += '½';
            }
            
            const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
            for (let i = 0; i < emptyStars; i++) {
                stars += '☆';
            }
            
            return stars;
        }

        // Display products
        function displayProducts() {
            productsContainer.innerHTML = '';
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <div class="product-rating">${generateStars(product.rating)} (${product.rating})</div>
                        <button class="add-to-cart" data-id="${product.id}">Añadir al Carrito</button>
                    </div>
                `;
                
                productsContainer.appendChild(productElement);
            });
            
            // Add event listeners to add to cart buttons
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    openModal();
                });
            });
        }

        // Carousel functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-item');
        const totalSlides = slides.length;

        function showSlide(n) {
            currentSlide = (n + totalSlides) % totalSlides;
            carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // Auto slide
        let slideInterval = setInterval(nextSlide, 5000);

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        // Modal functionality
        function openModal() {
            modal.classList.add('active');
        }

        function closeModalFunc() {
            modal.classList.remove('active');
        }

        // Newsletter form submission
        function handleNewsletterSubmit(e) {
            e.preventDefault();
            const emailInput = document.querySelector('.newsletter-input');
            alert(`¡Gracias por suscribirte con ${emailInput.value}! Pronto recibirás nuestras novedades.`);
            emailInput.value = '';
        }

        // Event listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        closeModal.addEventListener('click', closeModalFunc);
        continueShoppingBtn.addEventListener('click', closeModalFunc);
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunc();
            }
        });

        // Initialize
        displayProducts();