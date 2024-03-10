# Sparks Foundation

### Repository Structure

The project is comprised of several packages and is home to non-technical things specific to SPARKS Foundation.

[pnpm](https://pnpm.io/) is used for [workspace](https://pnpm.io/workspaces) & [package](https://pnpm.io/pnpm-cli) managements, [install](https://pnpm.io/installation) if needed.

Once you have pnpm, install the dependencies at the root level:

```
pnpm install
```

#### Documents

The documents package contains pdf copies of the foundation docs such as the constitution, bylaws, etc.

#### Website

The website package contains the source code for the sparks.foundation website.

Commands are run from the root level of the repository.

```bash
# run the dev server
pnpm --filter website run dev

# build the project
pnpm --filter website run build

# eslint checks
pnpm --filter website run lint

# serve built project
pnpm --filter website run start
``` 
