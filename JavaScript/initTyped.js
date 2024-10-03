document.addEventListener('DOMContentLoaded', () => {
    const elements = [
        { id: 'typed-about', strings: ["About Me", "Get to Know Me", "A Little Bit About Me"] },
        { id: 'typed-projects', strings: ["Projects", "My Work", "My Projects"] },
        { id: 'typed-experience', strings: ["Experience", "The Evolution of a Tech Enthusiast "] },
        { id: 'typed-blog', strings: ["Blog", "My Thoughts", "My Blog"] },
        { id: 'typed-contact', strings: ["Contact Me", "Let's Get In Touch"] }
    ];

    elements.forEach(({ id, strings }) => {
        const element = document.getElementById(id);
        if (element) {
            new Typed(`#${id}`, {
                strings: strings,
                typeSpeed: 50,
                backSpeed: 25,
                startDelay: 500,
                backDelay: 1000,
                loop: false,
                showCursor: true,
                cursorChar: '|',
                autoInsertCss: true,
            });
        } else {
            console.error(`Element with id '${id}' not found.`);
        }
    });
});
