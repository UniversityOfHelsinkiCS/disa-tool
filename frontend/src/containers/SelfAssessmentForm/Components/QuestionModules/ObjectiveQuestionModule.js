import React, {useState,useEffect} from 'react'
import { Form, Card, List, Grid, Segment, Message } from 'semantic-ui-react'
import { connect, useDispatch } from 'react-redux'
import { gradeObjectiveAction, clearErrorAction } from '../../actions/selfAssesment'
import MathJaxText from '../../../../utils/components/MathJaxText'
import { objectiveGrades } from '../../utils'
import '../../Components/selfAssesment.css'


const ObjectiveQuestionModule = (props) => {
  const [ratings, setRatings] = useState({})
  const [grades, setGrades] = useState({})
  const dispatch = useDispatch()

  const { objectives, name,id } = props.data
  const { gradeError, existingAnswer } = props


  useEffect(() => {
    props.data.objectives.forEach((value) => {
      ratings[value.id] = -1
    })
    const grades = objectiveGrades()
    setRatings(ratings)
    setGrades(grades)
  },[])

  const handleChange = (objective, value) => {
    ratings[objective] = value
    gradeObjectiveAction({ id: objective, value, final: false },dispatch)
    setRatings(ratings)
  }

  const handleCheckboxChange = (e, { objective, value }) => {
    handleChange(objective, value)
    clearErrorAction({ type: 'qModErrors', errorType: 'grade', id, objective },dispatch)
  }

    return (
      <Card fluid data-testid="objective-question-module">
        <Card.Content>
          <Grid columns="equal">
            <Grid.Column>
              <h3>{name}</h3>
            </Grid.Column>
            <Grid.Column>
              <div style={{ display: 'flex' }}>
                {Object.keys(grades).map(o =>
                  (
                    <div key={o} style={{ flexGrow: 1 }}>
                      {grades[o]}
                    </div>))}
              </div>
            </Grid.Column>
          </Grid>
          <Form error={gradeError !== undefined}>
            <List divided>
              {objectives.map(o =>
                (o.includedInAssesment ?
                  <List.Item key={o.id}>
                    <List.Content>
                      <Grid verticalAlign="middle" columns="equal">
                        <Grid.Row style={{ padding: '20px' }}>
                          <Grid.Column>
                            <Segment>
                              <MathJaxText content={o.name} />
                            </Segment>
                          </Grid.Column>
                          <Grid.Column>
                            <div style={{ display: 'flex' }}>
                              {Object.keys(grades).map(og =>
                                (
                                  <div key={og} style={{ flexGrow: 1, textAlign: 'center' }}>
                                    <Form.Checkbox
                                      error={gradeError.errors[o.id] !== undefined} //eslint-disable-line
                                      objective={o.id}
                                      value={og}
                                      checked={ratings[o.id] === og || Boolean(existingAnswer.find(answer => answer.id === o.id && answer.grade === og))}
                                      onChange={handleCheckboxChange}
                                      radio
                                    />
                                  </div>))}
                            </div>
                            <Message
                              error
                              style={{ textAlign: 'center' }}
                              content={gradeError.errors[o.id] && gradeError.errors[o.id].error}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </List.Content>
                  </List.Item>
                  :
                  null))}
            </List>
          </Form>
        </Card.Content>
      </Card>
    )
}

/*
ObjectiveQuestionModule.propTypes = {
  data: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    objectives: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })),
    id: PropTypes.number
  }),
  dispatchGradeObjectiveAction: PropTypes.func.isRequired,
  gradeError: PropTypes.shape({
    errors: PropTypes.shape()
  }),
  dispatchClearErrorAction: PropTypes.func.isRequired,
  existingAnswer: PropTypes.arrayOf(PropTypes.shape())
}
*/

export default connect()(ObjectiveQuestionModule)
