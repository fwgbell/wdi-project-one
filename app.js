//Functions
function startGame(){
  $('.start-menu').css('display', 'none');
  $('.build-screen').css('opacity', '1');
  $('.build-screen').css('visibility', 'visible');
  $sound.get(0).play();
  $music.get(0).play();
}

function coOpGame(){
  $('.start-menu').css('display', 'none');
  $('.game-screen').css('opacity', '1');
  $('.game-screen').css('visibility', 'visible');
  $('.map-box').css('background-image', 'url(images/waterfall-map.png)');
  $('.placement1-screen').css('display', 'none');
  $('h2').html('THIS ISN\'T FINISHED - COMING SOON!!!');
  for (let i = 0; i < addedCharacters.length; i++){
    const addingCharacter = addedCharacters[i];
    livingCharacters.push(addingCharacter);
    const $addingSlot = $('#slot-' + addingCharacter.player + '-' + addingCharacter.characterSlot);
    const $addingHealth = $addingSlot.children('p');
    $addingHealth.html(addingCharacter.currentHealth + '/' + addingCharacter.maxHealth);
    $addingSlot.children('.health-bar').css('background-color', 'red');
    $addingSlot.find('.health-green').css('width', '100%');
    $addingSlot.children('.icon').addClass('player' + addingCharacter.player + '-type' + addingCharacter.troopType + '-soldier');
  }
}

function addSoldier(){
  numberBought = numberBought + 1;
  totalBought = totalBought + 1;
  const thisCharacter = addedCharacters[totalBought];
  const type = $(this).attr('id');
  if (type === 'type1'){
    $('#chosen-' + numberBought).addClass('player' + currentPlayer + '-type1-soldier');
    thisCharacter.moveSpeed = 3;
    thisCharacter.maxHealth = 15;
    thisCharacter.currentHealth = 15;
    thisCharacter.attack = 6;
    thisCharacter.player = currentPlayer;
    thisCharacter.slot = numberBought;
    thisCharacter.troopType = 1;
    $sound.attr('src', 'sounds/axe.mp3');
    $sound.get(0).play();
  } else if (type === 'type2'){
    $('#chosen-' + numberBought).addClass('player' + currentPlayer + '-type2-soldier');
    thisCharacter.moveSpeed = 4;
    thisCharacter.maxHealth = 10;
    thisCharacter.currentHealth = 10;
    thisCharacter.attack = 5;
    thisCharacter.player = currentPlayer;
    thisCharacter.slot = numberBought;
    thisCharacter.troopType = 2;
    $sound.attr('src', 'sounds/aragorn.mp3');
    $sound.get(0).play();
  } else if (type === 'type3'){
    $('#chosen-' + numberBought).addClass('player' + currentPlayer + '-type3-soldier');
    thisCharacter.moveSpeed = 3;
    thisCharacter.maxHealth = 6;
    thisCharacter.currentHealth = 6;
    thisCharacter.attack = 3;
    thisCharacter.player = currentPlayer;
    thisCharacter.slot = numberBought;
    thisCharacter.troopType = 3;
    $sound.attr('src', 'sounds/legolas.mp3');
    $sound.get(0).play();
  } else {
    $('#chosen-' + numberBought).addClass('player' + currentPlayer + '-type4-soldier');
    thisCharacter.moveSpeed = 3;
    thisCharacter.maxHealth = 8;
    thisCharacter.currentHealth = 8;
    thisCharacter.attack = 1;
    thisCharacter.player = currentPlayer;
    thisCharacter.slot = numberBought;
    thisCharacter.troopType = 4;
    $sound.attr('src', 'sounds/snape.mp3');
    $sound.get(0).play();
  }
  if (totalBought === 3){
    currentPlayer = 2;
    $('.transition-screen').css('display', 'flex');
    setTimeout(function(){
      $('.transition-screen').css('display', 'none');
      $('.chosen-display').children('.image').removeClass().addClass('image');
      $('.build-screen').children('h2').html('Player Two choose four troops');
      $('.character-option').children('.player1-type1-soldier').removeClass('player1-type1-soldier').addClass('player2-type1-soldier');
      $('.character-option').children('.player1-type2-soldier').removeClass('player1-type2-soldier').addClass('player2-type2-soldier');
      $('.character-option').children('.player1-type3-soldier').removeClass('player1-type3-soldier').addClass('player2-type3-soldier');
      $('.character-option').children('.player1-type4-soldier').removeClass('player1-type4-soldier').addClass('player2-type4-soldier');
      $sound.attr('src', 'sounds/player2.mp3');
      $sound.get(0).play();
    },3000);
    numberBought = 0;
    $('.image').css('transform', 'rotate(270deg)');
  }
  if (totalBought === 7){
    $visibility.css('display', 'flex');
    $visibility.click(toggleMap1);
    $('.build-screen').css('display', 'none');
    $('.game-screen').css('opacity', '1');
    $('.game-screen').css('visibility', 'visible');
    for (let i = 0; i < addedCharacters.length; i++){
      const addingCharacter = addedCharacters[i];
      livingCharacters.push(addingCharacter);
      const $addingSlot = $('#slot-' + addingCharacter.player + '-' + addingCharacter.characterSlot);
      const $addingHealth = $addingSlot.children('p');
      $addingHealth.html(addingCharacter.currentHealth + '/' + addingCharacter.maxHealth);
      $addingSlot.children('.health-bar').css('background-color', 'red');
      $addingSlot.find('.health-green').css('width', '100%');
      $addingSlot.children('.icon').addClass('player' + addingCharacter.player + '-type' + addingCharacter.troopType + '-soldier');
    }
  }
}

