import { createElement } from './ui.js';
import { showNotification } from './utils.js';
import { challenges } from './challenges.js';

const dashboardPage = document.getElementById('dashboard-page');

/**
 * Set up dashboard functionality
 */
export function setupDashboard() {
  // Create dashboard structure
  createDashboardStructure();
}

/**
 * Creates the basic structure of the dashboard
 */
function createDashboardStructure() {
  if (!dashboardPage) return;
  
  // Clear existing content
  dashboardPage.innerHTML = '';
  
  // Create a container
  const container = createElement('div', { className: 'container' });
  
  // Create dashboard header
  const dashboardHeader = createElement('div', { className: 'dashboard-header' });
  
  // Team info will be populated dynamically
  const teamInfo = createElement('div', { className: 'team-info' });
  teamInfo.innerHTML = `
    <div class="team-name">Team: <span id="team-name-display"></span></div>
    <div class="score-display">Score: <span id="team-score-display">0</span> pts</div>
  `;
  
  // Logout button
  const logoutBtn = createElement('button', { 
    id: 'logout-btn', 
    className: 'logout-btn' 
  }, '[LOGOUT]');
  
  dashboardHeader.appendChild(teamInfo);
  dashboardHeader.appendChild(logoutBtn);
  
  // Create tabs for difficulty levels
  const tabs = createElement('div', { className: 'tabs' });
  
  const easyTab = createElement('button', { 
    className: 'tab active', 
    dataset: { tab: 'easy' } 
  }, 'EASY');
  
  const mediumTab = createElement('button', { 
    className: 'tab', 
    dataset: { tab: 'medium' } 
  }, 'MEDIUM');
  
  const hardTab = createElement('button', { 
    className: 'tab', 
    dataset: { tab: 'hard' } 
  }, 'HARD');
  
  tabs.appendChild(easyTab);
  tabs.appendChild(mediumTab);
  tabs.appendChild(hardTab);
  
  // Create content containers for each tab
  const tabContents = createElement('div', { className: 'tab-contents' });
  
  const easyContent = createElement('div', { 
    className: 'tab-content active', 
    id: 'easy-tab-content' 
  });
  
  const mediumContent = createElement('div', { 
    className: 'tab-content', 
    id: 'medium-tab-content' 
  });
  
  const hardContent = createElement('div', { 
    className: 'tab-content', 
    id: 'hard-tab-content' 
  });
  
  // Create the grid containers for challenges
  easyContent.appendChild(createElement('div', { 
    className: 'challenges-grid', 
    id: 'easy-challenges' 
  }));
  
  mediumContent.appendChild(createElement('div', { 
    className: 'challenges-grid', 
    id: 'medium-challenges' 
  }));
  
  hardContent.appendChild(createElement('div', { 
    className: 'challenges-grid', 
    id: 'hard-challenges' 
  }));
  
  tabContents.appendChild(easyContent);
  tabContents.appendChild(mediumContent);
  tabContents.appendChild(hardContent);
  
  // Add tab switching functionality
  tabs.addEventListener('click', function(e) {
    if (e.target.classList.contains('tab')) {
      // Remove active class from all tabs
      const allTabs = tabs.querySelectorAll('.tab');
      allTabs.forEach(tab => tab.classList.remove('active'));
      
      // Add active class to clicked tab
      e.target.classList.add('active');
      
      // Hide all tab contents
      const allContents = tabContents.querySelectorAll('.tab-content');
      allContents.forEach(content => content.classList.remove('active'));
      
      // Show the corresponding content
      const tabName = e.target.dataset.tab;
      const content = document.getElementById(`${tabName}-tab-content`);
      if (content) content.classList.add('active');
    }
  });
  
  // Add everything to the container
  container.appendChild(dashboardHeader);
  container.appendChild(tabs);
  container.appendChild(tabContents);
  
  // Add the container to the page
  dashboardPage.appendChild(container);
  
  // Add CSS for dashboard
  if (!document.querySelector('link[href="css/dashboard.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/dashboard.css';
    document.head.appendChild(link);
  }
}

/**
 * Render the dashboard with user data
 * @param {Object} user - Current user data
 */
export function renderDashboard(user) {
  if (!dashboardPage) return;
  
  // Update team name and score
  const teamNameDisplay = document.getElementById('team-name-display');
  const teamScoreDisplay = document.getElementById('team-score-display');
  
  if (teamNameDisplay) teamNameDisplay.textContent = user.teamName;
  if (teamScoreDisplay) teamScoreDisplay.textContent = user.score || 0;
  
  // Render challenges
  renderChallenges(user);
}

/**
 * Render the challenges in their respective difficulty tabs
 * @param {Object} user - Current user data
 */
function renderChallenges(user) {
  // Render each difficulty level
  renderDifficultyChallenges('easy', user);
  renderDifficultyChallenges('medium', user);
  renderDifficultyChallenges('hard', user);
}

/**
 * Render challenges for a specific difficulty level
 * @param {string} difficulty - Difficulty level (easy, medium, hard)
 * @param {Object} user - Current user data
 */
function renderDifficultyChallenges(difficulty, user) {
  const container = document.getElementById(`${difficulty}-challenges`);
  if (!container) return;
  
  // Clear existing challenges
  container.innerHTML = '';
  
  // Filter challenges by difficulty
  const difficultyChallenges = challenges.filter(c => c.difficulty === difficulty);
  
  // Create a card for each challenge
  difficultyChallenges.forEach(challenge => {
    // Check if the challenge is solved by this user
    const isSolved = user.solvedChallenges && user.solvedChallenges.includes(challenge.id);
    
    // Create the challenge card
    const card = createElement('div', { 
      className: `challenge-card ${isSolved ? 'solved' : ''}`,
      dataset: { id: challenge.id }
    });
    
    // Challenge header with title and category
    const header = createElement('div', { className: 'challenge-header' });
    
    const title = createElement('h3', { className: 'challenge-title' }, challenge.title);
    
    const category = createElement('span', { 
      className: `challenge-category ${challenge.category.toLowerCase()}`
    }, challenge.category);
    
    header.appendChild(title);
    header.appendChild(category);
    
    // Points display
    const points = createElement('div', { className: 'challenge-points' }, 
      `${challenge.points} pts`
    );
    
    // Challenge description
    const description = createElement('div', { className: 'challenge-description' }, 
      challenge.description
    );
    
    // Hint button and hint content
    const hintToggle = createElement('button', { 
      className: 'challenge-hint-toggle',
      type: 'button'
    }, 'Show Hint');
    
    const hint = createElement('div', { 
      className: 'challenge-hint',
      id: `hint-${challenge.id}`
    }, challenge.hint);
    
    // Add event listener to toggle hint
    hintToggle.addEventListener('click', () => {
      const hintElement = document.getElementById(`hint-${challenge.id}`);
      if (hintElement) {
        if (hintElement.style.display === 'block') {
          hintElement.style.display = 'none';
          hintToggle.textContent = 'Show Hint';
        } else {
          hintElement.style.display = 'block';
          hintToggle.textContent = 'Hide Hint';
        }
      }
    });
    
    // Flag submission form
    const form = createElement('form', { 
      className: 'challenge-form',
      dataset: { id: challenge.id }
    });
    
    const input = createElement('input', { 
      className: 'challenge-input',
      type: 'text',
      placeholder: 'Enter flag',
      disabled: isSolved
    });
    
    const submitBtn = createElement('button', { 
      className: 'challenge-submit',
      type: 'submit',
      disabled: isSolved
    }, 'Submit');
    
    form.appendChild(input);
    form.appendChild(submitBtn);
    
    // Add submit handler to the form
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get the flag from the input
      const flagInput = this.querySelector('input').value.trim();
      
      // Get the challenge ID from the form's data attribute
      const challengeId = this.dataset.id;
      
      // Submit the flag
      submitFlag(challengeId, flagInput, user);
    });
    
    // Assemble the card
    card.appendChild(header);
    card.appendChild(points);
    card.appendChild(description);
    card.appendChild(hintToggle);
    card.appendChild(hint);
    
    // Only add form if not solved
    if (!isSolved) {
      card.appendChild(form);
    } else {
      // Add a "Solved" message for completed challenges
      const solvedMsg = createElement('div', {
        className: 'challenge-solved-message'
      }, 'You successfully captured this flag!');
      card.appendChild(solvedMsg);
    }
    
    // Add the card to the container
    container.appendChild(card);
  });
}

