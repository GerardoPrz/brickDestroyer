import { Game } from "./scenes/game.js";
import { Congatrulations } from "./scenes/congatrulations.js";
import { Gameover } from "./scenes/gameover.js";
const config = {
    type: Phaser.AUTO,//para decirle al navegador que use la tecnologia que tenga disponible
    width: 800,
    height: 500,
    scene: [Game, Gameover, Congatrulations],//la primera escena donde se coloca el array es donde inicia el juego 
    physics:{//declaramos un objeto pata decir que tipo de fisica vamos a usar en phaser
        default: 'arcade', //mas basico de phaser
        arcade:{
            //gravity: {y: 400}, //gravedad que sufriran los objetos
            debug: false
        }
    }
}
var game = new Phaser.Game(config);