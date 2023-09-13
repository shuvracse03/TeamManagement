const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/TeamController');
const { authenticateUser } = require('../middleware/auth');

// Endpoint for creating a team (only accessible to admin)
router.post('/create', authenticateUser, TeamController.createTeam);
// Endpoint for inviting a team member by email (only accessible to admin)
router.post('/invite', authenticateUser, TeamController.inviteTeamMember);


module.exports = router;