function placeCharacter(){
  let currentArray;
  if (isPlayer1){
    currentArray = player1Characters;
  } else{
    currentArray = player2Characters;
  }
  currentCharacter = currentArray[placedCharacters];
  currentCharacter.currentPosition = parseInt($(this).html());
  occupiedSquares.push(currentCharacter.currentPosition);
  $(this).addClass('player' + currentCharacter.player + '-type' + currentCharacter.troopType + '-soldier');
  placedCharacters = placedCharacters + 1;
  $(this).off();
  if (placedCharacters === currentArray.length){
    $finishedPlacementScreen.css('display', 'flex');
  }
}

function finishPlacement1(){
  isPlayer1 = !isPlayer1;
  placedCharacters = 0;
  $finishedPlacementScreen.css('display', 'none');
  $finishedButton.off();
  $finishedButton.click(finishPlacement2);
  $playerBanner.html('Player Two click the map to place your troops');
  $allSquares.removeClass().addClass('grid-square');
  $('#placement-screen').removeClass();
  $('#placement-screen').addClass('placement2-screen');
}

function finishPlacement2(){
  $music.attr('src', 'sounds/battleMusic.mp3');
  $music.get(0).play();
  $music.on('end',function(){
    $music.get(0).play();
  });
  isPlayer1 = true;
  currentCharacter = character1;
  $allSquares.eq(currentCharacter.currentPosition).addClass('selected');
  $('#slot-' + currentCharacter.player + '-' + currentCharacter.characterSlot).find('.icon').addClass('active');
  $finishedPlacementScreen.css('display', 'none');
  $finishedButton.off();
  $playerBanner.html('Player One\'s turn');
  for (let i = 0; i < player1Characters.length; i++){
    const addingCharacter = player1Characters[i];
    $allSquares.eq(addingCharacter.currentPosition).addClass('player' + addingCharacter.player + '-type' + addingCharacter.troopType + '-soldier');
  }
  $('#placement-controls').css('display', 'none');
  $allSquares.off();
  $('#placement-screen').css('display', 'none');
}

function toggleMap1(){
  $('.map-box').css('background-image', 'none');
  $('.map-box').css('background-color', 'white');
  $visibility.off();
  $visibility.click(toggleMap2);
}

function toggleMap2(){
  $('.map-box').css('background-image', ' url(images/forest-map.png)');
  $('.map-box').css('background-color', 'transparent');
  $visibility.off();
  $visibility.click(toggleMap1);
}

