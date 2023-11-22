import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Popup, Table } from 'semantic-ui-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const getBaseUrl = () => {
  if (window === undefined) return ''
  return `${window.location.protocol}//${window.location.host}`
}

const linkToast = () => {
  dispatch({
    type: 'TOAST',
    payload: {
      type: 'message',
      toast: 'Linkki kopioitu leikepöydälle.',
    },
  })
}

const LinkExport = (props) => {
  const url = `${getBaseUrl()}${props.url}`
  return (
    <Table.Row>
      <Table.Cell>
        <strong>{props.title}</strong>
      </Table.Cell>
      <Table.Cell>
        <span>{url}</span>
      </Table.Cell>
      <Table.Cell>
        <CopyToClipboard text={url} onCopy={linkToast}>
          <div>
            <Popup trigger={<Button icon={{ name: 'copy' }} size="mini" />} content="Kopioi leikepöydälle" />
          </div>
        </CopyToClipboard>
      </Table.Cell>
    </Table.Row>
  )
}
/*
LinkExport.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  url: PropTypes.string.isRequired,
  linkToast: PropTypes.func.isRequired
}
*/

export default connect()(LinkExport)
