import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button } from 'semantic-ui-react'
import asyncAction from '../../../../utils/asyncAction'

import { addHeader } from '../../actions/types'

import ModalForm, { saveActions } from '../../../../utils/components/ModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import InfoBox from '../../../../utils/components/InfoBox'

const CreateHeaderForm = (props) => {
    const { t } = useTranslation()
    const addHeaderSubmit = (e) => {
        props.addHeader({
            course_instance_id: props.courseId,
            eng_name: e.target.eng_name.value,
            fin_name: e.target.fin_name.value,
            swe_name: e.target.swe_name.value,
            order: props.newOrder,
        })
    }

    //translate = (id) => this.props.t(`Course.types.CreateHeaderForm.${id}`)

    const contentPrompt = t('prompt_1')
    const label = {
        name: t('name'),
    }
    return (
        <div className="CreateHeaderForm">
            <ModalForm
                header={
                    <Fragment>
                        {t('header')}
                        <InfoBox
                            translateFunc={t}
                            translationid="AddTypeHeaderModal"
                            buttonProps={{ floated: 'right' }}
                        />
                    </Fragment>
                }
                trigger={
                    <Button
                        basic
                        // onClick={expand}
                        className="addHeaderButton"
                        icon={{ name: 'add' }}
                    />
                }
                actions={saveActions(t)}
                onSubmit={addHeaderSubmit}
            >
                <p>{contentPrompt}.</p>
                <MultilingualField field="name" fieldDisplay={label.name} />
            </ModalForm>
        </div>
    )
}

CreateHeaderForm.propTypes = {
    addHeader: PropTypes.func.isRequired,
    courseId: PropTypes.number.isRequired,
    translate: PropTypes.func.isRequired,
    newOrder: PropTypes.number.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addHeader: asyncAction(addHeader, dispatch),
})

export default connect(null, mapDispatchToProps)(CreateHeaderForm)
