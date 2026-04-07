import express from "express"
import cors from "cors"
import authRoutes from "./modules/auth/auth.route.js"
import productRoutes from "./modules/product/product.route.js"
import orderRoutes from "./modules/order/order.route.js"
import categoryRoutes from "./modules/category/category.route.js"
import cartRoutes from "./modules/cart/cart.route.js"
import wishlistRoutes from "./modules/wishlist/wishlist.route.js"
import collectionRoutes from "./modules/collection/collection.route.js"
import blogRoutes from "./modules/blog/blog.route.js"
import addressRoutes from "./modules/address/address.route.js"
import attributeRoutes from "./modules/attributes/attribute.route.js"
import profileRoutes from "./modules/profile/profile.route.js"
import reviewRoutes from "./modules/review/review.route.js"
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js'
import dotenv from 'dotenv'
import helmet from 'helmet'
import initSuperAdmin from './utils/superadmin.js'
import errorHandler from "./middleware/error.middleware.js";
import { globalLimiter } from "./middleware/rateLimit.middleware.js";
import morgan from "morgan"

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())
app.use(globalLimiter)
app.use(morgan('dev'))

app.use(cors({
  origin: "*", // allow all (for development)
  credentials: true
}));



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/collections', collectionRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/address', addressRoutes)
app.use('/api/attributes', attributeRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/reviews', reviewRoutes)

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