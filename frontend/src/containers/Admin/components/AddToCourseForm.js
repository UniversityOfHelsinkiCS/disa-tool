import React, { useState } from 'react'
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

const AddToCourseForm = (props) => {
    const [role, setRole] = useState('STUDENT')
    const { t } = useTranslation()

    const onModalOpen = () => {
        props.getAllCourses()
        props.selectInstance(null)
    }

    const addToCourseSubmit = () => {
        if (!props.selectedInstance) return
        props.addPersonToCourse({
            courseInstanceId: props.selectedInstance.id,
            personId: props.person.id,
            role: role,
            course_instance: { name: props.selectedInstance.name },
        })
    }

    const changeCourse = (e, { value }) => {
        if (value && value !== props.selectedCourse) {
            props.selectCourse(value)
            props.selectInstance(undefined)
            props.getInstancesOfCourse(value)
        }
    }

    const changeInstance = (e, { value }) => props.selectInstance(value)

    const changeRole = (role) => () => setRole(role)

    const contentPrompt = [
        t('prompt_1'),
        props.person.name,
        t('prompt_2'),
    ].join(' ')
    const actions = saveActions(t)
    if (!props.selectedInstance) {
        const index = actions.findIndex((action) => !action.props.type)
        actions[index] = React.cloneElement(actions[index], {
            disabled: true,
        })
    }

    //     translate = (id) => this.props.t(`Admin.AddToCourseForm.${id}`)

    return (
        <div className="AddToCourseForm">
            <ModalForm
                header={t('header')}
                trigger={<Button color="blue">{t('trigger')}</Button>}
                onOpen={onModalOpen}
                actions={actions}
                onSubmit={addToCourseSubmit}
            >
                <p>{contentPrompt}.</p>
                <Form.Field inline>
                    <Label>{t('course')}</Label>
                    <Dropdown
                        selection
                        fluid
                        onChange={changeCourse}
                        value={
                            props.selectedCourse
                                ? props.selectedCourse.id
                                : undefined
                        }
                        options={props.courses.map((course) => ({
                            key: course.id,
                            text: course.name,
                            value: course.id,
                        }))}
                    />
                </Form.Field>
                <Form.Field inline disabled={!props.selectedCourse}>
                    <Label>{t('instance')}</Label>
                    <Dropdown
                        selection
                        fluid
                        onChange={changeInstance}
                        value={
                            props.selectedInstance
                                ? props.selectedInstance.id
                                : undefined
                        }
                        options={props.instances.map((instance) => ({
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
                            onClick={changeRole('STUDENT')}
                            inverted={role !== 'STUDENT'}
                            color="green"
                        >
                            {t('student_button')}
                        </Button>
                        <Button
                            type="button"
                            onClick={changeRole('TEACHER')}
                            inverted={role !== 'TEACHER'}
                            color="green"
                        >
                            {t('teacher_button')}
                        </Button>
                    </Button.Group>
                </Form.Field>
            </ModalForm>
        </div>
    )
}

AddToCourseForm.propTypes = {
    t: PropTypes.func.isRequired,
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