function moveMode(){
  const position = currentCharacter.currentPosition;
  const moveSpeed = currentCharacter.moveSpeed;
  const enterables = [];
  for (let i = 0; i < moveSpeed; i++){
    enterables.push(position - (moveSpeed - i));
    enterables.push(position + (moveSpeed - i));
    enterables.push(position - (moveSpeed - i) * 30);
    enterables.push(position + (moveSpeed - i) * 30);
    enterables.push((position - (moveSpeed - i) * 30) + i);
    enterables.push((position - (moveSpeed - i) * 30) - i);
    enterables.push((position + (moveSpeed - i) * 30) + i);
    enterables.push((position + (moveSpeed - i) * 30) - i);
    enterables.push((position - (moveSpeed - i) * 30) - i * 0.5);
    enterables.push((position - (moveSpeed - i) * 30) + i * 0.5);
    enterables.push((position + (moveSpeed - i) * 30) - i * 0.5);
    enterables.push((position + (moveSpeed - i) * 30) + i * 0.5);
    enterables.push((position - (moveSpeed - i) * 30) - i / 3);
    enterables.push((position - (moveSpeed - i) * 30) + i / 3);
    enterables.push((position + (moveSpeed - i) * 30) - i / 3);
    enterables.push((position + (moveSpeed - i) * 30) + i / 3);
    enterables.push((position - (moveSpeed - i) * 30) - i / 3 * 2);
    enterables.push((position - (moveSpeed - i) * 30) + i / 3 * 2);
    enterables.push((position + (moveSpeed - i) * 30) - i / 3 * 2);
    enterables.push((position + (moveSpeed - i) * 30) + i / 3 * 2);

  }
  for (let i = 0; i < enterables.length; i++){
    const isEnterable = $allSquares.eq(enterables[i]);
    isEnterable.addClass('enterable');
  }
  for (let i = 0; i < enterables.length; i++){
    const isOccupied = $allSquares.eq(occupiedSquares[i]);
    isOccupied.removeClass('enterable');
  }
  $moveButton.off();
  $moveButton.click(cancelMove);
  $moveButton.html('CANCEL');
  $('.enterable').click(handleMove);
  $endTurnButton.off();
  $attackButton.off();
}

function handleMove(){
  $allSquares.eq(currentCharacter.currentPosition).removeClass().addClass('grid-square');
  const index = occupiedSquares.indexOf(currentCharacter.currentPosition);
  if (index > -1){
    occupiedSquares.splice(index, 1);
  }
  currentCharacter.currentPosition = parseInt($(this).html());
  $('.enterable').off();
  $('.enterable').removeClass('enterable');
  const $currentCharacter = $allSquares.eq(currentCharacter.currentPosition);
  $currentCharacter.addClass('player' + currentCharacter.player + '-type' + currentCharacter.troopType+ '-soldier');
  occupiedSquares.push(currentCharacter.currentPosition);
  $moveButton.off();
  $moveButton.css('background', 'radial-gradient(dimgray, black)');
  $moveButton.html('MOVE');
  $endTurnButton.click(endTurn);
  hasMoved = true;
  if (!hasAttacked){
    $attackButton.click(attackMode);
  }
}

function cancelMove(){
  $moveButton.html('MOVE');
  $('.enterable').off();
  $('.enterable').removeClass('enterable');
  hasMoved = false;
  $moveButton.off();
  $moveButton.click(moveMode);
  $endTurnButton.click(endTurn);
  if (!hasAttacked){
    $attackButton.click(attackMode);
  }
}

