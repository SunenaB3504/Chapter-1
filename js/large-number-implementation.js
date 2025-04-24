/**
 * large-number-implementation.js - Implementation of large number games and concept introduction
 */

// Ensure Games object exists
window.Games = window.Games || {};

/**
 * Concept Introduction Game - Introduces students to large numbers concept
 */
window.Games.conceptIntro = function(gameArea) {
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Large Numbers Introduction</h3>
            
            <div class="concept-intro-container">
                <div class="concept-intro-section">
                    <h4>Understanding Large Numbers</h4>
                    <p>As we explore larger numbers, we need special names to help us discuss and understand them.</p>
                    
                    <div class="number-chart">
                        <div class="chart-row header">
                            <div>Name</div>
                            <div>Value</div>
                            <div>Digits</div>
                        </div>
                        <div class="chart-row">
                            <div>Ones</div>
                            <div>1</div>
                            <div>1</div>
                        </div>
                        <div class="chart-row">
                            <div>Tens</div>
                            <div>10</div>
                            <div>2</div>
                        </div>
                        <div class="chart-row">
                            <div>Hundreds</div>
                            <div>100</div>
                            <div>3</div>
                        </div>
                        <div class="chart-row">
                            <div>Thousands</div>
                            <div>1,000</div>
                            <div>4</div>
                        </div>
                        <div class="chart-row">
                            <div>Ten Thousands</div>
                            <div>10,000</div>
                            <div>5</div>
                        </div>
                        <div class="chart-row highlight">
                            <div>Lakhs</div>
                            <div>1,00,000</div>
                            <div>6</div>
                        </div>
                        <div class="chart-row highlight">
                            <div>Ten Lakhs</div>
                            <div>10,00,000</div>
                            <div>7</div>
                        </div>
                        <div class="chart-row highlight-special">
                            <div>Crores</div>
                            <div>1,00,00,000</div>
                            <div>8</div>
                        </div>
                    </div>
                </div>
                
                <div class="concept-intro-section">
                    <h4>The Indian Number System</h4>
                    <p>In the Indian number system, we use special names for large numbers:</p>
                    
                    <div class="example-container">
                        <div class="example-item">
                            <div class="example-title">1 Lakh = 100,000</div>
                            <div class="example-desc">One hundred thousand</div>
                        </div>
                        <div class="example-item">
                            <div class="example-title">10 Lakhs = 1,000,000</div>
                            <div class="example-desc">One million</div>
                        </div>
                        <div class="example-item">
                            <div class="example-title">1 Crore = 10,000,000</div>
                            <div class="example-desc">Ten million</div>
                        </div>
                    </div>
                    
                    <h4>Place Value in Large Numbers</h4>
                    <div class="place-value-example">
                        <div class="large-number">32,45,781</div>
                        <div class="place-value-breakdown">
                            <div class="breakdown-item">
                                <span class="digit">3</span>
                                <span class="place">Ten Lakhs</span>
                            </div>
                            <div class="breakdown-item">
                                <span class="digit">2</span>
                                <span class="place">Lakhs</span>
                            </div>
                            <div class="breakdown-item">
                                <span class="digit">4</span>
                                <span class="place">Ten Thousands</span>
                            </div>
                            <div class="breakdown-item">
                                <span class="digit">5</span>
                                <span class="place">Thousands</span>
                            </div>
                            <div class="breakdown-item">
                                <span class="digit">7</span>
                                <span class="place">Hundreds</span>
                            </div>
                            <div class="breakdown-item">
                                <span class="digit">8</span>
                                <span class="place">Tens</span>
                            </div>
                            <div class="breakdown-item">
                                <span class="digit">1</span>
                                <span class="place">Ones</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 30px; text-align: center;">
                    <button class="start-practice-btn" id="start-lakh-practice">Practice with Lakhs</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for concept introduction
    const style = document.createElement('style');
    style.textContent = `
        .concept-intro-container {
            margin: 20px 0;
        }
        
        .concept-intro-section {
            margin-bottom: 30px;
            padding: 15px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .concept-intro-section h4 {
            color: #0d47a1;
            margin-top: 0;
            font-size: 1.2em;
        }
        
        .number-chart {
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            margin: 20px 0;
        }
        
        .chart-row {
            display: flex;
            border-bottom: 1px solid #eee;
        }
        
        .chart-row:last-child {
            border-bottom: none;
        }
        
        .chart-row > div {
            padding: 10px;
            flex: 1;
            text-align: center;
        }
        
        .chart-row > div:not(:last-child) {
            border-right: 1px solid #eee;
        }
        
        .chart-row.header {
            background-color: #e3f2fd;
            font-weight: bold;
            color: #0d47a1;
        }
        
        .chart-row.highlight {
            background-color: #fff8e1;
        }
        
        .chart-row.highlight-special {
            background-color: #ffebee;
        }
        
        .example-container {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin: 20px 0;
        }
        
        .example-item {
            flex: 1;
            min-width: 200px;
            padding: 15px;
            background-color: #e8f5e9;
            border-radius: 8px;
        }
        
        .example-title {
            font-weight: bold;
            font-size: 1.1em;
            margin-bottom: 5px;
        }
        
        .place-value-example {
            margin: 20px 0;
            padding: 15px;
            background-color: #f5f5f5;
            border-radius: 8px;
            text-align: center;
        }
        
        .large-number {
            font-size: 2em;
            font-weight: bold;
            color: #0d47a1;
            margin-bottom: 20px;
        }
        
        .place-value-breakdown {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
        }
        
        .breakdown-item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .breakdown-item .digit {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #bbdefb;
            border-radius: 50%;
            font-weight: bold;
            font-size: 1.2em;
            margin-bottom: 5px;
        }
        
        .breakdown-item .place {
            font-size: 0.8em;
            color: #555;
        }
        
        .start-practice-btn {
            padding: 12px 25px;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.1em;
            font-weight: bold;
            cursor: pointer;
        }
        
        .start-practice-btn:hover {
            background-color: #1976d2;
        }
        
        @media (max-width: 768px) {
            .place-value-breakdown {
                flex-direction: column;
                align-items: center;
            }
            
            .breakdown-item {
                flex-direction: row;
                margin: 5px 0;
            }
            
            .breakdown-item .digit {
                margin-right: 10px;
                margin-bottom: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add event listener for practice button
    const practiceButton = document.getElementById('start-lakh-practice');
    practiceButton.addEventListener('click', function() {
        // Load the lakh practice game when clicked
        window.Games.lakhAttack(gameArea);
    });
};

/**
 * Rally Counter Game - Count numbers and arrange them in order
 */
window.Games.rallyCounter = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let maxNumber = 100;
    let numberCount = 5;
    
    if (userData.level >= 3) {
        maxNumber = 500;
        numberCount = 6;
    }
    if (userData.level >= 5) {
        maxNumber = 1000;
        numberCount = 7;
    }
    
    // Generate random numbers
    const numbers = [];
    for (let i = 0; i < numberCount; i++) {
        let num;
        do {
            num = Math.floor(Math.random() * maxNumber) + 1;
        } while (numbers.includes(num));
        numbers.push(num);
    }
    
    // Create sorted versions for answer checking
    const ascendingNumbers = [...numbers].sort((a, b) => a - b);
    const descendingNumbers = [...numbers].sort((a, b) => b - a);
    
    // Decide if we're asking for ascending or descending order
    const isAscending = Math.random() > 0.5;
    const sortDirection = isAscending ? 'ascending' : 'descending';
    const sortedNumbers = isAscending ? ascendingNumbers : descendingNumbers;
    
    // Create the game HTML with touch-friendly controls
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Rally Counter</h3>
            <p style="text-align: center;">Arrange the rally car numbers in ${sortDirection} order!</p>
            
            <div class="rally-container">
                <div class="rally-racetrack">
                    <img src="images/race-podium.png" alt="Rally Podium" style="width: 100%; max-width: 400px;">
                </div>
                
                <div class="rally-instructions">
                    <p><strong>Select</strong> a number for each position to arrange the rally cars in ${sortDirection} order.</p>
                    <p>${isAscending ? 
                        'Put the smallest number in position 1 and the largest number in the last position.' : 
                        'Put the largest number in position 1 and the smallest number in the last position.'}</p>
                </div>
                
                <div class="rally-positions">
                    ${Array(numberCount).fill().map((_, i) => `
                        <div class="rally-position">
                            <div class="position-label">Position ${i + 1}</div>
                            <select class="car-selector" data-position="${i}">
                                <option value="">-- Select --</option>
                                ${numbers.map(num => `<option value="${num}">${num}</option>`).join('')}
                            </select>
                        </div>
                    `).join('')}
                </div>
                
                <div class="available-cars">
                    <p><strong>Available Car Numbers:</strong></p>
                    <div class="car-number-container">
                        ${numbers.map(num => `<span class="car-number" data-value="${num}">${num}</span>`).join('')}
                    </div>
                </div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="check-rally-btn">Check My Answer</button>
                </div>
                
                <div id="rally-feedback" class="rally-feedback"></div>
            </div>
        </div>
    `;
    
    // Add styles for rally counter game
    const style = document.createElement('style');
    style.textContent = `
        .rally-container {
            margin: 20px 0;
            text-align: center;
        }
        
        .rally-racetrack {
            margin: 20px auto;
            max-width: 400px;
        }
        
        .rally-instructions {
            margin: 20px 0;
            font-style: italic;
            color: #555;
        }
        
        .rally-positions {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin: 20px 0;
        }
        
        .rally-position {
            margin: 10px;
        }
        
        .position-label {
            font-weight: bold;
            margin-bottom: 5px;
            color: #0d47a1;
        }
        
        .car-selector {
            width: 120px;
            height: 40px;
            font-size: 1.2em;
            text-align: center;
            border: 2px solid #ff5722;
            border-radius: 8px;
            padding: 5px;
            background-color: white;
            color: #ff5722;
            font-weight: bold;
            -webkit-appearance: menulist-button;
        }
        
        .car-selector:focus {
            outline: none;
            border-color: #e64a19;
            box-shadow: 0 0 5px rgba(255, 87, 34, 0.5);
        }
        
        .car-selector.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
        }
        
        .available-cars {
            margin: 30px auto;
            max-width: 500px;
            padding: 15px;
            background-color: #f5f5f5;
            border-radius: 8px;
        }
        
        .car-number-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin-top: 10px;
        }
        
        .car-number {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background-color: white;
            border: 2px solid #ff5722;
            border-radius: 50%;
            font-weight: bold;
            font-size: 1.3em;
            color: #ff5722;
        }
        
        .car-number.used {
            text-decoration: line-through;
            opacity: 0.5;
            background-color: #f5f5f5;
        }
        
        .check-rally-btn {
            padding: 12px 25px;
            font-size: 1.1em;
            background-color: #ff5722;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .check-rally-btn:hover {
            background-color: #e64a19;
        }
        
        .rally-feedback {
            margin: 20px auto;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            min-height: 24px;
            max-width: 500px;
        }
        
        .rally-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .rally-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        /* Animation for correct answer */
        @keyframes rally {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
        }
        
        .rally-animation {
            animation: rally 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
    
    // Store correct answer in dataset
    gameArea.dataset.sortDirection = sortDirection;
    gameArea.dataset.correctOrder = JSON.stringify(sortedNumbers);
    
    // Track which numbers have been used
    const usedNumbers = new Set();
    const selectors = gameArea.querySelectorAll('.car-selector');
    const carNumbers = gameArea.querySelectorAll('.car-number');
    
    // Add event listeners for the dropdown selectors
    selectors.forEach(selector => {
        selector.addEventListener('change', function() {
            const selectedValue = this.value;
            const previousValue = this.dataset.previousValue;
            
            if (previousValue) {
                // Remove previous selection
                const oldCar = gameArea.querySelector(`.car-number[data-value="${previousValue}"]`);
                if (oldCar) {
                    // Check if the number is still used elsewhere before unmarking
                    let stillUsed = false;
                    selectors.forEach(otherSelector => {
                        if (otherSelector !== selector && otherSelector.value === previousValue) {
                            stillUsed = true;
                        }
                    });
                    
                    if (!stillUsed) {
                        oldCar.classList.remove('used');
                        usedNumbers.delete(previousValue);
                    }
                }
            }
            
            if (selectedValue) {
                // First, check if this number was selected elsewhere and remove that selection
                selectors.forEach(otherSelector => {
                    if (otherSelector !== selector && otherSelector.value === selectedValue) {
                        // Clear the previous selection that used the same number
                        const oldValue = otherSelector.value;
                        otherSelector.value = '';
                        otherSelector.dataset.previousValue = '';
                    }
                });
                
                // Mark the number as used
                const carNumber = gameArea.querySelector(`.car-number[data-value="${selectedValue}"]`);
                if (carNumber) carNumber.classList.add('used');
                
                usedNumbers.add(selectedValue);
                this.dataset.previousValue = selectedValue;
            } else {
                this.dataset.previousValue = '';
            }
        });
    });
    
    // Add event listener for the check button
    const checkButton = gameArea.querySelector('.check-rally-btn');
    checkButton.addEventListener('click', checkCompletion);
    
    // Function to check if the order is correct
    function checkCompletion() {
        const feedback = document.getElementById('rally-feedback');
        
        // Get all selected values
        const selectedValues = [];
        let incompleteSelections = false;
        
        selectors.forEach(selector => {
            if (!selector.value) {
                incompleteSelections = true;
            } else {
                selectedValues.push(parseInt(selector.value));
            }
        });
        
        if (incompleteSelections) {
            feedback.textContent = 'Please select a car number for each position!';
            feedback.className = 'rally-feedback incorrect';
            return;
        }
        
        // Check if the order is correct
        const correctOrder = JSON.parse(gameArea.dataset.correctOrder);
        let isCorrectOrder = true;
        
        for (let i = 0; i < selectedValues.length; i++) {
            if (selectedValues[i] !== correctOrder[i]) {
                isCorrectOrder = false;
                break;
            }
        }
        
        if (isCorrectOrder) {
            feedback.textContent = `Perfect! You arranged the rally cars in ${gameArea.dataset.sortDirection} order!`;
            feedback.className = 'rally-feedback correct';
            
            // Highlight correct selections
            selectors.forEach(selector => {
                selector.classList.add('correct');
                selector.classList.add('rally-animation');
            });
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.rallyCounter(gameArea);
            }, 3000);
        } else {
            feedback.textContent = `Not quite right. Check your ${gameArea.dataset.sortDirection} order and try again!`;
            feedback.className = 'rally-feedback incorrect';
            
            // Shake the feedback to draw attention
            feedback.classList.add('shake');
            setTimeout(() => {
                feedback.classList.remove('shake');
            }, 500);
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkCompletion;
};

/**
 * Lakh Attack Game - Practice understanding large numbers in lakhs
 */
window.Games.lakhAttack = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let maxLakhs = 5;  // Default to 5 lakhs (500,000)
    
    if (userData.level >= 3) {
        maxLakhs = 20;  // Up to 20 lakhs (2,000,000)
    }
    if (userData.level >= 5) {
        maxLakhs = 100;  // Up to 1 crore (10,000,000)
    }
    
    // Generate a random number in lakhs
    const lakhValue = Math.floor(Math.random() * maxLakhs) + 1;
    const numberValue = lakhValue * 100000;
    
    // Format the number in Indian number system
    function formatIndianNumber(num) {
        const str = num.toString();
        let result = '';
        
        for (let i = 0; i < str.length; i++) {
            if (i === str.length - 3 || i === str.length - 5) {
                result = result + str[i] + ',';
            } else {
                result = result + str[i];
            }
        }
        
        return result;
    }
    
    const formattedNumber = formatIndianNumber(numberValue);
    
    // Generate options
    const generateOptions = () => {
        const options = [];
        
        // Correct option
        options.push({
            text: `${lakhValue} lakhs`,
            correct: true
        });
        
        // Incorrect options
        options.push({
            text: `${lakhValue * 10} lakhs`,
            correct: false
        });
        
        options.push({
            text: `${lakhValue / 10 > 0 ? lakhValue / 10 : lakhValue * 100} lakhs`,
            correct: false
        });
        
        options.push({
            text: `${lakhValue} thousands`,
            correct: false
        });
        
        // Shuffle options
        return options.sort(() => Math.random() - 0.5);
    };
    
    const options = generateOptions();
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Lakh Attack</h3>
            <p style="text-align: center;">Choose the correct lakh representation for this number</p>
            
            <div class="lakh-game-container">
                <div class="lakh-number">${formattedNumber}</div>
                
                <div class="lakh-options">
                    ${options.map((option, index) => `
                        <div class="lakh-option" data-correct="${option.correct}">
                            <input type="radio" id="lakhoption${index}" name="lakhOption" value="${index}">
                            <label for="lakhoption${index}">${option.text}</label>
                        </div>
                    `).join('')}
                </div>
                
                <div id="lakh-feedback" class="lakh-feedback"></div>
                
                <div class="lakh-tip">
                    <p><strong>Remember:</strong> 1 lakh = 1,00,000</p>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for lakh attack game
    const style = document.createElement('style');
    style.textContent = `
        .lakh-game-container {
            margin: 30px 0;
            text-align: center;
        }
        
        .lakh-number {
            font-size: 2.5em;
            font-weight: bold;
            color: #0d47a1;
            margin-bottom: 30px;
            padding: 15px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.1);
            display: inline-block;
            min-width: 200px;
        }
        
        .lakh-options {
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-width: 400px;
            margin: 0 auto 20px;
        }
        
        .lakh-option {
            background-color: #fff;
            padding: 15px;
            border-radius: 8px;
            border: 2px solid #ddd;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
        }
        
        .lakh-option:hover {
            background-color: #f5f5f5;
            border-color: #bbb;
        }
        
        .lakh-option input {
            margin-right: 10px;
            cursor: pointer;
            width: 20px;
            height: 20px;
        }
        
        .lakh-option label {
            flex: 1;
            cursor: pointer;
            font-size: 1.2em;
        }
        
        .lakh-option.selected {
            background-color: #e1f5fe;
            border-color: #29b6f6;
        }
        
        .lakh-option.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
        }
        
        .lakh-option.incorrect {
            background-color: #ffebee;
            border-color: #ef5350;
        }
        
        .lakh-feedback {
            font-weight: bold;
            padding: 15px;
            border-radius: 8px;
            min-height: 20px;
            margin-bottom: 20px;
        }
        
        .lakh-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .lakh-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .lakh-tip {
            background-color: #fff8e1;
            padding: 15px;
            border-radius: 8px;
            border-left: 5px solid #ffc107;
            text-align: left;
        }
        
        .lakh-tip p {
            margin: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners for options
    const optionElements = gameArea.querySelectorAll('.lakh-option');
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
    
    // Check answer function for this game
    window.checkAnswer = function(gameArea) {
        const selectedOption = gameArea.querySelector('.lakh-option.selected');
        const feedback = document.getElementById('lakh-feedback');
        
        if (!selectedOption) {
            feedback.textContent = "Please select an answer!";
            feedback.className = "lakh-feedback incorrect";
            return;
        }
        
        const isCorrect = selectedOption.dataset.correct === 'true';
        
        if (isCorrect) {
            feedback.textContent = "Correct! That's the right lakh representation!";
            feedback.className = "lakh-feedback correct";
            selectedOption.classList.add('correct');
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.lakhAttack(gameArea);
            }, 2500);
        } else {
            feedback.textContent = "That's not quite right. Try again!";
            feedback.className = "lakh-feedback incorrect";
            selectedOption.classList.add('incorrect');
            
            // Find the correct option and highlight it after a delay
            setTimeout(function() {
                const correctOption = gameArea.querySelector('.lakh-option[data-correct="true"]');
                correctOption.classList.add('correct');
                
                // Generate a new challenge after a longer delay
                setTimeout(function() {
                    window.Games.lakhAttack(gameArea);
                }, 3000);
            }, 1500);
        }
    };
};

