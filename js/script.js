
// App data
const apps = [
  { id:'ehadir', name:'E-Hadir', desc:'Sistem absensi digital untuk memantau kehadiran siswa dan guru secara real-time.', icon:'scan-line', color:'from-emerald-400 to-emerald-600', bg:'bg-emerald-50' },
  { id:'epustaka', name:'E-Pustaka', desc:'Perpustakaan digital dengan katalog lengkap dan peminjaman buku online.', icon:'book-open', color:'from-blue-400 to-blue-600', bg:'bg-blue-50', url:'http://e-pustaka.test' },
  { id:'ekelulusan', name:'E-Kelulusan', desc:'Cek status kelulusan dan unduh sertifikat secara online dengan mudah.', icon:'award', color:'from-amber-400 to-amber-600', bg:'bg-amber-50' },
  { id:'spmb', name:'SPMB', desc:'Sistem Penerimaan Murid Baru secara online, cepat, dan transparan.', icon:'file-text', color:'from-violet-400 to-violet-600', bg:'bg-violet-50' },
  { id:'esurat', name:'E-Surat', desc:'Manajemen surat-menyurat digital yang efisien dan terorganisir.', icon:'mail', color:'from-rose-400 to-rose-600', bg:'bg-rose-50' }
];

function renderAppCards() {
  const container = document.getElementById('appCards');
  container.innerHTML = apps.map((app, i) => `
    <div class="scroll-reveal app-card card-surface rounded-2xl bg-white border border-gray-100 shadow-sm p-6 flex flex-col" style="transition-delay:${i * .08}s">
      <div class="w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-5 shadow-lg">
        <i data-lucide="${app.icon}" class="w-7 h-7 text-white"></i>
      </div>
      <h3 class="font-bold text-navy-900 text-lg mb-2">${app.name}</h3>
      <p class="text-gray-500 text-sm leading-relaxed mb-5 flex-1">${app.desc}</p>
      <a href="${app.url}" target="_blank"
         onclick="showToast('${app.name} — Membuka portal...')"
         class="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${app.color} hover:opacity-90 transition shadow-sm">
         Masuk Aplikasi
      </a>
    </div>
  `).join('');
  lucide.createIcons();
}


// Toast
function showToast(msg) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.id = 'toast';
  t.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl bg-navy-900 text-white text-sm font-medium shadow-2xl flex items-center gap-2';
  t.style.cssText = 'animation:toastIn .3s ease';
  t.innerHTML = `<i data-lucide="external-link" class="w-4 h-4"></i> ${msg}`;
  document.body.appendChild(t);
  lucide.createIcons();
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 300); }, 2500);
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });

function observeElements() {
  document.querySelectorAll('.scroll-reveal,.scroll-reveal-left').forEach(el => observer.observe(el));
}

// Stat counter
let statsCounted = false;
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !statsCounted) {
      statsCounted = true;
      document.querySelectorAll('[data-target]').forEach(el => {
        const target = +el.dataset.target;
        const duration = 2000;
        const start = performance.now();
        function update(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target).toLocaleString('id-ID');
          if (p < 1) requestAnimationFrame(update);
          else el.textContent = target.toLocaleString('id-ID');
        }
        requestAnimationFrame(update);
      });
    }
  });
}, { threshold: 0.3 });

// Navbar scroll
const wrapper = document.getElementById('appWrapper');
wrapper.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (wrapper.scrollTop > 50) nav.classList.add('nav-scrolled');
  else nav.classList.remove('nav-scrolled');
});

// Mobile menu
document.getElementById('mobileMenuBtn').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});
document.querySelectorAll('.mobile-nav-link').forEach(a => {
  a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
});

