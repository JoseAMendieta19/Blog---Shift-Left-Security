// ── MENÚ HAMBURGER (móvil) ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Cerrar menú al hacer clic en un link
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});


// ── SCROLL REVEAL ───────────────────────────────────────────────
// Cada elemento con clase "reveal" aparece suavemente al entrar en pantalla
const reveals  = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

reveals.forEach(el => observer.observe(el));


// ── LINK ACTIVO EN NAVBAR ───────────────────────────────────────
// Resalta el link del menú correspondiente a la sección visible
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.id;
    }
  });

  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--accent)'
      : '';
  });
});

// ── SIMULADOR SAST ──────────────────────────────────────────────
const btnScan    = document.getElementById('btnScan');
const scanResult = document.getElementById('scanResult');

if (btnScan && scanResult) {
  btnScan.addEventListener('click', () => {
    scanResult.style.display = 'block';
    scanResult.innerHTML = `
      <span style="color:var(--accent-warm);font-weight:600;">[CRITICAL ALERT] SAST Scanner v2.4</span><br>
      <span style="color:var(--ink-light);">➔ Target File:</span> VulnerableServlet.java<br>
      <span style="color:var(--ink-light);">➔ Code Line:</span> <code>int edad = Integer.parseInt(edadStr);</code><br>
      <span style="color:var(--ink-light);">➔ CWE:</span> CWE-248 (Uncaught Exception)<br>
      <span style="color:var(--ink-light);">➔ OWASP:</span> A05:2021 - Security Misconfiguration<br>
      <span style="color:var(--ink-light);">➔ Riesgo:</span> Entrada no numérica rompe el hilo de ejecución,
      provocando DoS y exposición de trazas internas del servidor.
    `;
    btnScan.textContent = 'Auditoría Finalizada';
    btnScan.style.background = 'var(--accent-green)';
  });
}