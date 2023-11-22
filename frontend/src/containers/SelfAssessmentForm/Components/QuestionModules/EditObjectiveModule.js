import { Grid, Button, List, Accordion, Icon } from 'semantic-ui-react'
import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toggleFormPartAction } from '../../actions/selfAssesment'
import MathJaxText from '../../../../utils/components/MathJaxText'

export const EditObjectiveModule = (props) => {
  const [active, setActive] = useState(false)
  const dispatch = useDispatch()
  const { objectives, name, id, includedInAssesment } = props.data
  const { t } = useTranslation('translation', {
    keyPrefix: 'selfAssessmentForm.questionModules.editCategoryModule',
  })

  const handleClick = () => setActive(!active)

  let buttonText = null
  if (includedInAssesment) {
    if (objectives.every((o) => o.includedInAssesment)) {
      buttonText = t('includedButton')
    } else if (objectives.every((o) => !o.includedInAssesment)) {
      buttonText = t('notIncludedButton')
    } else {
      buttonText = t('partiallyIncludedButton')
    }
  }

  return (
    <Accordion data-testid="edit-objective-module" style={{ marginTop: '20px', marginBottom: '20px' }} fluid styled>
      <Accordion.Title active={active}>
        <Grid divided="vertically" verticalAlign="middle" columns={2}>
          <Grid.Row>
            <Grid.Column style={{ padding: 'auto' }} onClick={handleClick}>
              <span onClick={handleClick}>
                <Icon name="dropdown" />
                {name}
              </span>
            </Grid.Column>
            <Grid.Column>
              <span>
                <Button
                  data-testid="toggle-objective-included-button"
                  className="toggleFormPartButton"
                  size="small"
                  basic
                  color={includedInAssesment ? 'green' : 'red'}
                  onClick={() => toggleFormPartAction(id, 'category', dispatch)}
                >
                  {includedInAssesment ? t('includedButton') : t('notIncludedButton')}
                </Button>
              </span>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Accordion.Title>

      <Accordion.Content active={active}>
        <List divided verticalAlign="middle">
          {objectives.map((o) => (
            <List.Item key={o.id}>
              <List.Content floated="right">
                <Button
                  data-testid="toggle-category-included-button"
                  style={{ padding: '10px', margin: '0' }}
                  className="toggleFormPartButton"
                  size="tiny"
                  basic
                  disabled={!includedInAssesment}
                  color={includedInAssesment ? (o.includedInAssesment ? 'green' : 'red') : 'red'} //eslint-disable-line
                  onClick={() => toggleFormPartAction(o.id, 'objective', dispatch)}
                >
                  {' '}
                  {buttonText}
                </Button>
              </List.Content>
              <List.Content style={{ margin: '0' }}>
                <MathJaxText content={o.name} />
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Accordion.Content>
    </Accordion>
  )
}

/*
EditObjectiveModule.propTypes = {
  dispatchToggleFormPartAction: PropTypes.func.isRequired,
  data: PropTypes.shape({
    objectives: PropTypes.arrayOf(PropTypes.shape()),
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    includedInAssesment: PropTypes.bool.isRequired
  }).isRequired,
  t: PropTypes.func.isRequired
}
*/

export default connect()(EditObjectiveModule)
