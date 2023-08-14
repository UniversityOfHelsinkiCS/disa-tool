import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withLocalize } from 'react-localize-redux'
import { Button, Form, Input, Label, Dropdown } from 'semantic-ui-react'
import asyncAction from '../../../../utils/asyncAction'

import { addGrade } from '../../actions/grades'

import ModalForm, { saveActions } from '../../../../utils/components/ModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import InfoBox from '../../../../utils/components/InfoBox'

 const CreateGradeForm = (props) => {
  const [values, setValues] = useState({})

  const addGradeSubmit = e => props.addGrade({
    eng_name: e.target.eng_name.value,
    fin_name: e.target.fin_name.value,
    swe_name: e.target.swe_name.value,
    skill_level_id: values.skill_level,
    needed_for_grade: e.target.needed_for_grade.value,
    prerequisite: values.prerequisite,
    order: props.newOrder
  })

  const changeDropdown = field => (e, { value }) => setValues({
      ...values,
      [field]: value
  })

  const translate = id => props.translate(`Course.grades.CreateGradeForm.${id}`)

    const label = {
      name: translate('grade'),
      skill_level: translate('skill_level'),
      needed_for_grade: translate('needed_for_grade'),
      prerequisite: translate('prerequisite')
    }
    return (
      <div className="CreateGradeForm">
        <ModalForm
          header={<Fragment>{translate('header')}<InfoBox translateFunc={props.translate} translationid="AddGradeModal" buttonProps={{ floated: 'right' }} /></Fragment>}
          trigger={<Button basic className="addGradeButton" icon={{ name: 'add' }} />}
          actions={saveActions(translate)}
          onSubmit={addGradeSubmit}
        >
          <MultilingualField field="name" fieldDisplay={label.name} />
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
  translate: PropTypes.func.isRequired,
  newOrder: PropTypes.number.isRequired
}

const mapDispatchToProps = dispatch => ({
  addGrade: asyncAction(addGrade, dispatch)
})

export default withLocalize(connect(null, mapDispatchToProps)(CreateGradeForm))
