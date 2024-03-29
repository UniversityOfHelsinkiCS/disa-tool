import { Grid, Checkbox, Button, Divider } from 'semantic-ui-react'
import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import UpOrDownToggle from '../UpOrDownToggle'
import { toggleTextField, toggleFormPartAction } from '../../actions/selfAssesment'
import Header from '../Header'

const EditCategorymodule = (props) => {
  const { name, textFieldOn, id, includedInAssesment, headers } = props.data
  const { final } = props
  const dispatch = useDispatch()
  const { t } = useTranslation('translation', {
    keyPrefix: 'selfAssessmentForm.questionModules.editCategoryModule',
  })

  return (
    <div data-testid={`edit-category-module-${id}`}>
      <Grid columns="4" padded>
        <Grid.Column width={final ? 8 : null}>
          <Header
            headerName={name}
            edit
            headers={headers}
            editButton={final}
            style={{ color: includedInAssesment ? 'black' : 'grey', textAlign: 'left' }}
          />
          <Checkbox
            data-testid={`show-explanation-button-${id}`}
            style={{ marginTop: '10px' }}
            defaultChecked={textFieldOn}
            onChange={() => toggleTextField(id, dispatch)}
            label={t('label')}
            disabled={!includedInAssesment}
          />
        </Grid.Column>
        <Grid.Column floated="right">
          <Button
            data-testid={`toggle-category-included-button-${id}`}
            style={{ marginTop: '20px' }}
            className="toggleFormPartButton"
            size="large"
            basic
            color={includedInAssesment ? 'green' : 'red'}
            onClick={() => toggleFormPartAction(id, 'category', dispatch)}
          >
            {includedInAssesment ? t('includedButton') : t('notIncludedButton')}
          </Button>
        </Grid.Column>
        <Grid.Column verticalAlign="middle">{!final ? <UpOrDownToggle id={id} /> : null}</Grid.Column>
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
