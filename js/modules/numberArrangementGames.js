/**
 * numberArrangementGames.js - Contains all games related to arranging numbers
 */

import DataManager from '../data.js';
import UIManager from '../ui.js';

const NumberArrangementGames = {
    /**
     * Digit Sorter Game - Arrange digits to form smallest or largest numbers
     */
    digitSorter: function(gameArea) {
        // Determine difficulty based on user level
        const userData = DataManager.getUserData();
        let numDigits = 3; // Start with 3 digits
        
        if (userData.level >= 3) numDigits = 4;
        if (userData.level >= 5) numDigits = 5;
        
        // Generate random digits
        const digits = [];
        for (let i = 0; i < numDigits; i++) {
            digits.push(Math.floor(Math.random() * 10)); // 0-9
        }
        
        // Determine challenge type (smallest or largest)
        const challengeTypes = ['smallest', 'largest'];
        const challengeType = challengeTypes[Math.floor(Math.random() * 2)];
        
        // Create the game HTML
        gameArea.innerHTML = `
            <div class="digit-sorter-container">
                <h3>Digit Sorter</h3>
                
                <div class="challenge-text">
                    <p>Arrange these digits to form the <strong>${challengeType}</strong> possible number:</p>
                </div>
                
                <div class="digit-container">
                    ${digits.map(digit => `
                        <div class="digit-card" draggable="true" data-value="${digit}">${digit}</div>
                    `).join('')}
                </div>
                
                <div class="arrangement-container">
                    <div class="arrangement-label">${challengeType.charAt(0).toUpperCase() + challengeType.slice(1)} Number:</div>
                    <div class="digit-slots">
                        ${Array(numDigits).fill().map((_, i) => `
                            <div class="digit-slot" data-position="${i}"></div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="digit-sorter-feedback" id="digit-feedback"></div>
                
                <div class="digit-controls">
                    <button id="reset-digits-btn" class="btn btn-secondary">Reset</button>
                    <button id="hint-btn" class="btn btn-secondary">Hint</button>
                </div>
                
                <div class="digit-hint-container" id="hint-container" style="display:none;">
                    <div class="hint-text">
                        <p><strong>Hint:</strong> 
                            ${challengeType === 'smallest' ? 
                                "For the smallest number, arrange digits in ascending order (but avoid starting with 0)." : 
                                "For the largest number, arrange digits in descending order."}
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles for the game
        const style = document.createElement('style');
        style.textContent = `
            .digit-sorter-container {
                background-color: #f7f9fc;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.05);
            }
            
            .digit-container {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 15px;
                margin: 30px 0;
            }
            
            .digit-card {
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.8em;
                font-weight: bold;
                background-color: white;
                border-radius: 8px;
                cursor: move;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                border: 2px solid #3f51b5;
                color: #3f51b5;
                user-select: none;
                transition: transform 0.2s, opacity 0.2s;
            }
            
            .digit-card.dragging {
                opacity: 0.5;
                transform: scale(0.95);
            }
            
            .arrangement-container {
                margin: 30px 0;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .arrangement-label {
                font-size: 1.2em;
                font-weight: bold;
                margin-bottom: 15px;
                color: #3f51b5;
            }
            
            .digit-slots {
                display: flex;
                gap: 10px;
            }
            
            .digit-slot {
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.8em;
                font-weight: bold;
                background-color: #f5f5f5;
                border-radius: 8px;
                border: 2px dashed #3f51b5;
                color: #3f51b5;
            }
            
            .digit-slot.highlight {
                background-color: #e8eaf6;
                box-shadow: 0 0 8px rgba(63, 81, 181, 0.5);
            }
            
            .digit-sorter-feedback {
                height: 40px;
                text-align: center;
                font-weight: bold;
                padding: 10px;
                margin: 15px 0;
            }
            
            .digit-sorter-feedback.correct {
                color: #2e7d32;
            }
            
            .digit-sorter-feedback.incorrect {
                color: #c62828;
            }
            
            .digit-controls {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-top: 20px;
            }
            
            .digit-hint-container {
                background-color: #e8f5e9;
                padding: 15px;
                border-radius: 8px;
                margin-top: 20px;
                border-left: 4px solid #4caf50;
            }
            
            .challenge-text {
                text-align: center;
                font-size: 1.2em;
                margin: 15px 0;
            }
            
            .btn-secondary {
                background-color: #f5f5f5;
                color: #333;
                border: 1px solid #ddd;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            .btn-secondary:hover {
                background-color: #e0e0e0;
            }
        `;
        document.head.appendChild(style);
        
        // Store game data in dataset
        gameArea.dataset.digits = JSON.stringify(digits);
        gameArea.dataset.challengeType = challengeType;
        
        // Implement drag and drop functionality
        this.initializeDragAndDrop(gameArea);
        
        // Add event listeners for control buttons
        const resetBtn = gameArea.querySelector('#reset-digits-btn');
        resetBtn.addEventListener('click', () => {
            this.resetDigitSorter(gameArea);
        });
        
        const hintBtn = gameArea.querySelector('#hint-btn');
        hintBtn.addEventListener('click', () => {
            const hintContainer = document.getElementById('hint-container');
            hintContainer.style.display = hintContainer.style.display === 'none' ? 'block' : 'none';
            hintBtn.textContent = hintContainer.style.display === 'none' ? 'Hint' : 'Hide Hint';
        });
        
        // Check answer function for this game
        window.checkAnswer = (gameArea) => {
            const slots = gameArea.querySelectorAll('.digit-slot');
            const digits = JSON.parse(gameArea.dataset.digits);
            const challengeType = gameArea.dataset.challengeType;
            const feedback = document.getElementById('digit-feedback');
            
            // Check if all slots are filled
            let allFilled = true;
            const userArrangement = [];
            
            slots.forEach(slot => {
                if (!slot.textContent.trim()) {
                    allFilled = false;
                } else {
                    userArrangement.push(parseInt(slot.textContent));
                }
            });
            
            if (!allFilled) {
                feedback.textContent = "Please arrange all digits into slots!";
                feedback.className = "digit-sorter-feedback incorrect";
                return;
            }
            
            // Calculate correct answer
            let correctArrangement;
            if (challengeType === 'smallest') {
                correctArrangement = [...digits].sort((a, b) => a - b);
                
                // Handle zero case - zero should not be the first digit for smallest non-zero number
                if (correctArrangement[0] === 0 && correctArrangement.length > 1) {
                    // Find first non-zero digit
                    let firstNonZeroIndex = correctArrangement.findIndex(d => d !== 0);
                    if (firstNonZeroIndex > 0) {
                        // Swap first digit with first non-zero digit
                        [correctArrangement[0], correctArrangement[firstNonZeroIndex]] = 
                        [correctArrangement[firstNonZeroIndex], correctArrangement[0]];
                    }
                }
            } else { // largest
                correctArrangement = [...digits].sort((a, b) => b - a);
            }
            
            // Check if user arrangement matches correct arrangement
            const isCorrect = JSON.stringify(userArrangement) === JSON.stringify(correctArrangement);
            
            if (isCorrect) {
                feedback.textContent = `Perfect! You've arranged the digits to form the ${challengeType} number!`;
                feedback.className = "digit-sorter-feedback correct";
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(2);
                UIManager.updateUserProfile();
                
                // Generate a new challenge after a delay
                setTimeout(() => {
                    this.digitSorter(gameArea);
                }, 2500);
            } else {
                feedback.textContent = "That's not right. Try arranging your digits differently!";
                feedback.className = "digit-sorter-feedback incorrect";
            }
        };
    },
    
    /**
     * Initialize drag and drop functionality for digit sorter game
     */
    initializeDragAndDrop: function(gameArea) {
        const digitCards = gameArea.querySelectorAll('.digit-card');
        const digitSlots = gameArea.querySelectorAll('.digit-slot');
        
        let draggedElement = null;
        
        // Event listeners for digit cards
        digitCards.forEach(card => {
            card.addEventListener('dragstart', function(e) {
                draggedElement = this;
                this.classList.add('dragging');
                e.dataTransfer.setData('text/plain', this.dataset.value);
            });
            
            card.addEventListener('dragend', function() {
                this.classList.remove('dragging');
            });
            
            // Make digits clickable for touch devices
            card.addEventListener('click', function() {
                if (!this.parentElement.classList.contains('digit-container')) return;
                
                // Find first empty slot
                const emptySlot = gameArea.querySelector('.digit-slot:not(:has(div))');
                if (emptySlot) {
                    emptySlot.appendChild(this);
                    // Ensure data-value is preserved
                    this.dataset.value = this.textContent;
                }
            });
        });
        
        // Event listeners for digit slots
        digitSlots.forEach(slot => {
            slot.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.classList.add('highlight');
            });
            
            slot.addEventListener('dragleave', function() {
                this.classList.remove('highlight');
            });
            
            slot.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('highlight');
                
                // If slot already has a card, don't allow another drop
                if (this.children.length > 0) return;
                
                if (draggedElement) {
                    // If digit is already in a slot, move it to this slot
                    if (draggedElement.parentElement.classList.contains('digit-slot')) {
                        this.appendChild(draggedElement);
                    } else {
                        // Otherwise, it's coming from the digit container
                        this.textContent = draggedElement.dataset.value;
                        draggedElement.style.visibility = 'hidden';
                    }
                }
            });
            
            // Make slots clickable for touch devices
            slot.addEventListener('click', function() {
                if (this.children.length > 0) {
                    // If slot has a card, move it back to container
                    const card = this.children[0];
                    const container = gameArea.querySelector('.digit-container');
                    container.appendChild(card);
                    card.style.visibility = 'visible';
                }
            });
        });
    },
    
    /**
     * Reset the digit sorter game
     */
    resetDigitSorter: function(gameArea) {
        const digitContainer = gameArea.querySelector('.digit-container');
        const slots = gameArea.querySelectorAll('.digit-slot');
        
        // Clear all slots
        slots.forEach(slot => {
            const card = slot.querySelector('.digit-card');
            if (card) {
                digitContainer.appendChild(card);
            }
            slot.textContent = '';
        });
        
        // Make all digits visible
        const digitCards = gameArea.querySelectorAll('.digit-card');
        digitCards.forEach(card => {
            card.style.visibility = 'visible';
        });
        
        // Clear feedback
        const feedback = document.getElementById('digit-feedback');
        feedback.textContent = '';
        feedback.className = 'digit-sorter-feedback';
    },
    
    /**
     * Number Extremes Game - Find smallest or largest number from given digits
     */
    numberExtremes: function(gameArea) {
        // Determine difficulty based on user level
        const userData = DataManager.getUserData();
        let numDigits = 3; // Start with 3 digits
        
        if (userData.level >= 3) numDigits = 4;
        if (userData.level >= 5) numDigits = 5;
        
        // Generate random digits
        const digits = [];
        for (let i = 0; i < numDigits; i++) {
            digits.push(Math.floor(Math.random() * 10)); // 0-9
        }
        
        // Ensure at least one zero for added complexity
        if (!digits.includes(0) && numDigits > 3) {
            digits[Math.floor(Math.random() * numDigits)] = 0;
        }
        
        // Determine challenge type (smallest or largest)
        const challengeTypes = [
            { type: 'smallest', instruction: 'Form the smallest number using these digits:' },
            { type: 'largest', instruction: 'Form the largest number using these digits:' },
            { type: 'smallest-nonzero', instruction: 'Form the smallest non-zero number using these digits:' }
        ];
        
        // Select challenge type based on user level
        let availableChallenges;
        if (userData.level >= 4) {
            availableChallenges = challengeTypes;
        } else {
            // Exclude 'smallest-nonzero' for beginners
            availableChallenges = challengeTypes.slice(0, 2);
        }
        
        const challenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
        
        // Create the game HTML
        gameArea.innerHTML = `
            <div class="number-extremes-container">
                <h3>Number Extremes Challenge</h3>
                
                <div class="extremes-challenge">
                    <p>${challenge.instruction}</p>
                    
                    <div class="digit-display">
                        ${digits.map(digit => `
                            <div class="digit-bubble">${digit}</div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="extremes-answer">
                    <label for="user-answer">Your Answer:</label>
                    <input type="text" id="user-answer" class="number-input" placeholder="Enter your answer" maxlength="${numDigits}">
                </div>
                
                <div class="extremes-feedback" id="extremes-feedback"></div>
                
                <div class="extremes-hint-container">
                    <button id="extremes-hint-btn" class="btn btn-secondary">Hint</button>
                    <div id="extremes-hint-text" class="extremes-hint" style="display:none;">
                        ${challenge.type === 'smallest' ? 
                            'For the smallest number, arrange digits in ascending order.' : 
                            challenge.type === 'largest' ? 
                                'For the largest number, arrange digits in descending order.' : 
                                'For the smallest non-zero number, arrange digits in ascending order, but avoid putting zero in the first position.'}
                    </div>
                </div>
            </div>
        `;
        
        // Add styles for the game
        const style = document.createElement('style');
        style.textContent = `
            .number-extremes-container {
                background-color: #f7f9fc;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.05);
            }
            
            .extremes-challenge {
                text-align: center;
                margin: 20px 0;
            }
            
            .extremes-challenge p {
                font-size: 1.2em;
                font-weight: bold;
                color: #333;
                margin-bottom: 15px;
            }
            
            .digit-display {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin: 30px 0;
            }
            
            .digit-bubble {
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.6em;
                font-weight: bold;
                background-color: #e3f2fd;
                border-radius: 50%;
                border: 2px solid #2196f3;
                color: #0d47a1;
            }
            
            .extremes-answer {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                margin: 30px 0;
            }
            
            .extremes-answer label {
                font-weight: bold;
                color: #333;
            }
            
            .number-input {
                font-size: 1.5em;
                padding: 10px;
                width: 150px;
                text-align: center;
                border: 2px solid #3f51b5;
                border-radius: 8px;
                color: #3f51b5;
            }
            
            .extremes-feedback {
                height: 30px;
                text-align: center;
                font-weight: bold;
                padding: 10px;
                margin: 15px 0;
                min-height: 20px;
            }
            
            .extremes-feedback.correct {
                color: #2e7d32;
            }
            
            .extremes-feedback.incorrect {
                color: #c62828;
            }
            
            .extremes-hint-container {
                text-align: center;
                margin: 20px 0;
            }
            
            .extremes-hint {
                background-color: #fff8e1;
                padding: 15px;
                border-radius: 8px;
                margin-top: 15px;
                border-left: 4px solid #ffb300;
                color: #6d4c41;
                font-style: italic;
            }
        `;
        document.head.appendChild(style);
        
        // Store game data in dataset
        gameArea.dataset.digits = JSON.stringify(digits);
        gameArea.dataset.challengeType = challenge.type;
        
        // Add event listener for hint button
        const hintBtn = gameArea.querySelector('#extremes-hint-btn');
        hintBtn.addEventListener('click', () => {
            const hintText = document.getElementById('extremes-hint-text');
            hintText.style.display = hintText.style.display === 'none' ? 'block' : 'none';
            hintBtn.textContent = hintText.style.display === 'none' ? 'Hint' : 'Hide Hint';
        });
        
        // Add event listener for input validation
        const userInput = gameArea.querySelector('#user-answer');
        userInput.addEventListener('input', function() {
            // Only allow numbers
            this.value = this.value.replace(/\D/g, '');
            
            // Limit length to number of digits
            if (this.value.length > numDigits) {
                this.value = this.value.slice(0, numDigits);
            }
        });
        
        // Check answer function for this game
        window.checkAnswer = (gameArea) => {
            const userAnswer = gameArea.querySelector('#user-answer').value.trim();
            const digits = JSON.parse(gameArea.dataset.digits);
            const challengeType = gameArea.dataset.challengeType;
            const feedback = document.getElementById('extremes-feedback');
            
            // Validate input
            if (!userAnswer) {
                feedback.textContent = "Please enter your answer!";
                feedback.className = "extremes-feedback incorrect";
                return;
            }
            
            if (userAnswer.length !== digits.length) {
                feedback.textContent = `Your answer should use all ${digits.length} digits!`;
                feedback.className = "extremes-feedback incorrect";
                return;
            }
            
            // Check if user used only the given digits
            const userDigits = userAnswer.split('').map(Number);
            const digitsCopy = [...digits];
            
            // Check if each digit in user's answer is in our digits array
            for (const digit of userDigits) {
                const index = digitsCopy.indexOf(digit);
                if (index === -1) {
                    feedback.textContent = "You used different digits than what was provided!";
                    feedback.className = "extremes-feedback incorrect";
                    return;
                }
                // Remove the digit so duplicates are handled correctly
                digitsCopy.splice(index, 1);
            }
            
            // Calculate correct answer
            let correctAnswer;
            if (challengeType === 'smallest') {
                // For smallest, sort ascending
                correctAnswer = parseInt([...digits].sort((a, b) => a - b).join(''));
            } else if (challengeType === 'largest') {
                // For largest, sort descending
                correctAnswer = parseInt([...digits].sort((a, b) => b - a).join(''));
            } else { // smallest-nonzero
                const sortedDigits = [...digits].sort((a, b) => a - b);
                // Find first non-zero digit for smallest non-zero number
                const firstNonZeroIndex = sortedDigits.findIndex(d => d !== 0);
                if (firstNonZeroIndex > 0) {
                    // Swap first digit with first non-zero digit
                    [sortedDigits[0], sortedDigits[firstNonZeroIndex]] = 
                    [sortedDigits[firstNonZeroIndex], sortedDigits[0]];
                }
                correctAnswer = parseInt(sortedDigits.join(''));
            }
            
            // Check if user's answer matches correct answer
            const isCorrect = parseInt(userAnswer) === correctAnswer;
            
            if (isCorrect) {
                feedback.textContent = `Correct! You formed the ${challengeType.replace('-', ' ')} number!`;
                feedback.className = "extremes-feedback correct";
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(2);
                UIManager.updateUserProfile();
                
                // Generate a new challenge after a delay
                setTimeout(() => {
                    this.numberExtremes(gameArea);
                }, 2500);
            } else {
                feedback.textContent = `Not quite! Try again. The correct answer is ${correctAnswer}.`;
                feedback.className = "extremes-feedback incorrect";
                
                // Show the correct answer briefly, then generate new challenge
                setTimeout(() => {
                    this.numberExtremes(gameArea);
                }, 4000);
            }
        };
    }
};

export default NumberArrangementGames;
