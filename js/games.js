/**
 * games.js - Contains all game implementations
 * Each game is a separate module function
 */

import DataManager from './data.js';
import UIManager from './ui.js';

const Games = {
    /**
     * Place Value Detective Game
     */
    placeValueDetective: function(gameArea) {
        // Generate a random number based on difficulty
        const userData = DataManager.getUserData();
        let digits = 3;
        if (userData.level >= 2) digits = Math.min(4, digits + Math.floor(userData.level / 2));
        
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        const number = Math.floor(Math.random() * (max - min + 1)) + min;
        const numberDigits = number.toString().split('');
        
        // Define place values based on number of digits
        const places = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'lakhs'];
        const placeValues = places.slice(0, digits).reverse();
        
        // Pick a random digit to ask about
        const questionIndex = Math.floor(Math.random() * digits);
        const correctPosition = placeValues[questionIndex];
        const questionDigit = numberDigits[questionIndex];
        
        // Create the game HTML
        gameArea.innerHTML = `
            <div style="text-align: center; margin-bottom: 30px;">
                <h3>What is the place value of ${questionDigit} in the number ${number}?</h3>
                <div style="font-size: 4em; letter-spacing: 15px; margin: 20px;">
                    ${numberDigits.join('')}
                </div>
            </div>
            <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                ${placeValues.map(pos => `
                    <button class="btn place-value-option" data-position="${pos}">${pos.charAt(0).toUpperCase() + pos.slice(1)}</button>
                `).join('')}
            </div>
        `;
        
        // Add event listeners to buttons
        const options = gameArea.querySelectorAll('.place-value-option');
        options.forEach(button => {
            button.addEventListener('click', (e) => {
                options.forEach(btn => btn.style.backgroundColor = '');
                e.target.style.backgroundColor = '#b1e5f2';
                e.target.classList.add('pulse');
                gameArea.dataset.selectedPosition = e.target.dataset.position;
            });
        });
        
        // Store correct answer in dataset
        gameArea.dataset.correctPosition = correctPosition;
        
        // Override check answer function for this game
        window.checkAnswer = (gameArea) => {
            const selectedPosition = gameArea.dataset.selectedPosition;
            const correctPosition = gameArea.dataset.correctPosition;
            
            if (!selectedPosition) {
                UIManager.showFeedback("Please select an answer first!");
                return;
            }
            
            if (selectedPosition === correctPosition) {
                UIManager.showFeedback("Correct! Great job!", true);
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(1);
                UIManager.updateUserProfile();
                
                // Check if level up occurred
                if (unlocked) {
                    UIManager.showLevelUpAnimation();
                    UIManager.showModuleUnlockNotification(5); // Unlock module id 5
                }
                
                // Animation for correct answer
                const options = gameArea.querySelectorAll('.place-value-option');
                options.forEach(btn => {
                    if (btn.dataset.position === correctPosition) {
                        btn.classList.add('bounce');
                    }
                });
                
                // Generate a new question after a delay
                setTimeout(() => {
                    this.placeValueDetective(gameArea);
                }, 2000);
            } else {
                UIManager.showFeedback("Not quite. Try again!", false);
                
                // Animation for incorrect answer
                const options = gameArea.querySelectorAll('.place-value-option');
                options.forEach(btn => {
                    if (btn.dataset.position === selectedPosition) {
                        btn.classList.add('shake');
                        setTimeout(() => {
                            btn.classList.remove('shake');
                            btn.style.backgroundColor = '';
                        }, 500);
                    }
                });
            }
        };
    },
    
    /**
     * Build-a-Number Game
     */
    buildANumber: function(gameArea) {
        // Determine difficulty based on user level
        const userData = DataManager.getUserData();
        let digits = 3;
        if (userData.level >= 3) digits = 4;
        if (userData.level >= 5) digits = 5;
        
        // Generate a target number
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        const targetNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        
        // Define place values based on number of digits
        const places = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands'];
        const placeValues = places.slice(0, digits).reverse();
        
        gameArea.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3>Build this number using place value blocks!</h3>
                <div style="font-size: 3em; margin: 20px;">${targetNumber}</div>
            </div>
            <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 30px; flex-wrap: wrap;">
                ${placeValues.map((place, index) => `
                    <div class="place-value-container" data-place="${place}">
                        <div style="font-weight: bold; margin-bottom: 10px;">${place.charAt(0).toUpperCase() + place.slice(1)}</div>
                        <div style="font-size: 2em; margin-bottom: 10px;">0</div>
                        <div>
                            <button class="btn btn-secondary" onclick="Games.adjustValue('${place}', -1, '${gameArea.id}')">-</button>
                            <button class="btn btn-secondary" onclick="Games.adjustValue('${place}', 1, '${gameArea.id}')">+</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="text-align: center; font-size: 1.5em; margin: 20px;">
                Your number: <span id="current-number">0</span>
            </div>
        `;
        
        // Store target in dataset
        gameArea.dataset.targetNumber = targetNumber;
        
        // Check answer function for this game
        window.checkAnswer = (gameArea) => {
            const currentNumber = document.getElementById('current-number').textContent;
            const targetNumber = gameArea.dataset.targetNumber;
            
            if (currentNumber === targetNumber) {
                UIManager.showFeedback("Perfect! You built the number correctly!", true);
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(2);
                UIManager.updateUserProfile();
                
                // Check if level up occurred
                if (unlocked) {
                    UIManager.showLevelUpAnimation();
                    UIManager.showModuleUnlockNotification(5);
                }
                
                // Celebrate with animation
                document.getElementById('current-number').classList.add('bounce');
                
                // New challenge after delay
                setTimeout(() => {
                    this.buildANumber(gameArea);
                }, 2000);
            } else {
                UIManager.showFeedback("Not quite right. Keep trying!", false);
                
                // Show what's wrong with animation
                document.getElementById('current-number').classList.add('shake');
                setTimeout(() => {
                    document.getElementById('current-number').classList.remove('shake');
                }, 500);
            }
        };
    },
    
    /**
     * Helper function to adjust place values for Build-a-Number game
     */
    adjustValue: function(place, amount, gameAreaId) {
        const gameArea = document.getElementById(gameAreaId);
        const container = gameArea.querySelector(`.place-value-container[data-place="${place}"]`);
        const valueDisplay = container.querySelector('div:nth-child(2)');
        let currentValue = parseInt(valueDisplay.textContent);
        
        // Apply limits
        currentValue = Math.max(0, Math.min(9, currentValue + amount));
        
        valueDisplay.textContent = currentValue;
        this.updateCurrentNumber(gameAreaId);
    },
    
    /**
     * Helper function to update current number display for Build-a-Number game
     */
    updateCurrentNumber: function(gameAreaId) {
        const gameArea = document.getElementById(gameAreaId);
        const containers = gameArea.querySelectorAll('.place-value-container');
        let currentNumber = 0;
        
        containers.forEach(container => {
            const place = container.dataset.place;
            const value = parseInt(container.querySelector('div:nth-child(2)').textContent);
            
            switch(place) {
                case 'ones': currentNumber += value; break;
                case 'tens': currentNumber += value * 10; break;
                case 'hundreds': currentNumber += value * 100; break;
                case 'thousands': currentNumber += value * 1000; break;
                case 'ten thousands': currentNumber += value * 10000; break;
            }
        });
        
        document.getElementById('current-number').textContent = currentNumber;
        
        // Visual feedback when numbers match
        if (currentNumber.toString() === gameArea.dataset.targetNumber) {
            document.getElementById('current-number').style.color = 'green';
        } else {
            document.getElementById('current-number').style.color = '';
        }    },
    
    /**
     * Concept Introduction - Displays concept introductions for different modules
     */
    conceptIntro: function(gameArea) {
        // Check if specific module concept is requested
        const conceptModule = gameArea.dataset.conceptModule || 'default';
        
        // Content for lakhs module
        if (conceptModule === 'lakhs') {
            gameArea.innerHTML = `
                <div class="concept-intro">
                    <h2>Understanding Lakhs</h2>
                    
                    <div class="concept-section">
                        <h3>What is a Lakh?</h3>
                        <p>In the Indian number system, <strong>1 lakh = 100,000</strong>. It comes after the "ten thousands" place.</p>
                        <div class="place-value-chart">
                            <div class="chart-header">Indian Place Value Chart</div>
                            <table>
                                <tr>
                                    <th>Lakhs</th>
                                    <th>Ten Thousands</th>
                                    <th>Thousands</th>
                                    <th>Hundreds</th>
                                    <th>Tens</th>
                                    <th>Ones</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                            </table>
                            <div class="chart-footer">1,00,000 = One Lakh</div>
                        </div>
                    </div>
                    
                    <div class="concept-section">
                        <h3>Key Relationships</h3>
                        <ul>
                            <li>1 lakh = 100,000</li>
                            <li>1 lakh = 10 ten thousands</li>
                            <li>10 lakhs = 1 million (or 10,00,000)</li>
                        </ul>
                    </div>
                    
                    <div class="concept-section">
                        <h3>Examples in Real Life</h3>
                        <div class="examples-grid">
                            <div class="example-card">
                                <img src="images/sedan-car.png" alt="Car showroom" class="example-image">
                                <p><strong>Car Prices</strong>: Many cars in India are priced in lakhs, like "₹8.5 lakhs"</p>
                            </div>
                            <div class="example-card">
                                <img src="images/NiaEd-.png" alt="Rally crowd" class="example-image">
                                <p><strong>Rally Attendance</strong>: News reports often mention "2.5 lakh people attended"</p>
                            </div>
                            <div class="example-card">
                                <img src="images/india-rivers-map.png" alt="Small town" class="example-image">
                                <p><strong>Population</strong>: Small towns might have "1.2 lakh inhabitants"</p>
                            </div>
                        </div>
                    </div>

                    <div class="concept-section">
                        <h3>Visualizing a Lakh</h3>
                        <div style="display: flex; align-items: center; justify-content: center; margin: 20px 0;">
                            <div style="text-align: center; margin: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                                <div style="font-weight: bold; margin-bottom: 10px;">1 Bundle of Ten Thousand</div>
                                <div style="font-size: 2em; color: #0066cc;">10,000</div>
                            </div>
                            <div style="margin: 0 15px; font-size: 1.5em;">×</div>
                            <div style="text-align: center; margin: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                                <div style="font-weight: bold; margin-bottom: 10px;">10 Bundles</div>
                                <div style="font-size: 2em; color: #0066cc;">10</div>
                            </div>
                            <div style="margin: 0 15px; font-size: 1.5em;">=</div>
                            <div style="text-align: center; margin: 10px; padding: 15px; border: 2px solid #4CAF50; border-radius: 8px; background-color: #f0fff0;">
                                <div style="font-weight: bold; margin-bottom: 10px;">1 Lakh</div>
                                <div style="font-size: 2em; color: #4CAF50;">1,00,000</div>
                            </div>
                        </div>
                        <p style="text-align: center; font-style: italic;">Notice the Indian number system uses commas differently: 1,00,000 (not 100,000)</p>
                    </div>

                    <div class="concept-section">
                        <h3>Reading and Writing Lakhs</h3>
                        <p>In the Indian number system, we place commas differently:</p>
                        <ul>
                            <li>1,00,000 = One lakh</li>
                            <li>2,50,000 = Two lakh fifty thousand</li>
                            <li>7,89,562 = Seven lakh eighty-nine thousand five hundred sixty-two</li>
                        </ul>
                    </div>
                    
                    <div class="concept-section cta-section">
                        <p>Ready to practice with lakhs? Try the exercises below!</p>
                        <button id="start-games-btn" class="btn">Start Exercises</button>
                    </div>
                </div>
            `;
            
            // Add styles for concept introduction
            const style = document.createElement('style');
            style.textContent = `
                .concept-intro {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }
                
                .concept-section {
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #eee;
                }
                
                .concept-section:last-child {
                    border-bottom: none;
                }
                
                .concept-intro h2 {
                    color: #2c3e50;
                    text-align: center;
                    margin-bottom: 30px;
                }
                
                .concept-intro h3 {
                    color: #3498db;
                    margin-bottom: 15px;
                }
                
                .place-value-chart {
                    margin: 20px 0;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                }
                
                .chart-header, .chart-footer {
                    background-color: #f0f8ff;
                    padding: 10px;
                    text-align: center;
                    font-weight: bold;
                }
                
                .place-value-chart table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .place-value-chart th, .place-value-chart td {
                    border: 1px solid #ddd;
                    padding: 12px 15px;
                    text-align: center;
                }
                
                .place-value-chart th {
                    background-color: #e6f2ff;
                }
                
                .examples-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    justify-content: center;
                }
                
                .example-card {
                    width: 220px;
                    padding: 15px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    text-align: center;
                    background-color: #f9f9f9;
                }
                
                .example-image {
                    width: 100%;
                    height: 120px;
                    object-fit: cover;
                    border-radius: 6px;
                    margin-bottom: 10px;
                }
                
                .cta-section {
                    text-align: center;
                }
                
                #start-games-btn {
                    background-color: #27ae60;
                    color: white;
                    padding: 12px 25px;
                    font-size: 1.1em;
                }
            `;
            document.head.appendChild(style);
            
            // Add event listener to start games button
            const startGamesBtn = document.getElementById('start-games-btn');
            if (startGamesBtn) {
                startGamesBtn.addEventListener('click', function() {
                    // Find active module in navigation and click the first game
                    const navButtons = document.querySelectorAll('.nav-button');
                    if (navButtons.length > 1) { // Skip the concept intro button
                        navButtons[1].click();
                    }
                });
            }
        }
        // Content for large numbers module
        else if (conceptModule === 'largeNumbers') {
            gameArea.innerHTML = `
                <div class="concept-intro">
                    <h2>Reading & Writing Large Numbers</h2>
                    
                    <div class="concept-section">
                        <h3>Indian Place Value System</h3>
                        <p>In the Indian number system, we group digits differently than the International system:</p>
                        <div class="place-value-chart">
                            <div class="chart-header">Indian Place Value Chart for Large Numbers</div>
                            <table>
                                <tr>
                                    <th>Crores</th>
                                    <th>Ten Lakhs</th>
                                    <th>Lakhs</th>
                                    <th>Ten Thousands</th>
                                    <th>Thousands</th>
                                    <th>Hundreds</th>
                                    <th>Tens</th>
                                    <th>Ones</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                            </table>
                            <div class="chart-footer">1,00,00,000 = One Crore</div>
                        </div>
                    </div>
                    
                    <div class="concept-section">
                        <h3>Comma Placement in Indian System</h3>
                        <p>The Indian number system uses commas differently than the International system:</p>
                        <div class="comparison-table">
                            <table>
                                <tr>
                                    <th>Value</th>
                                    <th>Indian System</th>
                                    <th>International System</th>
                                </tr>
                                <tr>
                                    <td>One Thousand</td>
                                    <td>1,000</td>
                                    <td>1,000</td>
                                </tr>
                                <tr>
                                    <td>Ten Thousand</td>
                                    <td>10,000</td>
                                    <td>10,000</td>
                                </tr>
                                <tr>
                                    <td>One Lakh</td>
                                    <td>1,00,000</td>
                                    <td>100,000</td>
                                </tr>
                                <tr>
                                    <td>Ten Lakhs</td>
                                    <td>10,00,000</td>
                                    <td>1,000,000</td>
                                </tr>
                                <tr>
                                    <td>One Crore</td>
                                    <td>1,00,00,000</td>
                                    <td>10,000,000</td>
                                </tr>
                            </table>
                        </div>
                        <p>Notice that the Indian system places commas after every two digits from right to left, starting after the first three digits.</p>
                    </div>

                    <div class="concept-section">
                        <h3>Reading Large Numbers</h3>
                        <p>Let's learn how to read large numbers in the Indian system:</p>
                        <div class="examples-grid">
                            <div class="example-card wide">
                                <div class="number">3,75,428</div>
                                <p>Three lakh seventy-five thousand four hundred twenty-eight</p>
                            </div>
                            <div class="example-card wide">
                                <div class="number">52,03,914</div>
                                <p>Fifty-two lakh three thousand nine hundred fourteen</p>
                            </div>
                            <div class="example-card wide">
                                <div class="number">9,00,000</div>
                                <p>Nine lakh</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section">
                        <h3>Writing Numbers in Words</h3>
                        <p>When writing large numbers in words, we name each group according to its place value:</p>
                        <div class="writing-examples">
                            <div class="writing-example">
                                <span class="step">1.</span> Break the number into groups: <strong>8,46,372</strong>
                            </div>
                            <div class="writing-example">
                                <span class="step">2.</span> Identify each group: <strong>8</strong> lakhs, <strong>46</strong> thousand, <strong>3</strong> hundred, <strong>72</strong>
                            </div>
                            <div class="writing-example">
                                <span class="step">3.</span> Write it out: <strong>Eight lakh forty-six thousand three hundred seventy-two</strong>
                            </div>
                        </div>
                    </div>

                    <div class="concept-section">
                        <h3>Real-Life Examples</h3>
                        <div class="examples-grid">
                            <div class="example-card">
                                <img src="images/sedan-car.png" alt="Car price tag" class="example-image">
                                <p><strong>Car Price Tag</strong>: ₹8,75,000 (Eight lakh seventy-five thousand rupees)</p>
                            </div>
                            <div class="example-card">
                                <img src="images/NiaEd-.png" alt="Population sign" class="example-image">
                                <p><strong>City Population</strong>: 12,50,000 (Twelve lakh fifty thousand)</p>
                            </div>
                            <div class="example-card">
                                <img src="images/india-rivers-map.png" alt="Land area" class="example-image">
                                <p><strong>Land Area</strong>: 2,80,459 sq km (Two lakh eighty thousand four hundred fifty-nine square kilometers)</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section cta-section">
                        <p>Ready to practice reading and writing large numbers? Try the exercises below!</p>
                        <button id="start-games-btn" class="btn">Start Exercises</button>
                    </div>
                </div>
            `;
            
            // Add styles for concept introduction
            const style = document.createElement('style');
            style.textContent = `
                .concept-intro {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }
                
                .concept-section {
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #eee;
                }
                
                .concept-section:last-child {
                    border-bottom: none;
                }
                
                .concept-intro h2 {
                    color: #2c3e50;
                    text-align: center;
                    margin-bottom: 30px;
                }
                
                .concept-intro h3 {
                    color: #3498db;
                    margin-bottom: 15px;
                }
                
                .place-value-chart, .comparison-table {
                    margin: 20px 0;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                }
                
                .chart-header, .chart-footer {
                    background-color: #f0f8ff;
                    padding: 10px;
                    text-align: center;
                    font-weight: bold;
                }
                
                .place-value-chart table, .comparison-table table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .place-value-chart th, .place-value-chart td,
                .comparison-table th, .comparison-table td {
                    border: 1px solid #ddd;
                    padding: 12px 8px;
                    text-align: center;
                }
                
                .place-value-chart th, .comparison-table th {
                    background-color: #e6f2ff;
                }
                
                .comparison-table tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                
                .examples-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    justify-content: center;
                }
                
                .example-card {
                    width: 220px;
                    padding: 15px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    text-align: center;
                    background-color: #f9f9f9;
                }
                
                .example-card.wide {
                    width: 300px;
                }
                
                .example-image {
                    width: 100%;
                    height: 120px;
                    object-fit: cover;
                    border-radius: 6px;
                    margin-bottom: 10px;
                }
                
                .number {
                    font-size: 1.8em;
                    font-weight: bold;
                    color: #2980b9;
                    margin-bottom: 10px;
                }
                
                .writing-examples {
                    background-color: #f5f5f5;
                    padding: 15px;
                    border-radius: 8px;
                    margin: 20px 0;
                }
                
                .writing-example {
                    margin-bottom: 10px;
                    padding: 8px;
                    border-bottom: 1px dashed #ccc;
                }
                
                .writing-example:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                }
                
                .step {
                    display: inline-block;
                    width: 25px;
                    height: 25px;
                    line-height: 25px;
                    text-align: center;
                    background-color: #3498db;
                    color: white;
                    border-radius: 50%;
                    margin-right: 10px;
                    font-weight: bold;
                }
                
                .cta-section {
                    text-align: center;
                }
                
                #start-games-btn {
                    background-color: #27ae60;
                    color: white;
                    padding: 12px 25px;
                    font-size: 1.1em;
                }
            `;
            document.head.appendChild(style);
            
            // Add event listener to start games button
            const startGamesBtn = document.getElementById('start-games-btn');
            if (startGamesBtn) {
                startGamesBtn.addEventListener('click', function() {
                    // Find active module in navigation and click the first game button (not the concept)
                    const navButtons = document.querySelectorAll('.nav-button');
                    if (navButtons.length > 1) {
                        navButtons[1].click();
                    }
                });
            }
        } 
        else {
            // Default concept intro if no specific module is specified
            gameArea.innerHTML = `
                <div class="concept-intro">
                    <h2>Concept Introduction</h2>
                    <p>Select a specific module to see its concept introduction.</p>
                </div>
            `;
        }
    },

    /**
     * Number Speller Game - Practice spelling out large numbers
     */
    numberSpeller: function(gameArea) {
        // Determine difficulty based on user level
        const userData = DataManager.getUserData();
        let digitCount = 4; // Start with 4-digit numbers
        
        if (userData.level >= 3) digitCount = 5;
        if (userData.level >= 5) digitCount = 6;
        
        // Generate a large number for the student to spell
        const min = Math.pow(10, digitCount - 1);
        const max = Math.pow(10, digitCount) - 1;
        const number = Math.floor(Math.random() * (max - min + 1)) + min;
        
        // Format the number with Indian system commas
        const formattedNumber = number.toLocaleString('en-IN');
        
        // Create the game HTML
        gameArea.innerHTML = `
            <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h3 style="text-align: center;">Number Speller</h3>
                <p style="text-align: center;">Write the number in words according to the Indian system</p>
                
                <div style="text-align: center; margin: 30px 0; background-color: #e6eeff; padding: 20px; border-radius: 10px;">
                    <p style="font-size: 2.5em; font-weight: bold;">${formattedNumber}</p>
                </div>
                
                <div style="margin: 30px 0;">
                    <label for="answer-input" style="display: block; margin-bottom: 8px; font-weight: bold;">Write this number in words:</label>
                    <textarea id="answer-input" class="answer-input" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #ccc; min-height: 80px;" placeholder="Type your answer here..."></textarea>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                    <p style="margin: 0;"><strong>Remember:</strong></p>
                    <p style="margin: 5px 0;">- Break the number into groups (ones, tens, hundreds, thousands, lakhs)</p>
                    <p style="margin: 5px 0;">- Use hyphens for numbers like twenty-one, thirty-five</p>
                    <p style="margin: 5px 0;">- Don't use 'and' between hundreds and tens</p>
                </div>
            </div>
        `;
        
        // Get correct answers (multiple acceptable forms)
        const correctAnswer = this.getNumberInWords(number);
        gameArea.dataset.correctAnswer = JSON.stringify(correctAnswer);
        
        // Add event listener for input to enable submit on Enter key
        const inputField = document.getElementById('answer-input');
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                document.getElementById('check-answer').click();
            }
        });
        
        // Check answer function for this game
        window.checkAnswer = function(gameArea) {
            const inputField = document.getElementById('answer-input');
            const userAnswer = inputField.value.trim().toLowerCase();
            
            if (!userAnswer) {
                UIManager.showFeedback("Please write the number in words!", false);
                return;
            }
            
            // Get correct answers array
            const correctAnswers = JSON.parse(gameArea.dataset.correctAnswer);
            
            // Check if user's answer matches any of the acceptable forms
            const isCorrect = correctAnswers.some(answer => {
                // Normalize user input by removing extra spaces, commas, etc.
                const normalizedUserAnswer = userAnswer
                    .replace(/\s+/g, ' ')
                    .replace(/[,;.]/g, '')
                    .trim();
                
                const normalizedCorrectAnswer = answer
                    .toLowerCase()
                    .replace(/\s+/g, ' ')
                    .replace(/[,;.]/g, '')
                    .trim();
                
                return normalizedUserAnswer === normalizedCorrectAnswer;
            });
            
            if (isCorrect) {
                UIManager.showFeedback("Correct! Perfect spelling!", true);
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(2);
                UIManager.updateUserProfile();
                
                // Animation for correct answer
                inputField.classList.add('pulse');
                
                // Generate a new challenge after a delay
                setTimeout(function() {
                    Games.numberSpeller(gameArea);
                    inputField.classList.remove('pulse');
                }, 2000);
            } else {
                // Show the correct answer after 2 wrong attempts
                if (gameArea.dataset.attempts) {
                    const attempts = parseInt(gameArea.dataset.attempts) + 1;
                    gameArea.dataset.attempts = attempts;
                    
                    if (attempts >= 2) {
                        UIManager.showFeedback(`Try again. The correct answer is: ${correctAnswers[0]}`, false);
                    } else {
                        UIManager.showFeedback("Not quite right. Check your spelling and try again.", false);
                    }
                } else {
                    gameArea.dataset.attempts = 1;
                    UIManager.showFeedback("Not quite right. Check your spelling and try again.", false);
                }
                
                // Animation for incorrect answer
                inputField.classList.add('shake');
                setTimeout(function() {
                    inputField.classList.remove('shake');
                }, 500);
            }
        };
    },
    
    /**
     * Reading Large Numbers Game - Practice reading large numbers in Indian system
     */
    readingLarge: function(gameArea) {
        // Determine difficulty based on user level
        const userData = DataManager.getUserData();
        let digitCount = 5; // Start with 5-digit numbers
        
        if (userData.level >= 4) digitCount = 6;
        if (userData.level >= 6) digitCount = 7;
        
        // Generate a large number for the student to read
        const min = Math.pow(10, digitCount - 1);
        const max = Math.pow(10, digitCount) - 1;
        const number = Math.floor(Math.random() * (max - min + 1)) + min;
        
        // Convert the number to words
        const numberInWords = this.getNumberInWords(number)[0];
        
        // Format the number with appropriate commas as per Indian system
        const formattedNumber = number.toLocaleString('en-IN');
        
        // Create options: one correct answer and three wrong answers
        const options = this.generateReadingOptions(numberInWords, digitCount);
        
        // Shuffle the options
        const shuffledOptions = this.shuffleArray(options);
        
        // Create the game HTML
        gameArea.innerHTML = `
            <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h3 style="text-align: center;">Reading Large Numbers</h3>
                <p style="text-align: center;">Select the correct way to read this number in the Indian system</p>
                
                <div style="text-align: center; margin: 30px 0; background-color: #e6eeff; padding: 20px; border-radius: 10px;">
                    <p style="font-size: 2.5em; font-weight: bold;">${formattedNumber}</p>
                </div>
                
                <div style="margin: 30px 0;">
                    <div class="options-container">
                        ${shuffledOptions.map((option, index) => `
                            <div class="option" data-option="${index}">
                                <input type="radio" id="option${index}" name="numberReading" value="${index}">
                                <label for="option${index}">${option}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                    <p style="margin: 0;"><strong>Remember:</strong></p>
                    <p style="margin: 5px 0;">- In Indian system, we use lakhs (1,00,000) and crores (1,00,00,000)</p>
                    <p style="margin: 5px 0;">- Pay attention to the place of commas in the number</p>
                </div>
            </div>
        `;
        
        // Add styles for options
        const style = document.createElement('style');
        style.textContent = `
            .options-container {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .option {
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 15px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .option:hover {
                background-color: #f5f5f5;
            }
            
            .option.selected {
                background-color: #e1f5fe;
                border-color: #29b6f6;
            }
            
            .option label {
                display: block;
                cursor: pointer;
                padding-left: 10px;
                font-size: 1.1em;
            }
            
            .option input {
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
          // Store correct answer index
        const correctIndex = shuffledOptions.indexOf(numberInWords);
        gameArea.dataset.correctIndex = correctIndex;
        
        // Add event listeners to options
        const optionElements = gameArea.querySelectorAll('.option');
        optionElements.forEach(option => {
            option.addEventListener('click', function() {
                // Update radio button
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
                
                // Update UI
                optionElements.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                // Store selection
                gameArea.dataset.selectedIndex = this.dataset.option;
            });
        });
        
        // Check answer function for this game
        window.checkAnswer = function(gameArea) {
            const selectedIndex = gameArea.dataset.selectedIndex;
            const correctIndex = gameArea.dataset.correctIndex;
            
            if (selectedIndex === undefined) {
                UIManager.showFeedback("Please select an answer!", false);
                return;
            }
            
            if (parseInt(selectedIndex) === parseInt(correctIndex)) {
                UIManager.showFeedback("Correct! You read the number perfectly!", true);
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(2);
                UIManager.updateUserProfile();
                
                // Animation for correct answer
                const selectedOption = gameArea.querySelector(`.option[data-option="${selectedIndex}"]`);
                selectedOption.classList.add('pulse');
                
                // Generate a new challenge after a delay
                setTimeout(function() {
                    Games.readingLarge(gameArea);
                }, 2000);
            } else {
                const correctOption = gameArea.querySelector(`.option[data-option="${correctIndex}"]`);
                UIManager.showFeedback("Not quite right. The correct reading is highlighted.", false);
                
                // Highlight correct answer
                correctOption.style.backgroundColor = '#d4edda';
                correctOption.style.borderColor = '#28a745';
                
                // Animation for incorrect answer
                const selectedOption = gameArea.querySelector(`.option[data-option="${selectedIndex}"]`);
                selectedOption.classList.add('shake');
                setTimeout(function() {
                    selectedOption.classList.remove('shake');
                }, 500);
                
                // Generate a new challenge after a longer delay
                setTimeout(function() {
                    Games.readingLarge(gameArea);
                }, 3500);
            }
        };
    },
    
    /**
     * Comma Placement Game - Practice placing commas in large numbers according to Indian system
     */
    commaPlacement: function(gameArea) {
        // Determine difficulty based on user level
        const userData = DataManager.getUserData();
        let digitCount = 5; // Start with 5-digit numbers
        
        if (userData.level >= 4) digitCount = 6;
        if (userData.level >= 6) digitCount = 7;
        
        // Generate a large number for the student to format
        const min = Math.pow(10, digitCount - 1);
        const max = Math.pow(10, digitCount) - 1;
        const number = Math.floor(Math.random() * (max - min + 1)) + min;
        
        // Correct answer with Indian system commas
        const correctAnswer = number.toLocaleString('en-IN');
        
        // Create the game HTML
        gameArea.innerHTML = `
            <div style="background-color: #f0f7ff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h3 style="text-align: center;">Comma Placement</h3>
                <p style="text-align: center;">Add commas to the number according to the Indian number system</p>
                
                <div style="text-align: center; margin: 30px 0; background-color: #e6eeff; padding: 20px; border-radius: 10px;">
                    <p style="font-size: 2.5em; font-weight: bold;">${number}</p>
                </div>
                
                <div style="margin: 30px 0;">
                    <label for="answer-input" style="display: block; margin-bottom: 8px; font-weight: bold;">Add commas to the number:</label>
                    <input type="text" id="answer-input" class="answer-input" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #ccc; font-size: 1.2em; text-align: center;" placeholder="Add commas here...">
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                    <p style="margin: 0;"><strong>Remember Indian System Comma Rules:</strong></p>
                    <ul style="margin-top: 10px;">
                        <li>First comma after 3 digits from the right</li>
                        <li>Then commas after every 2 digits</li>
                        <li>Example: 12,34,567</li>
                    </ul>
                </div>
            </div>
        `;
        
        // Store correct answer
        gameArea.dataset.correctAnswer = correctAnswer;
        
        // Add event listener for input to enable submit on Enter key
        const inputField = document.getElementById('answer-input');
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('check-answer').click();
            }
        });
        
        // Add auto-formatting to input field
        inputField.addEventListener('input', function() {
            // Remove any existing non-digit characters
            let val = this.value.replace(/[^0-9]/g, '');
            
            // Don't allow more digits than the original number
            if (val.length > number.toString().length) {
                val = val.substring(0, number.toString().length);
            }
            
            // Format with commas according to Indian system
            if (val.length > 3) {
                let formattedValue = '';
                
                // Handle the last 3 digits
                const lastThree = val.substring(val.length - 3);
                
                // Handle remaining digits with commas after every 2 digits
                const remaining = val.substring(0, val.length - 3);
                
                if (remaining) {
                    // Add comma after every 2 digits from right to left
                    for (let i = remaining.length; i > 0; i -= 2) {
                        if (i === remaining.length) {
                            formattedValue = remaining.substring(i - 2, i) + formattedValue;
                        } else {
                            formattedValue = remaining.substring(Math.max(0, i - 2), i) + ',' + formattedValue;
                        }
                    }
                    formattedValue += ',' + lastThree;
                } else {
                    formattedValue = lastThree;
                }
                
                this.value = formattedValue;
            } else {
                this.value = val;
            }
        });
        
        // Check answer function for this game
        window.checkAnswer = function(gameArea) {
            const inputField = document.getElementById('answer-input');
            const userAnswer = inputField.value.trim();
            const correctAnswer = gameArea.dataset.correctAnswer;
            
            if (!userAnswer) {
                UIManager.showFeedback("Please add commas to the number!", false);
                return;
            }
            
            // Clean up user answer for comparison (remove spaces)
            const cleanUserAnswer = userAnswer.replace(/\s/g, '');
            
            if (cleanUserAnswer === correctAnswer) {
                UIManager.showFeedback("Correct! Perfect comma placement!", true);
                
                // Award points and update UI
                const unlocked = DataManager.updateUserProgress(2);
                UIManager.updateUserProfile();
                
                // Animation for correct answer
                inputField.classList.add('pulse');
                
                // Generate a new challenge after a delay
                setTimeout(function() {
                    Games.commaPlacement(gameArea);
                    inputField.classList.remove('pulse');
                }, 2000);
            } else {
                // Check if the digits are correct but commas are wrong
                const userDigits = cleanUserAnswer.replace(/,/g, '');
                const correctDigits = correctAnswer.replace(/,/g, '');
                
                if (userDigits === correctDigits) {
                    UIManager.showFeedback(`Your commas are not placed correctly. The correct format is: ${correctAnswer}`, false);
                } else {
                    UIManager.showFeedback(`The digits don't match. The number should be: ${correctAnswer}`, false);
                }
                
                // Animation for incorrect answer
                inputField.classList.add('shake');
                setTimeout(function() {
                    inputField.classList.remove('shake');
                }, 500);
            }
        };
    },
    
    /**
     * Coming Soon Game - Placeholder for games still in development
     */
    comingSoon: function(gameArea) {
        gameArea.innerHTML = `
            <div style="text-align: center; margin: 50px 0;">
                <div style="font-size: 4em; margin-bottom: 20px;">
                    <i class="fas fa-tools"></i>
                </div>
                <h3>Coming Soon!</h3>
                <p>This activity is still under development.<br>Please try another activity.</p>
            </div>
        `;
    },

    /**
     * Helper function to generate wrong options for the Reading Large Numbers game
     */
    generateReadingOptions: function(correctAnswer, digitCount) {
        const options = [correctAnswer];
        
        // Common mistakes to create wrong options
        
        // Option 1: Mix up lakhs and thousands
        let option1 = correctAnswer;
        if (digitCount >= 6 && correctAnswer.includes('lakh')) {
            option1 = correctAnswer
                .replace(/(\w+) lakh/, 'wrong1-placeholder')
                .replace(/(\w+) thousand/, '$1 lakh')
                .replace('wrong1-placeholder', '$1 thousand');
        } else {
            // If no lakhs, just mix the wording slightly
            option1 = correctAnswer
                .replace(/hundred/, 'hundred and')
                .replace(/thousand/, 'thousand and');
        }
        
        // Option 2: Use international system (million) instead of Indian (lakh)
        let option2 = correctAnswer;
        if (correctAnswer.includes('lakh')) {
            const lakhValue = parseInt(correctAnswer.match(/(\w+) lakh/)[1]);
            option2 = correctAnswer.replace(/(\w+) lakh/, `${lakhValue/10} million`);
        } else {
            // If no lakhs, mess up the hundreds place
            option2 = correctAnswer.replace(/hundred (\w+)/, 'hundred and $1');
        }
        
        // Option 3: Completely different number (use higher/lower digit)
        const words = correctAnswer.split(' ');
        let option3 = '';
        
        // Modify one of the digits
        for (let i = 0; i < words.length; i++) {
            if (['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].includes(words[i])) {
                const digitWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
                const currentIndex = digitWords.indexOf(words[i]);
                const newIndex = (currentIndex + 3) % 9; // shift by 3 to get a different digit
                words[i] = digitWords[newIndex];
                break;
            }
        }
        option3 = words.join(' ');
        
        // Add wrong options if they're different from the correct answer
        if (option1 !== correctAnswer) options.push(option1);
        if (option2 !== correctAnswer && option2 !== option1) options.push(option2);
        if (option3 !== correctAnswer && option3 !== option1 && option3 !== option2) options.push(option3);
        
        // If we don't have enough options, create more
        while (options.length < 4) {
            // Scramble some digits
            const extraOption = correctAnswer.split(' ')
                .map(word => {
                    if (Math.random() < 0.3 && ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].includes(word)) {
                        const digitWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
                        return digitWords[Math.floor(Math.random() * 9)];
                    }
                    return word;
                })
                .join(' ');
                
            if (!options.includes(extraOption)) {
                options.push(extraOption);
            }
        }
        
        // Limit to 4 options
        return options.slice(0, 4);
    },
    
    /**
     * Helper function to shuffle an array
     */
    shuffleArray: function(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },

    /**
     * Helper function to convert a number to words in Indian system
     */
    getNumberInWords: function(number) {
        // Units array for ones place
        const units = [
            '', 'one', 'two', 'three', 'four', 
            'five', 'six', 'seven', 'eight', 'nine', 
            'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 
            'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
        ];
        
        // Tens array for tens place
        const tens = [
            '', '', 'twenty', 'thirty', 'forty', 
            'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
        ];
        
        // Function to convert a 2-digit number to words
        const getTwoDigits = (num) => {
            if (num < 20) {
                return units[num];
            }
            const unit = num % 10;
            const ten = Math.floor(num / 10);
            return unit ? `${tens[ten]}-${units[unit]}` : tens[ten];
        };
        
        // Function to convert a 3-digit number to words
        const getThreeDigits = (num) => {
            const hundred = Math.floor(num / 100);
            const remainder = num % 100;
            
            let result = '';
            if (hundred) {
                result += `${units[hundred]} hundred`;
            }
            
            if (remainder) {
                result += result ? ' ' : '';
                result += getTwoDigits(remainder);
            }
            
            return result;
        };
        
        // Special case for zero
        if (number === 0) {
            return ['zero'];
        }
        
        // Handle numbers in Indian system
        let result = '';
        
        // Extract crores (if any)
        const crore = Math.floor(number / 10000000);
        if (crore > 0) {
            result += `${getThreeDigits(crore)} crore`;
            number %= 10000000;
            if (number > 0) result += ' ';
        }
        
        // Extract lakhs (if any)
        const lakh = Math.floor(number / 100000);
        if (lakh > 0) {
            result += `${getTwoDigits(lakh)} lakh`;
            number %= 100000;
            if (number > 0) result += ' ';
        }
        
        // Extract thousands (if any)
        const thousand = Math.floor(number / 1000);
        if (thousand > 0) {
            result += `${getTwoDigits(thousand)} thousand`;
            number %= 1000;
            if (number > 0) result += ' ';
        }
        
        // Extract hundreds, tens, and ones
        if (number > 0) {
            result += getThreeDigits(number);
        }
        
        // Create alternate acceptable forms (e.g., with 'and' after hundred)
        const alternateResults = [result];
        
        // Create an alternate form with 'and' after hundred if applicable
        if (result.includes('hundred') && !result.includes('hundred and')) {
            // Check if there are tens/ones after hundred
            const parts = result.split(' hundred ');
            if (parts.length > 1 && parts[1]) {
                alternateResults.push(parts[0] + ' hundred and ' + parts[1]);
            }
        }
        
        return alternateResults;
    },
};

export default Games;
