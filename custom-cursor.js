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
    
    this.init();
  }
  
  init() {
    if (this.isMobile) return;
    
    this.cursorContainer = document.querySelector('.custom-cursor-container');
    this.cursor = document.querySelector('.custom-cursor');
    this.cursorLarge = document.querySelector('.custom-cursor-large');
    
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
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize custom cursor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CustomCursor();
});