/**
 * Number Speller Game - Practice spelling out large numbers in words
 */
window.Games.numberSpeller = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let maxDigits = 5; // Default - up to 5 digits (ten thousands)
    
    if (userData.level >= 3) {
        maxDigits = 6; // Up to 6 digits (lakhs)
    }
    if (userData.level >= 5) {
        maxDigits = 7; // Up to 7 digits (ten lakhs)
    }
    
    // Generate a random number with appropriate number of digits
    const min = Math.pow(10, maxDigits - 1);
    const max = Math.pow(10, maxDigits) - 1;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Format the number in Indian number system
    function formatIndianNumber(num) {
        const str = num.toString();
        let result = '';
        
        for (let i = 0; i < str.length; i++) {
            if (i === str.length - 3 || (i > 0 && (str.length - i) % 2 === 1 && i < str.length - 3)) {
                result = result + str[i] + ',';
            } else {
                result = result + str[i];
            }
        }
        
        return result;
    }
    
    // Convert the number to words (Indian number system)
    function numberToWords(num) {
        // Names for ones, tens, etc.
        const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        
        // Handle edge case
        if (num === 0) {
            return 'zero';
        }
        
        // Convert 3 digits number to words (handles hundreds)
        function convertLessThanThousand(n) {
            if (n === 0) {
                return '';
            }
            
            let result = '';
            
            // Handle hundreds
            if (n >= 100) {
                result += ones[Math.floor(n / 100)] + ' hundred';
                if (n % 100 !== 0) {
                    result += ' and ';
                }
            }
            
            // Handle tens and ones
            const remainder = n % 100;
            if (remainder >= 10 && remainder < 20) {
                // Handle teens
                result += teens[remainder - 10];
            } else {
                // Handle tens and ones separately
                const tensDigit = Math.floor(remainder / 10);
                const onesDigit = remainder % 10;
                
                if (tensDigit > 0) {
                    result += tens[tensDigit];
                    if (onesDigit > 0) {
                        result += '-' + ones[onesDigit];
                    }
                } else if (onesDigit > 0) {
                    result += ones[onesDigit];
                }
            }
            
            return result;
        }
        
        // Convert the number to words using Indian system (lakhs, crores)
        let words = '';
        let numStr = num.toString();
        
        // Handle crores (10 million)
        if (numStr.length > 7) {
            const crores = parseInt(numStr.substring(0, numStr.length - 7));
            words += convertLessThanThousand(crores) + ' crore ';
            numStr = numStr.substring(numStr.length - 7);
        }
        
        // Handle lakhs (100,000)
        if (numStr.length > 5) {
            const lakhs = parseInt(numStr.substring(0, numStr.length - 5));
            words += convertLessThanThousand(lakhs) + ' lakh ';
            numStr = numStr.substring(numStr.length - 5);
        }
        
        // Handle thousands
        if (numStr.length > 3) {
            const thousands = parseInt(numStr.substring(0, numStr.length - 3));
            words += convertLessThanThousand(thousands) + ' thousand ';
            numStr = numStr.substring(numStr.length - 3);
        }
        
        // Handle hundreds, tens and ones
        if (parseInt(numStr) > 0) {
            words += convertLessThanThousand(parseInt(numStr));
        }
        
        return words.trim();
    }
    
    const formattedNumber = formatIndianNumber(number);
    const correctWords = numberToWords(number);
    
    // Create incorrect answers (by changing digits)
    function generateIncorrectWords() {
        const incorrectOptions = [];
        
        // Option 1: Swap two adjacent digits in the number
        let option1Number = number;
        const numStr = number.toString();
        
        if (numStr.length >= 2) {
            const pos = Math.floor(Math.random() * (numStr.length - 1));
            const swapped = numStr.substring(0, pos) + 
                           numStr[pos + 1] + numStr[pos] + 
                           numStr.substring(pos + 2);
            option1Number = parseInt(swapped);
        } else {
            // If number is single digit, just add 1
            option1Number = (number + 1) % 10;
        }
        
        incorrectOptions.push(numberToWords(option1Number));
        
        // Option 2: Change a digit in the middle
        let option2Number = number;
        if (numStr.length >= 3) {
            const pos = Math.floor(numStr.length / 2);
            const newDigit = (parseInt(numStr[pos]) + 5) % 10;
            const modified = numStr.substring(0, pos) + 
                            newDigit.toString() + 
                            numStr.substring(pos + 1);
            option2Number = parseInt(modified);
        } else {
            // If number is too small, just add 2
            option2Number = (number + 2) % 10;
        }
        
        incorrectOptions.push(numberToWords(option2Number));
        
        // Option 3: Make a "common mistake" with Indian numbering system
        // e.g., use "thousand thousand" instead of "lakh"
        let option3Text = correctWords;
        if (numStr.length >= 6) {
            option3Text = option3Text.replace(' lakh ', ' thousand thousand ');
        } else if (numStr.length >= 4) {
            option3Text = option3Text.replace(' thousand ', ' hundred hundred ');
        } else {
            // For smaller numbers, make a mistake with the ones digit
            const lastDigit = parseInt(numStr[numStr.length - 1]);
            const wrongDigit = (lastDigit + 1) % 10;
            option3Text = option3Text.replace(ones[lastDigit], ones[wrongDigit]);
        }
        
        incorrectOptions.push(option3Text);
        
        return incorrectOptions;
    }
    
    const incorrectOptions = generateIncorrectWords();
    
    // Combine correct and incorrect options and shuffle
    const allOptions = [correctWords, ...incorrectOptions];
    const shuffledOptions = [...allOptions].sort(() => Math.random() - 0.5);
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Number Speller</h3>
            <p style="text-align: center;">Choose the correct spelling in words for this number</p>
            
            <div class="speller-game-container">
                <div class="speller-number">${formattedNumber}</div>
                
                <div class="speller-options">
                    ${shuffledOptions.map((option, index) => `
                        <div class="speller-option" data-correct="${option === correctWords}">
                            <input type="radio" id="spelleroption${index}" name="spellerOption" value="${index}">
                            <label for="spelleroption${index}">${option}</label>
                        </div>
                    `).join('')}
                </div>
                
                <div id="speller-feedback" class="speller-feedback"></div>
                
                <div class="speller-tip">
                    <p><strong>Remember:</strong> In the Indian numbering system, we use lakhs (1,00,000) and crores (1,00,00,000)</p>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for number speller game
    const style = document.createElement('style');
    style.textContent = `
        .speller-game-container {
            margin: 30px 0;
            text-align: center;
        }
        
        .speller-number {
            font-size: 2.5em;
            font-weight: bold;
            color: #0d47a1;
            margin-bottom: 30px;
            padding: 15px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.1);
            display: inline-block;
            min-width: 200px;
        }
        
        .speller-options {
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-width: 600px;
            margin: 0 auto 20px;
        }
        
        .speller-option {
            background-color: #fff;
            padding: 15px;
            border-radius: 8px;
            border: 2px solid #ddd;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: flex-start;
            text-align: left;
        }
        
        .speller-option:hover {
            background-color: #f5f5f5;
            border-color: #bbb;
        }
        
        .speller-option input {
            margin-right: 10px;
            margin-top: 3px;
            cursor: pointer;
        }
        
        .speller-option label {
            flex: 1;
            cursor: pointer;
            font-size: 1.1em;
            line-height: 1.4;
        }
        
        .speller-option.selected {
            background-color: #e1f5fe;
            border-color: #29b6f6;
        }
        
        .speller-option.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
        }
        
        .speller-option.incorrect {
            background-color: #ffebee;
            border-color: #ef5350;
        }
        
        .speller-feedback {
            font-weight: bold;
            padding: 15px;
            border-radius: 8px;
            min-height: 20px;
            margin-bottom: 20px;
        }
        
        .speller-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .speller-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .speller-tip {
            background-color: #fff8e1;
            padding: 15px;
            border-radius: 8px;
            border-left: 5px solid #ffc107;
            text-align: left;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .speller-tip p {
            margin: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners for options
    const optionElements = gameArea.querySelectorAll('.speller-option');
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
    
    // Check answer function for this game
    window.checkAnswer = function(gameArea) {
        const selectedOption = gameArea.querySelector('.speller-option.selected');
        const feedback = document.getElementById('speller-feedback');
        
        if (!selectedOption) {
            feedback.textContent = "Please select an answer!";
            feedback.className = "speller-feedback incorrect";
            return;
        }
        
        const isCorrect = selectedOption.dataset.correct === 'true';
        
        if (isCorrect) {
            feedback.textContent = "Correct! You've identified the right spelling!";
            feedback.className = "speller-feedback correct";
            selectedOption.classList.add('correct');
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.numberSpeller(gameArea);
            }, 2500);
        } else {
            feedback.textContent = "That's not quite right. Try again!";
            feedback.className = "speller-feedback incorrect";
            selectedOption.classList.add('incorrect');
            
            // Find the correct option and highlight it after a delay
            setTimeout(function() {
                const correctOption = gameArea.querySelector('.speller-option[data-correct="true"]');
                correctOption.classList.add('correct');
                
                // Generate a new challenge after a longer delay
                setTimeout(function() {
                    window.Games.numberSpeller(gameArea);
                }, 3000);
            }, 1500);
        }
    };
};

/**
 * Reading Large Numbers Game - Practice reading and understanding large numbers
 */
window.Games.readingLarge = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let maxDigits = 5; // Default - up to 5 digits (ten thousands)
    
    if (userData.level >= 3) {
        maxDigits = 6; // Up to 6 digits (lakhs)
    }
    if (userData.level >= 5) {
        maxDigits = 8; // Up to 8 digits (crores)
    }
    
    // Generate a random number with appropriate number of digits
    const min = Math.pow(10, maxDigits - 1);
    const max = Math.pow(10, maxDigits) - 1;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Format the number in Indian number system
    function formatIndianNumber(num) {
        const str = num.toString();
        let result = '';
        
        for (let i = 0; i < str.length; i++) {
            if (i === str.length - 3 || (i > 0 && (str.length - i) % 2 === 1 && i < str.length - 3)) {
                result = result + str[i] + ',';
            } else {
                result = result + str[i];
            }
        }
        
        return result;
    }
    
    const formattedNumber = formatIndianNumber(number);
    
    // Generate different representations of the number
    function generateOptions(num) {
        const options = [];
        const numStr = num.toString();
        
        // Generate the correct representation based on the number of digits
        let correctOption = '';
        
        if (numStr.length === 8) { // Crores
            correctOption = `${numStr.substring(0, 1)} crore ${numStr.substring(1, 3)} lakh ${numStr.substring(3, 5)} thousand ${numStr.substring(5)}`;
        } else if (numStr.length === 7) { // Ten lakhs
            correctOption = `${numStr.substring(0, 2)} lakh ${numStr.substring(2, 4)} thousand ${numStr.substring(4)}`;
        } else if (numStr.length === 6) { // Lakhs
            correctOption = `${numStr.substring(0, 1)} lakh ${numStr.substring(1, 3)} thousand ${numStr.substring(3)}`;
        } else if (numStr.length === 5) { // Ten thousands
            correctOption = `${numStr.substring(0, 2)} thousand ${numStr.substring(2)}`;
        } else if (numStr.length === 4) { // Thousands
            correctOption = `${numStr.substring(0, 1)} thousand ${numStr.substring(1)}`;
        }
        
        options.push({
            text: correctOption,
            correct: true
        });
        
        // Generate incorrect options
        
        // Option 1: Incorrect place values
        let incorrectOption1 = '';
        
        if (numStr.length >= 6) { // For lakhs and above
            incorrectOption1 = `${numStr.substring(0, numStr.length - 5)} thousand ${numStr.substring(numStr.length - 5, numStr.length - 3)} hundred ${numStr.substring(numStr.length - 3)}`;
        } else if (numStr.length >= 4) { // For thousands
            incorrectOption1 = `${numStr.substring(0, numStr.length - 3)} hundred ${numStr.substring(numStr.length - 3)}`;
        } else {
            incorrectOption1 = `${numStr}`;
        }
        
        options.push({
            text: incorrectOption1,
            correct: false
        });
        
        // Option 2: Western system (millions, etc.)
        let incorrectOption2 = '';
        
        if (numStr.length === 8 || numStr.length === 7) { // 10M or 1M+
            incorrectOption2 = `${numStr.substring(0, numStr.length - 6)} million ${numStr.substring(numStr.length - 6, numStr.length - 3)} thousand ${numStr.substring(numStr.length - 3)}`;
        } else if (numStr.length === 6) { // 100K+
            incorrectOption2 = `${numStr.substring(0, numStr.length - 3)} thousand ${numStr.substring(numStr.length - 3)}`;
        } else {
            incorrectOption2 = `${numStr} units`;
        }
        
        options.push({
            text: incorrectOption2,
            correct: false
        });
        
        // Option 3: Swapped place values
        let incorrectOption3 = '';
        
        if (numStr.length === 8) { // Crores
            incorrectOption3 = `${numStr.substring(0, 1)} lakh ${numStr.substring(1, 3)} crore ${numStr.substring(3, 5)} thousand ${numStr.substring(5)}`;
        } else if (numStr.length === 7) { // Ten lakhs
            incorrectOption3 = `${numStr.substring(0, 2)} crore ${numStr.substring(2, 4)} thousand ${numStr.substring(4)}`;
        } else if (numStr.length === 6) { // Lakhs
            incorrectOption3 = `${numStr.substring(0, 3)} thousand ${numStr.substring(3)}`;
        } else if (numStr.length === 5) { // Ten thousands
            incorrectOption3 = `${numStr.substring(0, 2)} lakh ${numStr.substring(2)}`;
        } else if (numStr.length === 4) { // Thousands
            incorrectOption3 = `${numStr.substring(0, 1)} hundred ${numStr.substring(1)}`;
        }
        
        options.push({
            text: incorrectOption3,
            correct: false
        });
        
        return options.sort(() => Math.random() - 0.5);
    }
    
    const options = generateOptions(number);
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Reading Large Numbers</h3>
            <p style="text-align: center;">Choose the correct way to read this number</p>
            
            <div class="reading-game-container">
                <div class="reading-number">${formattedNumber}</div>
                
                <div class="reading-options">
                    ${options.map((option, index) => `
                        <div class="reading-option" data-correct="${option.correct}">
                            <input type="radio" id="readingoption${index}" name="readingOption" value="${index}">
                            <label for="readingoption${index}">${option.text}</label>
                        </div>
                    `).join('')}
                </div>
                
                <div id="reading-feedback" class="reading-feedback"></div>
                
                <div class="reading-tip">
                    <h4>Reading Large Numbers in the Indian System:</h4>
                    <div class="place-value-table">
                        <div class="place-value-row">
                            <div>Crore</div>
                            <div>Ten Lakhs</div>
                            <div>Lakhs</div>
                            <div>Ten Thousands</div>
                            <div>Thousands</div>
                            <div>Hundreds</div>
                            <div>Tens</div>
                            <div>Ones</div>
                        </div>
                        <div class="place-value-row">
                            <div>1,00,00,000</div>
                            <div>10,00,000</div>
                            <div>1,00,000</div>
                            <div>10,000</div>
                            <div>1,000</div>
                            <div>100</div>
                            <div>10</div>
                            <div>1</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for reading large numbers game
    const style = document.createElement('style');
    style.textContent = `
        .reading-game-container {
            margin: 30px 0;
            text-align: center;
        }
        
        .reading-number {
            font-size: 2.5em;
            font-weight: bold;
            color: #0d47a1;
            margin-bottom: 30px;
            padding: 15px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.1);
            display: inline-block;
            min-width: 200px;
        }
        
        .reading-options {
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-width: 600px;
            margin: 0 auto 20px;
        }
        
        .reading-option {
            background-color: #fff;
            padding: 15px;
            border-radius: 8px;
            border: 2px solid #ddd;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: flex-start;
            text-align: left;
        }
        
        .reading-option:hover {
            background-color: #f5f5f5;
            border-color: #bbb;
        }
        
        .reading-option input {
            margin-right: 10px;
            margin-top: 3px;
            cursor: pointer;
        }
        
        .reading-option label {
            flex: 1;
            cursor: pointer;
            font-size: 1.1em;
            line-height: 1.4;
        }
        
        .reading-option.selected {
            background-color: #e1f5fe;
            border-color: #29b6f6;
        }
        
        .reading-option.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
        }
        
        .reading-option.incorrect {
            background-color: #ffebee;
            border-color: #ef5350;
        }
        
        .reading-feedback {
            font-weight: bold;
            padding: 15px;
            border-radius: 8px;
            min-height: 20px;
            margin-bottom: 20px;
        }
        
        .reading-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .reading-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .reading-tip {
            background-color: #fff8e1;
            padding: 15px;
            border-radius: 8px;
            border-left: 5px solid #ffc107;
            text-align: left;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .reading-tip h4 {
            margin-top: 0;
            margin-bottom: 10px;
        }
        
        .place-value-table {
            margin-top: 10px;
            overflow-x: auto;
        }
        
        .place-value-row {
            display: flex;
            border-bottom: 1px solid #ddd;
        }
        
        .place-value-row:last-child {
            border-bottom: none;
        }
        
        .place-value-row div {
            flex: 1;
            padding: 8px;
            font-size: 0.9em;
            text-align: center;
            white-space: nowrap;
        }
        
        .place-value-row:first-child div {
            font-weight: bold;
            background-color: #f5f5f5;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners for options
    const optionElements = gameArea.querySelectorAll('.reading-option');
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
    
    // Check answer function for this game
    window.checkAnswer = function(gameArea) {
        const selectedOption = gameArea.querySelector('.reading-option.selected');
        const feedback = document.getElementById('reading-feedback');
        
        if (!selectedOption) {
            feedback.textContent = "Please select an answer!";
            feedback.className = "reading-feedback incorrect";
            return;
        }
        
        const isCorrect = selectedOption.dataset.correct === 'true';
        
        if (isCorrect) {
            feedback.textContent = "Correct! That's the right way to read the number!";
            feedback.className = "reading-feedback correct";
            selectedOption.classList.add('correct');
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.readingLarge(gameArea);
            }, 2500);
        } else {
            feedback.textContent = "That's not quite right. Try again!";
            feedback.className = "reading-feedback incorrect";
            selectedOption.classList.add('incorrect');
            
            // Find the correct option and highlight it after a delay
            setTimeout(function() {
                const correctOption = gameArea.querySelector('.reading-option[data-correct="true"]');
                correctOption.classList.add('correct');
                
                // Generate a new challenge after a longer delay
                setTimeout(function() {
                    window.Games.readingLarge(gameArea);
                }, 3000);
            }, 1500);
        }
    };
};

