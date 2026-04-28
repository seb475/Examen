const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');
const Stock = require("../models/Stock");
const Producto = require("../models/Producto");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

test("GET /stock/:sucursalId debe traer el inventario de una sucursal con el producto", async () => {
    const producto = await Producto.create({ 
        nombre: "Martillo", 
        SKU: "MARM-009", 
        precio: 150,
        categoria: "Herramienta de Mano"
    });
    
    const sucursalId = new mongoose.Types.ObjectId(); 
    await Stock.create({
        productoId: producto._id,
        sucursalId: sucursalId,
        cantidad: 27
    });
    const res = await request(app).get(`/stock/${sucursalId}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0].productoId.nombre).toBe("Martillo");
    expect(res.body[0].productoId.SKU).toBe("MARM-009");
});

test("GET /stock debe traer todo el inventario general", async () => {
    const res = await request(app).get("/stock");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});