/* ===============================================
   STUDYHUB AI - DATA LOADER
   =============================================== */

// Load JSON files asynchronously
async function loadJSON(file) {
  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Failed to load ${file}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
    return null;
  }
}

// Storage helper functions
function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to localStorage:`, error);
  }
}

function getData(key, defaultValue = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error reading data from localStorage:`, error);
    return defaultValue;
  }
}

function removeData(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data from localStorage:`, error);
  }
}

function clearAllData() {
  try {
    localStorage.clear();
  } catch (error) {
    console.error(`Error clearing localStorage:`, error);
  }
}

// Timestamp helper
function getCurrentTimestamp() {
  return new Date().toISOString();
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Generate unique ID
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Debounce function for search
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `alert alert-${type}`;
  notification.textContent = message;

  const container = document.body;
  container.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Check if user is logged in
function isLoggedIn() {
  const user = getData('studyhubUser');
  return user && user.id;
}

// Get current user
function getCurrentUser() {
  return getData('studyhubUser', null);
}

// Logout user
function logoutUser() {
  removeData('studyhubUser');
}

// Redirect to login if not authenticated
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = '/login.html';
  }
}

// Initialize theme
function initializeTheme() {
  const savedTheme = getData('studyhubTheme', 'light');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
  }
}

// Toggle theme
function toggleTheme() {
  const isDarkMode = document.documentElement.classList.toggle('dark-mode');
  const theme = isDarkMode ? 'dark' : 'light';
  saveData('studyhubTheme', theme);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
});
