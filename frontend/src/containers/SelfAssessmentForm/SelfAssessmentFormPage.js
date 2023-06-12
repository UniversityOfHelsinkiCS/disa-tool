import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { redirect } from 'react-router'
import Prompt from '../../utils/components/Prompt'
import { Link, useParams } from 'react-router-dom'
import {
    Button,
    Loader,
    Container,
    Modal,
    Header,
    Segment,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import FeedbackPage from '../Feedback/FeedbackPage'
import { getCourseInstance } from '../../api/courses'
import { getCourseData } from '../../api/categories'
import {
    getSelfAssesmentAction,
    createForm,
    updateSelfAssesmentAction,
    getCourseInstanceDataAction,
    getAssesmentResponseAction,
    createSelfAssessmentResponseAction,
    resetErrorAction,
} from '../../actions/actions'
import {
    initNewFormAction,
    editFormAction,
    validationAction,
    clearValidationAction,
    closeModalAction,
    clearAssessmentAction,
} from './actions/selfAssesment'
import SelfAssessmentForm from './Components/SelfAssessmentForm'
import AssessmentMessage from './Components/AssessmentMessage'
import './Components/selfAssesment.css'

import { validationErrors, gradeOptions } from './utils'

const SelfAssessmentFormPage = (props) => {
    const params = useParams()
    const { t } = useTranslation()
    const [preview, setPreview] = useState(false)
    const [grades, setGrades] = useState([])
    const [redirectBool, setRedirectBool] = useState(false)

    const propsNew = async () => {
        // Get assessment type and course instance id from params

        // Fetch the required data for self assessment
        // courseData includes all objectives and categories related to course
        // course info includes the names in eng, fin and swe

        const courseData = await getCourseData(courseInstanceId)
        const courseInfo = await getCourseInstance(courseInstanceId)

        // dispatch the call to reducer to generate the required form data with given parameters
        props.dispatchInitNewFormAction({
            courseData: courseData.data,
            courseInfo: courseInfo.data.data,
            type: params.type,
        })
    }

    const asyncFunction = async (props) => {
        const { courseInstanceId, selfAssessmentId } = params
        if (props.edit) {
            if (props.new) {
                propsNew()
            } else {
                // Fetch the selfassesment data by given id
                await props.dispatchGetSelfAssessmentAction(selfAssessmentId)
            }
        } else {
            // Fetch the data of the self assessment
            // and fetch or create a self assessment response for the user
            await props.dispatchGetSelfAssessmentAction(selfAssessmentId)
            await props.dispatchGetAssessmentResponseAction(selfAssessmentId)
        }
        if (!props.role) {
            const id = courseInstanceId || props.formData.course_instance_id
            await props.dispatchGetCourseInstanceData(id)
        }

        if (props.formData) {
            // Fetch the grades for the course
            const grades = await gradeOptions(props.formData.course_instance_id)
            setGrades(grades)
        } else {
            props.dispatchToast({
                type: '',
                payload: {
                    toast: t(
                        'SelfAssessmentForm.SelfAssessmentFormPage.defineMatrixFirstError'
                    ),
                    type: 'error',
                },
            })
        }
    }

    useEffect(() => {
        asyncFunction()
        return () => {
            if (props.error) {
                props.dispatchClearError()
            }
            props.dispatchClearValidation()
            props.dispatchClearAssessmentAction()
        }
    }, [])

    const handleSubmit = async () => {
        const { formData } = props
        setRedirectBool(true)
        await props.dispatchCreateFormAction(formData)
    }

    const handleUpdate = async () => {
        const { formData } = props
        setRedirectBool(true)
        await props.dispatchUpdateSelfAssessmentAction(formData)
    }

    const close = () => props.dispatchCloseModalAction()

    const checkResponseErrors = async () => {
        await props.dispatchValidation(props.assessmentResponse)
        window.scrollTo(0, 0)
        if (props.formErrors) {
            await props.dispatchToast({
                type: '',
                payload: {
                    toast: validationErrors[localStorage.getItem('lang')],
                    type: 'error',
                },
            })
            return true
        }
        return false
    }

    const handleResponse = async (e, { modal }) => {
        const error = await checkResponseErrors()

        if (error) {
            return
        }

        if (props.softErrors && !modal) {
            return
        }
        setRedirectBool(true)
        await props.dispatchCreateSelfAssessmentResponseAction({
            ...props.assessmentResponse,
            finalHeaders: props.formData.structure.headers.grade,
        })
        await props.dispatchClearValidation()
    }

    const togglePreview = () => {
        setPreview(!preview)
    }

    const { courseInstanceId } = params
    if (
        redirectBool ||
        props.error ||
        ((props.new || props.edit) && props.notTeacher)
    ) {
        return redirect('/user')
    }

    if (props.assessmentResponse.existingAnswer && !props.formData.open) {
        return (
            <FeedbackPage
                assessmentResponse={props.assessmentResponse}
                assessmentInfo={props.formData}
            />
        )
    }

    const renderContent = () => {
        if (!props.formData) {
            return redirect('/user/course/${courseInstanceId}')
        }
        if (
            Object.keys(props.formData).length > 0 &&
            (Object.keys(props.assessmentResponse).length > 0 || props.edit) &&
            props.role
        ) {
            return (
                <RenderForm
                    togglePreview={togglePreview}
                    handleResponse={handleResponse}
                    handleSubmit={handleSubmit}
                    handleUpdate={handleUpdate}
                    preview={preview}
                    grades={grades}
                    close={close}
                ></RenderForm>
            )
        }
        return <Loader active>Loading</Loader>
    }

    return (
        <div>
            <Prompt
                when={props.unsavedChanges}
                message={t('SelfAssessmentForm.SelfAssessmentFormPage.prompt')}
            />
            {renderContent()}
        </div>
    )
}

const RenderForm = (props) => {
    let submitFunction = null
    const {
        formData,
        edit,
        responseErrors,
        assessmentResponse,
        handleResponse,
        handleSubmit,
        handleUpdate,
        togglePreview,
        preview,
        grades,
    } = props
    const { existingAnswer } = assessmentResponse
    const { displayCoursename } = formData.structure
    const translate = useTranslation(
        `SelfAssessmentForm.SelfAssessmentFormPage`
    )

    const { courseInstanceId } = useParams()

    if (!edit) {
        submitFunction = handleResponse
    } else if (props.new) {
        submitFunction = handleSubmit
    } else {
        submitFunction = handleUpdate
    }
    return (
        <div>
            <Container className="SelfAssessmentFormPage">
                <Segment>
                    <Header as="h1" textAlign="center">
                        <Button
                            as={Link}
                            to={`/user/course/${courseInstanceId}`}
                            basic
                            floated="left"
                            color="blue"
                            icon="backward"
                            content={translate('back_button')}
                        />
                        {displayCoursename}
                    </Header>
                </Segment>

                <AssessmentMessage
                    preview={preview}
                    open={formData.open}
                    edit={edit}
                    existingAnswer={existingAnswer}
                    translate={translate}
                />

                <Modal size="small" open={props.softErrors} onClose={close}>
                    <Modal.Header>{translate('modalHeader')}</Modal.Header>
                    <Modal.Content>
                        <p>{translate('modalContent1')} .</p>
                        <p>{translate('modalContent2')}?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => close()} negative>
                            {translate('modalButton2')}
                        </Button>
                        <Button
                            onClick={handleResponse}
                            positive
                            modal="modal"
                            icon="checkmark"
                            labelPosition="right"
                            content={translate('modalButton1')}
                        />
                    </Modal.Actions>
                </Modal>

                {edit && (
                    <Button color="teal" onClick={togglePreview}>
                        {preview
                            ? translate('editButton')
                            : translate('previewButton')}
                    </Button>
                )}
                {preview || (!formData.open && !edit) ? null : (
                    <Button
                        positive
                        style={{ marginBottom: '25px' }}
                        onClick={submitFunction}
                    >
                        {!props.edit || props.new
                            ? translate('saveButton')
                            : translate('updateButton')}
                    </Button>
                )}

                <SelfAssessmentForm
                    edit={edit}
                    formData={formData}
                    responseErrors={responseErrors}
                    preview={preview}
                    grades={grades}
                    existingAnswer={assessmentResponse}
                />

                {edit && (
                    <Button color="teal" onClick={togglePreview}>
                        {preview
                            ? translate('editButton')
                            : translate('previewButton')}
                    </Button>
                )}
                {preview || (!formData.open && !edit) ? null : (
                    <Button
                        positive
                        style={{ marginBottom: '25px' }}
                        onClick={submitFunction}
                    >
                        {!props.edit || props.new
                            ? translate('saveButton')
                            : translate('updateButton')}
                    </Button>
                )}
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    formData: state.selfAssesment.createForm,
    courseInstance: state.instance,
    assessmentResponse: state.selfAssesment.assesmentResponse,
    role: state.instance.courseRole,
    error: state.error.redirect,
    notTeacher:
        state.instance.courseRole && state.instance.courseRole !== 'TEACHER',
    responseErrors: state.validation.responseErrors,
    softErrors: state.validation.softErrors,
    formErrors: state.validation.formErrors,
    unsavedChanges: state.selfAssesment.unsavedFormChanges,
})

