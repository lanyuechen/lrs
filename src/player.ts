import { Role } from './data.d.ts';

export default class Player {
  alive: boolean = true;
  role: Role;
  checked: Player[];
  protected?: Player;
  poisoned?: Player;
  saved?: Player;

  constructor(role: Role) {
    this.role = role;
  }

  die() {
    this.alive = false;
  }

  protect(player: Player) {
    this.protected = player;
  }

  check(player: Player) {
    this.checked.push(player);
  }

  poison(player?: Player) {
    this.poisoned = player;
  }

  save(player?: Player) {
    this.saved = player;
  }
}