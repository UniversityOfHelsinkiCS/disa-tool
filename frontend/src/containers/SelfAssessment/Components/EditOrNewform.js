import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Form } from 'semantic-ui-react'
import { withLocalize } from 'react-localize-redux'
import AssessmentButtons from './AssessmentButtons'
import SelfAssessmentList from './SelfAssessmentList'
import { useTranslation } from 'react-i18next'


export const EditOrNewForm = (props )=> {
  const [dropDownValue, setDropDownValue] = useState(null)
  const [selectedView, setSelectedView] = useState(null)

  useEffect(() => {
    setDropDownValue(parseInt(props.selectedCourse, 10))
  },[])

  handleDropdownChange = (e, { value }) => {
    setDropDownValue(value)
  }

  const {t} = useTranslation("translation", {keyPrefix: "selfAssessment.editOrNewForm"})

    const { dropDownCourse, selectedCourse, handleSubmit, selfAssessments } = props
    const selectedSelfAssessments = selfAssessments.filter(s =>
      s.course_instance_id === parseInt(dropDownValue, 10))

    return (
      <div>
        <Form>
          <Form.Field style={{ marginTop: '20px' }}>
            <Dropdown
              selection
              placeholder={t('placeholder')}
              onChange={handleDropdownChange}
              options={dropDownCourse}
              defaultValue={parseInt(selectedCourse, 10)}
            />
          </Form.Field>
          <Form.Field>
            {selectedSelfAssessments.length > 0 &&
              <SelfAssessmentList
                onClick={handleSubmit}
                selfAssessments={selectedSelfAssessments}
              />
            }
          </Form.Field>
          <Form.Field>
            <AssessmentButtons
              selectedView={selectedView}
              onClick={handleSubmit}
              value={dropDownValue}
            />
          </Form.Field>
        </Form>
      </div>

    )
  }
/*
EditOrNewForm.propTypes = {
  dropDownCourse: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selfAssessments: PropTypes.arrayOf(PropTypes.shape()),
  selectedCourse: PropTypes.string,
  t: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}
*/
export default EditOrNewForm
