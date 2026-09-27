CHREMIO

«Manage your money. Build your future.»

Chremio is a full-stack personal finance tracker designed to help users manage their income, expenses, and overall financial activity from one place.

Users can create an account, record income and expenses, monitor their balance, and understand their spending habits through interactive dashboards and analytics.

Built as Task 3 — Expense Tracker Web Application for the Full Stack Development Internship at Auspify Technologies.

<p align="center">
  <a href="https://chremio.vercel.app/">
    <strong>🚀 View Live Demo</strong>
  </a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://github.com/uknicTjstyles/Chremio">
    <strong>💻 View Repository</strong>
  </a>
</p>---

📸 Screenshots

Dashboard

<p align="center">
  <img src="docs/screenshots/dashboard.jpg" alt="Chremio Dashboard" width="850">
</p>Transactions

<p align="center">
  <img src="docs/screenshots/transactions.jpg" alt="Chremio Transactions" width="850">
</p>Analytics

<p align="center">
  <img src="docs/screenshots/analytics.jpg" alt="Chremio Analytics" width="850">
</p>Mobile Menu

<p align="center">
  <img src="docs/screenshots/mobile-menu.png" alt="Chremio Mobile Menu" width="350">
</p>---

✨ Features

🔐 Accounts & Security

- Sign up and sign in with email and password
- Passwords securely hashed with "bcrypt"
- Signed "httpOnly" session cookies
- Password changes automatically invalidate existing sessions
- Profile management
- Update account name
- Change password
- Delete account and associated transactions

💰 Transaction Management

- Add income and expense records
- Edit existing transactions
- Delete transactions
- Transaction categories
- Descriptions and dates
- Search transactions
- Filter by transaction type
- Filter by category
- View total income
- View total spending
- View current net balance

📊 Dashboard & Analytics

- Current total balance
- Monthly income
- Monthly spending
- Recent transactions
- Spending-by-category donut chart
- Six-month income vs. spending chart
- Savings rate
- Average monthly spending
- Category breakdown
- Dedicated analytics dashboard

🎨 User Experience

- Modern dark-themed interface
- Consistent Chremio brand identity
- Fully responsive design
- Desktop sidebar navigation
- Mobile hamburger menu
- Toast notifications for success and error states
- Page-loading progress bar
- Loading spinners
- Input icons
- Show/hide password functionality

---

📋 Task Requirements

Requirement| Implementation
Design dashboard screens| Dashboard, Transactions, Analytics and Profile pages
Create expense management APIs| REST API routes for transactions, summary and profile
Store financial records in a database| MongoDB Atlas with Mongoose
Display reports and summaries| Dashboard cards, charts and Analytics page
Implement authentication| Email/password authentication with session cookies

---

🛠️ Tech Stack

Area| Technology
Framework| Next.js (App Router)
Frontend| React
Language| TypeScript
Styling| Tailwind CSS
Database| MongoDB Atlas
ODM| Mongoose
Authentication| "jose" + signed JWT cookies
Password Hashing| "bcryptjs"
Charts| Recharts
Notifications| React Toastify
Deployment| Vercel

---

🚀 Getting Started

Prerequisites

Before running Chremio locally, make sure you have:

- Node.js 20.9 or newer
- A MongoDB Atlas account and cluster
- Git

1. Clone the Repository

git clone https://github.com/uknicTjstyles/Chremio.git
cd Chremio

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a ".env.local" file in the root of the project:

MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/chremio?retryWrites=true&w=majority
AUTH_SECRET=<your-long-random-secret>

You can use ".env.example" as a reference if it is included in the repository.

4. Generate an Authentication Secret

You can generate a secure secret using:

openssl rand -base64 32

Copy the generated value into "AUTH_SECRET".

5. Start the Development Server

npm run dev

Then open:

http://localhost:3000

6. Test the Production Build

npm run build
npm start

---

🔑 Environment Variables

Variable| Description
"MONGODB_URI"| MongoDB Atlas connection string, including the "chremio" database
"AUTH_SECRET"| Secret used to sign and validate user sessions

«⚠️ Never commit ".env.local" or expose your authentication secrets publicly.»

---
📁 Project Structure

Chremio/
│
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   │
│   ├── (app)/
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   ├── analytics/
│   │   └── profile/
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── logout/
│   │   │   └── register/
│   │   │
│   │   ├── profile/
│   │   ├── summary/
│   │   └── transactions/
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── charts/
│   ├── forms/
│   ├── layout/
│   └── ui/
│
├── lib/
│   ├── database/
│   ├── auth/
│   └── utils/
│
├── models/
│   ├── User.ts
│   └── Transaction.ts
│
├── public/
│   └── brand/
│
├── docs/
│   └── screenshots/
│       ├── dashboard.jpg
│       ├── transactions.jpg
│       ├── analytics.jpg
│       └── mobile-menu.png
│
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md

---

🔌 API Reference

All protected routes require an authenticated user session.

Authentication

Method| Route| Description
"POST"| "/api/auth/register"| Create a new account
"POST"| "/api/auth/login"| Sign in
"POST"| "/api/auth/logout"| Sign out

Transactions

Method| Route| Description
"GET"| "/api/transactions"| Retrieve transactions
"POST"| "/api/transactions"| Create a transaction
"PUT"| "/api/transactions/:id"| Update a transaction
"DELETE"| "/api/transactions/:id"| Delete a transaction

The transactions endpoint supports filters such as:

?q=food
&type=expense
&category=Food

Summary & Analytics

Method| Route| Description
"GET"| "/api/summary"| Retrieve balance, monthly totals, category data and chart data

Profile

Method| Route| Description
"PATCH"| "/api/profile"| Update account name
"PUT"| "/api/profile/password"| Change password and invalidate existing sessions
"DELETE"| "/api/profile"| Delete account and associated transactions

---

🛡️ Security

Chremio implements several security measures to protect user accounts and financial data:

- Passwords are hashed using "bcrypt"
- Passwords are never stored in plain text
- Authentication cookies use the "httpOnly" flag
- Transactions are scoped to the authenticated user's account
- Users cannot access another user's transactions
- Session versions are tied to user accounts
- Changing a password invalidates older sessions
- Deleting an account also invalidates its sessions
- Sensitive configuration values are stored in environment variables
- Secrets are excluded from version control

---

☁️ Deployment

Chremio is deployed using Vercel.

Deploying Your Own Instance

1. Import the GitHub repository into Vercel.
2. Add the required environment variables:
   - "MONGODB_URI"
   - "AUTH_SECRET"
3. Configure MongoDB Atlas network access so your deployment can connect to the database.
4. Deploy the application.

After deployment, pushes to the configured production branch can trigger automatic deployments through Vercel.

---

🔮 Future Improvements

Some planned improvements include:

- [ ] Monthly budgets with progress tracking
- [ ] Savings goals
- [ ] CSV transaction export
- [ ] Recurring transactions
- [ ] More detailed financial reports
- [ ] Improved financial insights
- [ ] Additional chart visualizations

---

👨‍💻 Author

Tehillah Eneye Jamgbadi

Computer Engineering
Full Stack Development Intern — Auspify Technologies

---

🔗 Links

Live Application:
https://chremio.vercel.app/

GitHub Repository:
https://github.com/uknicTjstyles/Chremio

---

<p align="center">
  Built with ❤️ using Next.js, TypeScript, MongoDB and Tailwind CSS.
</p>
