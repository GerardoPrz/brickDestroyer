import { Scoreboard } from '../components/Scoreboard.js';
import { RestartButton } from '../components/restar-button.js';
import { LiveCounter } from '../components/LiveCounter.js';
import { PhaseContructor } from '../components/phase-constructor.js';
import { InvictusMesagge } from '../components/Invictusmesagge.js';

export class Game extends Phaser.Scene{
//estamos haciendo una escena para exportarla
    constructor(){
        super({ key: 'game'});//nombre de la escena
    }

    init(){//se ejecuta cada vez que la escena se inicia o reinicia
        this.phaseContructor = new PhaseContructor(this);
        this.scoreboard = new Scoreboard(this);
        this.restarbutton = new RestartButton(this);
        this.liveCounter = new LiveCounter(this, 3);//le pasamos la escen Game y que inicie con 3 vidas
        this.invictusmesagge = new InvictusMesagge(this);
    }

    preload(){
        this.load.image('background','images/background.png');
        this.load.image('gameover','images/gameover.png');
        this.load.image('platform','images/platform.png');
        this.load.image('pelota','images/pelota.png');
        this.load.image('bluebrick','images/brickBlue.png');
        this.load.image('blackbrick','images/brickBlack.png');
        this.load.image('greenbrick','images/brickGreen.png');
        this.load.image('orangebrick','images/brickOrange.png');
        this.load.image('yellowbrick','images/brickYellow.png');
        this.load.image('whitebrick','images/brickWhite.png');
        this.load.image('greybrick','images/brickGrey.png');
        this.load.image('congratulations','images/congratulations.png');

        this.load.audio('platformimpactsample', 'sounds/sounds_platform-impact.ogg');
        this.load.audio('brickimpactsample', 'sounds/sounds_brick-impact.ogg');
        this.load.audio('gameoversample', 'sounds/sounds_gameover.ogg');
        this.load.audio('winsample', 'sounds/sounds_you_win.ogg');
        this.load.audio('startgamesample', 'sounds/sounds_start-game.ogg');
        this.load.audio('livelostsample', 'sounds/sounds_live-lost.ogg');
        this.load.audio('phasechangesample', 'sounds/sounds_phasechange.ogg');
    }

    create(){

        this.platformImpactSample = this.sound.add('platformimpactsample');
        this.brickImpactSample = this.sound.add('brickimpactsample');
        this.gameOverSample = this.sound.add('gameoversample');
        this.winSample = this.sound.add('winsample');
        this.startGameSample = this.sound.add('startgamesample');
        this.liveLostSample = this.sound.add('livelostsample');
        this.phaseChangeSample = this.sound.add('phasechangesample');

        this.physics.world.setBoundsCollision(true, true, true, false);//activamos las "paredes del escenario"

        this.add.image(400, 250, 'background');//creamos un elemento pre cargado y damos las coordenadas
        
        this.liveCounter.create();
        
        this.gameoverImage = this.add.image(400, 300, 'gameover');//creamos un elemento pre cargado y damos las coordenadas
        this.gameoverImage.visible = false;
        
        this.congratulationsImage = this.add.image(400, 200, 'congratulations');//creamos un elemento pre cargado y damos las coordenadas
        this.congratulationsImage.visible = false;


        this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();//esto se cae porque forma parte del sistema de fisicas | setInmovable() es para que el objeto no se mueva con el contacto con otros objetos del juego
        this.platform.body.allowGravity = false;//modificamos si la gravedad lo afectará
        this.platform.setCollideWorldBounds(true);

        this.scoreboard.create();//crea el scoreboard

        this.invictusmesagge.create();

        this.pelota = this.physics.add.image(385, 400, 'pelota');
        this.pelota.setData('glue', true);

        this.pelota.setCollideWorldBounds(true);//hacemos que la pelota pueda chocar con las paredes del ecenario

        //this.physics.add.collider(this.pelota, this.platform);//para manejar una colision entre dos objetos

        /*
        let velocity = 100 * Phaser.Math.Between(1.3, 2);//la velocidad que tendra la pelota con un numero aleatorio
        if(Phaser.Math.Between(0, 10) > 5){//tenemos el 50% de probabilidad que vaya a la derecha y 50% a la izquierda (para que varie el movimiento)
            velocity = 0 - velocity; 
        }*/

        //this.pelota.setVelocity(velocity, 10);//le asignamos la velocidad aleatoria en X y un poco en Y
        this.phaseContructor.create();

        this.physics.add.collider(this.pelota, this.platform, this.platformImpact, null, this);//ejecutamos un metodo cuando exista una colision entre estos dos objetos
        
        this.pelota.setBounce(1);//decimos la magnitud del rebote que tendra el objeto
        //manejar con las teclas 
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //this.platform.setVelocity(100, 10);
    }

