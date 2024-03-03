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

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        setup();
    }
}

function imageError(e) {
    console.error("Error loading image: ", e.target.src);
    // You can handle the error more gracefully here, like setting a fallback image
}

// Set up event listeners for when the images have loaded
chickenImage.addEventListener('load', imageLoaded);
chickenImage.addEventListener('error', imageError);
seedImage.addEventListener('load', imageLoaded);
seedImage.addEventListener('error', imageError);

// Set the source files for the images
chickenImage.src = 'chicken.png'; // Make sure this is the path to your chicken image
seedImage.src = 'seed.png';       // Make sure this is the path to your seed image

function setup() {
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
}

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
        for (let i = 0; i < this.tail.length; i++) {
            ctx.drawImage(chickenImage, this.tail[i].x, this.tail[i].y, scale, scale);
        }
        ctx.drawImage(chickenImage, this.x, this.y, scale, scale);
    };

    this.update = function() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        if (this.total >= 1) {
            this.tail[this.total - 1] = { x: this.x, y: this.y };
        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x >= canvas.width) {
            this.x = 0;
        }

        if (this.y >= canvas.height) {
            this.y = 0;
        }

        if (this.x < 0) {
            this.x = canvas.width;
        }

        if (this.y < 0) {
            this.y = canvas.height;
        }
    };

    this.changeDirection = function(direction) {
        switch (direction) {
            case 'Up':
                this.xSpeed = 0;
                this.ySpeed = -scale * 1;
                break;
            case 'Down':
                this.xSpeed = 0;
                this.ySpeed = scale * 1;
                break;
            case 'Left':
                this.xSpeed = -scale * 1;
                this.ySpeed = 0;
                break;
            case 'Right':
                this.xSpeed = scale * 1;
                this.ySpeed = 0;
                break;
        }
    };

    this.eat = function(seed) {
        if (this.x === seed.x && this.y === seed.y) {
            this.total++;
            return true;
        }

        return false;
    };

    this.checkCollision = function() {
        for (var i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                this.total = 0;
                this.tail = [];
            }
        }
    }
}

function Seed() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = (Math.floor(Math.random() * columns) * scale);
        this.y = (Math.floor(Math.random() * rows) * scale);
    };

    this.draw = function() {
        ctx.drawImage(seedImage, this.x, this.y, scale, scale);
    }
}
