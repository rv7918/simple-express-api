const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const courses = [
  {
    id: 1,
    name: "World Book",
  },
  {
    id: 2,
    name: "UK Book",
  },
  {
    id: 3,
    name: "USA Book",
  },
];

const validateCourse = (course) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
};

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course not available with given id");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses?.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given id was not found");

  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given id was not found");
    return;
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
