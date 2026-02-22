import bcrypt from "bcrypt"
import prisma from "../config/db.js"
import generateToken from "../utils/jwt.js"

export const signup = async (req, res) => {

  const { fullName, email, password } = req.body

   if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    })
  }


  try {
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      })
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    })

    if (userExists) {
      return res.status(400).json({ message: "Email already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    })

    const token = generateToken(newUser)

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
      },
      token: token, 
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

   if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(400).json({ message: "User does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = generateToken(user)

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      token: token, 
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

export const logout = async (req, res) => {
  try {
    return res.status(200).json({ message: "Logout successful" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Something went wrong" })
  }
}