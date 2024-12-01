/*
  Warnings:

  - Added the required column `profilePicture` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Host" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "dateJoined" DATETIME
);
INSERT INTO "new_Host" ("dateJoined", "email", "firstName", "id", "lastName", "password", "phoneNumber", "username") SELECT "dateJoined", "email", "firstName", "id", "lastName", "password", "phoneNumber", "username" FROM "Host";
DROP TABLE "Host";
ALTER TABLE "new_Host" RENAME TO "Host";
CREATE UNIQUE INDEX "Host_username_key" ON "Host"("username");
CREATE UNIQUE INDEX "Host_email_key" ON "Host"("email");
CREATE INDEX "Host_username_idx" ON "Host"("username");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "dateJoined" DATETIME,
    "phoneNumber" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL
);
INSERT INTO "new_User" ("dateJoined", "email", "firstName", "id", "lastName", "password", "phoneNumber", "username") SELECT "dateJoined", "email", "firstName", "id", "lastName", "password", "phoneNumber", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