const mapDispatchToProps = (dispatch) => ({
    dispatchCreateFormAction: (data) => dispatch(createForm(data)),
    dispatchUpdateSelfAssessmentAction: (data) =>
        dispatch(updateSelfAssesmentAction(data)),
    dispatchGetSelfAssessmentAction: (selfAssessmentId) =>
        dispatch(getSelfAssesmentAction(selfAssessmentId)),
    dispatchInitNewFormAction: (data) => dispatch(initNewFormAction(data)),
    dispatchEditFormAction: (data) => dispatch(editFormAction(data)),
    dispatchGetAssessmentResponseAction: (selfAssessmentId) =>
        dispatch(getAssesmentResponseAction(selfAssessmentId)),
    dispatchCreateSelfAssessmentResponseAction: (data, finalGradeHeaders) =>
        dispatch(createSelfAssessmentResponseAction(data, finalGradeHeaders)),
    dispatchToast: (data) => dispatch(data),
    dispatchGetCourseInstanceData: (courseId) =>
        dispatch(getCourseInstanceDataAction(courseId)),
    dispatchClearError: () => dispatch(resetErrorAction()),
    dispatchValidation: (data) => dispatch(validationAction(data)),
    dispatchClearValidation: () => dispatch(clearValidationAction()),
    dispatchCloseModalAction: () => dispatch(closeModalAction()),
    dispatchClearAssessmentAction: () => dispatch(clearAssessmentAction()),
})

