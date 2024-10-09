const Joi = require("joi");

// Dummy in-memory data
const courses = [
  { id: 1, name: "World Book" },
  { id: 2, name: "UK Book" },
  { id: 3, name: "USA Book" },
];

// Joi validation schema
const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
};

module.exports = {
  courses,
  validateCourse,
};
