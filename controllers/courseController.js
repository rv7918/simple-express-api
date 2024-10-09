const { courses, validateCourse } = require("../models/courses");

exports.getAllCourses = (req, res) => {
  res.send(courses);
};

exports.getCourseById = (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");
  res.send(course);
};

exports.createCourse = (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  res.status(201).send(course);
};

exports.updateCourse = (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");

  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  course.name = req.body.name;
  res.status(201).send(course);
};

exports.deleteCourse = (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given id was not found");
    return;
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
};
