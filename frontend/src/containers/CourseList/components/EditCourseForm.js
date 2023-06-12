import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Icon } from 'semantic-ui-react'
import asyncAction from '../../../utils/asyncAction'

import { getCourse } from '../../../api/courses'
import { editCourse, getAllCourses } from '../actions/courses'

import ModalForm, { saveActions } from '../../../utils/components/ModalForm'
import MultilingualField from '../../../utils/components/MultilingualField'

export class EditCourseForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            values: {
                name: {
                    eng: '',
                    fin: '',
                    swe: '',
                },
            },
            loading: true,
            triggered: false,
        }
    }

    editCourseSubmit = async (e) => {
        await this.props.editCourse({
            id: this.props.course_id,
            eng_name: e.target.eng_name.value,
            fin_name: e.target.fin_name.value,
            swe_name: e.target.swe_name.value,
        })
        this.props.getAllCourses()
        this.setState({
            triggered: false,
            loading: true,
        })
    }

    loadDetails = async () => {
        if (this.state.triggered) return
        this.setState({ triggered: true })
        const courseDetails = await getCourse({
            id: this.props.course_id,
        })
        const courseData = courseDetails.data
        const { eng_name, fin_name, swe_name } = courseData
        this.setState({
            values: {
                name: {
                    eng: eng_name,
                    fin: fin_name,
                    swe: swe_name,
                },
            },
            loading: false,
        })
    }

    translate = (id) => this.props.t(`CourseList.EditCourseForm.${id}`)

    render() {
        const contentPrompt = t('renameCourse')
        return (
            <div className="EditCourseForm">
                <ModalForm
                    header={t('rename')}
                    trigger={
                        <Button
                            style={{ margin: '10px' }}
                            type="button"
                            color="teal"
                            fluid
                            basic
                            compact
                        >
                            {t('rename_trigger')}
                        </Button>
                    }
                    onSubmit={this.editCourseSubmit}
                    actions={saveActions(this.translate)}
                    loading={this.state.loading}
                    onOpen={this.loadDetails}
                >
                    <p>{contentPrompt}.</p>
                    <MultilingualField
                        field="name"
                        fieldDisplay={t('name')}
                        values={this.state.values.name}
                    />
                </ModalForm>
            </div>
        )
    }
}

EditCourseForm.propTypes = {
    course_id: PropTypes.number.isRequired,
    editCourse: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    getAllCourses: asyncAction(getAllCourses, dispatch),
    editCourse: asyncAction(editCourse, dispatch),
})

export default connect(null, mapDispatchToProps)(EditCourseForm)
