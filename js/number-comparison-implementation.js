/**
 * number-comparison-implementation.js - Implementation of number comparison games
 */

// Ensure Games object exists
window.Games = window.Games || {};

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
