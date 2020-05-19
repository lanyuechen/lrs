import Player from './player.ts';
import { Role } from './data.d.ts';
import Step from './step.ts';

const day = [
  'night',
  'day'
]

const state = [
  'start',
  'finish',
]

export default class Game {
  players: Player[] = [];
  step: Step; 
  state: any = 'start';
  dying?: Player;

  constructor(roles: Role[]) {
    this.step = new Step(this);
    this.initPlayers(roles);
  }

  initPlayers(roles: Role[]) {
    this.players = roles.map((role: Role) => new Player(role));
  }

  next() {
    this.hostSpeak();
    // 执行
    this.loop();

    // 检查是否执行完毕
    this.checkFinish();
  }

  hostSpeak() {}

  async loop() {
    const wolves = this.players.filter((d: Player) => d.role === 'wolf' && d.alive);
    const civilians = this.players.filter((d: Player) => d.role === 'civilian' && d.alive);
    const guard = this.players.find((d: Player) => d.role === 'guard' && d.alive);
    const prophet = this.players.find((d: Player) => d.role === 'prophet' && d.alive);
    const witch = this.players.find((d: Player) => d.role === 'witch' && d.alive);
    const hunter = this.players.find((d: Player) => d.role === 'hunter' && d.alive);

    if (wolves.length) {
      const player = this.chooseOne([ ...civilians, guard, prophet, witch, hunter ]);
      this.dying = player;
    }

    if (guard) {
      // protect
      const player = this.chooseOne([ ...wolves, ...civilians, prophet, witch, hunter ]);
      guard.protect(player);
    }

    if (prophet) {
      // check one
      const player = this.chooseOne([ ...wolves, ...civilians, guard, witch, hunter ]);
      prophet.check(player);
    }

    if (witch) {
      // kill or save
      const player = this.chooseOne([ ...wolves, ...civilians, guard, prophet, hunter ]);
      witch.poison(player);
      // witch.save(player);
    }

    // day light
    // 竞选

    // 公布
    if (this.dying) {
      if ((guard && guard.protected === this.dying) === (witch && witch.saved === this.dying)) { // 同守同救死
        this.dying.die();
        if (this.dying.role === 'hunter') {
          // 带走一个
        }
      }
    }
    if (witch && witch.poisoned) {
      witch.poisoned.die();
      witch.poison();
    }


    // 投票

    // kill

    // 遗言
  }

  chooseOne(players: Player[]) {
    return players[Math.floor(Math.random() * players.length)];
  }

  checkFinish() {}
}