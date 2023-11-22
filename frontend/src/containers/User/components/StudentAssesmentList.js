import React from 'react'
import { Link } from 'react-router-dom'
import { Label, List } from 'semantic-ui-react'
import { orderBy } from 'lodash'
import { useTranslation } from 'react-i18next'

const StudentAssesmentList = ({ assesments }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'UserPage.StudentAssesmentList' })
  return (
    <List selection divided size="big">
      {orderBy(assesments, 'name').map((assesment) =>
        !assesment.active ? undefined : (
          <List.Item key={assesment.id} style={{ display: 'flex' }}>
            <List.Content as={Link} to={`/selfassessment/response/${assesment.id}`} style={{ flexGrow: 1 }}>
              {assesment.name}
            </List.Content>
            <List.Content floated="right">
              <Label color={assesment.open ? 'green' : 'red'} content={assesment.open ? t('open') : t('closed')} />
              <Label
                color={assesment.assessment_responses.length > 0 ? 'green' : 'red'}
                content={assesment.assessment_responses.length > 0 ? t('answered') : t('unanswered')}
              />
            </List.Content>
          </List.Item>
        )
      )}
    </List>
  )
}
/*
StudentAssesmentList.propTypes = {
  assesments: arrayOf(shape({})).isRequired,
  translate: func.isRequired
}
*/
export default StudentAssesmentList
