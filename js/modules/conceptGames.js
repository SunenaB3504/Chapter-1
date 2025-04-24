/**
 * conceptGames.js - Contains all concept introduction modules
 */

const ConceptGames = {
    /**
     * Concept Introduction - Displays concept introductions for different modules
     */
    conceptIntro: function(gameArea) {
        // Check if specific module concept is requested
        const conceptModule = gameArea.dataset.conceptModule || 'default';
        
        // Content for different modules
        if (conceptModule === 'placeValue') {
            gameArea.innerHTML = `
                <div class="concept-intro">
                    <h2>Place Value Revision</h2>
                    
                    <div class="concept-section">
                        <h3>What is Place Value?</h3>
                        <p>Place value helps us understand what each digit in a number actually means. The position of a digit in a number determines its value.</p>
                        
                        <div class="place-value-example">
                            <div class="example-number">3,475</div>
                            <div class="digit-breakdown">
                                <div class="digit-value">
                                    <div class="digit">3</div>
                                    <div class="place">Thousands</div>
                                    <div class="value">3,000</div>
                                </div>
                                <div class="digit-value">
                                    <div class="digit">4</div>
                                    <div class="place">Hundreds</div>
                                    <div class="value">400</div>
                                </div>
                                <div class="digit-value">
                                    <div class="digit">7</div>
                                    <div class="place">Tens</div>
                                    <div class="value">70</div>
                                </div>
                                <div class="digit-value">
                                    <div class="digit">5</div>
                                    <div class="place">Ones</div>
                                    <div class="value">5</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section">
                        <h3>Face Value vs. Place Value</h3>
                        <p>The face value of a digit is just the digit itself, but the place value depends on its position in the number.</p>
                        
                        <div class="face-place-comparison">
                            <div class="comparison-example">
                                <div class="comparison-title">Face Value</div>
                                <div class="comparison-description">
                                    <p>The actual digit as it appears</p>
                                    <div class="example-number">In 2,375, the face value of 3 is just <span class="highlight">3</span></div>
                                </div>
                            </div>
                            <div class="comparison-example">
                                <div class="comparison-title">Place Value</div>
                                <div class="comparison-description">
                                    <p>The value based on position</p>
                                    <div class="example-number">In 2,375, the place value of 3 is <span class="highlight">300</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section">
                        <h3>Why Place Value is Important</h3>
                        <div class="importance-grid">
                            <div class="importance-card">
                                <div class="importance-title">Reading Numbers</div>
                                <p>Place value helps us read large numbers correctly.</p>
                            </div>
                            <div class="importance-card">
                                <div class="importance-title">Math Operations</div>
                                <p>Addition, subtraction, multiplication, and division all use place value.</p>
                            </div>
                            <div class="importance-card">
                                <div class="importance-title">Real-Life Uses</div>
                                <p>We use place value when dealing with money, measurements, and more.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section">
                        <h3>Let's Practice!</h3>
                        <p>Try our fun activities to master place value concepts!</p>
                    </div>
                    
                    <style>
                        .concept-intro {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            color: #333;
                            max-width: 800px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        
                        .concept-section {
                            margin-bottom: 30px;
                        }
                        
                        h2 {
                            color: #0d47a1;
                            text-align: center;
                            font-size: 2em;
                            margin-bottom: 25px;
                        }
                        
                        h3 {
                            color: #1976d2;
                            font-size: 1.5em;
                            margin-bottom: 15px;
                        }
                        
                        .place-value-example {
                            background-color: #e3f2fd;
                            border-radius: 8px;
                            padding: 20px;
                            margin: 15px 0;
                        }
                        
                        .example-number {
                            font-size: 2em;
                            font-weight: bold;
                            text-align: center;
                            margin-bottom: 15px;
                            color: #0d47a1;
                        }
                        
                        .digit-breakdown {
                            display: flex;
                            justify-content: space-around;
                            flex-wrap: wrap;
                            gap: 10px;
                        }
                        
                        .digit-value {
                            background-color: white;
                            border-radius: 8px;
                            padding: 15px;
                            min-width: 80px;
                            text-align: center;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                        }
                        
                        .digit {
                            font-size: 1.8em;
                            font-weight: bold;
                            color: #2196f3;
                        }
                        
                        .place {
                            font-size: 0.9em;
                            color: #555;
                            margin: 5px 0;
                        }
                        
                        .value {
                            font-weight: bold;
                            color: #0d47a1;
                        }
                        
                        .face-place-comparison {
                            display: flex;
                            gap: 20px;
                            margin-top: 15px;
                        }
                        
                        .comparison-example {
                            flex: 1;
                            background-color: #f5f5f5;
                            border-radius: 8px;
                            padding: 15px;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                        }
                        
                        .comparison-title {
                            font-size: 1.2em;
                            font-weight: bold;
                            color: #0d47a1;
                            margin-bottom: 10px;
                            text-align: center;
                        }
                        
                        .comparison-description {
                            text-align: center;
                        }
                        
                        .highlight {
                            background-color: #ffecb3;
                            padding: 2px 5px;
                            border-radius: 3px;
                            font-weight: bold;
                        }
                        
                        .importance-grid {
                            display: flex;
                            gap: 15px;
                            flex-wrap: wrap;
                            margin-top: 15px;
                        }
                        
                        .importance-card {
                            flex: 1;
                            min-width: 200px;
                            background-color: #e8f5e9;
                            border-radius: 8px;
                            padding: 15px;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                        }
                        
                        .importance-title {
                            font-weight: bold;
                            color: #2e7d32;
                            margin-bottom: 5px;
                        }
                        
                        @media (max-width: 600px) {
                            .face-place-comparison {
                                flex-direction: column;
                            }
                            
                            .digit-value {
                                min-width: 60px;
                            }
                        }
                    </style>
                </div>
            `;
        }
        else if (conceptModule === 'lakhs') {
            // Lakhs concept content remains the same
            // ...existing code...
        }
        else if (conceptModule === 'largeNumbers') {
            // Large Numbers concept content remains the same
            // ...existing code...
        }
        else if (conceptModule === 'predecessor') {
            // Predecessor concept content remains the same
            // ...existing code...
        }        
        else if (conceptModule === 'realLifeMath') {
            gameArea.innerHTML = `
                <div class="concept-intro">
                    <h2>Real-Life Math</h2>
                    
                    <div class="concept-section">
                        <h3>Why Math Matters in Everyday Life</h3>
                        <p>Math isn't just something we learn in school—it's all around us! From shopping to banking, we use math concepts every day to solve real problems and make important decisions.</p>
                        <div class="real-life-examples">
                            <div class="real-example">
                                <div class="example-title">Reading Bills</div>
                                <div class="example-image-container">
                                    <img src="images/NiaEd-.png" alt="Electricity Bill" class="example-image">
                                </div>
                                <div class="example-description">Understanding bills helps us know how much to pay and track our usage</div>
                            </div>
                            <div class="real-example">
                                <div class="example-title">Managing Money</div>
                                <div class="example-image-container">
                                    <img src="images/NiaEd-.png" alt="ATM Transaction" class="example-image">
                                </div>
                                <div class="example-description">Banking helps us keep our money safe and make transactions</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }        else if (conceptModule === 'dataInterpretation') {
            gameArea.innerHTML = `
                <div class="concept-intro">
                    <h2>Data Interpretation</h2>
                    
                    <div class="concept-section">
                        <h3>What is Data Interpretation?</h3>
                        <p>Data interpretation is the skill of understanding information presented in charts, graphs, and tables. It helps us make sense of numbers and find patterns in information collected from the world around us.</p>
                        <div class="data-examples">
                            <div class="data-example">
                                <div class="example-title">Picture Graphs</div>
                                <div class="example-image-container">
                                    <img src="images/NiaEd-.png" alt="Picture Graph" class="example-image">
                                </div>
                                <div class="example-description">Use pictures to represent quantities. Each symbol stands for a specific amount.</div>
                            </div>
                            <div class="data-example">
                                <div class="example-title">Bar Graphs</div>
                                <div class="example-image-container">
                                    <img src="images/NiaEd-.png" alt="Bar Graph" class="example-image">
                                </div>
                                <div class="example-description">Compare quantities using bars of different heights or lengths.</div>
                            </div>
                            <div class="data-example">
                                <div class="example-title">Tables</div>
                                <div class="example-image-container">
                                    <img src="images/NiaEd-.png" alt="Data Table" class="example-image">
                                </div>
                                <div class="example-description">Organize information in rows and columns for easy comparison.</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section">
                        <h3>Why Data Interpretation is Important</h3>
                        <div class="importance-grid">
                            <div class="importance-card">
                                <div class="importance-title">Making Decisions</div>
                                <p>Data helps us make better choices based on facts rather than guesses.</p>
                            </div>
                            <div class="importance-card">
                                <div class="importance-title">Finding Patterns</div>
                                <p>We can discover trends and relationships by looking at data.</p>
                            </div>
                            <div class="importance-card">
                                <div class="importance-title">Solving Problems</div>
                                <p>Data helps us understand issues and find solutions.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section">
                        <h3>Ready to Explore?</h3>
                        <p>Let's practice reading different types of data displays and answering questions about them!</p>
                    </div>
                </div>
            `;
        }
        else if (conceptModule === 'smallestLargest') {
            gameArea.innerHTML = `
                <div class="concept-intro">
                    <h2>Smallest & Largest Numbers</h2>
                    
                    <div class="concept-section">
                        <h3>What are Smallest & Largest Numbers?</h3>
                        <p>When we have a set of digits, we can arrange them in different ways to form the smallest or largest possible number. This helps us understand place value and the importance of digit positions.</p>
                        <div class="digit-examples">
                            <div class="digit-example">
                                <div class="digit-title">Forming the Smallest Number</div>
                                <div class="digit-cards">
                                    <div class="digit-card">5</div>
                                    <div class="digit-card">1</div>
                                    <div class="digit-card">9</div>
                                    <div class="arrow-right">→</div>
                                    <div class="result-number">159</div>
                                </div>
                                <div class="digit-rule">Rule: Arrange from smallest to largest</div>
                            </div>
                            <div class="digit-example">
                                <div class="digit-title">Forming the Largest Number</div>
                                <div class="digit-cards">
                                    <div class="digit-card">5</div>
                                    <div class="digit-card">1</div>
                                    <div class="digit-card">9</div>
                                    <div class="arrow-right">→</div>
                                    <div class="result-number">951</div>
                                </div>
                                <div class="digit-rule">Rule: Arrange from largest to smallest</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section">
                        <h3>Key Principles</h3>
                        <div class="principles-grid">
                            <div class="principle-card">
                                <div class="principle-name">Place Value Matters</div>
                                <p>The position of a digit determines its value in the number.</p>
                                <div class="principle-example">In 347, the 3 has a value of 300</div>
                            </div>
                            <div class="principle-card">
                                <div class="principle-name">Smallest Number Formation</div>
                                <p>Put the smallest digit in the highest place value position.</p>
                                <div class="principle-example">With 5, 2, 9 → 259 is smallest</div>
                            </div>
                            <div class="principle-card">
                                <div class="principle-name">Largest Number Formation</div>
                                <p>Put the largest digit in the highest place value position.</p>
                                <div class="principle-example">With 5, 2, 9 → 952 is largest</div>
                            </div>
                            <div class="principle-card">
                                <div class="principle-name">Zero Handling</div>
                                <p>Zero should not be in the highest place value for smallest nonzero number.</p>
                                <div class="principle-example">With 5, 0, 9 → 509 is smallest nonzero</div>
                            </div>
                        </div>
                    </div>

                    <div class="concept-section">
                        <h3>Step-by-Step Process</h3>
                        <div class="step-cards">
                            <div class="step-card">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <div class="step-title">Identify the Digits</div>
                                    <p>Make note of all the available digits you need to arrange</p>
                                </div>
                            </div>
                            <div class="step-card">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <div class="step-title">Consider Constraints</div>
                                    <p>Note any special rules (e.g., can't use zero in the first position)</p>
                                </div>
                            </div>
                            <div class="step-card">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <div class="step-title">Sort the Digits</div>
                                    <p>For smallest: arrange from smallest to largest<br>
                                       For largest: arrange from largest to smallest</p>
                                </div>
                            </div>
                            <div class="step-card">
                                <div class="step-number">4</div>
                                <div class="step-content">
                                    <div class="step-title">Handle Special Cases</div>
                                    <p>If forming the smallest non-zero number, move zero away from the first position</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="concept-section">
                        <h3>Real-Life Number Extremes</h3>
                        <div class="examples-grid">
                            <div class="example-card">
                                <img src="images/NiaEd-.png" alt="Thermometer" class="example-image">
                                <p><strong>Temperature Extremes</strong>: Minimum and maximum temperatures on a weather forecast</p>
                            </div>
                            <div class="example-card">
                                <img src="images/NiaEd-.png" alt="High score" class="example-image">
                                <p><strong>Game Scores</strong>: Keeping track of high and low scores in games</p>
                            </div>
                            <div class="example-card">
                                <img src="images/NiaEd-.png" alt="Price tags" class="example-image">
                                <p><strong>Price Ranges</strong>: Comparing minimum and maximum prices when shopping</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section">
                        <h3>Try This Example</h3>
                        <div class="example-problem">
                            <p>Using the digits 3, 7, 0, 2, form:</p>
                            <div class="problem-parts">
                                <div class="problem-part">
                                    <div class="problem-title">The smallest 4-digit number:</div>
                                    <div class="solution-steps">
                                        <div>Step 1: Arrange digits in ascending order: 0, 2, 3, 7</div>
                                        <div>Step 2: Zero can't be in thousands place for a 4-digit number</div>
                                        <div>Step 3: Smallest possible 4-digit number is 2037</div>
                                    </div>
                                </div>
                                <div class="problem-part">
                                    <div class="problem-title">The largest 4-digit number:</div>
                                    <div class="solution-steps">
                                        <div>Step 1: Arrange digits in descending order: 7, 3, 2, 0</div>
                                        <div>Step 2: Largest possible 4-digit number is 7320</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section cta-section">
                        <p>Ready to form the smallest and largest numbers? Try the exercises below!</p>
                        <button id="start-games-btn" class="btn">Start Exercises</button>
                    </div>
                </div>
            `;
            
            // Add styles for smallest & largest concept
            const style = document.createElement('style');
            style.textContent = `
                .digit-examples {
                    display: flex;
                    gap: 20px;
                    margin: 20px 0;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                
                .digit-example {
                    flex: 1;
                    min-width: 250px;
                    background-color: #f5f5f5;
                    padding: 15px;
                    border-radius: 8px;
                    border-left: 4px solid #ff9e2c;
                }
                
                .digit-title {
                    font-weight: bold;
                    font-size: 1.1em;
                    margin-bottom: 10px;
                    color: #ff9e2c;
                }
                
                .digit-cards {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin: 15px 0;
                }
                
                .digit-card {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: white;
                    border: 2px solid #ff9e2c;
                    border-radius: 8px;
                    font-size: 1.5em;
                    font-weight: bold;
                    color: #ff9e2c;
                }
                
                .arrow-right {
                    font-size: 1.5em;
                    color: #ff9e2c;
                }
                
                .result-number {
                    font-size: 1.8em;
                    font-weight: bold;
                    color: #ff9e2c;
                    padding: 0 10px;
                }
                
                .digit-rule {
                    font-style: italic;
                    color: #666;
                }
                
                .principles-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 15px;
                    margin: 20px 0;
                }
                
                .principle-card {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 8px;
                    border-top: 3px solid #4a6cd4;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                
                .principle-name {
                    font-weight: bold;
                    margin-bottom: 8px;
                    color: #4a6cd4;
                }
                
                .principle-example {
                    background-color: #e3f2fd;
                    padding: 8px;
                    border-radius: 4px;
                    margin-top: 10px;
                    font-family: monospace;
                }
                
                .step-cards {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin: 20px 0;
                }
                
                .step-card {
                    display: flex;
                    align-items: center;
                    background-color: #fff;
                    padding: 12px;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                
                .step-number {
                    width: 30px;
                    height: 30px;
                    background-color: #4caf50;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    margin-right: 15px;
                }
                
                .step-content {
                    flex: 1;
                }
                
                .step-title {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .example-problem {
                    background-color: #f1f8e9;
                    padding: 15px;
                    border-radius: 8px;
                    margin: 20px 0;
                }
                
                .problem-parts {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 15px;
                    margin-top: 10px;
                }
                
                .problem-part {
                    flex: 1;
                    min-width: 250px;
                    background-color: white;
                    padding: 10px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .problem-title {
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: #4caf50;
                }
                
                .solution-steps {
                    font-family: monospace;
                    color: #666;
                }
                
                .solution-steps div {
                    margin-bottom: 5px;
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
        else if (conceptModule === 'patterns') {
            gameArea.innerHTML = `
                <div class="concept-intro">
                    <h2>Number Patterns</h2>
                    
                    <div class="concept-section">
                        <h3>What are Number Patterns?</h3>
                        <p>Number patterns are sequences of numbers that follow specific rules. Recognizing patterns helps us predict what comes next and understand mathematical relationships.</p>
                        <div class="pattern-examples">
                            <div class="pattern-example">
                                <div class="pattern-title">Increasing Pattern</div>
                                <div class="pattern-sequence">2, 4, 6, 8, 10, ...</div>
                                <div class="pattern-rule">Rule: Add 2 to get the next number</div>
                            </div>
                            <div class="pattern-example">
                                <div class="pattern-title">Decreasing Pattern</div>
                                <div class="pattern-sequence">20, 15, 10, 5, 0, ...</div>
                                <div class="pattern-rule">Rule: Subtract 5 to get the next number</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section">
                        <h3>Types of Number Patterns</h3>
                        <div class="types-grid">
                            <div class="type-card">
                                <div class="type-name">Arithmetic Patterns</div>
                                <p>Add or subtract the same value each time</p>
                                <div class="type-example">5, 10, 15, 20, ...</div>
                                <div class="type-rule">+5 each time</div>
                            </div>
                            <div class="type-card">
                                <div class="type-name">Geometric Patterns</div>
                                <p>Multiply or divide by the same value each time</p>
                                <div class="type-example">2, 4, 8, 16, ...</div>
                                <div class="type-rule">×2 each time</div>
                            </div>
                            <div class="type-card">
                                <div class="type-name">Skip Counting</div>
                                <p>Count by skipping numbers in a regular way</p>
                                <div class="type-example">3, 6, 9, 12, ...</div>
                                <div class="type-rule">Count by 3s</div>
                            </div>
                            <div class="type-card">
                                <div class="type-name">Alternating Patterns</div>
                                <p>Patterns that alternate between different rules</p>
                                <div class="type-example">1, 3, 6, 8, 11, 13, ...</div>
                                <div class="type-rule">+2, +3, +2, +3, ...</div>
                            </div>
                        </div>
                    </div>

                    <div class="concept-section">
                        <h3>Finding Patterns</h3>
                        <div class="pattern-steps">
                            <div class="step-card">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <div class="step-title">Observe</div>
                                    <p>Look at the sequence and observe how numbers change</p>
                                </div>
                            </div>
                            <div class="step-card">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <div class="step-title">Find the Rule</div>
                                    <p>Determine what operation connects each number to the next</p>
                                </div>
                            </div>
                            <div class="step-card">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <div class="step-title">Test</div>
                                    <p>Check if your rule works for all numbers in the sequence</p>
                                </div>
                            </div>
                            <div class="step-card">
                                <div class="step-number">4</div>
                                <div class="step-content">
                                    <div class="step-title">Predict</div>
                                    <p>Use the rule to predict the next numbers in the pattern</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="concept-section">
                        <h3>Real-Life Number Patterns</h3>
                        <div class="examples-grid">
                            <div class="example-card">
                                <img src="images/NiaEd-.png" alt="Calendar" class="example-image">
                                <p><strong>Calendar Patterns</strong>: Days repeat in patterns of 7, months have patterns of days</p>
                            </div>
                            <div class="example-card">
                                <img src="images/house-numbers.png" alt="House numbers" class="example-image">
                                <p><strong>House Numbers</strong>: House numbers often follow patterns (odd on one side, even on the other)</p>
                            </div>
                            <div class="example-card">
                                <img src="images/mountain-climb.png" alt="Growth patterns" class="example-image">
                                <p><strong>Growth Patterns</strong>: Plants often grow following specific mathematical patterns</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section">
                        <h3>Pattern Challenge</h3>
                        <p>Can you guess the next number in these patterns?</p>
                        <div class="pattern-challenges">
                            <div class="challenge">
                                <div class="challenge-pattern">2, 4, 8, 16, ___, ___</div>
                                <div class="challenge-hint">Hint: Each number is double the previous number</div>
                                <div class="challenge-answer">Answer: 32, 64</div>
                            </div>
                            <div class="challenge">
                                <div class="challenge-pattern">1, 4, 9, 16, ___, ___</div>
                                <div class="challenge-hint">Hint: These are square numbers</div>
                                <div class="challenge-answer">Answer: 25, 36</div>
                            </div>
                            <div class="challenge">
                                <div class="challenge-pattern">1, 1, 2, 3, 5, ___, ___</div>
                                <div class="challenge-hint">Hint: Each number is the sum of the two numbers before it</div>
                                <div class="challenge-answer">Answer: 8, 13</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="concept-section cta-section">
                        <p>Ready to discover and complete number patterns? Try the exercises below!</p>
                        <button id="start-games-btn" class="btn">Start Exercises</button>
                    </div>
                </div>
            `;
            
            // Add styles for number patterns concept
            const style = document.createElement('style');
            style.textContent = `
                .pattern-examples {
                    display: flex;
                    gap: 20px;
                    margin: 20px 0;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                
                .pattern-example {
                    flex: 1;
                    min-width: 250px;
                    background-color: #f5f5f5;
                    padding: 15px;
                    border-radius: 8px;
                    border-left: 4px solid #3f51b5;
                }
                
                .pattern-title {
                    font-weight: bold;
                    font-size: 1.1em;
                    margin-bottom: 10px;
                    color: #3f51b5;
                }
                
                .pattern-sequence {
                    font-size: 1.3em;
                    margin: 10px 0;
                    font-family: monospace;
                    letter-spacing: 1px;
                }
                
                .pattern-rule {
                    font-style: italic;
                    color: #666;
                }
                
                .types-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 15px;
                    margin: 20px 0;
                }
                
                .type-card {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 8px;
                    border-top: 3px solid #2196f3;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                
                .type-name {
                    font-weight: bold;
                    margin-bottom: 8px;
                    color: #2196f3;
                }
                
                .type-example {
                    background-color: #e3f2fd;
                    padding: 8px;
                    border-radius: 4px;
                    margin: 10px 0 5px;
                    font-family: monospace;
                }
                
                .type-rule {
                    font-size: 0.9em;
                    color: #666;
                    font-style: italic;
                }
                
                .pattern-steps {
                    display: flex;
                    gap: 15px;
                    margin: 20px 0;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                
                .step-card {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    max-width: 350px;
                    background-color: #fff;
                    padding: 12px;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                
                .step-number {
                    width: 30px;
                    height: 30px;
                    background-color: #4caf50;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    margin-right: 15px;
                }
                
                .step-content {
                    flex: 1;
                }
                
                .step-title {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .pattern-challenges {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin: 20px 0;
                }
                
                .challenge {
                    background-color: #f1f8e9;
                    padding: 15px;
                    border-radius: 8px;
                    border-left: 4px solid #8bc34a;
                }
                
                .challenge-pattern {
                    font-size: 1.4em;
                    font-family: monospace;
                    margin-bottom: 10px;
                }
                
                .challenge-hint {
                    color: #666;
                    margin-bottom: 8px;
                    font-style: italic;
                }
                
                .challenge-answer {
                    color: #4caf50;
                    font-weight: bold;
                    cursor: pointer;
                    position: relative;
                }
                
                .challenge-answer:before {
                    content: "Reveal ";
                    font-weight: normal;
                    color: #666;
                }
                
                .challenge-answer:hover:before {
                    content: "";
                }
                
                .challenge-answer:not(:hover) {
                    color: transparent;
                    text-shadow: 0 0 5px rgba(0,0,0,0.5);
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
};

export default ConceptGames;
