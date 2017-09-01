function Game() {
  this.rolls = [];
  this.currentRoll = 0;
}

Game.prototype = (function(){

    /*
     * Adding a private function onto the prototype. The downside is that this means nothing unless the context is passed
     * An other option would be to add to the instance.
     */
  function isSpare(frameIndex){
    return this.rolls[frameIndex] + this.rolls[frameIndex + 1] === 10;
  }
  function isStrike(frameIndex){
     return this.rolls[frameIndex] === 10
  }

  function spareBonus(frameIndex){
    return this.rolls[frameIndex + 2];
  }

  function strikeBonus(frameIndex){
    return this.rolls[frameIndex +1] + this.rolls[frameIndex +2];
  }

  function sumOfBallsInFrame(frameIndex){
    return this.rolls[frameIndex] + this.rolls[frameIndex + 1];
  }

  return {
      roll : function(pins) {
          this.rolls[this.currentRoll++] = pins;
      },
      score: function() {
          var score =0;
          var frameIndex=0;
          for (var frame=0; frame < 10; frame++){
              // need to add the context for this to work
              if (isStrike.call(this, frameIndex)) {
                  score += 10 + strikeBonus.call(this, frameIndex);
                  frameIndex++;
              } else {
                  if (isSpare.call(this, frameIndex)) {
                      score +=  10 + spareBonus.call(this, frameIndex);
                  } else {
                      score += sumOfBallsInFrame.call(this, frameIndex);
                  }
                  frameIndex += 2;
              }
          }
          return score;
      }
  }
})();
