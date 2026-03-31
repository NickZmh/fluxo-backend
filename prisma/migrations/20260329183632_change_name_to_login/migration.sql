/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `login` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- 1. додаємо нові поля (без NOT NULL)
ALTER TABLE "User" ADD COLUMN "login" TEXT;
ALTER TABLE "User" ADD COLUMN "password" TEXT;

-- 2. переносимо дані з name → login
UPDATE "User" SET login = name;

-- 3. задаємо пароль (тимчасово)
UPDATE "User" SET password = 'temp';

-- 4. робимо поля обов’язковими
ALTER TABLE "User" ALTER COLUMN "login" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;

-- 5. видаляємо старе поле
ALTER TABLE "User" DROP COLUMN "name";