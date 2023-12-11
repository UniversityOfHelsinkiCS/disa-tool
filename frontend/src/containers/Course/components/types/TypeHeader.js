import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Segment, Header } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { useDrag } from 'react-dnd'
import { editHeader, removeHeader } from '../../actions/types'
import Typelist from './Typelist'
import DeleteForm from '../../../../utils/components/DeleteForm'
import EditHeaderForm from './EditHeaderForm'
import DnDItem from '../../../../utils/components/DnDItem'

export const TypeHeader = ({ header, activeTask = null, editing, slots }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'course.types.typeHeader' })
  const dispatch = useDispatch()
  const activeMap = {}
  if (activeTask !== null) {
    activeTask.types.forEach((type) => {
      activeMap[type] = true
    })
  }

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: 'type',
      item: { id: header.id, type: 'type' },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  )

  const asyncRemoveHeader = async () => {
    const response = await removeHeader({ id: header.id })
    dispatch(response)
  }

  const asyncMoveHeader = async (props) => {
    const response = await editHeader(props)
    dispatch(response)
  }
  const content = (
    <Segment className="TypeHeader">
      <div className="flexContainer">
        <Header data-testid={`type-header-${header.id}`} className="typeHeaderHeader">
          {header.name}
        </Header>
        {editing ? (
          <div className="flexContainer">
            <div className="paddedBlock">
              <EditHeaderForm headerId={header.id} />
            </div>
            <div className="paddedBlock">
              <DeleteForm
                onExecute={() => asyncRemoveHeader({ id: header.id })}
                prompt={[t('delete_prompt_1'), `"${header.name}"`]}
                header={t('delete_header')}
              />
            </div>
          </div>
        ) : null}
      </div>
      <Typelist
        types={header.types}
        editing={editing}
        headerId={header.id}
        activeTaskId={activeTask === null ? null : activeTask.id}
        activeMap={activeMap}
      />
    </Segment>
  )
  if (editing) {
    return (
      <DnDItem
        target={header}
        mover={asyncMoveHeader}
        slots={slots}
        isDragging={isDragging}
        drag={drag}
        dragPreview={dragPreview}
      >
        {content}
      </DnDItem>
    )
  }
  return <div>{content}</div>
}
/*
TypeHeader.propTypes = {
  header: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired,
  editing: PropTypes.bool.isRequired,
  removeHeader: PropTypes.func.isRequired,
  activeTask: PropTypes.shape({
    id: PropTypes.number.isRequired,
    types: PropTypes.arrayOf(PropTypes.number).isRequired
  }),
  t: PropTypes.func.isRequired,
  moveHeader: PropTypes.func.isRequired,
  slots: PropTypes.shape({
    previous: PropTypes.number.isRequired,
    next: PropTypes.number.isRequired
  }).isRequired
}
*/
export default connect()(TypeHeader)
