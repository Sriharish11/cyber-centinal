import { initUI } from './ui.js';
import { startCountdown } from './countdown.js';
import { setupAuth } from './auth.js';
import { setupDashboard } from './dashboard.js';
import { showNotification } from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the UI components
  initUI();
  
  // Start the countdown timer for the CTF event
  const countdownDate = new Date();
  countdownDate.setDate(countdownDate.getDate() + 7); // Example: CTF starts in 7 days
  startCountdown(countdownDate);
  
  // Setup authentication system
  setupAuth();
  
  // Pre-load dashboard content
  setupDashboard();
  
  // Check if user is already logged in and redirect to dashboard
  const currentUser = localStorage.getItem('ctf_current_user');
  if (currentUser) {
    document.getElementById('landing-page').classList.remove('active');
    document.getElementById('dashboard-page').classList.add('active');
    
    // Welcome back notification
    showNotification(`Welcome back, ${JSON.parse(currentUser).teamName}!`, 'success');
  }
});