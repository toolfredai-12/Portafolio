function addSwipe(el, onSwipeLeft, onSwipeRight){
  var startX = 0, startY = 0, tracking = false;
  el.addEventListener('touchstart', function(e){
    if (e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    tracking = true;
  }, {passive:true});
  el.addEventListener('touchend', function(e){
    if (!tracking) return;
    tracking = false;
    var endX = e.changedTouches[0].clientX;
    var endY = e.changedTouches[0].clientY;
    var dx = endX - startX;
    var dy = endY - startY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) onSwipeLeft(); else onSwipeRight();
    }
  });
}

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

  var lbTimer;
  function lbPlay(){
    clearInterval(lbTimer);
    if (window.matchMedia('(max-width:700px)').matches) {
      lbTimer = setInterval(function(){ showLightbox(lbIdx + 1, true); }, 3500);
    }
  }
  function lbPause(){ clearInterval(lbTimer); }

  function openLightbox(slidesArr, startIdx){
    lbSlides = slidesArr;
    showLightbox(startIdx, false);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    lbPlay();
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lbPause();
  }

  addSwipe(lightbox.querySelector('.lb-stage'),
    function(){ showLightbox(lbIdx + 1, true); lbPlay(); },
    function(){ showLightbox(lbIdx - 1, true); lbPlay(); }
  );

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
    addSwipe(stage, function(){ show(idx + 1); }, function(){ show(idx - 1); });

    show(0);
  });

  var certImgs = document.querySelectorAll('.certs-strip img');
  certImgs.forEach(function(img, i){
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Ampliar imagen');
    function openCert(){ openLightbox(Array.prototype.slice.call(certImgs), i); }
    img.addEventListener('click', openCert);
    img.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openCert(); }
    });
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

  function offsetFor(i){
    var s = slides[i];
    return viewport.clientWidth / 2 - (s.offsetLeft + s.offsetWidth / 2);
  }

  function position(){
    track.style.transform = 'translateX(' + offsetFor(idx) + 'px)';
  }

  function show(i){
    idx = (i + slides.length) % slides.length;
    slides.forEach(function(s, j){
      var dist = Math.abs(j - idx);
      s.setAttribute('data-dist', dist <= 2 ? dist : '3');
    });
    dots.forEach(function(d, j){ d.classList.toggle('active', j === idx); });
    track.style.transition = '';
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

  /* ---- deslizar con inercia (tipo ruleta) ---- */
  var dragging = false, axisLocked = null;
  var startX = 0, startY = 0, startOffset = 0, currentOffset = 0;
  var lastX = 0, lastT = 0, velocity = 0, rafId = null;

  function currentTrackOffset(){
    var m = /translateX\(([-\d.]+)px\)/.exec(track.style.transform);
    return m ? parseFloat(m[1]) : offsetFor(idx);
  }

  viewport.addEventListener('touchstart', function(e){
    if (e.touches.length !== 1) return;
    pause();
    cancelAnimationFrame(rafId);
    dragging = true;
    axisLocked = null;
    track.style.transition = 'none';
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startOffset = currentTrackOffset();
    currentOffset = startOffset;
    lastX = startX; lastT = Date.now(); velocity = 0;
  }, {passive:true});

  viewport.addEventListener('touchmove', function(e){
    if (!dragging) return;
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    if (axisLocked === null) {
      if (Math.abs(x - startX) > 6 || Math.abs(y - startY) > 6) {
        axisLocked = Math.abs(x - startX) > Math.abs(y - startY) ? 'x' : 'y';
      }
    }
    if (axisLocked === 'y') { dragging = false; play(); return; }
    if (axisLocked !== 'x') return;
    currentOffset = startOffset + (x - startX);
    track.style.transform = 'translateX(' + currentOffset + 'px)';
    var now = Date.now();
    var dt = now - lastT;
    if (dt > 0) velocity = (x - lastX) / dt;
    lastX = x; lastT = now;
  }, {passive:true});

  viewport.addEventListener('touchend', function(){
    if (!dragging) return;
    dragging = false;
    var v = velocity;
    (function frame(){
      v *= 0.94;
      currentOffset += v * 16;
      track.style.transform = 'translateX(' + currentOffset + 'px)';
      if (Math.abs(v) > 0.02) {
        rafId = requestAnimationFrame(frame);
      } else {
        var nearest = 0, best = Infinity;
        for (var i = 0; i < slides.length; i++){
          var diff = Math.abs(offsetFor(i) - currentOffset);
          if (diff < best){ best = diff; nearest = i; }
        }
        show(nearest);
        play();
      }
    })();
  });

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

(function(){
  var header = document.querySelector('header.site');
  var lastY = window.scrollY;
  var ticking = false;

  function onScroll(){
    var y = window.scrollY;
    if (y > lastY && y > 80) {
      header.classList.add('nav-collapsed');
    } else if (y < lastY) {
      header.classList.remove('nav-collapsed');
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function(){
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, {passive:true});
})();
