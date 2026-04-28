const jwt = require("jsonwebtoken")
const  request  = require("supertest");
const app = require("../app")
const mongoose = require("mongoose")
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer
let id


beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)
    const payload = { 
        id: new mongoose.Types.ObjectId().toHexString() 
    }
    const secret = process.env.TOKEN_SECRET
    token = jwt.sign(payload, secret, { expiresIn: '7d' })
})

afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
});

test('GET/sucursales debe traer todas las sucursales ', async () => {
    const res = await request(app)
    .get("/sucursales")
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});


test('POST /sucursales debe crear una sucursal', async () => {
    const nuevaSucursal = {
    "nombre": "Sucursal Hermosillo Centro",
    "ubicacion": "Hermosillo, Sonora"
    }
    const res = await request(app).post("/sucursales").send(nuevaSucursal).set("Authorization", `Bearer ${token}`)
    id = res.body._id || res.body.id; 
    expect(res.status).toBe(201);
    expect(id).toBeDefined(); 
    expect(res.body.nombre).toBe(nuevaSucursal.nombre) 
})