/**
 * number-comparison-implementation.js - Implementation of number comparison games
 */

// Ensure Games object exists
window.Games = window.Games || {};

/**
 * Comparison Symbols Game - Complete inequality chains and number comparisons
 */
window.Games.comparingSymbols = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let digits = 3;
    let numInChain = 3; // Default: 3 numbers in chain (2 symbols)
    
    if (userData.level >= 3) {
        digits = 4;
        numInChain = 4; // 4 numbers in chain (3 symbols)
    }
    if (userData.level >= 5) {
        digits = 5;
        numInChain = 5; // 5 numbers in chain (4 symbols)
    }
    
    // Generate ordered numbers with appropriate gaps
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    
    // Function to generate a chain of ordered numbers
    function generateOrderedNumbers(count, ascending) {
        const numbers = [];
        let current = Math.floor(Math.random() * (max - min * count)) + min;
        
        numbers.push(current);
        
        for (let i = 1; i < count; i++) {
            // Create gaps between numbers (increasing as level increases)
            const gap = Math.floor(Math.random() * (max / (10 * count))) + (min / 10);
            current = ascending ? current + gap : current - gap;
            numbers.push(current);
        }
        
        return ascending ? numbers : numbers.reverse();
    }
    
    // Decide if we'll use ascending or descending order (randomly)
    const isAscending = Math.random() < 0.5;
    
    // Generate the ordered chain of numbers
    const orderedNumbers = generateOrderedNumbers(numInChain, isAscending);
    
    // Create an array to track the correct symbols between each pair
    const correctSymbols = [];
    for (let i = 0; i < orderedNumbers.length - 1; i++) {
        if (orderedNumbers[i] < orderedNumbers[i+1]) {
            correctSymbols.push('<');
        } else if (orderedNumbers[i] > orderedNumbers[i+1]) {
            correctSymbols.push('>');
        } else {
            correctSymbols.push('=');
        }
    }
    
    // Randomly decide which positions to leave blank for the student to fill in
    const totalSymbols = correctSymbols.length;
    const numToFill = Math.min(3, totalSymbols);
    const blankPositions = [];
    
    while (blankPositions.length < numToFill) {
        const pos = Math.floor(Math.random() * totalSymbols);
        if (!blankPositions.includes(pos)) {
            blankPositions.push(pos);
        }
    }
    
    // Create HTML for the game
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Comparison Chains</h3>
            <p style="text-align: center;">Complete the comparison chain by filling in the missing symbols</p>
            
            <div class="comparison-chain-container">
                <div class="comparison-chain">
                    ${orderedNumbers.map((num, index) => {
                        // This is the last number in the chain
                        if (index === orderedNumbers.length - 1) {
                            return `<div class="chain-number">${num}</div>`;
                        }
                        
                        // Check if this position needs a symbol filled in
                        const needsSymbol = blankPositions.includes(index);
                        
                        // If the position needs a symbol, show dropdown; otherwise show the correct symbol
                        const symbolHTML = needsSymbol ? 
                            `<div class="chain-symbol empty" data-index="${index}">
                                <select class="symbol-select" data-correct="${correctSymbols[index]}">
                                    <option value="">?</option>
                                    <option value="<">&lt;</option>
                                    <option value="=">=</option>
                                    <option value=">">&gt;</option>
                                </select>
                            </div>` : 
                            `<div class="chain-symbol">${correctSymbols[index] === '<' ? '&lt;' : correctSymbols[index]}</div>`;
                        
                        return `
                            <div class="chain-number">${num}</div>
                            ${symbolHTML}
                        `;
                    }).join('')}
                </div>
                
                <div class="chain-feedback" id="chain-feedback"></div>
                
                <div class="chain-explanation" id="chain-explanation" style="display: none;">
                    <h4>Understanding Comparison Chains</h4>
                    <div class="explanation-content"></div>
                </div>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin: 0;"><strong>Tips for Comparison Chains:</strong></p>
                <ul style="margin-top: 5px;">
                    <li>Compare each pair of adjacent numbers</li>
                    <li>&lt; means "less than" (the smaller number points to the larger one)</li>
                    <li>&gt; means "greater than" (the larger number points to the smaller one)</li>
                    <li>= means the numbers are equal</li>
                    <li>A chain like 5 &lt; 10 &lt; 15 shows increasing order</li>
                </ul>
            </div>
        </div>
    `;
    
    // Add styles for the comparison chain game
    const style = document.createElement('style');
    style.textContent = `
        .comparison-chain-container {
            margin: 30px 0;
        }
        
        .comparison-chain {
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
        
        .chain-number {
            min-width: 80px;
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
            padding: 0 10px;
        }
        
        .chain-symbol {
            min-width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5em;
            font-weight: bold;
            color: #2196f3;
        }
        
        .chain-symbol.empty {
            border: 2px dashed #2196f3;
            border-radius: 50%;
            background-color: #e1f5fe;
        }
        
        .symbol-select {
            width: 100%;
            height: 100%;
            border: none;
            background: transparent;
            text-align: center;
            font-size: 1.2em;
            font-weight: bold;
            color: #0d47a1;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            cursor: pointer;
            padding: 0 5px;
        }
        
        .symbol-select:focus {
            outline: none;
        }
        
        .chain-feedback {
            margin-top: 15px;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            min-height: 24px;
        }
        
        .chain-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .chain-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .chain-explanation {
            margin-top: 20px;
            padding: 15px;
            border-radius: 8px;
            background-color: #e8f5e9;
            display: none;
        }
        
        .chain-explanation h4 {
            margin-top: 0;
            color: #2e7d32;
            text-align: center;
        }
        
        .explanation-content {
            font-size: 1.1em;
            line-height: 1.5;
        }
        
        @media (max-width: 600px) {
            .chain-number {
                min-width: 60px;
                height: 50px;
                font-size: 1.1em;
            }
            
            .chain-symbol {
                min-width: 30px;
                height: 30px;
                font-size: 1.2em;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Check answer function for this game
    window.checkAnswer = function(gameArea) {
        const selects = gameArea.querySelectorAll('.symbol-select');
        const feedback = document.getElementById('chain-feedback');
        const explanation = document.getElementById('chain-explanation');
        const explanationContent = explanation.querySelector('.explanation-content');
        
        let allCorrect = true;
        let allFilled = true;
        
        // Check each symbol selection
        selects.forEach(select => {
            const userAnswer = select.value;
            const correctAnswer = select.dataset.correct;
            
            // Check if the selection is empty
            if (userAnswer === '') {
                allFilled = false;
            } 
            // Check if the selection is correct
            else if (userAnswer === correctAnswer) {
                select.parentElement.classList.add('correct');
            } else {
                select.parentElement.classList.add('incorrect');
                allCorrect = false;
            }
        });
        
        // If not all selections are filled, show message
        if (!allFilled) {
            feedback.textContent = 'Please fill in all the missing comparison symbols!';
            feedback.className = 'chain-feedback incorrect';
            return;
        }
        
        // If all selections are filled and correct
        if (allCorrect) {
            feedback.textContent = 'Correct! You completed the comparison chain!';
            feedback.className = 'chain-feedback correct';
            
            // Show explanation
            explanation.style.display = 'block';
            explanationContent.innerHTML = generateExplanation(orderedNumbers, correctSymbols);
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                Games.comparingSymbols(gameArea);
            }, 3000);
        } else {
            feedback.textContent = 'Some symbols are incorrect. Try again!';
            feedback.className = 'chain-feedback incorrect';
        }
    };
    
    // Helper function to generate explanation
    function generateExplanation(numbers, symbols) {
        let explanation = '<p>Let\'s understand this comparison chain:</p><ul>';
        
        for (let i = 0; i < symbols.length; i++) {
            const num1 = numbers[i];
            const num2 = numbers[i + 1];
            const symbol = symbols[i];
            
            let relationship;
            if (symbol === '<') {
                relationship = 'less than';
            } else if (symbol === '>') {
                relationship = 'greater than';
            } else {
                relationship = 'equal to';
            }
            
            explanation += `<li>${num1} is ${relationship} ${num2}</li>`;
        }
        
        if (numbers.length > 2) {
            // Add an overall explanation for the entire chain
            if (symbols.every(s => s === '<')) {
                explanation += `<li>The numbers are in <strong>increasing order</strong> from left to right.</li>`;
            } else if (symbols.every(s => s === '>')) {
                explanation += `<li>The numbers are in <strong>decreasing order</strong> from left to right.</li>`;
            } else {
                explanation += `<li>This is a <strong>mixed comparison chain</strong> with different relationships.</li>`;
            }
        }
        
        explanation += '</ul>';
        return explanation;
    }
};

