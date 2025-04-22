/**
 * ui.js - Contains all UI-related functionality
 * Manages rendering and UI interactions
 */

import DataManager from './data.js';
import GameLoader from './gameLoader.js';

const UIManager = {
    /**
     * Render all modules
     */
    renderModules: function() {
        const modulesContainer = document.getElementById('modules-container');
        const modules = DataManager.getModules();
        
        modulesContainer.innerHTML = '';

        modules.forEach(module => {
            const moduleCard = document.createElement('div');
            moduleCard.className = 'module-card';
            
            if (!module.unlocked) {
                moduleCard.innerHTML = `
                    <h3>${module.title}</h3>
                    <p>${module.description}</p>
                    <div class="module-progress">
                        <div class="module-progress-fill" style="width: ${module.progress}%"></div>
                    </div>
                    <div class="module-locked">
                        <i class="fas fa-lock"></i>
                    </div>
                `;
            } else {
                moduleCard.innerHTML = `
                    <h3>${module.title}</h3>
                    <p>${module.description}</p>
                    <div class="module-progress">
                        <div class="module-progress-fill" style="width: ${module.progress}%"></div>
                    </div>
                `;
                moduleCard.addEventListener('click', () => this.loadModule(module));
            }

            modulesContainer.appendChild(moduleCard);
        });
    },
    
    /**
     * Update user profile UI elements
     */
    updateUserProfile: function() {
        const userData = DataManager.getUserData();
        document.getElementById('overall-progress').style.width = userData.progress + '%';
        document.getElementById('user-level').textContent = userData.level;
        document.getElementById('user-stars').textContent = userData.stars;
    },
    
    /**
     * Show level up animation
     */
    showLevelUpAnimation: function() {
        // Add animation for level up
        const levelDisplay = document.getElementById('user-level');
        levelDisplay.classList.add('bounce');
        setTimeout(() => {
            levelDisplay.classList.remove('bounce');
        }, 1000);
    },
    
    /**
     * Show module unlock notification
     */
    showModuleUnlockNotification: function(moduleId) {
        const module = DataManager.getModuleById(moduleId);
        if (!module) return;
        
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = 'unlock-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-unlock"></i>
                <p>New Module Unlocked: ${module.title}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after a few seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    },
      /**
     * Load a specific module
     */
    loadModule: function(module) {
        // Hide modules grid and show game container
        document.getElementById('modules-container').style.display = 'none';
        const gameContainer = document.getElementById('game-container');
        gameContainer.style.display = 'block';
        
        // Set game title
        document.getElementById('game-title').textContent = module.title;
        
        // Create game navigation menu
        this.createGameNavigationMenu(module);
        
        // Load first game by default
        if (module.games && module.games.length > 0) {
            GameLoader.loadGame(module.games[0]);
        }
    },
    
    /**
     * Create navigation menu for games within a module
     */
    createGameNavigationMenu: function(module) {
        // Check if navigation menu already exists and remove it
        const existingNav = document.getElementById('game-nav-menu');
        if (existingNav) {
            existingNav.remove();
        }
        
        // Only create menu if module has multiple games
        if (!module.games || module.games.length <= 1) return;
        
        // Create navigation menu container
        const navMenu = document.createElement('div');
        navMenu.id = 'game-nav-menu';
        navMenu.className = 'game-nav-menu';
        
        // Create title for navigation
        const navTitle = document.createElement('div');
        navTitle.className = 'nav-title';
        navTitle.textContent = 'Exercises:';
        navMenu.appendChild(navTitle);
        
        // Create buttons for each game
        const gameNames = {
            'placeValueDetective': 'Place Value Detective',
            'buildANumber': 'Build-a-Number',
            'faceValueChallenge': 'Face Value Challenge',
            'placeValueBlocks': 'Place Value Blocks',
            'numberBreaker': 'Number Breaker',
            'expandedFormBuilder': 'Expanded Form Builder',
            'numberBattle': 'Number Battle',
            'riverLengthCompare': 'River Length Compare',
            'lakhAttack': 'Lakh Attack',
            'carShowroom': 'Car Showroom',
            'chequeWriter': 'Cheque Writer'
        };
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'nav-buttons';
        
        module.games.forEach((gameId, index) => {
            const button = document.createElement('button');
            button.className = 'nav-button';
            button.textContent = gameNames[gameId] || `Exercise ${index + 1}`;
            button.dataset.gameId = gameId;
            
            button.addEventListener('click', () => {
                // Update active button styling
                document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Load the selected game
                GameLoader.loadGame(gameId);
            });
            
            // Set first button as active
            if (index === 0) {
                button.classList.add('active');
            }
            
            buttonContainer.appendChild(button);
        });
        
        navMenu.appendChild(buttonContainer);
        
        // Add navigation menu to the game container
        const gameContainer = document.getElementById('game-container');
        gameContainer.insertBefore(navMenu, gameContainer.firstChild);
        
        // Add styles for the navigation menu
        const style = document.createElement('style');
        style.textContent = `
            .game-nav-menu {
                background-color: #f0f8ff;
                border-radius: 10px;
                padding: 15px;
                margin-bottom: 20px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .nav-title {
                font-weight: bold;
                margin-bottom: 10px;
                color: #4a6cd4;
            }
            .nav-buttons {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            .nav-button {
                background-color: #e0e0e0;
                border: none;
                border-radius: 30px;
                padding: 8px 15px;
                font-family: inherit;
                font-size: 0.9em;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .nav-button:hover {
                background-color: #d0d0d0;
            }
            .nav-button.active {
                background-color: #4a6cd4;
                color: white;
            }
            @media (max-width: 768px) {
                .nav-buttons {
                    flex-direction: column;
                }
                .nav-button {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    },
    
    /**
     * Show feedback message
     */
    showFeedback: function(message, isCorrect = null) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        
        if (isCorrect === true) {
            feedback.className = 'feedback correct';
        } else if (isCorrect === false) {
            feedback.className = 'feedback incorrect';
        } else {
            feedback.className = 'feedback';
        }
    },
    
    /**
     * Initialize UI event listeners
     */
    initEventListeners: function() {
        // Back button functionality
        document.getElementById('back-to-modules').addEventListener('click', () => {
            document.getElementById('game-container').style.display = 'none';
            document.getElementById('modules-container').style.display = 'grid';
        });
        
        // Check answer button functionality
        document.getElementById('check-answer').addEventListener('click', () => {
            const gameArea = document.getElementById('game-area');
            if (typeof window.checkAnswer === 'function') {
                window.checkAnswer(gameArea);
            }
        });
    }
};

export default UIManager;
