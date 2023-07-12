import React from 'react'
import { arrayOf, shape, func } from 'prop-types'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { orderBy } from 'lodash'
import { Button, List, Popup } from 'semantic-ui-react'
import DeleteForm from '../../../utils/components/DeleteForm'
import { removeSelfAssesment } from '../actions/selfAssesment'
import asyncAction from '../../../utils/asyncAction'
import Conditional from '../../../utils/components/Conditional'
import { useTranslation } from 'react-i18next'

const TeacherAssesmentList = ({
  assesments,
  toggleAssessment,
  translate: baseTranslate,
  deleteSelfAssesment
}) => {
  const dispatch = useDispatch()

  const removeSelfAssesmentAsync =async (assessmentId) => {
    const response = await removeSelfAssesment(assessmentId)
    dispatch(response)
  }

  const {t} = useTranslation("translation", {keyPrefix: "UserPage.TeacherAssesmentList"})
  return (
    <List selection divided size="big">
      {orderBy(assesments, 'name').map(assesment => (
        <List.Item key={assesment.id} style={{ display: 'flex' }}>
          <List.Content
            as={Link}
            to={`/selfassessment/list/${assesment.id}`}
            style={{ flexGrow: 1 }}
          >
            {assesment.name}
          </List.Content>
          <List.Content
            style={{ paddingRight: '10px', paddingLeft: '10px' }}
          >
            <Button icon="eye" circular size="mini" basic color="teal" as={Link} to={`/selfassessment/preview/${assesment.id}`} />
            <Conditional visible={assesment.open}>
              <Popup
                trigger={
                  <div style={{ display: 'inline' }}>
                    <Button disabled icon="edit" circular size="mini" basic color="blue" as={Link} to={`/selfassessment/edit/${assesment.id}`} />
                  </div>
                }
                content={t('cannot_edit_open_assessment')}
              />
            </Conditional>
            <Conditional visible={!assesment.open}>
              <Button icon="edit" circular size="mini" basic color="blue" as={Link} to={`/selfassessment/edit/${assesment.id}`} />
            </Conditional>
            <DeleteForm
              onExecute={() => removeSelfAssesmentAsync(assesment.id)}
              header={t('delete_header')}
              prompt={[
                t('delete_prompt_1'),
                assesment.name
              ]}
              translate={baseTranslate}
            />
          </List.Content>
          <List.Content>
            <Button.Group size="small">
              <Button
                name="assessmentHidden"
                content={t('hidden')}
                size="small"
                value={assesment.id}
                onClick={toggleAssessment}
                positive={!assesment.active && !assesment.open}
              />
              <Button.Or />
              <Button
                name="assessmentOpen"
                content={t('open')}
                size="small"
                value={assesment.id}
                onClick={toggleAssessment}
                positive={assesment.active && assesment.open}
              />
              <Button.Or />
              <Button
                name="assessmentShown"
                content={t('closed')}
                size="small"
                value={assesment.id}
                onClick={toggleAssessment}
                positive={assesment.active && !assesment.open}
              />
            </Button.Group>
            <Button
              name="feedbackOpen"
              color={assesment.show_feedback ? 'green' : 'red'}
              content={assesment.show_feedback ? t('feedback_open') : translate('feedback_closed')}
              size="small"
              value={assesment.id}
              onClick={toggleAssessment}
              style={{ marginLeft: '5px' }}
            />
          </List.Content>
        </List.Item>))}
    </List>
  )
}
/*
TeacherAssesmentList.propTypes = {
  assesments: arrayOf(shape({})).isRequired,
  toggleAssessment: func.isRequired,
  translate: func.isRequired,
  deleteSelfAssesment: func.isRequired
}
*/


export default connect()(TeacherAssesmentList)

