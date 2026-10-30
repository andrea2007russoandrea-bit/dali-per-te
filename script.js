document.addEventListener('DOMContentLoaded', () => {
  const btnReveal = document.getElementById('btn-reveal');
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');

  // 1. Genera elementi fluttuanti di sfondo (cuori, fiori, orsetti)
  createFloatingBackground();

  // 2. Gestione dell'evento click sul pulsante della sorpresa
  if (btnReveal) {
    btnReveal.addEventListener('click', () => {
      // Nasconde la prima scheda con un'animazione di sfumatura
      step1.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      step1.style.opacity = '0';
      step1.style.transform = 'scale(0.95)';

      setTimeout(() => {
        step1.classList.add('hidden');
        step1.style.display = 'none';

        // Mostra la seconda scheda
        step2.classList.remove('hidden');
        step2.style.display = 'block';
        step2.style.opacity = '0';
        step2.style.transform = 'scale(0.95)';

        // Effetto fade-in sulla seconda scheda
        requestAnimationFrame(() => {
          step2.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          step2.style.opacity = '1';
          step2.style.transform = 'scale(1)';
        });

        // Lancia l'animazione speciale dei coriandoli a cuore
        triggerHeartConfetti();
      }, 400);
    });
  }
});

// Funzione per creare i cuoricini fluttuanti dinamici sullo sfondo
function createFloatingBackground() {
  const heartsContainer = document.createElement('div');
  heartsContainer.className = 'hearts-container';
  heartsContainer.id = 'hearts-bg';
  document.body.appendChild(heartsContainer);

  const emojis = ['💖', '🌸', '✨', '💕', '🧸', '🌷'];
  const totalItems = 20;

  for (let i = 0; i < totalItems; i++) {
    const item = document.createElement('div');
    item.className = 'floating-heart';
    item.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Posizionamento e tempi casuali
    item.style.left = `${Math.random() * 100}%`;
    item.style.animationDuration = `${5 + Math.random() * 5}s`;
    item.style.animationDelay = `${Math.random() * 5}s`;
    
    heartsContainer.appendChild(item);
  }
}

// Funzione per un'esplosione scenografica di coriandoli e cuori
function triggerHeartConfetti() {
  if (typeof confetti !== 'function') return;

  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff4d6d', '#ff85a1', '#ffffff', '#ffccd5']
    });

    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff4d6d', '#ff85a1', '#ffffff', '#ffccd5']
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}