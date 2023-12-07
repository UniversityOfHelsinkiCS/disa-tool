import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Segment, Label, Input, Button } from 'semantic-ui-react'

export const MultilingualField = ({ id, values, fieldDisplay, type, field, required }) => {
  const [multilingual, setMultilingual] = useState(false)
  const [localValue, setLocalValue] = useState({
    eng: values?.eng || '',
    fin: values?.fin || '',
    swe: values?.swe || '',
  })
  const { t } = useTranslation('translation')

  useEffect(() => {
    if (values) {
      if (values.eng !== values.fin || values.fin !== values.swe) {
        setMultilingual(true)
      }
    }
  }, [])
  const changeValue = (value, key) => {
    if (key === 'all') {
      setLocalValue({
        eng: value,
        fin: value,
        swe: value,
      })
    } else {
      setLocalValue({
        ...values,
        [key]: value,
      })
    }
  }
  const allValue = () => {
    if (localValue.eng !== '') {
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
          <Button type="button" toggle active={!multilingual} onClick={() => setMultilingual(false)}>
            {t('utils.components.multilingualField.monolingual')}
          </Button>
          <Button.Or text={t('common.or')} />
          <Button type="button" toggle active={multilingual} onClick={() => setMultilingual(true)}>
            {t('utils.components.multilingualField.multilingual')}
          </Button>
        </Button.Group>
      </div>
      {!multilingual ? (
        <Input
          data-testid={`multilingual-field-single-${type}-${id}`}
          name={`all-${field}-input`}
          type="text"
          fluid
          value={allValue()}
          onChange={(e) => changeValue(e.target.value, 'all')}
          required={required}
        />
      ) : null}
      <Segment style={{ marginTop: '0px', display: multilingual ? 'block' : 'none' }}>
        <Form.Field>
          <Label>english</Label>
          <Input
            name={`eng_${field}`}
            data-testid={`multilingual-field-multi-english-${type}-${id}`}
            type="text"
            fluid
            value={localValue.eng}
            onChange={(e) => changeValue(e.target.value, 'eng')}
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
            onChange={(e) => changeValue(e.target.value, 'fin')}
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
            onChange={(e) => changeValue(e.target.value, 'swe')}
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
