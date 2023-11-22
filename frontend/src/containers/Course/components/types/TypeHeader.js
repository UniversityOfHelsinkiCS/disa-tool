import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Segment, Header } from 'semantic-ui-react'
import { removeHeader } from '../../actions/types'
import Typelist from './Typelist'
import DeleteForm from '../../../../utils/components/DeleteForm'
import EditHeaderForm from './EditHeaderForm'
import dndItem from '../../../../utils/components/DnDItem'
import { useTranslation } from 'react-i18next'

const DnDItem = dndItem('type_header')

export const TypeHeader = (props) => {
  const { header, activeTask = null, editing, moveHeader, slots } = props
  const activeMap = {}
  if (activeTask !== null) {
    activeTask.types.forEach((type) => {
      activeMap[type] = true
    })
  }
  const { t } = useTranslation('translation', { keyPrefix: 'course.types.typeHeader' })
  const dispatch = useDispatch()

  const asyncRemoveHeader = async () => {
    const response = await removeHeader({ id: header.id })
    dispatch(response)
  }

  const content = (
    <Segment className="TypeHeader">
      <div className="flexContainer">
        <Header className="typeHeaderHeader">{header.name}</Header>
        {props.editing ? (
          <div className="flexContainer">
            <div className="paddedBlock">
              <EditHeaderForm headerId={header.id} />
            </div>
            <div className="paddedBlock">
              <DeleteForm
                onExecute={() => asyncRemoveHeader({ id: header.id })}
                prompt={[t('delete_prompt_1'), `"${props.header.name}"`]}
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
        activeTaskId={props.activeTask === null ? null : activeTask.id}
        activeMap={activeMap}
      />
    </Segment>
  )
  if (editing) {
    return (
      <DnDItem element={header} mover={moveHeader} slots={slots}>
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
