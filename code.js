var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["81a4f500-ad11-4009-8f0e-175b165af74b","11d5d9f0-6932-45de-ba25-6f4ac37fe9a9","7d58941f-a7d8-42da-85c6-3efa6131461a","42b7aa29-c5f8-44fe-9d49-8540deca9c13","e92d7a76-cb9d-426f-90f2-1f5356f539aa"],"propsByKey":{"81a4f500-ad11-4009-8f0e-175b165af74b":{"name":"ball","sourceUrl":null,"frameSize":{"x":20,"y":20},"frameCount":1,"looping":true,"frameDelay":12,"version":"eM7B95Yrh1P4M7UdW9X9V_C4bg0LqPvo","loadedFromSource":true,"saved":true,"sourceSize":{"x":20,"y":20},"rootRelativePath":"assets/81a4f500-ad11-4009-8f0e-175b165af74b.png"},"11d5d9f0-6932-45de-ba25-6f4ac37fe9a9":{"name":"robot","sourceUrl":"assets/v3/animations/-avJdgAUNRjyTsnOFCs8c0UqlTsKHiEVHv4fvZZZiKA/11d5d9f0-6932-45de-ba25-6f4ac37fe9a9.png","frameSize":{"x":77,"y":69},"frameCount":1,"looping":true,"frameDelay":4,"version":"RngtvTZfziMMBHu6g3BPWzVCaartAHz4","loadedFromSource":true,"saved":true,"sourceSize":{"x":77,"y":69},"rootRelativePath":"assets/v3/animations/-avJdgAUNRjyTsnOFCs8c0UqlTsKHiEVHv4fvZZZiKA/11d5d9f0-6932-45de-ba25-6f4ac37fe9a9.png"},"7d58941f-a7d8-42da-85c6-3efa6131461a":{"name":"player","sourceUrl":"assets/v3/animations/-avJdgAUNRjyTsnOFCs8c0UqlTsKHiEVHv4fvZZZiKA/7d58941f-a7d8-42da-85c6-3efa6131461a.png","frameSize":{"x":60,"y":91},"frameCount":1,"looping":true,"frameDelay":4,"version":"U3dCk7oa82eC4olbii4I5ja08IRVw4j9","loadedFromSource":true,"saved":true,"sourceSize":{"x":60,"y":91},"rootRelativePath":"assets/v3/animations/-avJdgAUNRjyTsnOFCs8c0UqlTsKHiEVHv4fvZZZiKA/7d58941f-a7d8-42da-85c6-3efa6131461a.png"},"42b7aa29-c5f8-44fe-9d49-8540deca9c13":{"name":"player_kick","sourceUrl":"assets/v3/animations/-avJdgAUNRjyTsnOFCs8c0UqlTsKHiEVHv4fvZZZiKA/42b7aa29-c5f8-44fe-9d49-8540deca9c13.png","frameSize":{"x":77,"y":77},"frameCount":1,"looping":true,"frameDelay":4,"version":"QWaRwSzJZQHvYc7NSsPx8WoyKKesHjAC","loadedFromSource":true,"saved":true,"sourceSize":{"x":77,"y":77},"rootRelativePath":"assets/v3/animations/-avJdgAUNRjyTsnOFCs8c0UqlTsKHiEVHv4fvZZZiKA/42b7aa29-c5f8-44fe-9d49-8540deca9c13.png"},"e92d7a76-cb9d-426f-90f2-1f5356f539aa":{"name":"player_fall","sourceUrl":"assets/v3/animations/-avJdgAUNRjyTsnOFCs8c0UqlTsKHiEVHv4fvZZZiKA/e92d7a76-cb9d-426f-90f2-1f5356f539aa.png","frameSize":{"x":92,"y":51},"frameCount":1,"looping":true,"frameDelay":4,"version":"Zx9R5m4XhaRiOUvKUE505XM8tHWLJBw8","loadedFromSource":true,"saved":true,"sourceSize":{"x":92,"y":51},"rootRelativePath":"assets/v3/animations/-avJdgAUNRjyTsnOFCs8c0UqlTsKHiEVHv4fvZZZiKA/e92d7a76-cb9d-426f-90f2-1f5356f539aa.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//crie a bola, raqueteJogador e raqueteComputador como objetos de sprite
var bola = createSprite(200,200,10,10);
bola.setAnimation("ball");

var raqueteJogador = createSprite(375,200,10,70);
raqueteJogador.setAnimation( "player");
var raqueteComputador = createSprite(35,200,10,70);
raqueteComputador.setAnimation( "robot");

//variável para armazenar diferentes estados de jogo
var estadoJogo = "sacar";

//variáveis para manter a pontuação
var placarComp = 0;
var placarJogador = 0;


function draw() {
  //limpa a tela
  background("white");
  
  if(bola.isTouching(raqueteJogador) || bola.isTouching(raqueteComputador)){
    playSound("assets/hit.mp3");
  }
 
 if (keyWentDown("K")) {
    raqueteJogador.setAnimation( "player_kick")
  
   }
  
  if (keyWentUp("k")) {
    raqueteJogador.setAnimation( "player")
  }
  
   
  
  //coloque texto de informação no centro
  if (estadoJogo === "sacar") {
    text("Aperte espaço para sacar",150,180);
  }
      
  //exibe o placar
  text(placarComp, 170,20);
  text(placarJogador, 230,20);
  
  //faça com que a raquete do jogador se mova com a posição y do mouse
  raqueteJogador.y = World.mouseY;
  
  //IA para a raquete do computador
  //faça-o se mover com a posição y da bola
  raqueteComputador.y = bola.y;
  
  //desenhar linha no centro
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }
  
  
 
  
  //criar limites
  //faça a bola quicar com as bordas superior e inferior
  createEdgeSprites();
   if(bola.isTouching(topEdge)||bola.isTouching(bottomEdge)){
    playSound( "assets/wall_hit.mp3");
  }
 
  bola.bounceOff(topEdge);
  bola.bounceOff(bottomEdge);
  bola.bounceOff(raqueteJogador);
  bola.bounceOff(raqueteComputador);
 
  
  //sacar a bola quando o espaço é pressionado
  if (keyDown("space") &&  estadoJogo === "sacar") {
    sacar();
    estadoJogo = "jogar";
  }
  
 
  //redefina a bola para o centro se ela cruzar a tela
  if(bola.x > 400 || bola.x <0) {
   playSound( "assets/score.mp3"); 
    if(bola.x > 400) {
      placarComp = placarComp + 1;
    }
    
    if(bola.x < 0) {
      placarJogador = placarJogador + 1;
    }
    
    redefinir();
    estadoJogo = "sacar";
  }
  
  if (placarJogador === 5 || placarComp === 5){
    estadoJogo = "fim";
    text("Game Over!",170,160);
    text("Aperte R para recomeçar",150,180);
  }
  
 
  
  
  if (keyDown("r") && estadoJogo === "fim") {
    estadoJogo = "sacar";
    placarComp = 0;
    placarJogador = 0;
  }
  

  
  drawSprites();
}

function sacar() {
  bola.velocityX = 3;
  bola.velocityY = 4;
}

function redefinir() {
  bola.x = 200;
  bola.y = 200;
  bola.velocityX = 0;
  bola.velocityY = 0;
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
