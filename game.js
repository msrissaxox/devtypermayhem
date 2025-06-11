// Funny developer-themed words and phrases
const words = [
    "YOLOcode",
    "caffeinatedDebugger",
    "zombieProcess",
    "unicornStartup",
    "cookieMonsterBug",
    "gitPushForce😱",
    "npm-install-universe",
    "docker-compose-chaos",
    "infinite-coffee-loop",
    "bugs-in-production-panic",
    "404-brain-not-found",
    "merge-conflict-therapy",
    "stack-overflow-copypasta",
    "production-yolo-deploy",
    "rubber-duck-debugger",
    "coffee-overflow-exception",
    "git-blame-someone-else",
    "quantum-bug-uncertainty",
    "blockchain-toaster",
    "ai-powered-coffee-maker",
    "machine-learning-sandwich",
    "neural-network-noodles",
    "cloud-native-unicorn",
    "kubernetes-karaoke",
    "docker-container-circus",
    "agile-zombie-scrum",
    "technical-debt-collector",
    "legacy-code-whisperer",
    "undefined-is-not-undefined",
    "null-pointer-breakdance"
];

// Sound effects
const keyboardSounds = [
    new Audio('https://upload.wikimedia.org/wikipedia/commons/3/3e/Typewriter-key.ogg'),
    new Audio('https://upload.wikimedia.org/wikipedia/commons/3/3e/Typewriter-key.ogg')
];
let currentSound = 0;
let soundEnabled = true;

// Game state
let currentWord = '';
let score = 0;
let wpm = 0;
let level = 1;
let startTime;
let wordCount = 0;

// DOM elements
const wordDisplay = document.getElementById('current-word');
const input = document.getElementById('input');
const scoreDisplay = document.getElementById('score');
const wpmDisplay = document.getElementById('wpm');
const levelDisplay = document.getElementById('level');
const toggleSoundBtn = document.getElementById('toggle-sound');

// Initialize game
function init() {
    setNewWord();
    input.value = '';
    input.focus();
    startTime = new Date().getTime();
}

// Set a new word
function setNewWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordDisplay.textContent = currentWord;
    addWordEffect();
}

// Create particle effect
function createParticle(x, y, color) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.textContent = '✨';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.color = color;
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
}

// Add visual effect to word
function addWordEffect() {
    wordDisplay.style.transform = 'scale(1.1)';
    setTimeout(() => {
        wordDisplay.style.transform = 'scale(1)';
    }, 200);
}

// Play keyboard sound
function playKeySound() {
    if (!soundEnabled) return;
    
    keyboardSounds[currentSound].currentTime = 0;
    keyboardSounds[currentSound].play();
    currentSound = (currentSound + 1) % keyboardSounds.length;
}

// Calculate WPM
function calculateWPM() {
    const timeElapsed = (new Date().getTime() - startTime) / 1000 / 60; // in minutes
    wpm = Math.round((wordCount / timeElapsed) || 0);
    wpmDisplay.textContent = wpm;
}

// Update score and level
function updateScore(points) {
    score += points;
    scoreDisplay.textContent = score;
    
    // Level up every 100 points
    const newLevel = Math.floor(score / 100) + 1;
    if (newLevel !== level) {
        level = newLevel;
        levelDisplay.textContent = level;
        showLevelUpEffect();
    }
}

// Level up effect
function showLevelUpEffect() {
    const colors = ['#ff69b4', '#00ff00', '#ff0000', '#0000ff', '#ffff00'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const color = colors[Math.floor(Math.random() * colors.length)];
            createParticle(x, y, color);
        }, i * 50);
    }
}

// Handle input
input.addEventListener('input', (e) => {
    playKeySound();
    
    const typed = e.target.value.trim();
    
    // Create random particles while typing
    if (Math.random() < 0.3) {
        const rect = input.getBoundingClientRect();
        createParticle(
            rect.left + Math.random() * rect.width,
            rect.top - 20,
            `hsl(${Math.random() * 360}, 100%, 50%)`
        );
    }
    
    if (typed === currentWord) {
        wordCount++;
        calculateWPM();
        
        // Score based on word length and current level
        const points = Math.ceil(currentWord.length * level * 1.5);
        updateScore(points);
        
        // Visual feedback
        showLevelUpEffect();
        
        // Reset input and set new word
        e.target.value = '';
        setNewWord();
    } else if (currentWord.startsWith(typed)) {
        input.style.backgroundColor = '#e8f5e9';
    } else {
        input.style.backgroundColor = '#ffebee';
    }
});

// Toggle sound
toggleSoundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    toggleSoundBtn.textContent = `🔊 Sound: ${soundEnabled ? 'ON' : 'OFF'}`;
});

// Start the game
init();

// Keep input focused
document.addEventListener('click', () => input.focus());