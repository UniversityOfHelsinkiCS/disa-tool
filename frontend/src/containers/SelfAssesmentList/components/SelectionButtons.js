import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { selectAll, deselectAll } from '../actions/selfAssesmentList'

const SelectAllButton = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'selfAssessmentList.selectionButtons' })
  const dispatch = useDispatch()
  const handleClick = () => {
    selectAll(dispatch)
  }
  return <Button basic content={t('select')} onClick={() => handleClick} />
}

const DeselectAllButton = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'selfAssessmentList.selectionButtons' })

  const dispatch = useDispatch()
  const handleClick = () => {
    deselectAll(dispatch)
  }
  return <Button basic content={t('deselect')} onClick={() => handleClick} />
}

export { SelectAllButton, DeselectAllButton }
