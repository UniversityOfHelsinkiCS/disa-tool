import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { Table, Button } from 'semantic-ui-react'
import asyncAction from '../../../../utils/asyncAction'

import { addLevel } from '../../actions/levels'

import ModalForm, { saveActions } from '../../../../utils/components/NewModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import { useTranslation } from 'react-i18next'

export const CreateLevelForm = (props) => {
  const dispatch = useDispatch()
  const addLevelSubmit = async (e) => {
    const response = await addLevel({
      course_instance_id: props.courseId,
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value,
      order: props.newOrder
    })
    dispatch(response)
  }

  const {t} = useTranslation("translation", {keyPrefix: "course.matrix.createLevelForm"})

    return (
      <Table.HeaderCell className="CreateLevelForm">
        <ModalForm
          header={t('header')}
          trigger={<Button basic className="addLevelButton" icon={{ name: 'add' }} />}
          actions={saveActions()}
          onSubmit={addLevelSubmit}
        >
          <p>{t('prompt_1')}.</p>
          <MultilingualField field="name" fieldDisplay={t('name')} />
        </ModalForm>
      </Table.HeaderCell>
    )
  }
/*
CreateLevelForm.propTypes = {
  courseId: PropTypes.number.isRequired,
  addLevel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  newOrder: PropTypes.number.isRequired
}
*/
export default connect()(CreateLevelForm)
