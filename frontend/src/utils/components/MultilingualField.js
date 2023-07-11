import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Segment, Label, Input, Button } from 'semantic-ui-react'

export const MultilingualField = (props) => {
  console.log(props)
  const [multilingual, setMultilingual] = useState(false)
  const [values, setValues] = useState({
    eng: '',
  fin: '',
  swe: ''
})
  const {t} = useTranslation('translation')

  const changeValue = key => (key === 'all' ? (
    e => setValues({
        eng: e.target.value,
        fin: e.target.value,
        swe: e.target.value
    })
  ) : (
    e => setValues({
       ...values,
       [key]: e.target.value
      }
    
  )))

  const allValue = () => {
    if (values.eng !== '') {
      return values.eng
    }
    if (values.fin !== '') {
      return values.fin
    }
    return values.swe
  }

    const { required } = props
    return (
      <Form.Field className="MultilingualField">
        <div style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            <Label style={{ fontSize: '18px' }}>{props.fieldDisplay}</Label>
          </div>
          <Button.Group>
            <Button
              type="button"
              toggle
              active={!multilingual}
              onClick={() => setMultilingual( false)}
            >
              {t('utils.components.multilingualField.monolingual')}
            </Button>
            <Button.Or text={t('common.or')} />
            <Button
              type="button"
              toggle
              active={multilingual}
              onClick={() => setMultilingual( true)}
            >
              {t('utils.components.multilingualField.multilingual')}
            </Button>
          </Button.Group>
        </div>
        {!multilingual ? (
          <Input
            name="all"
            type="text"
            fluid
            value={allValue()}
            onChange={changeValue('all')}
            required={required}
          />
        ) : (
          null
        )}
        <Segment style={{ marginTop: '0px', display: multilingual ? 'block' : 'none' }}>
          <Form.Field>
            <Label>english</Label>
            <Input
              name={`eng_${props.field}`}
              type="text"
              fluid
              value={values.eng}
              onChange={changeValue('eng')}
              required={multilingual && required}
            />
          </Form.Field>
          <Form.Field>
            <Label>suomi</Label>
            <Input
              name={`fin_${props.field}`}
              type="text"
              fluid
              value={values.fin}
              onChange={changeValue('fin')}
              required={multilingual && required}
            />
          </Form.Field>
          <Form.Field>
            <Label>svenska</Label>
            <Input
              name={`swe_${props.field}`}
              type="text"
              fluid
              value={values.swe}
              onChange={changeValue('swe')}
              required={multilingual && required}
            />
          </Form.Field>
        </Segment>
      </Form.Field>
    )
  }
/*
MultilingualField.propTypes = {
  field: PropTypes.string.isRequired,
  fieldDisplay: PropTypes.string.isRequired,
  values: PropTypes.shape({
    eng: PropTypes.string,
    fin: PropTypes.string,
    swe: PropTypes.string
  }),
  t: PropTypes.func.isRequired,
  required: PropTypes.bool
}
*/

export default MultilingualField
