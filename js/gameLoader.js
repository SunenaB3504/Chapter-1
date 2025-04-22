/**
 * gameLoader.js - Responsible for loading the correct game
 * Acts as a bridge between UI and game implementations
 */

import Games from './games.js';

const GameLoader = {
    /**
     * Load a specific game by ID
     */
    loadGame: function(gameId) {
        const gameArea = document.getElementById('game-area');
        
        // Clear feedback area
        const feedback = document.getElementById('feedback');
        feedback.textContent = '';
        feedback.className = 'feedback';
        
        // Clear previous game content
        gameArea.innerHTML = '';
        
        // Ensure game area has an id for referencing
        gameArea.id = 'game-area';
          // Load game based on ID
        switch(gameId) {
            case 'placeValueDetective':
                Games.placeValueDetective(gameArea);
                break;
            case 'buildANumber':
                Games.buildANumber(gameArea);
                break;
            case 'numberBattle':
                Games.numberBattle(gameArea);
                break;            case 'riverLengthCompare':
                Games.riverLengthCompare(gameArea);
                break;
            case 'lakhsConcept':
                gameArea.dataset.conceptModule = 'lakhs';
                Games.conceptIntro(gameArea);
                break;
            case 'lakhAttack':
                Games.lakhAttack(gameArea);
                break;
            case 'carShowroom':
                gameArea.dataset.gameMode = 'carShowroom';
                Games.lakhAttack(gameArea); // Uses same game with car showroom theme
                break;            case 'rallyCounter':
                Games.rallyCounter(gameArea);
                break;
            case 'largeNumbersConcept':
                gameArea.dataset.conceptModule = 'largeNumbers';
                Games.conceptIntro(gameArea);
                break;
            case 'numberSpeller':
                Games.numberSpeller(gameArea);
                break;
            case 'readingLarge':
                Games.readingLarge(gameArea);
                break;            case 'commaPlacement':
                Games.commaPlacement(gameArea);
                break;
            case 'predecessorConcept':
                gameArea.dataset.conceptModule = 'predecessor';
                Games.conceptIntro(gameArea);
                break;
            case 'numberNeighbors':
                Games.numberNeighbors(gameArea);
                break;
            case 'beforeAndAfter':
                Games.beforeAndAfter(gameArea);
                break;            case 'numberLine':
                Games.numberLine(gameArea);
                break;
            case 'patternsConcept':
                gameArea.dataset.conceptModule = 'patterns';
                Games.conceptIntro(gameArea);
                break;
            case 'patternDetective':
                Games.patternDetective(gameArea);
                break;
            case 'patternMaker':
                Games.patternMaker(gameArea);
                break;
            case 'sequenceCompleter':
                Games.sequenceCompleter(gameArea);
                break;
            case 'chequeWriter':
                Games.chequeWriter(gameArea);
                break;case 'numberBreaker':
                Games.numberBreaker(gameArea);
                break;            case 'placeValueBlocks':
                Games.placeValueBlocks(gameArea);
                break;            case 'expandedFormBuilder':
                Games.expandedFormBuilder(gameArea);
                break;
            case 'numberSorter':
                Games.numberSorter(gameArea);
                break;
            case 'ascendingClimber':
                Games.ascendingClimber(gameArea);
                break;
            case 'descendingDive':
                Games.descendingDive(gameArea);
                break;
            case 'faceValueChallenge':
                Games.faceValueChallenge(gameArea);
                break;
            default:
                Games.comingSoon(gameArea);
        }
    }
};

export default GameLoader;
