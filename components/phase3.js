import {Phase} from './phase.js';

export class Phase3 extends Phase{

    create(){
        this.bricks = this.relatedScene.physics.add.staticGroup({
            key: ['bluebrick', 'orangebrick', 'greenbrick', 'blackbrick', 'yellowbrick'],
            frameQuantity: 10,
            gridAlign: {
                width: 10,
                height: 5,
                cellWidth: 67,
                cellHeight: 34,
                x: 100,
                y: 100

            }
        });
        
        this.configureColisions();
    }
}