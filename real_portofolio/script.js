const slider = document.querySelector(".nav-slider");
const activeLink = document.querySelector(".nav-links a.active");
const nav = document.querySelector(".nav-links");

function moveSlider(element) {
    if (!slider || !element) return;

    const rect = element.getBoundingClientRect();
    const parentRect = nav.getBoundingClientRect();

    slider.style.width = rect.width + "px";
    slider.style.left = (rect.left - parentRect.left) + "px";
}

// on load
moveSlider(activeLink);

// hover animation
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("mouseenter", () => moveSlider(link));
});

window.addEventListener("load", () => {
    moveSlider(activeLink);
})

const filterBtns = document.querySelectorAll('.filter-btn');
const projItems = document.querySelectorAll('.proj-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});


// Projects carousel
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (slides.length > 0) {
    let current = 0;

    // Build dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Go to project ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    function goTo(index) {
        slides[current].classList.remove('active');
        dotsContainer.children[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dotsContainer.children[current].classList.add('active');
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
}

// Contact form
// Some of the code with fomspree is taken from internet and i dont know it
async function handleSubmit() {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const feedback = document.getElementById('formFeedback');
    const btn = document.querySelector('.contact-btn');

    if (!name || !email || !message) {
        feedback.textContent = 'Please fill in all fields.';
        feedback.style.color = '#e05555';
        return;
    }

    btn.textContent = 'Sending...';
    btn.disabled = true;
// "Borrowed" code Under
    const response = await fetch('https://formspree.io/f/xbdwyppp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    });
// "Borrowed" code above ^
    if (response.ok) {
        feedback.style.color = 'var(--primary-color)';
        feedback.textContent = "Thanks! I'll be in touch soon.";
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    } else {
        feedback.style.color = '#e05555';
        feedback.textContent = 'Something went wrong. Try emailing me directly.';
    }

    btn.textContent = 'Send Message';
    btn.disabled = false;
}