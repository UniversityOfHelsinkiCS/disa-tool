import React, { useState, Fragment } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button, Form, Input, Label, Dropdown } from 'semantic-ui-react'
import { addGrade } from '../../actions/grades'
import ModalForm, { saveActions } from '../../../../utils/components/NewModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import InfoBox from '../../../../utils/components/InfoBox'
import { useTranslation } from 'react-i18next'

 const CreateGradeForm = (props) => {
  const [values, setValues] = useState({})
const dispatch = useDispatch()
const {t} = useTranslation("translation", {keyPrefix: "course.grades"})

  const asyncAddGrade = async (e) => {
    const response = await addGrade({
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value,
      skill_level_id: values.skill_level,
      needed_for_grade: e.target.needed_for_grade.value,
      prerequisite: values.prerequisite,
      order: props.newOrder
    })
    dispatch(response)
  }

  const changeDropdown = field => (e, { value }) => setValues({
      ...values,
      [field]: value
  })

    const label = {
      name: t('common.grade'),
      skill_level: t('common.skill_level'),
      needed_for_grade: t('common.needed_for_grade'),
      prerequisite: t('common.prerequisite')
    }
    return (
      <div className="CreateGradeForm">
        <ModalForm
          header={<Fragment>{t('createGradeForm.header')}<InfoBox tFunc={props.t} translationid="AddGradeModal" buttonProps={{ floated: 'right' }} /></Fragment>}
          trigger={<Button basic className="addGradeButton" icon={{ name: 'add' }} />}
          actions={saveActions(t)}
          onSubmit={asyncAddGrade}
        >
          <MultilingualField field="name" fieldDisplay={label.name} type="grade" id={`placeholderId`} values={values}/>
          <Form.Field>
            <Label content={label.skill_level} />
            <Dropdown
              value={values.skill_level}
              onChange={changeDropdown('skill_level')}
              selection
              options={props.levels.map(level => ({
                key: level.id,
                value: level.id,
                text: level.name
              }))}
            />
          </Form.Field>
          <Form.Field>
            <Label content={label.needed_for_grade} />
            <Input
              name="needed_for_grade"
              type="number"
              min={0}
              max={1}
              step={0.01}
            />
          </Form.Field>
          <Form.Field>
            <Label content={label.prerequisite} />
            <Dropdown
              value={values.prerequisite}
              onChange={changeDropdown('prerequisite')}
              selection
              options={[{ key: 0, value: null, text: '' }].concat(props.grades.map(grade => ({
                key: grade.id,
                value: grade.id,
                text: grade.name
              })))}
            />
          </Form.Field>
        </ModalForm>
      </div>
    )
  }
/*
CreateGradeForm.propTypes = {
  levels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  grades: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  addGrade: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  newOrder: PropTypes.number.isRequired
}
*/

export default connect()(CreateGradeForm)
