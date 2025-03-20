# Fulll

Fulll technical tests.

## Installation

You need to have [Docker](https://www.docker.com/) installed.  
Clone the repository, cd into it and run:

```bash
docker compose down -v
docker compose up -d --build 
```

## Part 1: FizzBuzz

I have created the classic version as stated in
the [Instructions.](https://github.com/fulll/hiring/blob/master/Algo/fizzbuzz.md)

The code is in [src/Fizzbuzz](src/Fizzbuzz)
The unit tests are in [tests/Fizzbuzz](tests/Fizzbuzz)

Run tests:

```bash
docker compose run app bun run test
```

I have considered another versions more compact.  
I think guard clauses, expressive names and early returns works just fine in this particular case.

### Complexity

- Time Complexity: O(1) (constant time).
- Space Complexity: O(1) (constant space).

## Backend

I have created the Fleet manager, following
the [Instructions.](https://github.com/fulll/hiring/blob/master/Backend/ddd-and-cqrs-intermediare-senior.md)

**Run bdd tests**

```bash
docker compose run app bun run test:bdd
```

**Connect to the database and check the data if you like**

```
user: user
password: password
database: fleet

jdbc:postgresql://localhost:5432/fleet
```

**Run the cli application**

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

- We can work to standardize the tools and configurations across the team. 
- We can use _.editorconfig_ files and other tools to enforce the standards as _pre-commit hooks_.
- Whenever we develop new features that involve new external APIs, libraries or new client data we may consult security experts to make sure we are not introducing vulnerabilities.
- Once we have integrated the tools, we can create a CI/CD pipeline that runs the tests and checks the quality of the code before being able to merge it to the main branch.
- CI pipeline is great to catch bugs early and to make sure the code is always in a deployable state.
- CD pipeline is great to automate the deployment process and minimize human errors in the process.

**CI**

I have created a very simple CI pipeline using GitHub Actions => [.github/workflows/ci.yml](.github/workflows/ci.yml)
I would add a real database to the mix and run the BDD tests against it. Something along the lines (not tested):
```yaml
name: Lint & Test

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    services:
      database:
        image: postgres:15
        env:
          POSTGRES_USER: user
          POSTGRES_PASSWORD: password
          POSTGRES_DB: fleet
        ports:
          - 5432:5432
        options: >-
          --health-cmd "pg_isready -U user -d password"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Set Up Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install Dependencies
        run: bun install

      - name: Run Linter
        run: bun run lint

      - name: Wait for Database to be Ready
        run: sleep 10

      - name: Run Unit Tests
        run: bun run test

      - name: Run BDD Tests
        run: bun run test:bdd
```

**Run the linter**

```bash
docker compose run app bun run lint
```
