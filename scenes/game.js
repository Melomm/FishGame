// Definindo a cena principal do jogo usando a biblioteca Phaser
class Game extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({
            key: 'Game',
            physics: {
               arcade: {
                debug: false,
                gravity: { y: 200 }
               } 
            }
        });
        
        this.score = 0;
        this.scoreText = null;
        this.foods = 0;
        
    }

    
    // Preload de assets
    preload() 
    {
        this.load.image('bg', 'assets/FISHGAME.jpg');
        this.load.image('ground', 'assets/fishCollider.jpg');
        this.load.image('food', 'assets/Food.png');
        this.load.spritesheet('fish', 'assets/fishSpin.png', {frameWidth: 631, frameHeight: 631});
    }

    // Funcao para configurar os elementos do jogo
    create() 
    {
        //  Background
        this.add.image(640, 400, 'bg')
    
        //  Plataformas
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(640, 750, 'ground').setScale(3.5,2).refreshBody();
    
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(1000, 220, 'ground');
        this.platforms.create(250, 560, 'ground');
        this.platforms.create(1050, 560, 'ground');
    
        // Jogador
        this.player = this.physics.add.sprite(400, 450, 'fish').setScale(0.2).setSize(300,300);
        this.player.setCollideWorldBounds(true);
    
        //  Fisica do jogador
        this.player.setBounce(0.1);
    
        //  Animacao do jogador
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('fish', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('fish', { start: 6, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('fish', { start: 14, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
    
        //  Input do teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        // Adicionando alimentos
    this.foods = this.physics.add.group({
        key: 'food',
        repeat: 11,
        setXY: { x: 100, y: 0, stepX: 100 }
    });

    // Funcao para randomizar os tamanhos das comidas
    function randomizeFoodSize(food) {
        // Gera um fator de escala aleatório entre 0.5 e 1.5
        let scale = Phaser.Math.Between(50, 75, 100) / 100;
        food.setScale(scale); // Define a escala aleatória
        }

        // Itera sobre cada comida e aplica a funcao para randomizar o tamanho
        this.foods.children.iterate(randomizeFoodSize);
    
        //  Pontos
        this.scoreText = this.add.text(16, 16, 'SCORE: 0', { fontSize: '32px', fill: '#ffffff' });
    
        //  Colisao
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.foods, this.platforms);
    
        //  Checa se o jogador overlap com alguma estrela ou bomba e ativa a funcao
        this.physics.add.overlap(this.player, this.foods, this.collectFoods, null, this);
    };
    

    // Funcao que atualiza o estado do jogo
    update() 
    {
        // Movimentacao do jogador
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-260);
    
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(260);
    
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);
    
            this.player.anims.play('turn',true);
        }
    
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-280);
        }
        
    }

    collectFoods(player, food) {
        food.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText('SCORE: ' + this.score);

        // Usando a var de instância foods para verificar a contagem de alimentos ativos
        if (this.foods.countActive(true) === 0) {
            this.foods.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
        }
    }
}
