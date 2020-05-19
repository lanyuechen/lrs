import Game from "./game.ts";

const steps = [
  (ga: Game) => {
    ga.kill()
  },
  (ga: Game) => {
    ga.player.lastWord()
  }
]

export default class Step {
  game: Game;
  idx: number = 0;

  constructor(game: Game) {
    this.game = game;
  }

  next() {
    const fn = steps[this.idx];
    fn(this.game);
    this.idx += 1;
  }
}