document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800, // Animation duration
        once: false, // Whether animation should happen only once - while scrolling down
        mirror: true, // Whether elements should animate out while scrolling past them
    });

    // Collapsible Sections Logic
    const headers = document.querySelectorAll('.collapsible-header');
    headers.forEach(header => {
        header.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                // Collapse the section
                content.style.maxHeight = '0px';
                content.classList.remove('open');
                // Optional: Add a small delay before removing padding if needed for transition
                // setTimeout(() => { content.style.padding = '0 18px'; }, 400);
            } else {
                // Expand the section
                content.classList.add('open');
                // Set max-height to the scroll height for the transition
                content.style.maxHeight = content.scrollHeight + "px";
                // Optional: Add padding back immediately or after a delay
                // content.style.padding = '15px 18px';
            }
        });
    });

    // Share Button Functionality
    const shareButton = document.getElementById('share');
    const shareLinkedIn = document.getElementById('shareLinkedIn');
    const shareFacebook = document.getElementById('shareFacebook');
    const shareTwitter = document.getElementById('shareTwitter');
    const shareWhatsApp = document.getElementById('shareWhatsApp');

    const shareUrl = window.location.href;
    const shareTitle = document.title;
    const shareText = "Check out Ryan Kumar's About Me page!";

    if (shareButton && navigator.share) {
        shareButton.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: shareTitle,
                    text: shareText,
                    url: shareUrl,
                });
                console.log('Content shared successfully');
            } catch (err) {
                console.error('Error sharing content:', err);
            }
        });
    } else if (shareButton) {
        // Hide the generic share button if Web Share API is not supported
        shareButton.style.display = 'none';
    }

    if (shareLinkedIn) {
        shareLinkedIn.addEventListener('click', () => {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        });
    }

    if (shareFacebook) {
        shareFacebook.addEventListener('click', () => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        });
    }

    if (shareTwitter) {
        shareTwitter.addEventListener('click', () => {
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
        });
    }

    if (shareWhatsApp) {
        shareWhatsApp.addEventListener('click', () => {
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
        });
    }

    // jQuery UI Tabs Initialization
    if ($("#tabs").length) {
        $("#tabs").tabs();
        
        // Add tab change event to ensure skill bars animate when tab becomes visible
        $("#tabs").on("tabsactivate", function(event, ui) {
            if (ui.newPanel.attr('id') === 'tabs-1' || ui.newPanel.attr('id') === 'tabs-2') {
                animateSkillBars();
            }
        });
    }
    
    // Function to animate skill bars
    function animateSkillBars() {
        // Get all skill bars
        const skillBars = document.querySelectorAll('.skill-bar');
        
        // For each skill bar
        skillBars.forEach(bar => {
            // Get the skill level from the data attribute
            const skillLevel = bar.getAttribute('data-skill');
            
            // Set the width of the skill bar to 0 first (for animation)
            bar.style.width = '0';
            
            // Use setTimeout to create a slight delay before animation
            setTimeout(() => {
                // Set the width of the skill bar to the skill level
                bar.style.width = skillLevel;
            }, 200);
        });
    }
    
    // Call the function when the page loads
    animateSkillBars();

});