function attackMode(){
  const position = currentCharacter.currentPosition;
  const attackRange = 1;
  const attackables = [];
  if (currentCharacter.troopType === 3){
    for (let i = 156; i < 444; i++ ){
      attackables.push(i);
      $sound.attr('src', 'sounds/draw.mp3');
      $sound.get(0).play();
    }
  } else {
    for (let i = 0; i < attackRange; i++){
      attackables.push(position - (attackRange - i));
      attackables.push(position + (attackRange - i));
      attackables.push(position - (attackRange - i) * 30);
      attackables.push(position + (attackRange - i) * 30);
      attackables.push(position - (attackRange - i) * 30 + 1);
      attackables.push(position + (attackRange - i) * 30 - 1);
      attackables.push(position - (attackRange - i) * 30 - 1);
      attackables.push(position + (attackRange - i) * 30 + 1);
    }
  }
  for (let i = 0; i < livingCharacters.length; i++){
    if (attackables.includes(occupiedSquares[i])) {
      const attackable = $allSquares.eq(occupiedSquares[i]);
      attackable.addClass('attackable');
    }
  }
  let currentTeam;
  if (currentCharacter.player === 1){
    currentTeam = player1Characters;
  } else{
    currentTeam = player2Characters;
  }
  for ( let i = 0; i < currentTeam.length; i++){
    $allSquares.eq(currentTeam[i].currentPosition).removeClass('attackable');
  }
  if ($('.attackable').length === 0 && currentCharacter.troopType !== 4){
    const $newP = $('<p></p>');
    $newP.html('Nobody in range!');
    $allSquares.eq(currentCharacter.currentPosition).append($newP);
    setTimeout(function(){
      $newP.remove();
    }, 2000);
  }

  $('.attackable').click(handleAttack);
  $attackButton.off();
  $moveButton.off();
  $attackButton.click(cancelAttack);
  $attackButton.html('CANCEL');
  $endTurnButton.off();
  if (currentCharacter.troopType === 4){
    $moveButton.html('INVIGORATE');
    $moveButton.css('background', 'radial-gradient(lime, green)');
    $moveButton.click(healMode);
    $endTurnButton.html('FIRE BALL');
    $endTurnButton.css('background', 'radial-gradient(gold, darkorange)');
    $endTurnButton.click(fireball);
  }
}

