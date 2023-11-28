import React, { useState, Fragment } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button, Form, Input, Dropdown, Label } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { details } from '../../../../api/grades'
import { editGrade } from '../../actions/grades'

import ModalForm, { saveActions } from '../../../../utils/components/NewModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import InfoBox from '../../../../utils/components/InfoBox'

const EditGradeForm = ({ gradeId, objectiveId, levels, grades }) => {
  const [loading, setLoading] = useState(true)
  const [skillLevel, setSkillLevel] = useState(null)
  const [neededForGrade, setNeededForGrade] = useState(0)
  const [prerequisite, setPrerequisite] = useState(null)
  const [values, setValues] = useState({
    eng: '',
    fin: '',
    swe: '',
  })
  const { t } = useTranslation('translation', { keyPrefix: 'course.grades.editGradeForm' })
  const dispatch = useDispatch()

  const editGradeSubmitAsync = async (e) => {
    const response = await editGrade({
      id: gradeId,
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value,
      skill_level_id: skillLevel,
      needed_for_grade: neededForGrade,
      prerequisite,
    })
    dispatch(response)
  }

  const loadDetails = async () => {
    if (!loading) return
    const gradeDetails = (await details({ id: gradeId })).data.data
    setLoading(false)
    setSkillLevel(gradeDetails.skill_level_id)
    setNeededForGrade(gradeDetails.needed_for_grade)
    setPrerequisite(gradeDetails.prerequisite)
    setValues({
      eng: gradeDetails.eng_name,
      fin: gradeDetails.fin_name,
      swe: gradeDetails.swe_name,
    })
  }

  const changeValue =
    (field) =>
    (e, { value }) => {
      setValues({
        ...values,
        [field]: value,
      })
    }

  const label = {
    name: t('grade'),
    skill_level: t('skill_level'),
    needed_for_grade: t('needed_for_grade'),
    prerequisite: t('prerequisite'),
  }
  return (
    <div className="EditGradeForm">
      <ModalForm
        header={
          <>
            {t('header')}
            <InfoBox translationid="EditGradeModal" buttonProps={{ floated: 'right' }} />
          </>
        }
        trigger={<Button basic circular icon={{ name: 'edit' }} size="small" onClick={loadDetails} />}
        actions={saveActions(t)}
        onSubmit={editGradeSubmitAsync}
        loading={loading}
      >
        <MultilingualField field="name" fieldDisplay={label.name} values={values} type="grade-form" id={objectiveId} />
        <Form.Field>
          <Label content={label.skill_level} />
          <Dropdown
            value={skillLevel}
            onChange={changeValue('skill_level')}
            selection
            options={levels.map((level) => ({
              key: level.id,
              value: level.id,
              text: level.name,
            }))}
          />
        </Form.Field>
        <Form.Field>
          <Label content={label.needed_for_grade} />
          <Input
            value={neededForGrade}
            onChange={changeValue('needed_for_grade')}
            type="number"
            min={0}
            max={1}
            step={0.01}
          />
        </Form.Field>
        <Form.Field>
          <Label content={label.prerequisite} />
          <Dropdown
            value={prerequisite}
            onChange={changeValue('prerequisite')}
            selection
            options={[{ key: 0, value: null, text: '' }].concat(
              grades.map((grade) => ({
                key: grade.id,
                value: grade.id,
                text: grade.name,
              })),
            )}
          />
        </Form.Field>
      </ModalForm>
    </div>
  )
}

/*
EditGradeForm.propTypes = {
  details: PropTypes.func.isRequired,
  editGrade: PropTypes.func.isRequired,
  gradeId: PropTypes.number.isRequired,
  levels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  grades: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  t: PropTypes.func.isRequired
}
*/

export default connect()(EditGradeForm)
