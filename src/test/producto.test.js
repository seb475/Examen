const jwt = require("jsonwebtoken")
const  request  = require("supertest");
const app = require("../app")
const mongoose = require("mongoose")
const { MongoMemoryServer } = require('mongodb-memory-server');


let mongoServer
let id
let token;

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
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

test('GET/ productos deve traer todos los prodcutos ', async () => {
    const res = await request(app)
    .get("/productos")
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});


test('POST / productos debe crear un producto', async () => {
    const nuevoProducto = {
        SKU: "TAMDRA-004",
        nombre: "Tablones de Madera",
        precio: "7830",
        categoria: "Construccion"
    }
    const res = await request(app).post("/productos").send(nuevoProducto).set("Authorization", `Bearer ${token}`)
    id = res.body._id || res.body.id; 
    expect(res.status).toBe(201);
    expect(id).toBeDefined(); 
    expect(res.body.nombre).toBe(nuevoProducto.nombre) 
})

