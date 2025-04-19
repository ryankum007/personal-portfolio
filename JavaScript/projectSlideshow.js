// Project slideshow functionality
let currentSlideIndex = 0;
let filteredProjects = [];
let currentFilter = 'all';

// Initialize slideshow on page load
document.addEventListener('DOMContentLoaded', () => {
    setupProjectSlideshow();
});

function setupProjectSlideshow() {
    // Start with all projects
    filteredProjects = [...projectData];
    
    // Setup filter buttons
    generateFilterButtons();
    
    // Generate initial slides
    generateProjectSlides();
    
    // Initialize slideshow
    showProjectSlide(currentSlideIndex);
    
    // Add event listeners to navigation controls
    document.querySelector('.project-prev').addEventListener('click', () => {
        navigateProjectSlide(-1);
    });
    
    document.querySelector('.project-next').addEventListener('click', () => {
        navigateProjectSlide(1);
    });
    
    // Automatic slide change every 9 seconds
    setInterval(() => {
        if (!document.querySelector('.project-slideshow-container:hover')) {
            navigateProjectSlide(1);
        }
    }, 9000);
}

function generateFilterButtons() {
    const filterContainer = document.querySelector('.project-filters');
    
    // Get unique project types
    const projectTypes = [...new Set(projectData.map(project => project.type))];
    
    // Create "All" filter button
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'All';
    allBtn.dataset.filter = 'all';
    allBtn.addEventListener('click', function() {
        filterProjects('all');
        setActiveFilterButton(this);
    });
    filterContainer.appendChild(allBtn);
    
    // Create type filter buttons
    projectTypes.forEach(type => {
        const typeBtn = document.createElement('button');
        typeBtn.className = 'filter-btn';
        typeBtn.textContent = type;
        typeBtn.dataset.filter = type;
        typeBtn.addEventListener('click', function() {
            filterProjects(type);
            setActiveFilterButton(this);
        });
        filterContainer.appendChild(typeBtn);
    });
}

function setActiveFilterButton(activeButton) {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    activeButton.classList.add('active');
}

function filterProjects(filterType) {
    currentFilter = filterType;
    
    if (filterType === 'all') {
        filteredProjects = [...projectData];
    } else {
        filteredProjects = projectData.filter(project => project.type === filterType);
    }
    
    // Reset current slide index
    currentSlideIndex = 0;
    
    // Regenerate slides with filtered projects
    generateProjectSlides();
    
    // Show first slide of filtered projects
    showProjectSlide(currentSlideIndex);
}

function generateProjectSlides() {
    const slideshowContainer = document.querySelector('.project-slides');
    const dotsContainer = document.querySelector('.project-indicators');
    
    // Clear existing slides and dots
    slideshowContainer.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Generate slides for each project
    filteredProjects.forEach((project, index) => {
        // Create slide element
        const slide = document.createElement('div');
        slide.className = 'project-slide';
        slide.dataset.index = index;
        
        // Create title first
        const title = document.createElement('h3');
        title.className = 'project-title';
        title.textContent = project.title;
        
        // Create description, now between title and image
        const description = document.createElement('p');
        description.className = 'project-description';
        description.textContent = project.shortDescription;
        
        // Create image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'project-image';
        
        // Create and set image
        const image = document.createElement('img');
        image.src = project.image || '../Photos/placeholder-project.jpg';
        image.alt = project.title;
        imageContainer.appendChild(image);
        
        // Create tech tags
        const techTags = document.createElement('div');
        techTags.className = 'tech-tags';
        
        project.techStack.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            techTags.appendChild(tag);
        });
        
        // Create details section
        const details = document.createElement('div');
        details.className = 'project-details';
        
        const detailsList = document.createElement('ul');
        project.details.forEach(detail => {
            const item = document.createElement('li');
            item.textContent = detail;
            detailsList.appendChild(item);
        });
        
        details.appendChild(detailsList);
        
        // Assemble the slide: title > description > image > tags > details
        slide.appendChild(title);
        slide.appendChild(description);  // Description now comes after title but before image
        slide.appendChild(imageContainer);
        slide.appendChild(techTags);
        slide.appendChild(details);
        
        // Add the slide to the container
        slideshowContainer.appendChild(slide);
        
        // Create dot indicator
        const dot = document.createElement('span');
        dot.className = 'project-dot';
        dot.dataset.index = index;
        dot.addEventListener('click', function() {
            currentSlideIndex = parseInt(this.dataset.index);
            showProjectSlide(currentSlideIndex);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    // Update the dot display to show max 5 dots at a time like index.html
    updateDotDisplay();
}

// Function to update which dots are visible, similar to index.html
function updateDotDisplay() {
    const dots = document.querySelectorAll('.project-dot');
    if (dots.length <= 5) {
        // If 5 or fewer dots, show all
        dots.forEach(dot => {
            dot.style.display = 'inline-block';
        });
    } else {
        // If more than 5 dots, show 5 centered around current
        const start = Math.max(0, currentSlideIndex - 2);
        const end = Math.min(dots.length, start + 5);
        
        dots.forEach((dot, index) => {
            if (index >= start && index < end) {
                dot.style.display = 'inline-block';
            } else {
                dot.style.display = 'none';
            }
        });
    }
}

function showProjectSlide(n) {
    // Get all slides and dots
    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.project-dot');
    
    if (slides.length === 0) {
        // No slides to show (no projects match the filter)
        const slideshowContainer = document.querySelector('.project-slides');
        slideshowContainer.innerHTML = '<div class="no-projects">No projects match the selected filter.</div>';
        return;
    }
    
    // Handle wrap-around
    if (n >= slides.length) {
        currentSlideIndex = 0;
    } else if (n < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = n;
    }
    
    // Hide all slides
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide
    slides[currentSlideIndex].style.display = 'block';
    
    // Highlight current dot
    dots[currentSlideIndex].classList.add('active');
    
    // Update dot display
    updateDotDisplay();
}

function navigateProjectSlide(direction) {
    showProjectSlide(currentSlideIndex + direction);
}