// Dark mode
let darkMode = false;
document.getElementById('darkToggle').addEventListener('click', () => {
  darkMode = !darkMode;
  document.documentElement.classList.toggle('dark-mode', darkMode);
  const icon = document.getElementById('darkIcon');
  icon.setAttribute('data-lucide', darkMode ? 'sun' : 'moon');
  lucide.createIcons();
  // Update wave fill
  document.querySelector('.hero-wave-fill').setAttribute('fill', darkMode ? '#0f172a' : '#f8fafc');
});

// Style tag for toast animation
const s = document.createElement('style');
s.textContent = '@keyframes toastIn{from{opacity:0;transform:translate(-50%,10px)}to{opacity:1;transform:translate(-50%,0)}}';
document.head.appendChild(s);

// Default config
const defaultConfig = {
  school_name: 'SMA Negeri 1 Nusantara',
  hero_title: 'Sistem Digital Sekolah Terpadu',
  hero_subtitle: 'Menghubungkan seluruh ekosistem pendidikan dalam satu platform terintegrasi yang modern dan efisien.',
  about_text: 'SMA Negeri 1 Nusantara merupakan institusi pendidikan unggulan yang berkomitmen menghadirkan pendidikan berkualitas tinggi berbasis teknologi. Dengan fasilitas modern dan tenaga pengajar berpengalaman, kami mempersiapkan generasi muda untuk menghadapi tantangan global.',
  visi_text: 'Menjadi lembaga pendidikan terdepan yang menghasilkan lulusan berkarakter, berwawasan global, dan siap bersaing di era digital.',
  misi_text: 'Menyelenggarakan pembelajaran inovatif berbasis teknologi, membangun karakter siswa yang berintegritas, serta menjalin kemitraan strategis dengan berbagai institusi pendidikan dan industri.',
  address_text: 'Jl. Pendidikan No. 1, Kota Nusantara, Indonesia 12345',
  email_text: 'info@sman1nusantara.sch.id',
  phone_text: '(021) 555-1234',
  background_color: '#102a43',
  surface_color: '#ffffff',
  text_color: '#102a43',
  primary_action_color: '#059669',
  secondary_action_color: '#334e68'
};

function applyConfig(config) {
  const c = { ...defaultConfig, ...config };
  // Text
  document.getElementById('navSchoolName').textContent = c.school_name;
  document.getElementById('profilSchoolName').textContent = c.school_name;
  document.getElementById('footerSchoolName').textContent = c.school_name;
  document.getElementById('footerCopyName').textContent = c.school_name;

  const titleEl = document.getElementById('heroTitle');
  titleEl.innerHTML = c.hero_title.replace(/Terpadu/g, '<span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-400">Terpadu</span>');

  document.getElementById('heroSubtitle').textContent = c.hero_subtitle;
  document.getElementById('aboutText').textContent = c.about_text;
  document.getElementById('visiText').textContent = c.visi_text;
  document.getElementById('misiText').textContent = c.misi_text;
  document.getElementById('addressDisplay').textContent = c.address_text;
  document.getElementById('emailDisplay').textContent = c.email_text;
  document.getElementById('phoneDisplay').textContent = c.phone_text;

  // Colors via CSS custom properties applied to elements
  const fontFamily = c.font_family ? `${c.font_family}, Plus Jakarta Sans, sans-serif` : 'Plus Jakarta Sans, sans-serif';
  document.body.style.fontFamily = fontFamily;

  if (c.font_size) {
    const base = c.font_size;
    document.querySelectorAll('p').forEach(el => el.style.fontSize = `${base}px`);
  }
}

