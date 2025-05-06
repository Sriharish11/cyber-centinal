/**
 * Countdown timer functionality
 * @param {Date} targetDate - The date to count down to
 */
export function startCountdown(targetDate) {
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  
  function updateCountdown() {
    const currentDate = new Date();
    const timeRemaining = targetDate - currentDate;
    
    if (timeRemaining <= 0) {
      // CTF has started
      clearInterval(countdownInterval);
      
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      
      // Show a notification or update the UI to indicate CTF has started
      const countdownHeader = document.querySelector('.countdown-header');
      if (countdownHeader) {
        countdownHeader.textContent = 'CTF IS LIVE NOW!';
        countdownHeader.style.color = 'var(--success-color)';
        countdownHeader.classList.add('text-glitch');
      }
      
      return;
    }
    
    // Calculate remaining time
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Update the countdown elements
    daysElement.textContent = formatTime(days);
    hoursElement.textContent = formatTime(hours);
    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);
  }
  
  // Format time to always have 2 digits
  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }
  
  // Initial call to display countdown immediately
  updateCountdown();
  
  // Update the countdown every second
  const countdownInterval = setInterval(updateCountdown, 1000);
}