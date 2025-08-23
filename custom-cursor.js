// Custom Cursor Manager
class CustomCursor {
  constructor() {
    this.isMobile = window.innerWidth <= 768;
    this.isVisible = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    this.cursorLargeX = 0;
    this.cursorLargeY = 0;
    
    this.cursorContainer = null;
    this.cursor = null;
    this.cursorLarge = null;
    this.cursorArrowLeft = null;
    this.cursorArrowRight = null;
    
    this.currentProjectId = null;
    this.hoveredImageContainer = null;
    this.isHoveringImage = false;
    
    this.init();
  }
  
  init() {
    if (this.isMobile) return;
    
    this.cursorContainer = document.querySelector('.custom-cursor-container');
    this.cursor = document.querySelector('.custom-cursor');
    this.cursorLarge = document.querySelector('.custom-cursor-large');
    this.cursorArrowLeft = document.querySelector('.custom-cursor-arrow-left');
    this.cursorArrowRight = document.querySelector('.custom-cursor-arrow-right');
    
    if (!this.cursorContainer || !this.cursor || !this.cursorLarge) {
      console.warn('Custom cursor elements not found');
      return;
    }
    
    this.setupEventListeners();
    this.show();
    this.animate();
  }
  
  setupEventListeners() {
    // Mouse movement
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      
      if (!this.isVisible) {
        this.show();
      }
    });
    
    // Mouse enter/leave window
    document.addEventListener('mouseenter', () => this.show());
    document.addEventListener('mouseleave', () => this.hide());
    
    // Image container hover events
    this.setupImageContainerHovers();
  }
  
  setupImageContainerHovers() {
    const imageContainers = document.querySelectorAll('.image-container');
    
    imageContainers.forEach(container => {
      const projectId = container.closest('.project').getAttribute('data-project');
      
      container.addEventListener('mouseenter', (e) => {
        this.hoveredImageContainer = container;
        this.currentProjectId = projectId;
        this.isHoveringImage = true;
        this.updateCursorStyle(e);
        this.hideIdleCursor();
      });
      
      container.addEventListener('mousemove', (e) => {
        if (this.hoveredImageContainer === container) {
          this.updateCursorStyle(e);
        }
      });
      
      container.addEventListener('mouseleave', () => {
        this.hoveredImageContainer = null;
        this.currentProjectId = null;
        this.isHoveringImage = false;
        this.resetCursorStyle();
        this.showIdleCursor();
      });
      
      // Add click events for navigation
      container.addEventListener('click', (e) => {
        this.handleImageClick(e, projectId);
      });
    });
  }
  
  handleImageClick(e, projectId) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const clickX = e.clientX;
    
    if (clickX < centerX) {
      // Clicked left half - go to previous image
      this.navigateToPrevious(projectId);
    } else {
      // Clicked right half - go to next image
      this.navigateToNext(projectId);
    }
  }
  
  navigateToPrevious(projectId) {
    if (typeof previousImage === 'function') {
      previousImage(parseInt(projectId));
    }
  }
  
  navigateToNext(projectId) {
    if (typeof nextImage === 'function') {
      nextImage(parseInt(projectId));
    }
  }
  
  updateCursorStyle(e) {
    if (!this.hoveredImageContainer) return;
    
    const rect = this.hoveredImageContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const mouseX = e.clientX;
    
    // Determine which half of the image the mouse is on
    if (mouseX < centerX) {
      // Left half - show left arrow
      this.showLeftArrow();
    } else {
      // Right half - show right arrow
      this.showRightArrow();
    }
  }
  
  showLeftArrow() {
    if (this.cursorArrowLeft && this.cursorArrowRight) {
      this.cursorArrowLeft.style.opacity = '1';
      this.cursorArrowRight.style.opacity = '0';
    }
  }
  
  showRightArrow() {
    if (this.cursorArrowLeft && this.cursorArrowRight) {
      this.cursorArrowLeft.style.opacity = '0';
      this.cursorArrowRight.style.opacity = '1';
    }
  }
  
  resetCursorStyle() {
    if (this.cursorArrowLeft && this.cursorArrowRight) {
      this.cursorArrowLeft.style.opacity = '0';
      this.cursorArrowRight.style.opacity = '0';
    }
  }
  
  hideIdleCursor() {
    if (this.cursor) this.cursor.style.opacity = '0';
    if (this.cursorLarge) this.cursorLarge.style.opacity = '0';
  }
  
  showIdleCursor() {
    if (this.cursor) this.cursor.style.opacity = '1';
    if (this.cursorLarge) this.cursorLarge.style.opacity = '1';
  }
  
  show() {
    if (this.cursorContainer) {
      this.cursorContainer.style.display = 'block';
      this.isVisible = true;
    }
  }
  
  hide() {
    if (this.cursorContainer) {
      this.cursorContainer.style.display = 'none';
      this.isVisible = false;
    }
  }
  
  animate() {
    if (!this.isVisible) {
      requestAnimationFrame(() => this.animate());
      return;
    }
    
    // Smooth cursor movement
    const speed = 0.15;
    this.cursorX += (this.mouseX - this.cursorX) * speed;
    this.cursorY += (this.mouseY - this.cursorY) * speed;
    
    // Slightly slower large cursor
    const largeSpeed = speed * 0.6;
    this.cursorLargeX += (this.mouseX - this.cursorLargeX) * largeSpeed;
    this.cursorLargeY += (this.mouseY - this.cursorLargeY) * largeSpeed;
    
    // Update cursor positions
    if (this.cursor) {
      this.cursor.style.left = this.cursorX + 'px';
      this.cursor.style.top = this.cursorY + 'px';
    }
    
    if (this.cursorLarge) {
      this.cursorLarge.style.left = this.cursorLargeX + 'px';
      this.cursorLarge.style.top = this.cursorLargeY + 'px';
    }
    
    // Update arrow positions
    if (this.cursorArrowLeft && this.cursorArrowRight) {
      this.cursorArrowLeft.style.left = this.mouseX + 'px';
      this.cursorArrowLeft.style.top = this.mouseY + 'px';
      this.cursorArrowRight.style.left = this.mouseX + 'px';
      this.cursorArrowRight.style.top = this.mouseY + 'px';
    }
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize custom cursor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CustomCursor();
});
