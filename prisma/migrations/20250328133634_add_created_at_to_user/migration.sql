-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "chips" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);
