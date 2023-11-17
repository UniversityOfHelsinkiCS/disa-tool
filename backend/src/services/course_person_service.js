const { CoursePerson } = require('../database/models.js')

const create = {
  prepare: (data, user) => CoursePerson.build({
    course_instance_id: data.course_instance_id,
    personId: user.id,
    role: 'STUDENT'
  }),
  execute: (instance) => instance.save(),
  value: (instance) => {
    const json = instance.toJSON()
    return {
      id: json.id,
      course_instance_id: json.course_instance_id,
      personId: json.personId,
      role: json.role
    }
  }
}

// TODO: Refactor this. Just accept the id:s as parameters, this way the function is much less reusable.
// Also, it could just return the deleted person, without the sub-functions.
const deleteCourseperson = {
  prepare: (data, user) => CoursePerson.findOne({
    where: {
      course_instance_id: data.course_instance_id,
      personId: user.id
    }
  }),
  value: (instance) => {
    const json = instance.toJSON()
    return {
      id: json.id,
      course_instance_id: json.course_instance_id,
      personId: json.personId,
      role: json.role
    }
  },
  execute: (instance) => instance.destroy()
}

const updateRole = async (data) => {
  let found
  let created
  try {
    [found, created] = await CoursePerson.findOrCreate({
      where: {
        personId: data.personId, course_instance_id: data.courseInstanceId
      },
      defaults: {
        role: data.role
      }
    })
  } catch (e) { return [null, false] }
  if (!created) await found.update({ role: data.role })
  return [found, created]
}

module.exports = {
  create,
  delete: deleteCourseperson,
  updateRole
}
