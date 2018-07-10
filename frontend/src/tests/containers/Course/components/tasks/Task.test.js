import React from 'react'
import Task from '../../../../../containers/Course/components/tasks/Task'
import TaskTypelist from '../../../../../containers/Course/components/tasks/TaskTypelist'
import ObjectiveSlider from '../../../../../containers/Course/components/tasks/ObjectiveSlider'
import { findText } from '../../../../testUtils'

const task = {
  id: 1,
  name: 'Tehtävä 1. (Tee voltti)',
  description: 'Tässä tehtävässä sinun tulee tehdä voltti, eli hypätä ja pyörähtää täysi kierros sivuttaisakselisi ympäri.',
  max_points: 3,
  info: 'tehtäväsivu: https://fi.wikipedia.org/wiki/Voltti_(akrobatia)',
  objectives: [
    {
      id: 1,
      name: 'Osaan muokata yhtälöryhmää vastaavan matriisin alkeisrivitoimituksilla redusoiduksi porrasmatriisiksi',
      multiplier: 0.5
    },
    {
      id: 2,
      name: 'Osaan päätellä yhtälöryhmän ratkaisut redusoidusta porrasmatriisista',
      multiplier: 0.8
    },
    {
      id: 3,
      name: 'Tunnen lineaarisen yhtälöryhmän ratkaisujen lukumäärään liittyvät rajoitukset',
      multiplier: 1.0
    }
  ],
  types: [
    {
      id: 1,
      name: 'Viikko 1'
    },
    {
      id: 7,
      name: 'Sarja I'
    }
  ]
}

describe('Task component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Task
      task={task}
      editing={false}
    />)
  })

  it('renders.', () => {
    expect(wrapper.find('.Task').exists()).toEqual(true)
  })

  describe('when collapsed', () => {
    it('does not render task description.', () => {
      expect(findText(task.description, wrapper)).toEqual(0)
    })

    it('does not render task info.', () => {
      expect(findText(task.info, wrapper)).toEqual(0)
    })

    it('does not render TaskTypelist component.', () => {
      expect(wrapper.find(TaskTypelist).exists()).toEqual(false)
    })

    it('does not render ObjectiveSlider components.', () => {
      expect(wrapper.find(ObjectiveSlider).exists()).toEqual(false)
    })
  })

  describe('when expanded', () => {
    beforeEach(() => {
      wrapper.setState({
        expanded: true
      })
    })

    it('renders task description.', () => {
      expect(findText(task.description, wrapper)).toBeGreaterThan(0)
    })

    it('renders task info.', () => {
      expect(findText(task.info, wrapper)).toBeGreaterThan(0)
    })

    it('renders TaskTypelist component.', () => {
      expect(wrapper.find(TaskTypelist).exists()).toEqual(true)
    })

    it('renders an ObjectiveSlider component for each objective.', () => {
      expect(wrapper.find(ObjectiveSlider).length).toEqual(task.objectives.length)
    })
  })
})
