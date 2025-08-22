// Main JavaScript - Handles core functionality

// Copy email to clipboard
function copyEmail() {
  const email = 'avner.adan@gmail.com';
  
  // Use modern clipboard API if available
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(() => {
      showCopyFeedback();
    }).catch(err => {
      console.error('Failed to copy: ', err);
      fallbackCopy(email);
    });
  } else {
    // Fallback for older browsers
    fallbackCopy(email);
  }
}

// Fallback copy method
function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    showCopyFeedback();
  } catch (err) {
    console.error('Fallback copy failed: ', err);
  }
  
  document.body.removeChild(textArea);
}

// Show copy feedback
function showCopyFeedback() {
  const contactButton = document.querySelector('.contact-button');
  const originalText = contactButton.innerHTML;
  
  // Change text temporarily
  contactButton.innerHTML = '<span class="email">Copied!</span>';
  contactButton.style.background = '#4CAF50';
  
  // Reset after 2 seconds
  setTimeout(() => {
    contactButton.innerHTML = originalText;
    contactButton.style.background = '';
  }, 2000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio website loaded successfully');
});
