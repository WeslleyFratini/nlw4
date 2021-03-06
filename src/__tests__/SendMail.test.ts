import { getConnectionOptions, getConnection } from 'typeorm'
import { response } from 'express'
import request from 'supertest'
import app from '../app'

import createConnection from '../database/index'

describe("SendMail", () => {

    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection()
        await connection.dropDatabase()
        await connection.close()
    })


    it(" Should be able to create a new SendMail with exits email ", async () => {

        const survey = await request(app).post("/surveys")
            .send({
                title: "Title example",
                description: "Description example"
            }
            )

        const response = await request(app).post("/sendMail")
            .send({
                email: "use@example.com",
                survey_id: survey.body.id
            })
        expect(response.status).toBe(400);
    })

    it(" Should be able to create a new SendMail with exits survey_id ", async () => {
        const response = await request(app).post("/sendMail")
            .send({
                email: "send_user@example.com",
                survey_id: "15a30910-7774-11eb-98d1-cd06c8480cd6"
            })
        expect(response.status).toBe(400);
    })


})