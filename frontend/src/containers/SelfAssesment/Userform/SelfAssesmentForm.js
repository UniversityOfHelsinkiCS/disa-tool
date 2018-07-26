import React from 'react'
import { connect } from 'react-redux'
import { Form, Grid, Button, Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import ObjectiveQuestionModule from './FormParts/QuestionModules/ObjectiveQuestionModule'
import CategoryQuestionModule from './FormParts/QuestionModules/CategoryQuestionModule'
import OpenQuestionModule from './FormParts/QuestionModules/OpenQuestionModule'
import SelfAssesmentInfo from './FormParts/Sections/SelfAssesmentInfo'
import './selfAssesment.css'
import SelfAssesmentSection from './FormParts/Sections/SelfAssesmentSection'
import { Redirect } from 'react-router'
import {
  getSelfAssesmentAction, createForm, updateSelfAssesmentAction, getCourseInstanceDataAction, initNewFormAaction, editFormAction, getCourseData, getCourseInstance
} from '../../../actions/actions'


class SelfAssesmentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }
  async componentDidMount() {
    if (this.props.edit && this.props.new) {

      // Get assesment type and course instance id from params

      const { courseInstanceId, type } = this.props.match.params

      // Fetch the required data for self assesment
      // courseData includes all objectives and categories related to course
      // course info includes the names in eng, fin and swe

      const courseData = await getCourseData(courseInstanceId)
      const courseInfo = await getCourseInstance(courseInstanceId)

      // dispatch the call to reducer to generate the required form data with given parameters

      this.props.dispatchInitNewFormAaction({ courseData: courseData.data, courseInfo: courseInfo.data.data, type })
    }
    if (this.props.edit && !this.props.new) {
      const { selfAssesmentId } = this.props.match.params
      // Fetch the selfassesment data by given id
      await this.props.dispatchGetSelfAssesmentAction(selfAssesmentId)
    }
  }

  handleSubmit = async () => {
    const { formData } = this.props
    await this.props.dispatchCreateFormAction(formData)
    this.setState({ redirect: true })
  }

  handleUpdate = async () => {
    const { formData } = this.props
    await this.props.dispatchUpdateSelfAssesmentAction(formData)
    this.setState({ redirect: true })
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to="/selfassesment" />
    }
    const textArea = (label, placeholder, textFieldOn, checkbox) => (
      (
        <Grid.Column>
          <Form.TextArea
            disabled={!textFieldOn}
            label={label}
            placeholder={placeholder}
          />
          {checkbox}
        </Grid.Column>
      )
    )
    const renderEditForm = () => {
      const { formData, edit } = this.props
      const { structure } = formData
      const { displayCoursename, type, formInfo } = structure
      const { openQ, questionHeaders, grade } = structure.headers


      return (
        <div>
          <h2 style={{ textAlign: 'center' }}>{displayCoursename}</h2>

          <SelfAssesmentInfo
            textArea={textArea}
            formData={formInfo}
          />

          {type === 'category' ?
            <SelfAssesmentSection
              headers={questionHeaders}
              formData={structure.questionModules}
              edit={edit}
              textArea={textArea}
              QuestionModule={CategoryQuestionModule}
            />
            :
            <SelfAssesmentSection
              headers={questionHeaders}
              formData={structure.questionModules}
              edit={edit}
              textArea={textArea}
              QuestionModule={ObjectiveQuestionModule}
            />
          }

          <SelfAssesmentSection
            headers={openQ}
            formData={structure.openQuestions}
            edit={edit}
            textArea={textArea}
            QuestionModule={OpenQuestionModule}
            question
          />

          {type === 'category' ?

            <SelfAssesmentSection
              headers={grade}
              formData={[structure.finalGrade]}
              edit={edit}
              textArea={textArea}
              QuestionModule={CategoryQuestionModule}
              final
              headerType="grade"
            />
            :
            null
          }
          <Button
            positive
            style={{ marginBottom: '25px' }}
            onClick={this.props.new ? this.handleSubmit : this.handleUpdate}
          >
            {this.props.new ? 'Tallenna' : 'Päivitä'}
          </Button>

        </div>
      )
    }
    return (
      <div>
        {this.props.edit && Object.keys(this.props.formData).length > 0 ?
          renderEditForm()
          :
          <Loader active>Loading</Loader>
        }
      </div >
    )
  }
}

const mapStateToProps = state => ({
  formData: state.selfAssesment.createForm,
  courseInstance: state.instance
})

const mapDispatchToProps = dispatch => ({
  dispatchCreateFormAction: data =>
    dispatch(createForm(data)),

  dispatchUpdateSelfAssesmentAction: data =>
    dispatch(updateSelfAssesmentAction(data)),

  dispatchGetSelfAssesmentAction: selfAssesmentId =>
    dispatch(getSelfAssesmentAction(selfAssesmentId)),

  dispatchGetCourseInstanceDataAction: courseInstanceId =>
    dispatch(getCourseInstanceDataAction(courseInstanceId)),

  dispatchInitNewFormAaction: data =>
    dispatch(initNewFormAaction(data)),

  dispatchEditFormAction: data =>
    dispatch(editFormAction(data))

})

SelfAssesmentForm.defaultProps = {
  formData: {} || []
}


SelfAssesmentForm.propTypes = {
  formData: PropTypes.shape(),
  edit: PropTypes.bool.isRequired,
  dispatchCreateFormAction: PropTypes.func.isRequired,
  dispatchUpdateSelfAssesmentAction: PropTypes.func.isRequired

}

export default connect(mapStateToProps, mapDispatchToProps)(SelfAssesmentForm)
