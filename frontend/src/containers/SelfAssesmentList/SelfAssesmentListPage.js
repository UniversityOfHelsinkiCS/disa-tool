import React, { useState, Fragment, useEffect } from 'react'
import { number, string, arrayOf, shape, func } from 'prop-types'
import { connect } from 'react-redux'
import { withLocalize } from 'react-localize-redux'
import { Link, Routes, Route } from 'react-router-dom'
import { Container, Loader, Button, Icon, Segment, Header, Table } from 'semantic-ui-react'

import { getResponsesBySelfAssesment, updateVerificationAndFeedback, getSelfAssesment } from '../../api/selfassesment'
import FeedbackPage from '../Feedback/FeedbackPage'
import LinkExport from '../User/components/LinkExport'
import ResponseList from './components/ResponseList'
import { init, regenerate, reset } from './actions/selfAssesmentList'
import { responseProp } from './propTypes'

const SelfAssesmentListPage = (props) =>   {
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [successful, setSuccessful] = useState(0)
  const [unSuccessful, setUnSuccessful] = useState(0)

  const awaitFunction = async () => {
    const [responsesResponse, selfAssesmentResponse] = await Promise.all([
      getResponsesBySelfAssesment({ id: props.selfAssesmentId }),
      getSelfAssesment(props.selfAssesmentId)
    ])
    props.dispatchInit({
      responses: responsesResponse.data.data,
      selfAssesmentId: selfAssesmentResponse.data.data.id,
      selfAssesmentName: selfAssesmentResponse.data.data.name
    })
    setLoading(false)
  }

  useEffect(async() => {
    awaitFunction()
    return props.dispatchReset()
  },[])

  const translate = id => props.translate(`SelfAssessmentList.SelfAssessmentListPage.${id}`)

  const regenarateFeedback = async () => {
     setLoading(true)
     setUpdating(true)
     setSuccessful(0)
     setUnSuccessful(0)
    const newSelected = (await Promise.all(props.selectedResponses.map(async (resp) => {
      try {
        const response = await updateVerificationAndFeedback(resp.id)
        setSuccessful(successful + 1)
        return response.data
      } catch (e) {
        setUnSuccessful(unSuccessful + 1)
        return null
      }
    }))).filter(response => response !== null)
    props.dispatchRegenerate(newSelected)
    setLoading(false)
    setUpdating(false)
  }

  renderUpdating = () => (
    <Segment> success: {successful}, fail: {unSuccessful} </Segment>
  )

  

    return (
      <div className="SelfAssesmentListPage">
        <Container>
          <Segment.Group>
            <Segment style={{ display: 'flex' }}>
              <Table>
                <Table.Body>
                  <LinkExport style={{ flexShrink: 1 }} title={`${translate('link')}: `} url={`/selfassessment/response/${props.selfAssesmentId}`} />
                </Table.Body>
              </Table>
            </Segment>
            <Segment>
              <Header style={{ whiteSpace: 'nowrap', marginRight: '80px' }}>{props.selfAssesmentName}</Header>
            </Segment>
          </Segment.Group>
          <Switch>
            <Route exact path={`/selfassessment/list/${props.selfAssesmentId}`} element={<RenderList updating={updating} selectedResponses={selectedResponses} responses={responses}></RenderList>} />
            <Route exact path={`/selfassessment/list/${props.selfAssesmentId}/:id`} element={<RenderResponse></RenderResponse>} />
          </Switch>
        </Container>
      </div>
    )
  }


const RenderList = (props) => {
  const {updating} =props
  const { responses, selectedResponses } = props
  const notSelected = responses.filter(r => !selectedResponses.find(sr => sr === r))
  return (
    <Fragment>
      { updating ? renderUpdating() : null }
      {this.state.loading ? (
        <Loader active />
      ) : (
        <Fragment>
          <ResponseList
            header={translate('selected_header')}
            subheader={`${selectedResponses.length} / ${responses.length}`}
            responses={selectedResponses}
            selected
            regenarateFeedback={regenarateFeedback}
          />
          <ResponseList
            header={translate('non-selected_header')}
            responses={notSelected}
          />
        </Fragment>
      )}
    </Fragment>
  )
}

const RenderResponse = (props) => {
  const { activeResponse, selfAssesmentId, responses, selectedResponses } = props
  const paramId = Number(props.match.params.id)
  const foundActiveResponse = activeResponse || responses.find(e => e.id === paramId)
  if (foundActiveResponse == null) return <Loader active />
  const backButton = (
    <Button as={Link} to={`/selfassessment/list/${selfAssesmentId}`} basic>
      <Icon name="angle double left" />
      <span>{this.translate('back')}</span>
    </Button>
  )
  return (
    <div>
      <Container textAlign="center">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          {backButton}
          <h2 style={{ flexGrow: 1 }}>{foundActiveResponse.person.name}</h2>
        </div>
      </Container>
      <FeedbackPage
        assessmentResponse={foundActiveResponse.response}
        teacher
      />
      <Container>
        {backButton}
      </Container>
    </div>
  )
}


SelfAssesmentListPage.propTypes = {
  selfAssesmentId: number.isRequired,
  selfAssesmentName: string,
  translate: func.isRequired,
  responses: arrayOf(responseProp).isRequired,
  selectedResponses: arrayOf(shape({})).isRequired,
  dispatchInit: func.isRequired,
  dispatchRegenerate: func.isRequired,
  dispatchReset: func.isRequired,
  activeResponse: responseProp
}

SelfAssesmentListPage.defaultProps = {
  selfAssesmentName: '',
  activeResponse: null
}

const mapStateToProps = state => ({
  selfAssesmentName: state.selfAssesmentList.selfAssesmentName,
  selectedResponses: state.selfAssesmentList.selectedResponses,
  responses: state.selfAssesmentList.responses,
  activeResponse: state.selfAssesmentList.activeResponse
})

const mapDispatchToProps = dispatch => ({
  dispatchInit: init(dispatch),
  dispatchRegenerate: regenerate(dispatch),
  dispatchReset: reset(dispatch)
})

export default withLocalize((
  withRouter((
    connect(mapStateToProps, mapDispatchToProps)(SelfAssesmentListPage)
  ))
))
