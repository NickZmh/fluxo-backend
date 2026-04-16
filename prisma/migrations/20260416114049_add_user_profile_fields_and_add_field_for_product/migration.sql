-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthDate" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "phone" TEXT;