function handleAttack(){
  if (currentCharacter.troopType === 4){
    $moveButton.html('MOVE');
    $moveButton.css('background', 'radial-gradient(dimgray, black)');
    $endTurnButton.html('END TURN');
    $endTurnButton.css('background', 'radial-gradient(magenta, indigo)');
    $moveButton.off();
    $endTurnButton.off();
  }
  const attackedCharacterArray = livingCharacters.filter(character => {
    return character.currentPosition === parseInt($(this).html());
  });
  const attackedCharacter = attackedCharacterArray[0];
  const damageDealt = Math.floor(Math.random() * 4) + currentCharacter.attack;
  attackedCharacter.currentHealth = attackedCharacter.currentHealth - damageDealt;
  if (attackedCharacter.currentHealth <= 0) {
    attackedCharacter.currentHealth = 0;
    $deathSound.get(0).play();
    $('.attackable').off();
    $allSquares.eq(attackedCharacter.currentPosition).removeClass().addClass('grid-square').addClass('blood');
    $('#slot-' + attackedCharacter.player + '-' + attackedCharacter.characterSlot).children('.icon').html('X');
    const indexInLiving = livingCharacters.indexOf(attackedCharacter);
    livingCharacters.splice(indexInLiving, 1);
    const indexInOccupied = occupiedSquares.indexOf(attackedCharacter.currentPosition);
    occupiedSquares.splice(indexInOccupied, 1);
    if (attackedCharacter.player === 1){
      const indexInPlayer1 = player1Characters.indexOf(attackedCharacter);
      player1Characters.splice(indexInPlayer1, 1);
      if (player1Characters.length === 0) {
        const $newDiv = $('<div></div>').addClass('victory-screen');
        $newDiv.html('PLAYER TWO WINS!!!!');
        $('body').prepend($newDiv);
        const $newButton = $('<button>RESTART</button>');
        $newButton.click(restart);
        $newDiv.append($newButton);
        $music.attr('src', 'sounds/victory.mp3');
        $music.get(0).play();
      }
    }
    if (attackedCharacter.player === 2){
      const indexInPlayer2 = player2Characters.indexOf(attackedCharacter);
      player2Characters.splice(indexInPlayer2, 1);
      if (player2Characters.length === 0) {
        const $newDiv = $('<div></div>').addClass('victory-screen');
        $newDiv.html('PLAYER ONE WINS!!!!');
        $('body').prepend($newDiv);
        const $newButton = $('<button>RESTART</button>');
        $newButton.click(restart);
        $newDiv.append($newButton);
        $music.attr('src', 'sounds/victory.mp3');
        $music.get(0).play();
      }

    }
  }
  const $newP = $('<p></p>');
  $newP.html(damageDealt);
  $allSquares.eq(attackedCharacter.currentPosition).append($newP);
  setTimeout(function(){
    $newP.remove();
  }, 2000);
  if (currentCharacter.troopType === 3){
    const $newDiv = $('<div></div>');
    if (currentCharacter.player === 2){
      $newDiv.addClass('arrow2');
    } else {
      $newDiv.addClass('arrow');
    }
    $newDiv.css({top: $allSquares.eq(currentCharacter.currentPosition).offset().top + 'px', left: $allSquares.eq(currentCharacter.currentPosition).offset().left + 'px'});
    $('body').append($newDiv);
    $newDiv.css({top: $allSquares.eq(attackedCharacter.currentPosition).offset().top + 'px', left: $allSquares.eq(attackedCharacter.currentPosition).offset().left + 'px'});
    setTimeout(function(){
      $newDiv.remove();
    }, 200);
  }
  const $attackedHealth = $('#slot-' + attackedCharacter.player + '-' + attackedCharacter.characterSlot).children('p');
  $attackedHealth.html(attackedCharacter.currentHealth + '/' + attackedCharacter.maxHealth);
  let healthPercentage = (attackedCharacter.currentHealth / attackedCharacter.maxHealth) * 100;
  const $attackedBar = $('#slot-' + attackedCharacter.player + '-' + attackedCharacter.characterSlot).find('.health-green');
  if (healthPercentage > 100){
    healthPercentage = 100;
  }
  if(healthPercentage < 100){
    $attackedBar.css('background-color', 'lightgreen');
  }
  $attackedBar.css('width', healthPercentage + '%');
  $('.attackable').off();
  $('.attackable').removeClass('attackable');
  hasAttacked = true;
  $attackButton.css('background', 'radial-gradient(dimgray, black)');
  $endTurnButton.click(endTurn);
  $attackButton.html('ATTACK');
  if (!hasMoved){
    $moveButton.click(moveMode);
    $moveButton.css('background', 'radial-gradient(royalblue, navy)');
  }
  if (currentCharacter.troopType === 3){
    $sound.attr('src', 'sounds/arrowImpact.mp3');
    $sound.get(0).play();
  } else {
    $sound.attr('src', 'sounds/sword.mp3');
    $sound.get(0).play();
  }
}

function cancelAttack(){
  if (currentCharacter.troopType === 4){
    $moveButton.html('MOVE');
    $moveButton.css('background', 'radial-gradient(dimgray, black)');
    $endTurnButton.html('END TURN');
    $endTurnButton.css('background', 'radial-gradient(magenta, indigo)');
    $moveButton.off();
    $endTurnButton.off();
    $allSquares.off();
    $allSquares.removeClass('healable');
  }
  $attackButton.html('ATTACK');
  $('.attackable').off();
  $('.attackable').removeClass('attackable');
  hasAttacked = false;
  $attackButton.off();
  $attackButton.click(attackMode);
  $endTurnButton.click(endTurn);
  if (!hasMoved){
    $moveButton.click(moveMode);
    $moveButton.css('background', 'radial-gradient(royalblue, navy)');
  }
}

function fireball(){
  $sound.attr('src', 'sounds/gandalf.mp3');
  $sound.get(0).play();
  $moveButton.off();
  $endTurnButton.off();
  $('.attackable').off();
  $('.attackable').removeClass('attackable');
  $allSquares.mouseover(function(){
    $(this).click(handleFireball);
    const position = parseInt($(this).html());
    const blastzone = [position, position - 1, position + 1, position - 30, position + 30, position - 31, position + 31, position -29, position + 29];
    for ( let i = 0; i < blastzone.length; i++){
      $allSquares.eq(blastzone[i]).addClass('fireball');
    }
  });
  $allSquares.mouseout(function(){
    $allSquares.removeClass('fireball');
    $allSquares.off('click');
  });
}

