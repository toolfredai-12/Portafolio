(function(){
  var esEls = document.querySelectorAll('.lang-es');
  var enEls = document.querySelectorAll('.lang-en');
  var btnEs = document.getElementById('btn-es');
  var btnEn = document.getElementById('btn-en');

  function setLang(lang){
    var showEs = lang === 'es';
    esEls.forEach(function(el){ if(showEs){ el.removeAttribute('hidden'); } else { el.setAttribute('hidden',''); } });
    enEls.forEach(function(el){ if(!showEs){ el.removeAttribute('hidden'); } else { el.setAttribute('hidden',''); } });
    document.documentElement.setAttribute('lang', showEs ? 'es' : 'en');
    btnEs.classList.toggle('active', showEs);
    btnEn.classList.toggle('active', !showEs);
  }

  btnEs.addEventListener('click', function(){ setLang('es'); });
  btnEn.addEventListener('click', function(){ setLang('en'); });

  var detected = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
  setLang(detected.indexOf('es') === 0 ? 'es' : 'en');
})();

(function(){
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  var lbCounter = document.getElementById('lightbox-counter');
  var lbLabel = document.getElementById('lightbox-label');
  var lbClose = lightbox.querySelector('.lb-close');
  var lbPrev = lightbox.querySelector('.lb-btn.prev');
  var lbNext = lightbox.querySelector('.lb-btn.next');
  var lbSlides = [];
  var lbIdx = 0;

  function pad(n){ return n < 10 ? '0' + n : '' + n; }

  function setLightboxContent(s){
    lbImg.src = s.src;
    lbImg.alt = s.alt;
    lbCounter.textContent = pad(lbIdx + 1) + '/' + pad(lbSlides.length);
    lbLabel.textContent = s.alt;
  }

  function showLightbox(i, animate){
    lbIdx = (i + lbSlides.length) % lbSlides.length;
    var s = lbSlides[lbIdx];
    if (animate) {
      lbImg.style.opacity = '0';
      window.setTimeout(function(){
        setLightboxContent(s);
        lbImg.style.opacity = '1';
      }, 220);
    } else {
      setLightboxContent(s);
    }
  }

  function openLightbox(slidesArr, startIdx){
    lbSlides = slidesArr;
    showLightbox(startIdx, false);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e){ if (e.target === lightbox) closeLightbox(); });
  lbPrev.addEventListener('click', function(){ showLightbox(lbIdx - 1, true); });
  lbNext.addEventListener('click', function(){ showLightbox(lbIdx + 1, true); });
  document.addEventListener('keydown', function(e){
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightbox(lbIdx - 1, true);
    if (e.key === 'ArrowRight') showLightbox(lbIdx + 1, true);
  });

  document.querySelectorAll('[data-carousel]').forEach(function(car){
    var stage = car.querySelector('.carousel-stage');
    var slides = car.querySelectorAll('.slide');
    var prev = car.querySelector('.car-btn.prev');
    var next = car.querySelector('.car-btn.next');
    var expand = car.querySelector('.car-expand');
    var counterEl = car.querySelector('.cc-counter');
    var labelEl = car.querySelector('.cc-label');
    var idx = 0;

    function show(i){
      idx = (i + slides.length) % slides.length;
      slides.forEach(function(s, j){ s.classList.toggle('active', j === idx); });
      if (counterEl) counterEl.textContent = pad(idx + 1) + '/' + pad(slides.length);
      if (labelEl) labelEl.textContent = slides[idx].alt;
    }

    function openThis(){ openLightbox(Array.prototype.slice.call(slides), idx); }

    if (prev) prev.addEventListener('click', function(e){ e.stopPropagation(); show(idx - 1); });
    if (next) next.addEventListener('click', function(e){ e.stopPropagation(); show(idx + 1); });
    if (expand) expand.addEventListener('click', function(e){ e.stopPropagation(); openThis(); });

    stage.tabIndex = 0;
    stage.setAttribute('role', 'button');
    stage.setAttribute('aria-label', 'Ampliar imagen');
    stage.addEventListener('click', openThis);
    stage.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openThis(); }
    });

    show(0);
  });
})();

(function(){
  var root = document.querySelector('[data-spotlight]');
  if (!root) return;
  var viewport = root.querySelector('.ps-viewport');
  var track = root.querySelector('.ps-track');
  var slides = root.querySelectorAll('.ps-slide');
  var dots = root.querySelectorAll('.ps-dots button');
  var idx = 0;
  var timer;

  function position(){
    var active = slides[idx];
    var offset = viewport.clientWidth / 2 - (active.offsetLeft + active.offsetWidth / 2);
    track.style.transform = 'translateX(' + offset + 'px)';
  }

  function show(i){
    idx = (i + slides.length) % slides.length;
    slides.forEach(function(s, j){
      var dist = Math.abs(j - idx);
      s.setAttribute('data-dist', dist <= 2 ? dist : '3');
    });
    dots.forEach(function(d, j){ d.classList.toggle('active', j === idx); });
    position();
  }

  function play(){ timer = setInterval(function(){ show(idx + 1); }, 2600); }
  function pause(){ clearInterval(timer); }

  dots.forEach(function(d, j){
    d.addEventListener('click', function(){ pause(); show(j); play(); });
  });

  root.addEventListener('mouseenter', pause);
  root.addEventListener('mouseleave', play);
  window.addEventListener('resize', position);
  window.addEventListener('load', position);

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  show(0);
  if (!reduceMotion) play();
})();
(function(){
  var targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function(t){ t.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(function(t){ io.observe(t); });
})();
(function(){
  var btn = document.getElementById('email-btn');
  if (!btn || !navigator.clipboard) return;
  var esLabel = btn.querySelector('.lang-es');
  var enLabel = btn.querySelector('.lang-en');
  var originalEs = esLabel ? esLabel.textContent : '';
  var originalEn = enLabel ? enLabel.textContent : '';
  var email = btn.getAttribute('href').replace('mailto:', '');

  btn.addEventListener('click', function(){
    navigator.clipboard.writeText(email).then(function(){
      if (esLabel) esLabel.textContent = '¡Copiado! ' + email;
      if (enLabel) enLabel.textContent = 'Copied! ' + email;
      setTimeout(function(){
        if (esLabel) esLabel.textContent = originalEs;
        if (enLabel) enLabel.textContent = originalEn;
      }, 2500);
    });
  });
})();