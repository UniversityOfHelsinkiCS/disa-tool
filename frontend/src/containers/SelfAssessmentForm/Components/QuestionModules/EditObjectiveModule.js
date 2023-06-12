import { Grid, Button, List, Accordion, Icon } from 'semantic-ui-react'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toggleFormPartAction } from '../../actions/selfAssesment'
import MathJaxText from '../../../../utils/components/MathJaxText'

const EditObjectiveModule = (props) => {
    const { objectives, name, id, includedInAssesment } = props.data

    const [active, setActive] = useState(false)
    const { t } = useTranslation(
        `SelfAssessmentForm.QuestionModules.EditCategoryModule`
    )

    const handleClick = () => setActive(!active)

    return (
        <Accordion
            style={{ marginTop: '20px', marginBottom: '20px' }}
            fluid
            styled
        >
            <Accordion.Title active={active}>
                <Grid divided="vertically" verticalAlign="middle" columns={2}>
                    <Grid.Row>
                        <Grid.Column
                            style={{ padding: 'auto' }}
                            onClick={handleClick}
                        >
                            <span onClick={handleClick}>
                                <Icon name="dropdown" />
                                {name}
                            </span>
                        </Grid.Column>
                        <Grid.Column>
                            <span>
                                <Button
                                    className="toggleFormPartButton"
                                    size="small"
                                    basic
                                    color={
                                        includedInAssesment ? 'green' : 'red'
                                    }
                                    onClick={() =>
                                        props.dispatchToggleFormPartAction(
                                            id,
                                            'category'
                                        )
                                    }
                                >
                                    {includedInAssesment
                                        ? t('includedButton')
                                        : t('notIncludedButton')}
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
                                    style={{ padding: '10px', margin: '0' }}
                                    className="toggleFormPartButton"
                                    size="tiny"
                                    basic
                                    disabled={!includedInAssesment}
                                    color={
                                        includedInAssesment
                                            ? o.includedInAssesment
                                                ? 'green'
                                                : 'red'
                                            : 'red'
                                    } //eslint-disable-line
                                    onClick={() =>
                                        props.dispatchToggleFormPartAction(
                                            o.id,
                                            'objective'
                                        )
                                    }
                                >
                                    {' '}
                                    {
                                        includedInAssesment
                                            ? o.includedInAssesment
                                                ? t('includedButton')
                                                : t('notIncludedButton')
                                            : t(
                                                  'notIncludedButton'
                                              ) /* eslint-disable-line */
                                    }
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

const mapDispatchToProps = (dispatch) => ({
    dispatchToggleFormPartAction: (id, type) =>
        dispatch(toggleFormPartAction(id, type)),
})

EditObjectiveModule.propTypes = {
    dispatchToggleFormPartAction: PropTypes.func.isRequired,
    data: PropTypes.shape({
        objectives: PropTypes.arrayOf(PropTypes.shape()),
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        includedInAssesment: PropTypes.bool.isRequired,
    }).isRequired,
    translate: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(EditObjectiveModule)
