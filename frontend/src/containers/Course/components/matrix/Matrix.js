import React from 'react'
import { connect, useSelector } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import './matrix.css'
import MatrixCategory from './MatrixCategory'
import CreateCategoryForm from './CreateCategoryForm'
import CreateLevelForm from './CreateLevelForm'
import HeaderLevel from './HeaderLevel'

export const Matrix = ({ courseId = null, categoryId, editing, showDetails = false }) => {
  const categories = useSelector((state) => state.category.categories)
  const levels = useSelector((state) => state.level.levels).sort((a, b) => a.order - b.order)
  const task = useSelector((state) => state.task)

  const activeTask = task.active === null ? null : task.tasks.find((t) => t.id === task.active)

  const categoriesFiltered = categoryId ? categories.filter((c) => c.id === categoryId) : categories

  const activeMap = {}
  let activeTaskId = null
  if (activeTask !== null) {
    activeTaskId = activeTask.id
    activeTask.objectives.forEach((objective) => {
      activeMap[objective.id] = true
    })
  }
  const { t } = useTranslation('translation', { keyPrefix: 'common' })
  let newCategoryOrder = 1
  const categoriesNode = categoriesFiltered.map((category, index, categoryArray) => {
    const slots = {
      previous: index > 0 ? (category.order + categoryArray[index - 1].order) / 2 : category.order - 1,
      next:
        index < categoryArray.length - 1 ? (category.order + categoryArray[index + 1].order) / 2 : category.order + 1,
    }
    if (index === categoryArray.length - 1) {
      newCategoryOrder = slots.next
    }
    return (
      <MatrixCategory
        key={category.id}
        category={category}
        courseId={courseId}
        editing={editing}
        activeMap={activeMap}
        activeTaskId={activeTaskId}
        showDetails={showDetails}
        slots={slots}
      />
    )
  })
  let newLevelOrder = 1
  const levelsNode = levels.map((level, index, levelArray) => {
    const slots = {
      previous: index > 0 ? (level.order + levelArray[index - 1].order) / 2 : level.order - 1,
      next: index < levelArray.length - 1 ? (level.order + levelArray[index + 1].order) / 2 : level.order + 1,
    }
    if (index === levelArray.length - 1) {
      newLevelOrder = slots.next
    }
    return <HeaderLevel key={level.id} level={level} editing={editing} slots={slots} />
  })
  return (
    <Table data-testid="matrix-table" celled structured unstackable style={{ margin: 'auto' }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell rowSpan={2}>
            <span className="capitalize">{t('category')}</span>
          </Table.HeaderCell>
          <Table.HeaderCell colSpan={levels.length + editing} textAlign="center">
            <span className="capitalize">{t('skill_levels')}</span>
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          {levelsNode}
          {editing ? <CreateLevelForm courseId={courseId} newOrder={newLevelOrder} /> : null}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {categoriesNode}
        {editing ? (
          <CreateCategoryForm courseId={courseId} newOrder={newCategoryOrder} colSpan={levels.length + 2} />
        ) : null}
      </Table.Body>
    </Table>
  )
}
/*
Matrix.propTypes = {
  courseId: PropTypes.number,
  levels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired
  })).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired
  })).isRequired,
  editing: PropTypes.bool.isRequired,
  activeTask: PropTypes.shape({
    id: PropTypes.number.isRequired,
    objectives: PropTypes.arrayOf(PropTypes.object).isRequired
  }),
  showDetails: PropTypes.bool,
  translate: PropTypes.func.isRequired
}
*/

export default connect()(Matrix)
