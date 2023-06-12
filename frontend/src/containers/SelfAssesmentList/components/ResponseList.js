import React, { useState, Fragment } from 'react'
import { arrayOf, string, number, bool, func } from 'prop-types'
import {
    Header,
    Pagination,
    Segment,
    Form,
    Button,
    Message,
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import ResponseTable, { calculateDifference } from './ResponseTable'
import { responseProp } from '../propTypes'
import { DeselectAllButton, SelectAllButton } from './SelectionButtons'
import SelfAssesmentCSVDownload from './SelfAssesmentCSVDownload'

const ResponseList = (props) => {
    const { t } = useTranslation()
    const [activePage, setActivePage] = useState(1)
    const [sorted, setSorted] = useState({
        headerindex: 0,
        asc: true,
    })
    const [searched, setSearched] = useState('')

    const handlePaginationChange = (e, { activePage }) =>
        setActivePage(activePage)

    const handleOnSearch = (_, { value }) => {
        setSearched(value)
        setActivePage(1)
    }

    const handleOnSort = (headerindex) => {
        const { headerindex: prevheaderindex, asc } = sorted
        setSorted({
            headerindex,
            asc: headerindex === prevheaderindex ? !asc : true,
        })
    }

    const { responses, responsesOnPage, selected, regenarateFeedback } = props
    const searchedLower = searched.toLowerCase()
    const responsesFiltered =
        searchedLower.length === 0
            ? responses
            : responses.filter(
                  (e) =>
                      e.person &&
                      ((e.person.studentnumber &&
                          e.person.studentnumber
                              .toLowerCase()
                              .includes(searchedLower)) ||
                          (e.person.name &&
                              e.person.name
                                  .toLowerCase()
                                  .includes(searchedLower)))
              )
    let sortedResponses
    switch (sorted.headerindex) {
        case 0:
            sortedResponses = _.orderBy(
                responsesFiltered,
                'person.studentnumber',
                sorted.asc ? 'asc' : 'desc'
            )
            break
        case 1:
            sortedResponses = _.orderBy(
                responsesFiltered,
                'person.name',
                sorted.asc ? 'asc' : 'desc'
            )
            break
        case 2:
            sortedResponses = _.orderBy(
                responsesFiltered,
                (o) => {
                    const diff = calculateDifference(o)
                    return diff ? [diff.mean, diff.sd] : [0]
                },
                sorted.asc ? 'asc' : 'desc'
            )
            break
        case 3:
            sortedResponses = _.orderBy(
                responsesFiltered,
                'updated_at',
                sorted.asc ? 'asc' : 'desc'
            )
            break
        default:
            sortedResponses = responsesFiltered
            break
    }
    const totalPages = Math.ceil(responsesFiltered.length / responsesOnPage)
    const activePageReal = Math.min(activePage, totalPages)
    const displayed = sortedResponses.slice(
        (activePageReal - 1) * responsesOnPage,
        activePageReal * responsesOnPage
    )
    return (
        <Segment>
            <Header as="h2">
                {props.header}
                {props.subheader ? (
                    <Header.Subheader>{props.subheader}</Header.Subheader>
                ) : null}
            </Header>
            <Form>
                <Form.Group>
                    <Form.Field>
                        {selected ? (
                            <Fragment>
                                <DeselectAllButton />
                                {regenarateFeedback && (
                                    <Button
                                        disabled={responses.length === 0}
                                        basic
                                        color="blue"
                                        content={t(
                                            'SelfAssessmentList.SelfAssessmentListPage.generate_feedback'
                                        )}
                                        onClick={regenarateFeedback}
                                    />
                                )}
                                <SelfAssesmentCSVDownload />
                            </Fragment>
                        ) : (
                            <SelectAllButton />
                        )}
                    </Form.Field>
                </Form.Group>
            </Form>
            {selected && responses.length === 0 ? (
                <Message
                    warning
                    content={t('SelfAssessmentList.ResponseList.SelectWarning')}
                />
            ) : (
                <Fragment>
                    <Form>
                        <Form.Field>
                            <Form.Input
                                placeholder={t(
                                    'SelfAssessmentList.ResponseList.Filter'
                                )}
                                onChange={handleOnSearch}
                            />
                        </Form.Field>
                    </Form>
                    <ResponseTable
                        responses={displayed}
                        selected={selected}
                        onSort={handleOnSort}
                        sortedHeader={sorted}
                    />
                    <Pagination
                        activePage={activePageReal}
                        onPageChange={handlePaginationChange}
                        totalPages={totalPages}
                    />
                </Fragment>
            )}
        </Segment>
    )
}

ResponseList.propTypes = {
    responses: arrayOf(responseProp).isRequired,
    header: string.isRequired,
    subheader: string,
    responsesOnPage: number,
    translate: func.isRequired,
    selected: bool,
    regenarateFeedback: func,
}

ResponseList.defaultProps = {
    subheader: null,
    responsesOnPage: 20,
    selected: false,
    regenarateFeedback: null,
}

export default ResponseList
