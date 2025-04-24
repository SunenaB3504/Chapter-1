/**
 * digit-games-implementation.js - Implementation of digit manipulation games
 */

// Ensure Games object exists
window.Games = window.Games || {};

/**
 * Digit Sorter Game - Sort digits to create numbers with specific properties
 */
window.Games.digitSorter = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let digitCount = 3; // Default - 3 digits
    
    if (userData.level >= 3) {
        digitCount = 4; // 4 digits
    }
    if (userData.level >= 5) {
        digitCount = 5; // 5 digits
    }
    
    // Generate random digits for the game
    const generateDigits = (count) => {
        const digits = [];
        
        // Make sure we have at least one non-zero digit (for leading position)
        digits.push(Math.floor(Math.random() * 9) + 1);
        
        // Generate the rest of the digits
        for (let i = 1; i < count; i++) {
            digits.push(Math.floor(Math.random() * 10));
        }
        
        // Shuffle the digits
        return digits.sort(() => Math.random() - 0.5);
    };
    
    const availableDigits = generateDigits(digitCount);
    
    // Determine the challenges for this round
    const challenges = [
        { 
            type: 'largest', 
            description: 'Arrange the digits to create the largest possible number',
            solution: [...availableDigits].sort((a, b) => b - a).join('')
        },
        { 
            type: 'smallest', 
            description: 'Arrange the digits to create the smallest possible number (no leading zeros)',
            solution: function() {
                // Find the smallest non-zero digit for the first position
                const nonZeros = [...availableDigits].filter(d => d !== 0).sort((a, b) => a - b);
                const firstDigit = nonZeros[0];
                
                // Arrange the rest of the digits in ascending order
                const remainingDigits = [...availableDigits];
                remainingDigits.splice(remainingDigits.indexOf(firstDigit), 1);
                remainingDigits.sort((a, b) => a - b);
                
                return firstDigit + remainingDigits.join('');
            }()
        },
        { 
            type: 'closest_to', 
            targetValue: Math.floor(Math.random() * 900) + 100,
            description: function() {
                return `Arrange the digits to create a number closest to ${this.targetValue}`;
            },
            solution: function() {
                // Generate all possible permutations (without leading zeros)
                const permutations = [];
                
                const generatePermutation = (digits, current = "") => {
                    if (digits.length === 0) {
                        permutations.push(parseInt(current));
                        return;
                    }
                    
                    for (let i = 0; i < digits.length; i++) {
                        // Skip leading zeros
                        if (current === "" && digits[i] === 0) continue;
                        
                        const newDigits = [...digits];
                        newDigits.splice(i, 1);
                        generatePermutation(newDigits, current + digits[i]);
                    }
                };
                
                generatePermutation(availableDigits);
                
                // Find the permutation closest to the target value
                const target = this.targetValue;
                let closestNumber = permutations[0];
                let smallestDifference = Math.abs(permutations[0] - target);
                
                for (let i = 1; i < permutations.length; i++) {
                    const difference = Math.abs(permutations[i] - target);
                    if (difference < smallestDifference) {
                        smallestDifference = difference;
                        closestNumber = permutations[i];
                    }
                }
                
                return closestNumber.toString();
            }
        }
    ];
    
    // Select a random challenge
    const challengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[challengeIndex];
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Digit Sorter</h3>
            <p style="text-align: center;">${challenge.type === 'closest_to' ? challenge.description() : challenge.description}</p>
            
            <div class="digit-sorter-container">
                <div class="available-digits">
                    <p><strong>Available Digits:</strong></p>
                    <div class="digit-options">
                        ${availableDigits.map(digit => `
                            <span class="digit-option" data-value="${digit}">${digit}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="digit-arrangement">
                    <p><strong>Your Number:</strong></p>
                    <div class="digit-slots">
                        ${Array(digitCount).fill().map((_, i) => `
                            <select class="digit-selector" data-position="${i}">
                                <option value="">--</option>
                                ${availableDigits.map(digit => `<option value="${digit}">${digit}</option>`).join('')}
                            </select>
                        `).join('')}
                    </div>
                </div>
                
                <div class="sorter-tip">
                    <p>
                        <strong>Tip:</strong> 
                        ${challenge.type === 'largest' ? 
                            'To create the largest number, place larger digits in higher positions.' : 
                            challenge.type === 'smallest' ? 
                            'To create the smallest number, place smaller non-zero digits at the start, followed by zeros and other small digits.' :
                            'Think about which digits to place in which positions to get as close as possible to the target.'}
                    </p>
                </div>
                
                <div id="sorter-feedback" class="sorter-feedback"></div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="check-sorter-btn">Check My Answer</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for digit sorter game
    const style = document.createElement('style');
    style.textContent = `
        .digit-sorter-container {
            margin: 30px 0;
            text-align: center;
        }
        
        .available-digits {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #e3f2fd;
            border-radius: 8px;
        }
        
        .digit-options {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 10px;
        }
        
        .digit-option {
            display: inline-block;
            width: 50px;
            height: 50px;
            line-height: 50px;
            background-color: #2196f3;
            color: white;
            border-radius: 50%;
            font-weight: bold;
            font-size: 1.5em;
        }
        
        .digit-option.used {
            opacity: 0.5;
            background-color: #90caf9;
        }
        
        .digit-arrangement {
            margin: 20px 0;
        }
        
        .digit-slots {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 10px;
        }
        
        .digit-selector {
            width: 60px;
            height: 60px;
            font-size: 1.5em;
            text-align: center;
            border: 2px solid #2196f3;
            border-radius: 8px;
            padding: 5px;
            background-color: white;
            color: #0d47a1;
            -webkit-appearance: menulist-button;
        }
        
        .digit-selector:focus {
            outline: none;
            border-color: #0d47a1;
        }
        
        .digit-selector.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
        }
        
        .digit-selector.incorrect {
            background-color: #ffebee;
            border-color: #ef5350;
        }
        
        .sorter-tip {
            margin: 20px auto;
            padding: 15px;
            background-color: #fff8e1;
            border-radius: 8px;
            border-left: 5px solid #ffc107;
            text-align: left;
            max-width: 600px;
        }
        
        .sorter-feedback {
            font-weight: bold;
            padding: 15px;
            border-radius: 8px;
            min-height: 20px;
            margin: 20px auto;
            max-width: 500px;
        }
        
        .sorter-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .sorter-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .check-sorter-btn {
            padding: 12px 25px;
            font-size: 1.1em;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .check-sorter-btn:hover {
            background-color: #1976d2;
        }
    `;
    document.head.appendChild(style);
    
    // Store correct solution in dataset
    gameArea.dataset.solution = challenge.solution;
    gameArea.dataset.challengeType = challenge.type;
    if (challenge.type === 'closest_to') {
        gameArea.dataset.targetValue = challenge.targetValue;
    }
    
    // Track used digits
    const usedDigits = new Set();
    const selectors = gameArea.querySelectorAll('.digit-selector');
    const digitOptions = gameArea.querySelectorAll('.digit-option');
    
    // Add event listeners for the dropdowns
    selectors.forEach(selector => {
        selector.addEventListener('change', function() {
            const selectedValue = this.value;
            const previousValue = this.dataset.previousValue;
            
            if (previousValue) {
                // Remove previous selection marking
                const oldDigit = gameArea.querySelector(`.digit-option[data-value="${previousValue}"]`);
                if (oldDigit) {
                    // Check if the digit is still used elsewhere before unmarking
                    let stillUsed = false;
                    selectors.forEach(otherSelector => {
                        if (otherSelector !== selector && otherSelector.value === previousValue) {
                            stillUsed = true;
                        }
                    });
                    
                    if (!stillUsed) {
                        oldDigit.classList.remove('used');
                        usedDigits.delete(previousValue);
                    }
                }
            }
            
            if (selectedValue) {
                // First check if this digit is used elsewhere and clear that selection
                selectors.forEach(otherSelector => {
                    if (otherSelector !== selector && otherSelector.value === selectedValue) {
                        otherSelector.value = '';
                        otherSelector.dataset.previousValue = '';
                    }
                });
                
                // Mark digit as used
                const digitOption = gameArea.querySelector(`.digit-option[data-value="${selectedValue}"]`);
                if (digitOption) digitOption.classList.add('used');
                
                usedDigits.add(selectedValue);
                this.dataset.previousValue = selectedValue;
            } else {
                this.dataset.previousValue = '';
            }
        });
    });
    
    // Add event listener for the check button
    const checkButton = gameArea.querySelector('.check-sorter-btn');
    checkButton.addEventListener('click', checkAnswer);
    
    // Function to check the answer
    function checkAnswer() {
        const feedback = document.getElementById('sorter-feedback');
        
        // Check if all positions have a digit selected
        let allFilled = true;
        selectors.forEach(selector => {
            if (!selector.value) {
                allFilled = false;
            }
        });
        
        if (!allFilled) {
            feedback.textContent = 'Please select a digit for each position!';
            feedback.className = 'sorter-feedback incorrect';
            return;
        }
        
        // Get the student's answer
        let studentAnswer = '';
        selectors.forEach(selector => {
            studentAnswer += selector.value;
        });
        
        // Check the answer based on challenge type
        const challengeType = gameArea.dataset.challengeType;
        const solution = gameArea.dataset.solution;
        
        if (challengeType === 'closest_to') {
            const targetValue = parseInt(gameArea.dataset.targetValue);
            const studentValue = parseInt(studentAnswer);
            const solutionValue = parseInt(solution);
            
            const studentDifference = Math.abs(studentValue - targetValue);
            const solutionDifference = Math.abs(solutionValue - targetValue);
            
            if (studentDifference <= solutionDifference) {
                // Student's answer is as good as or better than the calculated solution
                feedback.textContent = `Perfect! ${studentValue} is ${studentDifference === 0 ? 'exactly' : 'very close to'} ${targetValue}!`;
                feedback.className = 'sorter-feedback correct';
                
                selectors.forEach(selector => selector.classList.add('correct'));
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(2);
                UIManager.updateUserProfile();
                
                // Generate a new challenge after a delay
                setTimeout(function() {
                    window.Games.digitSorter(gameArea);
                }, 2500);
            } else {
                // There's a better solution
                feedback.textContent = `Your answer (${studentValue}) is not the closest possible to ${targetValue}. Try again!`;
                feedback.className = 'sorter-feedback incorrect';
            }
        } else {
            // For largest/smallest, there's only one correct answer
            if (studentAnswer === solution) {
                const feedbackText = challengeType === 'largest' ? 
                    `Perfect! ${studentAnswer} is the largest number you can make with these digits!` :
                    `Perfect! ${studentAnswer} is the smallest number you can make with these digits!`;
                
                feedback.textContent = feedbackText;
                feedback.className = 'sorter-feedback correct';
                
                selectors.forEach(selector => selector.classList.add('correct'));
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(2);
                UIManager.updateUserProfile();
                
                // Generate a new challenge after a delay
                setTimeout(function() {
                    window.Games.digitSorter(gameArea);
                }, 2500);
            } else {
                const feedbackText = challengeType === 'largest' ? 
                    'That\'s not the largest possible number. Try rearranging the digits!' :
                    'That\'s not the smallest possible number. Try rearranging the digits!';
                
                feedback.textContent = feedbackText;
                feedback.className = 'sorter-feedback incorrect';
            }
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkAnswer;
};

/**
 * Number Extremes Game - Find the largest and smallest numbers with given constraints
 */
window.Games.numberExtremes = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let digitCount = 3; // Default - 3 digits
    
    if (userData.level >= 3) {
        digitCount = 4; // 4 digits
    }
    if (userData.level >= 5) {
        digitCount = 5; // 5 digits
    }
    
    // Define possible constraints
    const constraints = [
        {
            type: 'sum',
            description: function(value) {
                return `The sum of all digits is ${value}`;
            },
            generateValue: function() {
                // Generate a reasonable sum based on digit count
                return Math.floor(Math.random() * (5 * digitCount - 5)) + 5;
            },
            validate: function(number, value) {
                const digits = number.toString().split('').map(d => parseInt(d));
                const sum = digits.reduce((a, b) => a + b, 0);
                return sum === value;
            },
            generateSolution: function(value) {
                // For largest number with given sum:
                // Use as many 9s as possible, then the remainder
                let largest = '';
                let remainingSum = value;
                
                for (let i = 0; i < digitCount; i++) {
                    if (remainingSum >= 9) {
                        largest += '9';
                        remainingSum -= 9;
                    } else if (remainingSum > 0) {
                        largest += remainingSum.toString();
                        remainingSum = 0;
                    } else {
                        largest += '0';
                    }
                }
                
                // For smallest number with given sum:
                // Make first digit 1, then distribute remaining sum
                let smallest = '';
                remainingSum = value;
                
                for (let i = 0; i < digitCount; i++) {
                    if (i === 0) {
                        // First digit needs to be at least 1
                        if (remainingSum >= 1) {
                            smallest += '1';
                            remainingSum -= 1;
                        } else {
                            // Edge case handling
                            smallest += '0';
                        }
                    } else if (i === digitCount - 1) {
                        // Last position, use whatever sum is left
                        smallest += remainingSum.toString();
                    } else {
                        smallest += '0';
                    }
                }
                
                return {
                    largest, 
                    smallest: smallest
                };
            }
        },
        {
            type: 'product',
            description: function(value) {
                return `The product of all non-zero digits is ${value}`;
            },
            generateValue: function() {
                // Generate simple product that can be factored
                const factors = [2, 3, 4, 5, 6, 8, 9];
                let product = 1;
                const factorCount = Math.min(digitCount - 1, 3); // Limit factor count
                
                for (let i = 0; i < factorCount; i++) {
                    product *= factors[Math.floor(Math.random() * factors.length)];
                }
                
                return product;
            },
            validate: function(number, value) {
                const digits = number.toString().split('').map(d => parseInt(d));
                const nonZeroDigits = digits.filter(d => d !== 0);
                const product = nonZeroDigits.reduce((a, b) => a * b, 1);
                return product === value;
            },
            generateSolution: function(value) {
                // Factor the number
                const factors = [];
                let remaining = value;
                
                for (let i = 9; i >= 2; i--) {
                    while (remaining % i === 0 && remaining > 1) {
                        factors.push(i);
                        remaining /= i;
                    }
                }
                
                if (remaining > 1) {
                    factors.push(remaining); // Any remaining prime factor
                }
                
                if (factors.length > digitCount) {
                    // Edge case - too many factors for digits
                    return {
                        largest: 'N/A',
                        smallest: 'N/A'
                    };
                }
                
                // For largest: arrange factors in descending order
                let largest = factors.sort((a, b) => b - a).join('');
                while (largest.length < digitCount) {
                    largest += '0';
                }
                
                // For smallest: put 1 at the start, then smallest factors, then zeros
                let smallest = '1'; // Start with 1
                const sortedFactors = factors.sort((a, b) => a - b);
                
                for (let i = 1; i < digitCount; i++) {
                    if (i - 1 < sortedFactors.length) {
                        smallest += sortedFactors[i - 1];
                    } else {
                        smallest += '0';
                    }
                }
                
                return { largest, smallest };
            }
        },
        {
            type: 'even',
            description: function() {
                return 'The number must be even (last digit is 0, 2, 4, 6, or 8)';
            },
            generateValue: function() {
                return null; // No specific value for this constraint
            },
            validate: function(number) {
                return parseInt(number) % 2 === 0;
            },
            generateSolution: function() {
                // For largest: 9s followed by 8
                let largest = '9'.repeat(digitCount - 1) + '8';
                
                // For smallest: 1 followed by 0s, but last digit 2
                let smallest = '1' + '0'.repeat(digitCount - 2) + '0';
                
                return { largest, smallest };
            }
        },
        {
            type: 'odd',
            description: function() {
                return 'The number must be odd (last digit is 1, 3, 5, 7, or 9)';
            },
            generateValue: function() {
                return null; // No specific value for this constraint
            },
            validate: function(number) {
                return parseInt(number) % 2 !== 0;
            },
            generateSolution: function() {
                // For largest: 9s for all digits
                let largest = '9'.repeat(digitCount);
                
                // For smallest: 1 followed by 0s, ending with 1
                let smallest = '1' + '0'.repeat(digitCount - 2) + '1';
                
                return { largest, smallest };
            }
        },
        {
            type: 'divisible',
            description: function(value) {
                return `The number must be divisible by ${value}`;
            },
            generateValue: function() {
                const options = [2, 3, 5, 9];
                return options[Math.floor(Math.random() * options.length)];
            },
            validate: function(number, value) {
                return parseInt(number) % value === 0;
            },
            generateSolution: function(value) {
                let largest, smallest;
                
                if (value === 2) {
                    // For divisible by 2, end with even digit
                    largest = '9'.repeat(digitCount - 1) + '8';
                    smallest = '1' + '0'.repeat(digitCount - 2) + '0';
                } 
                else if (value === 5) {
                    // For divisible by 5, end with 0 or 5
                    largest = '9'.repeat(digitCount - 1) + '5';
                    smallest = '1' + '0'.repeat(digitCount - 2) + '0';
                }
                else if (value === 3 || value === 9) {
                    // For divisible by 3 or 9, sum of digits divisible by 3 or 9
                    if (value === 3) {
                        // Make largest multiple of 3
                        largest = '';
                        let sum = 0;
                        for (let i = 0; i < digitCount; i++) {
                            largest += '9';
                            sum += 9;
                        }
                        const remainder = sum % 3;
                        if (remainder !== 0) {
                            largest = largest.substring(0, digitCount - 1) + (9 - remainder);
                        }
                        
                        // Make smallest multiple of 3
                        smallest = '1' + '0'.repeat(digitCount - 2) + '2';
                        if ((1 + 2) % 3 !== 0) {
                            smallest = '1' + '0'.repeat(digitCount - 3) + '2' + '0';
                        }
                    } else {
                        // Make largest multiple of 9
                        largest = '';
                        let sum = 0;
                        for (let i = 0; i < digitCount; i++) {
                            largest += '9';
                            sum += 9;
                        }
                        const remainder = sum % 9;
                        if (remainder !== 0) {
                            largest = largest.substring(0, digitCount - 1) + (9 - remainder);
                        }
                        
                        // Make smallest multiple of 9
                        smallest = '1' + '0'.repeat(digitCount - 2) + '8';
                        if ((1 + 8) % 9 !== 0) {
                            smallest = '9' + '0'.repeat(digitCount - 1);
                        }
                    }
                }
                
                return { largest, smallest };
            }
        }
    ];
    
    // Select a random constraint
    const constraintIndex = Math.floor(Math.random() * constraints.length);
    const constraint = constraints[constraintIndex];
    const constraintValue = constraint.generateValue();
    const constraintDescription = constraint.description(constraintValue);
    
    // Generate solutions
    const solution = constraint.generateSolution(constraintValue);
    
    // Decide whether to ask for largest or smallest (or both for higher levels)
    let askForBoth = userData.level >= 4;
    let askForLargest = askForBoth ? true : Math.random() > 0.5;
    let askForSmallest = askForBoth ? true : !askForLargest;
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Number Extremes</h3>
            <p style="text-align: center;">Find the ${askForBoth ? 'largest and smallest' : askForLargest ? 'largest' : 'smallest'} ${digitCount}-digit number with this constraint</p>
            
            <div class="extremes-container">
                <div class="extremes-constraint">
                    <div class="constraint-box">
                        <p><strong>Constraint:</strong> ${constraintDescription}</p>
                    </div>
                </div>
                
                ${askForLargest ? `
                <div class="extremes-input-container">
                    <div class="extremes-label">Largest Number:</div>
                    <input type="text" class="extremes-input largest-input" placeholder="Enter largest number">
                </div>
                ` : ''}
                
                ${askForSmallest ? `
                <div class="extremes-input-container">
                    <div class="extremes-label">Smallest Number:</div>
                    <input type="text" class="extremes-input smallest-input" placeholder="Enter smallest number">
                </div>
                ` : ''}
                
                <div class="extremes-tip">
                    <p><strong>Tips:</strong></p>
                    <ul>
                        <li>The number must have exactly ${digitCount} digits</li>
                        <li>First digit cannot be zero</li>
                        <li>All digits must satisfy the constraint</li>
                    </ul>
                </div>
                
                <div id="extremes-feedback" class="extremes-feedback"></div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="check-extremes-btn">Check My Answer</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for number extremes game
    const style = document.createElement('style');
    style.textContent = `
        .extremes-container {
            margin: 30px 0;
            text-align: center;
        }
        
        .extremes-constraint {
            margin-bottom: 30px;
        }
        
        .constraint-box {
            background-color: #e3f2fd;
            padding: 15px;
            border-radius: 8px;
            border-left: 5px solid #2196f3;
            text-align: left;
            font-size: 1.2em;
        }
        
        .extremes-input-container {
            margin: 20px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .extremes-label {
            font-weight: bold;
            color: #0d47a1;
            font-size: 1.1em;
            min-width: 150px;
            text-align: right;
        }
        
        .extremes-input {
            padding: 10px 15px;
            font-size: 1.5em;
            width: 200px;
            border: 2px solid #2196f3;
            border-radius: 8px;
            text-align: center;
            color: #0d47a1;
            font-weight: bold;
        }
        
        .extremes-input:focus {
            outline: none;
            border-color: #0d47a1;
            box-shadow: 0 0 5px rgba(13, 71, 161, 0.3);
        }
        
        .extremes-input.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
        }
        
        .extremes-input.incorrect {
            background-color: #ffebee;
            border-color: #ef5350;
        }
        
        .extremes-tip {
            margin: 30px auto;
            padding: 15px;
            background-color: #fff8e1;
            border-radius: 8px;
            border-left: 5px solid #ffc107;
            text-align: left;
            max-width: 500px;
        }
        
        .extremes-tip ul {
            margin: 5px 0 0 0;
            padding-left: 20px;
        }
        
        .extremes-tip li {
            margin: 5px 0;
        }
        
        .extremes-feedback {
            font-weight: bold;
            padding: 15px;
            border-radius: 8px;
            min-height: 20px;
            margin: 20px auto;
            max-width: 500px;
        }
        
        .extremes-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .extremes-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .check-extremes-btn {
            padding: 12px 25px;
            font-size: 1.1em;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .check-extremes-btn:hover {
            background-color: #1976d2;
        }
    `;
    document.head.appendChild(style);
    
    // Store solution and constraint in dataset
    gameArea.dataset.largestSolution = solution.largest;
    gameArea.dataset.smallestSolution = solution.smallest;
    gameArea.dataset.constraintType = constraint.type;
    gameArea.dataset.constraintValue = constraintValue;
    
    // Add input validation
    const inputs = gameArea.querySelectorAll('.extremes-input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Only allow digits
            this.value = this.value.replace(/\D/g, '');
            
            // Limit input length
            if (this.value.length > digitCount) {
                this.value = this.value.substring(0, digitCount);
            }
        });
    });
    
    // Add event listener for the check button
    const checkButton = gameArea.querySelector('.check-extremes-btn');
    checkButton.addEventListener('click', checkAnswer);
    
    // Function to check the answer
    function checkAnswer() {
        const feedback = document.getElementById('extremes-feedback');
        const largestInput = gameArea.querySelector('.largest-input');
        const smallestInput = gameArea.querySelector('.smallest-input');
        
        let largestCorrect = false;
        let smallestCorrect = false;
        let allFilled = true;
        
        // Check if requested inputs are filled
        if (askForLargest && (!largestInput.value || largestInput.value.length !== digitCount)) {
            allFilled = false;
        }
        
        if (askForSmallest && (!smallestInput.value || smallestInput.value.length !== digitCount)) {
            allFilled = false;
        }
        
        if (!allFilled) {
            feedback.textContent = `Please enter a ${digitCount}-digit number for each required field!`;
            feedback.className = 'extremes-feedback incorrect';
            return;
        }
        
        // Validate that the numbers meet the constraint
        const constraintType = gameArea.dataset.constraintType;
        const constraintValue = gameArea.dataset.constraintValue ? parseInt(gameArea.dataset.constraintValue) : null;
        
        if (askForLargest) {
            const largestValid = constraint.validate(largestInput.value, constraintValue);
            largestCorrect = largestValid && largestInput.value === gameArea.dataset.largestSolution;
            
            if (!largestValid) {
                feedback.textContent = 'Your largest number doesn\'t satisfy the constraint!';
                feedback.className = 'extremes-feedback incorrect';
                largestInput.classList.add('incorrect');
                return;
            } else if (!largestCorrect) {
                // Number satisfies constraint but is not the largest
                largestInput.classList.add('incorrect');
            } else {
                largestInput.classList.add('correct');
            }
        }
        
        if (askForSmallest) {
            const smallestValid = constraint.validate(smallestInput.value, constraintValue);
            smallestCorrect = smallestValid && smallestInput.value === gameArea.dataset.smallestSolution;
            
            if (!smallestValid) {
                feedback.textContent = 'Your smallest number doesn\'t satisfy the constraint!';
                feedback.className = 'extremes-feedback incorrect';
                smallestInput.classList.add('incorrect');
                return;
            } else if (!smallestCorrect) {
                // Number satisfies constraint but is not the smallest
                smallestInput.classList.add('incorrect');
            } else {
                smallestInput.classList.add('correct');
            }
        }
        
        // Handle results
        if (askForBoth) {
            if (largestCorrect && smallestCorrect) {
                feedback.textContent = 'Perfect! You found both the largest and smallest numbers correctly!';
                feedback.className = 'extremes-feedback correct';
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(3);
                UIManager.updateUserProfile();
                
                // Generate a new challenge after a delay
                setTimeout(function() {
                    window.Games.numberExtremes(gameArea);
                }, 2500);
            } else if (largestCorrect) {
                feedback.textContent = 'Your largest number is correct, but there\'s a smaller valid number!';
                feedback.className = 'extremes-feedback incorrect';
            } else if (smallestCorrect) {
                feedback.textContent = 'Your smallest number is correct, but there\'s a larger valid number!';
                feedback.className = 'extremes-feedback incorrect';
            } else {
                feedback.textContent = 'Both numbers satisfy the constraint, but neither is extreme enough!';
                feedback.className = 'extremes-feedback incorrect';
            }
        } else if (askForLargest) {
            if (largestCorrect) {
                feedback.textContent = 'Perfect! You found the largest possible number!';
                feedback.className = 'extremes-feedback correct';
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(2);
                UIManager.updateUserProfile();
                
                // Generate a new challenge after a delay
                setTimeout(function() {
                    window.Games.numberExtremes(gameArea);
                }, 2500);
            } else {
                feedback.textContent = 'Your number satisfies the constraint, but there\'s a larger valid number!';
                feedback.className = 'extremes-feedback incorrect';
            }
        } else {
            if (smallestCorrect) {
                feedback.textContent = 'Perfect! You found the smallest possible number!';
                feedback.className = 'extremes-feedback correct';
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(2);
                UIManager.updateUserProfile();
                
                // Generate a new challenge after a delay
                setTimeout(function() {
                    window.Games.numberExtremes(gameArea);
                }, 2500);
            } else {
                feedback.textContent = 'Your number satisfies the constraint, but there\'s a smaller valid number!';
                feedback.className = 'extremes-feedback incorrect';
            }
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkAnswer;
};

/**
 * Digit Constraints Game - Create numbers with multiple constraints
 */
window.Games.digitConstraints = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let digitCount = 4; // Default - 4 digits
    let constraintCount = 2; // Default - 2 constraints
    
    if (userData.level >= 3) {
        digitCount = 5; // 5 digits
        constraintCount = 3; // 3 constraints
    }
    if (userData.level >= 5) {
        digitCount = 6; // 6 digits
        constraintCount = 4; // 4 constraints
    }
    
    // Define possible constraints
    const constraintTypes = [
        {
            name: 'firstDigit',
            description: function(value) {
                return `The first digit is ${value}`;
            },
            generateValue: function() {
                return Math.floor(Math.random() * 9) + 1; // 1-9
            },
            validate: function(number, value) {
                const firstDigit = parseInt(number.toString()[0]);
                return firstDigit === value;
            }
        },
        {
            name: 'lastDigit',
            description: function(value) {
                return `The last digit is ${value}`;
            },
            generateValue: function() {
                return Math.floor(Math.random() * 10); // 0-9
            },
            validate: function(number, value) {
                const lastDigit = parseInt(number.toString().slice(-1));
                return lastDigit === value;
            }
        },
        {
            name: 'sumOfDigits',
            description: function(value) {
                return `The sum of all digits is ${value}`;
            },
            generateValue: function() {
                // Generate reasonable sum for the digit count
                const minSum = digitCount;
                const maxSum = 9 * digitCount;
                return Math.floor(Math.random() * (maxSum - minSum + 1)) + minSum;
            },
            validate: function(number, value) {
                const digits = number.toString().split('').map(d => parseInt(d));
                const sum = digits.reduce((a, b) => a + b, 0);
                return sum === value;
            }
        },
        {
            name: 'even',
            description: function() {
                return 'The number is even';
            },
            generateValue: function() {
                return null; // No specific value
            },
            validate: function(number) {
                return parseInt(number) % 2 === 0;
            }
        },
        {
            name: 'odd',
            description: function() {
                return 'The number is odd';
            },
            generateValue: function() {
                return null; // No specific value
            },
            validate: function(number) {
                return parseInt(number) % 2 !== 0;
            }
        },
        {
            name: 'containsDigit',
            description: function(value) {
                return `The number contains the digit ${value}`;
            },
            generateValue: function() {
                return Math.floor(Math.random() * 10); // 0-9
            },
            validate: function(number, value) {
                return number.toString().includes(value.toString());
            }
        },
        {
            name: 'divisibleBy',
            description: function(value) {
                return `The number is divisible by ${value}`;
            },
            generateValue: function() {
                const options = [2, 3, 5, 10];
                return options[Math.floor(Math.random() * options.length)];
            },
            validate: function(number, value) {
                return parseInt(number) % value === 0;
            }
        },
        {
            name: 'digitAtPosition',
            description: function(value) {
                const position = value.position;
                const digit = value.digit;
                const positionName = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'][position];
                return `The ${positionName} digit is ${digit}`;
            },
            generateValue: function() {
                const position = Math.floor(Math.random() * (digitCount - 2)) + 1; // Skip first and last positions
                const digit = Math.floor(Math.random() * 10); // 0-9
                return { position, digit };
            },
            validate: function(number, value) {
                const position = value.position;
                const digit = value.digit;
                const digits = number.toString().split('').map(d => parseInt(d));
                return digits[position] === digit;
            }
        }
    ];
    
    // Select random constraints, ensuring they don't conflict
    const selectedConstraints = [];
    const usedConstraintTypes = new Set();
    
    while (selectedConstraints.length < constraintCount) {
        const availableTypes = constraintTypes.filter(type => !usedConstraintTypes.has(type.name));
        
        if (availableTypes.length === 0) break;
        
        const randomIndex = Math.floor(Math.random() * availableTypes.length);
        const selectedType = availableTypes[randomIndex];
        
        const constraintValue = selectedType.generateValue();
        
        // Avoid direct conflicts
        if (selectedType.name === 'even' && usedConstraintTypes.has('odd')) continue;
        if (selectedType.name === 'odd' && usedConstraintTypes.has('even')) continue;
        
        // Avoid conflicts in digit positions
        let conflictsFound = false;
        for (const constraint of selectedConstraints) {
            if (constraint.type.name === 'firstDigit' && selectedType.name === 'firstDigit') {
                conflictsFound = true;
                break;
            }
            if (constraint.type.name === 'lastDigit' && selectedType.name === 'lastDigit') {
                conflictsFound = true;
                break;
            }
            if (constraint.type.name === 'digitAtPosition' && selectedType.name === 'digitAtPosition') {
                if (constraint.value.position === constraintValue.position) {
                    conflictsFound = true;
                    break;
                }
            }
        }
        
        if (conflictsFound) continue;
        
        selectedConstraints.push({
            type: selectedType,
            value: constraintValue,
            description: selectedType.description(constraintValue)
        });
        
        usedConstraintTypes.add(selectedType.name);
    }
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Digit Constraints</h3>
            <p style="text-align: center;">Create a ${digitCount}-digit number that satisfies all constraints</p>
            
            <div class="constraints-container">
                <div class="all-constraints">
                    <p><strong>Your number must satisfy:</strong></p>
                    <ul class="constraints-list">
                        ${selectedConstraints.map(constraint => `
                            <li>${constraint.description}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="number-input-container">
                    <div class="number-label">Your Number:</div>
                    <input type="text" class="constraint-input" placeholder="Enter your number" maxlength="${digitCount}">
                </div>
                
                <div class="constraint-explanation">
                    <p>For a number to satisfy all constraints, it needs to meet every requirement in the list.</p>
                </div>
                
                <div id="constraint-feedback" class="constraint-feedback"></div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="check-constraint-btn">Check My Answer</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for digit constraints game
    const style = document.createElement('style');
    style.textContent = `
        .constraints-container {
            margin: 30px 0;
            text-align: center;
        }
        
        .all-constraints {
            margin-bottom: 30px;
            padding: 20px;
            background-color: #e3f2fd;
            border-radius: 8px;
            text-align: left;
        }
        
        .constraints-list {
            margin: 10px 0;
            padding-left: 20px;
        }
        
        .constraints-list li {
            margin: 8px 0;
            font-size: 1.1em;
        }
        
        .number-input-container {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
            margin: 30px 0;
        }
        
        .number-label {
            font-weight: bold;
            color: #0d47a1;
            font-size: 1.2em;
        }
        
        .constraint-input {
            padding: 15px;
            font-size: 1.8em;
            width: 240px;
            border: 2px solid #2196f3;
            border-radius: 8px;
            text-align: center;
            color: #0d47a1;
            font-weight: bold;
            letter-spacing: 2px;
        }
        
        .constraint-input:focus {
            outline: none;
            border-color: #0d47a1;
            box-shadow: 0 0 5px rgba(13, 71, 161, 0.3);
        }
        
        .constraint-input.correct {
            background-color: #e8f5e9;
            border-color: #4caf50;
        }
        
        .constraint-input.incorrect {
            background-color: #ffebee;
            border-color: #ef5350;
        }
        
        .constraint-explanation {
            margin: 20px auto;
            padding: 15px;
            background-color: #fff8e1;
            border-radius: 8px;
            border-left: 5px solid #ffc107;
            text-align: left;
            max-width: 600px;
            font-style: italic;
            color: #5d4037;
        }
        
        .constraint-feedback {
            font-weight: bold;
            padding: 15px;
            border-radius: 8px;
            min-height: 20px;
            margin: 20px auto;
            max-width: 500px;
        }
        
        .constraint-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .constraint-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .check-constraint-btn {
            padding: 12px 25px;
            font-size: 1.1em;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .check-constraint-btn:hover {
            background-color: #1976d2;
        }
    `;
    document.head.appendChild(style);
    
    // Store constraints in dataset
    gameArea.dataset.constraints = JSON.stringify(selectedConstraints.map(c => ({
        type: c.type.name,
        value: c.value,
        description: c.description
    })));
    
    // Add input validation
    const input = gameArea.querySelector('.constraint-input');
    input.addEventListener('input', function() {
        // Only allow digits
        this.value = this.value.replace(/\D/g, '');
    });
    
    // Add event listener for the check button
    const checkButton = gameArea.querySelector('.check-constraint-btn');
    checkButton.addEventListener('click', checkAnswer);
    
    // Function to check the answer
    function checkAnswer() {
        const feedback = document.getElementById('constraint-feedback');
        const input = gameArea.querySelector('.constraint-input');
        const userNumber = input.value;
        
        // Check if input is valid
        if (!userNumber || userNumber.length !== digitCount || userNumber[0] === '0') {
            feedback.textContent = `Please enter a valid ${digitCount}-digit number (should not start with 0)!`;
            feedback.className = 'constraint-feedback incorrect';
            return;
        }
        
        // Check against all constraints
        const constraintsData = JSON.parse(gameArea.dataset.constraints);
        const failedConstraints = [];
        
        for (const constraintData of constraintsData) {
            const constraintType = constraintTypes.find(type => type.name === constraintData.type);
            
            if (!constraintType) continue;
            
            const isValid = constraintType.validate(userNumber, constraintData.value);
            
            if (!isValid) {
                failedConstraints.push(constraintData.description);
            }
        }
        
        if (failedConstraints.length === 0) {
            feedback.textContent = 'Perfect! Your number satisfies all the constraints!';
            feedback.className = 'constraint-feedback correct';
            input.classList.add('correct');
            input.classList.remove('incorrect');
            
            // Award points and update UI
            const pointsAwarded = Math.max(1, Math.ceil(constraintCount / 2));
            const unlocked = DataManager.updateUserProgress(pointsAwarded);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.digitConstraints(gameArea);
            }, 2500);
        } else {
            const failureMessage = failedConstraints.length === 1 ?
                `Your number fails one constraint: ${failedConstraints[0]}` :
                `Your number fails ${failedConstraints.length} constraints, including: ${failedConstraints[0]}`;
                
            feedback.textContent = failureMessage;
            feedback.className = 'constraint-feedback incorrect';
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkAnswer;
};
