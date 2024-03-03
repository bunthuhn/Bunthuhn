const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let chicken;

(function setup() {
    chicken = new Chicken();
    seed = new Seed();
    seed.pickLocation();

    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        seed.draw();
        chicken.update();
        chicken.draw();

        if (chicken.eat(seed)) {
            seed.pickLocation();
        }

        chicken.checkCollision();
    }, 250);
}());

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    chicken.changeDirection(direction);
}));

function Chicken() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];

    this.draw = function() {
        ctx.fillStyle = "#FFD700"; // Golden color for the chicken.

        for (let i=0; i<this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }

        ctx.fillRect(this.x, this.y, scale, scale); // Head of the chicken.
    }

    this.update = function() {
        for (let i=0; i<this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1];
        }

        this.tail[this.total - 1] = { x: this.x, y: this.y };

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x >= canvas.width) {
            this.x = 0;
        }

        if (this.y >= canvas.height) {
            this.y = 0;
        }

        if (this.x < 0) {
            this.x = canvas.width - scale;
        }

        if (this.y < 0) {
            this.y = canvas.height - scale;
        }
    }

    this.changeDirection = function(direction) {
        // Your direction code here.
    }

    this.eat = function(seed) {
        // Your eat code here.
    }

    this.checkCollision = function() {
        // Your collision code here.
    }
}

function Seed() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = (Math.floor(Math.random() * columns) * scale);
        this.y = (Math.floor(Math.random() * rows) * scale);
    }

    this.draw = function() {
        ctx.fillStyle = "#8B4513"; // Brown color for the seeds.
        ctx.fillRect(this.x, this.y, scale, scale);
    }
}
