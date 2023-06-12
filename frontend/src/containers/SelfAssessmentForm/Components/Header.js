import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import MultiLangInput from './MultiLangInput'
import { changeHeaderAction } from '../actions/selfAssesment'

const Header = (props) => {
    const [editHeaders, setEditHeaders] = useState(false)
    const [changedHeaders, setChangedHeaders] = useState({})
    const { t } = useTranslation(`SelfAssessmentForm.Header`)
    const { name, edit, headers, style, editButton } = props

    const toggleEdit = () => {
        const { headerType } = props
        props.dispatchChange //eslint-disable-line
            ? props.dispatchChange(changedHeaders)
            : props.dispatchHeaderChange({
                  changedHeaders,
                  headerType,
              })
        setChangedHeaders(!editHeaders)
    }

    const changeHeader = (id, value) => {
        const oldState = changedHeaders
        oldState[id] = value
        setEditHeaders(oldState)
    }

    const header = editButton ? (
        <div>
            {name}
            {edit && (
                <Button
                    className="editHeadersButton"
                    onClick={toggleEdit}
                    style={{ marginLeft: '10px' }}
                >
                    {editHeaders ? t('buttonSave') : t('buttonEdit')}
                </Button>
            )}
        </div>
    ) : (
        name
    )

    const headerEditForm = editHeaders && (
        <div
            style={{
                marginBottom: '10px',
            }}
        >
            <Form>
                <MultiLangInput headers={headers} handleChange={changeHeader} />
            </Form>
        </div>
    )

    return (
        <div>
            <h3 style={props.style ? style : null} className="cardHead">
                {header}
            </h3>
            {headerEditForm}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchHeaderChange: (data) => dispatch(changeHeaderAction(data)),
})

Header.defaultProps = {
    dispatchChange: null,
    headerType: null,
    style: null,
    editButton: false,
    headers: [],
}

Header.propTypes = {
    name: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
    headerType: PropTypes.string,
    headers: PropTypes.arrayOf(PropTypes.shape()),
    style: PropTypes.shape(),
    dispatchHeaderChange: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    dispatchChange: PropTypes.func,
    editButton: PropTypes.bool,
}

export default connect(null, mapDispatchToProps)(Header)
