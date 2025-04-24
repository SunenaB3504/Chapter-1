/**
 * data-interpretation-implementation.js - Implementation of data interpretation games
 */

// Ensure Games object exists
window.Games = window.Games || {};

/**
 * Picture Graph Interpreter Game - Read and interpret picture graphs/pictographs
 */
window.Games.pictureGraphInterpreter = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let questionComplexity = 1; // Default - simple questions
    let maxItems = 20; // Maximum items in graph
    
    if (userData.level >= 3) {
        questionComplexity = 2; // Medium complexity questions
        maxItems = 30;
    }
    if (userData.level >= 5) {
        questionComplexity = 3; // Complex questions
        maxItems = 40;
    }
    
    // Define possible graph themes
    const graphThemes = [
        {
            name: 'Fruits',
            items: ['Apples', 'Bananas', 'Oranges', 'Mangoes', 'Grapes'],
            icon: '🍎', // Emoji representation (will be replaced with images in production)
            itemColor: '#E91E63'
        },
        {
            name: 'Toys',
            items: ['Cars', 'Dolls', 'Blocks', 'Balls', 'Robots'],
            icon: '🚗',
            itemColor: '#2196F3'
        },
        {
            name: 'Animals',
            items: ['Dogs', 'Cats', 'Birds', 'Fish', 'Rabbits'],
            icon: '🐕',
            itemColor: '#FF9800'
        },
        {
            name: 'Books',
            items: ['Story', 'Comic', 'Science', 'Math', 'Art'],
            icon: '📚',
            itemColor: '#4CAF50'
        },
        {
            name: 'Sports',
            items: ['Cricket', 'Football', 'Tennis', 'Swimming', 'Running'],
            icon: '🏏',
            itemColor: '#9C27B0'
        }
    ];
    
    // Select a random theme
    const theme = graphThemes[Math.floor(Math.random() * graphThemes.length)];
    
    // Generate random data for the graph
    const itemCount = Math.floor(Math.random() * 3) + 3; // 3-5 items
    const selectedItems = theme.items.slice(0, itemCount);
    
    const data = {};
    let totalCount = 0;
    
    selectedItems.forEach(item => {
        // Random count for each item
        const count = Math.floor(Math.random() * (maxItems / itemCount)) + 1;
        data[item] = count;
        totalCount += count;
    });
    
    // Generate questions based on the data
    const generateQuestions = () => {
        const questions = [];
        
        // Basic questions (always included)
        const mostPopular = Object.keys(data).reduce((a, b) => data[a] > data[b] ? a : b);
        const leastPopular = Object.keys(data).reduce((a, b) => data[a] < data[b] ? a : b);
        
        questions.push({
            text: `Which ${theme.name.toLowerCase()} appeared the most in the graph?`,
            options: shuffle([...selectedItems]),
            answer: mostPopular,
            type: 'basic'
        });
        
        questions.push({
            text: `Which ${theme.name.toLowerCase()} appeared the least in the graph?`,
            options: shuffle([...selectedItems]),
            answer: leastPopular,
            type: 'basic'
        });
        
        questions.push({
            text: `How many ${mostPopular.toLowerCase()} are there?`,
            options: shuffle([
                data[mostPopular],
                data[mostPopular] + 2,
                data[mostPopular] - 1,
                Math.floor(data[mostPopular] * 1.5)
            ]),
            answer: data[mostPopular],
            type: 'basic'
        });
        
        // Intermediate questions (medium and hard difficulty)
        if (questionComplexity >= 2) {
            // Random item for count question
            const randomItem = selectedItems[Math.floor(Math.random() * selectedItems.length)];
            
            questions.push({
                text: `How many ${randomItem.toLowerCase()} are there?`,
                options: shuffle([
                    data[randomItem],
                    data[randomItem] + 2,
                    data[randomItem] - 2,
                    Math.floor(data[randomItem] * 0.75)
                ]),
                answer: data[randomItem],
                type: 'medium'
            });
            
            // Comparison questions
            const itemsForComparison = shuffle([...selectedItems]).slice(0, 2);
            const firstItem = itemsForComparison[0];
            const secondItem = itemsForComparison[1];
            const difference = Math.abs(data[firstItem] - data[secondItem]);
            
            questions.push({
                text: `How many more ${data[firstItem] > data[secondItem] ? firstItem : secondItem} are there than ${data[firstItem] > data[secondItem] ? secondItem : firstItem}?`,
                options: shuffle([
                    difference,
                    difference + 1,
                    difference - 1,
                    difference + 2
                ]),
                answer: difference,
                type: 'medium'
            });
        }
        
        // Advanced questions (hard difficulty only)
        if (questionComplexity >= 3) {
            // Total count question
            questions.push({
                text: `What is the total number of ${theme.name.toLowerCase()} shown in the graph?`,
                options: shuffle([
                    totalCount,
                    totalCount + 3,
                    totalCount - 2,
                    Math.floor(totalCount * 1.1)
                ]),
                answer: totalCount,
                type: 'hard'
            });
            
            // Fraction or percentage question - select two random items
            const itemsForFraction = shuffle([...selectedItems]).slice(0, 2);
            const combinedCount = data[itemsForFraction[0]] + data[itemsForFraction[1]];
            const combinedFraction = Math.round((combinedCount / totalCount) * 100);
            
            questions.push({
                text: `Approximately what percentage of the total are ${itemsForFraction[0]} and ${itemsForFraction[1]} combined?`,
                options: shuffle([
                    `${combinedFraction}%`,
                    `${combinedFraction + 10}%`,
                    `${Math.max(combinedFraction - 10, 5)}%`,
                    `${Math.min(combinedFraction + 20, 95)}%`
                ]),
                answer: `${combinedFraction}%`,
                type: 'hard'
            });
        }
        
        // Shuffle and select appropriate number of questions based on complexity
        const shuffledQuestions = shuffle(questions);
        
        // Select 1 basic question, 1 medium (if available), and 1 hard (if available)
        const selectedQuestions = [];
        const basicQuestions = shuffledQuestions.filter(q => q.type === 'basic');
        const mediumQuestions = shuffledQuestions.filter(q => q.type === 'medium');
        const hardQuestions = shuffledQuestions.filter(q => q.type === 'hard');
        
        if (basicQuestions.length > 0) {
            selectedQuestions.push(basicQuestions[0]);
        }
        
        if (questionComplexity >= 2 && mediumQuestions.length > 0) {
            selectedQuestions.push(mediumQuestions[0]);
        }
        
        if (questionComplexity >= 3 && hardQuestions.length > 0) {
            selectedQuestions.push(hardQuestions[0]);
        }
        
        return selectedQuestions;
    };
    
    // Helper function to shuffle array
    function shuffle(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    // Generate questions
    const questions = generateQuestions();
    
    // Create the HTML for pictograph
    function createPictograph() {
        let html = `
            <div class="pictograph-container">
                <h4 class="graph-title">${theme.name} in Class 4</h4>
                <div class="pictograph">
        `;
        
        // Create the rows for each item
        for (const item of selectedItems) {
            html += `
                <div class="graph-row">
                    <div class="item-label">${item}</div>
                    <div class="item-icons">
            `;
            
            // Add icons for each count
            for (let i = 0; i < data[item]; i++) {
                html += `<span class="item-icon" style="color: ${theme.itemColor}">${theme.icon}</span>`;
            }
            
            html += `
                    </div>
                    <div class="item-count">${data[item]}</div>
                </div>
            `;
        }
        
        html += `
                </div>
                <div class="graph-key">
                    <div>Key: 1 ${theme.icon} = 1 ${theme.name.slice(0, -1)}</div>
                </div>
            </div>
        `;
        
        return html;
    }
    
    // Create the game HTML with question form
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Picture Graph Interpreter</h3>
            <p style="text-align: center;">Study the picture graph and answer the questions</p>
            
            ${createPictograph()}
            
            <div class="question-container">
                <div class="questions-header">
                    <h4>Answer These Questions:</h4>
                </div>
                
                ${questions.map((question, qIndex) => `
                    <div class="question" id="question-${qIndex}">
                        <div class="question-text">${qIndex + 1}. ${question.text}</div>
                        <div class="options-container">
                            ${question.options.map((option, oIndex) => `
                                <div class="option">
                                    <input type="radio" id="q${qIndex}-option${oIndex}" name="q${qIndex}" value="${option}">
                                    <label for="q${qIndex}-option${oIndex}">${option}</label>
                                </div>
                            `).join('')}
                        </div>
                        <div class="question-feedback" id="feedback-${qIndex}"></div>
                    </div>
                `).join('')}
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="check-graph-btn">Check My Answers</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for pictograph game
    const style = document.createElement('style');
    style.textContent = `
        .pictograph-container {
            margin: 20px auto;
            padding: 15px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            max-width: 700px;
        }
        
        .graph-title {
            text-align: center;
            margin-bottom: 15px;
            color: #0d47a1;
            font-size: 1.3em;
        }
        
        .pictograph {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .graph-row {
            display: flex;
            align-items: center;
        }
        
        .item-label {
            width: 100px;
            font-weight: bold;
            text-align: right;
            padding-right: 15px;
        }
        
        .item-icons {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            padding: 5px;
            background-color: #f5f5f5;
            border-radius: 5px;
        }
        
        .item-icon {
            font-size: 1.5em;
        }
        
        .item-count {
            width: 40px;
            text-align: right;
            font-weight: bold;
        }
        
        .graph-key {
            text-align: center;
            margin-top: 15px;
            font-style: italic;
        }
        
        .question-container {
            margin: 25px auto;
            max-width: 700px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            padding: 15px;
        }
        
        .questions-header {
            margin-bottom: 15px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 8px;
        }
        
        .question {
            margin-bottom: 20px;
            padding: 12px;
            background-color: #f9f9f9;
            border-radius: 8px;
        }
        
        .question-text {
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .options-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-left: 15px;
        }
        
        .option {
            display: flex;
            align-items: center;
        }
        
        .option input {
            margin-right: 8px;
        }
        
        .question-feedback {
            margin-top: 10px;
            font-weight: bold;
            min-height: 24px;
        }
        
        .question-feedback.correct {
            color: #4caf50;
        }
        
        .question-feedback.incorrect {
            color: #f44336;
        }
        
        .check-graph-btn {
            padding: 12px 25px;
            font-size: 1.1em;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .check-graph-btn:hover {
            background-color: #1976d2;
        }
    `;
    document.head.appendChild(style);
    
    // Store questions and answers in dataset
    gameArea.dataset.questions = JSON.stringify(questions);
    
    // Add event listener for the check button
    const checkButton = gameArea.querySelector('.check-graph-btn');
    checkButton.addEventListener('click', checkAnswers);
    
    // Function to check answers
    function checkAnswers() {
        const questions = JSON.parse(gameArea.dataset.questions);
        let allCorrect = true;
        let score = 0;
        
        questions.forEach((question, index) => {
            const selectedOption = gameArea.querySelector(`input[name="q${index}"]:checked`);
            const feedbackEl = document.getElementById(`feedback-${index}`);
            
            if (!selectedOption) {
                feedbackEl.textContent = 'Please select an answer!';
                feedbackEl.className = 'question-feedback incorrect';
                allCorrect = false;
                return;
            }
            
            const userAnswer = selectedOption.value;
            
            if (userAnswer === question.answer.toString()) {
                feedbackEl.textContent = 'Correct!';
                feedbackEl.className = 'question-feedback correct';
                score++;
            } else {
                feedbackEl.textContent = `Incorrect. The answer is ${question.answer}.`;
                feedbackEl.className = 'question-feedback incorrect';
                allCorrect = false;
            }
        });
        
        if (allCorrect) {
            // Award points based on number of questions answered correctly
            const pointsAwarded = Math.min(3, score);
            const unlocked = DataManager.updateUserProgress(pointsAwarded);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.pictureGraphInterpreter(gameArea);
            }, 3000);
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkAnswers;
};

