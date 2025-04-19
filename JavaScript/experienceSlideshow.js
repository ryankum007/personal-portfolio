// experienceSlideshow.js

document.addEventListener('DOMContentLoaded', () => {
    const data = window.experienceData;
    let currentIndex = 0;
  
    const container = document.querySelector('.experience-slides');
    const prevBtn   = document.querySelector('.experience-prev');
    const nextBtn   = document.querySelector('.experience-next');
    const dotsWrap  = document.querySelector('.experience-indicators');
  
    // Build slides & dots
    data.forEach((item, idx) => {
      // Slide
      const slide = document.createElement('div');
      slide.className = 'experience-slide';
      slide.innerHTML = `
        <img src="${item.logo}" alt="${item.alt}" class="experience-image">
        <h2 class="experience-title">${item.company}</h2>
        <p class="experience-date">${item.role} | ${item.date}</p>
        <div class="experience-details">
          <ul>
            ${item.details.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>`;
      container.appendChild(slide);
  
      // Dot
      const dot = document.createElement('span');
      dot.className = 'experience-dot';
      dot.addEventListener('click', () => showSlide(idx));
      dotsWrap.appendChild(dot);
    });
  
    const slides = document.querySelectorAll('.experience-slide');
    const dots   = document.querySelectorAll('.experience-dot');
  
    function showSlide(n) {
      slides[currentIndex].classList.remove('active');
      dots[currentIndex].classList.remove('active');
      currentIndex = (n + slides.length) % slides.length;
      slides[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
    }
  
    prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
  
    // init
    showSlide(0);
  });
  