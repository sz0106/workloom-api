const express = require("express");
const router = express.Router();
const members = require("../data/members");
const projects = require("../data/projects");


let memberIdCounter = 1;

// Create a member
router.post("/", (req, res) => {
  const { name, role, email } = req.body;

  const newMember = {
    id: memberIdCounter++,
    name,
    role,
    email
  };

  members.push(newMember);
  res.status(201).send(newMember);
});

// Get all members
router.get("/", (req, res) => {
  res.send(members);
});

// Get a member by ID
router.get("/:id", (req, res) => {
  const member = members.find(m => m.id === parseInt(req.params.id));
  if (!member) return res.status(404).send({ error: "Member not found" });
  res.send(member);
});

// Update a member
router.put("/:id", (req, res) => {
  const member = members.find(m => m.id === parseInt(req.params.id));
  if (!member) return res.status(404).send({ error: "Member not found" });

  const { name, role, email } = req.body;
  member.name = name || member.name;
  member.role = role || member.role;
  member.email = email || member.email;

  res.send(member);
});

// Delete a member
router.delete("/:id", (req, res) => {
  const index = members.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send({ error: "Member not found" });

  const deleted = members.splice(index, 1);
  res.send(deleted[0]);
});

// Get all tasks assigned to a member
router.get("/:id/tasks", (req, res) => {
  const memberId = parseInt(req.params.id);
  let assignedTasks = [];

  projects.forEach(project => {
    project.tasks.forEach(task => {
      if (task.assignedTo === memberId) {
        assignedTasks.push({
          taskId: task.id,
          title: task.title,
          status: task.status,
          projectId: project.id,
          projectName: project.name
        });
      }
    });
  });

  if (assignedTasks.length === 0) {
    return res.status(404).send({ message: "No tasks assigned to this member." });
  }

  res.send(assignedTasks);
});


module.exports = router;
