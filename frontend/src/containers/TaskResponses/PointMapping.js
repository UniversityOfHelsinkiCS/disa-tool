import React, { useState } from 'react'
import { Button, Input, List } from 'semantic-ui-react'
import { func, shape } from 'prop-types'
import { withLocalize } from 'react-localize-redux'
import { useTranslation } from 'react-i18next'

const  PointMapping = (props) => {
  const [pointKey, setPointKey] = useState('')
  const [pointValue, setPointValue] = useState(0)
  const { pointsMapping } = props


  const {t} = useTranslation("translation", {keyPrefix: "userPage.uploadResponses.pointMapping"})

  const handleChange = (e, { value }) => {
    setState({ [e.target.name]: value })
  }

  const handleAdd = () => {
    props.addPointMapping(pointKey, pointValue)
  }

    return (
      <div>
        <h3>{t('point_mapping_text')}</h3>
        <List>
          {Object.keys(pointsMapping).map(key => (
            <List.Item key={key}>
              {key} = {pointsMapping[key]}
              <Button
                basic
                color="red"
                icon="delete"
                size="tiny"
                value={key}
                onClick={props.removePointMapping}
              />
            </List.Item>
                ))}
        </List>
        <Input
          name="pointKey"
          label={t('key')}
          type="text"
          value={pointKey}
          onChange={handleChange}
        />
        <Input
          name="pointValue"
          label={t('value')}
          type="number"
          value={pointValue}
          onChange={handleChange}
        />
        <Button onClick={handleAdd}>{t('add')}</Button>
      </div>
    )
  }
/*
PointMapping.propTypes = {
  pointsMapping: shape().isRequired,
  addPointMapping: func.isRequired,
  removePointMapping: func.isRequired,
  translate: func.isRequired
}
*/
export default PointMapping
