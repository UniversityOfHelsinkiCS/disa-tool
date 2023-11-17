const { Objective, SkillLevel, TaskObjective } = require('../database/models.js')
const editServices = require('../utils/editServices.js')

const create = {
  prepare: (data) => {
    const instance = SkillLevel.build({
      course_instance_id: data.course_instance_id,
      eng_name: data.eng_name,
      fin_name: data.fin_name,
      swe_name: data.swe_name,
      order: data.order
    })
    return instance
  },
  execute: (instance) => instance.save(),
  value: (instance, lang) => {
    const json = instance.toJSON()
    return {
      id: json.id,
      name: json[`${lang}_name`],
      order: json.order
    }
  }
}

const deleteLevel = {
  prepare: async (id) => {
    const instance = await SkillLevel.findByPk(id, {
      include: {
        model: Objective,
        attributes: ['id'],
        include: {
          model: TaskObjective,
          attributes: ['task_id']
        }
      }
    })
    return instance
  },
  value: (instance) => {
    const json = instance.toJSON()
    const tasks = {}
    json.objectives.forEach((objective) => {
      objective.task_objectives.forEach((taskObjective) => {
        if (!tasks[taskObjective.task_id]) {
          tasks[taskObjective.task_id] = {
            id: taskObjective.task_id,
            objective_ids: []
          }
        }
        tasks[taskObjective.task_id].objective_ids.push(objective.id)
      })
    })
    return {
      id: json.id,
      tasks: Object.values(tasks)
    }
  },
  execute: (instance) => {
    instance.destroy()
  }
}

const { details, edit } = editServices(
  SkillLevel,
  {},
  {
    attributes: ['id', 'course_instance_id'],
    saveFields: [
      'eng_name',
      'fin_name',
      'swe_name',
      'order'
    ],
    valueFields: [
      'id',
      ['lang_name', 'name'],
      'order'
    ]
  }
)

module.exports = {
  create,
  delete: deleteLevel,
  details,
  edit
}
