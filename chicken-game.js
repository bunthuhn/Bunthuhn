const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let chicken;
let chickenImage = new Image();
let seed;
let seedImage = new Image();
let imagesLoaded = 0;
let score = 0;
let interval;
let playerName = '';

chickenImage.src = 'chicken.png';
seedImage.src = 'seed.png';

chickenImage.addEventListener('load', imageLoaded);
chickenImage.addEventListener('error', imageError);
seedImage.addEventListener('load', imageLoaded);
seedImage.addEventListener('error', imageError);

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        updateLeaderboard(); // Initial leaderboard update
    }
}

function imageError(e) {
    console.error("Error loading image: ", e.target.src);
}

function startGame() {
    playerName = document.getElementById('playerName').value || 'Anonymous';
    if (interval) clearInterval(interval);
    score = 0;
    chicken = new Chicken();
    seed = new Seed();
    seed.pickLocation();

    interval = window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        seed.draw();
        chicken.update();
        chicken.draw();
        drawScore();

        if (chicken.eat(seed)) {
            score++;
            seed.pickLocation();
        }

        chicken.checkCollision();
    }, 250);
}

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    chicken.changeDirection(direction);
}));

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, scale, scale);
}

function updateLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name: playerName, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard.splice(3); // Keep only top 3

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = leaderboard
        .map(entry => `<li>${entry.name}: ${entry.score}</li>`)
        .join('');
}

function Chicken() {
    // ... (rest of the Chicken class)
    // Add 'this.checkCollision' in the 'update' method of the Chicken class
}

function Seed() {
    // ... (rest of the Seed class)
}

// ... (rest of the code)
