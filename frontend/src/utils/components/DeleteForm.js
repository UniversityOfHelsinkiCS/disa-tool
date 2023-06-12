import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'semantic-ui-react'

import ModalForm from './ModalForm'

const DeleteForm = (props) => {
    const { t } = useTranslation(`utils.components.DeleteForm`)

    const { header, prompt, onExecute } = props
    const contentPrompt = prompt.join(' ')
    return (
        <ModalForm
            header={header}
            trigger={
                <Button
                    negative
                    basic
                    circular
                    icon={{ name: 'delete' }}
                    size="mini"
                />
            }
            actions={[
                <Button
                    key="negative-remove-button-1"
                    negative
                    style={{ margin: '0px 15px 0px 15px' }}
                >
                    {t('remove')}
                </Button>,
                <Button
                    key="cancel-button-1"
                    type="cancel"
                    style={{ margin: '0px 15px 0px 15px' }}
                >
                    {t('cancel')}
                </Button>,
            ]}
            onSubmit={onExecute}
        >
            <p>{contentPrompt}?</p>
        </ModalForm>
    )
}

DeleteForm.propTypes = {
    onExecute: PropTypes.func.isRequired,
    prompt: PropTypes.arrayOf(PropTypes.string).isRequired,
    header: PropTypes.node.isRequired,
    translate: PropTypes.func.isRequired,
}

export default DeleteForm
