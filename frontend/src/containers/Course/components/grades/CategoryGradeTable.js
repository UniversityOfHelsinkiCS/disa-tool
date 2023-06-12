import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { arrayOf, func, number, shape } from 'prop-types'
import {
    Button,
    Container,
    Segment,
    Header,
    Table,
    Input,
} from 'semantic-ui-react'

import { updateCategoryGradesAction } from '../../../../actions/actions'
import InfoBox from '../../../../utils/components/InfoBox'

const CategoryGradeTable = (props) => {
    const [updatedGrades, setUpdatedGrades] = useState([])
    const { t } = useTranslation()

    const findValue = (categoryId, grade) => {
        const updated = updatedGrades.find(
            (ug) => ug.gradeId === grade.id && ug.categoryId === categoryId
        )
        if (updated) {
            return updated.neededForGrade
        }
        const existing = grade.category_grades.find(
            (cg) => cg.category_id === categoryId && cg.grade_id === grade.id
        )
        if (existing) {
            return existing.needed_for_grade
        }
        return null
    }

    const findName = (categoryId, grade) => {
        const updated = updatedGrades.find(
            (ug) => ug.gradeId === grade.id && ug.categoryId === categoryId
        )
        if (updated) {
            return updated.id
        }
        const existing = grade.category_grades.find(
            (cg) => cg.category_id === categoryId && cg.grade_id === grade.id
        )
        if (existing) {
            return existing.id
        }
        return null
    }

    const changeValue = (e) => {
        const updatedGrades = [...updatedGrades]
        const categoryGradeId = Number(e.target.name)
        const categoryGradeValue = Number(e.target.value)
        const updated = updatedGrades.find((ug) => ug.id === categoryGradeId)
        if (!updated) {
            let original = {}
            for (let i = 0; i < props.grades.length; i += 1) {
                const grade = props.grades[i]
                const categoryGrade = grade.category_grades.find(
                    (cg) => cg.id === categoryGradeId
                )
                if (categoryGrade) {
                    original = categoryGrade
                }
            }
            updatedGrades.push({
                id: original.id,
                gradeId: original.grade_id,
                categoryId: original.category_id,
                neededForGrade: categoryGradeValue,
            })
            setUpdatedGrades(updatedGrades)
        } else {
            updated.neededForGrade = categoryGradeValue
            setUpdatedGrades(updatedGrades)
        }
    }

    const cancelChanges = () => setUpdatedGrades([])

    const submitChanges = () => {
        props.dispatchUpdateCategoryGrades({
            courseId: props.courseId,
            categoryGrades: updatedGrades,
        })
        setUpdatedGrades([])
    }

    // const t = (id) => props.t(`Course.grades.CategoryGradeTable.${id}`)

    return (
        <Container>
            <Segment>
                <InfoBox
                    translationid="EditCategoryGradesPage"
                    buttonProps={{ floated: 'right' }}
                />
                <Header as="h3" content={t('header')} />
                <Button
                    color="green"
                    content={t('save')}
                    onClick={submitChanges}
                />
                <Button
                    color="red"
                    content={t('cancel_button')}
                    onClick={cancelChanges}
                />
                <Table definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                {t('header_cell')}
                            </Table.HeaderCell>
                            {props.grades.map((grade) => (
                                <Table.HeaderCell key={grade.id}>
                                    {grade.name}
                                </Table.HeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {props.categories.map((category) => (
                            <Table.Row key={category.id}>
                                <Table.Cell>{category.name}</Table.Cell>
                                {props.grades.map((grade) => (
                                    <Table.Cell
                                        key={findName(category.id, grade)}
                                    >
                                        <Input
                                            type="number"
                                            max="1"
                                            min="0"
                                            name={findName(category.id, grade)}
                                            placeholder="0"
                                            step="0.05"
                                            value={findValue(
                                                category.id,
                                                grade
                                            )}
                                            onChange={changeValue}
                                        />
                                    </Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <Button
                    color="green"
                    content={t('save')}
                    onClick={submitChanges}
                />
                <Button
                    color="red"
                    content={t('cancel_button')}
                    onClick={cancelChanges}
                />
            </Segment>
        </Container>
    )
}

CategoryGradeTable.defaultProps = {
    grades: [],
    categories: [],
}

CategoryGradeTable.propTypes = {
    categories: arrayOf(shape()),
    courseId: number.isRequired,
    grades: arrayOf(shape()),
    dispatchUpdateCategoryGrades: func.isRequired,
    t: func.isRequired,
}

export default connect(null, {
    dispatchUpdateCategoryGrades: updateCategoryGradesAction,
})(CategoryGradeTable)