/**
 * Number Battle Game - Compare numbers using <, >, = symbols
 */
window.Games.numberBattle = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let digits = 3;
    if (userData.level >= 3) digits = 4;
    if (userData.level >= 5) digits = 5;
    
    // Generate two random numbers with appropriate digits
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    
    // Make sure the numbers are different most of the time (80%)
    let number1, number2;
    const shouldBeEqual = Math.random() < 0.2; // 20% chance they are equal
    
    if (shouldBeEqual) {
        number1 = Math.floor(Math.random() * (max - min + 1)) + min;
        number2 = number1;
    } else {
        number1 = Math.floor(Math.random() * (max - min + 1)) + min;
        do {
            number2 = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (number2 === number1);
    }
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Number Battle</h3>
            <p style="text-align: center;">Compare the numbers using the correct symbol</p>
            
            <div class="number-battle-container">
                <div class="number-battle-arena">
                    <div class="battle-number left">${number1}</div>
                    <div class="battle-comparison">
                        <button class="comparison-btn" data-symbol="<">&lt;</button>
                        <button class="comparison-btn" data-symbol="=">=</button>
                        <button class="comparison-btn" data-symbol=">">&gt;</button>
                    </div>
                    <div class="battle-number right">${number2}</div>
                </div>
                
                <div id="battle-feedback" class="feedback-message"></div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin-top: 0;"><strong>How to Compare Numbers:</strong></p>
                <ul>
                    <li>If the left number is smaller than the right number, use "&lt;"</li>
                    <li>If the left number is equal to the right number, use "="</li>
                    <li>If the left number is greater than the right number, use "&gt;"</li>
                </ul>
            </div>
        </div>
    `;
    
    // Add styles for number battle game
    const style = document.createElement('style');
    style.textContent = `
        .number-battle-container {
            margin: 30px 0;
        }
        
        .number-battle-arena {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            margin: 30px 0;
        }
        
        .battle-number {
            width: 150px;
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5em;
            font-weight: bold;
            border-radius: 15px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .battle-number.left {
            background-color: #bbdefb;
            color: #0d47a1;
            border: 3px solid #2196f3;
        }
        
        .battle-number.right {
            background-color: #ffcdd2;
            color: #b71c1c;
            border: 3px solid #f44336;
        }
        
        .battle-comparison {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .comparison-btn {
            width: 60px;
            height: 40px;
            font-size: 1.5em;
            font-weight: bold;
            background-color: white;
            border: 2px solid #9e9e9e;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .comparison-btn:hover {
            background-color: #f5f5f5;
            transform: scale(1.1);
        }
        
        .comparison-btn.selected {
            background-color: #e1f5fe;
            border-color: #29b6f6;
            transform: scale(1.1);
        }
        
        .comparison-btn.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
        }
        
        .comparison-btn.incorrect {
            background-color: #ffebee;
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
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
    
    // Store correct answer in dataset
    const correctSymbol = number1 < number2 ? "<" : (number1 > number2 ? ">" : "=");
    gameArea.dataset.correctSymbol = correctSymbol;
    
    // Add event listeners for comparison buttons
    const buttons = gameArea.querySelectorAll('.comparison-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all buttons
            buttons.forEach(btn => btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Automatically check answer when selected
            checkAnswer();
        });
    });
    
    // Function to check if the answer is correct
    function checkAnswer() {
        const selectedButton = gameArea.querySelector('.comparison-btn.selected');
        const feedback = document.getElementById('battle-feedback');
        
        if (!selectedButton) {
            feedback.textContent = 'Please select a comparison symbol!';
            feedback.className = 'feedback-message incorrect';
            return;
        }
        
        const userSymbol = selectedButton.dataset.symbol;
        const correctSymbol = gameArea.dataset.correctSymbol;
        
        if (userSymbol === correctSymbol) {
            feedback.textContent = 'Correct! That\'s the right comparison symbol.';
            feedback.className = 'feedback-message correct';
            selectedButton.classList.add('correct');
            
            // Highlight the numbers with pulse animation
            const numbers = gameArea.querySelectorAll('.battle-number');
            numbers.forEach(num => {
                num.classList.add('pulse');
            });
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(1);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.numberBattle(gameArea);
            }, 2000);
        } else {
            feedback.textContent = 'Not quite right. Try again!';
            feedback.className = 'feedback-message incorrect';
            selectedButton.classList.add('incorrect');
            
            // Apply shake effect to selected button
            selectedButton.classList.add('shake');
            setTimeout(() => {
                selectedButton.classList.remove('shake');
                selectedButton.classList.remove('incorrect');
                selectedButton.classList.remove('selected');
            }, 1000);
        }
    }
    
    // Override global check answer function
    window.checkAnswer = function(gameArea) {
        checkAnswer();
    };
};

