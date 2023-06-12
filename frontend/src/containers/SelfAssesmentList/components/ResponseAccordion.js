import React from 'react'
import { number, func } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Accordion, Button, Table, Icon } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { responseProp } from '../propTypes'

const findVerificationGrade = (verification, categoryName) => {
    const category = verification.categoryVerifications.find(
        (c) => c.categoryName === categoryName
    )
    if (!category) {
        return null
    }
    return category.earnedGrade.name
}

const ResponseAccordion = (props) => {
    const { t } = useTranslation(`SelfAssessmentList.SelfAssessmentListPage`)

    const { response, selfAssesmentId } = props
    return (
        <Accordion
            styled
            fluid
            panels={[
                {
                    key: response.id,
                    title: `${response.person.studentnumber} ${response.person.name}`,
                    content: (
                        <Accordion.Content key={response.id}>
                            <Button
                                as={Link}
                                to={`/selfassessment/list/${selfAssesmentId}/${response.id}`}
                                target="_blank"
                                basic
                            >
                                <span>{t('inspect')}</span>
                                <Icon name="angle double right" />
                            </Button>
                            {response.response.assessmentType === 'category' ? (
                                <Table collapsing compact="very">
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell
                                                style={{
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                {t('category')}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell textAlign="center">
                                                {t('self_assessment')}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell textAlign="center">
                                                {t('machine_review')}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell textAlign="center">
                                                {t('difference')}
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {response.response.questionModuleResponses.map(
                                            (qmResponse) => {
                                                const { verification } =
                                                    response.response
                                                if (!verification) {
                                                    return (
                                                        <Table.Row
                                                            key={qmResponse.id}
                                                        >
                                                            <Table.Cell>
                                                                {
                                                                    qmResponse.name
                                                                }
                                                            </Table.Cell>
                                                            <Table.Cell textAlign="center">
                                                                {
                                                                    qmResponse.grade_name
                                                                }
                                                            </Table.Cell>
                                                            <Table.Cell textAlign="center">
                                                                -
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                -
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    )
                                                }
                                                const diff =
                                                    verification.categoryVerifications.find(
                                                        (c) =>
                                                            qmResponse.id ===
                                                            c.categoryId
                                                    ).wantedGrade.difference
                                                return (
                                                    <Table.Row
                                                        key={qmResponse.id}
                                                    >
                                                        <Table.Cell>
                                                            {qmResponse.name}
                                                        </Table.Cell>
                                                        <Table.Cell textAlign="center">
                                                            {
                                                                qmResponse.grade_name
                                                            }
                                                        </Table.Cell>
                                                        <Table.Cell textAlign="center">
                                                            {findVerificationGrade(
                                                                verification,
                                                                qmResponse.name
                                                            )}
                                                        </Table.Cell>
                                                        <Table.Cell
                                                            textAlign="center"
                                                            positive={diff < 0}
                                                            negative={diff > 0}
                                                        >
                                                            {diff}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )
                                            }
                                        )}
                                    </Table.Body>
                                </Table>
                            ) : null}
                            {response.response.finalGradeResponse ? (
                                <Table collapsing compact="very">
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell />
                                            <Table.HeaderCell textAlign="center">
                                                {t('self_assessment')}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell textAlign="center">
                                                {t('machine_review')}
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>
                                                <strong>
                                                    {t('final_grade')}
                                                </strong>
                                            </Table.Cell>
                                            <Table.Cell textAlign="center">
                                                {
                                                    response.response
                                                        .finalGradeResponse
                                                        .grade_name
                                                }
                                            </Table.Cell>
                                            {response.response.verification ? (
                                                <Table.Cell textAlign="center">
                                                    {response.response
                                                        .verification
                                                        .overallVerification
                                                        .minGrade ===
                                                    response.response
                                                        .verification
                                                        .overallVerification
                                                        .maxGrade
                                                        ? response.response
                                                              .verification
                                                              .overallVerification
                                                              .minGrade
                                                        : `${response.response.verification.overallVerification.minGrade}-${response.response.verification.overallVerification.maxGrade}`}
                                                </Table.Cell>
                                            ) : (
                                                <Table.Cell>-</Table.Cell>
                                            )}
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            ) : null}
                        </Accordion.Content>
                    ),
                },
            ]}
        />
    )
}

ResponseAccordion.propTypes = {
    response: responseProp.isRequired,
    selfAssesmentId: number.isRequired,
    t: func.isRequired,
}

const mapStateToProps = (state) => ({
    selfAssesmentId: state.selfAssesmentList.selfAssesmentId,
})

export default connect(mapStateToProps)(ResponseAccordion)