    brickImpact(ball, brick){//reisivimos solo el ladrilo que impacto no todo el grupo
        this.brickImpactSample.play();
        brick.disableBody(true,true);//para que deje de existir en el grupo y del juego [disableGameObjetc, hideGameObject], amabas las ponemos en true
        this.scoreboard.incrementPoints(10);//le damos un premio de 10 puntos al jugador
        
        if(this.phaseContructor.isPhaseFinished()){
            this.phaseChangeSample.play();
            this.phaseContructor.nextLevel();
            this.setInitialPlataformState();
            //this.endGame(true);//pasamos true para que la variable completed no entre al primer if
            //this.winSample.play();
            //this.congratuationsImage.visible = true;
            //this.scene.pause();
        }
    }
    
    platformImpact(pelota, platform){
        this.platformImpactSample.play();
        this.scoreboard.incrementPoints(1);//incrementamos un punto en cada colision con la plataforma
        
        let relativeImpact = pelota.x - platform.x;

        if(relativeImpact < 0.1 && relativeImpact > -0.1){//si golpea muy cerca al centro de la plataforma
            pelota.setVelocityX(Phaser.Math.Between)
        } else {
        pelota.setVelocityX(10 * relativeImpact);//hacemos que la pelota se vaya mas para un lado u otro segun donde pegue
        }
    }

    update(){
        if(this.cursors.left.isDown){
            this.platform.setVelocityX(-500);//modificamos solo la velocidad en X
            if(this.pelota.getData('glue')){
            this.pelota.setVelocityX(-500);//modificamos solo la velocidad en X
            }
        }
        else if(this.cursors.right.isDown){
            this.platform.setVelocityX(500);//modificamos solo la velocidad en X
            if(this.pelota.getData('glue')){
                this.pelota.setVelocityX(500);//modificamos solo la velocidad en X
            }    
        }
        else{
            this.platform.setVelocityX(0);//modificamos solo la velocidad en X
            if(this.pelota.getData('glue')){
                this.pelota.setVelocityX(0);//modificamos solo la velocidad en X
            }
        }

        if(this.pelota.y > 500){
            let gameNotFinished = this.liveCounter.liveLost();//el contador de vidas nos devuelve false si el juego termino y true si aun quedan vidas
            
            if(!gameNotFinished){
                this.setInitialPlataformState();
            } else if(gameNotFinished){
                this.endGame();
                this.gameOverSample.play();
            }
            //this.gameoverImage.visible = true; //hacemos visible la imagen de gameover
            //this.bricks.setVisible(false); //quitamos los ladrillos de la pantalla
            //this.scene.pause();
        }

        if(this.pelota.getData('glue')){
            if(this.cursors.up.isDown){
                this.startGameSample.play();
                this.pelota.setVelocity(-75, -300);
                this.pelota.setData('glue', false);
            }
        }
    }

    setInitialPlataformState(){
        this.liveLostSample.play();
        this.platform.x = 400;
        this.platform.y = 460;

        this.pelota.setVelocity(0,0);//para que se quede quieta

        this.pelota.x = 385;
        this.pelota.y = 430;
        this.pelota.setData('glue', true);
    }

    endGame(completed = false){
        if(!completed){
            this.gameOverSample.play();
            this.scene.start('gameover');
        } else{
            this.winSample.play();
            this.scene.start('congatrulations');
            if(this.liveCounter.liveImages.countActive() === 2){
                this.invictusmesagge.set();
            }
        }
    }
}