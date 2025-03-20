# Fulll

Fulll technical tests.

## Installation

```bash
docker compose down -v
docker compose up -d --build 
```

## Part 1: FizzBuzz

I have created the classic version as stated in
the [Instructions](https://github.com/fulll/hiring/blob/master/Algo/fizzbuzz.md)

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

I have created the Fleet manager, following
the [Instructions](https://github.com/fulll/hiring/blob/master/Backend/ddd-and-cqrs-intermediare-senior.md)

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

**Step 3**

Quality tools may include: Linting, formatting, testing, static analysis, security checks and CI/CD.

| Category            | Tool                         | Purpose                                        |
|---------------------|------------------------------|------------------------------------------------|
| **Linting**         | ESLint                       | Code consistency                               |
| **Formatting**      | Prettier                     | Auto-formatting                                |
| **Testing**         | Jest, Cucumber               | Unit & BDD tests                               |
| **Static Analysis** | SonarQube, SonarCloud        | Code smells, complexity, coverage, security... |
| **Security**        | Snyk, ESLint Security Plugin | Vulnerability detection                        |
| **CI/CD**           | GitHub Actions, Docker       | Automate tests & deployments                   |

- We can work to standardize the tools and configurations across the team. We can use .editorconfig files and other tools to enforce the standards.
- Whenever we develop new features that involve new external APIs, libraries or new data sources we should consult security experts to make sure we are not introducing vulnerabilities.
- Once we have integrated the tools, we can create a CI/CD pipeline that runs the tests and checks the quality of the code before merging it to the main branch.
- CI pipeline is great to catch bugs early and to make sure the code is always in a deployable state.
- CD pipeline is great to automate the deployment process and minimize human errors.
