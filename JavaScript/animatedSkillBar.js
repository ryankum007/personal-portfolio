document.addEventListener('DOMContentLoaded', function () {
    const skillBars = document.querySelectorAll('.skill-bar');

    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                skillBar.style.width = skillBar.getAttribute('data-skill');
                observer.unobserve(skillBar);
            }
        });
    }, options);

    skillBars.forEach(skillBar => {
        observer.observe(skillBar);
    });
});
