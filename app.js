import express from "express";
import cartsRouter from "./routes/carritoRoutes";
import productRouter from "./routes/productosRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

app.use('/api/carts', cartsRouter);
app.use('/api/products', productRouter);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));