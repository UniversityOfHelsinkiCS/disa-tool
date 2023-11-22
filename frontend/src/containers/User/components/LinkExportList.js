import React, { useState } from 'react'
import { Button, Table } from 'semantic-ui-react'
import LinkExport from './LinkExport'
import { useTranslation } from 'react-i18next'

const LinkExportList = (props) => {
  const [expanded, setExpanded] = useState(false)

  const { t } = useTranslation('translation', { keyPrefix: 'userPage.courseInfo.links' })

  const renderCollapsed = () => (
    <Button
      onClick={() => setExpanded(true)}
      basic
      color="blue"
      content={t('course_links')}
      style={{ whiteSpace: 'nowrap' }}
    />
  )

  const renderExpanded = () => (
    <div>
      <Button onClick={() => setExpanded(false)} basic color="blue" content={t('close')} />
      <Table>
        <Table.Body>
          <LinkExport
            title={t('registration')}
            url={`/courses?course=${props.course.course_id}&instance=${props.course.id}`}
          />
          <LinkExport title={t('matrix')} url={`/courses/matrix/${props.course.id}`} />
          <LinkExport title={t('course_page')} url={`/user/course/${props.course.id}`} />
        </Table.Body>
      </Table>
    </div>
  )

  return <div className="LinkExportList">{expanded ? renderExpanded() : renderCollapsed()}</div>
}
/*
LinkExportList.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    course_id: PropTypes.number.isRequired
  }).isRequired,
  translate: PropTypes.func.isRequired
}
*/
export default LinkExportList
