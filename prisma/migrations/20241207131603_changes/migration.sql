/*
  Warnings:

  - A unique constraint covering the columns `[departmentName]` on the table `Department` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Department_departmentName_key` ON `Department`(`departmentName`);
