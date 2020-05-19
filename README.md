1. 

## role
```ts
type Role = 'wolf';
```

## player

```ts
interface Player {
  role: string;
}
```

## game

```ts
interface Game {
  (...roles: Role[]): void
  roles: Role[];
}

```

```ts
const game = new Game('wolf', 'wolf');
game.next();

```