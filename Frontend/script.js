// ===========================
// Initialize AOS (Animate On Scroll)
// ===========================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out'
});

// ===========================
// Dark Mode Toggle
// ===========================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ===========================
// Custom Cursor
// ===========================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Expand cursor on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===========================
// Mobile Menu Toggle
// ===========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// ===========================
// Active Navigation Link
// ===========================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Typing Effect
// ===========================
const typingText = document.querySelector('.typing-text');
const phrases = [
    'AI Software Engineer',
    'Full Stack Developer',
    'Problem Solver',
    'Creative Thinker',
    'Tech Enthusiast'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before starting new phrase
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
typeEffect();

// ===========================
// Smooth Scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Counter Animation
// ===========================
const counters = document.querySelectorAll('.stat-number');
let countStarted = false;

function startCounting() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter when about section is in view
const aboutSection = document.querySelector('.about');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countStarted) {
            startCounting();
            countStarted = true;
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    observer.observe(aboutSection);
}

// ===========================
// Skill Progress Bars
// ===========================
const skillsSection = document.querySelector('.skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            animateSkills();
            skillsAnimated = true;
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 100);
    });
}

(function () {
    const form = document.getElementById('contactForm');
    const btn = document.getElementById('submitBtn');
    const txt = btn?.querySelector('.btn-text');
    const load = btn?.querySelector('.btn-loading');
    const msg = document.getElementById('formMessage');
    const successModal = document.getElementById('successModal');
    const fixedSubject = document.getElementById('fixed_subject');
    const inquirySel = document.getElementById('inquiry_type');
  
    // -- Helpers ----------------------------------------------------
    function setBusy(b) {
      if (!btn || !txt || !load) return;
      btn.disabled = b;
      load.style.display = b ? 'inline-flex' : 'none';
      txt.style.display = b ? 'none' : 'inline';
    }
  
    function sayStatus(s, ok) {
      if (!msg) return;
      msg.textContent = s || '';
      msg.style.color = ok ? 'var(--success,#10b981)' : 'var(--error,#ef4444)';
    }
  
    function attachInquiryToSubject() {
      if (!fixedSubject) return;
      const base = "New Portfolio Contact from Gayathri's Website";
      const t = inquirySel && inquirySel.value ? `${base} — ${inquirySel.value}` : base;
      fixedSubject.value = t; // email header subject you'll receive
    }
  
    function wireModalCloseHandlers() {
      if (!successModal) return;
  
      // Close on button
      const closeBtn = successModal.querySelector('.close-modal');
      closeBtn?.addEventListener('click', () => successModal.classList.remove('open'), { once: true });
  
      // Close on backdrop click
      const onBackdrop = (e) => {
        if (e.target === successModal) {
          successModal.classList.remove('open');
          successModal.removeEventListener('click', onBackdrop);
          window.removeEventListener('keydown', onEsc);
        }
      };
      successModal.addEventListener('click', onBackdrop);
  
      // Close on Esc
      const onEsc = (e) => {
        if (e.key === 'Escape') {
          successModal.classList.remove('open');
          window.removeEventListener('keydown', onEsc);
          successModal.removeEventListener('click', onBackdrop);
        }
      };
      window.addEventListener('keydown', onEsc);
    }
  
    function openSuccessModal() {
      if (!successModal) return;
      successModal.classList.add('open');
      wireModalCloseHandlers();
    }
  
    // -- Init -------------------------------------------------------
    attachInquiryToSubject();
    inquirySel?.addEventListener('change', attachInquiryToSubject);
  
    if (!form) return; // form not on this page
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // Client validation
      if (!form.checkValidity()) {
        form.reportValidity();
        sayStatus('Please complete all required fields.', false);
        return;
      }
  
      // Honeypot
      if (form.botcheck && form.botcheck.checked) {
        sayStatus('Spam detected. Please try again.', false);
        return;
      }
  
      setBusy(true);
      sayStatus('', true);
  
      try {
        const fd = new FormData(form);
        const res = await fetch(form.action, { method: 'POST', body: fd });
  
        // Web3Forms returns JSON even for non-200; guard just in case
        let data = {};
        try { data = await res.json(); } catch (_) {}
  
        if (data.success) {
          sayStatus('Thanks! Your message has been sent. ✅', true);
          openSuccessModal();
          form.reset();
          attachInquiryToSubject();
        } else {
          const message = data.message || 'Submission failed. Please try again.';
          sayStatus(message, false);
        }
      } catch (err) {
        console.error('Form submit error:', err);
        sayStatus('Network error. Please try again.', false);
      } finally {
        setBusy(false);
      }
    });
  })();

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name || data.name.trim().length < 2) {
        return false;
    }
    
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    if (!data.subject || data.subject.trim().length < 3) {
        return false;
    }
    
    if (!data.message || data.message.trim().length < 10) {
        return false;
    }
    
    return true;
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// Close modal
const closeModal = document.querySelector('.close-modal');
closeModal.addEventListener('click', () => {
    successModal.classList.remove('active');
});

