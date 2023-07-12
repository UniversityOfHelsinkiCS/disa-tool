import React, { useState } from 'react'
import { connect, useDispatch,useSelector } from 'react-redux'
import { Icon, Dropdown, Form, Label } from 'semantic-ui-react'
import { addInstance } from '../actions/courseInstances'
import ModalForm,{saveActions} from '../../../utils/components/NewModalForm'
import MultilingualField from '../../../utils/components/MultilingualField'
import { useTranslation } from 'react-i18next'

export const CreateInstanceForm = (props) => {
  const [instanceToCopy, setInstanceToCopy] = useState(0)
  const {instances, templateInstances} = useSelector(state => state.listCourses)
  const dispatch = useDispatch()

  const addInstanceSubmit = async (e) => {
    const response = await addInstance({
      course_id: props.courseId,
      course_instance_id: instanceToCopy === 0 ? undefined : instanceToCopy,
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value
    })
    dispatch(response)
  }
console.log(instances,templateInstances)
  const {t} = useTranslation('translation')
    const contentPrompt = t('courseList.createInstanceForm.prompt_1')
    return (
      <div className="CreateInstanceForm">
        <ModalForm
          header={t('courseList.createInstanceForm.header')}
          trigger={<span><Icon name="add" />{t('courseList.createInstanceForm.trigger')}</span>}
          onSubmit={addInstanceSubmit}
          actions={saveActions()}
        >
          <p>{contentPrompt}.</p>
          <MultilingualField field="name" fieldDisplay={t('common.name')} />
          <Form.Field>
            <Label>{t('courseList.createInstanceForm.dropdown_label')}</Label>
            <Dropdown
              selection
              name="instance_to_copy"
              value={instanceToCopy}
              onChange={(e, { value }) => setInstanceToCopy(value)}
              options={
                [...instances, ...templateInstances].map(instance => ({
                  key: instance.id,
                  value: instance.id,
                  text: instance.name
                })).concat([{
                  key: 0,
                  value: 0,
                  text: t('courseList.createInstanceForm.dropdown_null_value')
                }])
              }
            />
          </Form.Field>
        </ModalForm>
      </div>
    )
}
/*
CreateInstanceForm.propTypes = {
  course_id: PropTypes.number.isRequired,
  addInstance: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  instances: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
}
*/

export default connect()(CreateInstanceForm)
