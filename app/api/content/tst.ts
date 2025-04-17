// app/api/content/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const contentFilePath = path.join(process.cwd(), 'public/locales/en.json')

export async function PUT(request: Request) {
  try {
    const { user } = await authenticateRequest(request)
    if (!user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const updates = await request.json()
    const currentContent = JSON.parse(await fs.readFile(contentFilePath, 'utf-8'))
    
    // Deep merge updates
    const updatedContent = deepMerge(currentContent, updates)
    
    await fs.writeFile(contentFilePath, JSON.stringify(updatedContent, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    )
  }
}

function deepMerge(target: any, source: any) {
  for (const key in source) {
    if (source[key] instanceof Object && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {}
      deepMerge(target[key], source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

async function authenticateRequest(request: Request) {
  // Implement your authentication logic here
  return { user: { isAdmin: true } } // Simplified for example
}