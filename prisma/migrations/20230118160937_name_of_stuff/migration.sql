-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_ownerId_fkey";

-- CreateTable
CREATE TABLE "TestUser" (
    "id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TestCar" (
    "id" TEXT NOT NULL,
    "testUSerId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TestUser_id_key" ON "TestUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TestCar_id_key" ON "TestCar"("id");

-- AddForeignKey
ALTER TABLE "TestCar" ADD CONSTRAINT "TestCar_testUSerId_fkey" FOREIGN KEY ("testUSerId") REFERENCES "TestUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
