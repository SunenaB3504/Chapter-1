/**
 * games.js - Contains all game implementations
 * Each game is a separate module function
 */

import DataManager from './data.js';
import UIManager from './ui.js';

const Games = {
    /**
     * Place Value Detective Game
     */
    placeValueDetective: function(gameArea) {
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
                    this.placeValueDetective(gameArea);
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
    },
    
    /**
     * Build-a-Number Game
     */
    buildANumber: function(gameArea) {
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
                    this.buildANumber(gameArea);
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
    },
    
    /**
     * Helper function to adjust place values for Build-a-Number game
     */
    adjustValue: function(place, amount, gameAreaId) {
        const gameArea = document.getElementById(gameAreaId);
        const container = gameArea.querySelector(`.place-value-container[data-place="${place}"]`);
        const valueDisplay = container.querySelector('div:nth-child(2)');
        let currentValue = parseInt(valueDisplay.textContent);
        
        // Apply limits
        currentValue = Math.max(0, Math.min(9, currentValue + amount));
        
        valueDisplay.textContent = currentValue;
        this.updateCurrentNumber(gameAreaId);
    },
    
    /**
     * Helper function to update current number display for Build-a-Number game
     */
    updateCurrentNumber: function(gameAreaId) {
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
        }    },
    
    /**
     * Concept Introduction - Displays concept introductions for different modules
     */
    conceptIntro: function(gameArea) {
        // Check if specific module concept is requested
        const conceptModule = gameArea.dataset.conceptModule || 'default';
        
        // Content for different modules
        if (conceptModule === 'lakhs') {
            // Lakhs concept content remains the same
            // ...existing code...
        }
        else if (conceptModule === 'largeNumbers') {
            // Large Numbers concept content remains the same
            // ...existing code...
        }
        else if (conceptModule === 'predecessor') {
            // Predecessor concept content remains the same
            // ...existing code...
        }
        else if (conceptModule === 'patterns') {
            gameArea.innerHTML = `
                <div class="concept-intro">
                    <h2>Number Patterns</h2>
                    
                    <div class="concept-section">
                        <h3>What are Number Patterns?</h3>
                        <p>Number patterns are sequences of numbers that follow specific rules. Recognizing patterns helps us predict what comes next and understand mathematical relationships.</p>
                        <div class="pattern-examples">
                            <div class="pattern-example">
                                <div class="pattern-title">Increasing Pattern</div>
                                <div class="pattern-sequence">2, 4, 6, 8, 10, ...</div>
                                <div class="pattern-rule">Rule: Add 2 to get the next number</div>
                            </div>
                            <div class="pattern-example">
                                <div class="pattern-title">Decreasing Pattern</div>
                                <div class="pattern-sequence">20, 15, 10, 5, 0, ...</div>
                                <div class="pattern-rule">Rule: Subtract 5 to get the next number</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section">
                        <h3>Types of Number Patterns</h3>
                        <div class="types-grid">
                            <div class="type-card">
                                <div class="type-name">Arithmetic Patterns</div>
                                <p>Add or subtract the same value each time</p>
                                <div class="type-example">5, 10, 15, 20, ...</div>
                                <div class="type-rule">+5 each time</div>
                            </div>
                            <div class="type-card">
                                <div class="type-name">Geometric Patterns</div>
                                <p>Multiply or divide by the same value each time</p>
                                <div class="type-example">2, 4, 8, 16, ...</div>
                                <div class="type-rule">×2 each time</div>
                            </div>
                            <div class="type-card">
                                <div class="type-name">Skip Counting</div>
                                <p>Count by skipping numbers in a regular way</p>
                                <div class="type-example">3, 6, 9, 12, ...</div>
                                <div class="type-rule">Count by 3s</div>
                            </div>
                            <div class="type-card">
                                <div class="type-name">Alternating Patterns</div>
                                <p>Patterns that alternate between different rules</p>
                                <div class="type-example">1, 3, 6, 8, 11, 13, ...</div>
                                <div class="type-rule">+2, +3, +2, +3, ...</div>
                            </div>
                        </div>
                    </div>

                    <div class="concept-section">
                        <h3>Finding Patterns</h3>
                        <div class="pattern-steps">
                            <div class="step-card">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <div class="step-title">Observe</div>
                                    <p>Look at the sequence and observe how numbers change</p>
                                </div>
                            </div>
                            <div class="step-card">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <div class="step-title">Find the Rule</div>
                                    <p>Determine what operation connects each number to the next</p>
                                </div>
                            </div>
                            <div class="step-card">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <div class="step-title">Test</div>
                                    <p>Check if your rule works for all numbers in the sequence</p>
                                </div>
                            </div>
                            <div class="step-card">
                                <div class="step-number">4</div>
                                <div class="step-content">
                                    <div class="step-title">Predict</div>
                                    <p>Use the rule to predict the next numbers in the pattern</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="concept-section">
                        <h3>Real-Life Number Patterns</h3>
                        <div class="examples-grid">
                            <div class="example-card">
                                <img src="images/NiaEd-.png" alt="Calendar" class="example-image">
                                <p><strong>Calendar Patterns</strong>: Days repeat in patterns of 7, months have patterns of days</p>
                            </div>
                            <div class="example-card">
                                <img src="images/house-numbers.png" alt="House numbers" class="example-image">
                                <p><strong>House Numbers</strong>: House numbers often follow patterns (odd on one side, even on the other)</p>
                            </div>
                            <div class="example-card">
                                <img src="images/mountain-climb.png" alt="Growth patterns" class="example-image">
                                <p><strong>Growth Patterns</strong>: Plants often grow following specific mathematical patterns</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section">
                        <h3>Pattern Challenge</h3>
                        <p>Can you guess the next number in these patterns?</p>
                        <div class="pattern-challenges">
                            <div class="challenge">
                                <div class="challenge-pattern">2, 4, 8, 16, ___, ___</div>
                                <div class="challenge-hint">Hint: Each number is double the previous number</div>
                                <div class="challenge-answer">Answer: 32, 64</div>
                            </div>
                            <div class="challenge">
                                <div class="challenge-pattern">1, 4, 9, 16, ___, ___</div>
                                <div class="challenge-hint">Hint: These are square numbers</div>
                                <div class="challenge-answer">Answer: 25, 36</div>
                            </div>
                            <div class="challenge">
                                <div class="challenge-pattern">1, 1, 2, 3, 5, ___, ___</div>
                                <div class="challenge-hint">Hint: Each number is the sum of the two numbers before it</div>
                                <div class="challenge-answer">Answer: 8, 13</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section cta-section">
                        <p>Ready to discover and complete number patterns? Try the exercises below!</p>
                        <button id="start-games-btn" class="btn">Start Exercises</button>
                    </div>
                </div>
            `;
            
            // Add styles for number patterns concept
            const style = document.createElement('style');
            style.textContent = `
                .pattern-examples {
                    display: flex;
                    gap: 20px;
                    margin: 20px 0;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                
                .pattern-example {
                    flex: 1;
                    min-width: 250px;
                    background-color: #f5f5f5;
                    padding: 15px;
                    border-radius: 8px;
                    border-left: 4px solid #3f51b5;
                }
                
                .pattern-title {
                    font-weight: bold;
                    font-size: 1.1em;
                    margin-bottom: 10px;
                    color: #3f51b5;
                }
                
                .pattern-sequence {
                    font-size: 1.3em;
                    margin: 10px 0;
                    font-family: monospace;
                    letter-spacing: 1px;
                }
                
                .pattern-rule {
                    font-style: italic;
                    color: #666;
                }
                
                .types-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 15px;
                    margin: 20px 0;
                }
                
                .type-card {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 8px;
                    border-top: 3px solid #2196f3;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                
                .type-name {
                    font-weight: bold;
                    margin-bottom: 8px;
                    color: #2196f3;
                }
                
                .type-example {
                    background-color: #e3f2fd;
                    padding: 8px;
                    border-radius: 4px;
                    margin: 10px 0 5px;
                    font-family: monospace;
                }
                
                .type-rule {
                    font-size: 0.9em;
                    color: #666;
                    font-style: italic;
                }
                
                .pattern-steps {
                    display: flex;
                    gap: 15px;
                    margin: 20px 0;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                
                .step-card {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    max-width: 350px;
                    background-color: #fff;
                    padding: 12px;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                
                .step-number {
                    width: 30px;
                    height: 30px;
                    background-color: #4caf50;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    margin-right: 15px;
                }
                
                .step-content {
                    flex: 1;
                }
                
                .step-title {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .pattern-challenges {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin: 20px 0;
                }
                
                .challenge {
                    background-color: #f1f8e9;
                    padding: 15px;
                    border-radius: 8px;
                    border-left: 4px solid #8bc34a;
                }
                
                .challenge-pattern {
                    font-size: 1.4em;
                    font-family: monospace;
                    margin-bottom: 10px;
                }
                
                .challenge-hint {
                    color: #666;
                    margin-bottom: 8px;
                    font-style: italic;
                }
                
                .challenge-answer {
                    color: #4caf50;
                    font-weight: bold;
                    cursor: pointer;
                    position: relative;
                }
                
                .challenge-answer:before {
                    content: "Reveal ";
                    font-weight: normal;
                    color: #666;
                }
                
                .challenge-answer:hover:before {
                    content: "";
                }
                
                .challenge-answer:not(:hover) {
                    color: transparent;
                    text-shadow: 0 0 5px rgba(0,0,0,0.5);
                }
            `;
            document.head.appendChild(style);
            
            // Add event listener to start games button
            const startGamesBtn = document.getElementById('start-games-btn');
            if (startGamesBtn) {
                startGamesBtn.addEventListener('click', function() {
                    // Find active module in navigation and click the first game button (not the concept)
                    const navButtons = document.querySelectorAll('.nav-button');
                    if (navButtons.length > 1) {
                        navButtons[1].click();
                    }
                });
            }
        }
        else {
            // Default concept intro if no specific module is specified
            gameArea.innerHTML = `
                <div class="concept-intro">
                    <h2>Concept Introduction</h2>
                    <p>Select a specific module to see its concept introduction.</p>
                </div>
            `;
        }
    },

    /**
     * Pattern Detective Game - Identify the rule in number patterns
     */
    patternDetective: function(gameArea) {
        // Determine difficulty based on user level
        const userData = DataManager.getUserData();
        let difficulty = 1; // Start with easy patterns
        let maxNumber = 50; // Maximum number in patterns
        
        if (userData.level >= 3) {
            difficulty = 2; // Medium patterns
            maxNumber = 100;
        }
        if (userData.level >= 5) {
            difficulty = 3; // Hard patterns
            maxNumber = 200;
        }
        
        // Define pattern types based on difficulty
        const patternTypes = [
            // Easy patterns
            {
                type: 'add',
                values: [2, 3, 5, 10],
                description: 'Add {0} to each number',
                generateSequence: (start, step, length) => {
                    const sequence = [start];
                    for (let i = 1; i < length; i++) {
                        sequence.push(sequence[i-1] + step);
                    }
                    return sequence;
                },
                generateOptions: (step) => {
                    return [
                        { text: `Add ${step}`, correct: true },
                        { text: `Add ${step + 1}`, correct: false },
                        { text: `Add ${step - 1}`, correct: false },
                        { text: `Multiply by ${step}`, correct: false }
                    ];
                }
            },
            // Medium patterns
            {
                type: 'subtract',
                values: [2, 3, 5, 10],
                description: 'Subtract {0} from each number',
                generateSequence: (start, step, length) => {
                    const sequence = [start];
                    for (let i = 1; i < length; i++) {
                        sequence.push(sequence[i-1] - step);
                    }
                    return sequence;
                },
                generateOptions: (step) => {
                    return [
                        { text: `Subtract ${step}`, correct: true },
                        { text: `Subtract ${step + 2}`, correct: false },
                        { text: `Add ${step}`, correct: false },
                        { text: `Divide by ${step}`, correct: false }
                    ];
                }
            },
            // Hard patterns
            {
                type: 'multiply',
                values: [2, 3, 5],
                description: 'Multiply each number by {0}',
                generateSequence: (start, step, length) => {
                    const sequence = [start];
                    for (let i = 1; i < length; i++) {
                        sequence.push(sequence[i-1] * step);
                    }
                    return sequence;
                },
                generateOptions: (step) => {
                    return [
                        { text: `Multiply by ${step}`, correct: true },
                        { text: `Add ${step * start}`, correct: false },
                        { text: `Multiply by ${step + 1}`, correct: false },
                        { text: `Add ${step * 2}`, correct: false }
                    ];
                }
            }
        ];
        
        // Select pattern types based on difficulty
        let availablePatterns = patternTypes.slice(0, difficulty);
        
        // Select a random pattern type
        const patternIndex = Math.floor(Math.random() * availablePatterns.length);
        const patternType = availablePatterns[patternIndex];
        
        // Generate pattern parameters
        const valueIndex = Math.floor(Math.random() * patternType.values.length);
        const step = patternType.values[valueIndex];
        
        // Determine starting number based on pattern type
        let start;
        if (patternType.type === 'subtract') {
            // For subtraction, start higher to avoid negative numbers
            start = Math.floor(Math.random() * (maxNumber - step * 8)) + step * 8;
        } else if (patternType.type === 'multiply') {
            // For multiplication, start small to avoid extremely large numbers
            start = Math.floor(Math.random() * 5) + 1;
        } else {
            // For addition, any start is fine
            start = Math.floor(Math.random() * (maxNumber / 2));
        }
        
        // Generate sequence
        const sequenceLength = 6; // Show 6 numbers
        const sequence = patternType.generateSequence(start, step, sequenceLength);        // Generate answer options
        const options = patternType.generateOptions(step);
        
        // Shuffle options (inline implementation)
        const optionsCopy = [...options];
        const shuffledOptions = optionsCopy.sort(() => Math.random() - 0.5);
        
        // Create the game HTML
        gameArea.innerHTML = `
            <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h3 style="text-align: center;">Pattern Detective</h3>
                <p style="text-align: center;">Find the rule that creates this number pattern</p>
                
                <div class="pattern-display">
                    ${sequence.map(num => `<div class="pattern-number">${num}</div>`).join('<div class="pattern-arrow">→</div>')}
                </div>
                
                <div style="text-align: center; margin: 30px 0 20px;">
                    <p style="font-weight: bold; margin-bottom: 15px;">What is the rule for this pattern?</p>
                    <div class="pattern-options">
                        ${shuffledOptions.map((option, index) => `
                            <div class="pattern-option" data-correct="${option.correct}">
                                <input type="radio" id="option${index}" name="patternRule" value="${index}">
                                <label for="option${index}">${option.text}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div style="margin-top: 30px; text-align: center;">
                    <div id="pattern-feedback" class="pattern-feedback"></div>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                    <p style="margin: 0;"><strong>Tips:</strong></p>
                    <ul style="margin-top: 5px;">
                        <li>Look at how each number changes from left to right</li>
                        <li>Try to find a consistent operation (addition, subtraction, etc.)</li>
                        <li>Test your rule to see if it works for all numbers in the pattern</li>
                    </ul>
                </div>
            </div>
        `;
        
        // Add styles for pattern detective game
        const style = document.createElement('style');
        style.textContent = `
            .pattern-display {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                gap: 10px;
                margin: 30px 0;
                padding: 15px;
                background-color: #e3f2fd;
                border-radius: 8px;
            }
            
            .pattern-number {
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5em;
                font-weight: bold;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                border: 2px solid #2196f3;
                color: #0d47a1;
            }
            
            .pattern-arrow {
                font-size: 1.5em;
                color: #2196f3;
            }
            
            .pattern-options {
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 400px;
                margin: 0 auto;
            }
            
            .pattern-option {
                background-color: #fff;
                padding: 12px;
                border-radius: 8px;
                border: 1px solid #ddd;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
            }
            
            .pattern-option:hover {
                background-color: #f5f5f5;
                border-color: #bbb;
            }
            
            .pattern-option input {
                margin-right: 10px;
                cursor: pointer;
            }
            
            .pattern-option label {
                flex: 1;
                cursor: pointer;
                font-size: 1.1em;
            }
            
            .pattern-option.selected {
                background-color: #e1f5fe;
                border-color: #29b6f6;
            }
            
            .pattern-option.correct {
                background-color: #e8f5e9;
                border-color: #4caf50;
            }
            
            .pattern-option.incorrect {
                background-color: #ffebee;
                border-color: #ef5350;
            }
            
            .pattern-feedback {
                font-weight: bold;
                padding: 10px;
                border-radius: 5px;
                min-height: 20px;
            }
            
            .pattern-feedback.correct {
                background-color: #e8f5e9;
                color: #2e7d32;
            }
            
            .pattern-feedback.incorrect {
                background-color: #ffebee;
                color: #c62828;
            }
            
            @media (max-width: 600px) {
                .pattern-number {
                    width: 50px;
                    height: 50px;
                    font-size: 1.3em;
                }
                
                .pattern-arrow {
                    font-size: 1.2em;
                }
            }
        `;        document.head.appendChild(style);
        
        // Add event listeners for options
        const optionElements = gameArea.querySelectorAll('.pattern-option');
        optionElements.forEach(option => {
            option.addEventListener('click', function() {
                // Update radio button
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
                
                // Update UI
                optionElements.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
        
        // Store pattern information in dataset
        gameArea.dataset.pattern = JSON.stringify({
            type: patternType.type,
            step: step,
            sequence: sequence
        });
        
        // Check answer function for this game
        window.checkAnswer = function(gameArea) {
            const selectedOption = gameArea.querySelector('.pattern-option.selected');
            const feedback = document.getElementById('pattern-feedback');
            
            if (!selectedOption) {
                feedback.textContent = "Please select an answer!";
                feedback.className = "pattern-feedback incorrect";
                return;
            }
            
            const isCorrect = selectedOption.dataset.correct === 'true';
            
            if (isCorrect) {
                feedback.textContent = "Correct! You found the pattern rule!";
                feedback.className = "pattern-feedback correct";
                selectedOption.classList.add('correct');
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(2);
                UIManager.updateUserProfile();
                
                // Generate a new challenge after a delay
                setTimeout(function() {
                    Games.patternDetective(gameArea);
                }, 2500);
            } else {
                feedback.textContent = "That's not quite right. Try again!";
                feedback.className = "pattern-feedback incorrect";
                selectedOption.classList.add('incorrect');
                
                // Find the correct option and highlight it after a delay
                setTimeout(function() {
                    const correctOption = gameArea.querySelector('.pattern-option[data-correct="true"]');
                    correctOption.classList.add('correct');
                    
                    // Generate a new challenge after a longer delay
                    setTimeout(function() {
                        Games.patternDetective(gameArea);
                    }, 3000);
                }, 1500);
            }
        };
    },

    /**
     * Pattern Maker Game - Create and continue number patterns
     */
    patternMaker: function(gameArea) {
        // Determine difficulty based on user level
        const userData = DataManager.getUserData();
        let difficulty = 1; // Start with easy patterns
        let maxNumber = 50; // Maximum number in patterns
        
        if (userData.level >= 3) {
            difficulty = 2; // Medium patterns
            maxNumber = 100;
        }
        if (userData.level >= 5) {
            difficulty = 3; // Hard patterns
            maxNumber = 200;
        }
        
        // Define patterns based on difficulty
        let patterns;
        
        switch (difficulty) {
            case 1: // Easy - Addition and subtraction
                patterns = [
                    { rule: 'add', values: [2, 3, 5, 10] },
                    { rule: 'subtract', values: [1, 2, 5] }
                ];
                break;
            case 2: // Medium - Add multiplication
                patterns = [
                    { rule: 'add', values: [2, 3, 5, 10, 25] },
                    { rule: 'subtract', values: [2, 3, 5, 10] },
                    { rule: 'multiply', values: [2, 3, 5] }
                ];
                break;
            case 3: // Hard - More complex patterns
                patterns = [
                    { rule: 'add', values: [2, 3, 5, 10, 25, 50] },
                    { rule: 'subtract', values: [2, 3, 5, 10, 25] },
                    { rule: 'multiply', values: [2, 3, 5, 10] },
                    { rule: 'alternate', values: [{add: 5, multiply: 2}, {add: 10, subtract: 5}] }
                ];
                break;
        }
        
        // Select a random pattern
        const patternIndex = Math.floor(Math.random() * patterns.length);
        const pattern = patterns[patternIndex];
        
        // Generate pattern parameters
        const valueIndex = Math.floor(Math.random() * pattern.values.length);
        const step = pattern.values[valueIndex];
        
        // Determine starting number and generate sequence based on pattern type
        let start, sequence, ruleDescription;
        
        if (pattern.rule === 'add') {
            start = Math.floor(Math.random() * (maxNumber / 2));
            sequence = [start];
            for (let i = 1; i < 8; i++) { // Generate 8 numbers in sequence
                sequence.push(sequence[i - 1] + step);
            }
            ruleDescription = `Add ${step} to each number`;
        } 
        else if (pattern.rule === 'subtract') {
            // For subtraction, start higher to avoid negative numbers
            start = Math.floor(Math.random() * (maxNumber - step * 10)) + step * 10;
            sequence = [start];
            for (let i = 1; i < 8; i++) {
                sequence.push(sequence[i - 1] - step);
            }
            ruleDescription = `Subtract ${step} from each number`;
        } 
        else if (pattern.rule === 'multiply') {
            // For multiplication, start small to avoid extremely large numbers
            start = Math.floor(Math.random() * 5) + 1;
            sequence = [start];
            for (let i = 1; i < 8; i++) {
                sequence.push(sequence[i - 1] * step);
            }
            ruleDescription = `Multiply each number by ${step}`;
        } 
        else if (pattern.rule === 'alternate') {
            // For alternating patterns
            start = Math.floor(Math.random() * 20) + 1;
            sequence = [start];
            
            const alternateRules = step; // In this case, step is an object with two rules
            let ruleDescriptions = [];
            
            for (let i = 1; i < 8; i++) {
                const previousNum = sequence[i - 1];
                let nextNum;
                
                if (i % 2 === 1) {
                    // First rule
                    if ('add' in alternateRules) {
                        nextNum = previousNum + alternateRules.add;
                        ruleDescriptions.push(`add ${alternateRules.add}`);
                    } else if ('multiply' in alternateRules) {
                        nextNum = previousNum * alternateRules.multiply;
                        ruleDescriptions.push(`multiply by ${alternateRules.multiply}`);
                    }
                } else {
                    // Second rule
                    if ('subtract' in alternateRules) {
                        nextNum = previousNum - alternateRules.subtract;
                        ruleDescriptions.push(`subtract ${alternateRules.subtract}`);
                    } else if ('add' in alternateRules) {
                        nextNum = previousNum + alternateRules.add;
                        ruleDescriptions.push(`add ${alternateRules.add}`);
                    }
                }
                sequence.push(nextNum);
            }
            
            // Remove duplicate descriptions and create alternating pattern description
            const uniqueDescriptions = [...new Set(ruleDescriptions)];
            ruleDescription = uniqueDescriptions.join(', then ') + ', repeat';
        }
        
        // Create the game HTML
        gameArea.innerHTML = `
            <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h3 style="text-align: center;">Pattern Maker</h3>
                <p style="text-align: center;">Complete the pattern by entering the missing numbers</p>
                
                <div class="pattern-maker-container">
                    <div class="pattern-maker-header">
                        <div>Pattern Rule: <span id="pattern-rule" style="font-weight: bold; color: #2196f3;">?</span></div>
                        <button id="reveal-rule-btn" class="btn btn-small">Reveal Rule</button>
                    </div>
                    
                    <div class="pattern-maker-sequence">
                        ${sequence.slice(0, 4).map((num, index) => `
                            <div class="pattern-number">${num}</div>
                            ${index < 3 ? '<div class="pattern-arrow">→</div>' : ''}
                        `).join('')}
                        ${sequence.slice(4).map((num, index) => `
                            ${index > 0 ? '<div class="pattern-arrow">→</div>' : ''}
                            <div class="pattern-number empty">
                                <input type="text" class="pattern-input" data-index="${index + 4}" placeholder="?">
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="pattern-maker-feedback" id="pattern-feedback"></div>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                    <p style="margin: 0;"><strong>How to Play:</strong></p>
                    <ul style="margin-top: 5px;">
                        <li>Look at the pattern in the first four numbers</li>
                        <li>Figure out what rule is being followed</li>
                        <li>Fill in the next four numbers based on that rule</li>
                        <li>If you get stuck, you can reveal the rule, but you'll earn fewer points</li>
                    </ul>
                </div>
            </div>
        `;
        
        // Add styles for pattern maker game
        const style = document.createElement('style');
        style.textContent = `
            .pattern-maker-container {
                margin: 30px 0;
            }
            
            .pattern-maker-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            
            .btn-small {
                padding: 5px 10px;
                font-size: 0.9em;
                background-color: #f5f5f5;
                color: #555;
                border: 1px solid #ddd;
            }
            
            .pattern-maker-sequence {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                gap: 10px;
                padding: 15px;
                background-color: #e3f2fd;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            
            .pattern-number {
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5em;
                font-weight: bold;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                border: 2px solid #2196f3;
                color: #0d47a1;
            }
            
            .pattern-number.empty {
                background-color: #f5f5f5;
                border: 2px dashed #2196f3;
            }
            
            .pattern-input {
                width: 100%;
                height: 100%;
                border: none;
                background: transparent;
                text-align: center;
                font-size: 1.2em;
                font-weight: bold;
                color: #0d47a1;
            }
            
            .pattern-input.correct {
                background-color: #e8f5e9;
                color: #2e7d32;
            }
            
            .pattern-input.incorrect {
                background-color: #ffebee;
                color: #c62828;
            }
            
            .pattern-maker-feedback {
                text-align: center;
                font-weight: bold;
                padding: 10px;
                border-radius: 5px;
                min-height: 20px;
            }
            
            .feedback-correct {
                background-color: #e8f5e9;
                color: #2e7d32;
            }
            
            .feedback-incorrect {
                background-color: #ffebee;
                color: #c62828;
            }
            
            .feedback-hint {
                background-color: #fff8e1;
                color: #f57c00;
            }
        `;
        document.head.appendChild(style);
        
        // Store pattern information in dataset
        gameArea.dataset.pattern = JSON.stringify({
            rule: pattern.rule,
            step: step,
            sequence: sequence,
            ruleDescription: ruleDescription
        });
        
        // Make all inputs focus the next input when filled
        const inputs = gameArea.querySelectorAll('.pattern-input');
        inputs.forEach((input, index) => {
            input.addEventListener('input', function() {
                // Clear any previous styling
                this.classList.remove('correct', 'incorrect');
                
                // If input contains a value and not the last input, focus the next one
                if (this.value && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });
            
            // Enter key should submit if it's the last input
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && index === inputs.length - 1) {
                    document.getElementById('check-answer').click();
                }
            });
        });
        
        // Add event listener for reveal rule button
        const revealRuleBtn = document.getElementById('reveal-rule-btn');
        revealRuleBtn.addEventListener('click', function() {
            const patternData = JSON.parse(gameArea.dataset.pattern);
            document.getElementById('pattern-rule').textContent = patternData.ruleDescription;
            this.disabled = true;
            
            // Mark as hint used
            gameArea.dataset.hintUsed = 'true';
            
            // Show hint feedback
            const feedback = document.getElementById('pattern-feedback');
            feedback.textContent = "Rule revealed! You'll earn fewer points now.";
            feedback.className = "pattern-maker-feedback feedback-hint";
        });
        
        // Check answer function for this game
        window.checkAnswer = function(gameArea) {
            const patternData = JSON.parse(gameArea.dataset.pattern);
            const sequence = patternData.sequence;
            const inputs = gameArea.querySelectorAll('.pattern-input');
            const feedback = document.getElementById('pattern-feedback');
            
            // Check if all inputs have values
            let allFilled = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    allFilled = false;
                }
            });
            
            if (!allFilled) {
                feedback.textContent = "Please fill in all the missing numbers!";
                feedback.className = "pattern-maker-feedback feedback-incorrect";
                return;
            }
            
            // Check if all inputs are correct
            let allCorrect = true;
            let correctCount = 0;
            
            inputs.forEach(input => {
                const index = parseInt(input.dataset.index);
                const expectedValue = sequence[index];
                const userValue = parseInt(input.value.trim());
                
                if (isNaN(userValue) || userValue !== expectedValue) {
                    input.classList.add('incorrect');
                    allCorrect = false;
                } else {
                    input.classList.add('correct');
                    correctCount++;
                }
            });
            
            if (allCorrect) {
                feedback.textContent = "Perfect! You completed the pattern correctly!";
                feedback.className = "pattern-maker-feedback feedback-correct";
                
                // Award points based on whether hint was used
                const hintUsed = gameArea.dataset.hintUsed === 'true';
                const points = hintUsed ? 1 : 3; // Less points if hint was used
                
                const unlocked = DataManager.updateUserProgress(points);
                UIManager.updateUserProfile();
                
                // Generate a new challenge after a delay
                setTimeout(function() {
                    Games.patternMaker(gameArea);
                }, 2500);
            } else {
                // Provide feedback based on how many are correct
                if (correctCount > 0) {
                    feedback.textContent = `You got ${correctCount} out of 4 numbers correct. Try again!`;
                } else {
                    feedback.textContent = "None of the numbers are correct. Try a different approach!";
                }
                feedback.className = "pattern-maker-feedback feedback-incorrect";
            }
        };
    },

    /**
     * Sequence Completer Game - Complete more complex number patterns
     */
    sequenceCompleter: function(gameArea) {
        // Determine difficulty based on user level
        const userData = DataManager.getUserData();
        let difficulty = 1; // Start with easy patterns
        
        if (userData.level >= 3) {
            difficulty = 2; // Medium patterns
        }
        if (userData.level >= 5) {
            difficulty = 3; // Hard patterns
        }
        
        // Define sequence types based on difficulty
        const sequenceTypes = [
            // Easy sequences
            {
                name: 'Even Numbers',
                description: 'Numbers that can be divided by 2 with no remainder',
                generator: (startIndex, count) => {
                    const result = [];
                    for (let i = 0; i < count; i++) {
                        result.push((startIndex + i) * 2);
                    }
                    return result;
                }
            },
            {
                name: 'Odd Numbers',
                description: 'Numbers that leave a remainder of 1 when divided by 2',
                generator: (startIndex, count) => {
                    const result = [];
                    for (let i = 0; i < count; i++) {
                        result.push((startIndex + i) * 2 + 1);
                    }
                    return result;
                }
            },
            // Medium sequences
            {
                name: 'Square Numbers',
                description: 'Numbers that are the result of multiplying a number by itself',
                generator: (startIndex, count) => {
                    const result = [];
                    for (let i = 0; i < count; i++) {
                        const number = startIndex + i;
                        result.push(number * number);
                    }
                    return result;
                }
            },
            {
                name: 'Triangle Numbers',
                description: 'Numbers that can form triangles (1, 3, 6, 10, ...)',
                generator: (startIndex, count) => {
                    const result = [];
                    for (let i = 0; i < count; i++) {
                        const number = startIndex + i;
                        result.push((number * (number + 1)) / 2);
                    }
                    return result;
                }
            },
            // Hard sequences
            {
                name: 'Fibonacci Sequence',
                description: 'Each number is the sum of the two preceding ones',
                generator: (startIndex, count) => {
                    // Calculate Fibonacci starting from index (not value)
                    // First get the actual first two values at the starting index
                    let a = 0, b = 1;
                    for (let i = 0; i < startIndex; i++) {
                        const temp = a + b;
                        a = b;
                        b = temp;
                    }
                    
                    const result = [];
                    for (let i = 0; i < count; i++) {
                        if (i === 0) {
                            result.push(b);
                        } else {
                            const temp = a + b;
                            a = b;
                            b = temp;
                            result.push(b);
                        }
                    }
                    return result;
                }
            },
            {
                name: 'Powers of 2',
                description: 'Starting from 1, each number is doubled',
                generator: (startIndex, count) => {
                    const result = [];
                    for (let i = 0; i < count; i++) {
                        result.push(Math.pow(2, startIndex + i));
                    }
                    return result;
                }
            }
        ];
        
        // Select available sequence types based on difficulty
        let availableSequences;
        switch (difficulty) {
            case 1:
                availableSequences = sequenceTypes.slice(0, 2);
                break;
            case 2:
                availableSequences = sequenceTypes.slice(0, 4);
                break;
            case 3:
                availableSequences = sequenceTypes;
                break;
        }
        
        // Select a random sequence type
        const sequenceIndex = Math.floor(Math.random() * availableSequences.length);
        const selectedSequence = availableSequences[sequenceIndex];
        
        // Determine starting position and generate sequence
        const startingIndex = Math.floor(Math.random() * 5) + 1; // Start between 1-5
        const sequenceLength = 8; // Generate 8 numbers in the sequence
        const sequence = selectedSequence.generator(startingIndex, sequenceLength);
        
        // Randomly select positions to hide (between 3-5 positions)
        const numHidden = Math.floor(Math.random() * 3) + 3;
        const hiddenPositions = [];
        
        // Make sure at least one visible number at the start to give context
        while (hiddenPositions.length < numHidden) {
            const pos = Math.floor(Math.random() * (sequenceLength - 1)) + 1;
            if (!hiddenPositions.includes(pos)) {
                hiddenPositions.push(pos);
            }
        }
        
        // Create the game HTML
        gameArea.innerHTML = `
            <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h3 style="text-align: center;">Sequence Completer</h3>
                <p style="text-align: center;">Fill in the missing numbers in the ${selectedSequence.name} sequence</p>
                
                <div class="sequence-info">
                    <div class="sequence-name">${selectedSequence.name}</div>
                    <div class="sequence-description">${selectedSequence.description}</div>
                </div>
                
                <div class="sequence-display">
                    ${sequence.map((num, index) => {
                        if (hiddenPositions.includes(index)) {
                            return `
                                <div class="sequence-number hidden">
                                    <input type="text" class="sequence-input" data-index="${index}" data-correct="${num}" placeholder="?">
                                </div>
                            `;
                        } else {
                            return `
                                <div class="sequence-number">${num}</div>
                            `;
                        }
                    }).join('')}
                </div>
                
                <div class="sequence-feedback" id="sequence-feedback"></div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                    <p style="margin: 0;"><strong>Tips:</strong></p>
                    <ul style="margin-top: 5px;">
                        <li>Study the visible numbers to understand the pattern</li>
                        <li>Remember the properties of ${selectedSequence.name}</li>
                        <li>Trace the pattern forward and backward to verify your answers</li>
                    </ul>
                </div>
            </div>
        `;
        
        // Add styles for sequence completer game
        const style = document.createElement('style');
        style.textContent = `
            .sequence-info {
                margin: 20px 0;
                text-align: center;
            }
            
            .sequence-name {
                font-size: 1.2em;
                font-weight: bold;
                color: #2196f3;
                margin-bottom: 5px;
            }
            
            .sequence-description {
                font-style: italic;
                color: #666;
            }
            
            .sequence-display {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
                gap: 15px;
                margin: 30px 0;
                padding: 20px;
                background-color: #e3f2fd;
                border-radius: 8px;
            }
            
            .sequence-number {
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.3em;
                font-weight: bold;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                border: 2px solid #2196f3;
                color: #0d47a1;
            }
            
            .sequence-number.hidden {
                background-color: #f5f5f5;
                border: 2px dashed #2196f3;
            }
            
            .sequence-input {
                width: 100%;
                height: 100%;
                border: none;
                background: transparent;
                text-align: center;
                font-size: 1.2em;
                font-weight: bold;
                color: #0d47a1;
            }
            
            .sequence-input.correct {
                background-color: #e8f5e9;
                color: #2e7d32;
            }
            
            .sequence-input.incorrect {
                background-color: #ffebee;
                color: #c62828;
            }
            
            .sequence-feedback {
                text-align: center;
                font-weight: bold;
                padding: 10px;
                border-radius: 5px;
                min-height: 20px;
            }
            
            .feedback-correct {
                background-color: #e8f5e9;
                color: #2e7d32;
            }
            
            .feedback-incorrect {
                background-color: #ffebee;
                color: #c62828;
            }
            
            .feedback-partial {
                background-color: #fff8e1;
                color: #f57c00;
            }
        `;
        document.head.appendChild(style);
        
        // Add event listeners for inputs
        const inputs = gameArea.querySelectorAll('.sequence-input');
        inputs.forEach((input, index) => {
            // Remove any existing status classes on input
            input.addEventListener('input', function() {
                this.classList.remove('correct', 'incorrect');
                
                // If input contains a value and not the last input, focus the next one
                if (this.value && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });
            
            // Enter key should submit if it's the last input
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && index === inputs.length - 1) {
                    document.getElementById('check-answer').click();
                }
            });
        });
        
        // Check answer function for this game
        window.checkAnswer = function(gameArea) {
            const inputs = gameArea.querySelectorAll('.sequence-input');
            const feedback = document.getElementById('sequence-feedback');
            
            // Check if all inputs have values
            let allFilled = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    allFilled = false;
                }
            });
            
            if (!allFilled) {
                feedback.textContent = "Please fill in all the missing numbers!";
                feedback.className = "sequence-feedback feedback-incorrect";
                return;
            }
            
            // Check if all inputs are correct
            let allCorrect = true;
            let correctCount = 0;
            
            inputs.forEach(input => {
                const correctValue = parseInt(input.dataset.correct);
                const userValue = parseInt(input.value.trim());
                
                if (isNaN(userValue) || userValue !== correctValue) {
                    input.classList.add('incorrect');
                    allCorrect = false;
                } else {
                    input.classList.add('correct');
                    correctCount++;
                }
            });
            
            if (allCorrect) {
                feedback.textContent = "Excellent! You completed the sequence correctly!";
                feedback.className = "sequence-feedback feedback-correct";
                
                // Award points based on difficulty and number of correct answers
                const points = 2 + difficulty; // 3-5 points based on difficulty
                
                const unlocked = DataManager.updateUserProgress(points);
                UIManager.updateUserProfile();
                
                // Animation for correct answer
                inputs.forEach(input => {
                    input.classList.add('pulse');
                });
                
                // Generate a new challenge after a delay
                setTimeout(function() {
                    Games.sequenceCompleter(gameArea);
                }, 2500);
            } else {
                // Provide feedback based on how many are correct
                const totalInputs = inputs.length;
                if (correctCount > 0) {
                    feedback.textContent = `You got ${correctCount} out of ${totalInputs} numbers correct. Keep trying!`;
                    feedback.className = "sequence-feedback feedback-partial";
                } else {
                    feedback.textContent = "None of the numbers are correct. Study the pattern more carefully!";
                    feedback.className = "sequence-feedback feedback-incorrect";
                }
            }
        };
    },

    /**
     * Utility function to shuffle an array (Fisher-Yates algorithm)
     */
    shuffleArray: function(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },
};

export default Games;
