import React from 'react'
import { connect,useDispatch } from 'react-redux'
import { Segment, Header, Label } from 'semantic-ui-react'

import { removeType, editType } from '../../actions/types'
import { addTypeToTask, removeTypeFromTask } from '../../actions/tasks'
import DeleteForm from '../../../../utils/components/DeleteForm'
import EditTypeForm from './EditTypeForm'
import dndItem, { defaults } from '../../../../utils/components/DnDItem'
import { useTranslation } from 'react-i18next'


export const dropSpec = {
  ...defaults.dropSpec,
  drop: (props, monitor) => {
    const drag = monitor.getItem()
    const { slots, element } = props
    let slot
    if (drag.type_header_id === element.type_header_id) {
      if (drag.order === element.order) {
        slot = drag.order
      } else if (drag.order > element.order) {
        slot = slots.previous
      } else {
        slot = slots.next
      }
    } else {
      slot = slots ? slots.previous : element.order
    }
    props.mover({
      id: drag.id,
      order: slot,
      type_header_id: element.type_header_id
    }, true)
  }
}

const DnDItem = dndItem('type', {
  dropSpec,
  dragSpec: {
    ...defaults.dragSpec,
    beginDrag: props => ({
      ...defaults.dragSpec.beginDrag(props),
      type_header_id: props.element.type_header_id
    })
  }
})

export const Type = ( 
{  activeTaskId = null,
  active,
  editing,
  type,
  slots,
  headerId
  }) => {
    const dispatch = useDispatch()

    const toggleTypeAsync = async ({type_id,task_id}) => {
      let response = null
      if(active) {
        response = await removeTypeFromTask({ type_id,task_id })
      } else {
        response = await addTypeToTask({ type_id,task_id})

      } addTypeToTask, dispatch
      dispatch(response)
    }

    const moveTypeAsync = async () => {
      const response = await editType()
      dispatch(response)
    }

    const removeTypeAsync = async ({id}) => {
      const response = await removeType({ id })
      dispatch(response)
    }
  const toggleType = () => {
    if (activeTaskId) {
      toggleTypeAsync({
        type_id: type.id,
        task_id: activeTaskId
      })
    }
  }

  const {t} = useTranslation('translation', {keyPrefix: 'course.types.type'})

    const content = (
      <Segment
        className="Type"
        style={{
            cursor: activeTaskId === null ? undefined : 'pointer',
            backgroundColor: active ? '#21ba45' : undefined
          }}
        onClick={toggleType}
      >
        <div className="headerBlock">
          <Header className="typeHeader">{type.name}</Header>
        </div>
        <div className="multiplierBlock">
          <Label size="large" >{type.multiplier.toFixed(2)}</Label>
        </div>
        {editing ? (
          <div>
            <div className="editBlock">
              <EditTypeForm typeId={type.id} />
            </div>
            <div className="removeBlock">
              <DeleteForm
                onExecute={() => removeTypeAsync({ id: type.id })}
                prompt={[
                  t('delete_prompt_1'),
                  `"${type.name}"`
                ]}
                header={t('delete_header')}
              />
            </div>
          </div>
        ) : (
          null
        )}
      </Segment>
    )
    if (editing) {
      return (
        <DnDItem
          element={{
            ...type,
            type_header_id: headerId
          }}
          slots={slots}
          mover={moveTypeAsync}
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
