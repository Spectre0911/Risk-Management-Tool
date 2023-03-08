// import { createMocks } from 'node-mocks-http';


const e = require('express')
const request = require("supertest")
const baseURL = "http://localhost:5000"


describe("register", () => {
    const registerDetails = {
        email:"jack@mail.com",
        firstName:"Jack",
        lastName:"Arnold",
        pfpPath:"jack.png",
        password:"jack123",
        confirmPassword:"jack123"
    }
    it("should return 200", async () => {
    const response = await request(baseURL).post("/api/createAccount").send(registerDetails);
    expect(response.statusCode).toBe(200);
    });

    
});

// describe('Profile management system', () => {
//     it('Login', () => {
//         expect(true).toEqual(true);
//     });
//     it('Register', () => {
//         expect(true).toEqual(true);
//     });
//     it('Edit profile', () => {
//         expect(true).toEqual(true);
//     });
//     it('Add Skills', () => {
//         expect(true).toEqual(true);
//     });
// });

// describe('Project management system', () => {
//     it('Add team member', () => {
//         expect(true).toEqual(true);
//     });
//     it('Add feature', () => {
//         expect(true).toEqual(true);
//     });
//     it('Create task', () => {
//         expect(true).toEqual(true);
//     });
//     it('Add bug', () => {
//         expect(true).toEqual(true);
//     });
//     it('Assign bug', () => {
//         expect(true).toEqual(true);
//     });
//     it('Submit feedback', () => {
//         expect(true).toEqual(true);
//     });
//     it('Create notification', () => {
//         expect(true).toEqual(true);
//     });
// });