import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect, useDispatch } from 'react-redux'
import { Segment, Header, Label } from 'semantic-ui-react'

import { useDrag } from 'react-dnd'
import { removeType, editType } from '../../actions/types'
import { addTypeToTask, removeTypeFromTask } from '../../actions/tasks'
import DeleteForm from '../../../../utils/components/DeleteForm'
import EditTypeForm from './EditTypeForm'
import DnDItem from '../../../../utils/components/DnDItem'

export const Type = ({ activeTaskId = null, active, editing, type, slots, headerId }) => {
  const dispatch = useDispatch()

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: 'type',
      item: { type: 'type', typeHeaderId: headerId, order: type.order, id: type.id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  )
  const toggleTypeAsync = async ({ typeId, taskId }) => {
    let response = null
    if (active) {
      response = await removeTypeFromTask({ typeId, taskId })
    } else {
      response = await addTypeToTask({ typeId, taskId })
    }
    dispatch(response)
  }

  const moveTypeAsync = async (props) => {
    const response = await editType(props)
    dispatch(response)
  }

  const removeTypeAsync = async ({ id }) => {
    const response = await removeType({ id })
    dispatch(response)
  }

  const toggleType = () => {
    if (activeTaskId) {
      toggleTypeAsync({
        typeId: type.id,
        taskId: activeTaskId,
      })
    }
  }

  const { t } = useTranslation('translation', { keyPrefix: 'course.types.type' })

  const content = (
    <Segment
      className="Type"
      style={{
        cursor: activeTaskId === null ? undefined : 'pointer',
        backgroundColor: active ? '#21ba45' : undefined,
      }}
      onClick={toggleType}
    >
      <div className="headerBlock">
        <Header className="typeHeader">{type.name}</Header>
      </div>
      <div className="multiplierBlock">
        <Label size="large">{type.multiplier.toFixed(2)}</Label>
      </div>
      {editing ? (
        <div>
          <div className="editBlock">
            <EditTypeForm typeId={type.id} />
          </div>
          <div className="removeBlock">
            <DeleteForm
              onExecute={() => removeTypeAsync({ id: type.id })}
              prompt={[t('delete_prompt_1'), `"${type.name}"`]}
              header={t('delete_header')}
            />
          </div>
        </div>
      ) : null}
    </Segment>
  )
  if (editing) {
    return (
      <DnDItem
        target={{ ...type, typeHeaderId: headerId }}
        slots={slots}
        drag={drag}
        isDragging={isDragging}
        mover={moveTypeAsync}
        dragPreview={dragPreview}
        itemName={`type-${type.id}`}
      >
        {content}
      </DnDItem>
    )
  }
  return content
}

/*
Type.propTypes = {
  type: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    multiplier: PropTypes.number
  }).isRequired,
  editing: PropTypes.bool.isRequired,
  removeType: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  activeTaskId: PropTypes.number,
  toggleType: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  moveType: PropTypes.func.isRequired,
  slots: PropTypes.shape({
    previous: PropTypes.number.isRequired,
    next: PropTypes.number.isRequired
  }).isRequired,
  headerId: PropTypes.number.isRequired
}
*/

export default connect()(Type)
