const { Objective, TaskObjective, Category, SkillLevel, Task } = require('../database/models.js')
const editServices = require('../utils/editServices.js')

const create = {
  prepare: async (data) => {
    const instance = Objective.build({
      eng_name: data.eng_name,
      fin_name: data.fin_name,
      swe_name: data.swe_name,
      course_instance_id: data.course_instance_id,
      category_id: data.category_id,
      skill_level_id: data.skill_level_id,
      order: data.order
    })
    const [category, skillLevel] = await Promise.all([
      Category.findByPk(data.category_id, {
        attributes: ['course_instance_id']
      }),
      SkillLevel.findByPk(data.skill_level_id, {
        attributes: ['course_instance_id']
      })
    ])
    return {
      instance,
      category,
      skillLevel
    }
  },
  execute: (instance) => instance.save(),
  value: (instance, lang) => {
    const json = instance.toJSON()
    return {
      id: json.id,
      name: json[`${lang}_name`],
      category_id: json.category_id,
      skill_level_id: json.skill_level_id,
      order: json.order
    }
  }
}

const deleteObjective = {
  prepare: (id) => Objective.findByPk(id, {
    include: {
      model: TaskObjective,
      attributes: ['task_id']
    }
  }),
  value: (instance) => {
    const json = instance.toJSON()
    return {
      id: json.id,
      category_id: json.category_id,
      skill_level_id: json.skill_level_id,
      task_ids: json.task_objectives.map((taskObjective) => taskObjective.task_id)
    }
  },
  execute: (instance) => instance.destroy()
}

const taskDetails = async (id, lang) => {
  const name = [`${lang}_name`, 'name']
  const result = (await Objective.findByPk(id, {
    attributes: ['id', name],
    include: {
      required: false,
      model: Task,
      attributes: [name],
      through: {
        attributes: ['multiplier']
      }
    },
    order: [
      [Task, 'order', 'ASC']
    ]
  })).toJSON()
  result.tasks = result.tasks.map((task) => ({
    ...task,
    multiplier: task.task_objective.multiplier,
    types: undefined,
    task_objective: undefined
  }))
  return result
}

const { details, edit } = editServices(
  Objective,
  {},
  {
    attributes: ['id', 'category_id', 'skill_level_id', 'eng_name', 'fin_name', 'swe_name'],
    include: [
      {
        model: Category,
        attributes: ['id', 'course_instance_id']
      },
      {
        model: SkillLevel,
        attributes: ['id', 'course_instance_id']
      }
    ],
    saveFields: [
      'eng_name',
      'fin_name',
      'swe_name',
      'category_id',
      'skill_level_id',
      'order'
    ],
    valueFields: [
      'id',
      ['lang_name', 'name'],
      'category_id',
      'skill_level_id',
      'order'
    ]
  }
)

const getObjectivesBySkillCourseCategory = (skillLevelId, courseInstanceId, categoryId) => (
  Objective.findAll({
    where: {
      skill_level_id: skillLevelId,
      course_instance_id: courseInstanceId,
      category_id: categoryId
    },
    include: Task
  })
)

module.exports = {
  create,
  delete: deleteObjective,
  taskDetails,
  details,
  edit,
  getObjectivesBySkillCourseCategory
}
