/*
  Warnings:

  - You are about to drop the column `collumnId` on the `boards` table. All the data in the column will be lost.
  - You are about to drop the column `cardId` on the `collumns` table. All the data in the column will be lost.
  - You are about to drop the column `boardId` on the `users` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collum_id` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `board_id` to the `collumns` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "boards" DROP CONSTRAINT "boards_collumnId_fkey";

-- DropForeignKey
ALTER TABLE "collumns" DROP CONSTRAINT "collumns_cardId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_boardId_fkey";

-- AlterTable
ALTER TABLE "boards" DROP COLUMN "collumnId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "collum_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "collumns" DROP COLUMN "cardId",
ADD COLUMN     "board_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "boardId";

-- AddForeignKey
ALTER TABLE "boards" ADD CONSTRAINT "boards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collumns" ADD CONSTRAINT "collumns_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_collum_id_fkey" FOREIGN KEY ("collum_id") REFERENCES "collumns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
