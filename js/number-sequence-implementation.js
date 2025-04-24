/**
 * number-sequence-implementation.js - Implementation of number sequence games
 */

// Ensure Games object exists
window.Games = window.Games || {};

/**
 * Number Neighbors Game - Identify numbers that come before and after a given number
 */
window.Games.numberNeighbors = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let maxDigits = 3; // Default - up to 3 digits (hundreds)
    
    if (userData.level >= 3) {
        maxDigits = 5; // Up to 5 digits (ten thousands)
    }
    if (userData.level >= 5) {
        maxDigits = 7; // Up to 7 digits (ten lakhs)
    }
    
    // Generate a random number with appropriate number of digits
    const min = Math.pow(10, maxDigits - 1);
    const max = Math.pow(10, maxDigits) - 2; // -2 to ensure we can have a successor
    const centerNumber = Math.floor(Math.random() * (max - min) + min);
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Number Neighbors</h3>
            <p style="text-align: center;">Fill in the numbers that come before and after</p>
            
            <div class="neighbors-game-container">
                <div class="neighbors-explanation">
                    <p>Every number has neighbors: the number that comes <strong>before</strong> it (1 less) and the number that comes <strong>after</strong> it (1 more).</p>
                </div>
                
                <div class="neighbors-sequence">
                    <div class="neighbor-box">
                        <div class="neighbor-label">Before</div>
                        <input type="text" class="neighbor-input before-input" placeholder="?">
                    </div>
                    <div class="neighbor-box center">
                        <div class="neighbor-label">Center</div>
                        <div class="center-number">${centerNumber}</div>
                    </div>
                    <div class="neighbor-box">
                        <div class="neighbor-label">After</div>
                        <input type="text" class="neighbor-input after-input" placeholder="?">
                    </div>
                </div>
                
                <div class="neighbors-tip">
                    <p><strong>Remember:</strong></p>
                    <ul>
                        <li>The number that comes before is 1 less than the center number</li>
                        <li>The number that comes after is 1 more than the center number</li>
                    </ul>
                </div>
                
                <div id="neighbors-feedback" class="neighbors-feedback"></div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="check-neighbors-btn">Check My Answer</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for number neighbors game
    const style = document.createElement('style');
    style.textContent = `
        .neighbors-game-container {
            margin: 30px 0;
            text-align: center;
        }
        
        .neighbors-explanation {
            margin-bottom: 20px;
            padding: 10px;
            background-color: #e3f2fd;
            border-radius: 8px;
            color: #0d47a1;
        }
        
        .neighbors-sequence {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        
        .neighbor-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 120px;
        }
        
        .neighbor-label {
            margin-bottom: 10px;
            font-weight: bold;
            color: #0d47a1;
        }
        
        .neighbor-input {
            width: 100px;
            height: 80px;
            font-size: 1.8em;
            text-align: center;
            border: 2px dashed #2196f3;
            border-radius: 8px;
            background-color: #f5f5f5;
            color: #0d47a1;
            font-weight: bold;
        }
        
        .neighbor-box.center {
            background-color: #bbdefb;
            padding: 10px;
            border-radius: 8px;
            border: 2px solid #2196f3;
        }
        
        .center-number {
            width: 100px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8em;
            font-weight: bold;
            color: #0d47a1;
            background-color: white;
            border-radius: 8px;
        }
        
        .neighbors-tip {
            margin: 20px auto;
            padding: 15px;
            background-color: #fff8e1;
            border-radius: 8px;
            border-left: 5px solid #ffc107;
            text-align: left;
            max-width: 600px;
        }
        
        .neighbors-tip ul {
            margin: 5px 0 0 0;
            padding-left: 20px;
        }
        
        .neighbors-tip li {
            margin: 5px 0;
        }
        
        .neighbors-feedback {
            font-weight: bold;
            padding: 15px;
            border-radius: 8px;
            min-height: 20px;
            margin: 20px auto;
            max-width: 500px;
        }
        
        .neighbors-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .neighbors-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .check-neighbors-btn {
            padding: 12px 25px;
            font-size: 1.1em;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .check-neighbors-btn:hover {
            background-color: #1976d2;
        }
        
        .neighbor-input.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
            border-style: solid;
        }
        
        .neighbor-input.incorrect {
            background-color: #ffebee;
            border-color: #ef5350;
            border-style: solid;
        }
    `;
    document.head.appendChild(style);
    
    // Store correct answers in dataset
    gameArea.dataset.before = (centerNumber - 1).toString();
    gameArea.dataset.center = centerNumber.toString();
    gameArea.dataset.after = (centerNumber + 1).toString();
    
    // Add event listeners for input validation
    const inputs = gameArea.querySelectorAll('.neighbor-input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Only allow numbers
            this.value = this.value.replace(/[^\d]/g, '');
        });
    });
    
    // Add event listener for the check button
    const checkButton = gameArea.querySelector('.check-neighbors-btn');
    checkButton.addEventListener('click', checkAnswers);
    
    // Function to check answers
    function checkAnswers() {
        const beforeInput = gameArea.querySelector('.before-input');
        const afterInput = gameArea.querySelector('.after-input');
        const feedback = document.getElementById('neighbors-feedback');
        
        const beforeCorrect = beforeInput.value === gameArea.dataset.before;
        const afterCorrect = afterInput.value === gameArea.dataset.after;
        
        // Check if any input is empty
        if (beforeInput.value === '' || afterInput.value === '') {
            feedback.textContent = 'Please fill in both numbers!';
            feedback.className = 'neighbors-feedback incorrect';
            return;
        }
        
        // Update input styles based on correctness
        beforeInput.classList.toggle('correct', beforeCorrect);
        beforeInput.classList.toggle('incorrect', !beforeCorrect);
        
        afterInput.classList.toggle('correct', afterCorrect);
        afterInput.classList.toggle('incorrect', !afterCorrect);
        
        // Check if both are correct
        if (beforeCorrect && afterCorrect) {
            feedback.textContent = 'Excellent! You found both neighboring numbers correctly!';
            feedback.className = 'neighbors-feedback correct';
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.numberNeighbors(gameArea);
            }, 2500);
        } else {
            let feedbackText = 'Not quite right. ';
            
            if (!beforeCorrect && !afterCorrect) {
                feedbackText += 'Check both numbers again.';
            } else if (!beforeCorrect) {
                feedbackText += 'The number before is not correct.';
            } else {
                feedbackText += 'The number after is not correct.';
            }
            
            feedback.textContent = feedbackText;
            feedback.className = 'neighbors-feedback incorrect';
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkAnswers;
};

