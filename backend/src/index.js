import express from "express"
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./modules/product/product.route.js"

import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT}`)
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`)
})