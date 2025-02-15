const mysql = require('mysql2/promise');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get MySQL credentials from user
const getMySQLCredentials = () => {
  return new Promise((resolve) => {
    rl.question('Enter MySQL username: ', (username) => {
      rl.question('Enter MySQL password: ', (password) => {
        resolve({ username, password });
      });
    });
  });
};

// Function to create a new database connection
const createConnection = async () => {
  const { username, password } = await getMySQLCredentials();
  return await mysql.createConnection({
    host: 'localhost',
    user: username,
    password: password,
    database: 'code_learning_platform'
  });
};

// Cleanup readline interface when the server shuts down
process.on('SIGINT', () => {
  rl.close();
  process.exit();
});

module.exports = {
  createConnection,
  rl
};
