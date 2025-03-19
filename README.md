# Fulll

fulll techincal tests.

## Installation

This project runs in [bun](https://bun.sh). Please install it first:

```bash
curl -fsSL https://bun.sh/install | bash
```

To install project dependencies:

```bash
bun install
```

## FizzBuzz

I have created the classic version as stated in your [Instructions](https://github.com/fulll/hiring/blob/master/Algo/fizzbuzz.md)

Run tests:

```bash
bun test
```

I have considered another versions more compact. I think guard clauses, expressive names and early returns works just fine in this particular case.

### Complexity

- Time Complexity: O(1) (constant time)
- Space Complexity: O(1) (constant space)

## Backend

[Instructions](https://github.com/fulll/hiring/blob/master/Backend/ddd-and-cqrs-intermediare-senior.md)

Run bdd tests:

```bash
bun run test:bdd
```

Run the cli:

```bash
chmod +x ./fleet.ts
bun fleet.ts
bun fleet.ts create b6e2a1d4-8f3e-42d6-b9d3-5f8a3c7e4b12
bun fleet.ts register-vehicle <fleet-id> 34-MDC-56
bun fleet.ts localize-vehicle <fleet-id> 34-MDC-56 37.7749 -122.4194 15.7
```
