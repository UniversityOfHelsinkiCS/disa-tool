import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Table, Header, Segment } from 'semantic-ui-react'

import { useTranslation } from 'react-i18next'
import { useDrag } from 'react-dnd'
import { removeLevel, editLevel } from '../../actions/levels'
import DeleteForm from '../../../../utils/components/DeleteForm'
import EditLevelForm from './EditLevelForm'
import DnDItem from '../../../../utils/components/DnDItem'

const HeaderLevel = ({ level, editing, slots }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation('translation', { keyPrefix: 'course.matrix.headerLevel' })

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: 'skill_level',
      item: { id: level.id, type: 'skill_level' },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  )

  const removeLevelAsync = async (props) => {
    const response = await removeLevel(props)
    dispatch(response)
  }
  const moveLevelAsync = async (props) => {
    const response = await editLevel(props)
    dispatch(response)
  }
  const cellContent = (
    <div className="flexContainer">
      <div className="flexGrower">
        <Header>{level.name}</Header>
      </div>
      {editing ? (
        <div className="flexContainer">
          <div className="paddedBlock">
            <EditLevelForm levelId={level.id} />
          </div>
          <div className="paddedBlock">
            <DeleteForm
              onExecute={() => removeLevelAsync({ id: level.id })}
              prompt={[t('delete_prompt_1'), `"${level.name}"`]}
              header={t('delete_header')}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
  return (
    <Table.HeaderCell key={level.id} textAlign="center">
      {editing ? (
        <DnDItem
          target={{ level }}
          mover={moveLevelAsync}
          slots={slots}
          drag={drag}
          isDragging={isDragging}
          dragPreview={dragPreview}
        >
          <Segment>{cellContent}</Segment>
        </DnDItem>
      ) : (
        cellContent
      )}
    </Table.HeaderCell>
  )
}
/*
HeaderLevel.propTypes = {
  level: shape({}).isRequired,
  editing: bool.isRequired,
  removeLevel: func.isRequired,
  translate: func.isRequired,
  moveLevel: func.isRequired,
  slots: shape({
    previous: number.isRequired,
    next: number.isRequired,
  }).isRequired,
}
*/

export default connect()(HeaderLevel)