function handleFireball(){
  $sound.attr('src', 'sounds/boom.mp3');
  $sound.get(0).play();
  const position = parseInt($(this).html());
  const $newDiv = $('<div></div>');
  $newDiv.attr('id', 'explosion');
  $newDiv.css('top', $allSquares.eq(position).offset().top - 80 + 'px');
  $newDiv.css('left', $allSquares.eq(position).offset().left - 80 + 'px');
  $('body').append($newDiv);
  setTimeout(function(){
    $newDiv.remove();
  }, 2000);
  const blastzone = [position, position - 1, position + 1, position - 30, position + 30, position - 31, position + 31, position -29, position + 29];
  for (let i = 0; i < livingCharacters.length; i++){
    const burntCharacter = livingCharacters[i];
    if (blastzone.includes(parseInt(livingCharacters[i].currentPosition))) {
      const damageDealt = (Math.floor(Math.random() * 3) + 3);
      burntCharacter.currentHealth = burntCharacter.currentHealth - damageDealt;
      const $newP = $('<p></p>');
      $newP.html(damageDealt);
      $newP.css('color', 'orange');
      $allSquares.eq(burntCharacter.currentPosition).append($newP);
      setTimeout(function(){
        $newP.remove();
      }, 2000);
      if (burntCharacter.currentHealth <= 0) {
        $deathSound.get(0).play();
        burntCharacter.currentHealth = 0;
        $allSquares.eq(burntCharacter.currentPosition).removeClass().addClass('grid-square').addClass('blood');
        $('#slot-' + burntCharacter.player + '-' + burntCharacter.characterSlot).children('.icon').html('X');
        const indexInLiving = livingCharacters.indexOf(burntCharacter);
        livingCharacters.splice(indexInLiving, 1);
        const indexInOccupied = occupiedSquares.indexOf(burntCharacter.currentPosition);
        occupiedSquares.splice(indexInOccupied, 1);
        if (burntCharacter.player === 1){
          const indexInPlayer1 = player1Characters.indexOf(burntCharacter);
          player1Characters.splice(indexInPlayer1, 1);
          if (player1Characters.length === 0) {
            const $newDiv = $('<div></div>').addClass('victory-screen');
            $newDiv.html('PLAYER TWO WINS!!!!');
            $('body').prepend($newDiv);
            const $newButton = $('<button>RESTART</button>');
            $newButton.click(restart);
            $newDiv.append($newButton);
            $music.attr('src', 'sounds/victory.mp3');
            $music.get(0).play();
          }
        }
        if (burntCharacter.player === 2){
          const indexInPlayer2 = player2Characters.indexOf(burntCharacter);
          player2Characters.splice(indexInPlayer2, 1);
          if (player2Characters.length === 0) {
            const $newDiv = $('<div></div>').addClass('victory-screen');
            $newDiv.html('PLAYER ONE WINS!!!!');
            $('body').prepend($newDiv);
            const $newButton = $('<button>RESTART</button>');
            $newButton.click(restart);
            $newDiv.append($newButton);
            $music.attr('src', 'sounds/victory.mp3');
            $music.get(0).play();
          }
        }
      }
      const $attackedHealth = $('#slot-' + burntCharacter.player + '-' + burntCharacter.characterSlot).children('p');
      $attackedHealth.html(burntCharacter.currentHealth + '/' + burntCharacter.maxHealth);
      let healthPercentage = (burntCharacter.currentHealth / burntCharacter.maxHealth) * 100;

      const $attackedBar = $('#slot-' + burntCharacter.player + '-' + burntCharacter.characterSlot).find('.health-green');
      if (healthPercentage > 100){
        healthPercentage = 100;
      }
      if(healthPercentage < 100){
        $attackedBar.css('background-color', 'lightgreen');
      }
      $attackedBar.css('width', healthPercentage + '%');
    }
  }
  cancelAttack();
  $attackButton.off();
  $attackButton.css('background', 'radial-gradient(dimgray, black)');
  $allSquares.removeClass('fireball');
  $allSquares.off();
  hasAttacked = true;
}

