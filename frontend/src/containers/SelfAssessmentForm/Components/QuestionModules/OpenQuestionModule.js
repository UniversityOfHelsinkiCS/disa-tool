import React from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { Form, Card, Grid, Icon, Popup, Button, Message } from 'semantic-ui-react'
import { withLocalize } from 'react-localize-redux'
import ModalForm from '../../../../utils/components/ModalForm'
import { removeOpenQuestion, openQuestionResponseAction, clearErrorAction } from '../../actions/selfAssesment'
import { useTranslation } from 'react-i18next'


const OpenQuestionModule = (props) => {
  const { edit, responseTextError, existingAnswer } = props
  const { id, name } = props.data
  const dispatch = useDispatch()

  const {t} = useTranslation("translation", {keyPrefix: "selfAssessmentForm.questionModules.openQuestionModule."})

  const handleTextAreaBlur = e => openQuestionResponseAction({ id, value: e.target.value },dispatch) //eslint-disable-line
  const handleTextAreaChange = () => clearErrorAction({ type: 'openQErrors', errorType: 'responseText', id },dispatch)

  return (
    <Form error={responseTextError !== undefined}>
      <Form.Field key={id}>
        <Card.Group centered>
          <Card fluid>
            <Card.Content>
              <Card.Header style={{ paddingBottom: '1.5em' }}>
                {name}
              </Card.Header>
              <Grid verticalAlign="middle" columns={3}>
                <Grid.Row>
                  <Grid.Column width={10}>
                    <Form.TextArea
                      autoheight="true"
                      error={responseTextError !== undefined}
                      placeholder={t('placeholder')}
                      onBlur={!edit ? handleTextAreaBlur : undefined}
                      onChange={(!edit && responseTextError) ? handleTextAreaChange : undefined}
                      defaultValue={existingAnswer
                        ? existingAnswer.find(existing => existing.id === id).responseText : null}
                    />
                    <Message
                      error
                      content={responseTextError ? responseTextError.error : null}
                    />

                  </Grid.Column>
                  <Grid.Column>
                    {edit ?
                      <ModalForm
                        header={t('modalHeader')}
                        content={
                          <div>
                            <p>{t('modalConfirmation')}: {name}?</p>
                            <Button color="red">
                              {t('modalCancel')}
                            </Button>
                            <Button color="green" onClick={() => removeOpenQuestion(id,dispatch)} type="submit">Ok</Button>
                          </div>
                        }
                        trigger={
                          <Popup
                            trigger={
                              <Icon
                                name="minus circle"
                                size="big"
                                color="red"
                              />
                            }
                            content={t('popup')}
                          />
                        }
                      />
                      :
                      null
                    }
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
        </Card.Group>
      </Form.Field>
    </Form>
  )
}
/*
OpenQuestionModule.propTypes = {
  edit: PropTypes.bool.isRequired,
  dispatchRemoveOpenQuestion: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired,
  dispatchopenQuestionResponseAction: PropTypes.func.isRequired,
  responseTextError: PropTypes.shape(),
  t: PropTypes.func.isRequired,
  dispatchClearErrorAction: PropTypes.func.isRequired,
  existingAnswer: PropTypes.oneOfType([PropTypes.arrayOf(), PropTypes.arrayOf(PropTypes.shape())])
}
*/

export default connect()(OpenQuestionModule)
