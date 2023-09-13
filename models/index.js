const Team = require('./Team');
const User = require('./User');
const TeamUser = require('./TeamUser');

Team.belongsToMany(User, { through: TeamUser });
User.belongsToMany(Team, { through: TeamUser });


