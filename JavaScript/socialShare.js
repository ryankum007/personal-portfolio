// Data to be shared (My LinkedIn Profile)
const shareData = {
    title: "LinkedIn Profile",
    text: "Ryan Kumar",
    url: "https://www.linkedin.com/in/ryan-kumar-4491291aa/",
};

async function share() {
    try {
        if (navigator.share) {
            await navigator.share({
                title: shareData.title,
                text: shareData.text,
                url: shareData.url
            });
        } else {
            console.warn("Web Share API not supported in this browser.");
        }
    } catch (error) {
        console.error("Error sharing:", error);
    }
}

// Function to share the data on LinkedIn
function shareOnLinkedIn() {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`;
    window.open(linkedInUrl, '_blank');
}

// Function to share the data on Facebook
function shareOnFacebook() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
    window.open(facebookUrl, '_blank');
}

// Function to share the data on Twitter
function shareOnTwitter() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
    window.open(twitterUrl, '_blank');
}

// Function to share the data on WhatsApp
function shareOnWhatsApp() {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`;
    window.open(whatsappUrl, '_blank');
}

// Event listeners for share buttons
const shareLinkedInBtn = document.getElementById("shareLinkedIn");
if (shareLinkedInBtn) {
    shareLinkedInBtn.addEventListener("click", () => {
        try {
            shareOnLinkedIn();
        } catch (err) {
            console.error("Error sharing:", err);
        }
    });
}

const shareBtn = document.getElementById("share");
if (shareBtn) {
    shareBtn.addEventListener("click", () => {
        try {
            share();
        } catch (err) {
            console.error("Error sharing:", err);
        }
    });
}

const shareFacebookBtn = document.getElementById("shareFacebook");
if (shareFacebookBtn) {
    shareFacebookBtn.addEventListener("click", () => {
        try {
            shareOnFacebook();
        } catch (err) {
            console.error("Error sharing:", err);
        }
    });
}

const shareTwitterBtn = document.getElementById("shareTwitter");
if (shareTwitterBtn) {
    shareTwitterBtn.addEventListener("click", () => {
        try {
            shareOnTwitter();
        } catch (err) {
            console.error("Error sharing:", err);
        }
    });
}

const shareWhatsAppBtn = document.getElementById("shareWhatsApp");
if (shareWhatsAppBtn) {
    shareWhatsAppBtn.addEventListener("click", () => {
        try {
            shareOnWhatsApp();
        } catch (err) {
            console.error("Error sharing:", err);
        }
    });
}