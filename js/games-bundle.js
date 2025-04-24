/**
 * games-bundle.js - A non-modular version that combines all game logic
 * This is a fallback approach to work around ES module import/export issues
 */

// Define UI and Data access functions as a fallback
// These will use the imported modules when available
const DataAccess = {
    getUserData: function() {
        return window.DataManager ? window.DataManager.getUserData() : { level: 1, progress: 0, stars: 0 };
    },
    updateUserProgress: function(points) {
        return window.DataManager ? window.DataManager.updateUserProgress(points) : false;
    }
};

const UIFunctions = {
    showFeedback: function(message, isCorrect) {
        if (window.UIManager) {
            window.UIManager.showFeedback(message, isCorrect);
        } else {
            alert(message);
        }
    },
    updateUserProfile: function() {
        if (window.UIManager) {
            window.UIManager.updateUserProfile();
        }
    },
    showLevelUpAnimation: function() {
        if (window.UIManager) {
            window.UIManager.showLevelUpAnimation();
        }
    },
    showModuleUnlockNotification: function(moduleId) {
        if (window.UIManager) {
            window.UIManager.showModuleUnlockNotification(moduleId);
        }
    }
};

// Games object with all the game implementations
const Games = {};

// Place Value Games
Games.placeValueDetective = function(gameArea) {
    // Generate a random number based on difficulty
    const userData = DataAccess.getUserData();
    let digits = 3;
    if (userData.level >= 2) digits = Math.min(4, digits + Math.floor(userData.level / 2));
    
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    const numberDigits = number.toString().split('');
    
    // Define place values based on number of digits
    const places = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'lakhs'];
    const placeValues = places.slice(0, digits).reverse();
    
    // Pick a random digit to ask about
    const questionIndex = Math.floor(Math.random() * digits);
    const correctPosition = placeValues[questionIndex];
    const questionDigit = numberDigits[questionIndex];
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <h3>What is the place value of ${questionDigit} in the number ${number}?</h3>
            <div style="font-size: 4em; letter-spacing: 15px; margin: 20px;">
                ${numberDigits.join('')}
            </div>
        </div>
        <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
            ${placeValues.map(pos => `
                <button class="btn place-value-option" data-position="${pos}">${pos.charAt(0).toUpperCase() + pos.slice(1)}</button>
            `).join('')}
        </div>
    `;
    
    // Add event listeners to buttons
    const options = gameArea.querySelectorAll('.place-value-option');
    options.forEach(button => {
        button.addEventListener('click', (e) => {
            options.forEach(btn => btn.style.backgroundColor = '');
            e.target.style.backgroundColor = '#b1e5f2';
            e.target.classList.add('pulse');
            gameArea.dataset.selectedPosition = e.target.dataset.position;
        });
    });
    
    // Store correct answer in dataset
    gameArea.dataset.correctPosition = correctPosition;
    
    // Override check answer function for this game
    window.checkAnswer = (gameArea) => {
        const selectedPosition = gameArea.dataset.selectedPosition;
        const correctPosition = gameArea.dataset.correctPosition;
        
        if (!selectedPosition) {
            UIFunctions.showFeedback("Please select an answer first!");
            return;
        }
        
        if (selectedPosition === correctPosition) {
            UIFunctions.showFeedback("Correct! Great job!", true);
            
            // Award points and update UI
            const unlocked = DataAccess.updateUserProgress(1);
            UIFunctions.updateUserProfile();
            
            // Check if level up occurred
            if (unlocked) {
                UIFunctions.showLevelUpAnimation();
                UIFunctions.showModuleUnlockNotification(5); // Unlock module id 5
            }
            
            // Animation for correct answer
            const options = gameArea.querySelectorAll('.place-value-option');
            options.forEach(btn => {
                if (btn.dataset.position === correctPosition) {
                    btn.classList.add('bounce');
                }
            });
            
            // Generate a new question after a delay
            setTimeout(() => {
                Games.placeValueDetective(gameArea);
            }, 2000);
        } else {
            UIFunctions.showFeedback("Not quite. Try again!", false);
            
            // Animation for incorrect answer
            const options = gameArea.querySelectorAll('.place-value-option');
            options.forEach(btn => {
                if (btn.dataset.position === selectedPosition) {
                    btn.classList.add('shake');
                    setTimeout(() => {
                        btn.classList.remove('shake');
                        btn.style.backgroundColor = '';
                    }, 500);
                }
            });
        }
    };
};

Games.buildANumber = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataAccess.getUserData();
    let digits = 3;
    if (userData.level >= 3) digits = 4;
    if (userData.level >= 5) digits = 5;
    
    // Generate a target number
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    const targetNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Define place values based on number of digits
    const places = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands'];
    const placeValues = places.slice(0, digits).reverse();
    
    gameArea.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h3>Build this number using place value blocks!</h3>
            <div style="font-size: 3em; margin: 20px;">${targetNumber}</div>
        </div>
        <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 30px; flex-wrap: wrap;">
            ${placeValues.map((place, index) => `
                <div class="place-value-container" data-place="${place}">
                    <div style="font-weight: bold; margin-bottom: 10px;">${place.charAt(0).toUpperCase() + place.slice(1)}</div>
                    <div style="font-size: 2em; margin-bottom: 10px;">0</div>
                    <div>
                        <button class="btn btn-secondary" onclick="Games.adjustValue('${place}', -1, '${gameArea.id}')">-</button>
                        <button class="btn btn-secondary" onclick="Games.adjustValue('${place}', 1, '${gameArea.id}')">+</button>
                    </div>
                </div>
            `).join('')}
        </div>
        <div style="text-align: center; font-size: 1.5em; margin: 20px;">
            Your number: <span id="current-number">0</span>
        </div>
    `;
    
    // Store target in dataset
    gameArea.dataset.targetNumber = targetNumber;
    
    // Check answer function for this game
    window.checkAnswer = (gameArea) => {
        const currentNumber = document.getElementById('current-number').textContent;
        const targetNumber = gameArea.dataset.targetNumber;
        
        if (currentNumber === targetNumber) {
            UIFunctions.showFeedback("Perfect! You built the number correctly!", true);
            
            // Award points and update UI
            const unlocked = DataAccess.updateUserProgress(2);
            UIFunctions.updateUserProfile();
            
            // Check if level up occurred
            if (unlocked) {
                UIFunctions.showLevelUpAnimation();
                UIFunctions.showModuleUnlockNotification(5);
            }
            
            // Celebrate with animation
            document.getElementById('current-number').classList.add('bounce');
            
            // New challenge after delay
            setTimeout(() => {
                Games.buildANumber(gameArea);
            }, 2000);
        } else {
            UIFunctions.showFeedback("Not quite right. Keep trying!", false);
            
            // Show what's wrong with animation
            document.getElementById('current-number').classList.add('shake');
            setTimeout(() => {
                document.getElementById('current-number').classList.remove('shake');
            }, 500);
        }
    };
};

