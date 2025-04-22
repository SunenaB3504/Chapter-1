/**
 * data.js - Contains all data-related functionality
 * Manages modules data and user progress data
 */

// Module data
const moduleData = [
    {        id: 1,
        title: "Place Value Revision",
        description: "Review place values and understand the difference between face value and place value.",
        progress: 100,
        unlocked: true,
        games: ["placeValueDetective", "buildANumber", "faceValueChallenge", "placeValueBlocks"],
        conceptDetails: {
            mainConcepts: ["Place Value", "Face Value", "Relationship Between Place Values"],
            realLifeExamples: ["Reading price tags", "Reading house numbers", "Organizing books by page number"],
            visualAids: ["Place value chart", "Abacus visualization", "Base-10 blocks"]
        }
    },
    {
        id: 2,
        title: "Expanded Form",
        description: "Break down numbers to understand the value of each digit.",
        progress: 75,
        unlocked: true,
        games: ["numberBreaker", "expandedFormBuilder", "placeValuePuzzle"],
        conceptDetails: {
            mainConcepts: ["Expanded Form", "Place Value Addition", "Digit Values"],
            realLifeExamples: ["Breaking down money into notes and coins", "Measuring lengths in meters and centimeters"],
            visualAids: ["Expanded form animations", "Place value blocks", "Number line jumps"]
        }
    },
    {
        id: 3,
        title: "Comparing Numbers",
        description: "Learn to compare numbers using <, =, and > symbols.",
        progress: 40,
        unlocked: true,
        games: ["numberBattle", "riverLengthCompare", "comparingSymbols"],
        conceptDetails: {
            mainConcepts: ["Number Comparison", "Greater Than/Less Than", "Equal Numbers"],
            realLifeExamples: ["Comparing river lengths in India", "Comparing ages of family members", "Comparing heights of students"],
            visualAids: ["River length map of India", "Height comparison charts", "Number line visualization"]
        }
    },
    {
        id: 4,
        title: "Ordering Numbers",
        description: "Arrange numbers in ascending and descending order.",
        progress: 10,
        unlocked: true,
        games: ["numberSorter", "ascendingClimber", "descendingDive"],
        conceptDetails: {
            mainConcepts: ["Ascending Order", "Descending Order", "Number Sequences"],
            realLifeExamples: ["Arranging river lengths", "Ordering test scores", "Ranking sports teams by points"],
            visualAids: ["Sorting animations", "Stair step visualization", "Mountain climb metaphor"]
        }
    },    {
        id: 5,
        title: "Introduction to Lakhs",
        description: "Learn about lakhs and 6-digit numbers in Indian number system.",
        progress: 0,
        unlocked: true,
        games: ["lakhsConcept", "lakhAttack", "carShowroom", "rallyCounter"],
        conceptDetails: {
            mainConcepts: ["Lakh as 100,000", "10 Ten Thousands = 1 Lakh", "6-digit Numbers"],
            realLifeExamples: ["Car prices in lakhs", "Rally attendance numbers", "Population of small towns"],
            visualAids: ["Bundles of 10,000 rupee notes", "Stadium crowd visualization", "Lakh place value chart"]
        }
    },    {
        id: 6,
        title: "Reading & Writing Large Numbers",
        description: "Master reading and writing 5-6 digit numbers including lakhs.",
        progress: 0,
        unlocked: true,
        games: ["largeNumbersConcept", "numberSpeller", "readingLarge", "commaPlacement"],
        conceptDetails: {
            mainConcepts: ["Indian Place Value System", "Using Commas", "Number Names"],
            realLifeExamples: ["Reading car price tags", "Writing cheque amounts", "Reading population figures"],
            visualAids: ["Place value chart with periods", "Cheque writing practice", "Number name cards"]
        }
    },
    {
        id: 7,
        title: "Predecessor & Successor",
        description: "Understand numbers that come just before and after.",
        progress: 0,
        unlocked: false,
        games: ["numberNeighbors", "beforeAndAfter", "numberLine"],
        conceptDetails: {
            mainConcepts: ["Predecessor (1 less)", "Successor (1 more)", "Number Sequences"],
            realLifeExamples: ["House numbers on a street", "Pages in a book", "Calendar dates"],
            visualAids: ["Number line jumps", "Before and after visualization", "Number train animation"]
        }
    },
    {
        id: 8,
        title: "Number Patterns",
        description: "Identify and complete exciting number patterns.",
        progress: 0,
        unlocked: false,
        games: ["patternDetective", "patternMaker", "sequenceCompleter"],
        conceptDetails: {
            mainConcepts: ["Increasing Patterns", "Decreasing Patterns", "Skip Counting"],
            realLifeExamples: ["Calendar patterns", "House number patterns", "Growth patterns in nature"],
            visualAids: ["Interactive pattern tiles", "Growth animations", "Pattern connecting dots"]
        }
    },
    {
        id: 9,
        title: "Smallest & Largest Numbers",
        description: "Form the smallest and largest numbers using given digits.",
        progress: 0,
        unlocked: false,
        games: ["digitSorter", "numberExtremes", "digitConstraints"],
        conceptDetails: {
            mainConcepts: ["Digit Arrangement", "Place Value Importance", "Constraint-based Numbers"],
            realLifeExamples: ["High score and low score in games", "Highest and lowest temperatures", "Maximum and minimum prices"],
            visualAids: ["Digit cards to arrange", "Thermometer visualization", "Number line extremes"]
        }
    },
    {
        id: 10,
        title: "Real-Life Math",
        description: "Apply number concepts in everyday situations.",
        progress: 0,
        unlocked: false,
        games: ["billDetective", "chequeWriter", "atmSimulator"],
        conceptDetails: {
            mainConcepts: ["Reading Bills", "Writing Cheques", "Managing Money"],
            realLifeExamples: ["Electricity bill reading", "Writing amounts on cheques", "ATM transactions"],
            visualAids: ["Interactive bill samples", "Cheque filling practice", "ATM interface simulation"]
        }
    },
    {
        id: 11,
        title: "Data Interpretation",
        description: "Read and interpret data from tables and visual representations.",
        progress: 0,
        unlocked: false,
        games: ["mapReader", "tableInterpreter", "visualData"],
        conceptDetails: {
            mainConcepts: ["Reading Maps with Numbers", "Table Interpretation", "Visual Data Analysis"],
            realLifeExamples: ["India's river lengths map", "Temperature charts", "Population tables"],
            visualAids: ["Interactive maps", "Color-coded data tables", "Bar graph visualizations"]
        }
    }
];

