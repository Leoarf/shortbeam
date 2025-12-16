# ShortBeam 🔗

<div align="center">

![MERN](https://img.shields.io/badge/T3-Stack-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.0.8-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.17.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.3-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

**✨ Live Demo:** [https://shortbeam.vercel.app](https://shortbeam.vercel.app)

</div>

## 🎯 **About**

A **high-performance, modern URL shortener** built with the T3 Stack. Transform long URLs into short, memorable links with detailed analytics, user accounts, and enterprise-grade infrastructure.

## 🚀 **Key Features**

### 🔗 **Core Functionality**

- **Fast URL Shortening** - Convert long URLs to short links in under 1 second
- **Custom Slugs** - Create branded links like `shortbeam.vercel.app/yourlink`
- **User Accounts** - Save, manage, and organize your links
- **Secure Links** - All URLs are protected and verified with database encryption

### 📊 **Advanced Analytics** _(Real-time)_

- **Click Tracking** - Monitor clicks as they happen
- **Geolocation** - See clicks by country & city
- **Referrer Analysis** - Identify traffic sources
- **Device Detection** - Know visitor devices
- **Complete History** - Full historical data access

### ⚡ **Management**

- **Dashboard** - Centralized link management
- **Link Statistics** - Detailed performance metrics

### 🛡️ **Security & Performance**

- **PostgreSQL Database** - Robust and reliable data storage
- **Prisma ORM** - Type-safe database operations
- **Database Indexes** - 8 optimized indexes for fast queries
- **Encryption** - Secure data storage and transmission

## 🏗️ **Tech Stack**

### **What is T3 Stack?**

The **T3 Stack** is an opinionated, full-stack TypeScript development stack focused on simplicity, type safety, and developer experience. ShortBeam implements T3 principles with:

**Frontend:** Next.js 16 • React 19 • TypeScript • Tailwind CSS • React Hook Form  
**Backend:** Next.js API Routes • Prisma • PostgreSQL • Bcrypt • Zod  
**Database:** PostgreSQL with Prisma ORM • 8 Optimized Indexes  
**Deployment:** Vercel (Full-stack) • PostgreSQL Cloud Database

## 🗄️ **Database Architecture**

| **Models** | **Fields** | **Indexes** | **Relations**   |
| ---------- | ---------- | ----------- | --------------- |
| 3          | 14         | 8           | User ↔ ShortUrl |

### **Schema Overview**

- **ShortUrl Model** - Core URL shortening functionality
- **User Model** - Authentication and account management
- **Analytics Model** - Detailed click tracking and statistics

## 📦 **Quick Start**

```bash
# Clone repository
git clone https://github.com/Leoarf/shortbeam.git
cd shortbeam

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your PostgreSQL credentials and secrets

# Set up database
npx prisma db push
npx prisma generate

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start using ShortBeam!

## 🌐 **Environment Variables**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/shortbeam"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
BASE_URL="http://localhost:3000"
```

## 📊 **Performance Metrics**

- **Link Processing**: < 1 second
- **Database Queries**: Optimized with 8 indexes
- **API Response**: < 100ms average
- **Uptime**: 99.9% target

## 🚢 **Deployment**

### **Vercel Deployment**

**Frontend & Backend:** Deployed on Vercel using a single Next.js application  
**Database:** PostgreSQL hosted on Neon (cloud-based)

## 🛡️ **Security Features**

- **Password Hashing** - Bcrypt with salt rounds
- **SQL Injection Prevention** - Prisma ORM protection
- **Rate Limiting** - API endpoint protection
- **HTTPS Enforcement** - Secure connections only
- **Data Encryption** - Database-level security

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 **Author**

**Leonardo** • [GitHub](https://github.com/Leoarf) • [LinkedIn](https://www.linkedin.com/in/leoarf/)

---

<div align="center">

### ⭐ **If you find this project useful, please give it a star!**

**Built with ❤️ using the T3 Stack • Deployed on Vercel**

</div>