// Close modal on outside click
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});

// ===========================
// Parallax Effect
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===========================
// Project Card 3D Effect
// ===========================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===========================
// Lazy Loading Images
// ===========================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===========================
// Scroll Reveal Animation
// ===========================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => revealObserver.observe(el));

// ===========================
// Preloader (Optional)
// ===========================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ===========================
// Back to Top Button
// ===========================
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.pointerEvents = 'none';
    }
});

// ===========================
// Floating Animation for Hero Cards
// ===========================
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    // Random floating animation
    setInterval(() => {
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        const randomRotate = Math.random() * 10 - 5;
        
        card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
    }, 3000 + (index * 1000));
});

// ===========================
// Mouse Trail Effect (Optional)
// ===========================
const trail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    trail.push({ x: e.clientX, y: e.clientY });
    
    if (trail.length > trailLength) {
        trail.shift();
    }
});

// ===========================
// Keyboard Navigation
// ===========================
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close modal
    if (e.key === 'Escape') {
        successModal.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===========================
// Performance Optimizations
// ===========================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply optimizations
const optimizedScroll = debounce(() => {
    // Your scroll handler code
}, 10);

const optimizedResize = throttle(() => {
    // Your resize handler code
}, 250);

window.addEventListener('scroll', optimizedScroll);
window.addEventListener('resize', optimizedResize);

// ===========================
// Console Easter Egg
// ===========================
console.log('%c🚀 Welcome to My Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cLooking for a developer? Let\'s connect!', 'color: #8b5cf6; font-size: 14px;');
console.log('%c📧 your.email@example.com', 'color: #10b981; font-size: 12px;');

// ===========================
// Analytics (Optional)
// ===========================
// Add your analytics tracking code here
// Example: Google Analytics, Mixpanel, etc.

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent || e.target.innerText;
        console.log(`Button clicked: ${buttonText}`);
        // Send to analytics
        // gtag('event', 'button_click', { button_name: buttonText });
    });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            console.log(`Section viewed: ${sectionId}`);
            // Send to analytics
            // gtag('event', 'section_view', { section_name: sectionId });
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));

// ===========================
// Service Worker Registration (Optional)
// ===========================
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(registration => console.log('SW registered:', registration))
//             .catch(error => console.log('SW registration failed:', error));
//     });
// }

