const request = require('supertest');


describe('User Creation API Tests', () => {

  
  it('Create user with admin role test', async () => {
    const newUser = {
      username: 'test_admin',
      password: 'pass123',
      email: 'test_admin@gmail.com',
      role: 'admin', // Define the user's role
    };

    const response = await request('http://localhost:3001')
      .post('/api/users/register')
      .send(newUser);

    expect(response.status).toBe(201); // HTTP status code for successful creation
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.user).toBeDefined(); // Ensure that user data is returned
  });
  

  it('Create user1 with user role test', async () => {
    const newUser = {
      username: 'test_user1',
      password: 'pass123',
      email: 'user1@gmail.com',
      role: 'user', // Define the user's role
    };

    const response = await request('http://localhost:3001')
      .post('/api/users/register')
      .send(newUser);

   
    
    expect(response.status).toBe(201); // HTTP status code for successful creation
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.user).toBeDefined(); // Ensure that user data is returned
  });
  
  it('Create user2 with user role test', async () => {
    const newUser = {
      username: 'test_user2',
      password: 'pass123',
      email: 'user2@gmail.com',
      role: 'user', // Define the user's role
    };

    const response = await request('http://localhost:3001')
      .post('/api/users/register')
      .send(newUser);

   
    
    expect(response.status).toBe(201); // HTTP status code for successful creation
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.user).toBeDefined(); // Ensure that user data is returned
  });
  
  
  it('Create user with duplicate username test', async () => {
    const duplicateUser = {
      username: 'test_admin', // Use the same username as in the previous test
      password: 'anotherpassword',
      email: 'another@example.com',
      role: 'admin',
    };

    const response = await request('http://localhost:3001')
      .post('/api/users/register')
      .send(duplicateUser);

    expect(response.status).toBe(400); // HTTP status code for a bad request
    expect(response.body.error).toBe('Username already exists');
  });
    
});


describe('User Login API Tests', () => {

  it('Admin user login test', async () => {
    const adminUser = {
      username: 'test_admin',
      password: 'pass123',
      
    };

    const response = await request('http://localhost:3001')
      .post('/api/users/login')
      .send(adminUser);
  
    expect(response.status).toBe(200); // HTTP status code for successful creation
    expect(response.body.message).toBe('Login successful');
    expect(response.body.token).toBeDefined(); // Ensure that user data is returned
  });
  
  it('Incorrect username test', async () => {
    const adminUser = {
      username: 'test_admin11',
      password: 'pass123',
      
    };

    const response = await request('http://localhost:3001')
      .post('/api/users/login')
      .send(adminUser);
  
    expect(response.status).toBe(401); // HTTP status code for successful creation
    expect(response.body.error).toBe('User not found');
    
  });
  
  it('Incorrect password test', async () => {
    const adminUser = {
      username: 'test_admin',
      password: 'pass',
      
    };

    const response = await request('http://localhost:3001')
      .post('/api/users/login')
      .send(adminUser);
  
    expect(response.status).toBe(401); // HTTP status code for successful creation
    expect(response.body.error).toBe('Incorrect password');
    
  });
  
});


describe('Team creation API Tests', () => {

  it('Admin user create a new team test', async () => {
    const adminUser = {
      username: 'test_admin',
      password: 'pass123',
      
    };

    const response = await request('http://localhost:3001')
      .post('/api/users/login')
      .send(adminUser);
    token = response.body.token
    
    const newTeam = {
      name: 'Test Team1',
      category: 'Test Category1',
    };
    const response2 = await request('http://localhost:3001')
      .post('/api/teams/create')
      .set('Authorization', `${token}`) // Set the admin token in the request header
      .send(newTeam);
 
    expect(response2.status).toBe(201); // HTTP status code for successful creation
    expect(response2.body.message).toBe('Team created successfully');
    
      
  });
  
 it('Non-Admin user cannot create a new team test', async () => {
    const adminUser = {
      username: 'test_user1',
      password: 'pass123',
      
    };

    const response5 = await request('http://localhost:3001')
      .post('/api/users/login')
      .send(adminUser);
    token = response5.body.token
    
    const newTeam = {
      name: 'Test Team2',
      category: 'Test Category1',
    };
    const response6 = await request('http://localhost:3001')
      .post('/api/teams/create')
      .set('Authorization', `${token}`) // Set the admin token in the request header
      .send(newTeam);
    expect(response6.status).toBe(403); // HTTP status code for successful creation
    expect(response6.body.error).toBe('Only admin users can create teams');
    
      
  });
  
 it('Cannot create team with same name test', async () => {
    const adminUser = {
      username: 'test_admin',
      password: 'pass123',
      
    };

    const response3 = await request('http://localhost:3001')
      .post('/api/users/login')
      .send(adminUser);
    token = response3.body.token
    
    const newTeam = {
      name: 'Test Team1',
      category: 'Test Category2',
    };
    const response4 = await request('http://localhost:3001')
      .post('/api/teams/create')
      .set('Authorization', `${token}`) // Set the admin token in the request header
      .send(newTeam);
    
    expect(response4.status).toBe(400); // HTTP status code for successful creation
    expect(response4.body.error).toBe('Team name already exists');
    
      
  });
  

  
});


