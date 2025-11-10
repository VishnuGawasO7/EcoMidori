// game.js - EcoMidori Waste Sorting Challenge Game

document.addEventListener('DOMContentLoaded', function() {
    // Game state variables
    let gameState = {
        score: 0,
        timeLeft: 60,
        currentStreak: 0,
        bestStreak: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        isPaused: false,
        gameActive: false,
        currentItem: null,
        timerInterval: null
    };

    // Game data
    const wasteItems = [
        // Organic Items
        { name: 'banana peel', type: 'organic', emoji: '🍌' },
        { name: 'apple core', type: 'organic', emoji: '🍎' },
        { name: 'fallen leaves', type: 'organic', emoji: '🍂' },
        { name: 'egg shells', type: 'organic', emoji: '🥚' },
        { name: 'coffee grounds', type: 'organic', emoji: '☕' },
        { name: 'tea bags', type: 'organic', emoji: '🫖' },
        { name: 'vegetable scraps', type: 'organic', emoji: '🥕' },
        
        // Recyclable Items
        { name: 'plastic bottle', type: 'recyclable', emoji: '🧴' },
        { name: 'newspaper', type: 'recyclable', emoji: '📰' },
        { name: 'aluminum can', type: 'recyclable', emoji: '🥫' },
        { name: 'glass jar', type: 'recyclable', emoji: '🫙' },
        { name: 'cardboard box', type: 'recyclable', emoji: '📦' },
        { name: 'metal can', type: 'recyclable', emoji: '🥫' },
        { name: 'plastic container', type: 'recyclable', emoji: '🍱' },
        
        // Hazardous Items
        { name: 'battery', type: 'hazardous', emoji: '🔋' },
        { name: 'broken bulb', type: 'hazardous', emoji: '💡' },
        { name: 'medicine bottle', type: 'hazardous', emoji: '💊' },
        { name: 'paint can', type: 'hazardous', emoji: '🎨' },
        { name: 'aerosol can', type: 'hazardous', emoji: '🧴' },
        { name: 'cleaning chemicals', type: 'hazardous', emoji: '🧪' },
        { name: 'electronic waste', type: 'hazardous', emoji: '📱' }
    ];

    const funFacts = [
        "Paper can be recycled up to 7 times!",
        "Banana peels make great compost for gardens.",
        "Recycling one aluminum can saves enough energy to run a TV for 3 hours!",
        "Organic waste in landfills produces methane, a potent greenhouse gas.",
        "Glass can be recycled endlessly without loss in quality.",
        "Proper waste sorting can reduce landfill waste by up to 60%.",
        "Composting food waste reduces its volume by 50-80%.",
        "Recycling one ton of paper saves 17 trees and 7,000 gallons of water.",
        "E-waste contains valuable metals like gold, silver, and copper.",
        "Plastic bottles can take up to 450 years to decompose in landfills.",
        "Food waste accounts for about 30% of what we throw away.",
        "Recycling creates 6 times more jobs than sending waste to landfills."
    ];

    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const gameArea = document.getElementById('game-area');
    const pauseScreen = document.getElementById('pause-screen');
    const endScreen = document.getElementById('end-screen');
    
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resumeBtn = document.getElementById('resume-btn');
    const quitBtn = document.getElementById('quit-btn');
    const retryBtn = document.getElementById('retry-btn');
    
    const timeDisplay = document.getElementById('time');
    const scoreDisplay = document.getElementById('score');
    const streakDisplay = document.getElementById('streak');
    const finalScoreDisplay = document.getElementById('final-score');
    const correctAnswersDisplay = document.getElementById('correct-answers');
    const incorrectAnswersDisplay = document.getElementById('incorrect-answers');
    const bestStreakDisplay = document.getElementById('best-streak');
    const resultTitle = document.getElementById('result-title');
    const resultSubtitle = document.getElementById('result-subtitle');
    const resultTrophy = document.getElementById('result-trophy');
    
    const wasteItem = document.getElementById('waste-item');
    const itemName = document.getElementById('item-name');
    const funFact = document.getElementById('fun-fact');
    
    const bins = document.querySelectorAll('.bin');
    const shareScoreBtn = document.getElementById('share-score');

    // Initialize game
    initGame();

    function initGame() {
        // Event listeners
        startBtn.addEventListener('click', startGame);
        pauseBtn.addEventListener('click', pauseGame);
        resumeBtn.addEventListener('click', resumeGame);
        quitBtn.addEventListener('click', quitGame);
        retryBtn.addEventListener('click', restartGame);
        shareScoreBtn.addEventListener('click', shareScore);
        
        // Bin event listeners for desktop (drag and drop)
        bins.forEach(bin => {
            bin.addEventListener('dragover', handleDragOver);
            bin.addEventListener('drop', handleDrop);
            bin.addEventListener('dragenter', handleDragEnter);
            bin.addEventListener('dragleave', handleDragLeave);
            
            // Touch/mobile support
            bin.addEventListener('click', handleBinClick);
        });
        
        // Waste item drag events
        wasteItem.addEventListener('dragstart', handleDragStart);
        wasteItem.addEventListener('dragend', handleDragEnd);
        
        // Touch events for mobile dragging
        let touchStartX, touchStartY;
        wasteItem.addEventListener('touchstart', handleTouchStart);
        wasteItem.addEventListener('touchmove', handleTouchMove);
        wasteItem.addEventListener('touchend', handleTouchEnd);
        
        // Keyboard support
        document.addEventListener('keydown', handleKeyPress);
        
        // Show start screen
        showScreen(startScreen);
    }

    // Screen management
    function showScreen(screen) {
        document.querySelectorAll('.game-screen').forEach(s => {
            s.classList.remove('active');
        });
        screen.classList.add('active');
    }

    // Game control functions
    function startGame() {
        resetGame();
        gameState.gameActive = true;
        showScreen(gameArea);
        startTimer();
        showNextItem();
        updateFunFact();
    }

    function pauseGame() {
        if (!gameState.gameActive) return;
        
        gameState.isPaused = true;
        clearInterval(gameState.timerInterval);
        
        // Update pause screen stats
        document.getElementById('pause-time').textContent = `${gameState.timeLeft}s`;
        document.getElementById('pause-score').textContent = gameState.score;
        document.getElementById('pause-streak').textContent = gameState.currentStreak;
        
        showScreen(pauseScreen);
    }

    function resumeGame() {
        if (!gameState.gameActive) return;
        
        gameState.isPaused = false;
        showScreen(gameArea);
        startTimer();
    }

    function quitGame() {
        clearInterval(gameState.timerInterval);
        gameState.gameActive = false;
        showScreen(startScreen);
    }

    function restartGame() {
        startGame();
    }

    function endGame() {
        gameState.gameActive = false;
        clearInterval(gameState.timerInterval);
        
        // Update end screen
        finalScoreDisplay.textContent = gameState.score;
        correctAnswersDisplay.textContent = gameState.correctAnswers;
        incorrectAnswersDisplay.textContent = gameState.incorrectAnswers;
        bestStreakDisplay.textContent = gameState.bestStreak;
        
        // Determine result message
        let message, subtitle, trophyColor;
        if (gameState.score >= 80) {
            message = "Master Recycler! 🌱";
            subtitle = "Your waste sorting skills are exceptional! You're a true environmental champion.";
            trophyColor = "#FFD700"; // Gold
        } else if (gameState.score >= 50) {
            message = "Eco Enthusiast! 🍃";
            subtitle = "Great job! You have solid knowledge of proper waste segregation.";
            trophyColor = "#C0C0C0"; // Silver
        } else {
            message = "Keep Learning! 🌾";
            subtitle = "Every correct sorting choice makes a difference. Keep practicing!";
            trophyColor = "#CD7F32"; // Bronze
        }
        
        resultTitle.textContent = message;
        resultSubtitle.textContent = subtitle;
        resultTrophy.style.color = trophyColor;
        
        // Save high score
        saveHighScore();
        
        showScreen(endScreen);
    }

    function resetGame() {
        gameState = {
            score: 0,
            timeLeft: 60,
            currentStreak: 0,
            bestStreak: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            isPaused: false,
            gameActive: false,
            currentItem: null,
            timerInterval: null
        };
        
        updateDisplay();
        resetBins();
    }

    // Game logic functions
    function startTimer() {
        gameState.timerInterval = setInterval(() => {
            if (!gameState.isPaused && gameState.gameActive) {
                gameState.timeLeft--;
                updateDisplay();
                
                if (gameState.timeLeft <= 0) {
                    endGame();
                }
            }
        }, 1000);
    }

    function showNextItem() {
        if (!gameState.gameActive) return;
        
        // Reset bins
        resetBins();
        
        // Select random item
        const randomIndex = Math.floor(Math.random() * wasteItems.length);
        gameState.currentItem = wasteItems[randomIndex];
        
        // Update display
        wasteItem.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><text x='50' y='50' font-size='60' text-anchor='middle' dominant-baseline='middle'>${gameState.currentItem.emoji}</text></svg>`;
        wasteItem.alt = gameState.currentItem.name;
        itemName.textContent = gameState.currentItem.name;
        
        // Add animation
        wasteItem.classList.remove('new-item');
        void wasteItem.offsetWidth; // Trigger reflow
        wasteItem.classList.add('new-item');
    }

    function checkAnswer(selectedBinType) {
        if (!gameState.gameActive || gameState.isPaused) return;
        
        const isCorrect = selectedBinType === gameState.currentItem.type;
        const bin = document.getElementById(`bin-${selectedBinType}`);
        
        if (isCorrect) {
            // Correct answer
            gameState.score += 10;
            gameState.correctAnswers++;
            gameState.currentStreak++;
            
            if (gameState.currentStreak > gameState.bestStreak) {
                gameState.bestStreak = gameState.currentStreak;
            }
            
            // Visual feedback
            bin.classList.add('correct');
            
            // Show streak indicator for high streaks
            if (gameState.currentStreak >= 3) {
                showStreakIndicator(gameState.currentStreak);
            }
            
            // Play sound (simulated)
            playSound('correct');
        } else {
            // Incorrect answer
            gameState.score = Math.max(0, gameState.score - 5);
            gameState.incorrectAnswers++;
            gameState.currentStreak = 0;
            
            // Visual feedback
            bin.classList.add('wrong');
            
            // Play sound (simulated)
            playSound('wrong');
        }
        
        updateDisplay();
        updateFunFact();
        
        // Show next item after delay
        setTimeout(() => {
            if (gameState.gameActive && !gameState.isPaused) {
                showNextItem();
            }
        }, 1000);
    }

    function updateDisplay() {
        timeDisplay.textContent = gameState.timeLeft;
        scoreDisplay.textContent = gameState.score;
        streakDisplay.textContent = gameState.currentStreak;
        
        // Add visual feedback for high score
        if (gameState.score > 0 && gameState.score % 50 === 0) {
            scoreDisplay.classList.add('high-score');
            setTimeout(() => {
                scoreDisplay.classList.remove('high-score');
            }, 2000);
        }
    }

    function updateFunFact() {
        const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
        funFact.querySelector('span').textContent = `Did you know? ${randomFact}`;
    }

    function resetBins() {
        bins.forEach(bin => {
            bin.classList.remove('correct', 'wrong');
        });
    }

    function showStreakIndicator(streak) {
        const indicator = document.createElement('div');
        indicator.className = 'streak-indicator';
        indicator.textContent = `${streak} in a row! 🔥`;
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            indicator.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(indicator)) {
                    document.body.removeChild(indicator);
                }
            }, 300);
        }, 1500);
    }

    // Drag and drop handlers
    function handleDragStart(e) {
        if (!gameState.gameActive || gameState.isPaused) {
            e.preventDefault();
            return;
        }
        
        e.dataTransfer.setData('text/plain', gameState.currentItem.type);
        wasteItem.classList.add('dragging');
        
        // Set drag image for better visual feedback
        const dragImage = wasteItem.cloneNode(true);
        dragImage.style.width = '80px';
        dragImage.style.height = '80px';
        dragImage.style.position = 'absolute';
        dragImage.style.top = '-1000px';
        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(dragImage, 40, 40);
        
        setTimeout(() => {
            document.body.removeChild(dragImage);
        }, 0);
    }

    function handleDragEnd() {
        wasteItem.classList.remove('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDragEnter(e) {
        e.preventDefault();
        if (!gameState.gameActive || gameState.isPaused) return;
        
        this.style.transform = 'scale(1.05)';
    }

    function handleDragLeave() {
        if (!gameState.gameActive || gameState.isPaused) return;
        
        this.style.transform = '';
    }

    function handleDrop(e) {
        e.preventDefault();
        if (!gameState.gameActive || gameState.isPaused) return;
        
        this.style.transform = '';
        const itemType = e.dataTransfer.getData('text/plain');
        const binType = this.getAttribute('data-type');
        
        // For drag and drop, we already know the item type from dataTransfer
        checkAnswer(binType);
    }

    // Touch handlers for mobile
    function handleTouchStart(e) {
        if (!gameState.gameActive || gameState.isPaused) return;
        
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        
        wasteItem.style.transition = 'none';
        wasteItem.style.zIndex = '1000';
        wasteItem.style.position = 'fixed';
    }

    function handleTouchMove(e) {
        if (!gameState.gameActive || gameState.isPaused) return;
        
        e.preventDefault();
        const touch = e.touches[0];
        
        wasteItem.style.left = (touch.clientX - 60) + 'px';
        wasteItem.style.top = (touch.clientY - 60) + 'px';
        wasteItem.style.transform = 'scale(1.1) rotate(5deg)';
    }

    function handleTouchEnd(e) {
        if (!gameState.gameActive || gameState.isPaused) return;
        
        wasteItem.style.transition = 'all 0.3s ease';
        wasteItem.style.zIndex = '';
        wasteItem.style.position = '';
        wasteItem.style.left = '';
        wasteItem.style.top = '';
        wasteItem.style.transform = '';
        
        // Check if item was dropped on a bin
        const touch = e.changedTouches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        const bin = element.closest('.bin');
        
        if (bin) {
            const binType = bin.getAttribute('data-type');
            checkAnswer(binType);
        }
    }

    // Click handler for bins (alternative to drag and drop)
    function handleBinClick(e) {
        if (!gameState.gameActive || gameState.isPaused) return;
        
        const binType = this.getAttribute('data-type');
        checkAnswer(binType);
    }

    // Keyboard support
    function handleKeyPress(e) {
        if (!gameState.gameActive || gameState.isPaused) return;
        
        // Number keys 1-3 for bins
        if (e.key >= '1' && e.key <= '3') {
            const binIndex = parseInt(e.key) - 1;
            if (bins[binIndex]) {
                const binType = bins[binIndex].getAttribute('data-type');
                checkAnswer(binType);
            }
        }
        
        // Space bar to pause/resume
        if (e.code === 'Space') {
            e.preventDefault();
            if (gameState.isPaused) {
                resumeGame();
            } else {
                pauseGame();
            }
        }
        
        // Escape to quit
        if (e.code === 'Escape') {
            quitGame();
        }
    }

    // Sound effects (simulated with Web Audio API)
    function playSound(type) {
        // In a real implementation, you would use actual sound files
        // For this demo, we'll simulate sounds with the Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            if (type === 'correct') {
                oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            } else if (type === 'wrong') {
                oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            }
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.log('Audio not supported');
        }
    }

    // High score management
    function saveHighScore() {
        const highScores = JSON.parse(localStorage.getItem('ecoGameHighScores') || '[]');
        highScores.push({
            score: gameState.score,
            date: new Date().toISOString(),
            correct: gameState.correctAnswers,
            streak: gameState.bestStreak
        });
        
        // Keep only top 10 scores
        highScores.sort((a, b) => b.score - a.score);
        const topScores = highScores.slice(0, 10);
        
        localStorage.setItem('ecoGameHighScores', JSON.stringify(topScores));
    }

    function shareScore() {
        const shareText = `I scored ${gameState.score} points in the EcoMidori Waste Sorting Challenge! 🌱 Can you beat my score?`;
        
        if (navigator.share) {
            navigator.share({
                title: 'EcoMidori Waste Sorting Challenge',
                text: shareText,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
                fallbackShare(shareText);
            });
        } else {
            fallbackShare(shareText);
        }
    }

    function fallbackShare(shareText) {
        // Copy to clipboard as fallback
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Score copied to clipboard! Share it with your friends.');
        }).catch(err => {
            console.log('Could not copy text: ', err);
            alert(shareText);
        });
    }

    // Initialize any game-specific UI enhancements
    function initGameUI() {
        // Add floating leaves background animation
        createFloatingLeaves();
    }

    function createFloatingLeaves() {
        const container = document.querySelector('.game-page-container');
        for (let i = 0; i < 8; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'floating-leaf';
            leaf.innerHTML = '<i class="fas fa-leaf"></i>';
            leaf.style.left = Math.random() * 100 + '%';
            leaf.style.animationDelay = Math.random() * 10 + 's';
            leaf.style.fontSize = (Math.random() * 20 + 10) + 'px';
            leaf.style.opacity = Math.random() * 0.3 + 0.1;
            container.appendChild(leaf);
        }
    }

    // Initialize UI when DOM is loaded
    initGameUI();
});