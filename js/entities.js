(function(){
  Game.entityDefinitions = {
    'wormhole': {
      width: 280,
      height: 280,
      hitBox: [60, 60],
      classes: ['Wormhole'],
      spriteLayout: {
        definition: 'wormhole'
      }
    },
    'spaceBuoy': {
      width: 84,
      height: 84,
      hitBox: [60, 60],
      classes: ['spaceBuoy'],
      spriteLayout: {
        definition: 'spaceBuoy'
      }
    },
    'powerup': {
      width: 1080/12,
      height: 84,
      hitBox: [60, 60],
      classes: ['Powerup'],
      spriteLayout: {
        definition: 'powerup'
      }
    },
    'spaceBuoyEnergy': {
      width: 720/12,
      height: 230,
      hitBox: [60, 60],
      classes: ['spaceBuoyEnergy'],
      spriteLayout: {
        definition: 'spaceBuoyEnergy'
      }
    },
    'laserHit': {
      classes: ['LaserHit'],
      spriteLayout: {
        definition: 'laserHit'
      },
      width: 22,
      height: 27,
      ttl: 500,
      update: function(dt) {
        this.ttl = Math.max(0, this.ttl - dt);
        if(!this.ttl) {
          document.kill(this);
          return;
        }
      }
    },
    'missileHit': {
      classes: ['MissileHit'],
      spriteLayout: {
        definition: 'missileHit'
      },
      width: 304/8,
      height: 44,
      ttl: 1000,
      update: function(dt) {
        this.ttl = Math.max(0, this.ttl - dt);
        if(!this.ttl) {
          document.kill(this);
          return;
        }
      }
    },
    'explosion': {
      classes: ['Explosion'],
      spriteLayout: {
        definition: 'explosion'
      },
      width: 128,
      height: 128,
      ttl: 500,
      update: function(dt) {
        this.ttl = Math.max(0, this.ttl - dt);
        if(!this.ttl) {
          document.kill(this);
          return;
        }
      }
    },
    'player': {
      classes: ['Player'],
      width: 70,
      height: 60,
      hitBox: [50, 50],
      update: Game.logic.player,
      spriteLayout: {
        definition: 'ship',
        children: {
          rocket1: {
            definition: 'fireBigBlue',
            position: [0, 50]
          },
          rocket2: {
            definition: 'fireBigBlue',
            position: [30, 50]
          }
        }
      }
    }
  };
}());
