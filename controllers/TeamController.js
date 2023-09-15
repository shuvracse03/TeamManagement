const Team = require('../models/Team');
const User = require('../models/User');
const TeamUser = require('../models/TeamUser');

// Create a new team
const createTeam = async (req, res) => {
  try {
    const { name, category } = req.body;

    // Check if the requesting user is an admin
    const requestingUser = await User.findByPk(req.userData.userId);

    if (!requestingUser || requestingUser.role !== 'admin') {
      return res.status(403).json({ error: 'Only admin users can create teams' });
    }

    // Check if the team name already exists
    const existingTeam = await Team.findOne({ where: { name } });
    if (existingTeam) {
      return res.status(400).json({ error: 'Team name already exists' });
    }

    const newTeam = await Team.create({ name, category });
    res.status(201).json({ message: 'Team created successfully', team: newTeam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Invite a team member by email
const inviteTeamMember = async (req, res) => {
  try {
    const { teamId, email } = req.body;

    // Check if the requesting user is an admin
    const requestingUser = await User.findByPk(req.userData.userId);

    if (!requestingUser || requestingUser.role !== 'admin') {
      return res.status(403).json({ error: 'Only admin users can invite team members' });
    }

    // Find the team
    const team = await Team.findByPk(teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Find or create the user by email
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // If the user doesn't exist, you can choose to create a user account here
      // user = await User.create({ email, role: 'user' });
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is already a member of the team
    const existingMembership = await TeamUser.findOne({
      where: { TeamId: teamId, UserId: user.id },
    });

    if (existingMembership) {
      return res.status(400).json({ error: 'User is already a member of the team' });
    }

    // Create a pending membership
    await TeamUser.create({ TeamId: teamId, UserId: user.id, status: "PENDING" });

    res.status(201).json({ message: 'Team member invited successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get active members of a team
const getActiveMembers = async (req, res) => {
  try {
    const { teamId } = req.params;

    // Check if the requesting user is an admin
    const requestingUser = await User.findByPk(req.userData.userId);

    if (!requestingUser || requestingUser.role !== 'admin') {
      return res.status(403).json({ error: 'Only admin users can view team members' });
    }

    // Find the team along with its active members
    const team = await Team.findByPk(teamId, {
      include: [
        {
          model: User,
          through: {
            model: TeamUser,
            where: { status: 'ACTIVE' }, // Filter by the 'member' role
          },
          attributes: ['id', 'username', 'email', 'role'], // Include user attributes
        },
      ],
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const activeMembers = team.Users; // The active members are available in the 'Users' association

    res.status(200).json({ activeMembers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get active members of a team
const getPendingMembers = async (req, res) => {
  try {
    const { teamId } = req.params;

    // Check if the requesting user is an admin
    const requestingUser = await User.findByPk(req.userData.userId);

    if (!requestingUser || requestingUser.role !== 'admin') {
      return res.status(403).json({ error: 'Only admin users can view team members' });
    }

    // Find the team along with its active members
    const team = await Team.findByPk(teamId, {
      include: [
        {
          model: User,
          through: {
            model: TeamUser,
            where: { status: 'PENDING' }, // Filter by the 'member' role
          },
          attributes: ['id', 'username', 'email', 'role'], // Include user attributes
        },
      ],
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const pendingMembers = team.Users; // The active members are available in the 'Users' association

    res.status(200).json({ pendingMembers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Accept a team member request and move them to the active team member list
const acceptTeamMemberRequest = async (req, res) => {
  try {
    const { teamId, userId } = req.params;
    console.log(req.params)
    console.log(teamId)
    console.log(userId)
    console.log(req.userData)
    console.log(req.userData.userId)
    // Find the user making the request
    const acceptingUser = await User.findByPk(req.userData.userId);
    console.log('d0')
    if (!acceptingUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('d1')
    
    // Find the team
    const team = await Team.findByPk(teamId);
    console.log('d2')
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Check if the accepting user is the same as the user in the request
    if (acceptingUser.id !== parseInt(userId)) {
      return res.status(403).json({ error: 'Only the user can accept their own request' });
    }
    console.log(teamId)
    console.log(userId)

    // Find the corresponding TeamUser entry for the user and team
    const teamUser = await TeamUser.findOne({
      where: {
        TeamId: teamId,
        UserId: userId,
        status: 'PENDING', // Assuming 'pending' represents pending requests
      },
    });

    if (!teamUser) {
      return res.status(404).json({ error: 'Pending request not found' });
    }

    // Update the user's role to 'member' to accept the request
    teamUser.status = 'ACTIVE';
    await teamUser.save();

    res.status(200).json({ message: 'Team member request accepted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Reject a team member request and remove the user from the admin's pending list
const rejectTeamMemberRequest = async (req, res) => {
  try {
    const { teamId, userId } = req.params;

    // Find the user making the request
    const rejectingUser = await User.findByPk(req.userData.userId);

    if (!rejectingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the team
    const team = await Team.findByPk(teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Check if the rejecting user is the same as the user in the request
    if (rejectingUser.id !== parseInt(userId)) {
      return res.status(403).json({ error: 'Only the user can reject their own request' });
    }

    // Find the corresponding TeamUser entry for the user and team
    const teamUser = await TeamUser.findOne({
      where: {
        TeamId: teamId,
        UserId: userId,
        status: 'PENDING', // Assuming 'pending' represents pending requests
      },
    });

    if (!teamUser) {
      return res.status(404).json({ error: 'Pending request not found' });
    }

    // Remove the user from the admin's pending list
    await teamUser.destroy();

    res.status(200).json({ message: 'Team member request rejected' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  createTeam,inviteTeamMember, getActiveMembers,
  getPendingMembers, acceptTeamMemberRequest, rejectTeamMemberRequest
};

