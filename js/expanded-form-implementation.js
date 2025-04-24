/**
 * expanded-form-implementation.js - Implementation of expanded form games
 */

// Ensure Games object exists
window.Games = window.Games || {};

/**
 * Number Breaker Game - Break down numbers into expanded form
 */
window.Games.numberBreaker = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let digits = 3;
    if (userData.level >= 3) digits = 4;
    if (userData.level >= 5) digits = 5;
    
    // Generate a random number
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Create expanded form
    const numberStr = number.toString();
    const expandedForm = [];
    
    for (let i = 0; i < numberStr.length; i++) {
        const digit = parseInt(numberStr[i]);
        if (digit !== 0) {
            const placeValue = Math.pow(10, numberStr.length - i - 1);
            expandedForm.push(digit * placeValue);
        }
    }
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Number Breaker</h3>
            <p style="text-align: center;">Break down the number into expanded form</p>
            
            <div style="text-align: center; margin: 30px 0; font-size: 3em; font-weight: bold; color: #0d47a1;">
                ${number}
            </div>
            
            <div class="number-breaker-container">
                <div class="number-breaker-parts">
                    ${numberStr.split('').map((digit, i) => {
                        const placeValue = Math.pow(10, numberStr.length - i - 1);
                        return parseInt(digit) === 0 ? '' : `
                            <div class="number-part">
                                <input type="text" class="part-input" data-index="${i}" placeholder="?">
                            </div>
                            ${i < numberStr.length - 1 && expandedForm.length > i+1 ? '<div class="number-operator">+</div>' : ''}
                        `;
                    }).join('')}
                </div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button id="check-expanded-form" class="btn btn-primary">Check My Answer</button>
                </div>
                
                <div id="expanded-feedback" class="feedback-message"></div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin-top: 0;"><strong>Expanded Form Tips:</strong></p>
                <ul>
                    <li>Break the number down by place value</li>
                    <li>Each digit is multiplied by its place value (ones, tens, hundreds, etc.)</li>
                    <li>Example: 352 = 300 + 50 + 2</li>
                    <li>Skip any place with a zero digit</li>
                </ul>
            </div>
        </div>
    `;
    
    // Add styles for number breaker game
    const style = document.createElement('style');
    style.textContent = `
        .number-breaker-container {
            margin: 30px 0;
        }
        
        .number-breaker-parts {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .number-part {
            display: flex;
            align-items: center;
        }
        
        .part-input {
            width: 80px;
            height: 50px;
            font-size: 1.3em;
            text-align: center;
            border: 2px solid #2196f3;
            border-radius: 8px;
            color: #0d47a1;
            background-color: white;
            font-weight: bold;
        }
        
        .part-input.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
        }
        
        .part-input.incorrect {
            background-color: #ffebee;
            border-color: #f44336;
        }
        
        .number-operator {
            font-size: 1.5em;
            font-weight: bold;
            margin: 0 5px;
            color: #2196f3;
        }
        
        .btn-primary {
            background-color: #2196f3;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 1em;
            cursor: pointer;
        }
        
        .btn-primary:hover {
            background-color: #0d8bf2;
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
    
    // Store correct answers in dataset
    gameArea.dataset.expandedForm = JSON.stringify(expandedForm);
    
    // Add event listener for check button
    document.getElementById('check-expanded-form').addEventListener('click', function() {
        checkExpandedForm();
    });
    
    // Add event listeners for input validations
    const inputs = gameArea.querySelectorAll('.part-input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Only allow numbers
            this.value = this.value.replace(/[^\d]/g, '');
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkExpandedForm();
            }
        });
    });
    
    // Function to check expanded form answers
    function checkExpandedForm() {
        const inputs = gameArea.querySelectorAll('.part-input');
        const feedback = document.getElementById('expanded-feedback');
        const correctValues = JSON.parse(gameArea.dataset.expandedForm);
        
        let allCorrect = true;
        let emptyInputs = false;
        
        inputs.forEach((input, index) => {
            const userAnswer = input.value.trim();
            
            if (userAnswer === '') {
                emptyInputs = true;
            } else if (parseInt(userAnswer) === correctValues[index]) {
                input.classList.add('correct');
                input.classList.remove('incorrect');
            } else {
                input.classList.add('incorrect');
                input.classList.remove('correct');
                allCorrect = false;
            }
        });
        
        if (emptyInputs) {
            feedback.textContent = 'Please fill in all the parts of the expanded form!';
            feedback.className = 'feedback-message incorrect';
            return;
        }
        
        if (allCorrect) {
            feedback.textContent = 'Excellent! You correctly broke down the number into expanded form.';
            feedback.className = 'feedback-message correct';
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.numberBreaker(gameArea);
            }, 2500);
        } else {
            feedback.textContent = 'Some parts are incorrect. Check your work and try again!';
            feedback.className = 'feedback-message incorrect';
        }
    }
    
    // Override global check answer function
    window.checkAnswer = function(gameArea) {
        checkExpandedForm();
    };
};

