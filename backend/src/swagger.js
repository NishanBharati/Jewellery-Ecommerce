  // apis: ['./src/routes/*.js', './src/controllers/*.js']
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jewellery Shop API Documentation",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [
      {
        url: "http://localhost:5001",
      },
    ],
  },
apis: ['./src/routes/*.js', './src/controllers/*.js']};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
