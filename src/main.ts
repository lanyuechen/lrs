import Game from './game.ts';

const game = new Game([
  'wolf', 'wolf', 'wolf', 'wolf', 
  'civilian', 'civilian', 'civilian', 'civilian',
  'prophet', 'witch', 'hunter', 'guard',
]);

game.next();