/**
 * River Length Compare Game - Compare river lengths using proper symbols
 */
window.Games.riverLengthCompare = function(gameArea) {
    // Define river data
    const rivers = [
        { name: "Ganga (Ganges)", length: 2525, image: "images/india-rivers-map.png" },
        { name: "Brahmaputra", length: 2900, image: "images/india-rivers-map.png" },
        { name: "Godavari", length: 1465, image: "images/india-rivers-map.png" },
        { name: "Krishna", length: 1400, image: "images/india-rivers-map.png" },
        { name: "Narmada", length: 1312, image: "images/india-rivers-map.png" },
        { name: "Yamuna", length: 1376, image: "images/india-rivers-map.png" },
        { name: "Kaveri (Cauvery)", length: 800, image: "images/india-rivers-map.png" },
        { name: "Tapti", length: 724, image: "images/india-rivers-map.png" },
        { name: "Mahanadi", length: 858, image: "images/india-rivers-map.png" },
        { name: "Beas", length: 470, image: "images/india-rivers-map.png" },
        { name: "Sutlej", length: 1450, image: "images/india-rivers-map.png" }
    ];
    
    // Select two different rivers
    let river1Index, river2Index;
    do {
        river1Index = Math.floor(Math.random() * rivers.length);
        river2Index = Math.floor(Math.random() * rivers.length);
    } while (river1Index === river2Index);
    
    const river1 = rivers[river1Index];
    const river2 = rivers[river2Index];
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">River Length Comparison</h3>
            <p style="text-align: center;">Compare the lengths of Indian rivers using the correct symbol</p>
            
            <div class="map-container">
                <img src="${river1.image}" alt="India Rivers Map" style="max-width: 100%; height: auto; border-radius: 8px;">
            </div>
            
            <div class="river-comparison-container">
                <div class="river-details">
                    <div class="river-name">${river1.name}</div>
                    <div class="river-length">${river1.length} km</div>
                </div>
                
                <div class="comparison-symbols">
                    <button class="comparison-btn river-btn" data-symbol="<">&lt;</button>
                    <button class="comparison-btn river-btn" data-symbol="=">=</button>
                    <button class="comparison-btn river-btn" data-symbol=">">&gt;</button>
                </div>
                
                <div class="river-details">
                    <div class="river-name">${river2.name}</div>
                    <div class="river-length">${river2.length} km</div>
                </div>
            </div>
            
            <div id="river-feedback" class="feedback-message"></div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin-top: 0;"><strong>Did you know?</strong></p>
                <ul>
                    <li>India has many important rivers that support agriculture and daily life</li>
                    <li>The Ganges (Ganga) is one of the most sacred rivers in India</li>
                    <li>The Brahmaputra is the widest river in India</li>
                </ul>
            </div>
        </div>
    `;
    
    // Add styles for river comparison game
    const style = document.createElement('style');
    style.textContent = `
        .map-container {
            margin: 20px 0;
            text-align: center;
        }
        
        .river-comparison-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 30px;
            margin: 30px 0;
            flex-wrap: wrap;
        }
        
        .river-details {
            width: 180px;
            padding: 15px;
            background-color: #e1f5fe;
            border-radius: 10px;
            border: 2px solid #29b6f6;
            text-align: center;
        }
        
        .river-name {
            font-weight: bold;
            font-size: 1.2em;
            margin-bottom: 10px;
            color: #01579b;
        }
        
        .river-length {
            font-size: 1.5em;
            color: #0277bd;
        }
        
        .comparison-symbols {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .comparison-btn.river-btn {
            width: 60px;
            height: 40px;
            font-size: 1.5em;
            font-weight: bold;
            background-color: white;
            border: 2px solid #9e9e9e;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .comparison-btn.river-btn:hover {
            background-color: #f5f5f5;
            transform: scale(1.1);
        }
        
        .comparison-btn.river-btn.selected {
            background-color: #e1f5fe;
            border-color: #29b6f6;
            transform: scale(1.1);
        }
        
        .comparison-btn.river-btn.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
        }
        
        .comparison-btn.river-btn.incorrect {
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
            max-width: 500px;
        }
    `;
    document.head.appendChild(style);
    
    // Store correct answer in dataset
    const correctSymbol = river1.length < river2.length ? "<" : (river1.length > river2.length ? ">" : "=");
    gameArea.dataset.correctSymbol = correctSymbol;
    
    // Add event listeners for comparison buttons
    const buttons = gameArea.querySelectorAll('.comparison-btn.river-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all buttons
            buttons.forEach(btn => btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Automatically check answer when selected
            checkRiverAnswer();
        });
    });
    
    // Function to check if the answer is correct
    function checkRiverAnswer() {
        const selectedButton = gameArea.querySelector('.comparison-btn.river-btn.selected');
        const feedback = document.getElementById('river-feedback');
        
        if (!selectedButton) {
            feedback.textContent = 'Please select a comparison symbol!';
            feedback.className = 'feedback-message incorrect';
            return;
        }
        
        const userSymbol = selectedButton.dataset.symbol;
        const correctSymbol = gameArea.dataset.correctSymbol;
        
        if (userSymbol === correctSymbol) {
            feedback.textContent = 'Correct! You compared the river lengths correctly.';
            feedback.className = 'feedback-message correct';
            selectedButton.classList.add('correct');
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.riverLengthCompare(gameArea);
            }, 2500);
        } else {
            feedback.textContent = 'Not quite right. Look at the river lengths carefully and try again!';
            feedback.className = 'feedback-message incorrect';
            selectedButton.classList.add('incorrect');
            
            // Remove incorrect styling after a delay
            setTimeout(() => {
                selectedButton.classList.remove('incorrect');
                selectedButton.classList.remove('selected');
            }, 1500);
        }
    }
    
    // Override global check answer function
    window.checkAnswer = function(gameArea) {
        checkRiverAnswer();
    };
};

// Make sure the comingSoon function is properly defined
window.Games.comingSoon = function(gameArea) {
    gameArea.innerHTML = `
        <div style="text-align: center; padding: 50px; background-color: #f0f7ff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="margin-bottom: 20px; color: #2196f3;">Coming Soon!</h3>
            <p style="margin-bottom: 30px; font-size: 1.1em;">This activity is under development and will be available soon.</p>
            <div style="margin: 30px auto; max-width: 200px;">
                <img src="images/NiaEd-.png" alt="Coming Soon" style="max-width: 100%; height: auto;">
            </div>
            <p style="margin-top: 30px; color: #666;">Try one of our other exciting activities!</p>
        </div>
    `;
};