/**
 * Before and After Game - Find numbers a specific amount before and after a given number
 */
window.Games.beforeAndAfter = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let maxDigits = 3; // Default - up to 3 digits (hundreds)
    let maxStep = 5;   // Default - go 5 before or after
    
    if (userData.level >= 3) {
        maxDigits = 4; // Up to 4 digits (thousands)
        maxStep = 10;  // Go up to 10 before or after
    }
    if (userData.level >= 5) {
        maxDigits = 5; // Up to 5 digits (ten thousands)
        maxStep = 20;  // Go up to 20 before or after
    }
    
    // Generate random step sizes (how far before and after)
    const beforeStep = Math.floor(Math.random() * maxStep) + 1;
    const afterStep = Math.floor(Math.random() * maxStep) + 1;
    
    // Generate a random center number with appropriate number of digits
    const min = Math.pow(10, maxDigits - 1);
    const max = Math.pow(10, maxDigits) - afterStep; // Ensure we don't exceed max digits after adding
    const centerNumber = Math.floor(Math.random() * (max - min) + min);
    
    // Calculate the before and after numbers
    const beforeNumber = centerNumber - beforeStep;
    const afterNumber = centerNumber + afterStep;
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Before and After</h3>
            <p style="text-align: center;">Find the numbers that come specific steps before and after</p>
            
            <div class="before-after-container">
                <div class="before-after-explanation">
                    <p>Find:</p>
                    <ul>
                        <li>The number that is <strong>${beforeStep}</strong> less than the center number</li>
                        <li>The number that is <strong>${afterStep}</strong> more than the center number</li>
                    </ul>
                </div>
                
                <div class="before-after-sequence">
                    <div class="step-box">
                        <div class="step-label">${beforeStep} less</div>
                        <input type="text" class="step-input before-input" placeholder="?">
                    </div>
                    <div class="step-box center">
                        <div class="step-label">Center</div>
                        <div class="center-number">${centerNumber}</div>
                    </div>
                    <div class="step-box">
                        <div class="step-label">${afterStep} more</div>
                        <input type="text" class="step-input after-input" placeholder="?">
                    </div>
                </div>
                
                <div class="before-after-tip">
                    <p><strong>How to solve:</strong></p>
                    <ul>
                        <li>To find the number before: <strong>subtract ${beforeStep}</strong> from ${centerNumber}</li>
                        <li>To find the number after: <strong>add ${afterStep}</strong> to ${centerNumber}</li>
                    </ul>
                </div>
                
                <div id="before-after-feedback" class="before-after-feedback"></div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="check-before-after-btn">Check My Answer</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for before and after game
    const style = document.createElement('style');
    style.textContent = `
        .before-after-container {
            margin: 30px 0;
            text-align: center;
        }
        
        .before-after-explanation {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #e3f2fd;
            border-radius: 8px;
            color: #0d47a1;
            text-align: left;
        }
        
        .before-after-explanation ul {
            margin: 5px 0 0 0;
            padding-left: 20px;
        }
        
        .before-after-explanation li {
            margin: 5px 0;
        }
        
        .before-after-sequence {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        
        .step-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 120px;
        }
        
        .step-label {
            margin-bottom: 10px;
            font-weight: bold;
            color: #0d47a1;
        }
        
        .step-input {
            width: 100px;
            height: 80px;
            font-size: 1.8em;
            text-align: center;
            border: 2px dashed #2196f3;
            border-radius: 8px;
            background-color: #f5f5f5;
            color: #0d47a1;
            font-weight: bold;
        }
        
        .step-box.center {
            background-color: #bbdefb;
            padding: 10px;
            border-radius: 8px;
            border: 2px solid #2196f3;
        }
        
        .center-number {
            width: 100px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8em;
            font-weight: bold;
            color: #0d47a1;
            background-color: white;
            border-radius: 8px;
        }
        
        .before-after-tip {
            margin: 20px auto;
            padding: 15px;
            background-color: #fff8e1;
            border-radius: 8px;
            border-left: 5px solid #ffc107;
            text-align: left;
            max-width: 600px;
        }
        
        .before-after-tip ul {
            margin: 5px 0 0 0;
            padding-left: 20px;
        }
        
        .before-after-tip li {
            margin: 5px 0;
        }
        
        .before-after-feedback {
            font-weight: bold;
            padding: 15px;
            border-radius: 8px;
            min-height: 20px;
            margin: 20px auto;
            max-width: 500px;
        }
        
        .before-after-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .before-after-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .check-before-after-btn {
            padding: 12px 25px;
            font-size: 1.1em;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .check-before-after-btn:hover {
            background-color: #1976d2;
        }
        
        .step-input.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
            border-style: solid;
        }
        
        .step-input.incorrect {
            background-color: #ffebee;
            border-color: #ef5350;
            border-style: solid;
        }
    `;
    document.head.appendChild(style);
    
    // Store correct answers in dataset
    gameArea.dataset.before = beforeNumber.toString();
    gameArea.dataset.center = centerNumber.toString();
    gameArea.dataset.after = afterNumber.toString();
    
    // Add event listeners for input validation
    const inputs = gameArea.querySelectorAll('.step-input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Only allow numbers
            this.value = this.value.replace(/[^\d]/g, '');
        });
    });
    
    // Add event listener for the check button
    const checkButton = gameArea.querySelector('.check-before-after-btn');
    checkButton.addEventListener('click', checkAnswers);
    
    // Function to check answers
    function checkAnswers() {
        const beforeInput = gameArea.querySelector('.before-input');
        const afterInput = gameArea.querySelector('.after-input');
        const feedback = document.getElementById('before-after-feedback');
        
        const beforeCorrect = beforeInput.value === gameArea.dataset.before;
        const afterCorrect = afterInput.value === gameArea.dataset.after;
        
        // Check if any input is empty
        if (beforeInput.value === '' || afterInput.value === '') {
            feedback.textContent = 'Please fill in both numbers!';
            feedback.className = 'before-after-feedback incorrect';
            return;
        }
        
        // Update input styles based on correctness
        beforeInput.classList.toggle('correct', beforeCorrect);
        beforeInput.classList.toggle('incorrect', !beforeCorrect);
        
        afterInput.classList.toggle('correct', afterCorrect);
        afterInput.classList.toggle('incorrect', !afterCorrect);
        
        // Check if both are correct
        if (beforeCorrect && afterCorrect) {
            feedback.textContent = 'Excellent! You found both numbers correctly!';
            feedback.className = 'before-after-feedback correct';
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.beforeAndAfter(gameArea);
            }, 2500);
        } else {
            let feedbackText = 'Not quite right. ';
            
            if (!beforeCorrect && !afterCorrect) {
                feedbackText += 'Check both numbers again.';
            } else if (!beforeCorrect) {
                feedbackText += `Check your subtraction of ${beforeStep} from ${centerNumber}.`;
            } else {
                feedbackText += `Check your addition of ${afterStep} to ${centerNumber}.`;
            }
            
            feedback.textContent = feedbackText;
            feedback.className = 'before-after-feedback incorrect';
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkAnswers;
};

