import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { redirect, Link, useParams } from 'react-router-dom'
import { shape, string, arrayOf, func, number } from 'prop-types'
import {
    Accordion,
    Dimmer,
    Header,
    Grid,
    Item,
    Loader,
    Button,
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import {
    getUserCoursesAction,
    getUserSelfAssesments,
    getCourseInstanceDataAction,
    toggleCourseActivityAction,
    toggleAssessmentAction,
    setAssessmentStatusAction,
    resetCourseInstanceAction,
} from '../../actions/actions'
import CourseSideMenu from './CourseSideMenu'
import { ListTasks } from './ListTasks'
import CourseSelfAssessmentsList from './CourseSelfAssessmentsList'
import CourseInfo from './CourseInfo'
import Conditional from '../../utils/components/Conditional'
import InfoBox from '../../utils/components/InfoBox'

const UserPage = (props) => {
    const [mounted, setMounted] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [selectedType, setSelectedType] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const user = useSelector((state) => state.user)
    const courseInstance = useSelector((state) => state.courseInstance)
    const activeCourse = courseInstance.activeCourse
    const params = useParams()
    const dispatch = useDispatch()
    const { t } = useTranslation(`translation`, {
        keyPrefix: `UserPage.common`,
    })
    console.log(t('self_assessments'))

    dispatch(getUserCoursesAction())
    getUserCoursesAction()

    useEffect(() => {
        dispatch(getUserCoursesAction())
        const onMount = async () => {
            const { courseId } = params

            dispatch(getUserCoursesAction())
            getUserSelfAssesments()
            if (
                courseId &&
                (!activeCourse.id || activeCourse.id !== courseId) &&
                !loading
            ) {
                if (mounted) {
                    setLoading(true)
                    getCourseInstanceDataAction(courseId).then(() => {
                        if (mounted) {
                            setLoading(false)
                        }
                    })
                }
            }
        }
        setMounted(true)
        onMount()

        return () => {
            const { course_id: courseId, id, status } = props.activeCourse
            //       if (cancelablePromise) { REMOVE THIS?
            //           cancelablePromise.cancel()
            //       }
            if (status === 403 && params.courseId && courseId && id) {
                resetCourseInstanceAction()
            }
            setMounted(false)
        }
    }, [])

    const handleActivityToggle = async () => {
        const { activeCourse } = toggleCourseActivityAction(
            activeCourse.id
        ).then((res) => console.log(res))
    }

    const handleClick = async (e, { course }) => {
        // setState({ activeCourse: course })
        // Fetch all relevant course information: tasks with responses & assessments with responses.
        if (!loading && params.courseId) {
            setLoading(true)
            await getCourseInstanceDataAction(course.id)
            setLoading(false)
        }
    }

    const toggleAssessment = (e, { value }) => {
        switch (e.target.name) {
            case 'assessmentHidden':
                setAssessmentStatusAction(value, [
                    { name: 'open', value: false },
                    { name: 'active', value: false },
                ])
                break
            case 'assessmentShown':
                setAssessmentStatusAction(value, [
                    { name: 'open', value: false },
                    { name: 'active', value: true },
                ])
                break
            case 'assessmentOpen':
                setAssessmentStatusAction(value, [
                    { name: 'open', value: true },
                    { name: 'active', value: true },
                ])
                break
            case 'feedbackOpen':
                toggleAssessmentAction(value, 'show_feedback')
                break
            default:
                console.log('Something went wrong here now')
        }
    }

    const { self_assessments: assessments, tasks } = activeCourse
    if (!params.courseId && activeCourse.id) {
        return redirect(`/user/course/${activeCourse.id}`)
    }
    const { course_id: courseId, id, status } = activeCourse
    if (status === 403 && props.match.params.courseId && courseId && id) {
        return redirect(`/courses?course=${courseId}&instance=${id}`)
    }
    const isTeacher = activeCourse.courseRole === 'TEACHER'
    const isGlobalTeacher = user.role === 'TEACHER' || user.role === 'ADMIN'
    /* const students =
        activeCourse.id && isTeacher
            ? activeCourse.people.filter(
                  (person) =>
                      person.course_instances[0].course_person.role !==
                      'TEACHER'
              )
            : []*/
    const teachers = activeCourse.id
        ? activeCourse.people.filter(
              (person) =>
                  person.course_instances[0].course_person.role === 'TEACHER'
          )
        : []

    return (
        <Grid padded="horizontally">
            <Dimmer active={loading} inverted>
                <Loader inverted />
            </Dimmer>
            <Grid.Row>
                <Grid.Column>
                    {
                        <Header as="h1">
                            {t('hello')} {props.user && props.user.name}
                        </Header>
                    }
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={3}>
                    <CourseSideMenu
                        courses={courses}
                        activeCourse={activeCourse}
                        handleChange={handleClick}
                    />
                </Grid.Column>
                <Grid.Column width={13}>
                    {activeCourse.id ? (
                        <Item>
                            <Grid padded="horizontally" columns="equal">
                                <CourseInfo
                                    course={activeCourse}
                                    toggleActivation={handleActivityToggle}
                                    teachers={teachers}
                                    //           deleteTeacher={handleTeacherRemoving}
                                    isTeacher={isTeacher}
                                    isGlobalTeacher={isGlobalTeacher}
                                />
                                <Conditional
                                    visible={
                                        isTeacher ||
                                        assessments.some((a) => a.active)
                                    }
                                >
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Item.Content>
                                                <InfoBox
                                                    translationid="UserPageSelfAssessments"
                                                    buttonProps={{
                                                        floated: 'right',
                                                    }}
                                                    useCourseRole
                                                />
                                                <Header as="h2">
                                                    {t('self_assessments')}
                                                </Header>
                                                <CourseSelfAssessmentsList
                                                    assesments={assessments}
                                                    isTeacher={isTeacher}
                                                    toggleAssessment={
                                                        toggleAssessment
                                                    }
                                                />
                                            </Item.Content>
                                            <Conditional visible={isTeacher}>
                                                <Button
                                                    as={Link}
                                                    to={`/selfassessment/create/${activeCourse.id}/category`}
                                                    basic
                                                    color="blue"
                                                    content={t(
                                                        'create_self_assessment_category'
                                                    )}
                                                    icon="plus"
                                                    circular
                                                    style={{
                                                        marginLeft: '10px',
                                                    }}
                                                />
                                                <Button
                                                    as={Link}
                                                    to={`/selfassessment/create/${activeCourse.id}/objective`}
                                                    basic
                                                    color="blue"
                                                    content={t(
                                                        'create_self_assessment_target'
                                                    )}
                                                    icon="plus"
                                                    circular
                                                    style={{
                                                        marginLeft: '10px',
                                                    }}
                                                />
                                            </Conditional>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Conditional>
                                <Conditional visible={tasks.length > 0}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Item.Content>
                                                <InfoBox
                                                    translationid="UserPageTasks"
                                                    buttonProps={{
                                                        floated: 'right',
                                                    }}
                                                    useCourseRole
                                                />
                                                <Header as="h2">
                                                    {t('tasks')}
                                                </Header>
                                                <Accordion
                                                    defaultActiveIndex={-1}
                                                    styled
                                                    fluid
                                                    panels={[
                                                        {
                                                            key: 'ListTasks',
                                                            title: t(
                                                                'open_task_list'
                                                            ),
                                                            content: {
                                                                key: 'tasks',
                                                                content: (
                                                                    <ListTasks
                                                                        tasks={
                                                                            tasks
                                                                        }
                                                                        selectedType={
                                                                            selectedType
                                                                        }
                                                                    />
                                                                ),
                                                            },
                                                        },
                                                    ]}
                                                />
                                            </Item.Content>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Conditional>
                            </Grid>
                        </Item>
                    ) : (
                        <Item>
                            <Item.Content>
                                {t('no_course_selected')}
                            </Item.Content>
                        </Item>
                    )}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

UserPage.propTypes = {
    courses: arrayOf(
        shape({
            id: number.isRequired,
            name: string.isRequired,
        })
    ),
}

UserPage.defaultProps = {
    courses: [],
}

export default UserPage
