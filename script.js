document.addEventListener('DOMContentLoaded', () => {
  // Smooth Scroll
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = href;
      }
    });
  });

  // Fade-in Animation on Scroll
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(section => observer.observe(section));

  // Back to Top Button
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    document.querySelector('.cta-btn').classList.toggle('visible', window.scrollY > 300);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');
  menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
  });

  // Form Validation
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    if (name && email && message) {
      alert('Mensagem enviada com sucesso! (Simulação)');
      form.reset();
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  });

  // Briefing Form with Confirmation Message
  const briefingForm = document.getElementById('briefing-form');
  const confirmationMessage = document.getElementById('confirmation-message');
  briefingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const objective = document.getElementById('objective').value;
    const audience = document.getElementById('audience').value;
    const pages = document.getElementById('pages').value;
    const features = document.getElementById('features').value;
    if (objective && audience && pages && features) {
      confirmationMessage.textContent = 'Briefing enviado com sucesso! Entraremos em contato em breve.';
      confirmationMessage.style.display = 'block';
      setTimeout(() => {
        confirmationMessage.style.display = 'none';
      }, 3000);
      briefingForm.reset();
    } else {
      alert('Por favor, preencha todos os campos do briefing.');
    }
  });

  // Carousel
  const slides = document.querySelectorAll('.carousel-slide');
  const dotsContainer = document.querySelector('.carousel-dots');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let currentSlide = 0;
  let autoSlide;

  function updateDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('span');
      dot.classList.add('carousel-dot');
      if (i === currentSlide) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    currentSlide = index;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    const offset = -currentSlide * 100;
    document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
    updateDots();
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    goToSlide(currentSlide - 1);
    startAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    goToSlide(currentSlide + 1);
    startAutoSlide();
  });

  document.querySelector('.carousel').addEventListener('mouseenter', stopAutoSlide);
  document.querySelector('.carousel').addEventListener('mouseleave', startAutoSlide);

  updateDots();
  startAutoSlide();

  // Before-After Carousel
  document.querySelectorAll('.before-after-carousel').forEach((carousel, index) => {
    const baSlides = carousel.querySelectorAll('.ba-slide');
    const baDotsContainer = carousel.querySelector('.ba-dots');
    const baPrevBtn = carousel.querySelector('.ba-prev');
    const baNextBtn = carousel.querySelector('.ba-next');
    let baCurrentSlide = 0;

    function updateBADots() {
      baDotsContainer.innerHTML = '';
      for (let i = 0; i < baSlides.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('ba-dot');
        if (i === baCurrentSlide) dot.classList.add('active');
        dot.addEventListener('click', () => goToBASlide(index, i));
        baDotsContainer.appendChild(dot);
      }
    }

    function goToBASlide(carouselIndex, slideIndex) {
      const carousels = document.querySelectorAll('.before-after-carousel');
      const targetCarousel = carousels[carouselIndex];
      const targetSlides = targetCarousel.querySelectorAll('.ba-slide');
      baCurrentSlide = slideIndex;
      if (baCurrentSlide < 0) baCurrentSlide = targetSlides.length - 1;
      if (baCurrentSlide >= targetSlides.length) baCurrentSlide = 0;
      const offset = -baCurrentSlide * 100;
      targetCarousel.querySelector('.ba-container').style.transform = `translateX(${offset}%)`;
      updateBADots();
    }

    baPrevBtn.addEventListener('click', () => {
      goToBASlide(index, baCurrentSlide - 1);
    });

    baNextBtn.addEventListener('click', () => {
      goToBASlide(index, baCurrentSlide + 1);
    });

    updateBADots();
  });

  // Transição de Cor no main com Scroll
  const main = document.querySelector('main');
  window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    const newStartColor = `rgba(${30 + (scrollPercentage * 0.12)}, ${5 + (scrollPercentage * 0.05)}, ${0}, 0.9)`;
    const newEndColor = `rgba(${120 + (scrollPercentage * 0.3)}, ${20 + (scrollPercentage * 0.1)}, ${100 + (scrollPercentage * 0.3)}, 0.9)`;
    main.style.background = `linear-gradient(to right, ${newStartColor}, ${newEndColor})`;
  });

  // Particles.js Configuration
  particlesJS('body', {
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": ["#ff3232", "#962e82"]
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.3,
        "random": true,
        "anim": {
          "enable": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false
      }
    },
    "interactivity": {
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        }
      }
    },
    "retina_detect": true
  });
});
document.addEventListener('DOMContentLoaded', function () {
  // Menu responsivo
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');
  menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
  });

  // Efeito de fade-in nas seções
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(section => observer.observe(section));

  // Carrossel principal
  const carouselContainer = document.querySelector('.carousel-container');
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const carouselPrev = document.querySelector('.carousel-prev');
  const carouselNext = document.querySelector('.carousel-next');
  const carouselDotsContainer = document.querySelector('.carousel-dots');
  let currentSlide = 0;

  // Criar os dots do carrossel
  carouselSlides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
    carouselDotsContainer.appendChild(dot);
  });

  const carouselDots = document.querySelectorAll('.carousel-dot');

  function updateCarousel() {
    carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    carouselDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  carouselPrev.addEventListener('click', () => {
    currentSlide = (currentSlide === 0) ? carouselSlides.length - 1 : currentSlide - 1;
    updateCarousel();
  });

  carouselNext.addEventListener('click', () => {
    currentSlide = (currentSlide === carouselSlides.length - 1) ? 0 : currentSlide + 1;
    updateCarousel();
  });

  // Auto-play do carrossel
  setInterval(() => {
    currentSlide = (currentSlide === carouselSlides.length - 1) ? 0 : currentSlide + 1;
    updateCarousel();
  }, 5000);

  // Botão "Voltar ao topo"
  const backToTop = document.querySelector('#back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.style.display = (window.scrollY > 300) ? 'block' : 'none';
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Inicializar Particles.js
  particlesJS('main', {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: '#ff3232' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#ff3232', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });
});
document.addEventListener('DOMContentLoaded', function () {
  // Menu responsivo
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');
  menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
  });

  // Efeito de fade-in nas seções
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(section => observer.observe(section));

  // Carrossel principal
  const carouselContainer = document.querySelector('.carousel-container');
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const carouselPrev = document.querySelector('.carousel-prev');
  const carouselNext = document.querySelector('.carousel-next');
  const carouselDotsContainer = document.querySelector('.carousel-dots');
  let currentSlide = 0;

  // Criar os dots do carrossel
  carouselSlides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
    carouselDotsContainer.appendChild(dot);
  });

  const carouselDots = document.querySelectorAll('.carousel-dot');

  function updateCarousel() {
    carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    carouselDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  carouselPrev.addEventListener('click', () => {
    currentSlide = (currentSlide === 0) ? carouselSlides.length - 1 : currentSlide - 1;
    updateCarousel();
  });

  carouselNext.addEventListener('click', () => {
    currentSlide = (currentSlide === carouselSlides.length - 1) ? 0 : currentSlide + 1;
    updateCarousel();
  });

  // Auto-play do carrossel
  setInterval(() => {
    currentSlide = (currentSlide === carouselSlides.length - 1) ? 0 : currentSlide + 1;
    updateCarousel();
  }, 5000);

  // Botão "Voltar ao topo"
  const backToTop = document.querySelector('#back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.style.display = (window.scrollY > 300) ? 'block' : 'none';
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Carrossel "Antes e Depois"
  const beforeAfterCarousels = document.querySelectorAll('.before-after-carousel');
  beforeAfterCarousels.forEach(carousel => {
    const baContainer = carousel.querySelector('.ba-container');
    const baSlides = carousel.querySelectorAll('.ba-slide');
    const baPrev = carousel.querySelector('.ba-prev');
    const baNext = carousel.querySelector('.ba-next');
    const baDotsContainer = carousel.querySelector('.ba-dots');
    let baCurrentSlide = 0;

    // Criar os dots do carrossel "Antes e Depois"
    baSlides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('ba-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        baCurrentSlide = index;
        updateBACarousel(carousel, baCurrentSlide);
      });
      baDotsContainer.appendChild(dot);
    });

    const baDots = carousel.querySelectorAll('.ba-dot');

    function updateBACarousel(carousel, slideIndex) {
      const baContainer = carousel.querySelector('.ba-container');
      baContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
      baDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
      });
    }

    baPrev.addEventListener('click', () => {
      baCurrentSlide = (baCurrentSlide === 0) ? baSlides.length - 1 : baCurrentSlide - 1;
      updateBACarousel(carousel, baCurrentSlide);
    });

    baNext.addEventListener('click', () => {
      baCurrentSlide = (baCurrentSlide === baSlides.length - 1) ? 0 : baCurrentSlide + 1;
      updateBACarousel(carousel, baCurrentSlide);
    });

    // Auto-play do carrossel "Antes e Depois"
    setInterval(() => {
      baCurrentSlide = (baCurrentSlide === baSlides.length - 1) ? 0 : baCurrentSlide + 1;
      updateBACarousel(carousel, baCurrentSlide);
    }, 5000);
  });

  // Inicializar Particles.js
  particlesJS('main', {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: '#ff3232' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#ff3232', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });
});
document.addEventListener('DOMContentLoaded', function () {
  // Menu responsivo
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');
  menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
  });

  // Efeito de fade-in nas seções
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(section => observer.observe(section));

  // Carrossel principal (index.html)
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const carouselDotsContainer = document.querySelector('.carousel-dots');
    let currentSlide = 0;

    // Criar os dots do carrossel principal
    carouselSlides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
      });
      carouselDotsContainer.appendChild(dot);
    });

    const carouselDots = document.querySelectorAll('.carousel-dot');

    function updateCarousel() {
      carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
      carouselDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }

    carouselPrev.addEventListener('click', () => {
      currentSlide = (currentSlide === 0) ? carouselSlides.length - 1 : currentSlide - 1;
      updateCarousel();
    });

    carouselNext.addEventListener('click', () => {
      currentSlide = (currentSlide === carouselSlides.length - 1) ? 0 : currentSlide + 1;
      updateCarousel();
    });

    // Auto-play do carrossel principal
    setInterval(() => {
      currentSlide = (currentSlide === carouselSlides.length - 1) ? 0 : currentSlide + 1;
      updateCarousel();
    }, 5000);
  }

  // Carrossel "Antes e Depois" (projetos.html)
  const beforeAfterCarousels = document.querySelectorAll('.before-after-carousel');
  beforeAfterCarousels.forEach(carousel => {
    const baContainer = carousel.querySelector('.ba-container');
    const baSlides = carousel.querySelectorAll('.ba-slide');
    const baPrev = carousel.querySelector('.ba-prev');
    const baNext = carousel.querySelector('.ba-next');
    const baDotsContainer = carousel.querySelector('.ba-dots');
    let baCurrentSlide = 0;

    console.log(`Inicializando carrossel com ${baSlides.length} slides`);

    // Criar os dots do carrossel "Antes e Depois"
    baSlides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('ba-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        baCurrentSlide = index;
        updateBACarousel(carousel, baCurrentSlide);
      });
      baDotsContainer.appendChild(dot);
    });

    const baDots = carousel.querySelectorAll('.ba-dot');

    function updateBACarousel(carousel, slideIndex) {
      const baContainer = carousel.querySelector('.ba-container');
      baContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
      const dots = carousel.querySelectorAll('.ba-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
      });
    }

    baPrev.addEventListener('click', () => {
      baCurrentSlide = (baCurrentSlide === 0) ? baSlides.length - 1 : baCurrentSlide - 1;
      updateBACarousel(carousel, baCurrentSlide);
    });

    baNext.addEventListener('click', () => {
      baCurrentSlide = (baCurrentSlide === baSlides.length - 1) ? 0 : baCurrentSlide + 1;
      updateBACarousel(carousel, baCurrentSlide);
    });

    // Auto-play do carrossel "Antes e Depois"
    setInterval(() => {
      baCurrentSlide = (baCurrentSlide === baSlides.length - 1) ? 0 : baCurrentSlide + 1;
      updateBACarousel(carousel, baCurrentSlide);
    }, 5000);
  });

  // Botão "Voltar ao topo"
  const backToTop = document.querySelector('#back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.style.display = (window.scrollY > 300) ? 'block' : 'none';
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Inicializar Particles.js
  particlesJS('main', {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: '#ff3232' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#ff3232', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });
});