import React, { useState, Fragment, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Link, Switch, Route, withRouter, useParams } from 'react-router-dom'
import { Container, Loader, Button, Icon, Segment, Header, Table } from 'semantic-ui-react'

import { useTranslation } from 'react-i18next'
import { getResponsesBySelfAssesment, updateVerificationAndFeedback, getSelfAssesment } from '../../api/selfassesment'
import FeedbackPage from '../Feedback/FeedbackPage'
import LinkExport from '../User/components/LinkExport'
import ResponseList from './components/ResponseList'
import { init, regenerate, reset } from './actions/selfAssesmentList'

const SelfAssesmentListPage = (props) => {
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [successful, setSuccessful] = useState(0)
  const [unSuccessful, setUnSuccessful] = useState(0)
  const selfAssesmentList = useSelector((state) => state.selfAssesmentList)
  const { responses, selectedResponses, activeResponse } = selfAssesmentList
  const { selfAssesmentId } = props
  const { t } = useTranslation('translation', {
    keyPrefix: `selfAssessmentList.selfAssessmentListPage`,
  })
  const dispatch = useDispatch()
  const paramId = useParams().id

  const asyncFunction = async () => {
    const [responsesResponse, selfAssesmentResponse] = await Promise.all([
      getResponsesBySelfAssesment({ id: props.selfAssesmentId }),
      getSelfAssesment(props.selfAssesmentId),
    ])
    init(
      {
        responses: responsesResponse.data.data,
        selfAssesmentId: selfAssesmentResponse.data.data.id,
        selfAssesmentName: selfAssesmentResponse.data.data.name,
      },
      dispatch
    )
    setLoading(false)
  }

  useEffect(() => {
    asyncFunction()
    return () => {
      reset(dispatch)
    }
  }, [])

  const regenarateFeedback = async () => {
    setLoading(true)
    setUpdating(true)
    setSuccessful(0)
    setUnSuccessful(0)
    const newSelected = (
      await Promise.all(
        props.selectedResponses.map(async (resp) => {
          try {
            const response = await updateVerificationAndFeedback(resp.id)
            setSuccessful(successful + 1)
            return response.data
          } catch (e) {
            setUnSuccessful(unSuccessful + 1)
            return null
          }
        })
      )
    ).filter((response) => response !== null)
    regenerate(newSelected, dispatch)
    setLoading(false)
    setUpdating(false)
  }

  const renderUpdating = () => (
    <Segment>
      {' '}
      success: {successful}, fail: {unSuccessful}{' '}
    </Segment>
  )

  const renderList = () => {
    const notSelected = responses.filter((r) => !selectedResponses.find((sr) => sr === r))
    return (
      <>
        {updating ? renderUpdating() : null}
        {loading ? (
          <Loader active />
        ) : (
          <>
            <ResponseList
              header={t('selected_header')}
              subheader={`${selectedResponses.length} / ${responses.length}`}
              responses={selectedResponses}
              selected
              regenarateFeedback={regenarateFeedback}
            />
            <ResponseList header={t('non-selected_header')} responses={notSelected} />
          </>
        )}
      </>
    )
  }

  const renderResponse = () => {
    const foundActiveResponse = activeResponse || responses.find((e) => e.id === paramId)
    if (foundActiveResponse == null) return <Loader active />
    const backButton = (
      <Button as={Link} to={`/selfassessment/list/${selfAssesmentId}`} basic>
        <Icon name="angle double left" />
        <span>{t('back')}</span>
      </Button>
    )
    return (
      <div>
        <Container textAlign="center">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            {backButton}
            <h2 style={{ flexGrow: 1 }}>{foundActiveResponse.person.name}</h2>
          </div>
        </Container>
        <FeedbackPage assessmentResponse={foundActiveResponse.response} teacher />
        <Container>{backButton}</Container>
      </div>
    )
  }

  return (
    <div className="SelfAssesmentListPage">
      <Container>
        <Segment.Group>
          <Segment style={{ display: 'flex' }}>
            <Table>
              <Table.Body>
                <LinkExport
                  style={{ flexShrink: 1 }}
                  title={`${t('link')}: `}
                  url={`/selfassessment/response/${props.selfAssesmentId}`}
                />
              </Table.Body>
            </Table>
          </Segment>
          <Segment>
            <Header style={{ whiteSpace: 'nowrap', marginRight: '80px' }}>{props.selfAssesmentName}</Header>
          </Segment>
        </Segment.Group>
        <Switch>
          <Route exact path={`/selfassessment/list/${props.selfAssesmentId}`} render={renderList} />
          <Route exact path={`/selfassessment/list/${props.selfAssesmentId}/:id`} render={renderResponse} />
        </Switch>
      </Container>
    </div>
  )
}
/*
SelfAssesmentListPage.propTypes = {
  selfAssesmentId: number.isRequired,
  selfAssesmentName: string,
  t: func.isRequired,
  responses: arrayOf(responseProp).isRequired,
  selectedResponses: arrayOf(shape({})).isRequired,
  dispatchInit: func.isRequired,
  dispatchRegenerate: func.isRequired,
  dispatchReset: func.isRequired,
  activeResponse: responseProp
}
*/

export default withRouter(connect()(SelfAssesmentListPage))