// Helper function to adjust place values for Build-a-Number game
Games.adjustValue = function(place, amount, gameAreaId) {
    const gameArea = document.getElementById(gameAreaId);
    const container = gameArea.querySelector(`.place-value-container[data-place="${place}"]`);
    const valueDisplay = container.querySelector('div:nth-child(2)');
    let currentValue = parseInt(valueDisplay.textContent);
    
    // Apply limits
    currentValue = Math.max(0, Math.min(9, currentValue + amount));
    
    valueDisplay.textContent = currentValue;
    this.updateCurrentNumber(gameAreaId);
};

// Helper function to update current number display for Build-a-Number game
Games.updateCurrentNumber = function(gameAreaId) {
    const gameArea = document.getElementById(gameAreaId);
    const containers = gameArea.querySelectorAll('.place-value-container');
    let currentNumber = 0;
    
    containers.forEach(container => {
        const place = container.dataset.place;
        const value = parseInt(container.querySelector('div:nth-child(2)').textContent);
        
        switch(place) {
            case 'ones': currentNumber += value; break;
            case 'tens': currentNumber += value * 10; break;
            case 'hundreds': currentNumber += value * 100; break;
            case 'thousands': currentNumber += value * 1000; break;
            case 'ten thousands': currentNumber += value * 10000; break;
        }
    });
    
    document.getElementById('current-number').textContent = currentNumber;
    
    // Visual feedback when numbers match
    if (currentNumber.toString() === gameArea.dataset.targetNumber) {
        document.getElementById('current-number').style.color = 'green';
    } else {
        document.getElementById('current-number').style.color = '';
    }
};

// Concept introduction games
Games.conceptIntro = function(gameArea) {
    // Check if specific module concept is requested
    const conceptModule = gameArea.dataset.conceptModule || 'default';
    
    // Content for different modules
    if (conceptModule === 'lakhs') {
        // Lakhs concept content
        gameArea.innerHTML = `<div class="concept-intro"><h2>Introduction to Lakhs</h2>...</div>`;
    }
    else if (conceptModule === 'realLifeMath') {
        gameArea.innerHTML = `<div class="concept-intro"><h2>Real-Life Math</h2>...</div>`;
    }
    else {
        // Default concept intro
        gameArea.innerHTML = `
            <div class="concept-intro">
                <h2>Concept Introduction</h2>
                <p>Select a specific module to see its concept introduction.</p>
            </div>
        `;
    }
};

// Pattern detection games
Games.patternDetective = function(gameArea) {
    // Pattern Detective Game implementation
    // Similar to the existing implementation but using the UIFunctions and DataAccess
};

// Make Games globally available
window.Games = Games;
