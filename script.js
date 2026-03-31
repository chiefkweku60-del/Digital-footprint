// Modern Digital Footprint Site JavaScript

// DOM elements
const themeToggle = document.querySelector('.theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const searchInput = document.querySelector('#search');
const cards = document.querySelectorAll('.card');
const modals = document.querySelectorAll('.modal');
const stats = document.querySelectorAll('.stat-number');
const downloadBtns = document.querySelectorAll('.download-btn');

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeToggle(savedTheme);
}

function updateThemeToggle(theme) {
  const sunIcon = themeToggle.querySelector('.sun');
  const moonIcon = themeToggle.querySelector('.moon');
  if (theme === 'dark') {
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeToggle(newTheme);
}

// Navigation
function toggleMobileNav() {
  navLinks.classList.toggle('active');
}

// Search functionality (filter cards)
function setupSearch() {
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? 'block' : 'none';
    });
  });
}

// Modals
function setupModals() {
  modals.forEach(modal => {
    const openBtns = document.querySelectorAll(`[data-modal="${modal.id}"]`);
    const closeBtn = modal.querySelector('.close');
    
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
      });
    });
    
    closeBtn.addEventListener('click', () => {
      modal.close();
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.close();
      }
    });
  });
}

// Animate stats counters
function animateCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const count = parseInt(entry.target.dataset.target);
        const increment = count / 100;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= count) {
            entry.target.textContent = count;
            clearInterval(timer);
          } else {
            entry.target.textContent = Math.floor(current);
          }
        }, 20);
        observer.unobserve(entry.target);
      }
    });
  });
  
  stats.forEach(stat => observer.observe(stat));
}

// Download progress simulation
function setupDownloads() {
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span class="pulse">Downloading... 0%</span>';
      
      // Simulate download
      for (let i = 10; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        btn.innerHTML = `<span class="pulse">Downloading... ${i}%</span>`;
      }
      
      btn.innerHTML = originalText;
      // Trigger actual download
      const link = btn.closest('.links').querySelector('a');
      if (link) link.click();
    });
  });
}

// Smooth scrolling
function setupSmoothScroll() {
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
}

// Intersection Observer for animations
function setupAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modals.forEach(modal => {
      modal.style.display = 'none';
    });
  }
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupSearch();
  setupModals();
  animateCounters();
  setupDownloads();
  setupSmoothScroll();
  setupAnimations();
  
  // Theme toggle event
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Hamburger menu
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileNav);
  }
  
  // Hero animation
  setTimeout(() => {
    document.querySelector('.hero h1').style.animationPlayState = 'running';
  }, 500);
});

// Extend HTMLModalElement
HTMLDialogElement.prototype.close = function() {
  this.style.display = 'none';
};
