import { Phase } from './phase.js';

export class Phase1 extends Phase{

    create(){
        this.bricks = this.relatedScene.physics.add.staticGroup({
            key: ['bluebrick', 'orangebrick', 'greenbrick', 'blackbrick', 'yellowbrick', 'blackbrick', 'yellowbrick', 'bluebrick', 'orangebrick', 'greenbrick'],
            frameQuantity: 1,
            gridAlign: {
                width: 5,
                height: 4,
                cellWidth: 150,
                cellHeight: 100,
                x: 135,
                y: 100

            }
        });
        
        //ahora crearemos unos bloques indestructubles para adornar el nivel
        this.fixedBricks = this.relatedScene.physics.add.staticGroup();
        this.fixedBricks.create(316, 165, 'greybrick');
        this.fixedBricks.create(466, 165, 'greybrick');

        this.configureColisions();//esta implementado en la clase de la que extendie 'PHASE'
        this.configureColisionsFixed();//esta implementado en la clase de la que extendie 'PHASE'
        
    }
}