function healMode(){
  $sound.attr('src', 'sounds/leviosa.mp3');
  $sound.get(0).play();
  $moveButton.off();
  $endTurnButton.off();
  $('.attackable').off();
  $('.attackable').removeClass('attackable');
  const healables = [];
  for (let i = 156; i < 444; i++ ){
    healables.push(i);
  }
  for (let i = 0; i < livingCharacters.length; i++){
    if (healables.includes(occupiedSquares[i])) {
      const healable = $allSquares.eq(occupiedSquares[i]);
      healable.addClass('healable');
    }
  }
  $('.healable').click(handleHeal);
}

function handleHeal(){
  $sound.attr('src', 'sounds/heal.mp3');
  $sound.get(0).play();
  const healedCharacterArray = livingCharacters.filter(character => {
    return character.currentPosition === parseInt($(this).html());
  });
  const healedCharacter = healedCharacterArray[0];
  const damageHealed = Math.floor(Math.random() * 4) + 5;
  healedCharacter.currentHealth = healedCharacter.currentHealth + damageHealed;
  const $newP = $('<p></p>');
  $newP.html(damageHealed);
  $newP.css('color', 'lightgreen');
  $allSquares.eq(healedCharacter.currentPosition).append($newP);
  setTimeout(function(){
    $newP.remove();
  }, 2000);
  const $healedHealth = $('#slot-' + healedCharacter.player + '-' + healedCharacter.characterSlot).children('p');
  $healedHealth.html(healedCharacter.currentHealth + '/' + healedCharacter.maxHealth);
  let healthPercentage = (healedCharacter.currentHealth / healedCharacter.maxHealth) * 100;
  const $healedBar = $('#slot-' + healedCharacter.player + '-' + healedCharacter.characterSlot).find('.health-green');
  if (healthPercentage > 100){
    healthPercentage = 100;
    $healedBar.css('background-color', 'fuchsia');
  }
  $healedBar.css('width', healthPercentage + '%');
  $allSquares.off();
  $allSquares.removeClass('healable');
  cancelAttack();
  $attackButton.off();
  $attackButton.css('background', 'radial-gradient(dimgray, black)');
  hasAttacked = true;
}

function endTurn(){
  $('#slot-' + currentCharacter.player + '-' + currentCharacter.characterSlot).find('.icon').removeClass('active');
  $allSquares.eq(currentCharacter.currentPosition).removeClass('selected');
  isPlayer1 = !isPlayer1;
  if (isPlayer1){
    $playerBanner.html('Player One\'s turn');
    if (player1Characters.length -1 < characterIndex1){
      characterIndex1 = 0;
    }
    currentCharacter = player1Characters[characterIndex1];
    characterIndex1++;
  } else{
    $playerBanner.html('Player Two\'s turn');
    if (player2Characters.length - 1 < characterIndex2){
      characterIndex2 = 0;
    }
    currentCharacter = player2Characters[characterIndex2];
    characterIndex2++;
  }
  if (hasMoved){
    $moveButton.click(moveMode);
    hasMoved = false;
    $moveButton.css('background', 'radial-gradient(royalblue, navy)');
  }
  if (hasAttacked){
    $attackButton.click(attackMode);
    hasAttacked = false;
    $attackButton.css('background', 'radial-gradient(red, darkred)');
  }
  $allSquares.eq(currentCharacter.currentPosition).addClass('selected');
  $('#slot-' + currentCharacter.player + '-' + currentCharacter.characterSlot).find('.icon').addClass('active');
}

function restart(){
  document.location.reload();
}

