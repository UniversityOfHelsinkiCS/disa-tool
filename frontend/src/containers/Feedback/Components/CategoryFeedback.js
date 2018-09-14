import React from 'react'
import PropTypes from 'prop-types'
import { Card, Progress } from 'semantic-ui-react'
import { withLocalize } from 'react-localize-redux'

export const CategoryFeedback = (props) => {
  const { questionModuleResponses, feedback } = props
  const translate = id => props.translate(`FeedbackPage.CategoryFeedback.${id}`)
  return (
    <div>
      {props.teacher ? null : (
        <h2>
          {translate('message')}
        </h2>
      )}
      {feedback ?
        <Card fluid color="yellow">
          <Card.Content>
            <Card.Header>
              <h3>{translate('general_feedback')}</h3>
            </Card.Header>
            <Card.Description>
              {feedback.generalFeedback}
            </Card.Description>
          </Card.Content>
        </Card> : undefined}
      {questionModuleResponses.map(questionModule => (
        <Card.Group key={questionModule.id} itemsPerRow={feedback ? 2 : 1}>
          <Card fluid color="red" >
            <Card.Content >
              <Card.Header textAlign="center">
                <h3>{questionModule.name}</h3>
              </Card.Header>
              <Card.Description textAlign="center">
                <h4>
                  {translate('grade')}: {questionModule.grade}
                </h4>
                {questionModule.textFieldOn ?
                  <div>
                    <h5>{(translate('explanation'))}:</h5>
                    <p>{questionModule.responseText}</p>
                  </div>
                  :
                  null}
              </Card.Description>
            </Card.Content>
          </Card>
          {feedback ?
            <Card fluid color="red">
              <Card.Content >
                <Card.Header textAlign="center">
                  <h3>{translate('feedback')}</h3>
                </Card.Header>
                <Card.Description textAlign="center">
                  {feedback.categoryFeedback.find(f => f.categoryId === questionModule.id).text}
                </Card.Description>
              </Card.Content>
              <Card.Content>
                {feedback.categoryFeedback.find(f => f.categoryId === questionModule.id).skillLevelObjectives.map(skillLevel => (
                  <div>
                    <h4>{skillLevel.skillLevel}</h4>
                    {skillLevel.objectives.map(objective => (
                      <Progress size="small" percent={objective.percentageDone} label={objective.name} indicating />
                    ))}
                  </div>
                ))}
              </Card.Content>
            </Card> : undefined}
        </Card.Group>
      ))}
    </div >
  )
}

CategoryFeedback.defaultProps = {
  questionModuleResponses: [],
  feedback: null,
  teacher: false
}

CategoryFeedback.propTypes = {
  questionModuleResponses: PropTypes.arrayOf(PropTypes.shape()),
  feedback: PropTypes.arrayOf(PropTypes.shape()),
  teacher: PropTypes.bool,
  translate: PropTypes.func.isRequired
}

export default withLocalize(CategoryFeedback)
