// Project Drawer Manager
class ProjectDrawer {
  constructor() {
    this.isOpen = false;
    this.currentProjectId = null;
    this.currentImageIndex = 1;
    this.projectData = {};
    
    this.drawer = document.querySelector('.project-drawer');
    this.overlay = document.querySelector('.drawer-overlay');
    this.closeButton = document.querySelector('.drawer-close');
    this.title = document.getElementById('drawer-title');
    this.subtitle = document.getElementById('drawer-subtitle');
    this.image = document.getElementById('drawer-image');
    this.prevButton = document.getElementById('drawer-prev');
    this.nextButton = document.getElementById('drawer-next');
    this.dotsContainer = document.getElementById('drawer-dots');
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.setupProjectData();
  }
  
  setupEventListeners() {
    // Close drawer
    this.closeButton.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());
    
    // Navigation
    this.prevButton.addEventListener('click', () => this.previousImage());
    this.nextButton.addEventListener('click', () => this.nextImage());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      
      switch(e.key) {
        case 'Escape':
          this.close();
          break;
        case 'ArrowLeft':
          this.previousImage();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
      }
    });
  }
  
  setupProjectData() {
    // Get project data from HTML
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
      const projectId = parseInt(project.getAttribute('data-project'));
      const header = project.querySelector('.project-header');
      const title = header.querySelector('h2').textContent;
      const subtitle = header.querySelector('h3').textContent;
      const mediaElements = project.querySelectorAll('.project-media');
      
      this.projectData[projectId] = {
        title,
        subtitle,
        media: Array.from(mediaElements).map(media => ({
          src: media.src || media.querySelector('source')?.src,
          type: media.tagName.toLowerCase(),
          alt: media.alt
        }))
      };
      
      // Add click listener to project
      project.addEventListener('click', () => this.openProject(projectId));
    });
  }
  
  openProject(projectId) {
    if (!this.projectData[projectId]) return;
    
    this.currentProjectId = projectId;
    this.currentImageIndex = 1;
    
    const project = this.projectData[projectId];
    this.title.textContent = project.title;
    this.subtitle.textContent = project.subtitle;
    
    this.updateImage();
    this.updateDots();
    this.updateNavigation();
    
    this.drawer.classList.add('open');
    this.overlay.classList.add('visible');
    this.isOpen = true;
    
    // Pause all videos in other projects
    this.pauseAllVideos();
  }
  
  close() {
    this.drawer.classList.remove('open');
    this.overlay.classList.remove('visible');
    this.isOpen = false;
    this.currentProjectId = null;
    
    // Resume videos in current project
    this.resumeCurrentProjectVideos();
  }
  
  updateImage() {
    if (!this.currentProjectId) return;
    
    const project = this.projectData[this.currentProjectId];
    const media = project.media[this.currentImageIndex - 1];
    
    if (!media) return;
    
    if (media.type === 'video') {
      // Replace img with video
      this.image.style.display = 'none';
      if (!this.videoElement) {
        this.videoElement = document.createElement('video');
        this.videoElement.autoplay = true;
        this.videoElement.muted = true;
        this.videoElement.loop = true;
        this.videoElement.playsInline = true;
        this.videoElement.style.position = 'absolute';
        this.videoElement.style.top = '0';
        this.videoElement.style.left = '0';
        this.videoElement.style.width = '100%';
        this.videoElement.style.height = '100%';
        this.videoElement.style.objectFit = 'cover';
        this.image.parentNode.appendChild(this.videoElement);
      }
      this.videoElement.src = media.src;
      this.videoElement.style.display = 'block';
    } else {
      // Show image
      if (this.videoElement) {
        this.videoElement.style.display = 'none';
      }
      this.image.src = media.src;
      this.image.alt = media.alt;
      this.image.style.display = 'block';
    }
  }
  
  updateDots() {
    if (!this.currentProjectId) return;
    
    const project = this.projectData[this.currentProjectId];
    this.dotsContainer.innerHTML = '';
    
    project.media.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = `drawer-dot ${index + 1 === this.currentImageIndex ? 'active' : ''}`;
      dot.addEventListener('click', () => this.goToImage(index + 1));
      this.dotsContainer.appendChild(dot);
    });
  }
  
  updateNavigation() {
    if (!this.currentProjectId) return;
    
    const project = this.projectData[this.currentProjectId];
    const totalImages = project.media.length;
    
    this.prevButton.disabled = this.currentImageIndex <= 1;
    this.nextButton.disabled = this.currentImageIndex >= totalImages;
  }
  
  previousImage() {
    if (this.currentImageIndex > 1) {
      this.currentImageIndex--;
      this.updateImage();
      this.updateDots();
      this.updateNavigation();
    }
  }
  
  nextImage() {
    if (!this.currentProjectId) return;
    
    const project = this.projectData[this.currentProjectId];
    if (this.currentImageIndex < project.media.length) {
      this.currentImageIndex++;
      this.updateImage();
      this.updateDots();
      this.updateNavigation();
    }
  }
  
  goToImage(imageIndex) {
    this.currentImageIndex = imageIndex;
    this.updateImage();
    this.updateDots();
    this.updateNavigation();
  }
  
  pauseAllVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => video.pause());
  }
  
  resumeCurrentProjectVideos() {
    if (!this.currentProjectId) return;
    
    const projectElement = document.querySelector(`[data-project="${this.currentProjectId}"]`);
    if (projectElement) {
      const activeMedia = projectElement.querySelector('.project-media.active');
      if (activeMedia && activeMedia.tagName === 'VIDEO') {
        activeMedia.play();
      }
    }
  }
}

// Initialize drawer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProjectDrawer();
});

