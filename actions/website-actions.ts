"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { z } from "zod"
import { getCurrentUser } from "@/lib/auth"

const WebsiteSchema = z.object({
  url: z.string().url("Invalid URL"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  logo: z.string().optional(),
  description: z.string().optional(),
})

export async function updateWebsite(formData: FormData) {
  const currentUser = await getCurrentUser()

  if (!currentUser || (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN")) {
    return { error: "Unauthorized" }
  }

  const validatedFields = WebsiteSchema.safeParse({
    url: formData.get("url"),
    name: formData.get("name"),
    logo: formData.get("logo"),
    description: formData.get("description"),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const websiteData = validatedFields.data

  try {
    // Check if website exists
    const existingWebsite = await prisma.website.findFirst()

    if (existingWebsite) {
      // Update existing website
      await prisma.website.update({
        where: { id: existingWebsite.id },
        data: websiteData,
      })
    } else {
      // Create new website
      await prisma.website.create({
        data: websiteData,
      })
    }

    revalidatePath("/dashboard/website")
    return { success: "Website information updated successfully" }
  } catch (error) {
    console.error("Error updating website:", error)
    return { error: "Failed to update website information" }
  }
}

export async function getWebsite() {
  try {
    const website = await prisma.website.findFirst()
    return { website }
  } catch (error) {
    console.error("Error fetching website:", error)
    return { error: "Failed to fetch website information" }
  }
}
