export const router = {
  currentScreen: 'dashboard',

  navigate(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('screen--active');
    });

    // Show selected screen
    const screenElement = document.getElementById(`screen-${screenName}`);
    if (screenElement) {
      screenElement.classList.add('screen--active');
      this.currentScreen = screenName;

      // Update navbar active state
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('nav-item--active');
      });
      document.querySelector(`[data-screen="${screenName}"]`).classList.add('nav-item--active');

      // Scroll to top
      window.scrollTo(0, 0);
    }
  },

  init() {
    // Attach event listeners to navigation buttons
    document.querySelectorAll('.screen-nav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigate(btn.getAttribute('data-screen'));
      });
    });
  }
};
