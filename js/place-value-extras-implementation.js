/**
 * place-value-extras-implementation.js - Additional place value games
 */

// Ensure Games object exists
window.Games = window.Games || {};

/**
 * Face Value Challenge Game - Learn the difference between face value and place value
 */
window.Games.faceValueChallenge = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let digits = 3;
    if (userData.level >= 3) digits = 4;
    if (userData.level >= 5) digits = 5;
    
    // Generate a random number
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    const numberDigits = number.toString().split('');
    
    // Define place values based on number of digits
    const places = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands'];
    const placeValues = places.slice(0, digits).reverse();
    
    // Pick a random digit to ask about
    const questionIndex = Math.floor(Math.random() * digits);
    const questionDigit = numberDigits[questionIndex];
    const digitPosition = placeValues[questionIndex];
    const faceValue = parseInt(questionDigit);
    const placeValue = faceValue * Math.pow(10, digits - questionIndex - 1);
    
    // Choose whether to ask about face value or place value
    const askAboutFaceValue = Math.random() > 0.5;
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Face Value Challenge</h3>
            <p style="text-align: center;">Understand the difference between face value and place value</p>
            
            <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <div style="font-size: 2em; font-weight: bold; letter-spacing: 10px; margin-bottom: 20px;">
                    ${numberDigits.map((d, i) => 
                        i === questionIndex ? 
                        `<span style="color: #f44336; text-decoration: underline; font-size: 1.2em;">${d}</span>` : 
                        d
                    ).join('')}
                </div>
                
                <div style="font-weight: bold; margin-top: 10px;">
                    ${askAboutFaceValue ? 
                        `What is the <span style="color: #f44336;">face value</span> of the highlighted digit?` : 
                        `What is the <span style="color: #f44336;">place value</span> of the highlighted digit?`
                    }
                </div>
            </div>
            
            <div style="margin: 30px 0;">
                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                    ${generateAnswerOptions(askAboutFaceValue ? faceValue : placeValue).map(option => `
                        <button class="value-option" data-value="${option}" data-correct="${option === (askAboutFaceValue ? faceValue : placeValue)}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div id="facevalue-feedback" class="feedback-message"></div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin-top: 0;"><strong>Remember:</strong></p>
                <ul>
                    <li><strong>Face Value</strong> is the actual digit itself (0-9)</li>
                    <li><strong>Place Value</strong> is the value of the digit based on its position (ones, tens, etc.)</li>
                    <li>For example, in 352, the face value of 5 is 5, but its place value is 50 (5 tens)</li>
                </ul>
            </div>
        </div>
    `;
    
    // Add styles for the game
    const style = document.createElement('style');
    style.textContent = `
        .value-option {
            padding: 15px 25px;
            font-size: 1.2em;
            background-color: #fff;
            border: 2px solid #2196f3;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            color: #0d47a1;
            font-weight: bold;
        }
        
        .value-option:hover {
            background-color: #e3f2fd;
        }
        
        .value-option.selected {
            background-color: #bbdefb;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .value-option.correct {
            background-color: #c8e6c9;
            border-color: #4caf50;
        }
        
        .value-option.incorrect {
            background-color: #ffcdd2;
            border-color: #f44336;
        }
        
        .feedback-message {
            margin-top: 20px;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            min-height: 24px;
        }
        
        .feedback-message.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .feedback-message.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners for options
    const options = gameArea.querySelectorAll('.value-option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });
    
    // Store correct answer in dataset for checking
    gameArea.dataset.correctAnswer = askAboutFaceValue ? faceValue : placeValue;
    gameArea.dataset.questionType = askAboutFaceValue ? 'face' : 'place';
    gameArea.dataset.digit = questionDigit;
    gameArea.dataset.position = digitPosition;
    
    // Override check answer function
    window.checkAnswer = function(gameArea) {
        const selectedOption = gameArea.querySelector('.value-option.selected');
        const feedback = document.getElementById('facevalue-feedback');
        
        if (!selectedOption) {
            feedback.textContent = "Please select an answer!";
            feedback.className = "feedback-message incorrect";
            return;
        }
        
        const userAnswer = parseInt(selectedOption.dataset.value);
        const correctAnswer = parseInt(gameArea.dataset.correctAnswer);
        const questionType = gameArea.dataset.questionType;
        const digit = gameArea.dataset.digit;
        const position = gameArea.dataset.position;
        
        if (userAnswer === correctAnswer) {
            feedback.textContent = `Correct! The ${questionType} value of ${digit} in the ${position} position is ${correctAnswer}.`;
            feedback.className = "feedback-message correct";
            selectedOption.classList.add('correct');
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(1);
            UIManager.updateUserProfile();
            
            // Generate a new question after a delay
            setTimeout(() => {
                window.Games.faceValueChallenge(gameArea);
            }, 2500);
        } else {
            feedback.textContent = `Not quite right. Try again!`;
            feedback.className = "feedback-message incorrect";
            selectedOption.classList.add('incorrect');
            
            // Shake the incorrect option
            selectedOption.classList.add('shake');
            setTimeout(() => {
                selectedOption.classList.remove('shake');
            }, 500);
        }
    };
    
    // Helper function to generate answer options including the correct one
    function generateAnswerOptions(correctAnswer) {
        const options = [correctAnswer];
        
        // Generate wrong options based on the correct answer
        if (correctAnswer < 10) {
            // For face value (small numbers)
            while (options.length < 4) {
                const wrongOption = Math.floor(Math.random() * 9) + 1;
                if (!options.includes(wrongOption)) {
                    options.push(wrongOption);
                }
            }
        } else {
            // For place value (larger numbers)
            // Add some options that are powers of 10 multiplied by a digit
            const magnitude = Math.floor(Math.log10(correctAnswer));
            
            // Add options that are similar but wrong
            while (options.length < 4) {
                let wrongOption;
                const rand = Math.random();
                
                if (rand < 0.33) {
                    // Option 1: Same magnitude but different digit
                    const wrongDigit = Math.floor(Math.random() * 9) + 1;
                    wrongOption = wrongDigit * Math.pow(10, magnitude);
                } else if (rand < 0.66) {
                    // Option 2: Same digit but different magnitude
                    const wrongMagnitude = Math.max(0, magnitude + (Math.random() > 0.5 ? 1 : -1));
                    wrongOption = Math.floor(correctAnswer / Math.pow(10, magnitude)) * Math.pow(10, wrongMagnitude);
                } else {
                    // Option 3: Completely different
                    wrongOption = Math.floor(Math.random() * Math.pow(10, magnitude + 1));
                }
                
                if (wrongOption !== correctAnswer && !options.includes(wrongOption) && wrongOption > 0) {
                    options.push(wrongOption);
                }
            }
        }
        
        // Shuffle the options
        return options.sort(() => Math.random() - 0.5);
    }
};

/**
 * Place Value Blocks Game - Build numbers using place value blocks
 */
window.Games.placeValueBlocks = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let digits = 3;
    if (userData.level >= 3) digits = 4;
    if (userData.level >= 5) digits = 5;
    
    // Generate a target number
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    const targetNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const numberDigits = targetNumber.toString().split('');
    
    // Define place values based on number of digits
    const places = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands'];
    const placeValues = places.slice(0, digits).reverse();
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Place Value Blocks</h3>
            <p style="text-align: center;">Build the number using place value blocks</p>
            
            <div style="text-align: center; margin: 20px 0; font-size: 2em; font-weight: bold;">
                ${targetNumber}
            </div>
            
            <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; margin: 30px 0;">
                ${placeValues.map((place, i) => `
                    <div class="place-block" data-place="${place}" data-position="${i}">
                        <div class="block-label">${place.charAt(0).toUpperCase() + place.slice(1)}</div>
                        <div class="block-value" style="background-color: ${getBlockColor(i)};">
                            <input type="number" min="0" max="9" class="block-input" value="0" data-multiplier="${Math.pow(10, digits - i - 1)}">
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 1.2em; margin-bottom: 10px;">Your number: <span id="current-value">0</span></div>
                <div id="blocks-feedback" class="feedback-message"></div>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin-top: 0;"><strong>How to Play:</strong></p>
                <ul>
                    <li>Change the value of each place value block using the input field</li>
                    <li>Try to build the number shown above</li>
                    <li>The value will update automatically as you change the blocks</li>
                </ul>
            </div>
        </div>
    `;
    
    // Add styles for the game
    const style = document.createElement('style');
    style.textContent = `
        .place-block {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100px;
        }
        
        .block-label {
            text-align: center;
            margin-bottom: 5px;
            font-weight: bold;
        }
        
        .block-value {
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .block-input {
            width: 50px;
            height: 50px;
            font-size: 1.5em;
            text-align: center;
            border: none;
            background: transparent;
            color: white;
            font-weight: bold;
            -webkit-text-stroke: 0.5px black;
        }
        
        .block-input:focus {
            outline: 2px solid white;
            border-radius: 4px;
        }
        
        /* Hide spinners for number input */
        .block-input::-webkit-outer-spin-button,
        .block-input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        
        .block-input[type=number] {
            -moz-appearance: textfield;
        }
        
        .feedback-message {
            margin-top: 20px;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            min-height: 24px;
        }
        
        .feedback-message.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .feedback-message.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners for block inputs
    const inputs = gameArea.querySelectorAll('.block-input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Enforce limits (0-9)
            let value = parseInt(this.value) || 0;
            value = Math.max(0, Math.min(9, value));
            this.value = value;
            
            // Update the current value
            updateCurrentValue();
            
            // Check if the answer is correct
            checkIfCorrect();
        });
    });
    
    // Store target number in dataset
    gameArea.dataset.targetNumber = targetNumber;
    
    // Update the current value based on inputs
    function updateCurrentValue() {
        const inputs = gameArea.querySelectorAll('.block-input');
        let currentValue = 0;
        
        inputs.forEach(input => {
            const value = parseInt(input.value) || 0;
            const multiplier = parseInt(input.dataset.multiplier);
            currentValue += value * multiplier;
        });
        
        const currentValueEl = document.getElementById('current-value');
        currentValueEl.textContent = currentValue;
        
        // Highlight if matches target
        if (currentValue === targetNumber) {
            currentValueEl.style.color = '#4caf50';
            currentValueEl.style.fontWeight = 'bold';
        } else {
            currentValueEl.style.color = '';
            currentValueEl.style.fontWeight = '';
        }
    }
    
    // Check if the answer is correct
    function checkIfCorrect() {
        const currentValue = parseInt(document.getElementById('current-value').textContent);
        const targetNumber = parseInt(gameArea.dataset.targetNumber);
        
        if (currentValue === targetNumber) {
            const feedback = document.getElementById('blocks-feedback');
            feedback.textContent = 'Perfect! You built the number correctly!';
            feedback.className = 'feedback-message correct';
        }
    }
    
    // Helper function to get color for place value blocks
    function getBlockColor(index) {
        const colors = [
            '#f44336', // ones - red
            '#2196f3', // tens - blue
            '#4caf50', // hundreds - green
            '#ff9800', // thousands - orange
            '#9c27b0'  // ten thousands - purple
        ];
        return colors[index % colors.length];
    }
    
    // Override check answer function for this game
    window.checkAnswer = function(gameArea) {
        const currentValue = parseInt(document.getElementById('current-value').textContent);
        const targetNumber = parseInt(gameArea.dataset.targetNumber);
        const feedback = document.getElementById('blocks-feedback');
        
        if (currentValue === targetNumber) {
            feedback.textContent = 'Perfect! You built the number correctly!';
            feedback.className = 'feedback-message correct';
            
            // Pulse animation on blocks
            const blocks = gameArea.querySelectorAll('.block-value');
            blocks.forEach(block => {
                block.classList.add('pulse');
            });
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(() => {
                window.Games.placeValueBlocks(gameArea);
            }, 2500);
        } else {
            feedback.textContent = 'Not quite right. Try again!';
            feedback.className = 'feedback-message incorrect';
            
            // Hint - show which places are wrong
            const inputs = gameArea.querySelectorAll('.block-input');
            const targetDigits = targetNumber.toString().padStart(inputs.length, '0').split('');
            
            inputs.forEach((input, i) => {
                const reverseIndex = inputs.length - i - 1;
                const targetValue = parseInt(targetDigits[reverseIndex] || 0);
                const userValue = parseInt(input.value) || 0;
                
                if (userValue !== targetValue) {
                    input.parentElement.classList.add('pulse');
                    setTimeout(() => {
                        input.parentElement.classList.remove('pulse');
                    }, 500);
                }
            });
        }
    };
};

// More place value related functions can be added here
