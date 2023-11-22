import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { selectAll, deselectAll } from '../actions/selfAssesmentList'
import { useTranslation } from 'react-i18next'

const SelectAllButton = (props) => {
  const { t } = useTranslation('translation', { keyPrefix: 'selfAssessmentList.selectionButtons' })
  const dispatch = useDispatch()
  const handleClick = () => {
    selectAll(dispatch)
  }
  return <Button basic content={t('select')} onClick={() => handleClick} />
}

const DeselectAllButton = (props) => {
  const { t } = useTranslation('translation', { keyPrefix: 'selfAssessmentList.selectionButtons' })

  const dispatch = useDispatch()
  const handleClick = () => {
    deselectAll(dispatch)
  }
  return <Button basic content={t('deselect')} onClick={() => handleClick} />
}

export { SelectAllButton, DeselectAllButton }
