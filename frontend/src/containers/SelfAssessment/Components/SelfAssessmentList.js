import React from 'react'
import { List } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const SelfAssessmentList = (props) => {
    const { selfAssessments, onClick } = props
    const { t } = useTranslation(`SelfAssessment.SelfAssessmentList`)

    return (
        <List animated selection>
            <List.Header>{t('header')}</List.Header>
            {selfAssessments.map((sa) => (
                <List.Item key={sa.id} id={sa.id} onClick={onClick}>
                    {sa.name}
                </List.Item>
            ))}
        </List>
    )
}

SelfAssessmentList.propTypes = {
    selfAssessments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onClick: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
}
export default SelfAssessmentList
