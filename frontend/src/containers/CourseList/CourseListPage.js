import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { orderBy } from 'lodash'
import {
    Button,
    Header,
    List,
    Grid,
    Dropdown,
    Icon,
    Message,
    Form,
} from 'semantic-ui-react'
import asyncAction from '../../utils/asyncAction'

import parseQueryParams from '../../utils/parseQueryParams'

import { getAllCourses, selectCourse } from './actions/courses'
import {
    getInstancesOfCourse,
    selectInstance,
    getTemplateInstances,
} from './actions/courseInstances'

import CreateInstanceForm from './components/CreateInstanceForm'
import RegisterForm from './components/RegisterForm'
import EditInstanceForm from './components/EditInstanceForm'
import EditCourseForm from './components/EditCourseForm'
import Conditional from '../../utils/components/Conditional'
import InfoBox from '../../utils/components/InfoBox'

class CourseListPage extends Component {
    componentDidMount = async () => {
        await this.props.getAllCourses()
        const templateCourse = this.props.courses.find((e) =>
            ['KURSSIPOHJAT', 'COURSE TEMPLATES', 'KURSMALL'].includes(e.name)
        )

        if (templateCourse != null) {
            await this.props.getTemplateInstances(templateCourse.id)
        }

        if (this.props.location.query_params.course) {
            this.props.selectCourse(
                Number(this.props.location.query_params.course)
            )
            await this.props.getInstancesOfCourse(
                Number(this.props.location.query_params.course)
            )
            if (this.props.location.query_params.instance) {
                this.props.selectInstance(
                    Number(this.props.location.query_params.instance)
                )
            }
        }
    }

    handleChange = (e, data) => {
        if (data.value && data.value !== this.props.selectedCourse) {
            this.props.selectCourse(Number(data.value))
            this.props.selectInstance(undefined)
            this.props.getInstancesOfCourse(Number(data.value))
        }
    }

    selectInstance = (e, data) => {
        this.props.selectInstance(Number(data.value))
    }

    translate = (id) => this.props.t(`CourseList.CourseListPage.${id}`)

