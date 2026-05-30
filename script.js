// Smooth scrolling for navigation links
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

// Unlock Script Preview Function
function unlockScript(scriptId, amount) {
    const previewLocked = document.getElementById(`preview${scriptId}`);
    const previewContent = document.getElementById(`content${scriptId}`);
    
    if (previewContent.classList.contains('hidden')) {
        const message = `Hi Mumchi Production, I want to unlock script ${scriptId} for KES ${amount}. Please send payment details.`;
        const encodedMessage = encodeURIComponent(message);
        
        // Show loading state
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        // Open WhatsApp
        setTimeout(() => {
            window.open(`https://wa.me/254769629975?text=${encodedMessage}`, '_blank');
            // Animate unlock
            previewLocked.style.display = 'none';
            previewContent.classList.remove('hidden');
            btn.innerHTML = '<i class="fas fa-check"></i> Script Unlocked!';
            btn.style.background = '#25d366';
        }, 500);
    }
}

// M-Pesa Payment Function
function payViaMpesa() {
    const phone = prompt('Enter your M-Pesa phone number (e.g., 254769629975):');
    if (phone) {
        const amount = prompt('Enter amount in KES:');
        if (amount) {
            // In production, this would integrate with Safaricom STK Push API
            alert(`Payment request for KES ${amount} will be sent to ${phone}.\n\nYou will receive an M-Pesa prompt to complete the payment.\n\nOur Till Number: 123456`);
            // Redirect to WhatsApp to confirm
            window.open(`https://wa.me/254769629975?text=I%20want%20to%20pay%20KES%20${amount}%20via%20M-Pesa`, '_blank');
        }
    }
}

// Payment Button Click Handler
function makePayment(planName, amount) {
    const message = `Hi Mumchi Production, I'm interested in the ${planName} for KES ${amount}/month. Please send me payment details.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/254769629975?text=${encodedMessage}`, '_blank');
}

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = `Hi Mumchi Production, my name is ${name}. Email: ${email}, Phone: ${phone}\n\nMessage: ${this.querySelector('textarea').value}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/254769629975?text=${encodedMessage}`, '_blank');
        alert('Thank you! Opening WhatsApp to connect with us...');
        this.reset();
    });
}

// Script preview unlock animation
document.querySelectorAll('.preview-locked').forEach(element => {
    element.addEventListener('click', function() {
        // Find the parent script card
        const scriptCard = this.closest('.script-card');
        const scriptId = scriptCard.querySelector('.unlock-btn').onclick.toString().match(/\d+/)[0];
        const amount = scriptCard.querySelector('.script-price').textContent;
        
        // Show hint
        alert(`Click "Unlock Full Script" button to unlock this preview and view the complete script!`);
    });
});

// Scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards, portfolio items, pricing cards, and script cards
document.querySelectorAll('.service-card, .portfolio-item, .stat, .pricing-card, .payment-card, .script-card').forEach(el => {
    observer.observe(el);
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

console.log('Mumchi Production website with pay-to-unlock script system loaded successfully!');
