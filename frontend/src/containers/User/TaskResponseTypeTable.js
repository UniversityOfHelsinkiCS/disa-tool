import React, { useState } from 'react'
import { Button, Table, Segment } from 'semantic-ui-react'

const TaskResponseTypeTable = (props) => {
  const [selected, setSelected] = useState(props.typeHeaders && props.typeHeaders[0] ? props.typeHeaders[0].id : 1)

  const { typeHeaders, students, tasks, selectType, updatedTasks } = props

  const getTasksForType = (tasks, typeId) => tasks.filter((task) => task.types.find((type) => type.id === typeId))

  const showTasks = (e) => {
    const { value } = e.target
    setSelected(Number(value))
  }
  const updatedHeaders = typeHeaders
    ? typeHeaders.map((header) => ({
        ...header,
        types: header.types.map((type) => ({
          ...type,
          updated: getTasksForType(tasks, type.id).find((task) => updatedTasks.find((ut) => ut.taskId === task.id)),
        })),
      }))
    : []

  return (
    <Segment basic style={{ overflowX: 'auto', padding: 0 }}>
      <div style={{ display: 'inline' }}>
        {updatedHeaders.map((header) => (
          <Button key={header.id} onClick={showTasks} value={header.id} color={selected === header.id ? 'grey' : null}>
            {header.name}
          </Button>
        ))}
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell rowSpan="2">Opiskelija</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            {updatedHeaders
              .filter((upH) => upH.id === selected)
              .map((header) =>
                header.types.map((type) => {
                  return (
                    <Table.HeaderCell key={type.id}>
                      <Button onClick={selectType} color={type.updated ? 'red' : 'grey'}>
                        {type.name}
                      </Button>
                    </Table.HeaderCell>
                  )
                })
              )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {students.map((person) => (
            <Table.Row key={person.id}>
              <Table.Cell>
                {person.studentnumber} - {person.name}
              </Table.Cell>
              {updatedHeaders
                .filter((upH) => upH.id === selected)
                .map((header) =>
                  header.types.map((type) => (
                    <Table.Cell key={type.id}>
                      {person.task_responses &&
                        person.task_responses.filter((response) =>
                          getTasksForType(tasks, type.id).find((t) => t.id === response.task_id)
                        ).length}{' '}
                      / {getTasksForType(tasks, type.id).length}
                    </Table.Cell>
                  ))
                )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  )
}

export default TaskResponseTypeTable
