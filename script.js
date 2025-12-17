// 1. Polvo de Oro (Partículas)
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 80 },
        "color": { "value": "#d4af37" },
        "size": { "value": 1.5 },
        "move": { "enable": true, "speed": 0.8, "direction": "bottom" }
    }
});

// Función para Explosión de Oro (Confeti)
function goldExplosion() {
    const count = 200;
    const defaults = { origin: { y: 0.7 }, colors: ['#d4af37', '#f9e29f', '#aa8412'] };
    function fire(particleRatio, opts) {
        confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    }
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
}

// 2. Apertura de Invitación (Unlock)
function unlockInvitation() {
    const music = document.getElementById('bg-music');
    document.getElementById('welcome-screen').style.opacity = '0';
    
    // Disparar explosión al abrir
    goldExplosion();

    setTimeout(() => {
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        document.getElementById('nav-bar').classList.remove('hidden');
        document.getElementById('music-container').classList.remove('hidden');
        document.getElementById('main-footer').classList.remove('hidden');
        
        music.play().catch(e => console.log("Audio waiting..."));
        AOS.init({ duration: 1200, once: true });
        window.dispatchEvent(new Event('resize'));
    }, 1200);
}

// 3. Temporizador Pro (2026)
function updateTimer() {
    const target = new Date('October 15, 2026 17:00:00').getTime();
    const now = new Date().getTime();
    const diff = target - now;
    if (diff <= 0) {
        document.getElementById('timer-display').innerText = "¡Llegó el día!";
        return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    document.getElementById('timer-display').innerText = `${d}D : ${h}H : ${m}M`;
}
setInterval(updateTimer, 60000); 
updateTimer();

// 4. RSVP, QR y WhatsApp con Canción
document.getElementById('form-digitality').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('guest-name').value;
    const extras = document.getElementById('extra-pases').value;
    const song = document.getElementById('guest-song').value || "Sorpréndeme";
    const total = parseInt(extras) + 1;

    document.getElementById('disp-name').innerText = name.toUpperCase();
    document.getElementById('disp-pases').innerText = total;
    
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VIP-BODA-ANA-MARCO-${encodeURIComponent(name)}-PAX-${total}`;
    document.getElementById('qr-code').src = qrUrl;

    document.getElementById('ticket-result').classList.remove('hidden');
    document.getElementById('ticket-result').scrollIntoView({ behavior: 'smooth' });

    const waMsg = `*CONFIRMACIÓN DE ASISTENCIA*%0A💍 *Boda:* Ana & Marco%0A👤 *Nombre:* ${name}%0A🎟️ *Pases:* ${total}%0A🎶 *Canción:* ${song}`;
    setTimeout(() => window.open(`https://wa.me/523322961969?text=${waMsg}`, '_blank'), 2000);
});

// 5. Utilidades
function showBankDetails() {
    alert("BANCO: Digitality Luxe Bank\nCLABE: 0123 4567 8901 2345 67\nTitular: Ana & Marco");
}

function toggleMusic() {
    const music = document.getElementById('bg-music');
    if (music.paused) music.play(); else music.pause();
}

function addToCalendar() {
    window.open("https://www.google.com/calendar/render?action=TEMPLATE&text=Boda+Ana+y+Marco&dates=20261015T170000/20261016T030000", "_blank");
}

// Saludo Personalizado
function applyPersonalization() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('n'); 
    if (guestName) {
        const greetingElement = document.getElementById('personalized-greeting');
        if (greetingElement) greetingElement.innerText = `${guestName.toUpperCase()}, ¡ESTÁS INVITADO!`;
    }
}
window.addEventListener('DOMContentLoaded', applyPersonalization);