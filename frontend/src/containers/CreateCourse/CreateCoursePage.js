import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form, Button, Segment, Header } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import './createCourse.css'

import { createCourse } from './services/createCourse'

import MultilingualField from '../../utils/components/MultilingualField'

export const CreateCoursePage = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const createCourseSubmit = async (e) => {
    e.preventDefault()
    const response = await createCourse({
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value,
    })
    dispatch(response)
    history.push('/courses')
  }

  const { t } = useTranslation('translation')

  const label = {
    name: t('common.name'),
  }
  return (
    <div className="CreateCoursePage">
      <Segment className="formContainer" basic padded>
        <Header>{t('createCourse.createCoursePage.createCourse')}</Header>
        <Form onSubmit={createCourseSubmit} style={{ maxWidth: '80%' }}>
          <MultilingualField field="name" fieldDisplay={label.name} />
          <Button type="submit" color="green">
            {t('createCourse.createCoursePage.create')}
          </Button>
        </Form>
      </Segment>
    </div>
  )
}
/*
CreateCoursePage.propTypes = {
  createCourse: PropTypes.func.isRequired,
}
*/

export default connect()(CreateCoursePage)
