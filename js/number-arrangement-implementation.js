/**
 * number-arrangement-implementation.js - Implementation of number arrangement games
 */

// Ensure Games object exists
window.Games = window.Games || {};

/**
 * Number Sorter Game - Sort numbers in ascending or descending order
 * Touch-friendly version without drag-and-drop
 */
window.Games.numberSorter = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let digits = 2;
    let numberCount = 5;
    
    if (userData.level >= 3) {
        digits = 3;
        numberCount = 6;
    }
    if (userData.level >= 5) {
        digits = 4;
        numberCount = 7;
    }
    
    // Generate random numbers
    const numbers = [];
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    
    for (let i = 0; i < numberCount; i++) {
        let num;
        do {
            num = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (numbers.includes(num));
        numbers.push(num);
    }
    
    // Decide if sorting should be ascending or descending
    const isAscending = Math.random() > 0.5;
    const sortingDirection = isAscending ? 'ascending' : 'descending';
    const sortedNumbers = [...numbers].sort((a, b) => isAscending ? a - b : b - a);
    
    // Create the game HTML with dropdown selectors instead of drag and drop
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Number Sorter</h3>
            <p style="text-align: center;">Arrange the numbers in ${sortingDirection} order (${isAscending ? 'smallest to largest' : 'largest to smallest'})</p>
            
            <div class="number-sorter-container">
                <div class="sorter-instructions">
                    <p><strong>Select</strong> a number for each position to put them in ${sortingDirection} order.</p>
                </div>
                
                <div class="number-positions">
                    ${Array(numberCount).fill().map((_, i) => `
                        <div class="number-position">
                            <label>Position ${i + 1}</label>
                            <select class="number-selector" data-position="${i}">
                                <option value="">-- Select --</option>
                                ${numbers.map(num => `<option value="${num}">${num}</option>`).join('')}
                            </select>
                        </div>
                    `).join('')}
                </div>
                
                <div class="number-choices">
                    <p><strong>Available Numbers:</strong></p>
                    <div class="number-badge-container">
                        ${numbers.map(num => `<span class="number-badge" data-value="${num}">${num}</span>`).join('')}
                    </div>
                </div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="check-order-btn">Check My Answer</button>
                </div>
                
                <div id="sorter-feedback" class="feedback-message"></div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin-top: 0;"><strong>How to Sort Numbers:</strong></p>
                <ul>
                    <li>${isAscending ? 
                        'In ascending order, the smallest number comes first, followed by larger numbers' : 
                        'In descending order, the largest number comes first, followed by smaller numbers'}</li>
                    <li>Select a number for each position using the dropdown menus</li>
                    <li>The number will appear crossed out in the Available Numbers section when used</li>
                </ul>
            </div>
        </div>
    `;
    
    // Add styles for number sorter game
    const style = document.createElement('style');
    style.textContent = `
        .number-sorter-container {
            margin: 30px 0;
            text-align: center;
        }
        
        .sorter-instructions {
            margin: 20px 0;
            font-style: italic;
            color: #555;
        }
        
        .number-positions {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
            margin: 20px 0;
        }
        
        .number-position {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 10px;
        }
        
        .number-position label {
            margin-bottom: 5px;
            font-weight: bold;
            color: #0d47a1;
        }
        
        .number-selector {
            width: 100px;
            height: 50px;
            font-size: 1.3em;
            text-align: center;
            border: 2px solid #2196f3;
            border-radius: 8px;
            padding: 5px 10px;
            background-color: white;
            color: #0d47a1;
            font-weight: bold;
            -webkit-appearance: menulist-button;
        }
        
        .number-selector:focus {
            outline: none;
            border-color: #0d47a1;
            box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
        }
        
        .number-choices {
            margin: 30px auto;
            max-width: 500px;
            padding: 15px;
            background-color: #e3f2fd;
            border-radius: 8px;
        }
        
        .number-badge-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin-top: 10px;
        }
        
        .number-badge {
            display: inline-block;
            padding: 8px 15px;
            background-color: white;
            border: 2px solid #2196f3;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1.2em;
            color: #0d47a1;
        }
        
        .number-badge.used {
            text-decoration: line-through;
            opacity: 0.5;
            background-color: #f5f5f5;
        }
        
        .check-order-btn {
            padding: 12px 25px;
            font-size: 1.1em;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .check-order-btn:hover {
            background-color: #1976d2;
        }
        
        .feedback-message {
            margin: 20px auto;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            min-height: 24px;
            max-width: 500px;
        }
        
        .feedback-message.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .feedback-message.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        /* Animation for correct answer */
        @keyframes celebrate {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .celebrate {
            animation: celebrate 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
    
    // Store correct answer in dataset
    gameArea.dataset.sortDirection = sortingDirection;
    gameArea.dataset.correctOrder = JSON.stringify(sortedNumbers);
    
    // Track which numbers have been used
    const usedNumbers = new Set();
    const selectors = gameArea.querySelectorAll('.number-selector');
    const badges = gameArea.querySelectorAll('.number-badge');
    
    // Add event listeners for the dropdown selectors
    selectors.forEach(selector => {
        selector.addEventListener('change', function() {
            const selectedValue = this.value;
            const position = this.dataset.position;
            
            if (selectedValue) {
                // First, check if this number was selected elsewhere and remove that selection
                selectors.forEach(otherSelector => {
                    if (otherSelector !== selector && otherSelector.value === selectedValue) {
                        // Remove the previous selection
                        const oldBadge = gameArea.querySelector(`.number-badge[data-value="${selectedValue}"]`);
                        if (oldBadge) oldBadge.classList.remove('used');
                        
                        otherSelector.value = '';
                    }
                });
                
                // Mark the number as used
                const badge = gameArea.querySelector(`.number-badge[data-value="${selectedValue}"]`);
                if (badge) badge.classList.add('used');
                
                usedNumbers.add(selectedValue);
            } else {
                // If selection is cleared, update the badge
                const previousValue = this.dataset.previousValue;
                if (previousValue) {
                    const badge = gameArea.querySelector(`.number-badge[data-value="${previousValue}"]`);
                    if (badge) badge.classList.remove('used');
                    
                    // Check if the number is still used elsewhere
                    let stillUsed = false;
                    selectors.forEach(otherSelector => {
                        if (otherSelector !== selector && otherSelector.value === previousValue) {
                            stillUsed = true;
                        }
                    });
                    
                    if (!stillUsed) {
                        usedNumbers.delete(previousValue);
                    }
                }
            }
            
            // Store the current value for reference if changed later
            this.dataset.previousValue = selectedValue;
        });
    });
    
    // Add event listener for the check button
    const checkButton = gameArea.querySelector('.check-order-btn');
    checkButton.addEventListener('click', checkCompletion);
    
    // Function to check if the order is correct
    function checkCompletion() {
        const feedback = document.getElementById('sorter-feedback');
        
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
            feedback.textContent = 'Please select a number for each position!';
            feedback.className = 'feedback-message incorrect';
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
            feedback.textContent = `Excellent! You've sorted the numbers in ${gameArea.dataset.sortDirection} order correctly!`;
            feedback.className = 'feedback-message correct';
            
            // Highlight correct selections
            selectors.forEach(selector => {
                selector.style.backgroundColor = '#e8f5e9';
                selector.style.borderColor = '#4caf50';
                selector.classList.add('celebrate');
            });
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.numberSorter(gameArea);
            }, 3000);
        } else {
            feedback.textContent = 'Not quite right. Check your sorting and try again!';
            feedback.className = 'feedback-message incorrect';
            
            // Shake the feedback to draw attention
            feedback.classList.add('shake');
            setTimeout(() => {
                feedback.classList.remove('shake');
            }, 500);
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkCompletion;
    
    // Function to check if all slots are filled and in the correct order
    function checkCompletion() {
        const feedback = document.getElementById('sorter-feedback');
        
        // Check if all slots have numbers
        if (placedNumbers.size === slots.length) {
            // Check if the order is correct
            const correctOrder = JSON.parse(gameArea.dataset.correctOrder);
            let isCorrectOrder = true;
            
            for (let i = 0; i < slots.length; i++) {
                const userNumber = placedNumbers.get(i);
                if (userNumber !== correctOrder[i]) {
                    isCorrectOrder = false;
                    break;
                }
            }
            
            if (isCorrectOrder) {
                feedback.textContent = `Excellent! You've sorted the numbers in ${gameArea.dataset.sortDirection} order correctly!`;
                feedback.className = 'feedback-message correct';
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(2);
                UIManager.updateUserProfile();
                
                // Generate a new challenge after a delay
                setTimeout(function() {
                    window.Games.numberSorter(gameArea);
                }, 3000);
            } else {
                feedback.textContent = 'Not quite right. Check your sorting and try again!';
                feedback.className = 'feedback-message incorrect';
            }
        } else {
            feedback.textContent = '';
            feedback.className = 'feedback-message';
        }
    }
    
    // Override global check answer function
    window.checkAnswer = function(gameArea) {
        const feedback = document.getElementById('sorter-feedback');
        
        // Check if all slots have numbers
        if (placedNumbers.size < slots.length) {
            feedback.textContent = 'Please place all numbers in the slots before checking!';
            feedback.className = 'feedback-message incorrect';
            return;
        }
        
        // Check completion will handle the rest
        checkCompletion();
    };
};

/**
 * Ascending Climber Game - Arrange numbers in ascending order with a climbing theme
 * Touch-friendly version without drag-and-drop
 */
window.Games.ascendingClimber = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let digits = 2;
    let numberCount = 5;
    
    if (userData.level >= 3) {
        digits = 3;
        numberCount = 6;
    }
    if (userData.level >= 5) {
        digits = 4;
        numberCount = 7;
    }
    
    // Generate random numbers
    const numbers = [];
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    
    for (let i = 0; i < numberCount; i++) {
        let num;
        do {
            num = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (numbers.includes(num));
        numbers.push(num);
    }
    
    // Sort numbers in ascending order
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    
    // Create the game HTML with dropdown selectors instead of drag and drop
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Ascending Climber</h3>
            <p style="text-align: center;">Help the climber reach the summit by arranging numbers from smallest to largest!</p>
            
            <div class="climbing-container">
                <div class="mountain">
                    <img src="images/mountain-climb.png" alt="Mountain" style="width: 100%; max-width: 500px;">
                    
                    <div class="climbing-stations">
                        ${Array(numberCount).fill().map((_, i) => {
                            const stationNumber = numberCount - i;
                            return `
                                <div class="climbing-station" data-position="${numberCount - i - 1}" 
                                     style="top: ${20 + (i * 70 / numberCount)}%; left: ${40 + (i % 2 ? -20 : 20)}%;">
                                    <div class="station-number">${stationNumber}</div>
                                    <select class="station-selector" data-station="${stationNumber}">
                                        <option value="">--</option>
                                        ${numbers.map(num => `<option value="${num}">${num}</option>`).join('')}
                                    </select>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div class="climb-instructions">
                    <p><strong>Select</strong> a number for each station to help the climber reach the summit!</p>
                    <p>Remember: The smallest number goes at the bottom (station 1) and the largest at the top.</p>
                </div>
                
                <div class="number-choices">
                    <p><strong>Available Numbers:</strong></p>
                    <div class="number-badge-container">
                        ${numbers.map(num => `<span class="number-badge" data-value="${num}">${num}</span>`).join('')}
                    </div>
                </div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="check-climb-btn">Check My Answer</button>
                </div>
                
                <div id="climber-feedback" class="feedback-message"></div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin-top: 0;"><strong>How to Play:</strong></p>
                <ul>
                    <li>Select a number for each climbing station using the dropdown menus</li>
                    <li>The smallest number goes at the bottom (station 1)</li>
                    <li>The largest number goes at the top (summit)</li>
                    <li>When all numbers are in ascending order, the climber can reach the summit!</li>
                </ul>
            </div>
        </div>
    `;
    
    // Add styles for ascending climber game
    const style = document.createElement('style');
    style.textContent = `
        .climbing-container {
            margin: 30px 0;
            text-align: center;
            position: relative;
        }
        
        .mountain {
            position: relative;
            margin: 0 auto;
            max-width: 500px;
        }
        
        .climbing-stations {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        
        .climbing-station {
            position: absolute;
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 5;
            pointer-events: all;
        }
        
        .station-number {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #ff5722;
            color: white;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .station-selector {
            width: 70px;
            height: 40px;
            font-size: 1.2em;
            text-align: center;
            border: 2px solid #ff5722;
            border-radius: 8px;
            background-color: white;
            color: #0d47a1;
            font-weight: bold;
            padding: 5px;
            -webkit-appearance: menulist-button;
        }
        
        .station-selector:focus {
            outline: none;
            border-color: #0d47a1;
            box-shadow: 0 0 5px rgba(255, 87, 34, 0.5);
        }
        
        .station-selector.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
        }
        
        .climb-instructions {
            margin: 20px 0;
            font-style: italic;
            color: #555;
        }
        
        .number-choices {
            margin: 30px auto;
            max-width: 500px;
            padding: 15px;
            background-color: #e3f2fd;
            border-radius: 8px;
        }
        
        .number-badge-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin-top: 10px;
        }
        
        .number-badge {
            display: inline-block;
            padding: 8px 15px;
            background-color: white;
            border: 2px solid #2196f3;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1.2em;
            color: #0d47a1;
        }
        
        .number-badge.used {
            text-decoration: line-through;
            opacity: 0.5;
            background-color: #f5f5f5;
        }
        
        .check-climb-btn {
            padding: 12px 25px;
            font-size: 1.1em;
            background-color: #ff5722;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .check-climb-btn:hover {
            background-color: #e64a19;
        }
        
        .feedback-message {
            margin: 20px auto;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            min-height: 24px;
            max-width: 500px;
        }
        
        .feedback-message.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .feedback-message.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        /* Animation for correct answer */
        @keyframes climb {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .climb {
            animation: climb 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
    
    // Store correct answer in dataset
    gameArea.dataset.correctOrder = JSON.stringify(sortedNumbers);
    
    // Track which numbers have been used
    const usedNumbers = new Set();
    const selectors = gameArea.querySelectorAll('.station-selector');
    const badges = gameArea.querySelectorAll('.number-badge');
    
    // Add event listeners for the dropdown selectors
    selectors.forEach(selector => {
        selector.addEventListener('change', function() {
            const selectedValue = this.value;
            const previousValue = this.dataset.previousValue;
            
            if (previousValue) {
                // Remove previous selection
                const oldBadge = gameArea.querySelector(`.number-badge[data-value="${previousValue}"]`);
                if (oldBadge) {
                    // Check if the number is still used elsewhere before unmarking
                    let stillUsed = false;
                    selectors.forEach(otherSelector => {
                        if (otherSelector !== selector && otherSelector.value === previousValue) {
                            stillUsed = true;
                        }
                    });
                    
                    if (!stillUsed) {
                        oldBadge.classList.remove('used');
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
                const badge = gameArea.querySelector(`.number-badge[data-value="${selectedValue}"]`);
                if (badge) badge.classList.add('used');
                
                usedNumbers.add(selectedValue);
                this.dataset.previousValue = selectedValue;
            } else {
                this.dataset.previousValue = '';
            }
        });
    });
    
    // Add event listener for the check button
    const checkButton = gameArea.querySelector('.check-climb-btn');
    checkButton.addEventListener('click', checkCompletion);
    
    // Function to check if the order is correct
    function checkCompletion() {
        const feedback = document.getElementById('climber-feedback');
        
        // Get all selected values in order from bottom to top
        const selectedValues = [];
        let incompleteSelections = false;
        
        // Collect values from lowest station (1) to highest
        for (let i = 1; i <= numberCount; i++) {
            const selector = gameArea.querySelector(`.station-selector[data-station="${i}"]`);
            if (!selector.value) {
                incompleteSelections = true;
            } else {
                selectedValues.push(parseInt(selector.value));
            }
        }
        
        if (incompleteSelections) {
            feedback.textContent = 'Please select a number for each climbing station!';
            feedback.className = 'feedback-message incorrect';
            return;
        }
        
        // Check if the order is correct (ascending)
        let isCorrectOrder = true;
        for (let i = 1; i < selectedValues.length; i++) {
            if (selectedValues[i] <= selectedValues[i-1]) {
                isCorrectOrder = false;
                break;
            }
        }
        
        if (isCorrectOrder) {
            feedback.textContent = 'Success! Your climber reached the summit with perfect ascending order!';
            feedback.className = 'feedback-message correct';
            
            // Highlight correct selections
            selectors.forEach(selector => {
                selector.classList.add('correct');
                selector.classList.add('climb');
            });
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.ascendingClimber(gameArea);
            }, 3000);
        } else {
            feedback.textContent = 'Not quite right. The numbers need to be in ascending order (smallest to largest) from bottom to top!';
            feedback.className = 'feedback-message incorrect';
            
            // Shake the feedback to draw attention
            feedback.classList.add('shake');
            setTimeout(() => {
                feedback.classList.remove('shake');
            }, 500);
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkCompletion;
    
    // Function to check if all stations have climbers in the correct order
    function checkCompletion() {
        const feedback = document.getElementById('climber-feedback');
        
        // Check if all stations have numbers
        if (placedNumbers.size === stations.length) {
            // Check if the order is correct
            const correctOrder = JSON.parse(gameArea.dataset.correctOrder);
            let isCorrectOrder = true;
            
            for (let i = 0; i < stations.length; i++) {
                const userNumber = placedNumbers.get(i);
                if (userNumber !== correctOrder[i]) {
                    isCorrectOrder = false;
                    break;
                }
            }
            
            if (isCorrectOrder) {
                feedback.textContent = 'Success! Your climber reached the summit with perfect ascending order!';
                feedback.className = 'feedback-message correct';
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(2);
                UIManager.updateUserProfile();
                
                // Generate a new challenge after a delay
                setTimeout(function() {
                    window.Games.ascendingClimber(gameArea);
                }, 3000);
            } else {
                feedback.textContent = 'Not quite right. The numbers need to be in ascending order (smallest to largest)!';
                feedback.className = 'feedback-message incorrect';
            }
        } else {
            feedback.textContent = '';
            feedback.className = 'feedback-message';
        }
    }
    
    // Override global check answer function
    window.checkAnswer = function(gameArea) {
        const feedback = document.getElementById('climber-feedback');
        
        // Check if all stations have numbers
        if (placedNumbers.size < stations.length) {
            feedback.textContent = 'Place all numbers at climbing stations before checking!';
            feedback.className = 'feedback-message incorrect';
            return;
        }
        
        // Check completion will handle the rest
        checkCompletion();
    };
};

/**
 * Descending Dive Game - Arrange numbers in descending order with a diving theme
 * Touch-friendly version without drag-and-drop
 */
window.Games.descendingDive = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let digits = 2;
    let numberCount = 5;
    
    if (userData.level >= 3) {
        digits = 3;
        numberCount = 6;
    }
    if (userData.level >= 5) {
        digits = 4;
        numberCount = 7;
    }
    
    // Generate random numbers
    const numbers = [];
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    
    for (let i = 0; i < numberCount; i++) {
        let num;
        do {
            num = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (numbers.includes(num));
        numbers.push(num);
    }
    
    // Sort numbers in descending order
    const sortedNumbers = [...numbers].sort((a, b) => b - a);
    
    // Create the game HTML with dropdown selectors instead of drag and drop
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Descending Dive</h3>
            <p style="text-align: center;">Help the diver explore the ocean by arranging numbers from largest to smallest!</p>
            
            <div class="diving-container">
                <div class="ocean">
                    <img src="images/ocean-depths.png" alt="Ocean" style="width: 100%; max-width: 500px;">
                    
                    <div class="diving-stations">
                        ${Array(numberCount).fill().map((_, i) => `
                            <div class="diving-station" data-position="${i}" 
                                 style="top: ${20 + (i * 70 / numberCount)}%; left: ${40 + (i % 2 ? -20 : 20)}%;">
                                <div class="station-number">${i + 1}</div>
                                <select class="depth-selector" data-depth="${i + 1}">
                                    <option value="">--</option>
                                    ${numbers.map(num => `<option value="${num}">${num}</option>`).join('')}
                                </select>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="dive-instructions">
                    <p><strong>Select</strong> a number for each depth to help the diver explore the ocean!</p>
                    <p>Remember: The largest number goes at the top and the smallest goes at the bottom.</p>
                </div>
                
                <div class="number-choices">
                    <p><strong>Available Numbers:</strong></p>
                    <div class="number-badge-container">
                        ${numbers.map(num => `<span class="number-badge" data-value="${num}">${num}</span>`).join('')}
                    </div>
                </div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="check-dive-btn">Check My Answer</button>
                </div>
                
                <div id="diver-feedback" class="feedback-message"></div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin-top: 0;"><strong>How to Play:</strong></p>
                <ul>
                    <li>Select a number for each depth level using the dropdown menus</li>
                    <li>The largest number goes at the top (depth 1)</li>
                    <li>The smallest number goes at the bottom (deepest point)</li>
                    <li>When all numbers are in descending order, the diver can explore the ocean depths!</li>
                </ul>
            </div>
        </div>
    `;
    
    // Add styles for descending dive game
    const style = document.createElement('style');
    style.textContent = `
        .diving-container {
            margin: 30px 0;
            text-align: center;
            position: relative;
        }
        
        .ocean {
            position: relative;
            margin: 0 auto;
            max-width: 500px;
        }
        
        .diving-stations {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        
        .diving-station {
            position: absolute;
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 5;
            pointer-events: all;
        }
        
        .station-number {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #29b6f6;
            color: white;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .depth-selector {
            width: 70px;
            height: 40px;
            font-size: 1.2em;
            text-align: center;
            border: 2px solid #29b6f6;
            border-radius: 8px;
            background-color: white;
            color: #00838f;
            font-weight: bold;
            padding: 5px;
            -webkit-appearance: menulist-button;
        }
        
        .depth-selector:focus {
            outline: none;
            border-color: #00838f;
            box-shadow: 0 0 5px rgba(41, 182, 246, 0.5);
        }
        
        .depth-selector.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
        }
        
        .dive-instructions {
            margin: 20px 0;
            font-style: italic;
            color: #555;
        }
        
        .number-choices {
            margin: 30px auto;
            max-width: 500px;
            padding: 15px;
            background-color: #e3f2fd;
            border-radius: 8px;
        }
        
        .number-badge-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin-top: 10px;
        }
        
        .number-badge {
            display: inline-block;
            padding: 8px 15px;
            background-color: white;
            border: 2px solid #29b6f6;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1.2em;
            color: #00838f;
        }
        
        .number-badge.used {
            text-decoration: line-through;
            opacity: 0.5;
            background-color: #f5f5f5;
        }
        
        .check-dive-btn {
            padding: 12px 25px;
            font-size: 1.1em;
            background-color: #00838f;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .check-dive-btn:hover {
            background-color: #006064;
        }
        
        .feedback-message {
            margin: 20px auto;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            min-height: 24px;
            max-width: 500px;
        }
        
        .feedback-message.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .feedback-message.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        /* Animation for correct answer */
        @keyframes dive {
            0% { transform: translateY(0); }
            50% { transform: translateY(10px); }
            100% { transform: translateY(0); }
        }
        
        .dive {
            animation: dive 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
    
    // Store correct answer in dataset
    gameArea.dataset.correctOrder = JSON.stringify(sortedNumbers);
    
    // Track which numbers have been used
    const usedNumbers = new Set();
    const selectors = gameArea.querySelectorAll('.depth-selector');
    const badges = gameArea.querySelectorAll('.number-badge');
    
    // Add event listeners for the dropdown selectors
    selectors.forEach(selector => {
        selector.addEventListener('change', function() {
            const selectedValue = this.value;
            const previousValue = this.dataset.previousValue;
            
            if (previousValue) {
                // Remove previous selection
                const oldBadge = gameArea.querySelector(`.number-badge[data-value="${previousValue}"]`);
                if (oldBadge) {
                    // Check if the number is still used elsewhere before unmarking
                    let stillUsed = false;
                    selectors.forEach(otherSelector => {
                        if (otherSelector !== selector && otherSelector.value === previousValue) {
                            stillUsed = true;
                        }
                    });
                    
                    if (!stillUsed) {
                        oldBadge.classList.remove('used');
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
                const badge = gameArea.querySelector(`.number-badge[data-value="${selectedValue}"]`);
                if (badge) badge.classList.add('used');
                
                usedNumbers.add(selectedValue);
                this.dataset.previousValue = selectedValue;
            } else {
                this.dataset.previousValue = '';
            }
        });
    });
    
    // Add event listener for the check button
    const checkButton = gameArea.querySelector('.check-dive-btn');
    checkButton.addEventListener('click', checkCompletion);
    
    // Function to check if the order is correct
    function checkCompletion() {
        const feedback = document.getElementById('diver-feedback');
        
        // Get all selected values in order from top to bottom
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
            feedback.textContent = 'Please select a number for each depth level!';
            feedback.className = 'feedback-message incorrect';
            return;
        }
        
        // Check if the order is correct (descending)
        let isCorrectOrder = true;
        for (let i = 1; i < selectedValues.length; i++) {
            if (selectedValues[i] >= selectedValues[i-1]) {
                isCorrectOrder = false;
                break;
            }
        }
        
        if (isCorrectOrder) {
            feedback.textContent = 'Perfect dive! You arranged the numbers in perfect descending order!';
            feedback.className = 'feedback-message correct';
            
            // Highlight correct selections
            selectors.forEach(selector => {
                selector.classList.add('correct');
                selector.classList.add('dive');
            });
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.descendingDive(gameArea);
            }, 3000);
        } else {
            feedback.textContent = 'Not quite right. The numbers need to be in descending order (largest to smallest) from top to bottom!';
            feedback.className = 'feedback-message incorrect';
            
            // Shake the feedback to draw attention
            feedback.classList.add('shake');
            setTimeout(() => {
                feedback.classList.remove('shake');
            }, 500);
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkCompletion;
    
    // Function to check if all stations have divers in the correct order
    function checkCompletion() {
        const feedback = document.getElementById('diver-feedback');
        
        // Check if all stations have numbers
        if (placedNumbers.size === stations.length) {
            // Check if the order is correct
            const correctOrder = JSON.parse(gameArea.dataset.correctOrder);
            let isCorrectOrder = true;
            
            for (let i = 0; i < stations.length; i++) {
                const userNumber = placedNumbers.get(i);
                if (userNumber !== correctOrder[i]) {
                    isCorrectOrder = false;
                    break;
                }
            }
            
            if (isCorrectOrder) {
                feedback.textContent = 'Perfect dive! You arranged the numbers in perfect descending order!';
                feedback.className = 'feedback-message correct';
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(2);
                UIManager.updateUserProfile();
                
                // Generate a new challenge after a delay
                setTimeout(function() {
                    window.Games.descendingDive(gameArea);
                }, 3000);
            } else {
                feedback.textContent = 'Not quite right. The numbers need to be in descending order (largest to smallest)!';
                feedback.className = 'feedback-message incorrect';
            }
        } else {
            feedback.textContent = '';
            feedback.className = 'feedback-message';
        }
    }
    
    // Override global check answer function
    window.checkAnswer = function(gameArea) {
        const feedback = document.getElementById('diver-feedback');
        
        // Check if all stations have numbers
        if (placedNumbers.size < stations.length) {
            feedback.textContent = 'Place all numbers at diving stations before checking!';
            feedback.className = 'feedback-message incorrect';
            return;
        }
        
        // Check completion will handle the rest
        checkCompletion();
    };
};
