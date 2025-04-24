/**
 * pattern-games-implementation.js - Direct implementation of pattern related games
 */

// Ensure Games object exists
window.Games = window.Games || {};

// Pattern Detective Game - Identify the rule in number patterns
window.Games.patternDetective = function(gameArea) {
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
                    { text: `Add ${step * 2}`, correct: false },
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
    const sequence = patternType.generateSequence(start, step, sequenceLength);
    
    // Generate answer options
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
    `;
    document.head.appendChild(style);
    
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
                window.Games.patternDetective(gameArea);
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
                    window.Games.patternDetective(gameArea);
                }, 3000);
            }, 1500);
        }
    };
};

// Pattern Maker Game - Create and continue number patterns
window.Games.patternMaker = function(gameArea) {
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
            padding: 10px;
            border-radius: 5px;
            min-height: 20px;
            text-align: center;
            font-weight: bold;
        }
        
        .pattern-maker-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .pattern-maker-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .pattern-maker-feedback.hint {
            background-color: #fff3e0;
            color: #f57c00;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listener for reveal rule button
    const revealRuleBtn = gameArea.querySelector('#reveal-rule-btn');
    revealRuleBtn.addEventListener('click', function() {
        const patternRuleEl = document.getElementById('pattern-rule');
        patternRuleEl.textContent = ruleDescription;
        this.disabled = true;
        this.textContent = 'Rule Revealed';
        
        const feedback = document.getElementById('pattern-feedback');
        feedback.textContent = 'Rule revealed! You\'ll earn fewer points now.';
        feedback.className = 'pattern-maker-feedback hint';
        
        // Mark rule as revealed
        gameArea.dataset.ruleRevealed = 'true';
    });
    
    // Store correct answers in dataset
    gameArea.dataset.sequence = JSON.stringify(sequence.slice(4));
    gameArea.dataset.ruleRevealed = 'false';
    
    // Add event listeners for input validations
    const inputs = gameArea.querySelectorAll('.pattern-input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Only allow numbers
            this.value = this.value.replace(/[^\d-]/g, '');
        });
    });
    
    // Check answer function for this game
    window.checkAnswer = function(gameArea) {
        const inputs = gameArea.querySelectorAll('.pattern-input');
        const feedback = document.getElementById('pattern-feedback');
        const correctSequence = JSON.parse(gameArea.dataset.sequence);
        const ruleRevealed = gameArea.dataset.ruleRevealed === 'true';
        
        let allCorrect = true;
        let emptyInputs = false;
        
        inputs.forEach((input, index) => {
            const userAnswer = input.value.trim();
            
            if (userAnswer === '') {
                emptyInputs = true;
            } else if (parseInt(userAnswer) === correctSequence[index]) {
                input.classList.add('correct');
                input.classList.remove('incorrect');
            } else {
                input.classList.add('incorrect');
                input.classList.remove('correct');
                allCorrect = false;
            }
        });
        
        if (emptyInputs) {
            feedback.textContent = 'Please fill in all the missing numbers!';
            feedback.className = 'pattern-maker-feedback incorrect';
            return;
        }
        
        if (allCorrect) {
            feedback.textContent = 'Excellent! You completed the pattern correctly!';
            feedback.className = 'pattern-maker-feedback correct';
            
            // Award points based on whether rule was revealed
            let pointsAwarded = ruleRevealed ? 1 : 2;
            const unlocked = DataManager.updateUserProgress(pointsAwarded);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.patternMaker(gameArea);
            }, 2500);
        } else {
            feedback.textContent = 'Some answers are incorrect. Check your work and try again!';
            feedback.className = 'pattern-maker-feedback incorrect';
        }
    };
};

// Placeholder for sequenceCompleter game
window.Games.sequenceCompleter = function(gameArea) {
    gameArea.innerHTML = `
        <div style="text-align: center; padding: 50px;">
            <h3>Coming Soon!</h3>
            <p>The Sequence Completer game is under development. Try the Pattern Detective or Pattern Maker games instead!</p>
            <div style="margin-top: 30px;">
                <img src="images/NiaEd-.png" alt="Coming Soon" style="max-width: 150px;">
            </div>
        </div>
    `;
};
