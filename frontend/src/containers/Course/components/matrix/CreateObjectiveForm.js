import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { addObjective } from '../../actions/objectives'
import ModalForm, { saveActions } from '../../../../utils/components/NewModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'

export const CreateObjectiveForm = (props) => {
  const level = useSelector(state => state.level.levels.find(level => level.id === props.levelId))
  const dispatch = useDispatch()
   const addObjectiveSubmit = async(e) => {
      const response = await addObjective({
        eng_name: e.target.eng_name.value,
        fin_name: e.target.fin_name.value,
        swe_name: e.target.swe_name.value,
        skill_level_id: props.levelId,
        category_id: props.category.id,
        course_instance_id: props.courseId,
        order: props.newOrder
      })
      dispatch(response)
    }
    const {t} = useTranslation("translation")
      const contentPrompt = [
        t('course.matrix.createObjectiveForm.prompt_1'),
        `"${props.category.name}"`,
        t('course.matrix.createObjectiveForm.prompt_2'),
        `"${level.name}"`
      ].join(' ')

      const labels = {
        header: t('course.matrix.createObjectiveForm.header'),
      }

      return (
        <div className="CreateObjectiveForm">
          <ModalForm
            header={labels.header}
            trigger={<Button basic className="addObjectiveButton" icon={{ name: 'add' }} />}
            actions={saveActions()}
            onSubmit={addObjectiveSubmit}
          >
            <p>{contentPrompt}.</p>
            <MultilingualField field="name" fieldDisplay={t('common.name')} />
          </ModalForm>
        </div>
      )
    }
/*
CreateObjectiveForm.propTypes = {
  addObjective: PropTypes.func.isRequired,
  level: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  courseId: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  newOrder: PropTypes.number.isRequired
}
*/


export default connect()(CreateObjectiveForm)
