import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Accordion, Button, Dropdown, Icon, List } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import { findPeople } from '../../api/persons'
import { updateCoursePersonsAction, deleteCoursePersonAction } from '../../actions/actions'

const ManageCoursePeople = (props) => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [searchPeople, setSearchPeople] = useState([])
  const [newStudent, setNewStudent] = useState({})
  const { people } = props
  const { t } = useTranslation('translation', { keyPrefix: 'userPage.manageCoursePeople' })
  const dispatch = useDispatch()

  const asyncUpdateCoursePersonsAction = async (formattedRequest) => {
    await updateCoursePersonsAction(formattedRequest, dispatch)
  }

  const asyncDeleteCoursePersonAction = async (formattedRequest) => {
    await deleteCoursePersonAction(formattedRequest, dispatch)
  }

  const handleAccordion = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
  }

  const handleRoleChange = (e, { person, value }) => {
    const formattedRequest = [
      {
        person_id: person.id,
        course_instance_id: props.activeCourse.id,
        role: value,
      },
    ]
    asyncUpdateCoursePersonsAction(formattedRequest)
  }

  const handleSearchChange = (e, { searchQuery }) => {
    if (searchQuery.length > 2) {
      findPeople(searchQuery).then((res) =>
        setSearchPeople(
          // filter out people already on course
          res.data.filter((person) => !props.people.find((p) => p.id === person.id)),
        ),
      )
    }
  }

  const handleAddStudentToCourse = (e, { value }) => {
    if (e.target.name === 'studentAddButton') {
      const formattedRequest = [
        {
          person_id: newStudent.id,
          course_instance_id: props.activeCourse.id,
          role: 'STUDENT',
        },
      ]
      asyncUpdateCoursePersonsAction(formattedRequest).then(() => setNewStudent({}))
    } else {
      setNewStudent(searchPeople.find((person) => person.id === value) || {})
    }
  }

  const handleRemoveFromCourse = (e, { value }) => {
    const formattedRequest = {
      id: value,
      course_instance_id: props.activeCourse.id,
    }
    asyncDeleteCoursePersonAction(formattedRequest)
  }

  const isTeacher = (person) => person.course_instances[0].course_person.role === 'TEACHER'

  return (
    <Accordion styled fluid>
      <Accordion.Title active={activeIndex === 0} index={0} onClick={handleAccordion}>
        <Icon name="dropdown" />
        {t('manage_course_people')}
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <h5>{t('add_a_user')}</h5>
        <Dropdown
          name="studentSelector"
          closeOnChange
          closeOnBlur
          selection
          search
          placeholder={t('search_student')}
          value={newStudent.id}
          options={searchPeople.map((person) => ({
            key: person.id,
            text: person.name,
            value: person.id,
          }))}
          onChange={handleAddStudentToCourse}
          onSearchChange={handleSearchChange}
        />
        {newStudent && newStudent.id ? (
          <div>
            <Button
              name="studentAddButton"
              basic
              color="pink"
              content={t('add_student')}
              onClick={handleAddStudentToCourse}
            />
            <Button basic color="red" circular icon="delete" size="tiny" value="" onClick={handleAddStudentToCourse} />
          </div>
        ) : undefined}
        <List divided siz="tiny" verticalAlign="middle">
          {people.map((person) => (
            <List.Item key={person.id}>
              <List.Content floated="right">
                <Button.Group size="tiny" compact>
                  <Button
                    content={t('student')}
                    person={person}
                    positive={!isTeacher(person)}
                    value="STUDENT"
                    onClick={handleRoleChange}
                  />
                  <Button.Or />
                  <Button
                    content={t('teacher')}
                    person={person}
                    positive={isTeacher(person)}
                    value="TEACHER"
                    onClick={handleRoleChange}
                  />
                </Button.Group>
                &nbsp;
                <Button
                  basic
                  color="red"
                  compact
                  content={t('remove_from_course')}
                  size="tiny"
                  value={person.id}
                  onClick={handleRemoveFromCourse}
                />
              </List.Content>
              <List.Content>
                <List.Header>
                  {person.studentnumber} - {person.name}
                </List.Header>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Accordion.Content>
    </Accordion>
  )
}
/*
ManageCoursePeople.propTypes = {
  activeCourse: shape().isRequired,
  people: arrayOf(shape()).isRequired,
  dispatchDeleteCoursePerson: func.isRequired,
  dispatchCreateOrUpdateCoursePerson: func.isRequired,
  translate: func.isRequired
}
*/

export default connect()(ManageCoursePeople)
