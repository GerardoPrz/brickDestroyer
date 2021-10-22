export class LiveCounter{
    constructor(scene, initialLives){
        this.relatedScene = scene;
        this.initialLives = initialLives;
    }

    // preload(){
    //     this.relatedScene.load.image('platform','images/platform.png');
    // }
    create(){
        let displacement = 60; //cantidad de pixeles que ay entre cada imagen de la vida
        let firtsPosition = 800 - ((this.initialLives - 1) * displacement);//caluclamos la posicion donde poner la primer imagen
        this.liveImages = this.relatedScene.physics.add.staticGroup({
            setScale: {x: 0.5, y: 0.5},//para que las imagenes se muestren con la mitad de su tamaño normal
            key: 'platform',
            frameQuantity: this.initialLives - 1,
            gridAlign: {
                width: this.initialLives - 1,
                height: 1,
                cellWidth: displacement,
                cellHeight: 30,
                x: firtsPosition,
                y: 30
            }
        });
    }

    liveLost(){
        if(this.liveImages.countActive() === 0){//contamos cuantas vidas nos quedan
            this.relatedScene.endGame();
            return true;
        }
        let currentLiveLost = this.liveImages.getFirstAlive();//si aun quedan vidas, tomamos a la primera disponible
        currentLiveLost.disableBody(true, true);//la eliminamos del juego y del grupo
        return false;//deuelve true si el juego aun sigue sino retorna false
    }
}