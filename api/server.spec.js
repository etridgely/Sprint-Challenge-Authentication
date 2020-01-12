const request = require('supertest');

const server = require('./server.js');

describe('POST /api/auth/register', () => {
    it('should be able to add user to database', async () => {
        return response = await request(server)
            .post('/api/auth/register')
            .send({
                username: `testuser ${Date.now()}`,
                password: "test"
            })
            .then(response => {
                expect(response.status).toBe(201);
            })
    });

    it('must fail validation without both username and password', () => {
        return request(server)
            .post('/api/auth/register')
            .send({
                username: 'testing'
            })
            .then(response => {
                expect(response.status).toBe(400);
            })
    });
});

describe('POST /api/auth/login', () => {
    it('should be able to log in', async () => {
        return response = await request(server)
            .post('/api/auth/login')
            .send({
                username: "testuser",
                password: "test"
            })
            .then(response => {
                expect(response.status).toBe(200);
            })
    });

    it('should return a user token', async () => {
        const response = await request(server)
            .post('/api/auth/login')
            .send({
                username: "testuser",
                password: "test"
            })
            expect(response.body.token).toBeTruthy();
        });
});

describe('GET /api/jokes', () => {
    it('should return 200 http status code when logged in', async () => {
        const response = await request(server)
            .post('/api/auth/login')
            .send({
                username: "testuser",
                password: "test"
            })
        const users = await request(server)
            .get('/api/jokes')
            .set('Authorization', response.body.token)
        expect(users.body)
    });

    it('should return JSON object', async () => {
        const response = await request(server)
            .get('/api/jokes');
        expect(response.type).toMatch(/json/i);
    })
});