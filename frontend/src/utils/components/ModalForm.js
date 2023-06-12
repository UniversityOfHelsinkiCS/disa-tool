import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Divider, Button } from 'semantic-ui-react'

const ModalForm = (props) => {
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line no-undef
        if (oldProps.expanded === null) {
            // eslint-disable-next-line no-undef
            if (!oldState.expanded && state.expanded) props.onOpen()
            // eslint-disable-next-line no-undef
        } else if (!oldState.expanded && props.expanded) props.onOpen()
    }, [props])

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
        cancel: collapse,
    }

    const mapAction = (button, i) =>
        button.props.type
            ? React.cloneElement(button, {
                  onClick: actionHandlers[button.props.type],
                  key: i,
              })
            : React.cloneElement(button, {
                  key: i,
              })

    const style = props.trigger.props.style || {}
    // TODO: Apply trigger margin as margin in this div.
    const trigger = (
        <div
            onClick={expand}
            style={{ margin: 'auto', display: 'inline-block' }}
        >
            {React.cloneElement(props.trigger, {
                style: { ...style, margin: '0px' }, // We need to eliminate margin to make the div no larger than trigger.
            })}
        </div>
    )
    // The children/content are wrapped in a separate context.
    // This is a hack and should be fixed to use the outside context instead.
    return (
        <Modal
            trigger={trigger}
            open={props.expanded === null ? expanded : props.expanded}
            onClose={collapse}
        >
            <Modal.Header>{props.header}</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit} loading={props.loading}>
                    {props.children || props.content}
                    {props.actions.length > 0 ? (
                        <div>
                            <Divider />
                            {props.actions.map(mapAction)}
                        </div>
                    ) : null}
                </Form>
            </Modal.Content>
        </Modal>
    )
}

/**
 * Import this function, call it and pass the result as the actions prop to ModalForm.
 * Renders default "save" and "cancel buttons".
 * @param {function} t
 */
export const saveActions = (t) => {
    return [
        <Button
            key="save-green-1"
            color="green"
            style={{ margin: '0px 15px 0px 15px' }}
        >
            {t('save')}
        </Button>,
        <Button
            key="cancel-1"
            type="cancel"
            style={{ margin: '0px 15px 0px 15px' }}
        >
            {t('cancel')}
        </Button>,
    ]
}

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
    onOpen: PropTypes.func,
}

ModalForm.defaultProps = {
    onSubmit: () => {},
    loading: false,
    expanded: null,
    onClose: () => {},
    onOpen: () => {},
    content: null,
    children: null,
    actions: [],
}

export default ModalForm
