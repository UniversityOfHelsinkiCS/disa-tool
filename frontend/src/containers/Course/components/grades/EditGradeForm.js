import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Form, Input, Dropdown, Label } from 'semantic-ui-react'
import asyncAction from '../../../../utils/asyncAction'

import { details } from '../../../../api/grades'
import { editGrade } from '../../actions/grades'

import ModalForm, { saveActions } from '../../../../utils/components/ModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import InfoBox from '../../../../utils/components/InfoBox'

class EditGradeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      values: {
        name: {
          eng: '',
          fin: '',
          swe: ''
        },
        skill_level: null,
        needed_for_grade: 0,
        prerequisite: null
      }
    }
  }

  editGradeSubmit = e => this.props.editGrade({
    id: this.props.gradeId,
    eng_name: e.target.eng_name.value,
    fin_name: e.target.fin_name.value,
    swe_name: e.target.swe_name.value,
    skill_level_id: this.state.values.skill_level,
    needed_for_grade: this.state.values.needed_for_grade,
    prerequisite: this.state.values.prerequisite
  })

  loadDetails = async () => {
    if (!this.state.loading) return
    const gradeDetails = (await this.props.details({ id: this.props.gradeId })).data.data
    this.setState({
      loading: false,
      values: {
        name: {
          eng: gradeDetails.eng_name,
          fin: gradeDetails.fin_name,
          swe: gradeDetails.swe_name
        },
        skill_level: gradeDetails.skill_level_id,
        needed_for_grade: gradeDetails.needed_for_grade,
        prerequisite: gradeDetails.prerequisite
      }
    })
  }

  changeValue = field => (e, { value }) => this.setState({
    values: {
      ...this.state.values,
      [field]: value
    }
  })

  translate = id => this.props.translate(`Course.grades.EditGradeForm.${id}`)

  render() {
    const label = {
      name: this.translate('grade'),
      skill_level: this.translate('skill_level'),
      needed_for_grade: this.translate('needed_for_grade'),
      prerequisite: this.translate('prerequisite')
    }
    return (
      <div className="EditGradeForm">
        <ModalForm
          header={<Fragment>{this.translate('header')}<InfoBox translateFunc={this.props.translate} translationid="EditGradeModal" buttonProps={{ floated: 'right' }} /></Fragment>}
          trigger={<Button basic circular icon={{ name: 'edit' }} size="small" onClick={this.loadDetails} />}
          actions={saveActions(this.translate)}
          onSubmit={this.editGradeSubmit}
          loading={this.state.loading}
        >
          <MultilingualField
            field="name"
            fieldDisplay={label.name}
            values={this.state.values.name}
          />
          <Form.Field>
            <Label content={label.skill_level} />
            <Dropdown
              value={this.state.values.skill_level}
              onChange={this.changeValue('skill_level')}
              selection
              options={this.props.levels.map(level => ({
                key: level.id,
                value: level.id,
                text: level.name
              }))}
            />
          </Form.Field>
          <Form.Field>
            <Label content={label.needed_for_grade} />
            <Input
              value={this.state.values.needed_for_grade}
              onChange={this.changeValue('needed_for_grade')}
              type="number"
              min={0}
              max={1}
              step={0.01}
            />
          </Form.Field>
          <Form.Field>
            <Label content={label.prerequisite} />
            <Dropdown
              value={this.state.values.prerequisite}
              onChange={this.changeValue('prerequisite')}
              selection
              options={[{ key: 0, value: null, text: '' }].concat(this.props.grades.map(grade => ({
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
}

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
  translate: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  details,
  editGrade: asyncAction(editGrade, dispatch)
})

export default connect(null, mapDispatchToProps)(EditGradeForm)
