import React from 'react'
import { Button } from 'semantic-ui-react'

import ModalForm from './ModalForm'
import { useTranslation } from 'react-i18next'

export const DeleteForm = (props) => {

  const {t} = useTranslation("translation")

    const contentPrompt = props.prompt.join(' ')
    return (
      <ModalForm
        header={props.header}
        trigger={<Button negative basic circular icon={{ name: 'delete' }} size="mini" />}
        actions={[
          <Button negative style={{ margin: '0px 15px 0px 15px' }}>{t('utils.components.deleteForm.remove')}</Button>,
          <Button type="reset" style={{ margin: '0px 15px 0px 15px' }}>{t('common.cancel')}</Button>
        ]}
        onSubmit={props.onExecute}
      >
        <p>{contentPrompt}?</p>
      </ModalForm>
    )
  }
/*
DeleteForm.propTypes = {
  onExecute: PropTypes.func.isRequired,
  prompt: PropTypes.arrayOf(PropTypes.string).isRequired,
  header: PropTypes.node.isRequired,
  t: PropTypes.func.isRequired
}
*/
export default DeleteForm
