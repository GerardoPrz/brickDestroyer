export class Scoreboard{
    constructor(scene){
        this.relatedScene = scene;
        this.score = 0;
    }

    create(){
        this.scoreText = this.relatedScene.add.text(16, 16, 'puntos: 0',{ //ponemos un objeto de texto en la pantalla y asignamos sus caracteristicas
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
    }

    incrementPoints(points){
        this.score += points;
        this.scoreText.setText('puntos: ' + this.score);
    }
}