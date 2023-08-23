import { Grid, Checkbox, Button, Divider } from 'semantic-ui-react'
import React from 'react'
import { connect, useDispatch } from 'react-redux'
import UpOrDownToggle from '../UpOrDownToggle'
import { toggleTextField, toggleFormPartAction } from '../../actions/selfAssesment'
import Header from '../Header'
import { useTranslation } from 'react-i18next'

const EditCategorymodule = (props) => {
  const { name, textFieldOn, id, includedInAssesment,headers } = props.data
  const { final } = props
const dispatch = useDispatch()
  const {t} = useTranslation("translation", {keyPrefix: "selfAssessmentForm.questionModules.editCategoryModule"})


  return (
    <div>
      <Grid columns="4" padded >
        <Grid.Column width={final ? 8 : null}>
          <Header
            name={name}
            edit
            headers={headers}
            editButton={final}
            style={{ color: (includedInAssesment ? 'black' : 'grey'), textAlign: 'left' }}
          />
          <Checkbox
            style={{ marginTop: '10px' }}
            defaultChecked={textFieldOn}
            onChange={() => toggleTextField(id,dispatch)}
            label={t('label')}
            disabled={!includedInAssesment}
          />
        </Grid.Column>
        <Grid.Column floated="right">
          <Button
            style={{ marginTop: '20px' }}
            className="toggleFormPartButton"
            size="large"
            basic
            color={includedInAssesment ? 'green' : 'red'}
            onClick={() => toggleFormPartAction(id, 'category',dispatch)}
          >{includedInAssesment ? t('includedButton') : t('notIncludedButton')}
          </Button>
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          {!final ? <UpOrDownToggle id={id} /> : null}
        </Grid.Column>
      </Grid>
      <Divider fitted />
    </div>
  )
}

/*
EditCategorymodule.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    headers: PropTypes.arrayOf(PropTypes.shape()),
    textFieldOn: PropTypes.bool,
    includedInAssesment: PropTypes.bool
  }).isRequired,
  final: PropTypes.bool,
  dispatchTextFieldOnOff: PropTypes.func.isRequired,
  dispatchToggleFormPartAction: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}
*/

export default connect()(EditCategorymodule)
