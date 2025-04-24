/**
 * place-value-implementation.js - Direct implementation of place value games
 */

// Ensure Games object exists
window.Games = window.Games || {};

// Place Value Detective Game
window.Games.placeValueDetective = function(gameArea) {
    // Generate a random number based on difficulty
    const userData = DataManager.getUserData();
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
            UIManager.showFeedback("Please select an answer first!");
            return;
        }
        
        if (selectedPosition === correctPosition) {
            UIManager.showFeedback("Correct! Great job!", true);
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(1);
            UIManager.updateUserProfile();
            
            // Check if level up occurred
            if (unlocked) {
                UIManager.showLevelUpAnimation();
                UIManager.showModuleUnlockNotification(5); // Unlock module id 5
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
            UIManager.showFeedback("Not quite. Try again!", false);
            
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

// Build-a-Number Game
window.Games.buildANumber = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
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
            UIManager.showFeedback("Perfect! You built the number correctly!", true);
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Check if level up occurred
            if (unlocked) {
                UIManager.showLevelUpAnimation();
                UIManager.showModuleUnlockNotification(5);
            }
            
            // Celebrate with animation
            document.getElementById('current-number').classList.add('bounce');
            
            // New challenge after delay
            setTimeout(() => {
                Games.buildANumber(gameArea);
            }, 2000);
        } else {
            UIManager.showFeedback("Not quite right. Keep trying!", false);
            
            // Show what's wrong with animation
            document.getElementById('current-number').classList.add('shake');
            setTimeout(() => {
                document.getElementById('current-number').classList.remove('shake');
            }, 500);
        }
    };
};

// Helper functions for Build-a-Number game
window.Games.adjustValue = function(place, amount, gameAreaId) {
    const gameArea = document.getElementById(gameAreaId);
    const container = gameArea.querySelector(`.place-value-container[data-place="${place}"]`);
    const valueDisplay = container.querySelector('div:nth-child(2)');
    let currentValue = parseInt(valueDisplay.textContent);
    
    // Apply limits
    currentValue = Math.max(0, Math.min(9, currentValue + amount));
    
    valueDisplay.textContent = currentValue;
    this.updateCurrentNumber(gameAreaId);
};

window.Games.updateCurrentNumber = function(gameAreaId) {
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
