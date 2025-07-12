const express = require("express");
const router = express.Router();
const projects = require("../data/projects");
let idCounter = 1;
// Create a project

router.post("/", (req, res) => {
  const { name, goal, deadline } = req.body;
  const newProject = {
    id: idCounter++,
    name,
    goal,
    deadline,
    tasks: []
  };
  projects.push(newProject);
  res.status(201).send(newProject);
});

// Get all projects
router.get("/", (req, res) => {
  res.send(projects);
});

// Get project by ID
router.get("/:id", (req, res) => {
  const project = projects.find(p => p.id == parseInt(req.params.id));
  if (!project) return res.status(404).send("Project not found");
  res.send(project);
});

// Update project
router.put("/:id", (req, res) => {
  const project = projects.find(p => p.id == parseInt(req.params.id));
  if (!project) return res.status(404).send("Project not found");
  const { name, goal, deadline } = req.body;
  project.name = name || project.name;
  project.goal = goal || project.goal;
  project.deadline = deadline || project.deadline;
  res.send(project);
});

// Delete project
router.delete("/:id", (req, res) => {
  const index = projects.findIndex(p => p.id ==  parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Project not found");
  
  const deleted = projects.splice(index, 1);
  res.send(deleted[0]);
});

module.exports = router;