// User data
let userData = {
    name: "Aarav",
    level: 1,
    stars: 12,
    progress: 25,
    badges: ["Number Explorer", "5-Day Streak"],
    completedGames: []
};

// Data management functions
const DataManager = {
    /**
     * Get all module data
     */
    getModules: function() {
        return moduleData;
    },
    
    /**
     * Get specific module by id
     */
    getModuleById: function(id) {
        return moduleData.find(module => module.id === id);
    },
    
    /**
     * Get user data
     */
    getUserData: function() {
        return userData;
    },
    
    /**
     * Update user progress and check for level up
     */
    updateUserProgress: function(points) {
        userData.stars += points;
        
        // Check for level up
        if (userData.stars >= userData.level * 20) {
            userData.level++;
            
            // Unlock new modules
            if (userData.level >= 3 && !moduleData[4].unlocked) {
                moduleData[4].unlocked = true;
                return true; // Return true if unlocked new module
            }
        }
        
        return false;
    },
    
    /**
     * Mark a game as completed
     */
    completeGame: function(gameId) {
        if (!userData.completedGames.includes(gameId)) {
            userData.completedGames.push(gameId);
        }
    },
    
    /**
     * Update module progress
     */
    updateModuleProgress: function(moduleId, progress) {
        const module = this.getModuleById(moduleId);
        if (module) {
            module.progress = Math.min(100, progress);
        }
    }
};

export default DataManager;
