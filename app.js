// require("dotenv").config();
const express = require("express");
const app = express();
const courses = require("./routes/courses");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());
app.use("/api/courses", courses);

// Use global error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
