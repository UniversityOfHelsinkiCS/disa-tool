import React from 'react'
import { List } from 'semantic-ui-react'
import {useTranslation} from 'react-i18next'

const SelfAssessmentList = ({selfAssessments,onClick}) => {

  const {t} = useTranslation("translation", {keyPrefix: "selfAssessment.selfAssessmentList"})
  return (
    <List animated selection>
      <List.Header>{t('header')}</List.Header>
      {selfAssessments.map(sa => (
        <List.Item
          key={sa.id}
          id={sa.id}
          onClick={onClick}
        >
          {sa.name}
        </List.Item>
      ))}
    </List>
  )
}

export default SelfAssessmentList
