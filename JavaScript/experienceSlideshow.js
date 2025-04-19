document.addEventListener('DOMContentLoaded', () => {
  const data = window.experienceData;
  let currentIndex = 0;
  let activeType = 'all';

  const container = document.querySelector('.experience-slides');
  const prevBtn = document.querySelector('.experience-prev');
  const nextBtn = document.querySelector('.experience-next');
  const dotsWrap = document.querySelector('.experience-indicators');
  const filterWrap = document.querySelector('.experience-filters');

  const typesInOrder = ['All', 'Software', 'Research', 'Leadership', 'Customer Service'];

  typesInOrder.forEach(type => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.type = type.toLowerCase();
    btn.innerText = type;
    btn.addEventListener('click', () => {
      activeType = type.toLowerCase();
      renderSlides();
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    filterWrap.appendChild(btn);
  });

  function renderSlides() {
    container.innerHTML = '';
    dotsWrap.innerHTML = '';

    const filtered = data.filter(item => activeType === 'all' || item.type.toLowerCase() === activeType);

    filtered.forEach((item, idx) => {
      const slide = document.createElement('div');
      slide.className = 'experience-slide';
      slide.innerHTML = `
        <img src="${item.logo}" alt="${item.alt}" class="experience-image" />
        <h2 class="experience-title">${item.company}</h2>
        <p class="experience-date"><em>${item.role}</em> | ${item.date}</p>
        <div class="experience-details">
          <ul>${item.details.map(d => `<li>${d}</li>`).join('')}</ul>
        </div>
        <div class="experience-tech-tags">
          ${item.techTags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
        </div>
      `;
      container.appendChild(slide);

      const dot = document.createElement('span');
      dot.className = 'experience-dot';
      dot.addEventListener('click', () => showSlide(idx));
      dotsWrap.appendChild(dot);
    });

    showSlide(0);
  }

  function showSlide(n) {
    const slides = document.querySelectorAll('.experience-slide');
    const dots = document.querySelectorAll('.experience-dot');

    slides.forEach(s => s.classList.remove('active', 'fade-in'));
    dots.forEach(d => d.classList.remove('active'));

    currentIndex = (n + slides.length) % slides.length;
    slides[currentIndex].classList.add('active', 'fade-in');
    dots[currentIndex].classList.add('active');
  }

  prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

  renderSlides();
});
