import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button } from 'semantic-ui-react'
import { selectAll, deselectAll } from '../actions/selfAssesmentList'

export const SelectAllButton = connect(null, (dispatch) => ({
    select: selectAll(dispatch),
}))((props) => {
    const { t } = useTranslation()
    return (
        <Button
            basic
            content={t('SelfAssessmentList.SelectionButtons.select')}
            onClick={props.select}
        />
    )
})
export const DeselectAllButton = connect(null, (dispatch) => ({
    deselect: deselectAll(dispatch),
}))((props) => {
    const { t } = useTranslation()
    return (
        <Button
            basic
            content={t('SelfAssessmentList.SelectionButtons.deselect')}
            onClick={props.deselect}
        />
    )
})
