import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Table, Segment, Header } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import MatrixLevel from './MatrixLevel'
import DeleteForm from '../../../../utils/components/DeleteForm'
import { removeCategory, editCategory } from '../../actions/categories'
import EditCategoryForm from './EditCategoryForm'
import dndItem from '../../../../utils/components/DnDItem'

const DnDItem = dndItem('category')

export const MatrixCategory = ({
  courseId = null,
  activeTaskId = null,
  showDetails = false,
  editing,
  category,
  slots,
  activeMap,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'course.matrix.matrixCategory' })
  const dispatch = useDispatch()
  const asyncRemoveCategory = async (props) => {
    const response = await removeCategory(props)
    dispatch(response)
  }

  const asyncEditCategory = async (props) => {
    const response = await editCategory(props)
    dispatch(response)
  }

  const cellContent = (
    <div>
      <Header>{category.name}</Header>
      {editing ? (
        <div className="flexContainer">
          <div className="paddedBlock">
            <EditCategoryForm categoryId={category.id} />
          </div>
          <div className="paddedBlock">
            <DeleteForm
              onExecute={() => asyncRemoveCategory({ id: category.id })}
              prompt={[t('delete_prompt_1'), `"${category.name}"`]}
              header={t('delete_header')}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
  return (
    <Table.Row className="MatrixCategory">
      <Table.Cell>
        {editing ? (
          <DnDItem element={category} mover={asyncEditCategory} slots={slots}>
            <Segment>{cellContent}</Segment>
          </DnDItem>
        ) : (
          cellContent
        )}
      </Table.Cell>
      {category.skill_levels
        .sort((a, b) => a.order - b.order)
        .map((level) => (
          <MatrixLevel
            key={level.id}
            category={category}
            level={level}
            courseId={courseId}
            editing={editing}
            activeMap={activeMap}
            activeTaskId={activeTaskId}
            showDetails={showDetails}
          />
        ))}
    </Table.Row>
  )
}
/*
MatrixCategory.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    skill_levels: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired
    })).isRequired,
    order: PropTypes.number.isRequired
  }).isRequired,
  courseId: PropTypes.number,
  editing: PropTypes.bool.isRequired,
  removeCategory: PropTypes.func.isRequired,
  activeMap: PropTypes.objectOf(PropTypes.bool).isRequired,
  activeTaskId: PropTypes.number,
  showDetails: PropTypes.bool,
  translate: PropTypes.func.isRequired,
  moveCategory: PropTypes.func.isRequired,
  slots: PropTypes.shape({
    previous: PropTypes.number.isRequired,
    next: PropTypes.number.isRequired
  }).isRequired
}
*/

export default connect()(MatrixCategory)
