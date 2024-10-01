document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (name.value.trim() === '') {
            isValid = false;
            alert('Name is required.');
        }

        if (email.value.trim() === '') {
            isValid = false;
            alert('Email is required.');
        } else if (!validateEmail(email.value)) {
            isValid = false;
            alert('Please enter a valid email address.');
        }

        if (message.value.trim() === '') {
            isValid = false;
            alert('Message is required.');
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }
});
