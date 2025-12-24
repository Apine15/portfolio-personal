document.addEventListener('DOMContentLoaded', function() {
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
        canvas.addEventListener('mousemove', function(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        
        // Animation loop
        function animate() {
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
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Navbar background on scroll
        window.addEventListener('scroll', function() {
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
            galleryImage.classList.remove('visible');
            if (!src) {
                galleryImage.src = '';
                galleryImage.alt = '';
                galleryImage.style.display = 'none';
                galleryImage.classList.remove('visible');
            } else {
                // Asegurar que la imagen esté visible si antes fue ocultada
                galleryImage.style.display = '';
                // Eliminar posible mensaje "gallery-empty"
                const prevMsg = galleryContent.querySelector('.gallery-empty');
                if (prevMsg) prevMsg.remove();
                
                // establecer opacidad a 0 y luego esperar al load para mostrar
                galleryImage.style.opacity = '0';
                galleryImage.onload = function () {
                    // pequeña espera para permitir la transición
                    requestAnimationFrame(() => {
                        galleryImage.style.opacity = '';
                        galleryImage.classList.add('visible');
                    });
                };
                galleryImage.onerror = function () {
                    // silent fail
                };
                galleryImage.src = src;
                galleryImage.alt = `Imagen ${currentIndex + 1} de ${currentImages.length}`;
            }
            // show/hide prev/next dependiendo de la cantidad
            galleryPrev.style.display = currentImages.length > 1 ? '' : 'none';
            galleryNext.style.display = currentImages.length > 1 ? '' : 'none';
        }

        function openGallery(images, startIndex = 0) {
            currentImages = images;
            currentIndex = startIndex;
            
            showImage();
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

        // Intenta obtener imágenes de una carpeta:
        // 1) si existe index.json en la carpeta, usarlo
        // 2) si no, probar nombres por convención img1..img6 con extensiones comunes
        async function probeFolderImages(folder) {
            const images = [];
            // Primero intentar index.json
            try {
                const idxResp = await fetch(folder + 'index.json');
                if (idxResp.ok) {
                    const list = await idxResp.json();
                    
                    if (Array.isArray(list) && list.length) {
                        return list.map(f => folder + f);
                    }
                }
            } catch (e) {
                // ignore
            }

            // Probar convención img1..img6 con extensiones
            const names = [];
            const maxTry = 6;
            const exts = ['webp','jpg','png'];
            for (let i = 1; i <= maxTry; i++) {
                for (const ext of exts) {
                    names.push(folder + 'img' + i + '.' + ext);
                }
            }

            // Cargar en paralelo con Image para detectar cargas válidas
            const loadImage = (url) => new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(url);
                img.onerror = () => resolve(null);
                img.src = url;
            });

            const results = await Promise.all(names.map(loadImage));
            for (const r of results) if (r) images.push(r);
            // quitar duplicados y mantener orden
            return [...new Set(images)];
        }

        document.querySelectorAll('.btn-view-more').forEach(function (btn) {
            btn.addEventListener('click', async function () {
                const imgsAttr = (btn.dataset.images || btn.closest('.project-card')?.dataset.images || '').trim();
                if (!imgsAttr) return;

                // Si es una carpeta (termina en /), tratar como folder
                if (imgsAttr.endsWith('/')) {
                    const folderPath = imgsAttr;
                    // Asegurar que comience con ./ o / for relative paths used elsewhere
                    const base = folderPath.startsWith('./') || folderPath.startsWith('/') ? folderPath : './' + folderPath;
                    const found = await probeFolderImages(base);
                    if (found && found.length) {
                        openGallery(found, 0);
                    } else {
                        // Ninguna imagen encontrada; mostrar mensaje temporal dentro del modal
                        currentImages = [];
                        currentIndex = 0;
                        showImage();
                        // mostrar texto informativo
                        galleryImage.style.display = 'none';
                        let msg = galleryContent.querySelector('.gallery-empty');
                        if (!msg) {
                            msg = document.createElement('div');
                            msg.className = 'gallery-empty';
                            msg.textContent = 'No hay imágenes disponibles para este proyecto.';
                            galleryContent.appendChild(msg);
                        }
                        galleryModal.setAttribute('aria-hidden', 'false');
                        document.body.style.overflow = 'hidden';
                    }
                } else {
                    // lista separada por comas o único archivo
                    const imgs = imgsAttr.split(',').map(s => s.trim()).filter(Boolean);
                    if (imgs.length) {
                        // normalizar rutas relativas
                        const normalized = imgs.map(p => (p.startsWith('./') || p.startsWith('/')) ? p : './' + p);
                        openGallery(normalized, 0);
                    }
                }
            });
        });

        // Lógica del Formulario de Contacto (AJAX)
        const contactForm = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');
        const submitBtn = document.getElementById('submit-btn');

        if (contactForm) {
            contactForm.addEventListener('submit', async function(event) {
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