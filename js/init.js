/**
 * init.js - Core initialization script for Place Value Explorers
 * This script MUST be loaded first, before any other JavaScript
 */

// Create the essential global objects if they don't already exist
window.Games = window.Games || {};
window.DataManager = window.DataManager || {};
window.UIManager = window.UIManager || {};

// Create the GameLoader directly, with a simplified interface
window.GameLoader = {
  // Simple logging system to help diagnose issues
  log: function(message) {
    console.log('[GameLoader] ' + message);
  },
  
  // Error logging
  error: function(message) {
    console.error('[GameLoader] ERROR: ' + message);
  },
  
  // Load a game by ID
  loadGame: function(gameId) {
    if (!gameId) {
      this.error('No gameId provided!');
      return;
    }
    
    this.log('Loading game: ' + gameId);
    
    var gameArea = document.getElementById('game-area');
    if (!gameArea) {
      this.error('Game area element not found!');
      return;
    }
    
    // Clear feedback area
    var feedback = document.getElementById('feedback');
    if (feedback) {
      feedback.textContent = '';
      feedback.className = 'feedback';
    }
    
    // Clear previous game content
    gameArea.innerHTML = '';
    
    // Safety check for Games object
    if (!window.Games) {
      this.error('Games object is not defined!');
      gameArea.innerHTML = '<div style="text-align: center; padding: 20px;"><h3>Error</h3><p>Game system not initialized. Please refresh the page.</p></div>';
      return;
    }
    
    try {
      // Direct access to game functions based on ID
      switch(gameId) {
        case 'placeValueConcept':
          gameArea.dataset.conceptModule = 'placeValue';
          window.Games.conceptIntro(gameArea);
          break;
        case 'placeValueDetective':
          window.Games.placeValueDetective(gameArea);
          break;
        case 'buildANumber':
          window.Games.buildANumber(gameArea);
          break;
        case 'numberBattle':
          window.Games.numberBattle(gameArea);
          break;
        case 'riverLengthCompare':
          window.Games.riverLengthCompare(gameArea);
          break;
        case 'comparingSymbols':
          window.Games.comparingSymbols(gameArea);
          break;
        case 'lakhsConcept':
          gameArea.dataset.conceptModule = 'lakhs';
          window.Games.conceptIntro(gameArea);
          break;
        case 'lakhAttack':
          window.Games.lakhAttack(gameArea);
          break;
        case 'carShowroom':
          gameArea.dataset.gameMode = 'carShowroom';
          window.Games.lakhAttack(gameArea);
          break;
        case 'rallyCounter':
          window.Games.rallyCounter(gameArea);
          break;
        case 'largeNumbersConcept':
          gameArea.dataset.conceptModule = 'largeNumbers';
          window.Games.conceptIntro(gameArea);
          break;
        case 'numberSpeller':
          window.Games.numberSpeller(gameArea);
          break;
        case 'readingLarge':
          window.Games.readingLarge(gameArea);
          break;
        case 'commaPlacement':
          window.Games.commaPlacement(gameArea);
          break;
        case 'predecessorConcept':
          gameArea.dataset.conceptModule = 'predecessor';
          window.Games.conceptIntro(gameArea);
          break;
        case 'numberNeighbors':
          window.Games.numberNeighbors(gameArea);
          break;
        case 'beforeAndAfter':
          window.Games.beforeAndAfter(gameArea);
          break;
        case 'numberLine':
          window.Games.numberLine(gameArea);
          break;
        case 'patternsConcept':
          gameArea.dataset.conceptModule = 'patterns';
          window.Games.conceptIntro(gameArea);
          break;
        case 'patternDetective':
          window.Games.patternDetective(gameArea);
          break;
        case 'patternMaker':
          window.Games.patternMaker(gameArea);
          break;
        case 'sequenceCompleter':
          window.Games.sequenceCompleter(gameArea);
          break;
        case 'smallestLargestConcept':
          gameArea.dataset.conceptModule = 'smallestLargest';
          window.Games.conceptIntro(gameArea);
          break;
        case 'digitSorter':
          window.Games.digitSorter(gameArea);
          break;
        case 'numberExtremes':
          window.Games.numberExtremes(gameArea);
          break;
        case 'digitConstraints':
          window.Games.digitConstraints(gameArea);
          break;
        case 'realLifeMathConcept':
          gameArea.dataset.conceptModule = 'realLifeMath';
          window.Games.conceptIntro(gameArea);
          break;
        case 'billDetective':
          window.Games.billDetective(gameArea);
          break;
        case 'chequeWriter':
          window.Games.chequeWriter(gameArea);
          break;
        case 'atmSimulator':
          window.Games.atmSimulator(gameArea);
          break;
        case 'numberBreaker':
          window.Games.numberBreaker(gameArea);
          break;
        case 'placeValueBlocks':
          window.Games.placeValueBlocks(gameArea);
          break;        case 'expandedFormBuilder':
          window.Games.expandedFormBuilder(gameArea);
          break;
        case 'placeValuePuzzle':
          window.Games.placeValuePuzzle(gameArea);
          break;
        case 'numberSorter':
          window.Games.numberSorter(gameArea);
          break;
        case 'ascendingClimber':
          window.Games.ascendingClimber(gameArea);
          break;
        case 'descendingDive':
          window.Games.descendingDive(gameArea);
          break;
        case 'dataInterpretationConcept':
          gameArea.dataset.conceptModule = 'dataInterpretation';
          window.Games.conceptIntro(gameArea);
          break;
        case 'pictureGraphInterpreter':
          window.Games.pictureGraphInterpreter(gameArea);
          break;
        case 'barGraphInterpreter':
          window.Games.barGraphInterpreter(gameArea);
          break;
        case 'tableInterpreter':
          window.Games.tableInterpreter(gameArea);
          break;
        case 'faceValueChallenge':
          window.Games.faceValueChallenge(gameArea);
          break;
        default:
          if (typeof window.Games.comingSoon === 'function') {
            window.Games.comingSoon(gameArea);
          } else {
            gameArea.innerHTML = '<div style="text-align:center; padding:20px;"><h3>Coming Soon</h3><p>This game is under development.</p></div>';
          }
      }
    } catch (error) {
      this.error('Error loading game: ' + error);
      gameArea.innerHTML = '<div style="text-align: center; padding: 20px; color: #d32f2f;"><h3>Error Loading Game</h3><p>There was a problem loading the "' + gameId + '" game.</p><p>Technical details: ' + error.message + '</p></div>';
    }
  }
};

// Log that initialization is complete
console.log('Core initialization complete. GameLoader is now available.');
