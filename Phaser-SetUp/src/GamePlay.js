GamePlayManager = {
  init: function () {
    //redimensiona la imagen al cambiar el tamaño de la pantalla
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //alinear la imagen horizonal y verticalmente
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //que el caballo no se mueva hasta hacer click en pantalla
    this.flagFirstMouseDown = false;
  },
  preload: function () {
    game.load.image("background", "assets/images/background.png");
    /*la imagen del caballo contiene dos imagenes diferentes, para poder alternar 
    entre una y otra, después de la ruta se pone el ancho y el alto de la imagen 
    y el 2 sería el nº de imagenes que contiene la imagen */
    this.horse = game.load.spritesheet(
      "horse",
      "assets/images/horse.png",
      84,
      156,
      2
    );
  },
  create: function () {
    //añadimos las imagenes
    game.add.sprite(0, 0, "background");
    this.horse = game.add.sprite(0, 0, "horse");
    /*al ponerle el frame en 1 añade la parte de la imagen secundaria
     si se le añade el 0 muestra la parte de la primera imagen */
    this.horse.frame = 0;
    //para modificar la posición de la imagen
    this.horse.x = game.width / 2;
    this.horse.y = game.height / 2;
    /* para que el caballo esté justo en el centro, ya que el sprite
    lo coloca en su centro, pero no de la propia imagen, al cambiar el 
    anchor se cambia al centro de la propia imagen del caballo */
    this.horse.anchor.setTo(0.5);
    //modificamos el ángulo de la imagen
    //this.horse.angle = 0
    //modificamos el tamaño del caballo
    //this.horse.scale.setTo( 2 )
    //modifica la visibilidad de la imagen, 0 es invisible y 1 visible
    //this.horse.alpha = 0
  //para capturar un click en pantalla
    game.input.onDown.add(this.onTap, this);
  },
  //que al hacer click en pantalla el caballo se mueva
  onTap: function () {
    this.flagFirstMouseDown = true;
  },

  update: function () {
    if (this.flagFirstMouseDown === true) {
      //para que siga las coordenadas del mouse
      var pointerX = game.input.x;
      var pointerY = game.input.y;
      //calcular la distancia entre nuestro mouse y el caballo
      var distX = pointerX - this.horse.x;
      var distY = pointerY - this.horse.y;
      /*saber si el caballo está a la derecha del ratón o a la izqda
     para que el caballo mire hacia la drcha o la izqda */
      if (distX > 0) {
        this.horse.scale.setTo(1, 1);
      } else {
        this.horse.scale.setTo(-1, 1);
      }
      /*para que el caballo se mueva a nuestra posición de mouse
    el numero del final será la distancia con que se mueve  */
      this.horse.x += distX * 0.02;
      this.horse.y += distY * 0.02;
    }
  },
};

var game = new Phaser.Game(1136, 640, Phaser.AUTO);

game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");