/**
 * Expanded Form Builder Game - Build numbers from expanded form
 */
window.Games.expandedFormBuilder = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let digits = 3;
    if (userData.level >= 3) digits = 4;
    if (userData.level >= 5) digits = 5;
    
    // Generate a random number
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Create expanded form
    const numberStr = number.toString();
    const expandedForm = [];
    
    for (let i = 0; i < numberStr.length; i++) {
        const digit = parseInt(numberStr[i]);
        if (digit !== 0) {
            const placeValue = Math.pow(10, numberStr.length - i - 1);
            expandedForm.push(digit * placeValue);
        }
    }
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Expanded Form Builder</h3>
            <p style="text-align: center;">Convert the expanded form into a standard number</p>
            
            <div style="text-align: center; margin: 30px 0; font-size: 1.8em; font-weight: bold; color: #0d47a1;">
                ${expandedForm.join(' + ')}
            </div>
            
            <div class="expanded-form-builder">
                <div class="builder-input-container">
                    <input type="text" id="standard-form-input" class="builder-input" placeholder="Enter the number">
                </div>
                
                <div id="builder-feedback" class="feedback-message"></div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin-top: 0;"><strong>How to Convert Expanded Form:</strong></p>
                <ul>
                    <li>Look at each part of the expanded form</li>
                    <li>Add all the parts together</li>
                    <li>Write the result as a single number</li>
                    <li>Example: 300 + 50 + 2 = 352</li>
                </ul>
            </div>
        </div>
    `;
    
    // Add styles for expanded form builder
    const style = document.createElement('style');
    style.textContent = `
        .expanded-form-builder {
            margin: 30px 0;
            text-align: center;
        }
        
        .builder-input-container {
            display: inline-block;
            margin-bottom: 20px;
        }
        
        .builder-input {
            width: 150px;
            height: 60px;
            font-size: 1.8em;
            text-align: center;
            border: 2px solid #2196f3;
            border-radius: 8px;
            color: #0d47a1;
            background-color: white;
            font-weight: bold;
            padding: 5px 10px;
        }
        
        .builder-input.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
        }
        
        .builder-input.incorrect {
            background-color: #ffebee;
            border-color: #f44336;
        }
        
        .feedback-message {
            margin: 20px auto;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            min-height: 24px;
            max-width: 400px;
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
    
    // Store correct answer in dataset
    gameArea.dataset.correctAnswer = number.toString();
    
    // Add event listeners for input validation
    const input = document.getElementById('standard-form-input');
    input.addEventListener('input', function() {
        // Only allow numbers
        this.value = this.value.replace(/[^\d]/g, '');
    });
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    
    // Function to check the answer
    function checkAnswer() {
        const userAnswer = input.value.trim();
        const correctAnswer = gameArea.dataset.correctAnswer;
        const feedback = document.getElementById('builder-feedback');
        
        if (userAnswer === '') {
            feedback.textContent = 'Please enter your answer!';
            feedback.className = 'feedback-message incorrect';
            return;
        }
        
        if (userAnswer === correctAnswer) {
            feedback.textContent = 'Correct! You successfully converted the expanded form to standard form.';
            feedback.className = 'feedback-message correct';
            input.classList.add('correct');
            input.classList.remove('incorrect');
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.expandedFormBuilder(gameArea);
            }, 2500);
        } else {
            feedback.textContent = 'Not quite right. Check your calculation and try again!';
            feedback.className = 'feedback-message incorrect';
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    }
    
    // Override global check answer function
    window.checkAnswer = function(gameArea) {
        checkAnswer();
    };
};

// Export the games for use in the application
// The games are already attached to the global window.Games object
