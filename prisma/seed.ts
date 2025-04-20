// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('A#b590*0404$', 10)

  const user = await prisma.user.create({
    data: {
      name: 'Abdelrahman',
      email: 'Abdelrahman74@gmail.com',
      password: hashedPassword,
      role: 'ADMIN', // Enum value
      responsibility: 'System Administrator',
    },
  })

  console.log('✅ Owner user created:', user)
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
