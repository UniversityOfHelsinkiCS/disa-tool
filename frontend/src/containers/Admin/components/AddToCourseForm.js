import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Button, Dropdown, Form, Label } from 'semantic-ui-react'
import asyncAction from '../../../utils/asyncAction'

import { getAllCourses, selectCourse } from '../../CourseList/actions/courses'
import { getInstancesOfCourse, selectInstance } from '../../CourseList/actions/courseInstances'
import { addPersonToCourse } from '../actions/coursePersons'

import ModalForm, { saveActions } from '../../../utils/components/ModalForm'
import { useTranslation } from 'react-i18next'

const AddToCourseForm = (props) => {
  const [role, setRole] = useState('STUDENT')
  const dispatch = useDispatch()
  const alreadyOnCourse = ownProps.person.course_people.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.course_instance_id]: true,
    }),
    {},
  )
  const { courses, selectedInstance, selectedCourse } = useSelector((state) => state.listCourses)
  const { instances } = useSelector((state) =>
    state.listCourses.instances.filter((instance) => !alreadyOnCourse[instance.id]),
  )

  const getAllCoursesAsync = async () => {
    const response = await getAllCourses()
    dispatch(response)
  }

  const getInstancesOfCourseAsync = async (value) => {
    const response = await getInstancesOfCourse(value)
    dispatch(response)
  }

  const onModalOpen = async () => {
    await getAllCoursesAsync()
    dispatch(selectInstance(null))
  }

  const addToCourseSubmit = () => {
    if (!props.selectedInstance) return
    props.addPersonToCourse({
      courseInstanceId: selectedInstance.id,
      personId: props.person.id,
      role: state.role,
      course_instance: { name: selectedInstance.name },
    })
  }

  const changeCourse = (e, { value }) => {
    if (value && value !== props.selectedCourse) {
      dispatch(selectCourse(value))
      dispatch(selectInstance(undefined))
      getInstancesOfCourseAsync(value)
    }
  }

  const changeInstance = (e, { value }) => dispatch(selectInstance(value))

  const changeRole = (role) => () => setRole(role)

  const { t } = useTranslation('translation', { keyPrefix: 'admin.addToCourseForm' })

  const contentPrompt = [t('prompt_1'), props.person.name, t('prompt_2')].join(' ')
  const actions = saveActions(t)
  if (!selectedInstance) {
    const index = actions.findIndex((action) => !action.props.type)
    actions[index] = React.cloneElement(actions[index], { disabled: true })
  }
  return (
    <div className="AddToCourseForm">
      <ModalForm
        header={t('header')}
        trigger={<Button color="blue">{t('trigger')}</Button>}
        onOpen={onModalOpen}
        actions={actions}
        onSubmit={addToCourseSubmit}
      >
        <p>{contentPrompt}.</p>
        <Form.Field inline>
          <Label>{t('course')}</Label>
          <Dropdown
            selection
            fluid
            onChange={changeCourse}
            value={selectedCourse ? selectedCourse.id : undefined}
            options={courses.map((course) => ({
              key: course.id,
              text: course.name,
              value: course.id,
            }))}
          />
        </Form.Field>
        <Form.Field inline disabled={!selectedCourse}>
          <Label>{t('instance')}</Label>
          <Dropdown
            selection
            fluid
            onChange={changeInstance}
            value={selectedInstance ? selectedInstance.id : undefined}
            options={instances.map((instance) => ({
              key: instance.id,
              text: instance.name,
              value: instance.id,
            }))}
          />
        </Form.Field>
        <Form.Field>
          <Button.Group>
            <Button type="button" onClick={changeRole('STUDENT')} inverted={state.role !== 'STUDENT'} color="green">
              {t('student_button')}
            </Button>
            <Button type="button" onClick={changeRole('TEACHER')} inverted={role !== 'TEACHER'} color="green">
              {t('teacher_button')}
            </Button>
          </Button.Group>
        </Form.Field>
      </ModalForm>
    </div>
  )
}
/*
AddToCourseForm.propTypes = {
  t: PropTypes.func.isRequired,
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    course_people: PropTypes.arrayOf(PropTypes.shape({
      course_instance_id: PropTypes.number.isRequired
    })).isRequired
  }).isRequired,
  getAllCourses: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  instances: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  selectedCourse: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }),
  selectedInstance: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }),
  selectCourse: PropTypes.func.isRequired,
  selectInstance: PropTypes.func.isRequired,
  getInstancesOfCourse: PropTypes.func.isRequired,
  addPersonToCourse: PropTypes.func.isRequired
}
*/

export default connect()(AddToCourseForm)
