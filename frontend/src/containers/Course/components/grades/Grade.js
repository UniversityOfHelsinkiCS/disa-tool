import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Segment, Header, Grid } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { useDrag } from 'react-dnd'
import { removeGrade } from '../../actions/grades'
import DeleteForm from '../../../../utils/components/DeleteForm'
import EditGradeForm from './EditGradeForm'
import DnDItem from '../../../../utils/components/DnDItem'

const parseName = (object) => (object ? object.name : null)

const Grade = ({ currentGrade, slots, moveGrade, levels, grades }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'course.grades.grade' })
  const dispatch = useDispatch()

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'grade',
      item: { id: currentGrade.id, type: 'grade' },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  )

  const asyncRemoveGrade = async ({ id }) => {
    const response = await removeGrade({
      id,
    })
    dispatch(response)
  }
  return (
    <DnDItem target={currentGrade} mover={moveGrade} slots={slots} drag={drag} isDragging={isDragging}>
      <div className="Grade">
        <Segment>
          <Header>{currentGrade.name}</Header>
          <Grid columns={4}>
            <Grid.Row>
              <Grid.Column width={5}>
                <p>
                  <span>{t('skill_level')}</span>
                  <span>: </span>
                  <strong>{parseName(levels.find((level) => level.id === currentGrade.skill_level_id))}</strong>
                </p>
              </Grid.Column>
              <Grid.Column width={4}>
                <p>
                  <span>{t('needed_for_grade')}</span>
                  <span>: </span>
                  <strong>{currentGrade.needed_for_grade * 100}%</strong>
                </p>
              </Grid.Column>
              <Grid.Column width={5}>
                <p>
                  <span>{t('prerequisite')}</span>
                  <span>: </span>
                  <strong>{parseName(grades.find((grade) => grade.id === grade.prerequisite))}</strong>
                </p>
              </Grid.Column>
              <Grid.Column width={2}>
                <div className="flexContainer">
                  <div className="flexBlock">
                    <EditGradeForm
                      gradeId={currentGrade.id}
                      grades={grades.filter((grade) => grade.id !== currentGrade.id)}
                      levels={levels}
                    />
                  </div>
                  <div className="flexBlock">
                    <DeleteForm
                      onExecute={() => asyncRemoveGrade({ id: currentGrade.id })}
                      header={t('delete_header')}
                      prompt={[t('delete_prompt_1'), currentGrade.name]}
                    />
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    </DnDItem>
  )
}
/*
Grade.propTypes = {
  grade: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    skill_level_id: PropTypes.number.isRequired,
    needed_for_grade: PropTypes.number.isRequired,
    prerequisite: PropTypes.number
  }).isRequired,
  levels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  grades: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  removeGrade: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  moveGrade: PropTypes.func.isRequired,
  slots: PropTypes.shape({
    previous: PropTypes.number.isRequired,
    next: PropTypes.number.isRequired
  }).isRequired
}
*/

export default connect()(Grade)
