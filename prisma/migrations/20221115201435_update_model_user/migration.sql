/*
  Warnings:

  - You are about to drop the column `accountId` on the `users` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `balance` on the `accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `value` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_accountId_fkey";

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "accountId" TEXT NOT NULL,
DROP COLUMN "balance",
ADD COLUMN     "balance" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "value",
ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "accountId";

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
