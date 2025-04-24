/**
 * financial-games-implementation.js - Implementation of money and finance related games
 */

// Ensure Games object exists
window.Games = window.Games || {};

/**
 * Bill Detective Game - Find the right denomination of rupee notes and coins to match a given amount
 */
window.Games.billDetective = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let maxAmount = 500; // Default - up to 500 rupees
    
    if (userData.level >= 3) {
        maxAmount = 1000; // Up to 1000 rupees
    }
    if (userData.level >= 5) {
        maxAmount = 2500; // Up to 2500 rupees
    }
    
    // Available denominations in Indian currency
    const denominations = [
        { value: 2000, type: 'note', image: 'images/money/2000-note.png' },
        { value: 500, type: 'note', image: 'images/money/500-note.png' },
        { value: 200, type: 'note', image: 'images/money/200-note.png' },
        { value: 100, type: 'note', image: 'images/money/100-note.png' },
        { value: 50, type: 'note', image: 'images/money/50-note.png' },
        { value: 20, type: 'note', image: 'images/money/20-note.png' },
        { value: 10, type: 'note', image: 'images/money/10-note.png' },
        { value: 10, type: 'coin', image: 'images/money/10-coin.png' },
        { value: 5, type: 'coin', image: 'images/money/5-coin.png' },
        { value: 2, type: 'coin', image: 'images/money/2-coin.png' },
        { value: 1, type: 'coin', image: 'images/money/1-coin.png' }
    ];
    
    // Filter denominations based on game difficulty
    let availableDenominations = denominations.filter(d => d.value <= maxAmount);
    
    // Generate a random amount based on difficulty
    const amount = Math.floor(Math.random() * (maxAmount - 20)) + 20;
    
    // Generate the game HTML with placeholder images
    // For real implementation, you'd need to add actual currency images to the project
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Bill Detective</h3>
            <p style="text-align: center;">Select the right combination of notes and coins to make ₹${amount}</p>
            
            <div class="bill-detective-container">
                <div class="currency-summary">
                    <div class="target-amount">Amount to make: <span class="amount-display">₹${amount}</span></div>
                    <div class="current-total">Selected total: <span id="selected-total">₹0</span></div>
                </div>
                
                <div class="currency-options">
                    ${availableDenominations.map(denom => `
                        <div class="currency-item" data-value="${denom.value}" data-type="${denom.type}">
                            <div class="currency-image ${denom.type}">
                                ${denom.type === 'note' ? 
                                    `<div class="currency-note">₹${denom.value}</div>` : 
                                    `<div class="currency-coin">₹${denom.value}</div>`}
                            </div>
                            <div class="currency-controls">
                                <span class="currency-label">₹${denom.value} ${denom.type}</span>
                                <div class="currency-counter">
                                    <button class="counter-btn minus" data-denom="${denom.value}" data-type="${denom.type}">-</button>
                                    <span class="counter-display" id="count-${denom.value}-${denom.type}">0</span>
                                    <button class="counter-btn plus" data-denom="${denom.value}" data-type="${denom.type}">+</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="selected-currency">
                    <p><strong>Your Selection:</strong></p>
                    <div id="selection-summary" class="selection-summary">
                        <p class="empty-selection">No currency selected yet</p>
                    </div>
                </div>
                
                <div id="bill-detective-feedback" class="bill-detective-feedback"></div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="check-bills-btn">Check My Answer</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for bill detective game
    const style = document.createElement('style');
    style.textContent = `
        .bill-detective-container {
            margin: 30px 0;
            text-align: center;
        }
        
        .currency-summary {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 15px;
            background-color: #e3f2fd;
            border-radius: 8px;
            font-weight: bold;
        }
        
        .amount-display {
            font-size: 1.3em;
            color: #0d47a1;
        }
        
        #selected-total {
            font-size: 1.3em;
            color: #2e7d32;
        }
        
        .currency-options {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: center;
            margin: 20px 0;
        }
        
        .currency-item {
            width: 200px;
            padding: 15px 10px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .currency-image {
            margin-bottom: 10px;
            height: 80px;
            width: 160px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .currency-note {
            width: 160px;
            height: 80px;
            background-color: #e8f5e9;
            border: 2px solid #66bb6a;
            color: #2e7d32;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5em;
            font-weight: bold;
            border-radius: 5px;
        }
        
        .currency-coin {
            width: 60px;
            height: 60px;
            background-color: #fff8e1;
            border: 2px solid #ffb74d;
            color: #ef6c00;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3em;
            font-weight: bold;
            border-radius: 50%;
        }
        
        .currency-label {
            font-weight: bold;
            margin-bottom: 8px;
            display: block;
        }
        
        .currency-counter {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .counter-btn {
            width: 32px;
            height: 32px;
            font-size: 1.2em;
            border: none;
            border-radius: 50%;
            background-color: #2196f3;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .counter-btn.minus {
            background-color: #f44336;
        }
        
        .counter-display {
            font-size: 1.3em;
            font-weight: bold;
            min-width: 24px;
        }
        
        .selected-currency {
            margin: 30px 0;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
        }
        
        .selection-summary {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            padding: 10px;
        }
        
        .currency-selection {
            display: flex;
            align-items: center;
            background-color: #e3f2fd;
            padding: 8px 12px;
            border-radius: 50px;
            font-weight: bold;
        }
        
        .empty-selection {
            color: #9e9e9e;
            font-style: italic;
        }
        
        .bill-detective-feedback {
            font-weight: bold;
            padding: 15px;
            border-radius: 8px;
            min-height: 20px;
            margin: 20px auto;
            max-width: 500px;
        }
        
        .bill-detective-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .bill-detective-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .check-bills-btn {
            padding: 12px 25px;
            font-size: 1.1em;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .check-bills-btn:hover {
            background-color: #1976d2;
        }
    `;
    document.head.appendChild(style);
    
    // Store target amount in dataset
    gameArea.dataset.targetAmount = amount;
    
    // Initialize selection
    const selectedCurrency = {};
    availableDenominations.forEach(denom => {
        const key = `${denom.value}-${denom.type}`;
        selectedCurrency[key] = 0;
    });
    
    // Update summary function
    function updateSummary() {
        let total = 0;
        let summaryHTML = '';
        let hasSelections = false;
        
        Object.keys(selectedCurrency).forEach(key => {
            const count = selectedCurrency[key];
            if (count > 0) {
                hasSelections = true;
                const [value, type] = key.split('-');
                const valueNum = parseInt(value);
                total += valueNum * count;
                
                summaryHTML += `<div class="currency-selection">${count} × ₹${value} ${type}${count > 1 ? 's' : ''} = ₹${valueNum * count}</div>`;
            }
        });
        
        // Update total display
        document.getElementById('selected-total').textContent = `₹${total}`;
        
        // Update summary
        const summaryEl = document.getElementById('selection-summary');
        if (hasSelections) {
            summaryEl.innerHTML = summaryHTML;
        } else {
            summaryEl.innerHTML = '<p class="empty-selection">No currency selected yet</p>';
        }
        
        // Store current total in dataset for checking
        gameArea.dataset.currentTotal = total;
    }
    
    // Add event listeners for counter buttons
    const plusButtons = gameArea.querySelectorAll('.counter-btn.plus');
    const minusButtons = gameArea.querySelectorAll('.counter-btn.minus');
    
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const denom = this.dataset.denom;
            const type = this.dataset.type;
            const key = `${denom}-${type}`;
            selectedCurrency[key]++;
            
            document.getElementById(`count-${key}`).textContent = selectedCurrency[key];
            updateSummary();
        });
    });
    
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const denom = this.dataset.denom;
            const type = this.dataset.type;
            const key = `${denom}-${type}`;
            
            if (selectedCurrency[key] > 0) {
                selectedCurrency[key]--;
                document.getElementById(`count-${key}`).textContent = selectedCurrency[key];
                updateSummary();
            }
        });
    });
    
    // Add event listener for the check button
    const checkButton = gameArea.querySelector('.check-bills-btn');
    checkButton.addEventListener('click', checkAnswer);
    
    // Function to check the answer
    function checkAnswer() {
        const feedback = document.getElementById('bill-detective-feedback');
        const targetAmount = parseInt(gameArea.dataset.targetAmount);
        const currentTotal = parseInt(gameArea.dataset.currentTotal);
        
        if (currentTotal === targetAmount) {
            feedback.textContent = `Perfect! Your selections add up to exactly ₹${targetAmount}.`;
            feedback.className = 'bill-detective-feedback correct';
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.billDetective(gameArea);
            }, 2500);
        } else if (currentTotal < targetAmount) {
            feedback.textContent = `Your total (₹${currentTotal}) is less than the target amount (₹${targetAmount}). Add more notes or coins.`;
            feedback.className = 'bill-detective-feedback incorrect';
        } else {
            feedback.textContent = `Your total (₹${currentTotal}) is more than the target amount (₹${targetAmount}). Remove some notes or coins.`;
            feedback.className = 'bill-detective-feedback incorrect';
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkAnswer;
};

/**
 * Cheque Writer Game - Practice writing the correct numbers and words on cheques
 */
window.Games.chequeWriter = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let maxAmount = 5000; // Default - up to 5000 rupees
    
    if (userData.level >= 3) {
        maxAmount = 20000; // Up to 20,000 rupees
    }
    if (userData.level >= 5) {
        maxAmount = 100000; // Up to 1,00,000 rupees
    }
    
    // Generate a random amount
    const amount = Math.floor(Math.random() * maxAmount) + 100;
    
    // Format the amount as per Indian number system
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
    
    // Convert number to words (Indian number system)
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
    
    const formattedAmount = formatIndianNumber(amount);
    const amountInWords = numberToWords(amount);
    
    // Generate random payee name
    const payeeNames = [
        'Aarav Sharma', 'Diya Patel', 'Vihaan Mehta', 'Ananya Singh',
        'Advaith Reddy', 'Ishaan Kumar', 'Saanvi Joshi', 'Arjun Gupta',
        'Anika Verma', 'Reyansh Malhotra', 'School Supplies Ltd.', 
        'City Bookstore', 'Sports Equipment Co.', 'Stationery Mart'
    ];
    const payeeName = payeeNames[Math.floor(Math.random() * payeeNames.length)];
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Cheque Writer</h3>
            <p style="text-align: center;">Fill in the cheque correctly with the amount in numbers and words</p>
            
            <div class="cheque-writer-container">
                <div class="cheque-introduction">
                    <p>Today's Date: <strong>23rd April, 2025</strong></p>
                    <p>You need to write a cheque for <strong>₹${formattedAmount}</strong> to <strong>${payeeName}</strong>.</p>
                </div>
                
                <div class="cheque-template">
                    <div class="cheque-header">
                        <div class="bank-name">STATE BANK OF INDIA</div>
                        <div class="bank-branch">CITY BRANCH, MAIN ROAD</div>
                    </div>
                    
                    <div class="cheque-body">
                        <div class="cheque-date">
                            <label>Date:</label>
                            <div class="date-value">23/04/2025</div>
                        </div>
                        
                        <div class="cheque-payee">
                            <label>Pay:</label>
                            <div class="payee-name">${payeeName}</div>
                        </div>
                        
                        <div class="cheque-amount-words">
                            <label>Rupees:</label>
                            <input type="text" class="words-input" placeholder="Amount in words">
                        </div>
                        
                        <div class="cheque-amount-numbers">
                            <label>₹</label>
                            <input type="text" class="numbers-input" placeholder="Amount in numbers">
                        </div>
                        
                        <div class="cheque-signature">
                            <label>Signature:</label>
                            <div class="signature-placeholder">/s/ (signed)</div>
                        </div>
                    </div>
                </div>
                
                <div class="cheque-tip">
                    <p><strong>Tips for writing a cheque:</strong></p>
                    <ul>
                        <li>Write the amount in numbers with proper commas (e.g., ₹1,234)</li>
                        <li>Write the amount in words with proper capitalization</li>
                        <li>Write "only" at the end of the amount in words</li>
                    </ul>
                </div>
                
                <div id="cheque-feedback" class="cheque-feedback"></div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="check-cheque-btn">Check My Cheque</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for cheque writer game
    const style = document.createElement('style');
    style.textContent = `
        .cheque-writer-container {
            margin: 30px 0;
            text-align: center;
        }
        
        .cheque-introduction {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #e3f2fd;
            border-radius: 8px;
            text-align: left;
            line-height: 1.6;
        }
        
        .cheque-template {
            width: 90%;
            max-width: 700px;
            margin: 30px auto;
            padding: 20px;
            background-color: #f9f7e8;
            border: 2px solid #c3b091;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            position: relative;
            font-family: "Courier New", monospace;
        }
        
        .cheque-template::after {
            content: "SPECIMEN";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-30deg);
            font-size: 5em;
            opacity: 0.1;
            color: #d32f2f;
            pointer-events: none;
        }
        
        .cheque-header {
            border-bottom: 2px solid #c3b091;
            padding-bottom: 10px;
            margin-bottom: 15px;
            text-align: left;
        }
        
        .bank-name {
            font-weight: bold;
            font-size: 1.3em;
            color: #0d47a1;
            margin-bottom: 5px;
        }
        
        .bank-branch {
            font-size: 0.9em;
            color: #555;
        }
        
        .cheque-body {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            text-align: left;
        }
        
        .cheque-date, .cheque-payee, .cheque-amount-words, .cheque-amount-numbers, .cheque-signature {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .cheque-date label, .cheque-payee label, .cheque-amount-words label, .cheque-amount-numbers label, .cheque-signature label {
            min-width: 70px;
            font-weight: bold;
            color: #555;
        }
        
        .cheque-amount-words, .cheque-amount-numbers {
            border-bottom: 1px dashed #c3b091;
            padding-bottom: 5px;
        }
        
        .date-value, .payee-name {
            flex: 1;
            color: #000;
            font-weight: bold;
        }
        
        .words-input, .numbers-input {
            flex: 1;
            padding: 8px 10px;
            border: none;
            border-radius: 5px;
            background-color: rgba(255,255,255,0.5);
            font-family: "Courier New", monospace;
            font-size: 1em;
        }
        
        .words-input:focus, .numbers-input:focus {
            outline: none;
            box-shadow: 0 0 5px rgba(13, 71, 161, 0.3);
            background-color: rgba(255,255,255,0.8);
        }
        
        .signature-placeholder {
            flex: 1;
            text-align: right;
            font-style: italic;
            color: #555;
        }
        
        .cheque-tip {
            margin: 30px auto;
            padding: 15px;
            background-color: #fff8e1;
            border-radius: 8px;
            border-left: 5px solid #ffc107;
            text-align: left;
            max-width: 600px;
        }
        
        .cheque-tip ul {
            margin: 5px 0 0 0;
            padding-left: 20px;
        }
        
        .cheque-tip li {
            margin: 5px 0;
        }
        
        .cheque-feedback {
            font-weight: bold;
            padding: 15px;
            border-radius: 8px;
            min-height: 20px;
            margin: 20px auto;
            max-width: 600px;
        }
        
        .cheque-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .cheque-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .check-cheque-btn {
            padding: 12px 25px;
            font-size: 1.1em;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .check-cheque-btn:hover {
            background-color: #1976d2;
        }
    `;
    document.head.appendChild(style);
    
    // Store correct values in dataset
    gameArea.dataset.amountInNumbers = formattedAmount;
    gameArea.dataset.amountInWords = amountInWords.toLowerCase() + ' only';
    
    // Add event listener for the check button
    const checkButton = gameArea.querySelector('.check-cheque-btn');
    checkButton.addEventListener('click', checkAnswer);
    
    // Function to check the answer
    function checkAnswer() {
        const feedback = document.getElementById('cheque-feedback');
        const numbersInput = gameArea.querySelector('.numbers-input');
        const wordsInput = gameArea.querySelector('.words-input');
        
        const expectedNumbers = gameArea.dataset.amountInNumbers;
        const expectedWords = gameArea.dataset.amountInWords;
        
        const userNumbers = numbersInput.value.trim().replace(/\s+/g, '');
        const userWords = wordsInput.value.trim().toLowerCase().replace(/\s+/g, ' ');
        
        // Check if both inputs are provided
        if (!userNumbers || !userWords) {
            feedback.textContent = 'Please fill in both the amount in numbers and words.';
            feedback.className = 'cheque-feedback incorrect';
            return;
        }
        
        // Check numbers with some flexibility (allow with or without commas)
        const isNumbersCorrect = userNumbers === expectedNumbers || 
            userNumbers === expectedNumbers.replace(/,/g, '') || 
            userNumbers === '₹' + expectedNumbers || 
            userNumbers === 'rs' + expectedNumbers || 
            userNumbers === 'rs.' + expectedNumbers || 
            userNumbers === 'rs ' + expectedNumbers;
        
        // Check words with some flexibility
        const userWordsNormalized = userWords
            .replace(/\band\b/g, '') // Remove "and" - it's optional
            .replace(/rupees/g, '')  // Remove "rupees" - it's optional
            .replace(/\s+/g, ' ')    // Normalize spaces
            .trim();
        
        const expectedWordsNormalized = expectedWords
            .replace(/\band\b/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        
        const isWordsCorrect = userWordsNormalized === expectedWordsNormalized ||
            userWords === expectedWords;
        
        // Provide feedback based on results
        if (isNumbersCorrect && isWordsCorrect) {
            feedback.textContent = 'Perfect! You filled the cheque correctly with the right amount in both numbers and words!';
            feedback.className = 'cheque-feedback correct';
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(3); // Slightly more points for this complex task
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.chequeWriter(gameArea);
            }, 3000);
        } else if (!isNumbersCorrect && !isWordsCorrect) {
            feedback.textContent = 'Both the amount in numbers and words are incorrect. Remember to use proper format with commas for numbers and proper spelling for words.';
            feedback.className = 'cheque-feedback incorrect';
        } else if (!isNumbersCorrect) {
            feedback.textContent = `The amount in numbers is incorrect. You should write: ₹${expectedNumbers}`;
            feedback.className = 'cheque-feedback incorrect';
        } else {
            feedback.textContent = `The amount in words is incorrect. You should write: ${expectedWords}`;
            feedback.className = 'cheque-feedback incorrect';
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkAnswer;
};

/**
 * ATM Simulator Game - Practice using an ATM to withdraw, deposit, or check balance
 */
window.Games.atmSimulator = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let maxBalance = 10000; // Default - up to 10,000 rupees
    let operations = ['withdraw', 'deposit']; // Basic operations
    
    if (userData.level >= 3) {
        maxBalance = 25000;
        operations.push('transfer'); // Add transfer operation
    }
    if (userData.level >= 5) {
        maxBalance = 50000;
        operations.push('mobile_recharge'); // Add mobile recharge operation
    }
    
    // Generate a random starting balance
    const initialBalance = Math.floor(Math.random() * (maxBalance - 5000)) + 5000;
    
    // Format currency function
    function formatCurrency(amount) {
        return '₹' + amount.toLocaleString('en-IN');
    }
    
    // Choose a random operation for this round
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    // Generate operation details based on selected operation
    let operationDetails, expectedAnswer, operationTitle, operationInstructions;
    
    switch (operation) {
        case 'withdraw':
            // Withdrawal amount between 100 and half of balance (in multiples of 100)
            const maxWithdrawal = Math.min(10000, Math.floor(initialBalance / 2));
            const withdrawalAmount = Math.floor(Math.random() * (maxWithdrawal / 100)) * 100 + 100;
            
            operationDetails = {
                type: 'withdrawal',
                amount: withdrawalAmount
            };
            
            expectedAnswer = {
                newBalance: initialBalance - withdrawalAmount,
                withdrawalAmount: withdrawalAmount
            };
            
            operationTitle = 'ATM Withdrawal';
            operationInstructions = `Withdraw ${formatCurrency(withdrawalAmount)} from your account.`;
            break;
            
        case 'deposit':
            // Deposit amount between 100 and 5000 (in multiples of 100)
            const depositAmount = Math.floor(Math.random() * 50) * 100 + 100;
            
            operationDetails = {
                type: 'deposit',
                amount: depositAmount
            };
            
            expectedAnswer = {
                newBalance: initialBalance + depositAmount,
                depositAmount: depositAmount
            };
            
            operationTitle = 'ATM Deposit';
            operationInstructions = `Deposit ${formatCurrency(depositAmount)} into your account.`;
            break;
            
        case 'transfer':
            // Transfer amount between 100 and half of balance (in multiples of 100)
            const maxTransfer = Math.min(10000, Math.floor(initialBalance / 2));
            const transferAmount = Math.floor(Math.random() * (maxTransfer / 100)) * 100 + 100;
            
            // Generate a random account number
            const accountNumber = '91' + Array(10).fill().map(() => Math.floor(Math.random() * 10)).join('');
            
            operationDetails = {
                type: 'transfer',
                amount: transferAmount,
                accountNumber: accountNumber
            };
            
            expectedAnswer = {
                newBalance: initialBalance - transferAmount,
                transferAmount: transferAmount,
                accountNumber: accountNumber
            };
            
            operationTitle = 'ATM Transfer';
            operationInstructions = `Transfer ${formatCurrency(transferAmount)} to account ${accountNumber}.`;
            break;
            
        case 'mobile_recharge':
            // Recharge amount between 10 and 1000
            const rechargeOptions = [10, 20, 50, 99, 149, 199, 249, 349, 499, 649, 799, 999];
            const rechargeAmount = rechargeOptions[Math.floor(Math.random() * rechargeOptions.length)];
            
            // Generate a random phone number
            const phoneNumber = '9' + Math.floor(Math.random() * 9 + 1) + 
                Array(9).fill().map(() => Math.floor(Math.random() * 10)).join('');
            
            operationDetails = {
                type: 'mobile_recharge',
                amount: rechargeAmount,
                phoneNumber: phoneNumber
            };
            
            expectedAnswer = {
                newBalance: initialBalance - rechargeAmount,
                rechargeAmount: rechargeAmount,
                phoneNumber: phoneNumber
            };
            
            operationTitle = 'Mobile Recharge';
            operationInstructions = `Recharge mobile number ${phoneNumber} with ${formatCurrency(rechargeAmount)}.`;
            break;
    }
    
    // Create the game HTML
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">${operationTitle}</h3>
            <p style="text-align: center;">${operationInstructions}</p>
            
            <div class="atm-simulator-container">
                <div class="atm-screen">
                    <div class="atm-header">
                        <div class="bank-logo">SBI ATM</div>
                        <div class="atm-date">23-APR-2025</div>
                    </div>
                    
                    <div class="atm-content">
                        <div class="account-info">
                            <p>Account: XXXX XXXX 1234</p>
                            <p>Available Balance: <span class="balance-amount">${formatCurrency(initialBalance)}</span></p>
                        </div>
                        
                        <div class="atm-operation" data-operation="${operation}">
                            ${operation === 'withdraw' ? `
                                <div class="operation-title">Cash Withdrawal</div>
                                <div class="operation-form">
                                    <div class="form-group">
                                        <label>Amount:</label>
                                        <div class="amount-display">${formatCurrency(operationDetails.amount)}</div>
                                    </div>
                                    <div class="form-group">
                                        <label>Enter PIN:</label>
                                        <input type="password" class="pin-input" maxlength="4" placeholder="****">
                                    </div>
                                    <div class="form-actions">
                                        <button class="atm-btn process-btn">Withdraw</button>
                                        <button class="atm-btn cancel-btn">Cancel</button>
                                    </div>
                                </div>
                            ` : operation === 'deposit' ? `
                                <div class="operation-title">Cash Deposit</div>
                                <div class="operation-form">
                                    <div class="form-group">
                                        <label>Amount:</label>
                                        <div class="amount-display">${formatCurrency(operationDetails.amount)}</div>
                                    </div>
                                    <div class="form-group">
                                        <label>Confirm Deposit:</label>
                                        <div class="confirm-options">
                                            <button class="atm-btn process-btn">Confirm</button>
                                            <button class="atm-btn cancel-btn">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            ` : operation === 'transfer' ? `
                                <div class="operation-title">Fund Transfer</div>
                                <div class="operation-form">
                                    <div class="form-group">
                                        <label>To Account:</label>
                                        <div class="account-display">${operationDetails.accountNumber}</div>
                                    </div>
                                    <div class="form-group">
                                        <label>Amount:</label>
                                        <div class="amount-display">${formatCurrency(operationDetails.amount)}</div>
                                    </div>
                                    <div class="form-group">
                                        <label>Enter PIN:</label>
                                        <input type="password" class="pin-input" maxlength="4" placeholder="****">
                                    </div>
                                    <div class="form-actions">
                                        <button class="atm-btn process-btn">Transfer</button>
                                        <button class="atm-btn cancel-btn">Cancel</button>
                                    </div>
                                </div>
                            ` : `
                                <div class="operation-title">Mobile Recharge</div>
                                <div class="operation-form">
                                    <div class="form-group">
                                        <label>Phone Number:</label>
                                        <div class="phone-display">${operationDetails.phoneNumber}</div>
                                    </div>
                                    <div class="form-group">
                                        <label>Recharge Amount:</label>
                                        <div class="amount-display">${formatCurrency(operationDetails.amount)}</div>
                                    </div>
                                    <div class="form-group">
                                        <label>Confirm Recharge:</label>
                                        <div class="confirm-options">
                                            <button class="atm-btn process-btn">Confirm</button>
                                            <button class="atm-btn cancel-btn">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            `}
                        </div>
                        
                        <div class="atm-result" style="display: none;">
                            <div class="result-message">Transaction Successful!</div>
                            <div class="transaction-details"></div>
                            <div class="new-balance">
                                <label>New Balance:</label>
                                <input type="text" class="balance-input" placeholder="Enter new balance">
                            </div>
                            <div class="receipt-option">
                                <button class="atm-btn check-btn">Check Balance</button>
                                <button class="atm-btn exit-btn">Exit</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="atm-footer">
                        <div>Thank you for using SBI ATM</div>
                    </div>
                </div>
                
                <div id="atm-feedback" class="atm-feedback"></div>
            </div>
        </div>
    `;
    
    // Add styles for ATM simulator game
    const style = document.createElement('style');
    style.textContent = `
        .atm-simulator-container {
            margin: 30px 0;
            text-align: center;
        }
        
        .atm-screen {
            width: 90%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f5f5f5;
            border: 10px solid #424242;
            border-radius: 10px;
            overflow: hidden;
        }
        
        .atm-header {
            background-color: #0d47a1;
            color: white;
            padding: 10px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .bank-logo {
            font-weight: bold;
            font-size: 1.2em;
        }
        
        .atm-content {
            padding: 20px;
            min-height: 300px;
        }
        
        .account-info {
            background-color: #e3f2fd;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
            text-align: left;
        }
        
        .account-info p {
            margin: 5px 0;
        }
        
        .balance-amount {
            font-weight: bold;
            color: #0d47a1;
        }
        
        .atm-operation {
            background-color: white;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .operation-title {
            font-weight: bold;
            font-size: 1.2em;
            margin-bottom: 15px;
            color: #0d47a1;
        }
        
        .operation-form {
            text-align: left;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
        }
        
        .amount-display, .account-display, .phone-display {
            padding: 8px 10px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-weight: bold;
        }
        
        .pin-input {
            width: 100px;
            padding: 8px 10px;
            text-align: center;
            font-size: 1.2em;
            letter-spacing: 5px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        
        .form-actions, .confirm-options {
            display: flex;
            gap: 10px;
            justify-content: flex-start;
        }
        
        .atm-btn {
            padding: 8px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .process-btn {
            background-color: #2196f3;
            color: white;
        }
        
        .cancel-btn {
            background-color: #f44336;
            color: white;
        }
        
        .check-btn {
            background-color: #4caf50;
            color: white;
        }
        
        .exit-btn {
            background-color: #ff9800;
            color: white;
        }
        
        .atm-result {
            background-color: white;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .result-message {
            font-weight: bold;
            font-size: 1.2em;
            color: #4caf50;
            margin-bottom: 15px;
        }
        
        .transaction-details {
            margin-bottom: 15px;
            padding: 10px;
            background-color: #f5f5f5;
            border-radius: 5px;
            text-align: left;
        }
        
        .new-balance {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .new-balance label {
            font-weight: bold;
        }
        
        .balance-input {
            width: 150px;
            padding: 8px 12px;
            border: 2px solid #2196f3;
            border-radius: 5px;
            font-size: 1.1em;
            text-align: center;
        }
        
        .receipt-option {
            margin-top: 20px;
            display: flex;
            gap: 10px;
            justify-content: center;
        }
        
        .atm-footer {
            background-color: #0d47a1;
            color: white;
            padding: 8px;
            font-size: 0.9em;
        }
        
        .atm-feedback {
            font-weight: bold;
            padding: 15px;
            border-radius: 8px;
            min-height: 20px;
            margin: 20px auto;
            max-width: 600px;
        }
        
        .atm-feedback.correct {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .atm-feedback.incorrect {
            background-color: #ffebee;
            color: #c62828;
        }
    `;
    document.head.appendChild(style);
    
    // Store operation details and expected answer in dataset
    gameArea.dataset.initialBalance = initialBalance;
    gameArea.dataset.operation = operation;
    gameArea.dataset.expectedAnswer = JSON.stringify(expectedAnswer);
    
    // Add event listener for PIN input (only focus on digits)
    const pinInput = gameArea.querySelector('.pin-input');
    if (pinInput) {
        pinInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
        });
    }
    
    // Add event listeners for buttons
    const processBtn = gameArea.querySelector('.process-btn');
    const cancelBtn = gameArea.querySelector('.cancel-btn');
    
    processBtn.addEventListener('click', function() {
        // Process the transaction
        const operationEl = gameArea.querySelector('.atm-operation');
        const resultEl = gameArea.querySelector('.atm-result');
        const transactionDetailsEl = gameArea.querySelector('.transaction-details');
        
        // Show appropriate transaction details based on operation type
        let detailsHTML = '';
        
        switch (operation) {
            case 'withdraw':
                detailsHTML = `
                    <p><strong>Transaction Type:</strong> Cash Withdrawal</p>
                    <p><strong>Amount:</strong> ${formatCurrency(operationDetails.amount)}</p>
                    <p><strong>Date:</strong> 23-APR-2025</p>
                    <p><strong>Transaction ID:</strong> WD${Math.floor(Math.random() * 1000000)}</p>
                `;
                break;
                
            case 'deposit':
                detailsHTML = `
                    <p><strong>Transaction Type:</strong> Cash Deposit</p>
                    <p><strong>Amount:</strong> ${formatCurrency(operationDetails.amount)}</p>
                    <p><strong>Date:</strong> 23-APR-2025</p>
                    <p><strong>Transaction ID:</strong> DP${Math.floor(Math.random() * 1000000)}</p>
                `;
                break;
                
            case 'transfer':
                detailsHTML = `
                    <p><strong>Transaction Type:</strong> Fund Transfer</p>
                    <p><strong>Amount:</strong> ${formatCurrency(operationDetails.amount)}</p>
                    <p><strong>To Account:</strong> ${operationDetails.accountNumber}</p>
                    <p><strong>Date:</strong> 23-APR-2025</p>
                    <p><strong>Transaction ID:</strong> TR${Math.floor(Math.random() * 1000000)}</p>
                `;
                break;
                
            case 'mobile_recharge':
                detailsHTML = `
                    <p><strong>Transaction Type:</strong> Mobile Recharge</p>
                    <p><strong>Phone Number:</strong> ${operationDetails.phoneNumber}</p>
                    <p><strong>Amount:</strong> ${formatCurrency(operationDetails.amount)}</p>
                    <p><strong>Date:</strong> 23-APR-2025</p>
                    <p><strong>Transaction ID:</strong> MR${Math.floor(Math.random() * 1000000)}</p>
                `;
                break;
        }
        
        transactionDetailsEl.innerHTML = detailsHTML;
        
        // Hide operation screen, show result screen
        operationEl.style.display = 'none';
        resultEl.style.display = 'block';
    });
    
    cancelBtn.addEventListener('click', function() {
        // Reload the game (simulating cancellation)
        window.Games.atmSimulator(gameArea);
    });
    
    // Add event listeners for result buttons
    const checkBtn = gameArea.querySelector('.check-btn');
    const exitBtn = gameArea.querySelector('.exit-btn');
    
    checkBtn.addEventListener('click', checkAnswer);
    
    exitBtn.addEventListener('click', function() {
        // Generate a new ATM scenario
        window.Games.atmSimulator(gameArea);
    });
    
    // Function to check the answer
    function checkAnswer() {
        const feedback = document.getElementById('atm-feedback');
        const balanceInput = gameArea.querySelector('.balance-input');
        
        // Get user's answer
        const userBalance = parseInt(balanceInput.value.replace(/[₹,\s]/g, ''));
        
        // Get expected answer
        const expectedAnswer = JSON.parse(gameArea.dataset.expectedAnswer);
        const expectedBalance = expectedAnswer.newBalance;
        
        // Check if balance is correct
        if (isNaN(userBalance)) {
            feedback.textContent = 'Please enter a valid amount for the new balance.';
            feedback.className = 'atm-feedback incorrect';
            return;
        }
        
        if (userBalance === expectedBalance) {
            feedback.textContent = 'Correct! You calculated the new balance correctly.';
            feedback.className = 'atm-feedback correct';
            
            // Award points and update UI
            const unlocked = DataManager.updateUserProgress(2);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.atmSimulator(gameArea);
            }, 2500);
        } else {
            feedback.textContent = `Incorrect. The new balance should be ${formatCurrency(expectedBalance)}.`;
            feedback.className = 'atm-feedback incorrect';
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkAnswer;
};
