import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./modules/product/product.route.js"
import orderRoutes from "./modules/order/order.route.js"
import categoryRoutes from "./modules/category/category.route.js"
import cartRoutes from "./modules/cart/cart.route.js"
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js'
import dotenv from 'dotenv'
import helmet from 'helmet'
import initSuperAdmin from './utils/superadmin.js'
import errorHandler from "./middleware/error.middleware.js";
import { globalLimiter } from "./middleware/rateLimit.middleware.js";

dotenv.config()

const app = express()

// Security & parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())
app.use(globalLimiter)


// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/cart', cartRoutes)

// Error handler
app.use(errorHandler);


const PORT = process.env.PORT || 3000

const startServer = async () => {
  await initSuperAdmin();
  
  app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`)
  })
}

startServer();