/**
 * Bar Graph Interpreter Game - Read and interpret bar graphs/charts
 */
window.Games.barGraphInterpreter = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let questionComplexity = 1; // Default - simple questions
    let maxValue = 50; // Maximum value in graph
    
    if (userData.level >= 3) {
        questionComplexity = 2; // Medium complexity questions
        maxValue = 100;
    }
    if (userData.level >= 5) {
        questionComplexity = 3; // Complex questions
        maxValue = 200;
    }
    
    // Define possible graph themes
    const graphThemes = [
        {
            name: 'Monthly Rainfall',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            unit: 'mm',
            barColor: '#42A5F5'
        },
        {
            name: 'Books Read',
            categories: ['Aarav', 'Diya', 'Rohan', 'Priya', 'Vivaan'],
            unit: 'books',
            barColor: '#66BB6A'
        },
        {
            name: 'Test Scores',
            categories: ['Science', 'Math', 'English', 'History', 'Art'],
            unit: 'points',
            barColor: '#AB47BC'
        },
        {
            name: 'Pencils Sold',
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            unit: 'pencils',
            barColor: '#FF7043'
        },
        {
            name: 'Steps Walked',
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            unit: 'steps',
            barColor: '#26A69A'
        }
    ];
    
    // Select a random theme
    const theme = graphThemes[Math.floor(Math.random() * graphThemes.length)];
    
    // Generate random data for the graph
    const categoryCount = Math.min(5, theme.categories.length);
    const selectedCategories = theme.categories.slice(0, categoryCount);
    
    const data = {};
    let totalValue = 0;
    let maxDataValue = 0;
    
    selectedCategories.forEach(category => {
        // Random value for each category
        const value = Math.floor(Math.random() * maxValue) + 10;
        data[category] = value;
        totalValue += value;
        maxDataValue = Math.max(maxDataValue, value);
    });
    
    // Calculate a nice y-axis max value
    const yAxisMax = Math.ceil(maxDataValue / 10) * 10;
    
    // Generate questions based on the data
    const generateQuestions = () => {
        const questions = [];
        
        // Basic questions (always included)
        const highestCategory = Object.keys(data).reduce((a, b) => data[a] > data[b] ? a : b);
        const lowestCategory = Object.keys(data).reduce((a, b) => data[a] < data[b] ? a : b);
        
        questions.push({
            text: `Which category has the highest ${theme.name.toLowerCase()}?`,
            options: shuffle([...selectedCategories]),
            answer: highestCategory,
            type: 'basic'
        });
        
        questions.push({
            text: `Which category has the lowest ${theme.name.toLowerCase()}?`,
            options: shuffle([...selectedCategories]),
            answer: lowestCategory,
            type: 'basic'
        });
        
        questions.push({
            text: `What is the ${theme.name.toLowerCase()} for ${highestCategory}?`,
            options: shuffle([
                `${data[highestCategory]} ${theme.unit}`,
                `${data[highestCategory] + 5} ${theme.unit}`,
                `${data[highestCategory] - 5} ${theme.unit}`,
                `${Math.floor(data[highestCategory] * 1.2)} ${theme.unit}`
            ]),
            answer: `${data[highestCategory]} ${theme.unit}`,
            type: 'basic'
        });
        
        // Intermediate questions (medium and hard difficulty)
        if (questionComplexity >= 2) {
            // Random category for value question
            const randomCategory = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
            
            questions.push({
                text: `What is the ${theme.name.toLowerCase()} for ${randomCategory}?`,
                options: shuffle([
                    `${data[randomCategory]} ${theme.unit}`,
                    `${data[randomCategory] + 10} ${theme.unit}`,
                    `${data[randomCategory] - 8} ${theme.unit}`,
                    `${Math.floor(data[randomCategory] * 0.9)} ${theme.unit}`
                ]),
                answer: `${data[randomCategory]} ${theme.unit}`,
                type: 'medium'
            });
            
            // Difference between two categories
            const categoriesToCompare = shuffle([...selectedCategories]).slice(0, 2);
            const firstCategory = categoriesToCompare[0];
            const secondCategory = categoriesToCompare[1];
            const difference = Math.abs(data[firstCategory] - data[secondCategory]);
            
            questions.push({
                text: `How much more is the ${theme.name.toLowerCase()} for ${data[firstCategory] > data[secondCategory] ? firstCategory : secondCategory} than for ${data[firstCategory] > data[secondCategory] ? secondCategory : firstCategory}?`,
                options: shuffle([
                    `${difference} ${theme.unit}`,
                    `${difference + 5} ${theme.unit}`,
                    `${difference - 3} ${theme.unit}`,
                    `${difference + 10} ${theme.unit}`
                ]),
                answer: `${difference} ${theme.unit}`,
                type: 'medium'
            });
        }
        
        // Advanced questions (hard difficulty only)
        if (questionComplexity >= 3) {
            // Average value
            const average = Math.round(totalValue / selectedCategories.length);
            
            questions.push({
                text: `What is the average ${theme.name.toLowerCase()} across all categories?`,
                options: shuffle([
                    `${average} ${theme.unit}`,
                    `${average + 5} ${theme.unit}`,
                    `${average - 5} ${theme.unit}`,
                    `${Math.floor(average * 1.1)} ${theme.unit}`
                ]),
                answer: `${average} ${theme.unit}`,
                type: 'hard'
            });
            
            // Sum of two categories
            const categoriesForSum = shuffle([...selectedCategories]).slice(0, 2);
            const sum = data[categoriesForSum[0]] + data[categoriesForSum[1]];
            
            questions.push({
                text: `What is the total ${theme.name.toLowerCase()} for ${categoriesForSum[0]} and ${categoriesForSum[1]} combined?`,
                options: shuffle([
                    `${sum} ${theme.unit}`,
                    `${sum + 8} ${theme.unit}`,
                    `${sum - 6} ${theme.unit}`,
                    `${Math.floor(sum * 1.05)} ${theme.unit}`
                ]),
                answer: `${sum} ${theme.unit}`,
                type: 'hard'
            });
        }
        
        // Shuffle and select appropriate number of questions based on complexity
        const shuffledQuestions = shuffle(questions);
        
        // Select 1 basic question, 1 medium (if available), and 1 hard (if available)
        const selectedQuestions = [];
        const basicQuestions = shuffledQuestions.filter(q => q.type === 'basic');
        const mediumQuestions = shuffledQuestions.filter(q => q.type === 'medium');
        const hardQuestions = shuffledQuestions.filter(q => q.type === 'hard');
        
        if (basicQuestions.length > 0) {
            selectedQuestions.push(basicQuestions[0]);
        }
        
        if (questionComplexity >= 2 && mediumQuestions.length > 0) {
            selectedQuestions.push(mediumQuestions[0]);
        }
        
        if (questionComplexity >= 3 && hardQuestions.length > 0) {
            selectedQuestions.push(hardQuestions[0]);
        }
        
        return selectedQuestions;
    };
    
    // Helper function to shuffle array
    function shuffle(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    // Generate questions
    const questions = generateQuestions();
    
    // Create the HTML for bar graph
    function createBarGraph() {
        // Create y-axis labels (5 steps)
        const yAxisSteps = 5;
        const yAxisLabels = [];
        for (let i = 0; i <= yAxisSteps; i++) {
            yAxisLabels.push(Math.round((yAxisMax / yAxisSteps) * i));
        }
        
        let html = `
            <div class="bar-graph-container">
                <h4 class="graph-title">${theme.name} Chart</h4>
                <div class="bar-graph">
                    <div class="y-axis">
                        ${yAxisLabels.reverse().map(label => `
                            <div class="y-label">${label}</div>
                        `).join('')}
                    </div>
                    
                    <div class="chart-area">
                        <div class="grid-lines">
                            ${yAxisLabels.map(() => `<div class="grid-line"></div>`).join('')}
                        </div>
                        <div class="bars-container">
        `;
        
        // Create bars for each category
        for (const category of selectedCategories) {
            const value = data[category];
            const barHeight = (value / yAxisMax) * 100;
            
            html += `
                <div class="bar-column">
                    <div class="bar-wrapper">
                        <div class="bar-value">${value}</div>
                        <div class="bar" style="height: ${barHeight}%; background-color: ${theme.barColor}"></div>
                    </div>
                    <div class="x-label">${category}</div>
                </div>
            `;
        }
        
        html += `
                        </div>
                    </div>
                </div>
                <div class="graph-units">Units: ${theme.unit}</div>
            </div>
        `;
        
        return html;
    }
    
    // Create the game HTML with questions
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Bar Graph Interpreter</h3>
            <p style="text-align: center;">Study the bar graph and answer the questions</p>
            
            ${createBarGraph()}
            
            <div class="question-container">
                <div class="questions-header">
                    <h4>Answer These Questions:</h4>
                </div>
                
                ${questions.map((question, qIndex) => `
                    <div class="question" id="question-${qIndex}">
                        <div class="question-text">${qIndex + 1}. ${question.text}</div>
                        <div class="options-container">
                            ${question.options.map((option, oIndex) => `
                                <div class="option">
                                    <input type="radio" id="q${qIndex}-option${oIndex}" name="q${qIndex}" value="${option}">
                                    <label for="q${qIndex}-option${oIndex}">${option}</label>
                                </div>
                            `).join('')}
                        </div>
                        <div class="question-feedback" id="feedback-${qIndex}"></div>
                    </div>
                `).join('')}
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="check-graph-btn">Check My Answers</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for bar graph game
    const style = document.createElement('style');
    style.textContent = `
        .bar-graph-container {
            margin: 20px auto;
            padding: 15px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            max-width: 700px;
        }
        
        .graph-title {
            text-align: center;
            margin-bottom: 15px;
            color: #0d47a1;
            font-size: 1.3em;
        }
        
        .bar-graph {
            display: flex;
            height: 300px;
            margin: 0 10px;
        }
        
        .y-axis {
            width: 40px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
            border-right: 1px solid #ccc;
            padding-right: 8px;
        }
        
        .y-label {
            font-size: 0.9em;
            color: #555;
        }
        
        .chart-area {
            flex: 1;
            position: relative;
        }
        
        .grid-lines {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        
        .grid-line {
            width: 100%;
            border-top: 1px dashed #ddd;
        }
        
        .bars-container {
            position: relative;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            z-index: 1;
        }
        
        .bar-column {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 60px;
        }
        
        .bar-wrapper {
            width: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
        }
        
        .bar-value {
            margin-bottom: 5px;
            font-weight: bold;
            font-size: 0.9em;
        }
        
        .bar {
            width: 100%;
            background-color: #2196f3;
            border-radius: 3px 3px 0 0;
            transition: height 0.5s;
        }
        
        .x-label {
            margin-top: 5px;
            font-weight: bold;
            text-align: center;
            font-size: 0.9em;
        }
        
        .graph-units {
            text-align: right;
            margin-top: 5px;
            font-style: italic;
            color: #555;
        }
        
        .question-container {
            margin: 25px auto;
            max-width: 700px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            padding: 15px;
        }
        
        .questions-header {
            margin-bottom: 15px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 8px;
        }
        
        .question {
            margin-bottom: 20px;
            padding: 12px;
            background-color: #f9f9f9;
            border-radius: 8px;
        }
        
        .question-text {
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .options-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-left: 15px;
        }
        
        .option {
            display: flex;
            align-items: center;
        }
        
        .option input {
            margin-right: 8px;
        }
        
        .question-feedback {
            margin-top: 10px;
            font-weight: bold;
            min-height: 24px;
        }
        
        .question-feedback.correct {
            color: #4caf50;
        }
        
        .question-feedback.incorrect {
            color: #f44336;
        }
        
        .check-graph-btn {
            padding: 12px 25px;
            font-size: 1.1em;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .check-graph-btn:hover {
            background-color: #1976d2;
        }
    `;
    document.head.appendChild(style);
    
    // Store questions and answers in dataset
    gameArea.dataset.questions = JSON.stringify(questions);
    
    // Add event listener for the check button
    const checkButton = gameArea.querySelector('.check-graph-btn');
    checkButton.addEventListener('click', checkAnswers);
    
    // Function to check answers
    function checkAnswers() {
        const questions = JSON.parse(gameArea.dataset.questions);
        let allCorrect = true;
        let score = 0;
        
        questions.forEach((question, index) => {
            const selectedOption = gameArea.querySelector(`input[name="q${index}"]:checked`);
            const feedbackEl = document.getElementById(`feedback-${index}`);
            
            if (!selectedOption) {
                feedbackEl.textContent = 'Please select an answer!';
                feedbackEl.className = 'question-feedback incorrect';
                allCorrect = false;
                return;
            }
            
            const userAnswer = selectedOption.value;
            
            if (userAnswer === question.answer) {
                feedbackEl.textContent = 'Correct!';
                feedbackEl.className = 'question-feedback correct';
                score++;
            } else {
                feedbackEl.textContent = `Incorrect. The answer is ${question.answer}.`;
                feedbackEl.className = 'question-feedback incorrect';
                allCorrect = false;
            }
        });
        
        if (allCorrect) {
            // Award points based on number of questions answered correctly
            const pointsAwarded = Math.min(3, score);
            const unlocked = DataManager.updateUserProgress(pointsAwarded);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.barGraphInterpreter(gameArea);
            }, 3000);
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkAnswers;
};

