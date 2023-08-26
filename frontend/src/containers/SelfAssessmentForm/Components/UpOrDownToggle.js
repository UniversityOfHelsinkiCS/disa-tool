import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Icon, Popup } from 'semantic-ui-react'
import { toggleUp, toggleDown } from '../actions/selfAssesment'
import { useTranslation } from 'react-i18next'

const UpOrDownToggle = (props) => {
  const { id } = props
  const dispatch = useDispatch()
  const {t} = useTranslation("translation", {keyPrefix: "selfAssessmentForm.upOrDownToggle"})

  const asyncToggleUp = async (id) => {
    toggleUp(id,dispatch)
  }

  const asyncToggleDown = async (id) => {
    toggleDown(id,dispatch)
  }

  return (
    <div>
      <Popup
        trigger={
          <Icon
          data-testid={`toggle-down-button-${id}`}
            color="red"
            name="arrow circle down"
            size="big"
            onClick={() => asyncToggleDown(id)}
          />}
        content={t('downButton')}
      />
      <Popup
        trigger={
          <Icon
          data-testid={`toggle-up-button-${id}`}
            color="green"
            name="arrow circle up"
            size="big"
            onClick={() => asyncToggleUp(id)}
          />}
        content={t('upButton')}
      />
    </div>
  )
}
/*
UpOrDownToggle.propTypes = {
  id: PropTypes.number.isRequired,
  dispatchDown: PropTypes.func.isRequired,
  dispatchUp: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
}
*/

export default connect()(UpOrDownToggle)
