const express = require("express");
const router = express.Router();
const projects = require("../data/projects");
const members = require("../data/members");

// Add a task to a project
router.post("/:projectId/tasks", (req, res) => {
  const { projectId } = req.params;
  const { title, status, assignedTo } = req.body;

  const project = projects.find(p => p.id === parseInt(projectId));
  if (!project) return res.status(404).send({ error: "Project not found" });

  const newTask = {
    id: project.tasks.length + 1,
    title,
    status: status || "pending",
    assignedTo: parseInt(assignedTo)
};

  project.tasks.push(newTask);
  res.status(201).send(newTask);
});

// Get all tasks in a project
router.get("/:projectId/tasks", (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.projectId));
  if (!project) return res.status(404).send({ error: "Project not found" });

  // Enrich tasks with member info
  const enrichedTasks = project.tasks.map(task => {
    const member = members.find(m => m.id === task.assignedTo);
    return {
      ...task,
      assignedMember: member ? { name: member.name, role: member.role } : null
    };
  });

  res.send(enrichedTasks);
});

// Delete a task from a project
router.delete("/:projectId/tasks/:taskId", (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.projectId));
  if (!project) return res.status(404).send({ error: "Project not found" });

  const index = project.tasks.findIndex(t => t.id === parseInt(req.params.taskId));
  if (index === -1) return res.status(404).send({ error: "Task not found" });

  const deleted = project.tasks.splice(index, 1);
  res.send(deleted[0]);
});

module.exports = router;
