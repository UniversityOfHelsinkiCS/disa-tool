import React, { useState } from 'react'
import { node } from 'prop-types'
import { Accordion, Icon } from 'semantic-ui-react'

const SingleAccordion = (props) => {
  const [expanded, setExpanded] = useState(false)

  const toggle = () => {
    setExpanded(!expanded)
  }

    const { title, children } = props
    return (
      <Accordion fluid styled>
        <Accordion.Title
          active={expanded}
          onClick={toggle}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: 1 }}>
              {title}
            </div>
            <Icon name="dropdown" />
          </div>
        </Accordion.Title>
        <Accordion.Content active={expanded}>
          {children}
        </Accordion.Content>
      </Accordion>
    )
  }
/*
SingleAccordion.propTypes = {
  title: node.isRequired,
  children: node.isRequired
}
*/
export default SingleAccordion
