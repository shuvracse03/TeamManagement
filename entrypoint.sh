#!/bin/bash

# Wait for the PostgreSQL database to be ready

sleep 5


# Run the Sequelize database migration
#npx sequelize-cli db:migrate

# Start your Node.js application
node index.js

