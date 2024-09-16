/*
  Warnings:

  - Added the required column `order` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `collumns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "boards" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "collumns" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ;
