const express = require("express");
const bodyParser = require("body-parser");
const cors =  require("cors");
const productoRoutes = require("./routes/producto");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/productos', productoRoutes);

app.listen(PORT, () => {
    console.log("Servidor escuchando en el puerto: " + PORT);
})