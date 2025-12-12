-- CreateTable
CREATE TABLE "ShortUrl" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShortUrl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "passwordHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "referrer" TEXT,
    "country" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortUrl_slug_key" ON "ShortUrl"("slug");

-- CreateIndex
CREATE INDEX "ShortUrl_slug_idx" ON "ShortUrl"("slug");

-- CreateIndex
CREATE INDEX "ShortUrl_userId_idx" ON "ShortUrl"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "analytics_slug_idx" ON "analytics"("slug");

-- CreateIndex
CREATE INDEX "analytics_createdAt_idx" ON "analytics"("createdAt");

-- AddForeignKey
ALTER TABLE "ShortUrl" ADD CONSTRAINT "ShortUrl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
