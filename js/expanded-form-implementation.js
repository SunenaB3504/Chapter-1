/**
 * expanded-form-implementation.js - Implementation of expanded form games
 */

// Ensure Games object exists
window.Games = window.Games || {};

/**
 * Place Value Puzzle Game - Build a number from expanded form parts
 */
window.Games.placeValuePuzzle = function(gameArea) {
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
            expandedForm.push(`${digit} × ${placeValue}`);
        }
    }
    
    // Shuffle the expanded form parts
    const shuffledParts = [...expandedForm].sort(() => Math.random() - 0.5);
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Place Value Puzzle</h3>
            <p style="text-align: center;">Build the number from its expanded form</p>
            
            <div class="pv-puzzle-container">
                <div class="pv-expanded-form">
                    ${shuffledParts.map((part, index) => `
                        <div class="pv-expanded-part" data-value="${part}">
                            ${part}
                        </div>
                    `).join('')}
                </div>
                
                <div class="pv-input-container">
                    <p>The number represented by the expanded form is:</p>
                    <input type="text" id="pv-answer" class="pv-answer-input" placeholder="Enter the number">
                </div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button id="check-pv-puzzle" class="btn btn-primary">Check My Answer</button>
                </div>
                
                <div id="puzzle-feedback" class="feedback-message"></div>
                
                <div class="pv-visual-representation" id="visual-representation">
                    <div class="pv-visual-title">Visual Representation:</div>
                    <div class="pv-visual-blocks" id="visual-blocks"></div>
                </div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin-top: 0;"><strong>Place Value Tips:</strong></p>
                <ul>
                    <li>Each part shows a digit multiplied by its place value</li>
                    <li>Add all parts together to find the number</li>
                    <li>Example: 3 × 100 + 5 × 10 + 2 × 1 = 352</li>
                </ul>
            </div>
        </div>
    `;
    
    // Add styles for the place value puzzle game
    const style = document.createElement('style');
    style.textContent = `
        .pv-puzzle-container {
            margin: 30px 0;
        }
        
        .pv-expanded-form {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .pv-expanded-part {
            background-color: #e3f2fd;
            border: 2px solid #2196f3;
            border-radius: 8px;
            padding: 12px 20px;
            font-size: 1.2em;
            font-weight: bold;
            color: #0d47a1;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .pv-expanded-part:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .pv-expanded-part.selected {
            background-color: #bbdefb;
            border-color: #1565c0;
        }
        
        .pv-input-container {
            text-align: center;
            margin: 20px 0;
        }
        
        .pv-input-container p {
            font-size: 1.1em;
            margin-bottom: 10px;
        }
        
        .pv-answer-input {
            width: 150px;
            height: 50px;
            font-size: 1.5em;
            text-align: center;
            border: 2px solid #2196f3;
            border-radius: 8px;
            padding: 5px 10px;
        }
        
        .pv-visual-representation {
            margin-top: 30px;
            padding: 15px;
            background-color: #e8f5e9;
            border-radius: 8px;
            display: none;
        }
        
        .pv-visual-title {
            font-weight: bold;
            margin-bottom: 10px;
            color: #2e7d32;
        }
        
        .pv-visual-blocks {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
        }
        
        .pv-block {
            text-align: center;
            padding: 10px;
        }
        
        .pv-block-value {
            font-weight: bold;
            margin-top: 5px;
        }
        
        .pv-hundreds {
            width: 80px;
            height: 80px;
            background-color: #4caf50;
            border-radius: 8px;
        }
        
        .pv-tens {
            width: 60px;
            height: 60px;
            background-color: #ff9800;
            border-radius: 6px;
        }
        
        .pv-ones {
            width: 40px;
            height: 40px;
            background-color: #f44336;
            border-radius: 4px;
        }
        
        .pv-thousands {
            width: 100px;
            height: 100px;
            background-color: #9c27b0;
            border-radius: 10px;
        }
        
        .pv-ten-thousands {
            width: 120px;
            height: 120px;
            background-color: #3f51b5;
            border-radius: 12px;
        }
        
        .feedback-message {
            margin-top: 20px;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
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
    
    // Add event listeners for parts
    const parts = gameArea.querySelectorAll('.pv-expanded-part');
    parts.forEach(part => {
        part.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
    
    // Function to create visual representation
    function showVisualRepresentation() {
        const visualContainer = document.getElementById('visual-representation');
        const blocksContainer = document.getElementById('visual-blocks');
        visualContainer.style.display = 'block';
        blocksContainer.innerHTML = '';
        
        // Create blocks for each expanded form part
        expandedForm.forEach(part => {
            const [digit, placeValue] = part.split(' × ');
            let blockClass = '';
            let blockName = '';
            
            switch(parseInt(placeValue)) {
                case 1:
                    blockClass = 'pv-ones';
                    blockName = 'Ones';
                    break;
                case 10:
                    blockClass = 'pv-tens';
                    blockName = 'Tens';
                    break;
                case 100:
                    blockClass = 'pv-hundreds';
                    blockName = 'Hundreds';
                    break;
                case 1000:
                    blockClass = 'pv-thousands';
                    blockName = 'Thousands';
                    break;
                case 10000:
                    blockClass = 'pv-ten-thousands';
                    blockName = 'Ten Thousands';
                    break;
            }
            
            // Repeat blocks based on digit
            for (let i = 0; i < parseInt(digit); i++) {
                blocksContainer.innerHTML += `
                    <div class="pv-block">
                        <div class="${blockClass}"></div>
                        <div class="pv-block-value">${blockName}</div>
                    </div>
                `;
            }
        });
    }
    
    // Add event listener for check button
    const checkButton = gameArea.querySelector('#check-pv-puzzle');
    checkButton.addEventListener('click', function() {
        const userAnswer = document.getElementById('pv-answer').value.trim();
        const feedback = document.getElementById('puzzle-feedback');
        
        if (!userAnswer) {
            feedback.textContent = 'Please enter a number!';
            feedback.className = 'feedback-message incorrect';
            return;
        }
        
        if (parseInt(userAnswer) === number) {
            feedback.textContent = 'Correct! You built the number correctly!';
            feedback.className = 'feedback-message correct';
            
            // Show visual representation
            showVisualRepresentation();
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new puzzle after a delay
            setTimeout(function() {
                Games.placeValuePuzzle(gameArea);
            }, 3000);
        } else {
            feedback.textContent = `That's not correct. Try again!`;
            feedback.className = 'feedback-message incorrect';
        }
    });
    
    // Add answer validation (only allow numbers)
    const answerInput = gameArea.querySelector('#pv-answer');
    answerInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^\d]/g, '');
    });
};

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
