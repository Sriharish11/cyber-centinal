/**
 * UI initialization and navigation functions
 */
export function initUI() {
  // Set up navigation between pages
  setupNavigation();
  
  // Initialize the cursor blinking effect
  blinkCursor();
}

function setupNavigation() {
  // Login button
  document.getElementById('login-btn')?.addEventListener('click', () => {
    switchPage('landing-page', 'login-page');
  });
  
  // Register button
  document.getElementById('register-btn')?.addEventListener('click', () => {
    switchPage('landing-page', 'register-page');
  });
  
  // Back buttons
  document.getElementById('back-to-landing')?.addEventListener('click', () => {
    switchPage('login-page', 'landing-page');
  });
  
  document.getElementById('back-from-register')?.addEventListener('click', () => {
    switchPage('register-page', 'landing-page');
  });
}

export function switchPage(fromPageId, toPageId) {
  const fromPage = document.getElementById(fromPageId);
  const toPage = document.getElementById(toPageId);
  
  if (fromPage && toPage) {
    fromPage.classList.remove('active');
    toPage.classList.add('active');
  }
}

function blinkCursor() {
  // The cursor blinking is handled by CSS
  // This function is a placeholder for potential future enhancements
}

/**
 * Creates and returns a DOM element with the given properties
 * @param {string} tagName - HTML tag name
 * @param {object} attributes - Element attributes
 * @param {string} textContent - Text content for the element
 * @param {array} children - Child elements
 * @returns {HTMLElement}
 */
export function createElement(tagName, attributes = {}, textContent = '', children = []) {
  const element = document.createElement(tagName);
  
  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'dataset') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else {
      element.setAttribute(key, value);
    }
  });
  
  // Set text content if provided
  if (textContent) {
    element.textContent = textContent;
  }
  
  // Append children if any
  children.forEach(child => {
    element.appendChild(child);
  });
  
  return element;
}