    render() {
        const courseOptions = orderBy(
            this.props.courses.map((course) => ({
                key: course.id,
                text: course.name,
                value: course.id,
            })),
            'text'
        )
        return (
            <Grid padded="vertically">
                <Grid.Row>
                    <Grid.Column width={4}>
                        <List selection>
                            {this.props.user &&
                            (this.props.user.role === 'TEACHER' ||
                                this.props.user.role === 'ADMIN') &&
                            this.props.selectedCourse ? (
                                <List.Item style={{ color: 'green' }}>
                                    <CreateInstanceForm
                                        course_id={this.props.selectedCourse.id}
                                    />
                                </List.Item>
                            ) : null}
                            {this.props.instances.map((instance) => (
                                <List.Item
                                    style={
                                        instance.active
                                            ? { color: 'blue' }
                                            : undefined
                                    }
                                    key={instance.id}
                                    onClick={this.selectInstance}
                                    value={instance.id.toString()}
                                >
                                    {instance.name}
                                </List.Item>
                            ))}
                        </List>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Form>
                            <Form.Group inline>
                                <Dropdown
                                    fluid
                                    search
                                    selection
                                    value={
                                        this.props.selectedCourse
                                            ? this.props.selectedCourse.id
                                            : undefined
                                    }
                                    options={courseOptions}
                                    onChange={this.handleChange}
                                    placeholder={t('course_select_placeholder')}
                                    selectOnBlur={false}
                                    selectOnNavigation={false}
                                />
                                <Conditional
                                    visible={
                                        this.props.user.role === 'TEACHER' ||
                                        this.props.user.role === 'ADMIN'
                                    }
                                >
                                    <Button
                                        style={{ marginLeft: '10px' }}
                                        as={Link}
                                        to="courses/create"
                                        labelPosition="left"
                                        color="green"
                                        icon
                                        basic
                                    >
                                        {t('create_trigger')}
                                        <Icon name="add" color="green" />
                                    </Button>
                                    <Conditional
                                        visible={
                                            this.props.user &&
                                            (this.props.user.role ===
                                                'TEACHER' ||
                                                this.props.user.role ===
                                                    'ADMIN') &&
                                            !!this.props.selectedCourse
                                        }
                                    >
                                        <EditCourseForm
                                            course_id={
                                                this.props.selectedCourse
                                                    ? this.props.selectedCourse
                                                          .id
                                                    : undefined
                                            }
                                        />
                                    </Conditional>
                                </Conditional>
                                <InfoBox
                                    translationid="CoursesPage"
                                    buttonProps={{ floated: 'right' }}
                                />
                            </Form.Group>
                        </Form>
                        {this.props.selectedCourse ? (
                            <div>
                                {this.props.selectedInstance ? (
                                    <div>
                                        <div style={{ display: 'flex' }}>
                                            <h2 style={{ flexGrow: 1 }}>
                                                {
                                                    this.props.selectedInstance
                                                        .name
                                                }
                                            </h2>
                                            {this.props.selectedInstance
                                                .registered === 'TEACHER' ? (
                                                <EditInstanceForm
                                                    course_instance_id={
                                                        this.props
                                                            .selectedInstance.id
                                                    }
                                                />
                                            ) : null}
                                        </div>
                                        <Header
                                            as="h2"
                                            color={
                                                this.props.selectedInstance
                                                    .active
                                                    ? 'green'
                                                    : 'red'
                                            }
                                        >
                                            <Header.Subheader
                                                style={{ display: 'inline' }}
                                            >
                                                {t('state')}{' '}
                                            </Header.Subheader>
                                            {this.props.selectedInstance
                                                .active ? (
                                                <span>
                                                    <b>{t('open')}</b>
                                                </span>
                                            ) : (
                                                <span>
                                                    <b>{t('closed')}</b>
                                                </span>
                                            )}
                                        </Header>
                                        <Conditional
                                            visible={
                                                !!this.props.selectedInstance
                                                    .registered
                                            }
                                        >
                                            <Message info>
                                                {t('you_are')}
                                            </Message>
                                        </Conditional>
                                        <List>
                                            <List.Item>
                                                <Conditional
                                                    visible={
                                                        !!this.props
                                                            .selectedInstance
                                                            .registered
                                                    }
                                                >
                                                    <Button
                                                        fluid
                                                        as={Link}
                                                        to={`/user/course/${this.props.selectedInstance.id}`}
                                                    >
                                                        {t('coursepage_button')}
                                                    </Button>
                                                </Conditional>
                                            </List.Item>
                                            <List.Item>
                                                <Button
                                                    fluid
                                                    as={Link}
                                                    to={`/courses/matrix/${this.props.selectedInstance.id}`}
                                                    color="blue"
                                                    basic
                                                    content={t('course_matrix')}
                                                />
                                            </List.Item>
                                            <Conditional
                                                visible={
                                                    this.props.selectedInstance
                                                        .active
                                                }
                                            >
                                                <List.Item>
                                                    <RegisterForm
                                                        registered={
                                                            this.props
                                                                .selectedInstance
                                                                .registered
                                                        }
                                                        courseId={
                                                            this.props
                                                                .selectedCourse
                                                                .id
                                                        }
                                                        instanceId={
                                                            this.props
                                                                .selectedInstance
                                                                .id
                                                        }
                                                    />
                                                </List.Item>
                                            </Conditional>
                                        </List>
                                    </div>
                                ) : (
                                    <Message info>
                                        {t('instance_prompt')}
                                    </Message>
                                )}
                            </div>
                        ) : (
                            <Message info>{t('course_prompt')}</Message>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

CourseListPage.propTypes = {
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
            active: PropTypes.bool.isRequired,
        })
    ).isRequired,
    getAllCourses: PropTypes.func.isRequired,
    getInstancesOfCourse: PropTypes.func.isRequired,
    getTemplateInstances: PropTypes.func.isRequired,
    selectedCourse: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }),
    selectedInstance: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        registered: PropTypes.string,
    }),
    selectCourse: PropTypes.func.isRequired,
    selectInstance: PropTypes.func.isRequired,
    location: PropTypes.shape({
        query_params: PropTypes.objectOf(PropTypes.string).isRequired,
    }).isRequired,
    user: PropTypes.shape({
        role: PropTypes.string,
        id: PropTypes.number,
    }).isRequired,
    translate: PropTypes.func.isRequired,
}

CourseListPage.defaultProps = {
    selectedCourse: null,
    selectedInstance: null,
}

const mapStateToProps = (state, ownProps) => ({
    user: state.user,
    userCourses: state.courses,
    courses: state.listCourses.courses,
    instances: state.listCourses.instances,
    selectedCourse: state.listCourses.selectedCourse,
    selectedInstance: state.listCourses.selectedInstance,
    location: parseQueryParams(ownProps.location),
})

const mapDispatchToProps = (dispatch) => ({
    getAllCourses: asyncAction(getAllCourses, dispatch),
    getInstancesOfCourse: asyncAction(getInstancesOfCourse, dispatch),
    getTemplateInstances: asyncAction(getTemplateInstances, dispatch),
    selectCourse: selectCourse(dispatch),
    selectInstance: selectInstance(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseListPage)
