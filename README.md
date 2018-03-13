# react-rest-api-proj

### Endpoints
1. http://localhost:4000 (index login page) 
3. http://localhost:4000/signup ( signup )
2. http://localhost:4000/profile ( after successful login profile page will showup )

### Things covered 
1. Typescript 
2. Babel 
3. React 
4. RestAPI 
5. Express 
6. Login Component
7. Signup Component 
8. Joi ( HAPI js input validation ) 
9. Test cases ( mocha ) 
10. Security JWT ( json web tokens ) 
11. ES2017 (`async await, fetch`) 
12. Backend (Redis) 
13. Webpack

### Things not coverd
1. Redux

Install Redis: 
==================
https://redis.io/topics/quickstart   
sudo wget http://download.redis.io/redis-stable.tar.gz   
sudo tar xvzf redis-stable.tar.gz  
sudo cd redis-stable  
sudo make  
sudo make install  


### Running App
```
1. yarn install
2. Install redis server and run in default port and verify
start : redis-server --daemonize yes
verify: redis-cli ping
stop : redis-cli shutdown

3. yarn build ( build & run automatically )
4. yarn run test ( to run test cases )