// Element SDK
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => { applyConfig(config); },
    mapToCapabilities: (config) => {
      const c = { ...defaultConfig, ...config };
      return {
        recolorables: [
          { get: () => c.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
          { get: () => c.surface_color, set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); } },
          { get: () => c.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
          { get: () => c.primary_action_color, set: (v) => { config.primary_action_color = v; window.elementSdk.setConfig({ primary_action_color: v }); } },
          { get: () => c.secondary_action_color, set: (v) => { config.secondary_action_color = v; window.elementSdk.setConfig({ secondary_action_color: v }); } }
        ],
        borderables: [],
        fontEditable: {
          get: () => c.font_family || defaultConfig.font_family || 'Plus Jakarta Sans',
          set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
        },
        fontSizeable: {
          get: () => c.font_size || 14,
          set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); }
        }
      };
    },
    mapToEditPanelValues: (config) => {
      const c = { ...defaultConfig, ...config };
      return new Map([
        ['school_name', c.school_name],
        ['hero_title', c.hero_title],
        ['hero_subtitle', c.hero_subtitle],
        ['about_text', c.about_text],
        ['visi_text', c.visi_text],
        ['misi_text', c.misi_text],
        ['address_text', c.address_text],
        ['email_text', c.email_text],
        ['phone_text', c.phone_text]
      ]);
    }
  });
}

// Init
renderAppCards();
observeElements();
document.querySelectorAll('[data-target]').forEach(el => statObserver.observe(el.closest('.scroll-reveal') || el));

// Loading screen
setTimeout(() => { document.getElementById('loadingScreen').classList.add('hidden'); }, 800);

// Smooth scroll for hash links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Typing animation for hero title - continuous loop
function typeHeroTitle() {
  const titleEl = document.getElementById('heroTitle');
  const baseText = 'Sistem Digital Sekolah ';
  const gradientText = 'Terpadu';
  const fullText = baseText + gradientText;
  let index = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 50;
  const delayBetween = 2000;
  
  function type() {
    if (!isDeleting) {
      // Typing phase
      if (index < fullText.length) {
        const current = fullText.substring(0, index + 1);
        if (index < baseText.length) {
          titleEl.innerHTML = current + '<span id="typingCursor" class="animate-pulse">|</span>';
        } else {
          const base = baseText;
          const grad = current.substring(baseText.length);
          titleEl.innerHTML = base + '<span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-400 inline-block">' + grad + '</span>' + '<span id="typingCursor" class="animate-pulse">|</span>';
        }
        index++;
        setTimeout(type, typeSpeed);
      } else {
        // Pause before deleting
        isDeleting = true;
        setTimeout(type, delayBetween);
      }
    } else {
      // Deleting phase
      if (index > 0) {
        index--;
        const current = fullText.substring(0, index);
        if (index <= baseText.length) {
          titleEl.innerHTML = current + '<span id="typingCursor" class="animate-pulse">|</span>';
        } else {
          const base = baseText;
          const grad = current.substring(baseText.length);
          titleEl.innerHTML = base + '<span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-400 inline-block">' + grad + '</span>' + '<span id="typingCursor" class="animate-pulse">|</span>';
        }
        setTimeout(type, deleteSpeed);
      } else {
        // Start typing again
        isDeleting = false;
        setTimeout(type, 500);
      }
    }
  }
  
  type();
}

typeHeroTitle();

lucide.createIcons();


(function () {
        function c() {
          var b = a.contentDocument || a.contentWindow.document; if (b) {
            var d = b.createElement('script');
            d.innerHTML = "window.__CF$cv$params={r:'9f03690c71fe582b',t:'MTc3Njg0ODEzNS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
            b.getElementsByTagName('head')[0].appendChild(d)
          }
        }
        if (document.body) {
          var a = document.createElement('iframe');
          a.height = 1;
          a.width = 1;
          a.style.position = 'absolute';
          a.style.top = 0;
          a.style.left = 0;
          a.style.border = 'none';
          a.style.visibility = 'hidden';

          document.body.appendChild(a);
          if ('loading' !== document.readyState) c();
          else if
            (window.addEventListener)
            document.addEventListener('DOMContentLoaded', c);
          else {
            var e = document.onreadystatechange ||
              function () { }; document.onreadystatechange =
                function (b) { e(b); 'loading' !== document.readyState && (document.onreadystatechange = e, c()) }
          }
        }
      })();