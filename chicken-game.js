const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Draw a yellow square for the chicken
ctx.fillStyle = "#FFD700"; // Yellow color for the chicken.
ctx.fillRect(50, 50, 20, 20); // Draw the chicken at (50, 50)

// Draw a brown square for the seed
ctx.fillStyle = "#8B4513"; // Brown color for the seeds.
ctx.fillRect(100, 100, 20, 20); // Draw the seed at (100, 100)
