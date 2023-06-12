import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { redirect } from 'react-router-dom'
import { Form, Button, Segment, Header } from 'semantic-ui-react'
import asyncAction from '../../utils/asyncAction'
import './createCourse.css'

import { createCourse } from './services/createCourse'

import MultilingualField from '../../utils/components/MultilingualField'

const CreateCoursePage = (props) => {
    const [redirectBool, setRedirectBool] = useState(false)

    const createCourseSubmit = (e) => {
        e.preventDefault()
        props
            .createCourse({
                eng_name: e.target.eng_name.value,
                fin_name: e.target.fin_name.value,
                swe_name: e.target.swe_name.value,
            })
            .then(() => setRedirectBool(true))
    }

    const translate = (id) => props.t(`CreateCourse.CreateCoursePage.${id}`)

    if (redirectBool) {
        return redirect('/courses')
    }

    const label = {
        name: t('name'),
    }
    return (
        <div className="CreateCoursePage">
            <Segment className="formContainer" basic padded>
                <Header>{t('createCourse')}</Header>
                <Form onSubmit={createCourseSubmit}>
                    <MultilingualField field="name" fieldDisplay={label.name} />
                    <Button type="submit" color="green">
                        {t('create')}
                    </Button>
                </Form>
            </Segment>
        </div>
    )
}

CreateCoursePage.propTypes = {
    createCourse: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    createCourse: asyncAction(props.createCourse, dispatch),
})

export default connect(null, mapDispatchToProps)(CreateCoursePage)
