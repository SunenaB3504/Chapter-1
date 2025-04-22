/**
 * app.js - Main application entry point
 * Coordinates between modules and initializes the application
 */

import DataManager from './data.js';
import UIManager from './ui.js';
import GameLoader from './gameLoader.js';
import Games from './games.js';

const App = {
    /**
     * Initialize the application
     */    init: function() {
        // Make Games globally available for event handlers
        window.Games = Games;
        
        // Add global styles for consistent image sizing
        this.addGlobalStyles();
        
        // Initialize UI
        UIManager.updateUserProfile();
        UIManager.renderModules();
        UIManager.initEventListeners();
    },
    
    /**
     * Add global styles to ensure consistent image sizing throughout the app
     */
    addGlobalStyles: function() {
        const globalStyle = document.createElement('style');
        globalStyle.textContent = `
            /* Consistent image sizing for all example images */
            .example-image {
                width: 150px;
                height: 100px;
                object-fit: cover;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            
            /* Car images in Lakh Attack game */
            .car-image {
                width: 200px;
                height: 120px;
                object-fit: contain;
                border-radius: 8px;
            }
            
            /* India rivers map */
            img[alt="Map of India with Rivers"] {
                width: 600px;
                max-width: 100%;
                height: auto;
            }
        `;
        document.head.appendChild(globalStyle);
    }
};

// Start the app when page loads
window.addEventListener('DOMContentLoaded', () => App.init());

export default App;
