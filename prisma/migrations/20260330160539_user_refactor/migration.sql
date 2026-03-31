-- This is an empty migration.


-- 1. Переносимо дані
UPDATE "User"
SET 
  "firstName" = split_part(login, ' ', 1),
  "lastName" = COALESCE(NULLIF(split_part(login, ' ', 2), ''), 'Unknown')
WHERE "firstName" IS NULL;

-- 2. NOT NULL
ALTER TABLE "User"
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;

-- 3. Конвертація (якщо ще TEXT)
ALTER TABLE "User"
ALTER COLUMN "role" TYPE "UserRole"
USING "role"::text::"UserRole";

ALTER TABLE "User"
ALTER COLUMN "status" TYPE "UserStatus"
USING "status"::text::"UserStatus";

-- 4. Видаляємо login
ALTER TABLE "User"
DROP COLUMN "login";