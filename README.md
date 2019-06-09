## References 
* starter for architecture https://github.com/builderbook/builderbook/tree/master/server
* ant design https://github.com/zeit/next.js/tree/canary/examples/with-ant-design
* boilerplate https://github.com/Armour/express-webpack-react-redux-typescript-boilerplate


## DOCKER
```
Connect to docker - sudo docker exec -i -t nextjs_shop_web bash
Stop - containers docker stop $(docker ps -a -q)
Delete - containers docker rm $(docker ps -a -q)

START DEV - docker-compose -f docker-compose.dev.yml up
START DEV IF THG WAS CHANGED - docker-compose -f docker-compose.dev.yml build
BUILD - docker build -t rosomakha/nextjs .
RUN DOCKER - docker run -d -p 3333:3000 rosomakha/nextjs:latest
```

* how to save data after docker reload - https://github.com/laradock/laradock/issues/1445

## DOCKER POSTGRESS
```
connect to db psql test_db postgres quiensinome
fill db - sudo psql  -U postgres -d test_db -f db.sql
```

db: export PATH=/Library/PostgreSQL/10/bin:$PATH