# Team Management
## Package/Library used
- sequelize : ORM
- nodemailer : For emailing
- supertest : For testing APIs
- jsonwebtoken : For jwt token authentication
- bcryptjs : For encryption 
- pg : Postgres connector
- winston : Logger
## How to Run?
```
docker-compose build
docker-compose up --d
```
You should be able to access all the API endpoints at port 3001.

## How to run the tests?
In the project directory, run:
```
npm test
```
If you want to delete data before running the tests, execute the database commands first:
```
truncate "Teams"  RESTART identity cascade
truncate "Users"  RESTART identity cascade
```
## API List

- /api/users/register (create user)


        curl -X POST -H "Content-Type: application/json" -d '{"username": "admin2", "password": "pass123", "role": "admin", "email": "admin2@gmail.com"}' 'http://localhost:3001/api/users/register'
        curl -X POST -H "Content-Type: application/json" -d '{"username": "user1", "password": "pass123", "role": "user", "email": "user1@gmail.com"}' 'http://localhost:3001/api/users/register'

- /api/users/login (login user)

      curl -X POST -H "Content-Type: application/json" -d '{"username": "admin", "password": "pass123"}' 'http://localhost:3001/api/users/login'
      curl -X POST -H "Content-Type: application/json" -d '{"username": "test_user1", "password": "pass123"}' 'http://localhost:3001/api/users/login'






