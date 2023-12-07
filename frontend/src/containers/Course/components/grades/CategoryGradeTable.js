import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Container, Segment, Header, Table, Input } from 'semantic-ui-react'

import { updateCategoryGradesAction } from '../../../../actions/actions'
import InfoBox from '../../../../utils/components/InfoBox'

const CategoryGradeTable = (props) => {
  const [gradeState, setGradeState] = useState([])
  const dispatch = useDispatch()

  const asyncUpdateCategoryGrades = async (categoryGrades) => {
    updateCategoryGradesAction(categoryGrades, dispatch)
  }

  const findValue = (categoryId, grade) => {
    const updated = gradeState.find((ug) => ug.gradeId === grade.id && ug.categoryId === categoryId)
    if (updated) {
      return updated.neededForGrade
    }
    const existing = grade.category_grades.find((cg) => cg.category_id === categoryId && cg.grade_id === grade.id)
    if (existing) {
      return existing.needed_for_grade
    }
    return null
  }

  const findName = (categoryId, grade) => {
    const updated = gradeState.find((ug) => ug.gradeId === grade.id && ug.categoryId === categoryId)
    if (updated) {
      return updated.id
    }
    const existing = grade.category_grades.find((cg) => cg.category_id === categoryId && cg.grade_id === grade.id)
    if (existing) {
      return existing.id
    }
    return null
  }

  const changeValue = (e) => {
    const categoryGradeId = Number(e.target.name)
    const categoryGradeValue = Number(e.target.value)
    const updated = gradeState.find((ug) => ug.id === categoryGradeId)
    if (!updated) {
      let original = {}
      for (let i = 0; i < props.grades.length; i += 1) {
        const grade = props.grades[i]
        const categoryGrade = grade.category_grades.find((cg) => cg.id === categoryGradeId)
        if (categoryGrade) {
          original = categoryGrade
        }
      }
      const tempGradeState = gradeState.concat({
        id: original.id,
        gradeId: original.grade_id,
        categoryId: original.category_id,
        neededForGrade: categoryGradeValue,
      })
      setGradeState(tempGradeState)
    } else {
      updated.neededForGrade = categoryGradeValue
      setGradeState(gradeState)
    }
  }

  const cancelChanges = () => setGradeState([])

  const submitChanges = () => {
    asyncUpdateCategoryGrades({
      courseId: props.courseId,
      categoryGrades: gradeState,
    })
    setGradeState([])
  }

  const { t } = useTranslation('translation')

  return (
    <Container>
      <Segment data-testid="edit-category-grades">
        <InfoBox translationid="EditCategoryGradesPage" buttonProps={{ floated: 'right' }} />
        <Header as="h3" content={t('course.grades.categoryGradeTable.header')} />
        <Button color="green" content={t('common.save')} onClick={submitChanges} />
        <Button color="red" content={t('course.grades.categoryGradeTable.cancel_button')} onClick={cancelChanges} />
        <Table definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{t('course.grades.categoryGradeTable.header_cell')}</Table.HeaderCell>
              {props.grades.map((grade) => (
                <Table.HeaderCell data-testid={`category-grade-table-grade-header-${grade.id}`} key={grade.id}>
                  {grade.name}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.categories.map((category) => (
              <Table.Row data-testid={`category-grade-table-grade-category-${category.id}`} key={category.id}>
                <Table.Cell>{category.name}</Table.Cell>
                {props.grades.map((grade) => (
                  <Table.Cell key={findName(category.id, grade)}>
                    <Input
                      data-testid={`category-grade-table-grade-input-${grade.id}`}
                      type="number"
                      max="1"
                      min="0"
                      name={findName(category.id, grade)}
                      placeholder="0"
                      step="0.05"
                      value={findValue(category.id, grade)}
                      onChange={changeValue}
                    />
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Button color="green" content={t('common.save')} onClick={submitChanges} />
        <Button color="red" content={t('course.grades.categoryGradeTable.cancel_button')} onClick={cancelChanges} />
      </Segment>
    </Container>
  )
}
/*
CategoryGradeTable.propTypes = {
  categories: arrayOf(shape()),
  courseId: number.isRequired,
  grades: arrayOf(shape()),
  dispatchUpdateCategoryGrades: func.isRequired,
  t: func.isRequired
}
*/

export default connect()(CategoryGradeTable)
