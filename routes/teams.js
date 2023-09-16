const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/TeamController');
const { authenticateUser } = require('../middleware/auth');

// Endpoint for creating a team (only accessible to admin)
router.post('/create', authenticateUser, TeamController.createTeam);
// Endpoint for inviting a team member by email (only accessible to admin)
router.post('/invite', authenticateUser, TeamController.inviteTeamMember);

// Endpoint for viewing active members of a team (only accessible to admin)
router.get('/active-members/:teamId', authenticateUser, TeamController.getActiveMembers);

// Endpoint for viewing pending members of a team (only accessible to admin)
router.get('/pending-members/:teamId', authenticateUser, TeamController.getPendingMembers);

router.post('/:teamId/accept-member/:userId', authenticateUser, TeamController.acceptTeamMemberRequest);

// Route to reject a team member request
router.post('/:teamId/reject-member/:userId', authenticateUser, TeamController.rejectTeamMemberRequest);


// Route to get active members for a user after acceptance
router.get('/active-members-for-user/:teamId', authenticateUser, TeamController.getActiveMembersForUser);



module.exports = router;