describe('Team Invitation API Tests', () => {
  it('Admin send invitation test', async () => {
    const adminUser = {
      username: 'test_admin',
      password: 'pass123',
      
    };

    const response = await request('http://localhost:3001')
      .post('/api/users/login')
      .send(adminUser);
    token = response.body.token
    teamId = 1
    const info = {
      teamId: teamId,
      email: 'user1@gmail.com',
    };
    const response2 = await request('http://localhost:3001')
      .post('/api/teams/invite')
      .set('Authorization', `${token}`) // Set the admin token in the request header
      .send(info);
 
    expect(response2.status).toBe(201); // HTTP status code for successful creation
    expect(response2.body.message).toBe('Team member invited successfully');
  
  });
  
  it('User cannot send invitation test', async () => {
    const adminUser = {
      username: 'test_user1',
      password: 'pass123',
      
    };

    const response = await request('http://localhost:3001')
      .post('/api/users/login')
      .send(adminUser);
    token = response.body.token
    teamId = 1
    const info = {
      teamId: teamId,
      email: 'user1@gmail.com',
    };
    const response2 = await request('http://localhost:3001')
      .post('/api/teams/invite')
      .set('Authorization', `${token}`) // Set the admin token in the request header
      .send(info);
    
    expect(response2.status).toBe(403); // HTTP status code for successful creation
    expect(response2.body.error).toBe('Only admin users can invite team members');
  
  });
  
  it('Admin cannot send invitation to the same user twice test', async () => {
    const adminUser = {
      username: 'test_admin',
      password: 'pass123',
      
    };

    const response = await request('http://localhost:3001')
      .post('/api/users/login')
      .send(adminUser);
    token = response.body.token
    teamId = 1
    const info = {
      teamId: teamId,
      email: 'user1@gmail.com',
    };
    const response2 = await request('http://localhost:3001')
      .post('/api/teams/invite')
      .set('Authorization', `${token}`) // Set the admin token in the request header
      .send(info);
    
    expect(response2.status).toBe(400); // HTTP status code for successful creation
    expect(response2.body.error).toBe('User is already a member of the team');
  
  });
  
});
  
describe('Pending memeber API Tests', () => {
  it('Admin can see pending members of a team test', async () => {
    const adminUser = {
      username: 'test_admin',
      password: 'pass123',
      
    };

    const response = await request('http://localhost:3001')
      .post('/api/users/login')
      .send(adminUser);
    token = response.body.token
    teamId = '1'
    
    const response2 = await request('http://localhost:3001')
      .get('/api/teams/pending-members/1')
      .set('Authorization', `${token}`) // Set the admin token in the request header
  
    
    
    expect(response2.status).toBe(200); // HTTP status code for successful creation
  
    expect(response2.body.pendingMembers).toBeDefined()
  
  });
  
  it('Non-Admin cannot see pending members of a team test', async () => {
    const adminUser = {
      username: 'test_user1',
      password: 'pass123',
      
    };

    const response = await request('http://localhost:3001')
      .post('/api/users/login')
      .send(adminUser);
    token = response.body.token
    teamId = '1'
    
    const response2 = await request('http://localhost:3001')
      .get('/api/teams/pending-members/1')
      .set('Authorization', `${token}`) // Set the admin token in the request header
    
    
    
    expect(response2.status).toBe(403); // HTTP status code for successful creation
   
    expect(response2.body.error).toBe('Only admin users can view team members')
  
  });

});


describe('Accept pending invitation API Tests', () => {
  it('Corresponding user can accept a pending invitation test', async () => {
    const user = {
      username: 'test_user1',
      password: 'pass123',
      
    };

    const response = await request('http://localhost:3001')
      .post('/api/users/login')
      .send(user);
    token = response.body.token

    const response2 = await request('http://localhost:3001').post('/api/teams/1/accept-member/2').set('Authorization', `${token}`) // Set the admin token in the request header
  
    
 
    expect(response2.status).toBe(200); // HTTP status code for successful creation
  
    expect(response2.body.message).toBe('Team member request accepted')
  
  });
  
  it('Irrelevant  user cannot accept a pending invitation test', async () => {
    const user = {
      username: 'test_user2',
      password: 'pass123',
      
    };

    const response = await request('http://localhost:3001')
      .post('/api/users/login')
      .send(user);
    token = response.body.token

  
    const response2 = await request('http://localhost:3001')
    .post('/api/teams/1/accept-member/2')
    .set('Authorization', `${token}`) // Set the admin token in the request header
  

    expect(response2.status).toBe(403); // HTTP status code for successful creation
  
    expect(response2.body.error).toBe('The user can accept their own request only')
  
  });
  
});  

describe('Reject pending invitation API Tests', () => {
  it('Corresponding user can reject a pending invitation test', async () => {
    const adminUser = {
      username: 'test_admin',
      password: 'pass123',
      
    };

    response = await request('http://localhost:3001')
      .post('/api/users/login')
      .send(adminUser);
    token = response.body.token
    teamId = 1
    const info = {
      teamId: teamId,
      email: 'user2@gmail.com',
    };
    response = await request('http://localhost:3001')
      .post('/api/teams/invite')
      .set('Authorization', `${token}`) // Set the admin token in the request header
      .send(info);
  
  
  
  const user = {
      username: 'test_user2',
      password: 'pass123',
      
    };

   response = await request('http://localhost:3001')
      .post('/api/users/login')
      .send(user);
   token = response.body.token
   response = await request('http://localhost:3001')
    .post('/api/teams/1/reject-member/3')
    .set('Authorization', `${token}`) // Set the admin token in the request header
  
  
   expect(response.status).toBe(200); // HTTP status code for successful creation
  
   expect(response.body.message).toBe('Team member request rejected')
  });
  
});  
  



