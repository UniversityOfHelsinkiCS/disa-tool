import {
    Form,
    Card,
    Grid,
    Dropdown,
    Accordion,
    Icon,
    Message,
} from 'semantic-ui-react'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
    gradeCategoryAction,
    textfieldResponseAction,
    clearErrorAction,
} from '../../actions/selfAssesment'
import MatrixPage from '../../../Course/MatrixPage'

const CategoryQuestionModule = (props) => {
    const [state, setState] = useState({ showMatrix: false, value: null })

    const handleDropdownChange = (e, { value }) => {
        const { final } = props
        const { id } = props.data
        const gradeName = props.grades.find((g) => g.value === value).text
        props.dispatchGradeCategoryAction({
            id,
            value,
            name: gradeName,
            final,
        })
        setState({ ...state, value: value })
        props.dispatchClearErrorAction({
            type: final ? 'finalGErrors' : 'qModErrors',
            errorType: 'grade',
            id,
        })
    }

    const handleTextFieldOnBlur = (e) => {
        const { final } = props
        const { id } = props.data
        props.dispatchTextfieldResponseAction({
            id,
            value: e.target.value,
            final,
        })
    }

    const handleTextFieldChange = () => {
        const { final, responseTextError } = props
        const { id } = props.data
        if (responseTextError) {
            props.dispatchClearErrorAction({
                type: final ? 'finalGErrors' : 'qModErrors',
                errorType: 'responseText',
                id,
            })
        }
    }

    const {
        edit,
        final,
        responseTextError,
        gradeError,
        courseInstanceId,
        grades,
        existingAnswer,
    } = props
    const { name, textFieldOn, id } = props.data
    const matchingResponse = final
        ? existingAnswer
        : existingAnswer.find((answer) => answer.id === id)
    const { grade, responseText } = matchingResponse || {}

    const existingGrade = grades.find((g) => g.value === grade)
    const { t } = useTranslation(
        `SelfAssessmentForm.QuestionModules.CategoryQuestionModule`
    )

    return (
        <div className="CategoryQuestion">
            <Form
                error={
                    gradeError !== undefined || responseTextError !== undefined
                }
            >
                <Form.Field>
                    <div>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>
                                    {name}
                                    {!final && (
                                        <Accordion
                                            style={{ marginTop: '10px' }}
                                            fluid
                                            styled
                                        >
                                            <Accordion.Title
                                                active={state.showMatrix}
                                                onClick={() =>
                                                    setState({
                                                        showMatrix:
                                                            !state.showMatrix,
                                                    })
                                                }
                                            >
                                                <Icon name="dropdown" />
                                                {t('matrix')}
                                            </Accordion.Title>
                                            <Accordion.Content
                                                active={state.showMatrix}
                                            >
                                                <MatrixPage
                                                    courseId={courseInstanceId}
                                                    hideHeader
                                                    categoryId={id}
                                                />
                                            </Accordion.Content>
                                        </Accordion>
                                    )}
                                </Card.Header>

                                <Grid verticalAlign="middle" padded columns={3}>
                                    <Grid.Row>
                                        <Form.Field width={10}>
                                            <Grid.Column>
                                                <div>
                                                    <label>
                                                        {' '}
                                                        {t('assessment')}
                                                    </label>
                                                    <Dropdown
                                                        className="gradeDropdown"
                                                        style={{
                                                            marginLeft: '20px',
                                                        }}
                                                        placeholder={t(
                                                            'gradeSelect'
                                                        )}
                                                        selection
                                                        options={grades}
                                                        error={
                                                            gradeError !==
                                                            undefined
                                                        }
                                                        onChange={
                                                            !edit
                                                                ? handleDropdownChange
                                                                : null
                                                        }
                                                        value={
                                                            existingGrade
                                                                ? existingGrade.value
                                                                : state.value
                                                        }
                                                    />
                                                </div>
                                                <Message
                                                    error
                                                    content={
                                                        gradeError
                                                            ? gradeError.error
                                                            : null
                                                    }
                                                />
                                            </Grid.Column>
                                        </Form.Field>
                                        <Grid.Column />
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Form.Field width={10}>
                                            <Grid.Column>
                                                {textFieldOn ? (
                                                    <div>
                                                        <Form.TextArea
                                                            autoHeight
                                                            error={
                                                                responseTextError !==
                                                                undefined
                                                            }
                                                            label={t('basis')}
                                                            placeholder={t(
                                                                'writeBasis'
                                                            )}
                                                            onBlur={
                                                                !edit
                                                                    ? handleTextFieldOnBlur
                                                                    : undefined
                                                            }
                                                            onChange={
                                                                !edit
                                                                    ? handleTextFieldChange
                                                                    : undefined
                                                            }
                                                            defaultValue={
                                                                responseText
                                                            }
                                                        />
                                                        <Message
                                                            error
                                                            content={
                                                                responseTextError
                                                                    ? responseTextError.error
                                                                    : null
                                                            }
                                                        />
                                                    </div>
                                                ) : null}
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

CategoryQuestionModule.defaultProps = {
    final: false,
    courseInstanceId: null,
    responseTextError: undefined,
    gradeError: undefined,
    grades: [],
    existingAnswer: [
        {
            grade: null,
            responseText: null,
        },
    ],
}

CategoryQuestionModule.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
        headers: PropTypes.arrayOf(PropTypes.shape()),
        textFieldOn: PropTypes.bool,
    }).isRequired,
    final: PropTypes.bool,
    dispatchTextfieldResponseAction: PropTypes.func.isRequired,
    dispatchGradeCategoryAction: PropTypes.func.isRequired,
    dispatchClearErrorAction: PropTypes.func.isRequired,
    responseTextError: PropTypes.shape(),
    gradeError: PropTypes.shape(),
    courseInstanceId: PropTypes.number,
    edit: PropTypes.bool.isRequired,
    grades: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.number,
            value: PropTypes.number,
            text: PropTypes.string,
        })
    ),
    translate: PropTypes.func.isRequired,
    existingAnswer: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape()),
        PropTypes.shape(),
    ]),
}

const mapStateToProps = (state) => ({
    answers: state.selfAssesment.assesmentResponse,
})

const mapDispatchToProps = (dispatch) => ({
    dispatchTextfieldResponseAction: (data) =>
        dispatch(textfieldResponseAction(data)),
    dispatchGradeCategoryAction: (data) => dispatch(gradeCategoryAction(data)),
    dispatchClearErrorAction: (data) => dispatch(clearErrorAction(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryQuestionModule)
