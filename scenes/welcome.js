// Definindo a cena de boas-vindas usando a biblioteca Phaser
class Welcome extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({
            key: 'Welcome',
        });
    }

    preload() {
        this.load.image('background', './assets/FISHGAME.jpg')
        this.load.image('start', './assets/Start.jpg');
        this.load.image('arrows', './assets/Arrows.jpg');
    
    }

    create() {

        this.bg = this.add.image(640, 400, 'background');
        this.controls = this.add.image(640, 590, 'arrows').setScale(1.2);


        // botao iniciar
        this.ButtonStart = this.add.image(640, 385,'start').setScale(2);
        // interação com o botão
        this.ButtonStart.setInteractive({ cursor: 'pointer'});

        // Transicao ao clicar o botao
        this.ButtonStart.on('pointerup', () => { this.scene.start('Game');});



    }
}
