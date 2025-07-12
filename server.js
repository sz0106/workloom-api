const express = require("express");
const app = express();

app.use(express.json());

const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const memberRoutes = require("./routes/memberRoutes");

app.use("/projects", projectRoutes);
app.use("/projects", taskRoutes); // since tasks are nested under projects
app.use("/members", memberRoutes);

// Default route
app.get("/", (req, res) => {
  res.send(" Workloom API is up and weaving!");
});

// Listen on port 3000
app.listen(3000, () => {
  console.log(" Server running at http://localhost:3000");
});



