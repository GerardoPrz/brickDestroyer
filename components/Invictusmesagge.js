export class InvictusMesagge{
    constructor(scene){
        this.relatedScene = scene;
    }

    create(){
        this.InvictusmesaggeText = this.relatedScene.add.text(90,100, '',{
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
    }

    set(){
        this.InvictusmesaggeText.setText( this.InvictusmesaggeText);
    }
}