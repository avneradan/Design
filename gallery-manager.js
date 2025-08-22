// Gallery Manager - Handles project image navigation
// Each project has 5 images that can be navigated through

// Store current image index for each project
const projectStates = {};

// Initialize all projects
function initializeProjects() {
  for (let i = 1; i <= 12; i++) {
    projectStates[i] = 1; // Start with first image
  }
}

// Navigate to next image in a project
function nextImage(projectId) {
  const currentIndex = projectStates[projectId];
  const nextIndex = currentIndex === 5 ? 1 : currentIndex + 1;
  goToImage(projectId, nextIndex);
}

// Navigate to previous image in a project
function previousImage(projectId) {
  const currentIndex = projectStates[projectId];
  const prevIndex = currentIndex === 1 ? 5 : currentIndex - 1;
  goToImage(projectId, prevIndex);
}

// Go to specific image in a project
function goToImage(projectId, imageIndex) {
  // Update state
  projectStates[projectId] = imageIndex;
  
  // Get project elements
  const project = document.querySelector(`[data-project="${projectId}"]`);
  if (!project) return;
  
  // Update media (images and videos)
  const mediaElements = project.querySelectorAll('.project-media');
  mediaElements.forEach((media, index) => {
    if (index + 1 === imageIndex) {
      media.classList.add('active');
      // If it's a video, play it
      if (media.tagName === 'VIDEO') {
        media.play();
      }
    } else {
      media.classList.remove('active');
      // If it's a video, pause it
      if (media.tagName === 'VIDEO') {
        media.pause();
        media.currentTime = 0;
      }
    }
  });
  
  // Update dots
  const dots = project.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index + 1 === imageIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Only handle if no input is focused
  if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
    return;
  }
  
  // Find which project is currently in view (simplified - assumes first visible project)
  const visibleProject = document.querySelector('.project');
  if (!visibleProject) return;
  
  const projectId = parseInt(visibleProject.getAttribute('data-project'));
  
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      previousImage(projectId);
      break;
    case 'ArrowRight':
      e.preventDefault();
      nextImage(projectId);
      break;
  }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjects);
