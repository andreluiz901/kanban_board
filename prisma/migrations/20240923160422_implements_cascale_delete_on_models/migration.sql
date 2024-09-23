-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_collum_id_fkey";

-- DropForeignKey
ALTER TABLE "collumns" DROP CONSTRAINT "collumns_board_id_fkey";

-- AddForeignKey
ALTER TABLE "collumns" ADD CONSTRAINT "collumns_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_collum_id_fkey" FOREIGN KEY ("collum_id") REFERENCES "collumns"("id") ON DELETE CASCADE ON UPDATE CASCADE;
