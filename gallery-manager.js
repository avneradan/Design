// Gallery Manager - Handles project image navigation
// Each project has 5 images that can be navigated through

// Store current image index for each project
const projectStates = {};

// Drag state for each project
const dragStates = {};

// Initialize all projects
function initializeProjects() {
  for (let i = 1; i <= 12; i++) {
    projectStates[i] = 1; // Start with first image
    dragStates[i] = {
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      threshold: 50 // Minimum drag distance to trigger slide
    };
  }
  
  // Add drag event listeners to all projects
  setupDragListeners();
}

// Setup drag event listeners for all projects
function setupDragListeners() {
  const projects = document.querySelectorAll('.project');
  
  projects.forEach(project => {
    const projectId = parseInt(project.getAttribute('data-project'));
    const imageContainer = project.querySelector('.image-container');
    
    if (!imageContainer) return;
    
    // Mouse events
    imageContainer.addEventListener('mousedown', (e) => startDrag(e, projectId, 'mouse'));
    document.addEventListener('mousemove', (e) => drag(e, projectId, 'mouse'));
    document.addEventListener('mouseup', (e) => endDrag(e, projectId, 'mouse'));
    
    // Touch events
    imageContainer.addEventListener('touchstart', (e) => startDrag(e, projectId, 'touch'));
    document.addEventListener('touchmove', (e) => drag(e, projectId, 'touch'));
    document.addEventListener('touchend', (e) => endDrag(e, projectId, 'touch'));
    
    // Prevent default touch behavior to avoid scrolling
    imageContainer.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
  });
}

// Start drag operation
function startDrag(e, projectId, type) {
  const dragState = dragStates[projectId];
  const coords = type === 'touch' ? e.touches[0] : e;
  
  dragState.isDragging = true;
  dragState.startX = coords.clientX;
  dragState.startY = coords.clientY;
  dragState.currentX = coords.clientX;
  dragState.currentY = coords.clientY;
  
  // Add dragging class for visual feedback
  const project = document.querySelector(`[data-project="${projectId}"]`);
  if (project) {
    project.classList.add('dragging');
  }
}

// Handle drag movement
function drag(e, projectId, type) {
  const dragState = dragStates[projectId];
  if (!dragState.isDragging) return;
  
  const coords = type === 'touch' ? e.touches[0] : e;
  dragState.currentX = coords.clientX;
  dragState.currentY = coords.clientY;
  
  // Prevent default to avoid text selection
  e.preventDefault();
}

// End drag operation
function endDrag(e, projectId, type) {
  const dragState = dragStates[projectId];
  if (!dragState.isDragging) return;
  
  const coords = type === 'touch' ? (e.changedTouches[0] || e.touches[0]) : e;
  dragState.currentX = coords.clientX;
  dragState.currentY = coords.clientY;
  
  // Calculate drag distance and direction
  const deltaX = dragState.currentX - dragState.startX;
  const deltaY = dragState.currentY - dragState.startY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  // Only trigger slide if drag distance exceeds threshold and is more horizontal than vertical
  if (distance > dragState.threshold && Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      // Dragged right - go to previous image
      previousImage(projectId);
    } else {
      // Dragged left - go to next image
      nextImage(projectId);
    }
  }
  
  // Reset drag state
  dragState.isDragging = false;
  
  // Remove dragging class
  const project = document.querySelector(`[data-project="${projectId}"]`);
  if (project) {
    project.classList.remove('dragging');
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
