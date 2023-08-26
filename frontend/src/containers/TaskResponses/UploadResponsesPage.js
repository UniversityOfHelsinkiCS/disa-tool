import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Input, Message, Dropdown } from 'semantic-ui-react'
import Papa from 'papaparse'

import { getByCourse } from '../../api/types'
import PointMapping from './PointMapping'
import CsvTable from './CsvTable'
import CsvTaskMapping from './CsvTaskMapping'
import InfoBox from '../../utils/components/InfoBox'

export const UploadResponsesPage = (props) => {
  const [state, setState] = useState({
    activeType: 0,
    csv: undefined,
    csvMappings: {},
    studentHeader: undefined,
    pointsMapping: {},
    responsesCreated: false,
    types: [{ id: 0, text: 'Kaikki' }]
  })

  const { activeCourse } = props

  const clearAll = () => {
    setCsv(undefined)
    setCsvMappings({})
    setPointsMapping({})
    const fileInput = window.document.getElementsByName('fileInput')[0]
    fileInput.value = null
  }

  const loadTypes = () => getByCourse({ id: props.activeCourse.id }).then(response => setState({
    types: state.types.concat(response.data.data)
  }))

  const loadFile = async (e) => {
    const typePromise = loadTypes()
    const { files } = e.target
    Papa.parse(files[0], {
      complete: results => setCsv(results, () => mapCsvToTasks())
    })
    await typePromise
  }

  const mapCsvToTasks = () => {

    const headers = csv.data[0]
    const suggestions = {}
    headers.forEach((header, i) => {
      const suggestion = activeCourse.tasks.find(task => task.name.includes(headers[i]))
      suggestions[i] = {
        task: suggestion || { name: 'ei ehdotusta' },
        active: suggestion,
        csv: header
      }
    })
    const newStudentHeader = headers.findIndex(header => header.includes('Opiskelijanumero'))
    setState({ csvMappings: suggestions, newStudentHeader })
  }

  const handleMapTask = (e, { value, suggestion }) => {
    const mappings = { ...state.csvMappings }
    const task = props.activeCourse.tasks.find(t => t.id === value)
    mappings[suggestion].task = task
    setState({ csvMappings: mappings })
  }

  const toggleCsvHeader = (e, { value }) => {
    const mappings = { ...state.csvMappings }
    mappings[value].active = !mappings[value].active
    setState({ csvMappings: mappings })
  }

  const handleChange = (e, { name, value }) => {
    setState({ [name]: value })
  }

  const addPointMapping = (key, value) => {
    setState({ pointsMapping: { ...pointsMapping, [key]: Number(value) } })
  }

  const removePointMapping = (e, { value }) => {
    const mappings = { ...state.pointsMapping }
    delete mappings[value]
    setState({ pointsMapping: mappings })
  }

  const createNewStudent = (studentnumber) => {
    const number = String(studentnumber)[0] === '0' ? studentnumber : `0${studentnumber}`
    return { id: number, studentnumber: number, task_responses: [] }
  }

  const createResponseData = () => {
    const students = csv.data
    const tasks = Object.keys(csvMappings).filter(task => csvMappings[task].active)
    const updatedTasks = []
    for (let i = 1; i < students.length; i += 1) {
      const row = students[i]
      const student = (
        activeCourse.people
          .find(person => person.studentnumber.includes(String(row[studentHeader])))
        || createNewStudent(String(row[studentHeader]))
      )
      if (student && row.length > 1) {
        const studentTasks = tasks.map((task) => {
          const response = { personId: student.id, taskId: csvMappings[task].task.id }
          if (pointsMapping[row[task]] !== undefined) {
            response.points = Number(pointsMapping[row[task]])
          } else {
            const points = Number(row[task].replace(',', '.'))
            if (Number.isNaN(points)) {
              response.points = 0
            } else {
              response.points = points
            }
          }
          const existingResponse = student.task_responses.find(resp =>
            resp.task_id === response.taskId && resp.person_id === response.personId)
          if (existingResponse) {
            response.responseId = existingResponse.id
          }
          if (typeof student.id === 'string') {
            response.studentnumber = student.studentnumber
          }
          if (response.taskId && response.personId && response.points) {
            return response
          }
        })
        updatedTasks.push(...studentTasks.filter(task => task !== undefined))
      }
    }
    props.updateHandler(updatedTasks)
    setState({ responsesCreated: true })
  }

  const removeMessage = () => setState({ responsesCreated: false })

  if(!activeCourse) return <h1>Loading</h1>


    return  (
      <Grid container>
        <Grid.Row>
          <Grid.Column>
            <h3>Valitse ladattava csv-tiedosto<InfoBox translationid="TaskCSVUpload" buttonProps={{ floated: 'right' }} /></h3>
            <Input name="fileInput" type="file" accept=".csv" onChange={loadFile} />
            <Button basic color="red" content="tyhjennä valinta" onClick={clearAll} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {csv ? (
              <div style={{ marginBottom: '10px' }}>
                <span>Tehtävien tyyppi: </span>
                <Dropdown
                  name="type"
                  selection
                  value={activeType}
                  options={types.map(type => ({
                    key: type.id,
                    text: type.text,
                    value: type.id
                  }))}
                  onChange={(e, { value }) => setState({ activeType: value })}
                />
                <h4>Opiskelijanumerot sarakkeessa: </h4>
                <Dropdown
                  name="studentHeader"
                  value={studentHeader}
                  scrolling
                  placeholder="Valitse opiskelijanumeroiden sarake"
                  options={Object.keys(csvMappings).map(key =>
                    ({ key, text: csvMappings[key].csv, value: Number(key) }))}
                  onChange={handleChange}
                />
              </div>) : undefined}
            <CsvTaskMapping
              activeCourse={activeCourse}
              activeType={activeType}
              csv={csv}
              csvMappings={csvMappings}
              handleMapTask={handleMapTask}
              toggleCsvHeader={toggleCsvHeader}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {csv ?
            <Grid.Column>
              <PointMapping
                pointsMapping={pointsMapping}
                addPointMapping={addPointMapping}
                removePointMapping={removePointMapping}
              />
            </Grid.Column> : undefined}
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <h3>Luo palautukset</h3>
            <Button onClick={createResponseData}>Luo palautukset</Button>
            {responsesCreated ?
              <Message positive onDismiss={removeMessage}>
                Vastaukset luotu, ole hyvä ja tarkista ne tehtävätaulukosta ennen tallentamista.
              </Message> : undefined}
          </Grid.Column>
        </Grid.Row>
        {csv ?
          <CsvTable csv={csv} />
        : undefined}
      </Grid>
    )
}
/*
UploadResponsesPage.propTypes = {
  activeCourse: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })),
    people: PropTypes.arrayOf(PropTypes.shape({
      studentnumber: PropTypes.string
    }))
  }).isRequired,
  updateHandler: PropTypes.func.isRequired
}
*/
export default UploadResponsesPage
