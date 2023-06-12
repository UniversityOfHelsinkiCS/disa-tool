import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Dropdown, Form, Label } from 'semantic-ui-react'
import asyncAction from '../../../utils/asyncAction'

import { getAllCourses, selectCourse } from '../../CourseList/actions/courses'
import {
    getInstancesOfCourse,
    selectInstance,
} from '../../CourseList/actions/courseInstances'
import { addPersonToCourse } from '../actions/coursePersons'

import ModalForm, { saveActions } from '../../../utils/components/ModalForm'

class AddToCourseForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            role: 'STUDENT',
        }
    }

    onModalOpen = () => {
        this.props.getAllCourses()
        this.props.selectInstance(null)
    }

    addToCourseSubmit = () => {
        if (!this.props.selectedInstance) return
        this.props.addPersonToCourse({
            courseInstanceId: this.props.selectedInstance.id,
            personId: this.props.person.id,
            role: this.state.role,
            course_instance: { name: this.props.selectedInstance.name },
        })
    }

    changeCourse = (e, { value }) => {
        if (value && value !== this.props.selectedCourse) {
            this.props.selectCourse(value)
            this.props.selectInstance(undefined)
            this.props.getInstancesOfCourse(value)
        }
    }

    changeInstance = (e, { value }) => this.props.selectInstance(value)

    changeRole = (role) => () => this.setState({ role })

    translate = (id) => this.props.translate(`Admin.AddToCourseForm.${id}`)

    render() {
        const contentPrompt = [
            this.translate('prompt_1'),
            this.props.person.name,
            this.translate('prompt_2'),
        ].join(' ')
        const actions = saveActions(this.translate)
        if (!this.props.selectedInstance) {
            const index = actions.findIndex((action) => !action.props.type)
            actions[index] = React.cloneElement(actions[index], {
                disabled: true,
            })
        }
        return (
            <div className="AddToCourseForm">
                <ModalForm
                    header={this.translate('header')}
                    trigger={
                        <Button color="blue">
                            {this.translate('trigger')}
                        </Button>
                    }
                    onOpen={this.onModalOpen}
                    actions={actions}
                    onSubmit={this.addToCourseSubmit}
                >
                    <p>{contentPrompt}.</p>
                    <Form.Field inline>
                        <Label>{this.translate('course')}</Label>
                        <Dropdown
                            selection
                            fluid
                            onChange={this.changeCourse}
                            value={
                                this.props.selectedCourse
                                    ? this.props.selectedCourse.id
                                    : undefined
                            }
                            options={this.props.courses.map((course) => ({
                                key: course.id,
                                text: course.name,
                                value: course.id,
                            }))}
                        />
                    </Form.Field>
                    <Form.Field inline disabled={!this.props.selectedCourse}>
                        <Label>{this.translate('instance')}</Label>
                        <Dropdown
                            selection
                            fluid
                            onChange={this.changeInstance}
                            value={
                                this.props.selectedInstance
                                    ? this.props.selectedInstance.id
                                    : undefined
                            }
                            options={this.props.instances.map((instance) => ({
                                key: instance.id,
                                text: instance.name,
                                value: instance.id,
                            }))}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button.Group>
                            <Button
                                type="button"
                                onClick={this.changeRole('STUDENT')}
                                inverted={this.state.role !== 'STUDENT'}
                                color="green"
                            >
                                {this.translate('student_button')}
                            </Button>
                            <Button
                                type="button"
                                onClick={this.changeRole('TEACHER')}
                                inverted={this.state.role !== 'TEACHER'}
                                color="green"
                            >
                                {this.translate('teacher_button')}
                            </Button>
                        </Button.Group>
                    </Form.Field>
                </ModalForm>
            </div>
        )
    }
}

AddToCourseForm.propTypes = {
    translate: PropTypes.func.isRequired,
    person: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        course_people: PropTypes.arrayOf(
            PropTypes.shape({
                course_instance_id: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
    getAllCourses: PropTypes.func.isRequired,
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    instances: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedCourse: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }),
    selectedInstance: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }),
    selectCourse: PropTypes.func.isRequired,
    selectInstance: PropTypes.func.isRequired,
    getInstancesOfCourse: PropTypes.func.isRequired,
    addPersonToCourse: PropTypes.func.isRequired,
}

AddToCourseForm.defaultProps = {
    selectedCourse: null,
    selectedInstance: null,
}

const mapStateToProps = (state, ownProps) => {
    const alreadyOnCourse = ownProps.person.course_people.reduce(
        (acc, curr) => ({
            ...acc,
            [curr.course_instance_id]: true,
        }),
        {}
    )
    return {
        courses: state.listCourses.courses,
        instances: state.listCourses.instances.filter(
            (instance) => !alreadyOnCourse[instance.id]
        ),
        selectedCourse: state.listCourses.selectedCourse,
        selectedInstance: state.listCourses.selectedInstance,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllCourses: asyncAction(getAllCourses, dispatch),
    getInstancesOfCourse: asyncAction(getInstancesOfCourse, dispatch),
    selectCourse: selectCourse(dispatch),
    selectInstance: selectInstance(dispatch),
    addPersonToCourse: asyncAction(addPersonToCourse, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToCourseForm)
