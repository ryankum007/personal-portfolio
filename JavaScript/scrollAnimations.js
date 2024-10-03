$(document).ready(function () {
    // Initialize AOS animations with custom offset
    AOS.init({
        duration: 1000,  // Animation duration in milliseconds
        easing: 'ease-in-out',  // Easing function for the animation
        once: false,  // Allows animations to trigger again when scrolling back up
        mirror: true,  // Enables elements to animate while scrolling up
        offset: 200,   // Adjust this value to control when the animation starts
        startEvent: 'DOMContentLoaded'  // Ensures AOS initializes on page load
    });

    // Refresh AOS only on resize to avoid unnecessary refreshes during scroll
    window.addEventListener('resize', () => {
        AOS.refresh();
    });

    // Get the initial position of the share buttons
    let headerBottom = $('header').offset().top + $('header').outerHeight();
    
    // Handle scroll events for custom animations
    $(window).on('scroll', function () {
        let currentScrollTop = $(this).scrollTop();

        // Check if the scroll position is within the header's view
        if (currentScrollTop < headerBottom) {
            $('.share-buttons').fadeIn(); // Show the share buttons when the header is in view
        } else {
            $('.share-buttons').fadeOut(); // Hide the share buttons when the header is out of view
        }
    });
});
