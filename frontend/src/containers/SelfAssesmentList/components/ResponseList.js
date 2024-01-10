import React, { useState } from 'react'
import { Header, Pagination, Segment, Form, Button, Message } from 'semantic-ui-react'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import ResponseTable, { calculateDifference } from './ResponseTable'
import { DeselectAllButton, SelectAllButton } from './SelectionButtons'
import SelfAssesmentCSVDownload from './SelfAssesmentCSVDownload'

const ResponseList = ({
  responses,
  responsesOnPage = 20,
  selected = false,
  regenarateFeedback = null,
  subheader,
  header,
}) => {
  const [activePage, setActivePage] = useState(1)
  const [headerIndex, setHeaderIndex] = useState(0)
  const [asc, setAsc] = useState(true)
  const [searched, setSearched] = useState('')
  const { t } = useTranslation('translation', { keyPrefix: 'selfAssessmentList' })

  const handlePaginationChange = (e, { activePage }) => setActivePage(activePage)

  const handleOnSearch = (_, { value }) => {
    setSearched(value)
    setActivePage(1)
  }

  const handleOnSort = (headerindex) => {
    const prevheaderindex = headerIndex
    const prevasc = asc
    setHeaderIndex(headerindex)
    setAsc(headerindex === prevheaderindex ? !prevasc : true)
  }

  const searchedLower = searched.toLowerCase()
  const responsesFiltered =
    searchedLower.length === 0
      ? responses
      : responses.filter(
          (e) =>
            e.person &&
            ((e.person.studentnumber && e.person.studentnumber.toLowerCase().includes(searchedLower)) ||
              (e.person.name && e.person.name.toLowerCase().includes(searchedLower))),
        )
  let sortedResponses
  switch (headerIndex) {
    case 0:
      sortedResponses = _.orderBy(responsesFiltered, 'person.studentnumber', asc ? 'asc' : 'desc')
      break
    case 1:
      sortedResponses = _.orderBy(responsesFiltered, 'person.name', asc ? 'asc' : 'desc')
      break
    case 2:
      sortedResponses = _.orderBy(
        responsesFiltered,
        (o) => {
          const diff = calculateDifference(o)
          return diff ? [diff.mean, diff.sd] : [0]
        },
        asc ? 'asc' : 'desc',
      )
      break
    case 3:
      sortedResponses = _.orderBy(responsesFiltered, 'updated_at', asc ? 'asc' : 'desc')
      break
    default:
      sortedResponses = responsesFiltered
      break
  }
  const totalPages = Math.ceil(responsesFiltered.length / responsesOnPage)
  const activePageReal = Math.min(activePage, totalPages)
  const displayed = sortedResponses.slice((activePageReal - 1) * responsesOnPage, activePageReal * responsesOnPage)
  return (
    <Segment>
      <Header as="h2">
        {header}
        {subheader ? <Header.Subheader>{subheader}</Header.Subheader> : null}
      </Header>
      <Form>
        <Form.Group>
          <Form.Field>
            {selected ? (
              <>
                <DeselectAllButton />
                {regenarateFeedback && (
                  <Button
                    disabled={responses.length === 0}
                    basic
                    color="blue"
                    content={t('selfAssessmentListPage.generate_feedback')}
                    onClick={regenarateFeedback}
                  />
                )}
                <SelfAssesmentCSVDownload />
              </>
            ) : (
              <SelectAllButton />
            )}
          </Form.Field>
        </Form.Group>
      </Form>
      {selected && responses.length === 0 ? (
        <Message warning content={t('responseList.selectWarning')} />
      ) : (
        <>
          <Form>
            <Form.Field>
              <Form.Input placeholder={t('responseList.filter')} onChange={handleOnSearch} />
            </Form.Field>
          </Form>
          <ResponseTable
            responses={displayed}
            selected={selected}
            onSort={handleOnSort}
            sortedHeader={{ headerIndex, asc }}
          />
          <Pagination activePage={activePageReal} onPageChange={handlePaginationChange} totalPages={totalPages} />
        </>
      )}
    </Segment>
  )
}
/*
ResponseList.propTypes = {
  responses: arrayOf(responseProp).isRequired,
  header: string.isRequired,
  subheader: string,
  responsesOnPage: number,
  translate: func.isRequired,
  selected: bool,
  regenarateFeedback: func
}
*/

export default ResponseList
