"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { getCurrentUser } from "@/lib/auth"

const UserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  role: z.enum(["OWNER", "ADMIN", "EDITOR"]),
  responsibility: z.string().optional(),
  image: z.string().optional(),
})

export async function createUser(formData: FormData) {
  const currentUser = await getCurrentUser()

  if (!currentUser || (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN")) {
    return { error: "Unauthorized" }
  }

  const validatedFields = UserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    role: formData.get("role"),
    responsibility: formData.get("responsibility"),
    image: formData.get("image"),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const { password, ...userData } = validatedFields.data

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    })

    if (existingUser) {
      return { error: "User with this email already exists" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password || "", 10)

    // Create user
    await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    })

    revalidatePath("/dashboard/users")
    return { success: "User created successfully" }
  } catch (error) {
    console.error("Error creating user:", error)
    return { error: "Failed to create user" }
  }
}

export async function updateUser(userId: string, formData: FormData) {
  const currentUser = await getCurrentUser()

  if (!currentUser || (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN")) {
    return { error: "Unauthorized" }
  }

  const validatedFields = UserSchema.partial().safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    role: formData.get("role"),
    responsibility: formData.get("responsibility"),
    image: formData.get("image"),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const userData = validatedFields.data

  // If password is provided, hash it
  let hashedPassword
  const password = formData.get("password") as string
  if (password && password.length > 0) {
    hashedPassword = await bcrypt.hash(password, 10)
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        ...userData,
        ...(hashedPassword && { password: hashedPassword }),
      },
    })

    revalidatePath("/dashboard/users")
    return { success: "User updated successfully" }
  } catch (error) {
    console.error("Error updating user:", error)
    return { error: "Failed to update user" }
  }
}

export async function deleteUser(userId: string) {
  const currentUser = await getCurrentUser()

  if (!currentUser || (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN")) {
    return { error: "Unauthorized" }
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    })

    revalidatePath("/dashboard/users")
    return { success: "User deleted successfully" }
  } catch (error) {
    console.error("Error deleting user:", error)
    return { error: "Failed to delete user" }
  }
}

export async function getUsers() {
  const currentUser = await getCurrentUser()

  if (!currentUser || (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN")) {
    return { error: "Unauthorized" }
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    })

    return { users }
  } catch (error) {
    console.error("Error fetching users:", error)
    return { error: "Failed to fetch users" }
  }
}
