import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { LocalizeProvider } from 'react-localize-redux'
import { Modal, Form, Divider, Button } from 'semantic-ui-react'

import LocalizeWrapper from '../../containers/Localize/LocalizeWrapper'

const ModalForm = (props) => {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
if(props.open) {
    props.onOpen()
  }

  },[expanded])

  const expand = () => setExpanded(true)

  const collapse = () => {
    props.onClose()
    setExpanded(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.onSubmit(e)
    collapse()
  }

  const actionHandlers = {
    reset: collapse
  }

  const mapAction = (button, i) => (button.props.type ? React.cloneElement(button, {
    onClick: actionHandlers[button.props.type],
    key: i
  }) : React.cloneElement(button, {
    key: i
  }))

    const style = props.trigger.props.style || {}
    // TODO: Apply trigger margin as margin in this div.
    const trigger = (
      <div onClick={expand} style={{ margin: 'auto', display: 'inline-block' }}>
        {React.cloneElement(props.trigger, {
          style: { ...style, margin: '0px' } // We need to eliminate margin to make the div no larger than trigger.
        })}
      </div>
    )
    // The children/content are wrapped in a separate context.
    // This is a hack and should be fixed to use the outside context instead.
    return (
      <Modal
        trigger={trigger}
        open={expanded === null ? expanded : expanded}
        onClose={collapse}
      >
        <Modal.Header>{props.header}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit} loading={props.loading}>
            <LocalizeProvider>
              <LocalizeWrapper>
                {props.children || props.content}
                {props.actions.length > 0 ? (
                  <div>
                    <Divider />
                    {props.actions.map(mapAction)}
                  </div>
                ) : null}
              </LocalizeWrapper>
            </LocalizeProvider>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }

/**
 * Import this function, call it and pass the result as the actions prop to ModalForm.
 * Renders default "save" and "cancel buttons".
 * @param {function} translate
 */
export const saveActions = translate => [
  <Button color="green" style={{ margin: '0px 15px 0px 15px' }}>{translate('save')}</Button>,
  <Button type="reset" style={{ margin: '0px 15px 0px 15px' }}>{translate('cancel')}</Button>
]
/*
ModalForm.propTypes = {
  trigger: PropTypes.element.isRequired,
  header: PropTypes.node.isRequired,
  content: PropTypes.node,
  children: PropTypes.node, // children will override content if both are provided.
  actions: PropTypes.arrayOf(PropTypes.element), // Actions should be button-like elements.
  // The "type" prop of each element determines their onClick function.
  // key-props will be automatically provided to actions.
  onSubmit: PropTypes.func, // Does not override default befaviour of closing Modal.
  loading: PropTypes.bool,
  expanded: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func
}

*/

export default ModalForm
