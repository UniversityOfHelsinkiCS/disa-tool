/* eslint-disable no-console */
const { sequelize } = require('./connection')
const categories = require('./seeds/categories.json')
const skillLevels = require('./seeds/skill_levels.json')
const courses = require('./seeds/courses.json')
const newObjectives = require('./seeds/objectives_new.json')
const taskResponses = require('./seeds/task_responses.json')

const {
  Task,
  TaskType,
  Category,
  Objective,
  TaskObjective,
  SkillLevel,
  Course,
  CourseInstance,
  Person,
  CoursePerson,
  TaskResponse,
  TypeHeader,
  Type
} = require('./models')

const {
  getStudentsAndTeachers,
  getCourseTasks,
  getTaskObjectives,
  getTypeHeaders,
  getTypes,
  getTaskTypes,
  getCoursePersons
} = require('./seeds/fakerData')

const MAX_INSTANCES = 6

const randBetween = (start, end) => Math.floor(Math.random() * (end - start) + start)

const createCategories = () => Category.bulkCreate(categories, { returning: ['*'] })

const createSkillLevels = () => SkillLevel.bulkCreate(skillLevels, { returning: ['*'] })

const createCourses = () => Course.bulkCreate(courses, { returning: ['*'] })

const createPersons = (persons) => Person.bulkCreate(persons, { returning: ['*'] })

const createCourseInstances = (listOfCourses, maxInstances) => {
  const instances = []
  listOfCourses.map((course) => {
    // Hardcoded linis amount to three to match the amount of objectives in objective_new.json
    const n = course.eng_name === 'Lineaarialgebra ja matriisilaskenta I' ? 3 : randBetween(0, maxInstances)
    for (let i = 0; i < n; i += 1) {
      const semester = Math.random() >= 0.5 ? 'syksy' : 'kevät'
      const name = `${course.fin_name} ${semester} ${2018 + i}`
      instances.push({
        fin_name: name,
        eng_name: name,
        swe_name: name,
        active: Math.random() >= 0.5,
        course_id: course.id
      })
    }
    return true
  })
  return CourseInstance.bulkCreate(instances, { returning: ['*'] })
  // CourseInstance.bulkCreate(courseInstances, { returning: ['*'] })
}

const createObjectives = () => Objective.bulkCreate(newObjectives, { returning: ['*'] })

const createCoursePersons = (coursePersons) => CoursePerson.bulkCreate(coursePersons)

const createTasks = (tasks) => Task.bulkCreate(tasks, { returning: ['*'] })

const createTaskObjectives = (taskObjectives) => TaskObjective.bulkCreate(taskObjectives, { returning: ['*'] })

const createTaskResponses = () => TaskResponse.bulkCreate(taskResponses, { returning: ['*'] })

const createTypeHeaders = (typeHeaders) => TypeHeader.bulkCreate(typeHeaders, { returning: ['*'] })

const createTypes = (types) => Type.bulkCreate(types, { returning: ['*'] })

const createTaskTypes = (courseInstances, typeHeaders, tasks, types) => TaskType.bulkCreate(
  getTaskTypes(courseInstances, typeHeaders, tasks, types)
)

const run = async () => {
  await sequelize.sync({ force: true })
  console.log('forced')
  const createdCourses = (await createCourses()).map((db0) => db0.toJSON())
  console.log('courses created')
  const createdPersons = (await createPersons(getStudentsAndTeachers())).map((db0) => db0.toJSON())
  console.log('persons created')
  const createdCourseInstances = (await createCourseInstances(createdCourses, MAX_INSTANCES)).map((db0) => db0.toJSON())
  console.log('course instances created')
  await createCoursePersons(getCoursePersons(createdPersons, createdCourseInstances))
  console.log('coursePersons created')
  await createCategories()
  console.log('categories created')
  await createSkillLevels()
  console.log('skill levels created')
  const createdObjectives = (await createObjectives()).map((db0) => db0.toJSON())
  console.log('objectives created')
  const createdTasks = (await createTasks(getCourseTasks(createdCourseInstances))).map((db0) => db0.toJSON())
  console.log('tasks created')
  await createTaskObjectives(getTaskObjectives(createdTasks, createdObjectives, createdCourseInstances))
  console.log('task objectives created')
  await createTaskResponses()
  console.log('task responses created')
  const createdTypeHeaders = (await createTypeHeaders(
    getTypeHeaders(createdCourseInstances))).map((db0) => db0.toJSON())
  console.log('type headers created')
  const createdTypes = (await createTypes(getTypes(createdTypeHeaders))).map((db0) => db0.toJSON())
  console.log('types created')
  await createTaskTypes(createdCourseInstances, createdTypeHeaders, createdTasks, createdTypes)
  console.log('task types created')
  console.log('ALL DONE')
  process.exit()
}

run()