SelfAssessmentFormPage.defaultProps = {
    formData: {} || [],
    new: false,
    role: null,
    notTeacher: undefined,
    softErrors: false,
    responseErrors: {},
    formErrors: false,
    preview: false,
}

SelfAssessmentFormPage.propTypes = {
    formData: PropTypes.shape(),
    new: PropTypes.bool,
    edit: PropTypes.bool.isRequired,
    dispatchCreateFormAction: PropTypes.func.isRequired,
    dispatchUpdateSelfAssessmentAction: PropTypes.func.isRequired,
    dispatchInitNewFormAction: PropTypes.func.isRequired,
    dispatchGetAssessmentResponseAction: PropTypes.func.isRequired,
    dispatchGetSelfAssessmentAction: PropTypes.func.isRequired,
    dispatchGetCourseInstanceData: PropTypes.func.isRequired,
    dispatchClearError: PropTypes.func.isRequired,
    dispatchCreateSelfAssessmentResponseAction: PropTypes.func.isRequired,
    dispatchClearValidation: PropTypes.func.isRequired,
    dispatchCloseModalAction: PropTypes.func.isRequired,
    dispatchClearAssessmentAction: PropTypes.func.isRequired,
    dispatchValidation: PropTypes.func.isRequired,
    formErrors: PropTypes.bool,
    match: PropTypes.shape({
        params: PropTypes.shape({
            courseInstanceId: PropTypes.string,
            type: PropTypes.string,
            selfAssessmentId: PropTypes.string,
        }).isRequired,
    }).isRequired,
    assessmentResponse: PropTypes.shape({
        existingAnswer: PropTypes.bool,
    }).isRequired,
    dispatchToast: PropTypes.func.isRequired,
    role: PropTypes.string,
    error: PropTypes.bool.isRequired,
    notTeacher: PropTypes.bool,
    translate: PropTypes.func.isRequired,
    softErrors: PropTypes.bool,
    responseErrors: PropTypes.shape(),
    unsavedChanges: PropTypes.bool.isRequired,
    courseInstance: PropTypes.shape({ id: PropTypes.number }).isRequired,
    preview: PropTypes.bool,
}

RenderForm.propTypes = {
    preview: PropTypes.bool,
    formData: PropTypes.shape(),
    new: PropTypes.bool,
    edit: PropTypes.bool.isRequired,
    softErrors: PropTypes.bool,
    responseErrors: PropTypes.shape(),
    assessmentResponse: PropTypes.shape({
        existingAnswer: PropTypes.bool,
    }).isRequired,
    handleResponse: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    togglePreview: PropTypes.func.isRequired,
    grades: PropTypes.shape(),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelfAssessmentFormPage)
