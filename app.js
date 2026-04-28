const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const epRoutes = require("./routes/epRoutes");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
require('dotenv').config();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor rodando: http://localhost:${PORT}/api-docs`)
})