/**
 * Number Line Game - Place numbers correctly on a number line
 */
window.Games.numberLine = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let maxDigits = 2; // Default - up to 2 digits (tens)
    let numberCount = 3; // How many numbers to place
    
    if (userData.level >= 3) {
        maxDigits = 3; // Up to 3 digits (hundreds)
        numberCount = 4;
    }
    if (userData.level >= 5) {
        maxDigits = 4; // Up to 4 digits (thousands)
        numberCount = 5;
    }
    
    // Generate a start and end number for the number line
    const min = Math.pow(10, maxDigits - 1);
    const max = Math.pow(10, maxDigits) - 1;
    const range = max - min;
    
    // Make sure start and end are not too close
    const startNumber = Math.floor(Math.random() * (range / 2)) + min;
    const endNumber = startNumber + Math.floor(Math.random() * (range / 2)) + Math.floor(range / 3);
    
    // Calculate the total range and the step size
    const totalRange = endNumber - startNumber;
    const stepSize = Math.floor(totalRange / (numberCount + 1));
    
    // Generate numbers to place on the number line
    const numbersToPlace = [];
    
    for (let i = 1; i <= numberCount; i++) {
        const number = startNumber + (stepSize * i);
        numbersToPlace.push(number);
    }
    
    // Shuffle the numbers for the game
    const shuffledNumbers = [...numbersToPlace].sort(() => Math.random() - 0.5);
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Number Line</h3>
            <p style="text-align: center;">Place the numbers in their correct positions on the number line</p>
            
            <div class="numberline-container">
                <div class="numberline-explanation">
                    <p>A number line helps us understand the order and relative position of numbers.</p>
                    <p>Your task is to place each number in the correct position on the line.</p>
                </div>
                
                <div class="numbers-to-place">
                    <p><strong>Numbers to place:</strong></p>
                    <div class="number-options">
                        ${shuffledNumbers.map((num, index) => `
                            <span class="number-option" data-value="${num}">${num}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="numberline">
                    <div class="numberline-start">${startNumber}</div>
                    <div class="numberline-bar">
                        ${Array(numberCount).fill().map((_, i) => `
                            <div class="numberline-position" data-index="${i}">
                                <div class="position-marker"></div>
                                <select class="position-selector">
                                    <option value="">--</option>
                                    ${shuffledNumbers.map(num => `<option value="${num}">${num}</option>`).join('')}
                                </select>
                            </div>
                        `).join('')}
                    </div>
                    <div class="numberline-end">${endNumber}</div>
                </div>
                
                <div class="numberline-tip">
                    <p><strong>Remember:</strong> Numbers increase from left to right on a number line. 
                    The further right a number is, the larger its value.</p>
                </div>
                
                <div id="numberline-feedback" class="numberline-feedback"></div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="check-numberline-btn">Check My Answer</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for number line game
    const style = document.createElement('style');
    style.textContent = `
        .numberline-container {
            margin: 30px 0;
            text-align: center;
        }
        
        .numberline-explanation {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #e3f2fd;
            border-radius: 8px;
            color: #0d47a1;
        }
        
        .numbers-to-place {
            margin: 20px 0;
            padding: 15px;
            background-color: #f5f5f5;
            border-radius: 8px;
        }
        
        .number-options {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
            margin-top: 10px;
        }
        
        .number-option {
            display: inline-block;
            padding: 8px 15px;
            background-color: #2196f3;
            color: white;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1.2em;
        }
        
        .number-option.used {
            opacity: 0.5;
            background-color: #90caf9;
        }
        
        .numberline {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 30px 0;
            gap: 10px;
        }
        
        .numberline-start, .numberline-end {
            padding: 10px 15px;
            background-color: #0d47a1;
            color: white;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1.2em;
        }
        
        .numberline-bar {
            position: relative;
            width: 70%;
            height: 10px;
            background-color: #0d47a1;
            border-radius: 5px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }
        
        .numberline-position {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .position-marker {
            width: 15px;
            height: 15px;
            background-color: white;
            border: 2px solid #0d47a1;
            border-radius: 50%;
            position: absolute;
            top: -5px;
        }
        
        .position-selector {
            width: 100px;
            height: 40px;
            margin-top: 25px;
            font-size: 1.1em;
            text-align: center;
            border: 2px solid #2196f3;
            border-radius: 8px;
            padding: 5px;
            background-color: white;
            color: #0d47a1;
            -webkit-appearance: menulist-button;
        }
        
        .position-selector:focus {
            outline: none;
            border-color: #0d47a1;
        }
        
        .position-selector.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
        }
        
        .position-selector.incorrect {
            background-color: #ffebee;
            border-color: #ef5350;
        }
        
        .numberline-tip {
            margin: 20px auto;
            padding: 15px;
            background-color: #fff8e1;
            border-radius: 8px;
            border-left: 5px solid #ffc107;
            text-align: left;
            max-width: 600px;
        }
        
        .numberline-feedback {
            font-weight: bold;
            padding: 15px;
            border-radius: 8px;
            min-height: 20px;
            margin: 20px auto;
            max-width: 500px;
        }
        
        .numberline-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .numberline-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .check-numberline-btn {
            padding: 12px 25px;
            font-size: 1.1em;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .check-numberline-btn:hover {
            background-color: #1976d2;
        }
    `;
    document.head.appendChild(style);
    
    // Store correct answers in dataset
    gameArea.dataset.correctNumbers = JSON.stringify(numbersToPlace);
    
    // Add event listeners for the dropdown selectors
    const selectors = gameArea.querySelectorAll('.position-selector');
    const numberOptions = gameArea.querySelectorAll('.number-option');
    
    // Track which numbers have been selected
    const usedNumbers = new Set();
    
    selectors.forEach(selector => {
        selector.addEventListener('change', function() {
            const selectedValue = this.value;
            const previousValue = this.dataset.previousValue;
            
            if (previousValue) {
                // Remove previous selection marking
                const oldNumberOption = gameArea.querySelector(`.number-option[data-value="${previousValue}"]`);
                if (oldNumberOption) {
                    // Check if the number is still used elsewhere before unmarking
                    let stillUsed = false;
                    selectors.forEach(otherSelector => {
                        if (otherSelector !== selector && otherSelector.value === previousValue) {
                            stillUsed = true;
                        }
                    });
                    
                    if (!stillUsed) {
                        oldNumberOption.classList.remove('used');
                        usedNumbers.delete(previousValue);
                    }
                }
            }
            
            if (selectedValue) {
                // Mark the number as used
                const numberOption = gameArea.querySelector(`.number-option[data-value="${selectedValue}"]`);
                if (numberOption) numberOption.classList.add('used');
                
                usedNumbers.add(selectedValue);
                this.dataset.previousValue = selectedValue;
            } else {
                this.dataset.previousValue = '';
            }
        });
    });
    
    // Add event listener for the check button
    const checkButton = gameArea.querySelector('.check-numberline-btn');
    checkButton.addEventListener('click', checkAnswers);
    
    // Function to check answers
    function checkAnswers() {
        const feedback = document.getElementById('numberline-feedback');
        const correctNumbers = JSON.parse(gameArea.dataset.correctNumbers);
        
        // Check if all positions have a number selected
        let allFilled = true;
        let allCorrect = true;
        
        selectors.forEach((selector, index) => {
            if (!selector.value) {
                allFilled = false;
            } else if (parseInt(selector.value) !== correctNumbers[index]) {
                allCorrect = false;
                selector.classList.add('incorrect');
                selector.classList.remove('correct');
            } else {
                selector.classList.add('correct');
                selector.classList.remove('incorrect');
            }
        });
        
        if (!allFilled) {
            feedback.textContent = 'Please select a number for each position!';
            feedback.className = 'numberline-feedback incorrect';
            return;
        }
        
        if (allCorrect) {
            feedback.textContent = 'Perfect! You placed all the numbers in the correct order!';
            feedback.className = 'numberline-feedback correct';
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.numberLine(gameArea);
            }, 2500);
        } else {
            feedback.textContent = 'Some numbers are in the wrong position. Remember that numbers increase from left to right!';
            feedback.className = 'numberline-feedback incorrect';
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkAnswers;
};
