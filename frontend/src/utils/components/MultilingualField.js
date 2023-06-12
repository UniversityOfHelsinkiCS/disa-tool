import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Form, Segment, Label, Input, Button } from 'semantic-ui-react'

const MultilingualField = (props) => {
    const [multilingual, setMultilingual] = useState(values)
    const { values, fieldDisplay, field } = props

    const memoizedValues = useMemo(() => {
        if (values !== values) {
            const multilingualFromProps =
                values.eng !== multilingual.values.fin ||
                values.fin !== multilingual.values.swe
            setMultilingual({
                values: values,
                multilingual: multilingualFromProps,
            })
        }
    }, [values])

    const changeValue = (key) =>
        key === 'all'
            ? (e) =>
                  setMultilingual({
                      values: {
                          eng: e.target.value,
                          fin: e.target.value,
                          swe: e.target.value,
                      },
                      ...multilingual,
                  })
            : (e) =>
                  setMultilingual({
                      ...multilingual,
                      values: { key: e.target.value },
                  })

    const allValue = () => {
        if (values.eng !== '') {
            return values.eng
        }
        if (values.fin !== '') {
            return values.fin
        }
        return values.swe
    }

    const { t } = useTranslation(`utils.components.MultilingualField`)

    const { required } = props
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
                        onClick={() =>
                            setMultilingual({
                                ...multilingual,
                                multilingual: false,
                            })
                        }
                    >
                        {t('monolingual')}
                    </Button>
                    <Button.Or text={t('or')} />
                    <Button
                        type="button"
                        toggle
                        active={multilingual}
                        onClick={() =>
                            setMultilingual({
                                ...multilingual,
                                multilingual: true,
                            })
                        }
                    >
                        {t('multilingual')}
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
            ) : null}
            <Segment
                style={{
                    marginTop: '0px',
                    display: multilingual ? 'block' : 'none',
                }}
            >
                <Form.Field>
                    <Label>english</Label>
                    <Input
                        name={`eng_${field}`}
                        type="text"
                        fluid
                        value={memoizedValues.eng}
                        onChange={changeValue('eng')}
                        required={multilingual && required}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>suomi</Label>
                    <Input
                        name={`fin_${field}`}
                        type="text"
                        fluid
                        value={memoizedValues.fin}
                        onChange={changeValue('fin')}
                        required={multilingual && required}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>svenska</Label>
                    <Input
                        name={`swe_${field}`}
                        type="text"
                        fluid
                        value={memoizedValues.swe}
                        onChange={changeValue('swe')}
                        required={multilingual && required}
                    />
                </Form.Field>
            </Segment>
        </Form.Field>
    )
}

MultilingualField.propTypes = {
    field: PropTypes.string.isRequired,
    fieldDisplay: PropTypes.string.isRequired,
    values: PropTypes.shape({
        eng: PropTypes.string,
        fin: PropTypes.string,
        swe: PropTypes.string,
    }),
    translate: PropTypes.func.isRequired,
    required: PropTypes.bool,
}

MultilingualField.defaultProps = {
    values: {
        eng: '',
        fin: '',
        swe: '',
    },
    required: false,
}

export default MultilingualField
