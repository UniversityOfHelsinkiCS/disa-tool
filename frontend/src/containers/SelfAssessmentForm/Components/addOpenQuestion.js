import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import ModalForm, { saveActions } from '../../../utils/components/ModalForm'
import { addOpenQuestion } from '../actions/selfAssesment'
import MultilingualField from '../../../utils/components/MultilingualField'

const AddOpenQuestion = (props) => {
    const { t } = useTranslation(`SelfAssessmentForm.addOpenQuestion`)

    const createQuestion = (e) =>
        props.dispatchAddOpenQuestion({
            eng_name: e.target.eng_name.value,
            fin_name: e.target.fin_name.value,
            swe_name: e.target.swe_name.value,
        })

    return (
        <ModalForm
            header={t('addButton')}
            trigger={
                <span>
                    <Button positive>{t('addButton')}</Button>
                </span>
            }
            actions={saveActions(t)}
            onSubmit={createQuestion}
        >
            <MultilingualField
                field="name"
                fieldDisplay={t('questionDisplay')}
            />
        </ModalForm>
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchAddOpenQuestion: (questionData) =>
        dispatch(addOpenQuestion(questionData)),
})

AddOpenQuestion.propTypes = {
    dispatchAddOpenQuestion: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(AddOpenQuestion)
