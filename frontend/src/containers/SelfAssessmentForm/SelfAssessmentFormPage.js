import React, {useState,useEffect} from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Redirect, Prompt,useParams } from 'react-router'
import { Link } from 'react-router-dom'
import {
  Button,
  Loader,
  Container,
  Modal,
  Header,
  Segment
} from 'semantic-ui-react'
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
  validationAction,
  clearValidationAction,
  closeModalAction,
  clearAssessmentAction,
  
} from './actions/selfAssesment'
import SelfAssessmentForm from './Components/SelfAssessmentForm'
import AssessmentMessage from './Components/AssessmentMessage'
import './Components/selfAssesment.css'
import { validationErrors, gradeOptions } from './utils'
import { useTranslation } from 'react-i18next'

export const SelfAssessmentFormPage = ({
  newAssessment = false,
  edit = false
}) => {
  const formData = useSelector(state => state.selfAssesment.createForm)
  const courseInstance = useSelector(state => state.instance)
  const assessmentResponse = useSelector(state => state.selfAssesment.assesmentResponse)
  const role = useSelector(state => state.instance.courseRole)
  const error = useSelector(state => state.error.redirect)
  const notTeacher = useSelector(state => state.instance.courseRole && state.instance.courseRole !== 'TEACHER')
  const responseErrors = useSelector(state => state.validation.responseErrors)
  const softErrors = useSelector(state => state.validation.softErrors)
  const formErrors = useSelector(state => state.validation.formErrors)
  const unsavedChanges = useSelector(state => state.selfAssesment.unsavedFormChanges)
  const [redirect, setRedirect] = useState(false)
  const [preview, setPreview] = useState(false)
  const [grades, setGrades] = useState([])

  const { courseInstanceId, type, selfAssessmentId } = useParams()
  const wow = useParams()

  console.log(wow)
  const dispatch = useDispatch()

  const { t } = useTranslation("translation", {keyPrefix: "SelfAssessmentForm.SelfAssessmentFormPage"})

  const asyncMount = async () => {
    if (edit) {
      if (newAssessment) {
        // Get assessment type and course instance id from params

        // Fetch the required data for self assessment
        // courseData includes all objectives and categories related to course
        // course info includes the names in eng, fin and swe

        const courseData = await getCourseData(courseInstanceId)
        const courseInfo = await getCourseInstance(courseInstanceId)

        // dispatch the call to reducer to generate the required form data with given parameters
        initNewFormAction({
          courseData: courseData.data,
          courseInfo: courseInfo.data.data,
          type
        },dispatch)
      } else {
        // Fetch the selfassesment data by given id
        await getSelfAssesmentAction(selfAssessmentId,dispatch)
      }

    } else {
      // Fetch the data of the self assessment
      // and fetch or create a self assessment response for the user
      await getSelfAssesmentAction(selfAssessmentId,dispatch)
      await getAssesmentResponseAction(selfAssessmentId,dispatch)
    }
    if (!role) {
      await getCourseInstanceDataAction(courseInstanceId,dispatch)
    }
    if (formData) {
      console.log("formData",formData)
      // Fetch the grades for the course
      const grades = await gradeOptions(courseInstanceId)
      setGrades(grades)
    } else {
      dispatch({
        type: '',
        payload: {
          toast: t('defineMatrixFirstError'),
          type: 'error'
        }
      })
    }
  }

  useEffect(() => {
    asyncMount()
    return(() => {
      if (error) {
        resetErrorAction(dispatch)
        
      }
      clearValidationAction(dispatch)
      clearAssessmentAction(dispatch)
    })
  },[])

  const handleSubmit = async () => {
    setRedirect(true)
    await createForm(formData,dispatch)
  }

  const handleUpdate = async () => {
    setRedirect(true)
    await updateSelfAssesmentAction(formData,dispatch)
  }

  const close = () => closeModalAction(dispatch)

  const checkResponseErrors = async () => {
    validationAction(assessmentResponse,dispatch)
    window.scrollTo(0, 0)
    if (formErrors) {
      dispatch({
        type: '',
        payload: {
          toast: validationErrors[localStorage.getItem('lang')],
          type: 'error'
        }
      })
      return true
    }
    return false
  }

  const handleResponse = async (e, { modal }) => {
    const error = await checkResponseErrors()

    if (error) return false
    if (softErrors && !modal) return false
    
    setRedirect(true)
    await createSelfAssessmentResponseAction({...assessmentResponse, finalHeaders: formData.structure.headers.grade},dispatch)
    clearValidationAction(dispatch)
  }

  const togglePreview = () => {
    setPreview(!preview)
  }

  const renderForm = () => {
    let submitFunction = null
    const { existingAnswer } = assessmentResponse
    const { displayCoursename } = formData.structure
    if (!edit) {
      submitFunction = handleResponse
    } else if (newAssessment) {
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
                to={`/user/course/${courseInstance.id}`}
                basic
                floated="left"
                color="blue"
                icon="backward"
                content={t('back_button')}
              />
              {displayCoursename}
            </Header>
          </Segment>

          <AssessmentMessage
            preview={preview}
            open={formData.open}
            edit={edit}
            existingAnswer={existingAnswer}
            t={t}
          />

          <Modal size="small" open={softErrors} onClose={close}>
            <Modal.Header>{t('modalHeader')}</Modal.Header>
            <Modal.Content>
              <p>{t('modalContent1')} .</p>
              <p>{t('modalContent2')}?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => close()} negative>
                {t('modalButton2')}
              </Button>
              <Button
                onClick={handleResponse}
                positive
                modal="modal"
                icon="checkmark"
                labelPosition="right"
                content={t('modalButton1')}
              />
            </Modal.Actions>
          </Modal>

          {edit && (
            <Button color="teal" onClick={togglePreview}>
              {preview
                ? t('editButton')
                : t('previewButton')}
            </Button>
          )}
          {preview || (!formData.open && !edit) ? null : (
            <Button
              positive
              style={{ marginBottom: '25px' }}
              onClick={submitFunction}
            >
              {!edit || newAssessment
                ? t('saveButton')
                : t('updateButton')}
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
                ? t('editButton')
                : t('previewButton')}
            </Button>
          )}
          {preview || (!formData.open && !edit) ? null : (
            <Button
              positive
              style={{ marginBottom: '25px' }}
              onClick={submitFunction}
            >
              {!edit || newAssessment
                ? t('saveButton')
                : t('updateButton')}
            </Button>
          )}
        </Container>
      </div>
    )
  }

    if (
      redirect ||
      error ||
      ((newAssessment || edit) && notTeacher)
    ) {
      return <Redirect to="/user" />
    }

    if (
      assessmentResponse.existingAnswer &&
      !formData.open
    ) {
      return (
        <FeedbackPage
          assessmentResponse={assessmentResponse}
          assessmentInfo={formData}
        />
      )
    }

    const renderContent = () => {
      if (!formData) {
        return <Redirect to={`/user/course/${courseInstanceId}`} />
      }
      if (Object.keys(formData).length > 0 && (Object.keys(assessmentResponse).length > 0 || edit) && role) {
        return renderForm()
      }
      return <Loader active>Loading</Loader>
    }

    return (
      <div>
        <Prompt
          when={unsavedChanges}
          message={(
            'SelfAssessmentForm.SelfAssessmentFormPage.prompt'
          )}
        />
        {renderContent()}
      </div>
    )
  }

/*
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
      selfAssessmentId: PropTypes.string
    }).isRequired
  }).isRequired,
  assessmentResponse: PropTypes.shape({
    existingAnswer: PropTypes.bool
  }).isRequired,
  dispatchToast: PropTypes.func.isRequired,
  role: PropTypes.string,
  error: PropTypes.bool.isRequired,
  notTeacher: PropTypes.bool,
  t: PropTypes.func.isRequired,
  softErrors: PropTypes.bool,
  responseErrors: PropTypes.shape(),
  unsavedChanges: PropTypes.bool.isRequired,
  courseInstance: PropTypes.shape({ id: PropTypes.number }).isRequired,
  preview: PropTypes.bool
}
*/

export default connect()(SelfAssessmentFormPage)
