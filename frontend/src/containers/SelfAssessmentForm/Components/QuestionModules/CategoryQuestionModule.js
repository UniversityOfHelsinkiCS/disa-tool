import { Form, Card, Grid, Dropdown, Accordion, Icon, Message } from 'semantic-ui-react'
import React,{useState} from 'react'
import { connect,useDispatch,useSelector } from 'react-redux'
import {
  gradeCategoryAction,
  textfieldResponseAction,
  clearErrorAction
} from '../../actions/selfAssesment'
import MatrixPage from '../../../Course/MatrixPage'
import { useTranslation } from 'react-i18next'

export const CategoryQuestionModule = (props) => {
  const [showMatrix, setShowMatrix] = useState(false)
  const [value, setValue] = useState(null)
  const answers = useSelector(state => state.selfAssessment.assesmentResponse) 
  const {edit,
    final,
    responseTextError,
    gradeError,
    courseInstanceId,
    grades,
    existingAnswer} = props
    const { name, textFieldOn, id } = props.data
  const dispatch = useDispatch()

    const {t} = useTranslation("translation", {keyPrefix: "selfAssessmentForm.questionModules.categoryQuestionModule"})

  const handleDropdownChange = (e, { value }) => {
    const gradeName = props.grades.find(g => g.value === value).text
    gradeCategoryAction({ id, value, name: gradeName, final },dispatch)
    setValue(value)
    clearErrorAction({ type: final ? 'finalGErrors' : 'qModErrors', errorType: 'grade', id },dispatch)
  }

 const handleTextFieldOnBlur = (e) => {
    textfieldResponseAction({ id, value: e.target.value, final },data)
  }

  const handleTextFieldChange = () => {
    if (responseTextError) { clearErrorAction({ type: final ? 'finalGErrors' : 'qModErrors', errorType: 'responseText', id },dispatch) }
  }

    const matchingResponse = final
      ? existingAnswer
      : existingAnswer.find(answer => answer.id === id)
    const { grade, responseText } = matchingResponse || {}

    const existingGrade = grades.find(g => g.value === grade)

    return (
      <div className="CategoryQuestion">
        <Form error={gradeError !== undefined || responseTextError !== undefined}>
          <Form.Field>
            <div>
              <Card fluid>
                <Card.Content >
                  <Card.Header>
                    {name}
                    {!final &&
                      <Accordion style={{ marginTop: '10px' }} fluid styled>
                        <Accordion.Title
                          active={state.showMatrix}
                          onClick={() => setShowMatrix(!state.showMatrix)}
                        >
                          <Icon name="dropdown" />
                          {t('matrix')}
                        </Accordion.Title>
                        <Accordion.Content active={state.showMatrix}>
                          <MatrixPage
                            courseId={courseInstanceId}
                            hideHeader
                            categoryId={id}
                          />
                        </Accordion.Content>
                      </Accordion>
                    }
                  </Card.Header>

                  <Grid verticalAlign="middle" padded columns={3}>
                    <Grid.Row >
                      <Form.Field width={10}>
                        <Grid.Column>
                          <div>
                            <label> {t('assessment')}</label>
                            <Dropdown
                              className="gradeDropdown"
                              style={{ marginLeft: '20px' }}
                              placeholder={t('gradeSelect')}
                              selection
                              options={grades}
                              error={gradeError !== undefined}
                              onChange={!edit ? handleDropdownChange : null}
                              value={existingGrade ? existingGrade.value : state.value}
                            />
                          </div>
                          <Message
                            error
                            content={gradeError ? gradeError.error : null}
                          />
                        </Grid.Column>
                      </Form.Field>
                      <Grid.Column />
                    </Grid.Row>

                    <Grid.Row >
                      <Form.Field width={10}>
                        <Grid.Column>
                          {textFieldOn ?
                            <div>
                              <Form.TextArea
                                autoheight="true"
                                error={responseTextError !== undefined}
                                label={t('basis')}
                                placeholder={t('writeBasis')}
                                onBlur={!edit ? handleTextFieldOnBlur : undefined}
                                onChange={!edit ? handleTextFieldChange : undefined}
                                defaultValue={responseText}
                              />
                              <Message
                                error
                                content={responseTextError ? responseTextError.error : null}
                              />
                            </div>
                            :
                            null
                          }
                        </Grid.Column>
                      </Form.Field>
                    </Grid.Row>
                  </Grid>
                </Card.Content>
              </Card>
            </div>
          </Form.Field>
        </Form>
      </div>
    )
  }
/*
CategoryQuestionModule.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    headers: PropTypes.arrayOf(PropTypes.shape()),
    textFieldOn: PropTypes.bool
  }).isRequired,
  final: PropTypes.bool,
  dispatchTextfieldResponseAction: PropTypes.func.isRequired,
  dispatchGradeCategoryAction: PropTypes.func.isRequired,
  dispatchClearErrorAction: PropTypes.func.isRequired,
  responseTextError: PropTypes.shape(),
  gradeError: PropTypes.shape(),
  courseInstanceId: PropTypes.number,
  edit: PropTypes.bool.isRequired,
  grades: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    value: PropTypes.number,
    text: PropTypes.string
  })),
  t: PropTypes.func.isRequired,
  existingAnswer: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape()), PropTypes.shape()])
}
*/

export default connect()(CategoryQuestionModule)
