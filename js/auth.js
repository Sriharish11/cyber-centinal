import { switchPage } from './ui.js';
import { showNotification } from './utils.js';
import { renderDashboard } from './dashboard.js';

/**
 * Set up authentication functionality
 */
export function setupAuth() {
  // Set up login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Set up register form
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
  
  // Set up logout functionality
  document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'logout-btn') {
      handleLogout();
    }
  });
}

/**
 * Handle login form submission
 * @param {Event} e - Submit event
 */
function handleLogin(e) {
  e.preventDefault();
  
  const teamName = document.getElementById('login-team').value.trim();
  const password = document.getElementById('login-password').value;
  
  if (!teamName || !password) {
    showNotification('Please enter both team name and password.', 'error');
    return;
  }
  
  // Check if team exists in localStorage
  const teams = JSON.parse(localStorage.getItem('ctf_teams') || '[]');
  const team = teams.find(t => t.teamName.toLowerCase() === teamName.toLowerCase());
  
  if (!team) {
    showNotification('Team not found.', 'error');
    return;
  }
  
  if (team.password !== password) {
    showNotification('Incorrect password.', 'error');
    return;
  }
  
  // Login successful
  loginUser(team);
}

/**
 * Handle registration form submission
 * @param {Event} e - Submit event
 */
function handleRegister(e) {
  e.preventDefault();
  
  const teamName = document.getElementById('register-team').value.trim();
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;
  
  if (!teamName || !password) {
    showNotification('Please fill in all fields.', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showNotification('Passwords do not match.', 'error');
    return;
  }
  
  // Check if team name already exists
  const teams = JSON.parse(localStorage.getItem('ctf_teams') || '[]');
  if (teams.some(t => t.teamName.toLowerCase() === teamName.toLowerCase())) {
    showNotification('Team name already taken.', 'error');
    return;
  }
  
  // Create new team
  const newTeam = {
    teamName,
    password,
    score: 0,
    solvedChallenges: [],
    registeredAt: new Date().toISOString()
  };
  
  // Save team to localStorage
  teams.push(newTeam);
  localStorage.setItem('ctf_teams', JSON.stringify(teams));
  
  // Log in the new user
  loginUser(newTeam);
  
  showNotification('Team registered successfully!', 'success');
}

/**
 * Log in a user and redirect to dashboard
 * @param {Object} team - Team object
 */
function loginUser(team) {
  // Store current user in localStorage
  localStorage.setItem('ctf_current_user', JSON.stringify(team));
  
  // Redirect to dashboard
  switchPage(
    document.querySelector('.page.active').id,
    'dashboard-page'
  );
  
  // Render dashboard with user data
  renderDashboard(team);
  
  showNotification(`Welcome, ${team.teamName}!`, 'success');
}

/**
 * Handle user logout
 */
function handleLogout() {
  // Remove current user from localStorage
  localStorage.removeItem('ctf_current_user');
  
  // Redirect to landing page
  switchPage('dashboard-page', 'landing-page');
  
  showNotification('You have been logged out.', 'success');
}