//generates our grid
const $container = $('.container');
for(let i = 1; i < 600 ; i++){
  const $newDiv = $('<div></div>').addClass('not-enterable');
  $container.append($newDiv);
  if (i > 125 && i < 145 || i > 155 && i < 174 || i > 185 && i < 204 || i > 215 && i < 234
    || i > 245 && i < 264 || i > 275 && i < 294 || i > 305 && i < 324 || i > 335 && i < 354
    || i > 365 && i < 384 || i > 395 && i < 414 || i > 425 && i < 444 || i > 455 && i < 474){
    $newDiv.attr('class', 'grid-square');
    $newDiv.html(i);
  }
  if(i < 154 || i > 445){
    $newDiv.attr('class', 'not-enterable');
    $newDiv.html('');
  }
}

//Global variables
let isPlayer1 = true;
let hasMoved = false;
let hasAttacked = false;
let currentCharacter;
let characterIndex1 = 1;
let characterIndex2 = 0;
let placedCharacters = 0;
let numberBought = 0;
let totalBought = -1;
let currentPlayer = 1;

//DOM elements
const $allSquares = $container.children();
const $removeThis = $('.not-enterable');
const $moveButton = $('#move-button');
const $attackButton = $('#attack-button');
const $endTurnButton = $('#end-turn');
const $startButton = $('#start-button');
const $finishedButton = $('#finished-button');
const $playerBanner = $('h2');
const $finishedPlacementScreen = $('#finished-placement-screen');
const $addButton = $('.add-button');
const $sound = $('#sound-effect');
const $deathSound = $('#death-sound');
const $music = $('#music');
const $visibility = $('#visibility');
const $coOpButton = $('#co-op');

//Objects
const character1 = {
  currentPosition: 0,
  moveSpeed: 3,
  maxHealth: 15,
  currentHealth: 15,
  attack: 6,
  player: 1,
  characterSlot: 1,
  troopType: 1
};

const character2 = {
  currentPosition: 0,
  moveSpeed: 3,
  maxHealth: 15,
  currentHealth: 15,
  attack: 6,
  player: 2,
  characterSlot: 1,
  troopType: 1
};

const character3 = {
  currentPosition: 0,
  moveSpeed: 3,
  maxHealth: 6,
  currentHealth: 6,
  attack: 3,
  player: 1,
  characterSlot: 2,
  troopType: 3
};

const character4 = {
  currentPosition: 0,
  moveSpeed: 3,
  maxHealth: 6,
  currentHealth: 6,
  attack: 3,
  player: 2,
  characterSlot: 2,
  troopType: 3
};

const character5 = {
  currentPosition: 0,
  moveSpeed: 3,
  maxHealth: 8,
  currentHealth: 8,
  attack: 1,
  player: 1,
  characterSlot: 3,
  troopType: 4
};

const character6 = {
  currentPosition: 0,
  moveSpeed: 3,
  maxHealth: 8,
  currentHealth: 8,
  attack: 1,
  player: 2,
  characterSlot: 3,
  troopType: 4
};

const character7 = {
  currentPosition: 0,
  moveSpeed: 3,
  maxHealth: 10,
  currentHealth: 10,
  attack: 5,
  player: 1,
  characterSlot: 4,
  troopType: 2
};
const character8 = {
  currentPosition: 0,
  moveSpeed: 3,
  maxHealth: 10,
  currentHealth: 10,
  attack: 5,
  player: 2,
  characterSlot: 4,
  troopType: 2
};

//Arrays
const occupiedSquares = [];
const livingCharacters = [];
const addedCharacters = [character1, character3, character5, character7, character2, character4, character6, character8];
const player1Characters = [character1, character3, character5, character7];
const player2Characters = [character2, character4, character6, character8];

///////////////////////////////////////////////////////////////////////////////////
$removeThis.remove();
$allSquares.click(placeCharacter);
$finishedButton.click(finishPlacement1);
$startButton.click(startGame);
$moveButton.click(moveMode);
$attackButton.click(attackMode);
$endTurnButton.click(endTurn);
$addButton.click(addSoldier);
$coOpButton.click(coOpGame);
