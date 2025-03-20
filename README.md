# Fulll

Fulll technical tests.

## Installation

```bash
docker compose down -v
docker compose up -d --build 
```

## Part 1: FizzBuzz

I have created the classic version as stated in the [Instructions](https://github.com/fulll/hiring/blob/master/Algo/fizzbuzz.md)

The code is in [src/Fizzbuzz](src/Fizzbuzz)
The unit tests are in [tests/Fizzbuzz](tests/Fizzbuzz) 

Run tests:

```bash
docker compose run app bun run test
```

I have considered another versions more compact.  
I think guard clauses, expressive names and early returns works just fine in this particular case.

### Complexity

- Time Complexity: O(1) (constant time)
- Space Complexity: O(1) (constant space)

## Backend

I have created the Fleet manager, following the [Instructions](https://github.com/fulll/hiring/blob/master/Backend/ddd-and-cqrs-intermediare-senior.md)

**Run bdd tests**

```bash
docker compose run app run test:bdd
```

**Connect to the database and check the data if you like**

```
user: user
password: password
database: fleet

jdbc:postgresql://localhost:5432/fleet
```

**Run the cli**

```bash
docker compose run app bun fleet.ts
docker compose run app bun fleet.ts create b6e2a1d4-8f3e-42d6-b9d3-5f8a3c7e4b12
docker compose run app bun fleet.ts register-vehicle <fleet-id> 34-MDC-56
docker compose run app bun fleet.ts localize-vehicle <fleet-id> 34-MDC-56 37.7749 -122.4194 15.7
```
