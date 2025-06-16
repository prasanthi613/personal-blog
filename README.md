# personal-blog

# 📝 Personal Blog Platform

This is a full-stack personal blogging application that allows users to create, view, and delete blog posts. The application is designed using a **component-based frontend architecture** and a **RESTful backend API**. All data is persisted in a **PostgreSQL database hosted on Supabase**, which also provides backend services such as authentication and row-level access control.

The backend handles routing, data validation, and communication with Supabase using the `@supabase/supabase-js` client. The frontend is built with React and uses `axios` to interact with the API. This project demonstrates a practical application of full-stack principles including client-server architecture, state management, API design, database integration, and secure deployment practices.

---

## 🧰 Tech Stack

### ✅ Frontend
- **React** – component-based UI framework
- **Axios** – handles HTTP requests to backend
- **React Hooks** – state and effect management
- **CSS / Inline Styling** – for UI styling (can be replaced with Tailwind)

### ✅ Backend
- **Node.js** – JavaScript runtime for backend
- **Express.js** – lightweight backend framework for routing
- **dotenv** – for managing environment variables
- **@supabase/supabase-js** – for direct communication with Supabase database

### ✅ Database
- **Supabase (PostgreSQL)** – cloud-hosted SQL database with real-time capabilities
- **Row-Level Security (RLS)** – optional access control mechanism
- **UUIDs and Timestamps** – used for unique identification and tracking

---

## 📦 Project Details


### 📝 Features
- **Add a blog post** with title, content, and author fields
- **Display all posts** in descending order by timestamp
- **Delete individual posts** using RESTful DELETE endpoint
- Automatic refresh of post list after actions (no page reload)
- Environment-based Supabase integration

---

## 🧾 Supabase Table Schema

```sql
create extension if not exists "uuid-ossp";

create table posts (
  id UUID primary key default uuid_generate_v4(),
  title TEXT not null,
  content TEXT not null,
  author TEXT not null,
  created_at TIMESTAMP default now()
);

