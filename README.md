# 🧠 Workloom API

Workloom is a modular Express.js backend built for managing teams, tasks, and projects. Designed with scalable architecture and clean routing, it demonstrates CRUD operations and relational data handling between members and tasks — all without a database.

---

## 🚀 Features

- Modular routing (Projects, Tasks, Members)
- In-memory data stores for lightweight prototyping
- Nested task assignment inside projects
- Member-task linking across all projects
- RESTful API with full CRUD support
- Built for team workflows and task visibility

---

## 🔗 API Endpoints

### 🧠 Projects

| Method | Endpoint         | Description                  |
|--------|------------------|------------------------------|
| POST   | `/projects`      | Create a new project         |
| GET    | `/projects`      | List all projects            |
| GET    | `/projects/:id`  | View specific project        |
| PUT    | `/projects/:id`  | Update a project             |
| DELETE | `/projects/:id`  | Delete a project             |

---

### ✅ Tasks (Nested in Projects)

| Method | Endpoint                              | Description                           |
|--------|---------------------------------------|---------------------------------------|
| POST   | `/projects/:projectId/tasks`          | Add task to project                   |
| GET    | `/projects/:projectId/tasks`          | Get all tasks in project              |
| DELETE | `/projects/:projectId/tasks/:taskId`  | Delete a task in a project            |

---

### 👥 Members

| Method | Endpoint              | Description                          |
|--------|-----------------------|--------------------------------------|
| POST   | `/members`            | Create a team member                 |
| GET    | `/members`            | List all members                     |
| GET    | `/members/:id`        | View member info                     |
| PUT    | `/members/:id`        | Update member                        |
| DELETE | `/members/:id`        | Remove member                        |
| GET    | `/members/:id/tasks`  | List tasks assigned to a member      |

---

## 🧪 Sample Requests

### Create Member
```json
POST /members
{
  "name": "Rajeev",
  "role": "Backend Developer",
  "email": "raj@example.com"
}
 ```
### Create Project
```json

POST /projects
{
  "name": "Team Dashboard",
  "goal": "Build internal tool",
  "deadline": "2025-12-01"
}
```
### Assign Task to Member 
```json
POST /projects/1/tasks
{
  "title": "API Setup",
  "status": "in progress",
  "assignedTo": 1
}
```
---

## ⚙️ Setup Instructions

git clone https://github.com/sz0106/workloom-api.git  
cd workloom-api  
npm install  
node server.js  
Use Postman or curl to interact with the endpoints.  
