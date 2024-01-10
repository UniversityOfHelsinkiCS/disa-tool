import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import MultiLangInput from './MultiLangInput'
import { changeHeaderAction } from '../actions/selfAssesment'

const Header = ({
  dispatchChange = null,
  headerType = null,
  style = null,
  editButton = false,
  headers = [],
  headerName,
  edit,
  nestedForms,
}) => {
  const [editHeaders, setEditHeaders] = useState(false)
  const [changedHeaders] = useState({})
  const dispatch = useDispatch()

  const toggleEdit = () => {
    dispatchChange //eslint-disable-line
      ? dispatchChange(changedHeaders)
      : changeHeaderAction({ changedHeaders, headerType }, dispatch)
    setEditHeaders(!editHeaders)
  }

  const changeHeader = (id, value) => {
    const oldState = changedHeaders
    oldState[id] = value
    setEditHeaders(oldState)
  }

  const { t } = useTranslation('translation', { keyPrefix: 'selfAssessmentForm.header' })

  const header = editButton ? (
    <div>
      {headerName}
      {edit && (
        <Button className="editHeadersButton" onClick={toggleEdit} style={{ marginLeft: '10px' }}>
          {editHeaders ? t('buttonSave') : t('buttonEdit')}
        </Button>
      )}
    </div>
  ) : (
    headerName
  )

  let headerEditForm = editHeaders && (
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

  if (nestedForms) {
    headerEditForm = editHeaders && (
      <div
        style={{
          marginBottom: '10px',
        }}
      >
        <MultiLangInput headers={headers} handleChange={changeHeader} />
      </div>
    )
  }
  return (
    <div>
      <h3 style={style || null} className="cardHead">
        {header}
      </h3>
      {headerEditForm}
    </div>
  )
}

/*
Header.propTypes = {
  headerName: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  headerType: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.shape()),
  style: PropTypes.shape(),
  dispatchHeaderChange: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  dispatchChange: PropTypes.func,
  editButton: PropTypes.bool,
}
*/
export default connect()(Header)
