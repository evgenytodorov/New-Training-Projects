import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import isGuest from '@salesforce/user/isGuest';

export default class Navigation extends NavigationMixin(LightningElement) {
  isGuest = false; // Update this based on your logic
  isLoggedIn = !isGuest;

  navigateToHome(event) {
    event.preventDefault();
    this[NavigationMixin.Navigate]({
      type: 'standard__namedPage',
      attributes: {
        pageName: 'home'
      }
    });
  }

  navigateToTourSignUp(event) {
    event.preventDefault();
    this[NavigationMixin.Navigate]({
      type: 'standard__namedPage',
      attributes: {
        pageName: 'tour'
      }
    });
  }

  navigateToSignUp(event) {
    event.preventDefault();
    this[NavigationMixin.Navigate]({
      type: 'standard__namedPage',
      attributes: {
        pageName: 'signup'
      }
    });
  }

  navigateToLogin(event) {
    event.preventDefault();
    this[NavigationMixin.Navigate]({
      type: 'standard__namedPage',
      attributes: {
        pageName: 'login'
      }
    });
  }

  handleLogout(event) {
    event.preventDefault();
    // Implement logout logic here, such as redirecting to a logout URL
    window.location.href = '/secur/logout.jsp';
  }
}