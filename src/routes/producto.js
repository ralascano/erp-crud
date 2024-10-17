const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post('/', async (req, res) => {
    console.log(req.body)
    const {nombre, descripcion, precio, cantidad_stock, id_categoria} = req.body;
   
    try {
        const newProducto = await pool.query(
            'INSERT INTO Producto (Nombre, Descripcion, Precio, Cantidad_Stock, ID_Categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, descripcion, precio, cantidad_stock, id_categoria]
        );
        res.json(newProducto.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Error en el servidor");
    }
})

router.get('/', async (req,res) => {
    try {
        const allProductos = await pool.query('SELECT * FROM Producto');
        res.json(allProductos.rows);
    }catch (err) {
        console.error(err.message);
        res.status(500).json('Error en el servidor');
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const producto = await pool.query('SELECT * FROM Producto WHERE ID_Producto = $1', [id]);
        if (producto.rows.length === 0) {
            return res.status(404).json('Producto no encontrado');
        }
        res.json(producto.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Error en el servidor');
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const { nombre, descripcion, precio, cantidad_stock, id_categoria } = req.body;
    try {
        const updatedProducto = await pool.query(
            'UPDATE Producto SET Nombre = $1, Descripcion = $2, Precio = $3, Cantidad_Stock = $4, ID_Categoria = $5 WHERE ID_Producto = $6 RETURNING *',
            [nombre, descripcion, precio, cantidad_stock, id_categoria, id]
        );
        if (updatedProducto.rows.length === 0) {
            return res.status(404).json("Producto no encontrado");
        }
        res.json(updatedProducto.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Error en el servidor");
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const deletedProducto = await pool.query('DELETE FROM Producto WHERE ID_Producto = $1 RETURNING *', [id]);
        if (deletedProducto.rows.length === 0) {
            return res.status(404).json('Producto no encontrado');
        }
        res.json('Producto eliminado');
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Error en el servidor')
    }
})

module.exports = router;