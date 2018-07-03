import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import Matrix from './components/Matrix'
import Tasklist from './components/tasks/Tasklist'

const courseParts = {
  matriisit: { 
    taso1: ['matriisien yhteenlasku', 'matriisien muodostus'],
    taso2: ['matriisien kertolasku', 'matriisien pyörittely'],
    taso3: ['matriiseilla päteminen', 'matriisien heiluttelu', 'matriisien superlasku', 'supreme matriisimestari']
   },
  'vektorit ja muut': {
    taso1: ['vektorien yhteenlasku', 'vektorien muodostus'],
    taso2: ['vektorien kertolasku', 'pyörittely', 'vektorien 3D piirtely'],
    taso3: ['vektorien äärimmäinen heiluttelu']
  }
}

const skills = [
  {
    name: 'matriisien yhteenlasku',
    id: 1
  },
  {
    name: 'matriisien muodostus',
    id: 2
  },
  {
    name: 'matriisien kertolasku',
    id: 3
  },
  {
    name: 'matriisien pyörittely',
    id: 4
  },
  {
    name: 'matriiseilla päteminen',
    id: 5
  },
  {
    name: 'matriisien heiluttelu',
    id: 6
  },
  {
    name: 'matriisien superlasku',
    id: 7
  },
  {
    name: 'supreme matriisimestari',
    id: 8
  },
  {
    name: 'vektorien yhteenlasku',
    id: 9
  },
  {
    name: 'vektorien muodostus',
    id: 10
  },
  {
    name: 'vektorien kertolasku',
    id: 11
  },
  {
    name: 'pyörittely',
    id: 12
  },
  {
    name: 'vektorien 3D piirtely',
    id: 13
  },
  {
    name: 'vektorien äärimmäinen heiluttelu',
    id: 14
  }
]

const skillLevels = ['taso1', 'taso2', 'taso3']

const assessmentForm = {
  questions: [
    {
      question: 'Oletko nyt tyytyväinen?',
      type: 'radio',
      options: [1, 2, 3, 4],
      skills: [0, 1, 2, 3, 4]
    },
    {
      question: 'Kerro vähän tarkemmin',
      type: 'open',
      // options: [],
      skills: [1, 2, 3]
    }
  ],
  instant_feedback: false
}

const tasks = [
  {
    id: 1,
    name: 'laske matriisit yhteen',
    description: 'Tässä tehtävässä lasketaan matriiseja yhteen ja sen sellaista',
    info: 'http://www.wolframalpha.com',
    maxmaxPoints: 1,
    skills: [0, 1, 2]
  },
  {
    id: 2,
    name: 'laske vektorien summa',
    description: 'Tämä on pitkä kuvaus tehtävästä, joka voi olla suoraan itse tehtävä, tai vain sen luonnehdintaa',
    info: 'http://www.wolframalpha.com',
    maxPoints: 2,
    skills: [10, 12, 13]
  },
  {
    id: 3,
    name: 'piirrä kuva',
    description: 'Tämä on pitkä kuvaus tehtävästä, joka voi olla suoraan itse tehtävä, tai vain sen luonnehdintaa',
    info: 'http://www.wolframalpha.com',
    maxPoints: 4,
    skills: [5, 6, 7]
  },
  {
    id: 4,
    name: 'piirrä monimutkainen kuva',
    description: 'Tämä on pitkä kuvaus tehtävästä, joka voi olla suoraan itse tehtävä, tai vain sen luonnehdintaa',
    info: 'http://www.wolframalpha.com',
    maxPoints: 1,
    skills: [8]
  },
  {
    id: 5,
    name: 'laske vaikea lasku',
    description: 'Tämä on pitkä kuvaus tehtävästä, joka voi olla suoraan itse tehtävä, tai vain sen luonnehdintaa',
    info: 'http://www.wolframalpha.com',
    maxPoints: 2,
    skills: [3, 4]
  },
  {
    id: 6,
    name: 'todista väite',
    description: 'Tämä on pitkä kuvaus tehtävästä, joka voi olla suoraan itse tehtävä, tai vain sen luonnehdintaa',
    info: 'http://www.wolframalpha.com',
    maxPoints: 4,
    skills: [7, 8, 9]
  },
  {
    id: 7,
    name: 'laske käytännön ongelma',
    description: 'Tämä on pitkä kuvaus tehtävästä, joka voi olla suoraan itse tehtävä, tai vain sen luonnehdintaa',
    info: 'http://www.wolframalpha.com',
    maxPoints: 3,
    skills: [1, 2, 3]
  },
  {
    id: 8,
    name: 'juttele kaverin kanssa',
    description: 'Tämä on pitkä kuvaus tehtävästä, joka voi olla suoraan itse tehtävä, tai vain sen luonnehdintaa',
    info: 'http://www.wolframalpha.com',
    maxPoints: 4,
    skills: [4, 5, 6, 10, 11, 12]
  },
  {
    id: 9,
    name: 'pyöräile Hankoon',
    description: 'Tämä on pitkä kuvaus tehtävästä, joka voi olla suoraan itse tehtävä, tai vain sen luonnehdintaa',
    info: 'http://www.wolframalpha.com',
    maxPoints: 1,
    skills: [0, 5, 8]
  },
  {
    id: 10,
    name: 'laske vektorien pistetulo',
    description: 'Tämä on pitkä kuvaus tehtävästä, joka voi olla suoraan itse tehtävä, tai vain sen luonnehdintaa',
    info: 'http://www.wolframalpha.com',
    maxPoints: 1,
    skills: [0, 4, 13]
  },
  {
    id: 11,
    name: 'muodosta käänteismatriisi',
    description: 'Tämä on pitkä kuvaus tehtävästä, joka voi olla suoraan itse tehtävä, tai vain sen luonnehdintaa',
    info: 'http://www.wolframalpha.com',
    maxPoints: 1,
    skills: [0, 2, 11]
  }
]

const courseTask = {
  courseInstance: 1,
  task: 1,
  available: false
}

const skill = {
  name: 'matriisien yhteenlasku',

}

class CoursePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Matrix skillLevels={skillLevels} courseParts={courseParts} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Tasklist tasks={tasks} skills={skills} editing={this.state.editing} />
        </Grid.Row>
      </Grid>
    )
  }
}

export default CoursePage