/**
 * Comma Placement Game - Learn how to properly place commas in large numbers
 */
window.Games.commaPlacement = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let maxDigits = 5; // Default - up to 5 digits (ten thousands)
    
    if (userData.level >= 3) {
        maxDigits = 6; // Up to 6 digits (lakhs)
    }
    if (userData.level >= 5) {
        maxDigits = 8; // Up to 8 digits (crores)
    }
    
    // Generate a random number with appropriate number of digits
    const min = Math.pow(10, maxDigits - 1);
    const max = Math.pow(10, maxDigits) - 1;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Format the number in Indian number system
    function formatIndianNumber(num) {
        const str = num.toString();
        let result = '';
        
        for (let i = 0; i < str.length; i++) {
            if (i === str.length - 3 || (i > 0 && (str.length - i) % 2 === 1 && i < str.length - 3)) {
                result = result + str[i] + ',';
            } else {
                result = result + str[i];
            }
        }
        
        return result;
    }
    
    const formattedNumber = formatIndianNumber(number);
    const plainNumber = number.toString();
    
    // Generate incorrect comma placements
    function generateIncorrectOptions(num) {
        const options = [];
        const numStr = num.toString();
        
        // Option 1: Western system (3-digit grouping)
        let westernSystem = '';
        for (let i = 0; i < numStr.length; i++) {
            if (i > 0 && (numStr.length - i) % 3 === 0) {
                westernSystem += ',';
            }
            westernSystem += numStr[i];
        }
        options.push(westernSystem);
        
        // Option 2: Random incorrect comma placement
        let randomIncorrect = '';
        let insertedCommas = 0;
        const maxCommas = Math.floor(numStr.length / 2);
        
        for (let i = 0; i < numStr.length; i++) {
            // Don't insert comma at the beginning
            if (i > 0 && insertedCommas < maxCommas && Math.random() > 0.7) {
                randomIncorrect += ',';
                insertedCommas++;
            }
            randomIncorrect += numStr[i];
        }
        options.push(randomIncorrect);
        
        // Option 3: Mixed system (first 3-digit grouping, then 2-digit)
        let mixedSystem = '';
        for (let i = 0; i < numStr.length; i++) {
            if (i > 0 && i === numStr.length - 3) {
                mixedSystem += ',';
            } else if (i > 0 && i < numStr.length - 3 && (numStr.length - i) % 3 === 0) {
                mixedSystem += ',';
            }
            mixedSystem += numStr[i];
        }
        options.push(mixedSystem);
        
        return options;
    }
    
    const incorrectOptions = generateIncorrectOptions(number);
    
    // Combine all options and shuffle
    const allOptions = [formattedNumber, ...incorrectOptions];
    const shuffledOptions = [...allOptions].sort(() => Math.random() - 0.5);
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Comma Placement</h3>
            <p style="text-align: center;">Choose the correct comma placement for this number in the Indian system</p>
            
            <div class="comma-game-container">
                <div class="comma-number-plain">${plainNumber}</div>
                
                <div class="comma-options">
                    ${shuffledOptions.map((option, index) => `
                        <div class="comma-option" data-correct="${option === formattedNumber}">
                            <input type="radio" id="commaoption${index}" name="commaOption" value="${index}">
                            <label for="commaoption${index}">${option}</label>
                        </div>
                    `).join('')}
                </div>
                
                <div id="comma-feedback" class="comma-feedback"></div>
                
                <div class="comma-tip">
                    <h4>Comma Placement Rules:</h4>
                    <p><strong>Indian Number System:</strong> 3 digits from right, then groups of 2 digits (12,34,56,789)</p>
                    <p><strong>International Number System:</strong> Groups of 3 digits from right (12,345,678)</p>
                    <div class="examples-box">
                        <p><strong>Examples in Indian System:</strong></p>
                        <ul>
                            <li>1,000 - One thousand</li>
                            <li>10,000 - Ten thousand</li>
                            <li>1,00,000 - One lakh</li>
                            <li>10,00,000 - Ten lakhs</li>
                            <li>1,00,00,000 - One crore</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for comma placement game
    const style = document.createElement('style');
    style.textContent = `
        .comma-game-container {
            margin: 30px 0;
            text-align: center;
        }
        
        .comma-number-plain {
            font-size: 2.5em;
            font-weight: bold;
            color: #0d47a1;
            margin-bottom: 30px;
            padding: 15px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.1);
            display: inline-block;
            min-width: 200px;
            letter-spacing: 2px;
        }
        
        .comma-options {
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-width: 500px;
            margin: 0 auto 20px;
        }
        
        .comma-option {
            background-color: #fff;
            padding: 15px;
            border-radius: 8px;
            border: 2px solid #ddd;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
        }
        
        .comma-option:hover {
            background-color: #f5f5f5;
            border-color: #bbb;
        }
        
        .comma-option input {
            margin-right: 15px;
            cursor: pointer;
            width: 20px;
            height: 20px;
        }
        
        .comma-option label {
            flex: 1;
            cursor: pointer;
            font-size: 1.3em;
            font-weight: bold;
            letter-spacing: 1px;
        }
        
        .comma-option.selected {
            background-color: #e1f5fe;
            border-color: #29b6f6;
        }
        
        .comma-option.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
        }
        
        .comma-option.incorrect {
            background-color: #ffebee;
            border-color: #ef5350;
        }
        
        .comma-feedback {
            font-weight: bold;
            padding: 15px;
            border-radius: 8px;
            min-height: 20px;
            margin-bottom: 20px;
        }
        
        .comma-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .comma-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .comma-tip {
            background-color: #fff8e1;
            padding: 15px;
            border-radius: 8px;
            border-left: 5px solid #ffc107;
            text-align: left;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .comma-tip h4 {
            margin-top: 0;
            margin-bottom: 10px;
        }
        
        .comma-tip p {
            margin: 5px 0;
        }
        
        .examples-box {
            background-color: white;
            padding: 10px 15px;
            margin-top: 10px;
            border-radius: 5px;
        }
        
        .examples-box ul {
            margin-top: 5px;
            padding-left: 20px;
        }
        
        .examples-box li {
            margin: 5px 0;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners for options
    const optionElements = gameArea.querySelectorAll('.comma-option');
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
    
    // Check answer function for this game
    window.checkAnswer = function(gameArea) {
        const selectedOption = gameArea.querySelector('.comma-option.selected');
        const feedback = document.getElementById('comma-feedback');
        
        if (!selectedOption) {
            feedback.textContent = "Please select an answer!";
            feedback.className = "comma-feedback incorrect";
            return;
        }
        
        const isCorrect = selectedOption.dataset.correct === 'true';
        
        if (isCorrect) {
            feedback.textContent = "Correct! You've placed the commas properly in the Indian number system!";
            feedback.className = "comma-feedback correct";
            selectedOption.classList.add('correct');
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.commaPlacement(gameArea);
            }, 2500);
        } else {
            feedback.textContent = "That's not correct. Try again with the Indian number system rules!";
            feedback.className = "comma-feedback incorrect";
            selectedOption.classList.add('incorrect');
            
            // Find the correct option and highlight it after a delay
            setTimeout(function() {
                const correctOption = gameArea.querySelector('.comma-option[data-correct="true"]');
                correctOption.classList.add('correct');
                
                // Generate a new challenge after a longer delay
                setTimeout(function() {
                    window.Games.commaPlacement(gameArea);
                }, 3000);
            }, 1500);
        }
    };
};

// Export the games for use in the application
// The games are already attached to the global window.Games object
