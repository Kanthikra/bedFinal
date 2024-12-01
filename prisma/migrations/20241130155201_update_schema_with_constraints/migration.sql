/*
  Warnings:

  - You are about to drop the column `aboutMe` on the `Host` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Host` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `Host` table. All the data in the column will be lost.
  - You are about to drop the column `bathRoomCount` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `bedroomCount` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `maxGuestCount` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.
  - Added the required column `dateJoined` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxGuests` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numBathrooms` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numBedrooms` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateJoined` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Host" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "dateJoined" DATETIME NOT NULL
);
INSERT INTO "new_Host" ("email", "id", "password", "phoneNumber", "username") SELECT "email", "id", "password", "phoneNumber", "username" FROM "Host";
DROP TABLE "Host";
ALTER TABLE "new_Host" RENAME TO "Host";
CREATE UNIQUE INDEX "Host_username_key" ON "Host"("username");
CREATE UNIQUE INDEX "Host_email_key" ON "Host"("email");
CREATE INDEX "Host_username_idx" ON "Host"("username");
CREATE TABLE "new_Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hostId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "pricePerNight" REAL NOT NULL,
    "maxGuests" INTEGER NOT NULL,
    "numBedrooms" INTEGER NOT NULL,
    "numBathrooms" INTEGER NOT NULL
);
INSERT INTO "new_Property" ("description", "hostId", "id", "pricePerNight") SELECT "description", "hostId", "id", "pricePerNight" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
CREATE INDEX "Property_hostId_idx" ON "Property"("hostId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateJoined" DATETIME NOT NULL,
    "phoneNumber" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "password", "phoneNumber", "username") SELECT "email", "id", "password", "phoneNumber", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
