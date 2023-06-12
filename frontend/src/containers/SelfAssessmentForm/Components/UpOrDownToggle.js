import React from 'react'
import { connect } from 'react-redux'
import { Icon, Popup } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { toggleUp, toggleDown } from '../actions/selfAssesment'

const UpOrDownToggle = (props) => {
    const { id } = props
    const { t } = useTranslation(`SelfAssessmentForm.UpOrDownToggle`)
    return (
        <div>
            <Popup
                trigger={
                    <Icon
                        color="red"
                        name="arrow circle down"
                        size="big"
                        onClick={() => props.dispatchDown(id)}
                    />
                }
                content={t('downButton')}
            />
            <Popup
                trigger={
                    <Icon
                        color="green"
                        name="arrow circle up"
                        size="big"
                        onClick={() => props.dispatchUp(id)}
                    />
                }
                content={t('upButton')}
            />
        </div>
    )
}

UpOrDownToggle.propTypes = {
    id: PropTypes.number.isRequired,
    dispatchDown: PropTypes.func.isRequired,
    dispatchUp: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    dispatchUp: (id) => dispatch(toggleUp(id)),
    dispatchDown: (id) => dispatch(toggleDown(id)),
})

export default connect(null, mapDispatchToProps)(UpOrDownToggle)
