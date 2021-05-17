# merch-dao

## Setup

1. Fill `.env` file, see `.env.example` file.

2. Create Fauna database:

   ```sh
   # install fauna cli
   yarn global add fauna-shell
   # login to fauna
   fauna cloud-login
   # run creation script
   MD_FN_KEY=`sed -n 's/secret=//p' ~/.fauna-shell` yarn workspace backend create-db
   ```

   Fauna key then stored in `.env` file.

## Commands

```sh
# lint
yarn lint

# test
yarn test

# run in development mode
yarn workspace backend dev
yarn workspace frontend dev

# run in production mode
yarn workspace backend start
yarn workspace frontend build && yarn workspace frontend start
```
