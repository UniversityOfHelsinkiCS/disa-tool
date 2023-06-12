import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Form } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import AssessmentButtons from './AssessmentButtons'
import SelfAssessmentList from './SelfAssessmentList'

const EditOrNewForm = (props) => {
    const [dropdownValue, setDropdownValue] = useState(null)
    const { t } = useTranslation(`SelfAssessment.EditOrNewForm`)

    useEffect(() => {
        setDropdownValue(parseInt(props.selectedCourse, 10))
    }, [])

    const handleDropdownChange = (e, { value }) => {
        setDropdownValue(value)
    }

    const { dropDownCourse, selectedCourse, handleSubmit, selfAssessments } =
        props
    const selectedSelfAssessments = selfAssessments.filter(
        (s) => s.course_instance_id === parseInt(dropdownValue, 10)
    )

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
                    {selectedSelfAssessments.length > 0 && (
                        <SelfAssessmentList
                            onClick={handleSubmit}
                            selfAssessments={selectedSelfAssessments}
                        />
                    )}
                </Form.Field>
                <Form.Field>
                    <AssessmentButtons
                        //         selectedView={selectedView}
                        onClick={handleSubmit}
                        value={dropdownValue}
                    />
                </Form.Field>
            </Form>
        </div>
    )
}

EditOrNewForm.propTypes = {
    dropDownCourse: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    selfAssessments: PropTypes.arrayOf(PropTypes.shape()),
    selectedCourse: PropTypes.string,
    translate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}

EditOrNewForm.defaultProps = {
    selfAssessments: [],
    selectedCourse: null,
}
export default EditOrNewForm