// ===========================
// Accessibility Improvements
// ===========================
// Focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Skip to main content
const skipLink = document.querySelector('.skip-link');
if (skipLink) {
    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const main = document.querySelector('main');
        if (main) {
            main.focus();
            main.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ===========================
// Print Styles Handler
// ===========================
window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections
    // Remove animations
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// ===========================
// Browser Detection & Feature Support
// ===========================
function detectFeatureSupport() {
    const features = {
        webGL: !!document.createElement('canvas').getContext('webgl'),
        serviceWorker: 'serviceWorker' in navigator,
        intersectionObserver: 'IntersectionObserver' in window,
        localStorage: typeof(Storage) !== 'undefined'
    };
    
    console.log('Supported features:', features);
    return features;
}

detectFeatureSupport();
/// ===========================
// Entry Robot – Voice Greeting + Optional Tour
// ===========================
(() => {
    if (!('speechSynthesis' in window)) return;
  
    const avatar = document.getElementById('heroAvatar');
    if (!avatar) return;
  
    // Create popup
    const popup = document.createElement('div');
    popup.id = 'tourPopup';
    popup.innerHTML = `
      <div class="popup-box">
        <p>👋 Hi! I'm your AI guide.<br>Would you like a quick 2-minute tour of Gayathri's portfolio?</p>
        <div class="popup-buttons">
          <button id="startTourBtn">Yes, show me!</button>
          <button id="skipTourBtn">Maybe later</button>
        </div>
      </div>`;
    document.body.appendChild(popup);
  
    // Popup styling (auto adapts to dark/light)
    const style = document.createElement('style');
    style.textContent = `
      #tourPopup {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.45);
        display: none; align-items: center; justify-content: center;
        z-index: 3000;
      }
      #tourPopup.show { display: flex; animation: fadeIn .4s ease; }
      #tourPopup .popup-box {
        background: var(--bg-secondary);
        color: var(--text-primary);
        border: 1px solid var(--bg-tertiary);
        border-radius: 16px;
        padding: 22px 28px;
        max-width: 400px;
        text-align: center;
        box-shadow: var(--shadow-lg);
      }
      #tourPopup .popup-buttons { margin-top: 16px; display:flex; gap:12px; justify-content:center; }
      #tourPopup button {
        padding: 8px 14px; border:none; border-radius:8px; cursor:pointer;
        font-weight:600;
      }
      #startTourBtn { background: var(--accent-primary,#6366f1); color:#fff; }
      #skipTourBtn { background: var(--bg-tertiary); color:var(--text-primary); }
      @keyframes fadeIn { from {opacity:0;} to {opacity:1;} }
    `;
    document.head.appendChild(style);
  
    const startBtn = popup.querySelector('#startTourBtn');
    const skipBtn = popup.querySelector('#skipTourBtn');
  
    const caption = document.createElement('div');
    caption.id = 'tourCaption';
    caption.style.cssText = `
      position: fixed; left: 50%; bottom: 18px; transform: translateX(-50%);
      background: var(--bg-secondary); color: var(--text-primary);
      border: 1px solid var(--bg-tertiary); box-shadow: var(--shadow-md);
      padding: 10px 16px; border-radius: 10px; max-width: 90vw;
      display: none; z-index: 2000; font: 500 14px/1.4 Poppins,sans-serif;
    `;
    document.body.appendChild(caption);
    const showCap = (t)=>{ caption.textContent=t; caption.style.display='block'; };
    const hideCap = ()=>{ caption.style.display='none'; };
  
    const steps = [
      {s:'#home', t:"Welcome! This is Gayathri Chilukala, an AI and Machine Learning Software Engineer. Let’s explore her portfolio.", c:"Home — overview."},
      {s:'#experience', t:"At GEICO, she builds production-ready LLM services on Azure, cutting latency by fifty percent and boosting accuracy.", c:"Experience — GEICO."},
      {s:'#education', t:"She holds a Master’s in Computer Science specializing in AI, graduating with a GPA of three point nine six and top honors.", c:"Education — FAU."},
      {s:'#projects', t:"Featured Projects include Pic2Plot, a multi-agent computer vision system, SafetyMapper with Gemini AI, and Caption Creator Pro.", c:"Projects — AI & ML."},
      {s:'#skills', t:"Her skills span AI frameworks, backend with FastAPI, frontend with React and Next.js, and cloud platforms like Azure and AWS.", c:"Skills — full stack + AI."},
      {s:'#contact', t:"Finally, you can reach out through the Contact section below. Thanks for taking the tour!", c:"Contact — collaborate!"}
    ];
  
    async function getVoice() {
      const voices = await new Promise(res=>{
        let v = speechSynthesis.getVoices();
        if (v.length) return res(v);
        speechSynthesis.addEventListener('voiceschanged',()=>res(speechSynthesis.getVoices()),{once:true});
      });
      return voices.find(v=>/Google US English|Samantha|Victoria|Daniel|Karen/i.test(v.name))||voices[0];
    }
  
    function speak(text, voice, rate=1) {
      const u = new SpeechSynthesisUtterance(text);
      u.voice = voice; u.rate = rate; u.pitch = 1;
      speechSynthesis.speak(u);
      return u;
    }
  
    function runTour(voice) {
      let delay = 0;
      steps.forEach(step=>{
        setTimeout(()=>{
          document.querySelector(step.s)?.scrollIntoView({behavior:'smooth'});
          showCap(step.c);
          const u = speak(step.t, voice);
          u.onend = ()=>hideCap();
        }, delay);
        delay += step.t.split(' ').length * 250; // ~4 words/sec
      });
    }
  
   
    // Trigger only once per session, after first user click
    window.addEventListener('pointerdown', () => {
      if (sessionStorage.getItem('askedTour')) return;
      sessionStorage.setItem('askedTour','1');
      setTimeout(greetAndAsk, 300); // small delay feels natural
    }, { once:true });
  })();
  
  
// ===========================
// Initialize Everything
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! 🎉');
    
    // Add loaded class to body for CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
