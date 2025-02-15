const axios = require('axios');

// Test user credentials
const testUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'testpassword123'
};

const API_URL = 'http://localhost:3000';
let authToken;

async function registerUser() {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, testUser);
        console.log('Registration successful');
        return true;
    } catch (error) {
        if (error.response?.status === 409) {
            console.log('User already exists, proceeding to login');
            return true;
        }
        console.error('Registration failed:', error.message);
        return false;
    }
}

async function loginUser() {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email: testUser.email,
            password: testUser.password
        });
        authToken = response.data.token;
        console.log('Login successful');
        return true;
    } catch (error) {
        console.error('Login failed:', error.message);
        return false;
    }
}

async function testXPAndStreak() {
    try {
        // Test 1: Correct answer
        console.log('\nTest 1: Correct answer');
        const correctResponse = await axios.post(
            `${API_URL}/api/gamification/update-progress`,
            { isCorrect: true },
            { headers: { Authorization: `Bearer ${authToken}` } }
        );
        console.log('Correct answer result:', correctResponse.data);

        // Wait 1 second between tests
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Test 2: Incorrect answer
        console.log('\nTest 2: Incorrect answer');
        const incorrectResponse = await axios.post(
            `${API_URL}/api/gamification/update-progress`,
            { isCorrect: false },
            { headers: { Authorization: `Bearer ${authToken}` } }
        );
        console.log('Incorrect answer result:', incorrectResponse.data);

    } catch (error) {
        console.error('Test failed:', error.response?.data || error.message);
    }
}

async function runTests() {
    console.log('Starting gamification tests...');
    
    // Register and login
    const registered = await registerUser();
    if (!registered) {
        console.log('Failed to setup test user');
        return;
    }
    
    const loggedIn = await loginUser();
    if (!loggedIn) {
        console.log('Failed to login');
        return;
    }
    
    await testXPAndStreak();
    console.log('Tests completed');
}

runTests();
