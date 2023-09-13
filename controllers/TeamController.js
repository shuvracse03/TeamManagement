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

module.exports = {
  createTeam,inviteTeamMember
};

