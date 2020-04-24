const request = require('supertest');

const server = require("./server");
const db = require('../database/dbConfig');

describe("server", function () {
    describe("GET/", function () { 
        
      it("should return 200 OK", function () {
        return request(server)
        .get("/")
        .then(res => {
            console.log(res.body)
        expect(res.status).toBe(200);
            });
        });

        it("should return api:up", function () {
            return request(server)
            .get("/")
            .then(res => {
            expect(res.body).toMatchObject({ api: 'up' });
                });
            });
    });

    describe("POST/auth", function () { 
        
        beforeEach(async () => {
            await db("users").truncate();
        });

        it("register endpoint should return 201", function () {
          return request(server)
          .post("/api/auth/register")
          .send({username:"Borb",password:"Doe"})
          .then(res => {
              console.log(res.body)
          expect(res.status).toBe(201);
              });
          });

          it("register endpoint should give a success message upon registering", function () {
            return request(server)
            .post("/api/auth/register")
            .send({username:"nacho",password:"cheese"})
            .then(res => {
                console.log(res.body)
            expect(res.body.message).toBe('Successfully Registered!');
                });
            });

            it("Login endpoint returns success status", async function () {
                await request(server)
                .post("/api/auth/register")
                .send({username:"nacho",password:"cheese"})
                await request(server)
                .post("/api/auth/login")
                .send({username:"nacho",password:"cheese"})
                .then(res => {
                    console.log(res.body)
                expect(res.status).toBe(200);
                    });
                });

            it("Login endpoint returns a token", async function () {
            await request(server)
            .post("/api/auth/register")
            .send({username:"nacho",password:"cheese"})
            await request(server)
            .post("/api/auth/login")
            .send({username:"nacho",password:"cheese"})
            .then(res => {
                console.log(res.body)
            expect(res.body.token).toBeTruthy();
                });
            });

            

                

      });

      describe("GET/jokes", function () { 

        beforeEach(async () => {
            await db("users").truncate();
        });
    
          it("should return error if no token sent", function () {
              return request(server)
              .get("/api/jokes")
              .then(res => {
              expect(res.body).toMatchObject({ error: 'You must be logged in to do that.' });
                  });
              });

              it("should return jokes if token is sent", async function () {
                var testToken;
                await request(server)
                .post("/api/auth/register")
                .send({username:"nacho",password:"cheese"})
                await request(server)
                .post("/api/auth/login")
                .send({username:"nacho",password:"cheese"})
                .then(res => {
                    console.log(res.body)
                testToken = res.body.token
                });
                await request(server)
                .get("/api/jokes")
                .set('Authorization', testToken)
                .then(res => {
                expect(res.body[0].joke).toBeTruthy();
                    });
                });
      });

 });