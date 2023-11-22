import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { getCourse } from '../../../api/courses'
import { editCourse, getAllCourses } from '../actions/courses'

import ModalForm, { saveActions } from '../../../utils/components/NewModalForm'
import MultilingualField from '../../../utils/components/MultilingualField'
import { useTranslation } from 'react-i18next'

export const EditCourseForm = (props) => {
  const [values, setValues] = useState({
    eng: '',
    fin: '',
    swe: '',
  })
  const [loading, setLoading] = useState(true)
  const [triggered, setTriggered] = useState(false)
  const dispatch = useDispatch()

  const getAllCoursesAsync = async () => {
    const response = await getAllCourses()
    dispatch(response)
  }

  const editCourseAsync = async ({ id, eng_name, fin_name, swe_name }) => {
    const response = await editCourse({ id, eng_name, fin_name, swe_name })
    dispatch(response)
  }

  const editCourseSubmit = async (e) => {
    await editCourseAsync({
      id: props.course_id,
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value,
    })
    getAllCoursesAsync()
    setTriggered(false)
    setLoading(true)
  }

  const loadDetails = async () => {
    if (triggered) return
    setTriggered(true)
    const courseDetails = await getCourse({
      id: props.courseId,
    })
    const courseData = courseDetails.data
    const { eng_name, fin_name, swe_name } = courseData
    setValues({
      eng: eng_name,
      fin: fin_name,
      swe: swe_name,
    })
    setLoading(false)
  }

  const { t } = useTranslation('translation')

  const contentPrompt = t('courseList.editCourseForm.renameCourse')
  return (
    <div className="EditCourseForm">
      <ModalForm
        header={t('courseList.editCourseForm.rename')}
        trigger={
          <Button style={{ margin: '10px' }} type="button" color="teal" fluid basic compact>
            {t('courseList.editCourseForm.rename_trigger')}
          </Button>
        }
        onSubmit={editCourseSubmit}
        actions={saveActions()}
        loading={loading}
        onOpen={loadDetails}
      >
        <p>{contentPrompt}.</p>
        <MultilingualField field="name" fieldDisplay={t('common.name')} values={values} />
      </ModalForm>
    </div>
  )
}
/*
EditCourseForm.propTypes = {
  course_id: PropTypes.number.isRequired,
  editCourse: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}
*/

export default connect()(EditCourseForm)
