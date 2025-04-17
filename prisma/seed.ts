// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('As5900404$', 10)

  const user = await prisma.user.create({
    data: {
      name: 'AhmedHussein',
      email: 'ahmedhussein4774@gmail.com',
      password: hashedPassword,
      role: 'OWNER', // Enum value
      responsibility: 'System Owner',
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