/**
 * Submit a flag for a challenge
 * @param {string} challengeId - Challenge ID
 * @param {string} flag - Submitted flag
 * @param {Object} user - Current user
 */
function submitFlag(challengeId, flag, user) {
  // Find the challenge
  const challenge = challenges.find(c => c.id === challengeId);
  
  if (!challenge) {
    showNotification('Challenge not found.', 'error');
    return;
  }
  
  // Check if the flag is correct
  if (flag.toLowerCase() === challenge.flag.toLowerCase()) {
    // Update user's score and solved challenges
    user.score = (user.score || 0) + challenge.points;
    user.solvedChallenges = user.solvedChallenges || [];
    
    // Check if challenge is already solved to avoid duplicate points
    if (!user.solvedChallenges.includes(challengeId)) {
      user.solvedChallenges.push(challengeId);
      
      // Update the user in localStorage
      updateUserData(user);
      
      // Update the UI
      document.getElementById('team-score-display').textContent = user.score;
      
      // Mark the challenge as solved
      const challengeCard = document.querySelector(`.challenge-card[data-id="${challengeId}"]`);
      if (challengeCard) {
        challengeCard.classList.add('solved');
        
        // Disable the form inputs
        const form = challengeCard.querySelector('form');
        if (form) {
          const input = form.querySelector('input');
          const button = form.querySelector('button');
          
          if (input) input.disabled = true;
          if (button) button.disabled = true;
          
          // Add solved message
          const solvedMsg = createElement('div', {
            className: 'challenge-solved-message'
          }, 'You successfully captured this flag!');
          
          // Replace form with solved message
          form.replaceWith(solvedMsg);
        }
      }
      
      showNotification(`Correct! You earned ${challenge.points} points.`, 'success');
    } else {
      showNotification('You\'ve already solved this challenge.', 'warning');
    }
  } else {
    showNotification('Incorrect flag. Try again.', 'error');
  }
}

/**
 * Update the user data in localStorage
 * @param {Object} user - Updated user data
 */
function updateUserData(user) {
  // Update current_user
  localStorage.setItem('ctf_current_user', JSON.stringify(user));
  
  // Also update the user in the teams array
  const teams = JSON.parse(localStorage.getItem('ctf_teams') || '[]');
  const teamIndex = teams.findIndex(t => t.teamName === user.teamName);
  
  if (teamIndex !== -1) {
    teams[teamIndex] = user;
    localStorage.setItem('ctf_teams', JSON.stringify(teams));
  }
}