/**
 * Table Interpreter Game - Read and interpret data from tables
 */
window.Games.tableInterpreter = function(gameArea) {
    // Determine difficulty based on user level
    const userData = DataManager.getUserData();
    let questionComplexity = 1; // Default - simple questions
    let maxValue = 50; // Maximum value in table
    
    if (userData.level >= 3) {
        questionComplexity = 2; // Medium complexity questions
        maxValue = 100;
    }
    if (userData.level >= 5) {
        questionComplexity = 3; // Complex questions
        maxValue = 200;
    }
    
    // Define possible table themes
    const tableThemes = [
        {
            name: 'School Attendance',
            rows: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            columns: ['Class 3', 'Class 4', 'Class 5'],
            unit: 'students'
        },
        {
            name: 'Fruit Sales',
            rows: ['Apples', 'Bananas', 'Oranges', 'Grapes', 'Mangoes'],
            columns: ['Week 1', 'Week 2', 'Week 3'],
            unit: 'kg'
        },
        {
            name: 'Temperature Record',
            rows: ['City A', 'City B', 'City C', 'City D'],
            columns: ['Morning', 'Afternoon', 'Evening'],
            unit: '°C'
        },
        {
            name: 'Cricket Scores',
            rows: ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'],
            columns: ['Match 1', 'Match 2', 'Match 3'],
            unit: 'runs'
        },
        {
            name: 'Library Books',
            rows: ['Fiction', 'Science', 'History', 'Art', 'Geography'],
            columns: ['January', 'February', 'March'],
            unit: 'books'
        }
    ];
    
    // Select a random theme
    const theme = tableThemes[Math.floor(Math.random() * tableThemes.length)];
    
    // Determine table size based on difficulty
    const rowCount = Math.min(4, theme.rows.length);
    const columnCount = Math.min(questionComplexity + 1, theme.columns.length);
    
    const selectedRows = theme.rows.slice(0, rowCount);
    const selectedColumns = theme.columns.slice(0, columnCount);
    
    // Generate random data for the table
    const tableData = {};
    let total = 0;
    let maxCell = 0;
    let minCell = maxValue;
    
    selectedRows.forEach(row => {
        tableData[row] = {};
        let rowTotal = 0;
        
        selectedColumns.forEach(col => {
            // Random value for each cell
            const value = Math.floor(Math.random() * (maxValue / 2)) + 5;
            tableData[row][col] = value;
            total += value;
            rowTotal += value;
            
            if (value > maxCell) {
                maxCell = value;
            }
            if (value < minCell) {
                minCell = value;
            }
        });
        
        // Store row totals
        tableData[row].total = rowTotal;
    });
    
    // Calculate column totals
    tableData.columnTotals = {};
    selectedColumns.forEach(col => {
        let colTotal = 0;
        selectedRows.forEach(row => {
            colTotal += tableData[row][col];
        });
        tableData.columnTotals[col] = colTotal;
    });
    tableData.columnTotals.total = total;
      // Generate questions based on the data
    const generateQuestions = () => {
        const questions = [];
        
        // First, find max and min cell values directly
        let maxCellValue = 0;
        let minCellValue = maxValue;
        let maxCellRow, maxCellCol, minCellRow, minCellCol;
        
        // Iterate through all cells to find max and min values and their positions
        selectedRows.forEach(row => {
            selectedColumns.forEach(col => {
                const cellValue = tableData[row][col];
                
                if (cellValue > maxCellValue) {
                    maxCellValue = cellValue;
                    maxCellRow = row;
                    maxCellCol = col;
                }
                
                if (cellValue < minCellValue) {
                    minCellValue = cellValue;
                    minCellRow = row;
                    minCellCol = col;
                }
            });
        });
        
        // Create max and min cell objects
        const maxCell = { row: maxCellRow, col: maxCellCol, value: maxCellValue };
        const minCell = { row: minCellRow, col: minCellCol, value: minCellValue };
        
        // Find row with max total
        const maxRowTotal = selectedRows.reduce((a, b) => tableData[a].total > tableData[b].total ? a : b);
        
        // Find column with max total
        const maxColTotal = selectedColumns.reduce((a, b) => tableData.columnTotals[a] > tableData.columnTotals[b] ? a : b);
        
        // Question about highest value in table
        questions.push({
            text: `Which cell has the highest ${theme.name.toLowerCase()} value?`,
            options: shuffle([
                `${maxCell.row}, ${maxCell.col}`,
                `${selectedRows[0]}, ${selectedColumns[0]}`,
                `${selectedRows[1]}, ${selectedColumns[1]}`,
                `${maxRowTotal}, ${maxColTotal}`
            ]),
            answer: `${maxCell.row}, ${maxCell.col}`,
            type: 'basic'
        });
        
        // Question about specific cell value
        const randomRow = selectedRows[Math.floor(Math.random() * selectedRows.length)];
        const randomCol = selectedColumns[Math.floor(Math.random() * selectedColumns.length)];
        const randomCellValue = tableData[randomRow][randomCol];
        
        questions.push({
            text: `What is the ${theme.name.toLowerCase()} for ${randomRow} in ${randomCol}?`,
            options: shuffle([
                `${randomCellValue} ${theme.unit}`,
                `${randomCellValue + 5} ${theme.unit}`,
                `${randomCellValue - 4} ${theme.unit}`,
                `${randomCellValue * 2} ${theme.unit}`
            ]),
            answer: `${randomCellValue} ${theme.unit}`,
            type: 'basic'
        });
        
        // Row total question
        questions.push({
            text: `What is the total ${theme.name.toLowerCase()} for ${maxRowTotal}?`,
            options: shuffle([
                `${tableData[maxRowTotal].total} ${theme.unit}`,
                `${tableData[maxRowTotal].total + 10} ${theme.unit}`,
                `${tableData[maxRowTotal].total - 8} ${theme.unit}`,
                `${Math.floor(tableData[maxRowTotal].total * 1.2)} ${theme.unit}`
            ]),
            answer: `${tableData[maxRowTotal].total} ${theme.unit}`,
            type: 'basic'
        });
        
        // Intermediate questions (medium and hard difficulty)
        if (questionComplexity >= 2) {
            // Column total question
            questions.push({
                text: `What is the total ${theme.name.toLowerCase()} for ${maxColTotal}?`,
                options: shuffle([
                    `${tableData.columnTotals[maxColTotal]} ${theme.unit}`,
                    `${tableData.columnTotals[maxColTotal] + 12} ${theme.unit}`,
                    `${tableData.columnTotals[maxColTotal] - 7} ${theme.unit}`,
                    `${Math.floor(tableData.columnTotals[maxColTotal] * 1.1)} ${theme.unit}`
                ]),
                answer: `${tableData.columnTotals[maxColTotal]} ${theme.unit}`,
                type: 'medium'
            });
            
            // Comparison between rows
            const rowsToCompare = shuffle([...selectedRows]).slice(0, 2);
            const firstRow = rowsToCompare[0];
            const secondRow = rowsToCompare[1];
            const difference = Math.abs(tableData[firstRow].total - tableData[secondRow].total);
            
            questions.push({
                text: `How much more ${theme.name.toLowerCase()} does ${tableData[firstRow].total > tableData[secondRow].total ? firstRow : secondRow} have than ${tableData[firstRow].total > tableData[secondRow].total ? secondRow : firstRow} in total?`,
                options: shuffle([
                    `${difference} ${theme.unit}`,
                    `${difference + 6} ${theme.unit}`,
                    `${difference - 3} ${theme.unit}`,
                    `${Math.floor(difference * 1.25)} ${theme.unit}`
                ]),
                answer: `${difference} ${theme.unit}`,
                type: 'medium'
            });
        }
        
        // Advanced questions (hard difficulty only)
        if (questionComplexity >= 3) {
            // Grand total question
            questions.push({
                text: `What is the total ${theme.name.toLowerCase()} for the entire table?`,
                options: shuffle([
                    `${total} ${theme.unit}`,
                    `${total + 15} ${theme.unit}`,
                    `${total - 10} ${theme.unit}`,
                    `${Math.floor(total * 1.05)} ${theme.unit}`
                ]),
                answer: `${total} ${theme.unit}`,
                type: 'hard'
            });
            
            // Average question for a column
            const colForAvg = selectedColumns[Math.floor(Math.random() * selectedColumns.length)];
            const avgValue = Math.round(tableData.columnTotals[colForAvg] / selectedRows.length);
            
            questions.push({
                text: `What is the average ${theme.name.toLowerCase()} for ${colForAvg}?`,
                options: shuffle([
                    `${avgValue} ${theme.unit}`,
                    `${avgValue + 4} ${theme.unit}`,
                    `${avgValue - 3} ${theme.unit}`,
                    `${Math.floor(avgValue * 1.2)} ${theme.unit}`
                ]),
                answer: `${avgValue} ${theme.unit}`,
                type: 'hard'
            });
        }
        
        // Shuffle and select appropriate number of questions based on complexity
        const shuffledQuestions = shuffle(questions);
        
        // Select questions based on difficulty
        const selectedQuestions = [];
        const basicQuestions = shuffledQuestions.filter(q => q.type === 'basic');
        const mediumQuestions = shuffledQuestions.filter(q => q.type === 'medium');
        const hardQuestions = shuffledQuestions.filter(q => q.type === 'hard');
        
        // Always include at least one basic question
        if (basicQuestions.length > 0) {
            selectedQuestions.push(basicQuestions[0]);
        }
        
        // Add medium question if available and difficulty allows
        if (questionComplexity >= 2 && mediumQuestions.length > 0) {
            selectedQuestions.push(mediumQuestions[0]);
        }
        
        // Add hard question if available and difficulty allows
        if (questionComplexity >= 3 && hardQuestions.length > 0) {
            selectedQuestions.push(hardQuestions[0]);
        }
        
        return selectedQuestions;
    };
    
    // Helper function to shuffle array
    function shuffle(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    // Generate questions
    const questions = generateQuestions();
    
    // Create the HTML for data table
    function createDataTable() {
        let html = `
            <div class="data-table-container">
                <h4 class="table-title">${theme.name} (${theme.unit})</h4>
                <table class="data-table">
                    <tr>
                        <th></th>
                        ${selectedColumns.map(col => `<th>${col}</th>`).join('')}
                        <th>Total</th>
                    </tr>
        `;
        
        // Create rows with data
        selectedRows.forEach(row => {
            html += `<tr><td>${row}</td>`;
            
            selectedColumns.forEach(col => {
                html += `<td>${tableData[row][col]}</td>`;
            });
            
            html += `<td>${tableData[row].total}</td></tr>`;
        });
        
        // Add totals row
        html += `
                    <tr class="total-row">
                        <td>Total</td>
                        ${selectedColumns.map(col => `<td>${tableData.columnTotals[col]}</td>`).join('')}
                        <td>${total}</td>
                    </tr>
                </table>
            </div>
        `;
        
        return html;
    }
    
    // Create the game HTML with questions
    gameArea.innerHTML = `
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="text-align: center;">Table Interpreter</h3>
            <p style="text-align: center;">Study the table data and answer the questions</p>
            
            ${createDataTable()}
            
            <div class="question-container">
                <div class="questions-header">
                    <h4>Answer These Questions:</h4>
                </div>
                
                ${questions.map((question, qIndex) => `
                    <div class="question" id="question-${qIndex}">
                        <div class="question-text">${qIndex + 1}. ${question.text}</div>
                        <div class="options-container">
                            ${question.options.map((option, oIndex) => `
                                <div class="option">
                                    <input type="radio" id="q${qIndex}-option${oIndex}" name="q${qIndex}" value="${option}">
                                    <label for="q${qIndex}-option${oIndex}">${option}</label>
                                </div>
                            `).join('')}
                        </div>
                        <div class="question-feedback" id="feedback-${qIndex}"></div>
                    </div>
                `).join('')}
                
                <div style="margin-top: 20px; text-align: center;">
                    <button class="check-table-btn">Check My Answers</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for table game
    const style = document.createElement('style');
    style.textContent = `
        .data-table-container {
            margin: 20px auto;
            padding: 15px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            max-width: 700px;
            overflow-x: auto;
        }
        
        .table-title {
            text-align: center;
            margin-bottom: 15px;
            color: #0d47a1;
            font-size: 1.3em;
        }
        
        .data-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .data-table th, .data-table td {
            padding: 10px;
            text-align: center;
            border: 1px solid #e0e0e0;
        }
        
        .data-table th {
            background-color: #e3f2fd;
            color: #0d47a1;
            font-weight: bold;
        }
        
        .data-table tr:nth-child(even) {
            background-color: #f5f5f5;
        }
        
        .data-table td:first-child {
            font-weight: bold;
            background-color: #f5f5f5;
            text-align: left;
        }
        
        .total-row {
            background-color: #e8f5e9 !important;
            font-weight: bold;
        }
        
        .total-row td:first-child {
            background-color: #e8f5e9 !important;
        }
        
        .question-container {
            margin: 25px auto;
            max-width: 700px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            padding: 15px;
        }
        
        .questions-header {
            margin-bottom: 15px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 8px;
        }
        
        .question {
            margin-bottom: 20px;
            padding: 12px;
            background-color: #f9f9f9;
            border-radius: 8px;
        }
        
        .question-text {
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .options-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-left: 15px;
        }
        
        .option {
            display: flex;
            align-items: center;
        }
        
        .option input {
            margin-right: 8px;
        }
        
        .question-feedback {
            margin-top: 10px;
            font-weight: bold;
            min-height: 24px;
        }
        
        .question-feedback.correct {
            color: #4caf50;
        }
        
        .question-feedback.incorrect {
            color: #f44336;
        }
        
        .check-table-btn {
            padding: 12px 25px;
            font-size: 1.1em;
            background-color: #2196f3;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .check-table-btn:hover {
            background-color: #1976d2;
        }
    `;
    document.head.appendChild(style);
    
    // Store questions and answers in dataset
    gameArea.dataset.questions = JSON.stringify(questions);
    
    // Add event listener for the check button
    const checkButton = gameArea.querySelector('.check-table-btn');
    checkButton.addEventListener('click', checkAnswers);
    
    // Function to check answers
    function checkAnswers() {
        const questions = JSON.parse(gameArea.dataset.questions);
        let allCorrect = true;
        let score = 0;
        
        questions.forEach((question, index) => {
            const selectedOption = gameArea.querySelector(`input[name="q${index}"]:checked`);
            const feedbackEl = document.getElementById(`feedback-${index}`);
            
            if (!selectedOption) {
                feedbackEl.textContent = 'Please select an answer!';
                feedbackEl.className = 'question-feedback incorrect';
                allCorrect = false;
                return;
            }
            
            const userAnswer = selectedOption.value;
            
            if (userAnswer === question.answer) {
                feedbackEl.textContent = 'Correct!';
                feedbackEl.className = 'question-feedback correct';
                score++;
            } else {
                feedbackEl.textContent = `Incorrect. The answer is ${question.answer}.`;
                feedbackEl.className = 'question-feedback incorrect';
                allCorrect = false;
            }
        });
        
        if (allCorrect) {
            // Award points based on number of questions answered correctly
            const pointsAwarded = Math.min(3, score);
            const unlocked = DataManager.updateUserProgress(pointsAwarded);
            UIManager.updateUserProfile();
            
            // Generate a new challenge after a delay
            setTimeout(function() {
                window.Games.tableInterpreter(gameArea);
            }, 3000);
        }
    }
    
    // Override global check answer function
    window.checkAnswer = checkAnswers;
};
