# global-nodejs

## Sequelize

### Create model: 
```
    npx sequelize-cli model:generate --name *** --attributes ***
```

ex.:    npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string


### Create seeders: 
        npx sequelize-cli seed:generate --name demo-user

## Start: 

Install service dependencies, use:
```
    npm i
```

Setup default service conifuration, use:
```sh
    cp .env.example .env
```

Build:
```
    npm run build
```

Init database:
```
    npm run init-db
```

Load example data to database:
```
    npm run load-data
```

Linting:
```
    npm run lint
```

Run:
```
    npm run start
```