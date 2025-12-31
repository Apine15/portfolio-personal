document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles = [];
    const mouse = { x: 0, y: 0 };
    const particleCount = 50;

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.baseX = this.x;
            this.baseY = this.y;
            this.size = Math.random() * 3 + 1;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = Math.random() * 0.5 + 0.1;
        }

        update() {
            // Calculate distance from mouse
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Attraction force
            const force = Math.min(200 / distance, 10);

            if (distance < 200) {
                this.x += dx * force * 0.01;
                this.y += dy * force * 0.01;
            } else {
                // Return to base position
                this.x += (this.baseX - this.x) * 0.01;
                this.y += (this.baseY - this.y) * 0.01;
            }

            // Floating animation
            this.angle += this.speed;
            this.baseX += Math.sin(this.angle) * 0.3;
            this.baseY += Math.cos(this.angle) * 0.3;

            // Keep particles in bounds
            if (this.baseX < 0) this.baseX = canvas.width;
            if (this.baseX > canvas.width) this.baseX = 0;
            if (this.baseY < 0) this.baseY = canvas.height;
            if (this.baseY > canvas.height) this.baseY = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

            // Gradient for glow effect
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
            gradient.addColorStop(0, 'rgba(29, 211, 176, 0.8)');
            gradient.addColorStop(0.5, 'rgba(175, 252, 65, 0.4)');
            gradient.addColorStop(1, 'rgba(29, 211, 176, 0)');

            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Mouse move event
    canvas.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Animation loop
    let animationId;
    let isAnimating = true;

    function animate() {
        if (!isAnimating) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(29, 211, 176, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        animationId = requestAnimationFrame(animate);
    }

    // Performance Optimization: Intersection Observer for Particles
    const heroSection = document.getElementById('inicio');

    // Iniciar animación inmediatamente para evitar flash vacío
    animate();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!isAnimating) {
                    isAnimating = true;
                    animate();
                }
            } else {
                isAnimating = false;
                // No cancelamos frame inmediato, dejamos que el loop se detenga solo al revisar isAnimating
            }
        });
    }, { threshold: 0.1 }); // Threshold 0.1 para que no se apague apenas toca el borde

    if (heroSection) {
        observer.observe(heroSection);
    }

    // Navbar background on scroll
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(60, 22, 66, 0.95)';
        } else {
            navbar.style.backgroundColor = 'var(--russian-violet)';
        }
    });

    // Galería / Modal "Ver más"
    const galleryModal = document.getElementById('gallery-modal');
    const galleryImage = galleryModal.querySelector('.gallery-image');
    const galleryClose = galleryModal.querySelector('.gallery-close');
    const galleryPrev = galleryModal.querySelector('.gallery-prev');
    const galleryNext = galleryModal.querySelector('.gallery-next');
    const galleryOverlay = galleryModal.querySelector('.gallery-overlay');
    const galleryContent = galleryModal.querySelector('.gallery-content');

    let currentImages = [];
    let currentIndex = 0;

    function showImage() {
        const src = currentImages[currentIndex] || '';

        // Reset visual state
        galleryImage.style.display = 'none';
        galleryImage.classList.remove('visible');

        if (!src) return;

        galleryImage.style.display = 'block';
        // Set opacity 0 initially for fade effect
        galleryImage.style.opacity = '0';

        galleryImage.onload = function () {
            galleryImage.style.opacity = '1';
            galleryImage.classList.add('visible');
        };

        galleryImage.onerror = function () {
            // Ensure visible even if broken (shows alt text/icon)
            galleryImage.style.opacity = '1';
            galleryImage.classList.add('visible');
        };

        galleryImage.src = src;
        galleryImage.alt = `Imagen ${currentIndex + 1} de ${currentImages.length}`;

        // Buttons visibility
        galleryPrev.style.display = currentImages.length > 1 ? 'flex' : 'none';
        galleryNext.style.display = currentImages.length > 1 ? 'flex' : 'none';
    }

    function openGallery(images) {
        // Limpiar mensaje de "vacío" si existe
        const prevMsg = galleryContent.querySelector('.gallery-empty');
        if (prevMsg) prevMsg.remove();

        if (!images || images.length === 0) {
            currentImages = [];
            galleryImage.style.display = 'none';
            // Crear mensaje solo si no existe
            let msg = galleryContent.querySelector('.gallery-empty');
            if (!msg) {
                msg = document.createElement('div');
                msg.className = 'gallery-empty';
                msg.textContent = 'No hay imágenes disponibles para este proyecto.';
                galleryContent.appendChild(msg);
            }
            galleryPrev.style.display = 'none';
            galleryNext.style.display = 'none';
        } else {
            currentImages = images;
            currentIndex = 0;
            showImage();
        }

        galleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        galleryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    galleryPrev.addEventListener('click', function () {
        if (!currentImages.length) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage();
    });

    galleryNext.addEventListener('click', function () {
        if (!currentImages.length) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        showImage();
    });

    galleryClose.addEventListener('click', closeGallery);
    galleryOverlay.addEventListener('click', closeGallery);

    document.addEventListener('keydown', function (e) {
        if (galleryModal.getAttribute('aria-hidden') === 'false') {
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowRight') galleryNext.click();
            if (e.key === 'ArrowLeft') galleryPrev.click();
        }
    });

    document.querySelectorAll('.btn-view-more').forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Get images directly from data attribute
            // Support both on button or parent card
            const imagesStr = (btn.dataset.images || btn.closest('.project-card')?.dataset.images || '').trim();

            if (!imagesStr) {
                openGallery([]);
                return;
            }

            const images = imagesStr.split(',')
                .map(s => s.trim())
                .filter(Boolean);

            openGallery(images);
        });
    });

    // Lógica del Formulario de Contacto (AJAX)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Evita que la página se recargue/redireccione

            const formData = new FormData(contactForm);
            const actionUrl = contactForm.getAttribute('action');

            // Estado visual: cargando
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
            formStatus.style.display = 'none'; // Ocultar mensajes previos

            try {
                const response = await fetch(actionUrl, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Importante para que Formspree responda JSON y no HTML
                    }
                });

                if (response.ok) {
                    // Éxito: Mostrar mensaje verde y limpiar formulario
                    formStatus.className = 'alert alert-success';
                    formStatus.textContent = '¡Gracias por tu mensaje! Te responderé a la brevedad.';
                    formStatus.style.display = 'block';
                    contactForm.reset(); // Limpia los campos

                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 4000);
                } else {
                    // Error del servidor (ej: validación)
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        const errorMessages = data.errors.map(error => error.message).join(", ");
                        throw new Error(errorMessages);
                    } else {
                        throw new Error('Hubo un problema al enviar el formulario.');
                    }
                }
            } catch (error) {
                // Error de red o del código
                formStatus.className = 'alert alert-danger';
                formStatus.textContent = 'Oops! Ocurrió un error: ' + error.message;
                formStatus.style.display = 'block';
            } finally {
                // Restaurar botón
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Enviar mensaje';
            }
        });
    }
});