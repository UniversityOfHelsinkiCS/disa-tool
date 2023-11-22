import React, { useState,useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Segment, Label, Input, Button } from 'semantic-ui-react'

export const MultilingualField = ({
  id,
values,
fieldDisplay, 
type, 
field, 
required
}) => {
  const [multilingual, setMultilingual] = useState(false)
  const [localValue, setLocalValue] = useState({
    eng: '',
  fin: '',
  swe: ''
})
  const {t} = useTranslation('translation')

  useEffect(() => {
    if(values) {
      setLocalValue(values)
      if(values.eng !== values.fin || values.fin !== values.swe) {
        setMultilingual(true)
    }
  }
  },[values])

  const changeValue = key => (key === 'all' ? (
    e => setLocalValue({
        eng: e.target.value,
        fin: e.target.value,
        swe: e.target.value
    })
  ) : (
    e => setLocalValue({
       ...values,
       [key]: e.target.value
      }
    
  )))

  const allValue = () => {
    if (localValue.eng !== '' ) {
      return localValue.eng
    }
    if (localValue.fin !== '') {
      return localValue.fin
    }
    return localValue.swe
  }

    return (
      <Form.Field className="MultilingualField">
        <div style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            <Label style={{ fontSize: '18px' }}>{fieldDisplay}</Label>
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
            data-testid={`multilingual-field-single-${type}-${id}`}
            name={`${field}-input`}
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
              name={`eng_${field}`}
              data-testid={`multilingual-field-multi-english-${type}-${id}`}
              type="text"
              fluid
              value={localValue.eng}
              onChange={changeValue('eng')}
              required={multilingual && required}
            />
          </Form.Field>
          <Form.Field>
            <Label>suomi</Label>
            <Input
              name={`fin_${field}`}
              data-testid={`multilingual-field-multi-finnish-${type}-${id}`}
              type="text"
              fluid
              value={localValue.fin}
              onChange={changeValue('fin')}
              required={multilingual && required}
            />
          </Form.Field>
          <Form.Field>
            <Label>svenska</Label>
            <Input
              name={`swe_${field}`}
              data-testid={`multilingual-field-multi-swedish-${type}-${id}`}
              type="text"
              fluid
              value={localValue.swe}
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
