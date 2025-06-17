// DOM Elements
const morphButton = document.getElementById('morphButton');
const buttonContent = morphButton.querySelector('.button-content');
const modal = document.getElementById('morphModal');
const closeBtn = document.querySelector('.fixed-close-btn');
const overlay = document.getElementById('overlay');

// Create morph container element
function createMorphBox() {
  const morph = document.createElement('div');
  morph.classList.add('morph-container');
  morph.style.zIndex = '1100';
  document.body.appendChild(morph);
  return morph;
}

// Get button position and dimensions
function getButtonRect() {
  return morphButton.getBoundingClientRect();
}

// Get modal position and dimensions
function getModalRect() {
  return modal.getBoundingClientRect();
}

// Morph button to modal animation
function morphButtonToModal() {
  // Hide button
  morphButton.style.opacity = '0';
  morphButton.style.pointerEvents = 'none';
  
  // Create morph element
  const morph = createMorphBox();
  const btnRect = getButtonRect();
  
  // Set initial morph state (matches button)
  Object.assign(morph.style, {
    top: `${btnRect.top}px`,
    left: `${btnRect.left}px`,
    width: `${btnRect.width}px`,
    height: `${btnRect.height}px`,
    borderRadius: '50px',
    background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
    transform: 'scale(1)',
    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    opacity: '1',
    zIndex: '1200'
  });
  
  // Force reflow
  setTimeout(() => {
    // Calculate modal dimensions
    const modalRect = getModalRect();
    
    // Morph to modal dimensions
    Object.assign(morph.style, {
      top: `${modalRect.top}px`,
      left: `${modalRect.left}px`,
      width: `${modalRect.width}px`,
      height: `${modalRect.height}px`,
      borderRadius: '20px',
      background: '#1a1a2e',
      boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
      transform: 'scale(1)'
    });
    
    // Show overlay
    overlay.classList.add('active');
    
    // After animation completes
    setTimeout(() => {
      // Show actual modal
      modal.classList.add('visible');
      
      // Remove morph element
      setTimeout(() => {
        morph.remove();
      }, 50);
    }, 550);
  }, 10);
}

// Morph modal to button animation
function morphModalToButton() {
  // Hide modal
  modal.classList.remove('visible');
  
  // Create morph element
  const morph = createMorphBox();
  const modalRect = modal.getBoundingClientRect();
  const btnRect = getButtonRect();
  
  // Set initial morph state (matches modal)
  Object.assign(morph.style, {
    top: `${modalRect.top}px`,
    left: `${modalRect.left}px`,
    width: `${modalRect.width}px`,
    height: `${modalRect.height}px`,
    borderRadius: '20px',
    background: '#1a1a2e',
    boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
    transform: 'scale(1)',
    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    opacity: '1',
    zIndex: '1200'
  });
  
  // Hide overlay
  overlay.classList.remove('active');
  
  // Force reflow
  setTimeout(() => {
    // Morph back to button dimensions
    Object.assign(morph.style, {
      top: `${btnRect.top}px`,
      left: `${btnRect.left}px`,
      width: `${btnRect.width}px`,
      height: `${btnRect.height}px`,
      borderRadius: '50px',
      background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
      boxShadow: '0 5px 20px rgba(255, 65, 108, 0.4)'
    });
    
    // After animation completes
    setTimeout(() => {
      // Button becomes visible without text
      buttonContent.style.opacity = '0';
      morphButton.style.opacity = '1';
      morphButton.style.pointerEvents = 'none';
      
      // Remove morph element
      setTimeout(() => {
        morph.remove();
        
        // Show button text
        setTimeout(() => {
          buttonContent.style.opacity = '1';
          morphButton.style.pointerEvents = 'auto';
        }, 100);
      }, 40);
    }, 525);
  }, 40);
}

// Event listeners
morphButton.addEventListener('click', morphButtonToModal);
closeBtn.addEventListener('click', morphModalToButton);
overlay.addEventListener('click', morphModalToButton);