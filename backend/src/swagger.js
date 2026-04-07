import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jewellery E-Commerce API",
      version: "1.0.0",
      description: "Complete API documentation for Jewellery E-Commerce",
    },
    servers: [
      {
        url: "http://localhost:5001/api",
        description: "Development Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        // ========== AUTH SCHEMAS ==========
        SignupInput: {
          type: "object",
          required: ["fullName", "email", "password", "confirmPassword"],
          properties: {
            fullName: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            password: {
              type: "string",
              minLength: 8,
              example: "Password123",
            },
            confirmPassword: {
              type: "string",
              minLength: 8,
              example: "Password123",
            },
          },
        },

        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            password: {
              type: "string",
              example: "Password123",
            },
          },
        },

        VerifyEmailSchema: {
          type: "object",
          required: ["email", "otp"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            otp: {
              type: "string",
              example: "123456",
            },
          },
        },

        RefreshTokenInput: {
          type: "object",
          required: ["refreshToken"],
          properties: {
            refreshToken: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },

        ResetPasswordInput: {
          type: "object",
          required: ["email", "otp", "newPassword", "confirmPassword"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            otp: {
              type: "string",
              example: "123456",
            },
            newPassword: {
              type: "string",
              minLength: 8,
              example: "NewPassword123",
            },
            confirmPassword: {
              type: "string",
              minLength: 8,
              example: "NewPassword123",
            },
          },
        },

        LoginResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            statusCode: { type: "integer" },
            message: { type: "string" },
            data: {
              type: "object",
              properties: {
                user: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    fullName: { type: "string" },
                    email: { type: "string" },
                    isVerified: { type: "boolean" },
                    role: { type: "string" },
                  },
                },
                accessToken: { type: "string" },
                refreshToken: { type: "string" },
              },
            },
          },
        },

        // ========== PRODUCT SCHEMAS ==========
        CreateProductInput: {
          type: "object",
          required: ["name", "description", "price", "stock", "categoryId"],
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              example: "Gold Ring",
            },
            description: {
              type: "string",
              minLength: 10,
              example: "Beautiful gold ring with premium finish",
            },
            price: {
              type: "number",
              minimum: 1,
              example: 5999,
            },
            stock: {
              type: "integer",
              minimum: 0,
              example: 50,
            },
            categoryId: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            brand: { type: "string", example: "Premium Gold" },
            slug: { type: "string", example: "gold-ring-premium" },
            isFeatured: { type: "boolean", example: true },
            images: {
              type: "array",
              items: { type: "string", format: "binary" },
            },
          },
        },

        UpdateProductInput: {
          type: "object",
          properties: {
            name: { type: "string", minLength: 2, maxLength: 100 },
            description: { type: "string", minLength: 10 },
            price: { type: "number", minimum: 1 },
            stock: { type: "integer", minimum: 0 },
            categoryId: { type: "string", format: "uuid" },
            brand: { type: "string" },
            slug: { type: "string" },
            isFeatured: { type: "boolean" },
          },
        },

        // ========== ADDRESS SCHEMAS ==========
        Address: {
          type: "object",
          required: ["fullName", "phone", "state", "city"],
          properties: {
            fullName: { type: "string", minLength: 2, maxLength: 100 },
            phone: { type: "string", example: "+1-234-567-8900" },
            state: { type: "string", minLength: 2 },
            city: { type: "string", minLength: 2 },
            area: { type: "string" },
            zipCode: { type: "string" },
            isDefault: { type: "boolean" },
          },
        },

        // ========== ATTRIBUTE SCHEMAS ==========
        Attribute: {
          type: "object",
          required: ["productId"],
          properties: {
            productId: { type: "string", format: "uuid" },
            material: { type: "string", example: "Gold" },
            purity: { type: "string", example: "24K" },
            weight: { type: "number", example: 5.5 },
            gemstoneType: { type: "string", example: "Diamond" },
            gemstoneWeight: { type: "number", example: 2.5 },
            gemstoneColor: { type: "string", example: "D (Colorless)" },
            size: { type: "string", example: "M" },
          },
        },

        // ========== CATEGORY SCHEMAS ==========
        Category: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            icon: { type: "string" },
          },
        },

        // ========== CART SCHEMAS ==========
        CartItem: {
          type: "object",
          required: ["productId", "quantity"],
          properties: {
            productId: { type: "string", format: "uuid" },
            quantity: { type: "integer", minimum: 1, maximum: 100 },
          },
        },

        // ========== BLOG SCHEMAS ==========
        Blog: {
          type: "object",
          required: ["title", "content"],
          properties: {
            title: { type: "string" },
            slug: { type: "string" },
            content: { type: "string" },
            excerpt: { type: "string" },
            isPublished: { type: "boolean" },
            metaTitle: { type: "string" },
            metaDescription: { type: "string" },
          },
        },

        // ========== COLLECTION SCHEMAS ==========
        Collection: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            slug: { type: "string" },
            icon: { type: "string" },
          },
        },

        // ========== COMMON RESPONSE SCHEMAS ==========
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            statusCode: { type: "integer" },
            message: { type: "string" },
            data: { type: "object" },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            statusCode: { type: "integer" },
            message: { type: "string" },
          },
        },
      },
    },

    tags: [
      { name: "Auth", description: "Authentication & Authorization" },
      { name: "Products", description: "Product Management" },
      { name: "Categories", description: "Category Management" },
      { name: "Cart", description: "Shopping Cart" },
      { name: "Orders", description: "Order Management" },
      { name: "Address", description: "User Addresses" },
      { name: "Attributes", description: "Product Attributes" },
      { name: "Blog", description: "Blog & Content" },
      { name: "Collections", description: "Product Collections" },
      { name: "Wishlist", description: "Wishlist Management" },
      { name: "Reviews", description: "Product Reviews" },
      { name: "Profile", description: "User Profile" },
    ],
  },

  apis: ["./src/modules/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;