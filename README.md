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

- /api/teams/create (create team)

      curl -X POST -H "Content-Type: application/json" -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTQ4NzA4OTMsImV4cCI6MTY5NDg3NDQ5M30.vvqjE76TygmE5iA4Qy-qK33ey8Xnrh9zN06xApLYYec" -d '{"name": "team4", "category": "category3"}' 'http://localhost:3001/api/teams/create'
      
- /api/teams/invite (invite a team member: only used by admin)

      curl -X POST -H "Content-Type: application/json" -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTQ4Njk5NDMsImV4cCI6MTY5NDg3MzU0M30.mlb6FCOmQ6dwPwo2ZmTlrJb4-YAQkht5zOC3eRwasqY" -d '{"teamId": 1,"email": "acmshuvra@yahoo.com"}' 'http://localhost:3001/api/teams/invite'
      
- /api/teams/active-members/{teamId} (show active members in the team: only used by admin)

      curl -X GET http://localhost:3001/api/teams/active-members/1 \-H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTQ3MzI0MjEsImV4cCI6MTY5NDczNjAyMX0.1-3vUKmi9IIvKR1G7MW7yByh1GSmb6k9rdFoid_BYrM'
      
- /api/teams/pending-members/{teamId} (show pending members in the team: only used by admin)

      curl -X GET http://localhost:3001/api/teams/pending-members/1 \-H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTQ4OTI5NzMsImV4cCI6MTY5NDg5NjU3M30.l_edUG9sJkUyj0a8pKKDLX3_ddqvEhV4tV4-Abqlvjc'
      
- /api/teams/{teamId}/accept-member/{userId} (Accept pending invitation: only used by corresponding user)

      curl -X POST 'http://localhost:3001/api/teams/1/accept-member/2' -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoidGVzdF91c2VyMSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk0OTAwMDQ1LCJleHAiOjE2OTQ5MDM2NDV9.s0UKmUIUMiFxhZghwBBPZXPxKapnI1YMiXSGDdrjFqA'
      
- /api/teams/{teamId}/reject-member/{userId} (Reject pending invitation: only used by corresponding user)

      curl -X POST 'http://localhost:3001/api/teams/1/reject-member/2' -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoidXNlcjEiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5NDczNjI2NCwiZXhwIjoxNjk0NzM5ODY0fQ.mrp-So6WK1KP08J7MuUFUqHibh7-MGnnrxMhwkSg2wQ'  
      
- /api/teams/active-members-for-user/{teamId} (After accepting invitation, user can see active members of the team)

      curl -X GET http://localhost:3001/api/teams/active-members-for-user/1 \-H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoidXNlcjEiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5NDc4NjU1NywiZXhwIjoxNjk0NzkwMTU3fQ.PCCf17OgVl17k8BJxKvKrmirxgoi1Uv4ywjrihgRiII'





