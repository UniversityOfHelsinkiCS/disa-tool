import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { withLocalize } from 'react-localize-redux'
import { Button } from 'semantic-ui-react'
import asyncAction from '../../../../utils/asyncAction'
import { headerDetails } from '../../../../api/types'
import { editHeader } from '../../actions/types'
import ModalForm, { saveActions } from '../../../../utils/components/ModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import { useTranslation } from 'react-i18next'

const EditHeaderForm = (props) => {
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState({
    name: {
      eng: '',
      fin: '',
      swe: ''
    }
  })
  const dispatch = useDispatch()

  const {t} = useTranslation('translation')

  const asyncEditHeaderSubmit = async () => {
    const data ={
      id: props.headerId,
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value
    }
    const response = await editHeader(data)
    dispatch(response)
  }

  const loadDetails = async () => {
    const details = (await headerDetails({
      id: props.headerId
    })).data.data
    setLoading(false)
    setValues({
      name: {
        eng: details.eng_name,
        fin: details.fin_name,
        swe: details.swe_name
      }
    })
  }

    return (
      <div className="EditHeaderForm">
        <ModalForm
          header={t('course.types.editHeaderForm.header')}
          trigger={<Button basic circular onClick={loadDetails} icon={{ name: 'edit' }} size="mini" />}
          actions={saveActions(t)}
          onSubmit={asyncEditHeaderSubmit}
          loading={loading}
        >
          <MultilingualField field="name" fieldDisplay={t('common.name')} values={values.name} />
        </ModalForm>
      </div>
    )
  }
/*
EditHeaderForm.propTypes = {
  editHeader: PropTypes.func.isRequired,
  headerId: PropTypes.number.isRequired,
  headerDetails: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}
*/
const mapDispatchToProps = dispatch => ({
  editHeader: asyncAction(editHeader, dispatch),
  headerDetails
})

export default withLocalize(connect(null, mapDispatchToProps)(EditHeaderForm))
