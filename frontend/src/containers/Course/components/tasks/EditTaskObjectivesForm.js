import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Button, Form, Modal, Container } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import asyncAction from '../../../../utils/asyncAction'

import { objectivesDetails } from '../../../../api/tasks'
import { editTaskObjectives } from '../../actions/tasks'
import ChangeObjectiveMultiplier from './ChangeObjectiveMultiplier'
import ChangeAllObjectivesMultipliers from './ChangeAllObjectivesMultipliers'

const defaultMultiplier = (task, taskId, type) => {
  const multiplier = task.tasks
    .find((task) => task.id === taskId)
    .types.reduce(
      (acc, typeId) =>
        acc *
        type.headers.reduce((multiplier, header) => {
          const type = header.types.find((htype) => htype.id === typeId)
          if (!type) return multiplier
          return type.multiplier
        }, 0),
      1,
    )
  return multiplier
}

const EditTaskObjectivesForm = (props) => {
  const task = useSelector((state) => state.task)
  const type = useSelector((state) => state.type)
  const category = useSelector((state) => state.category)
  const [expanded, setExpanded] = useState(false)
  const [detailed, setDetailed] = useState(true)
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState({
    0: {
      multiplier: defaultMultiplier(task, props.taskId, type),
      modified: false,
    },
  })
  const dispatch = useDispatch()
  const taskObjectives = task.tasks
    .find((task) => task.id === props.taskId)
    .objectives.reduce((acc, curr) => ({ ...acc, [curr.id]: { multiplier: curr.multiplier } }), {})

  const objectives = category.categories.reduce(
    (acc, curr) =>
      acc.concat(
        curr.skill_levels.reduce(
          (acc2, curr2) =>
            acc2.concat(
              curr2.objectives
                .filter((objective) => taskObjectives[objective.id])
                .map((objective) => ({
                  ...objective,
                  multiplier: taskObjectives[objective.id].multiplier,
                })),
            ),
          [],
        ),
      ),
    [],
  )

  const { t } = useTranslation('translation')

  const changeMultiplier = (id) => (e) =>
    setValues({
      ...values,
      [id]: {
        ...values[id],
        multiplier: e.target.value,
      },
    })

  const changeModified = (id, modified) => () =>
    setValues({
      ...values,
      [id]: {
        ...values[id],
        multiplier: modified ? values[id].multiplier : defaultMultiplier,
        modified,
      },
    })

  const collapse = () => {
    if (expanded) {
      setExpanded(false)
    }
  }

  const asyncEditTaskObjectives = async () => {
    asyncAction(
      editTaskObjectives({
        task_id: props.taskId,
        objectives: objectives
          .map((objective) => ({
            ...(detailed ? values[objective.id] : values[0]),
            id: objective.id,
          }))
          .filter((objective) => objective.modified !== null),
      }),
      dispatch,
    ).then(collapse)
    setLoading(true)
  }

  const editTaskObjectivesSubmit = (e) => {
    e.preventDefault()
    asyncEditTaskObjectives()
  }

  const loadDetails = async () => {
    setExpanded(true)
    setLoading(true)
    const details = (await objectivesDetails({ id: props.taskId })).data.data
    setLoading(false)
    const newValues = details.reduce((acc, curr) => ({
      ...acc,
      [curr.objective_id]: {
        modified: curr.modified,
        multiplier: curr.multiplier,
      },
    }))
    setValues(newValues)
  }

  return (
    <div className="EditTaskObjectivesForm">
      <Modal
        open={expanded}
        trigger={<Button basic content={t('course.tasks.common.edit_multipliers_button')} />}
        onSubmit={editTaskObjectivesSubmit}
        onOpen={loadDetails}
        onClose={collapse}
      >
        <Modal.Content>
          <Form onSubmit={editTaskObjectivesSubmit} loading={loading}>
            <>
              <Container className="header" textAlign="right">
                <Button.Group size="large">
                  <Button
                    type="button"
                    onClick={() => setDetailed(false)}
                    content={t('course.tasks.editTaskObjectivesForm.all')}
                    color={detailed ? undefined : 'blue'}
                  />
                  <Button.Or text={t('common.or')} />
                  <Button
                    type="button"
                    onClick={() => setDetailed(true)}
                    content={t('course.tasks.editTaskObjectivesForm.detailed')}
                    color={detailed ? 'blue' : undefined}
                  />
                </Button.Group>
              </Container>
              {detailed ? (
                objectives.map((objective) =>
                  values[objective.id] ? (
                    <ChangeObjectiveMultiplier
                      key={objective.id}
                      objective={objective}
                      values={values}
                      loading={loading}
                      changeModified={changeModified}
                      changeMultiplier={changeMultiplier}
                      defaultText={t('course.tasks.common.default')}
                      orText={t('common.or')}
                      modifyText={t('course.tasks.editTaskObjectivesForm.modify')}
                    />
                  ) : null,
                )
              ) : (
                <ChangeAllObjectivesMultipliers
                  defaultMultiplier={values[0]}
                  defaultInd={0}
                  changeMultiplier={changeMultiplier}
                  changeModified={changeModified}
                  allText={t('course.tasks.editTaskObjectivesForm.all')}
                  defaultText={t('course.tasks.common.default')}
                  orText={t('common.or')}
                  modifyText={t('course.tasks.editTaskObjectivesForm.modify')}
                />
              )}
              <Button type="submit" color="green" style={{ margin: '0px 15px 0px 15px' }}>
                {t('common.save')}
              </Button>
              <Button type="reset" style={{ margin: '0px 15px 0px 15px' }} onClick={collapse}>
                {t('common.cancel')}
              </Button>
            </>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  )
}
/*
EditTaskObjectivesForm.propTypes = {
  taskId: PropTypes.number.isRequired,
  editTaskObjectives: PropTypes.func.isRequired,
  objectives: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    multiplier: PropTypes.number.isRequired
  })).isRequired,
  defaultMultiplier: PropTypes.number.isRequired,
  objectivesDetails: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
}
*/

export default connect()(EditTaskObjectivesForm)
