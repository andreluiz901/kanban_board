-- DropForeignKey
ALTER TABLE "boards" DROP CONSTRAINT "boards_user_id_fkey";

-- AddForeignKey
ALTER TABLE "boards" ADD CONSTRAINT "boards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
