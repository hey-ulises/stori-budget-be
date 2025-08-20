# 🖥️ Stori Budget Backend

This is the **Node.js + Express** backend for the Stori Budget app.  
It provides RESTful APIs for managing categories, transactions, KPIs, and AI-powered financial recommendations.  
The backend uses **Prisma ORM** with a **PostgreSQL** database hosted on AWS RDS.  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/hey-ulises/stori-budget-be.git
cd stori-budget-be
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment variables

You need to create a .env file in the root of the project with the following variables:

```env
DATABASE_URL="postgresql://username:password@hostname:5432/stori-budget-db"
OPENAI_API_KEY=your_openai_api_key
```

DATABASE_URL → Connection string for your PostgreSQL database

OPENAI_API_KEY → API key for financial recommendations 

### 4. Database setup

Run Prisma migrations to set up your database schema:

```bash
npx prisma migrate deploy
```

(Optional) To explore your database visually:

```bash
npx prisma studio
```

### 5. Run the development server
```bash
npm run dev
```
Server will start at http://localhost:3000.
