import React, { useState } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
    Container,
    Form,
    Button,
    Icon,
    Loader,
    Grid,
    Accordion,
    Pagination,
} from 'semantic-ui-react'
import asyncAction from '../../utils/asyncAction'

import { adminGetUsers, adminChangeGlobalRole } from './actions/persons'
import {
    adminChangeCourseRole,
    removeCoursePerson,
} from './actions/coursePersons'
import RoleList from './components/RoleList'

const AdminPage = (props) => {
    const [getAll, setGetAll] = useState(false)
    const [loading, setLoading] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const [activePage, setActivePage] = useState(1)
    const [crash, setCrash] = useState(false)
    const { t } = useTranslation()

    const chaosMonkey = () => {
        setCrash(true)
    }

    const handleSubmit = async (event) => {
        const studentInfo = event.target.userInfo.value
        if (!getAll && studentInfo === '') {
            await props.dispatchToast({
                type: '',
                payload: {
                    toast: 'Syötä hakuparametri tai valitse kaikki',
                    type: 'error',
                },
            })
            return
        }
        setLoading(true)
        await props.adminGetUsers({
            studentInfo: getAll ? undefined : studentInfo,
            getAll: getAll,
        })
        setActivePage(1)
        setLoading(false)
    }

    const handleClick = (e, { titleProps, activeIndex }) => {
        const { index } = titleProps
        const newIndex = activeIndex === index ? -1 : index
        setActiveIndex(newIndex)
    }

    const handlePaginationChange = (e, { activePage }) =>
        setActivePage(activePage)

    const changeRole = async (personId, courseInstanceId, role) => {
        if (courseInstanceId) {
            await props.adminChangeCourseRole({
                personId,
                courseInstanceId,
                role,
            })
        } else {
            await props.adminChangeGlobalRole({ personId, role })
        }
    }

    const deleteRole = (personId, courseInstanceId) => () =>
        props.removeCoursePerson({
            id: personId,
            course_instance_id: courseInstanceId,
        })

    const translate = (id) => t(`Admin.AdminPage.${id}`)

    if (crash) throw new Error('Ooh aah, error')
    return (
        <Container style={{ paddingTop: '100px' }}>
            <Grid divided="vertically">
                <Grid.Row columns={2}>
                    <Grid.Column width={8}>
                        <Form onSubmit={handleSubmit}>
                            <h2>{t('header')}</h2>

                            <Form.Field width={8}>
                                <input
                                    name="userInfo"
                                    disabled={getAll}
                                    placeholder={`(${t('search_placeholder')})`}
                                />
                            </Form.Field>
                            <Form.Checkbox
                                name="getAll"
                                onChange={() => setGetAll((prev) => !prev)}
                                label={t('get_all')}
                            />
                            <Button>
                                <Icon name="search" />
                                {t('search_button')}
                            </Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={10}>
                        {loading && <Loader active />}
                        {props.users.length > 0 && (
                            <Accordion fluid styled>
                                {props.users
                                    .slice(
                                        (activePage - 1) * 20,
                                        activePage * 20
                                    )
                                    .map((u) => (
                                        <div key={u.id}>
                                            <Accordion.Title
                                                active={activeIndex === u.id}
                                                index={u.id}
                                                onClick={handleClick}
                                            >
                                                <Icon name="dropdown" />
                                                {u.name}
                                            </Accordion.Title>
                                            <Accordion.Content
                                                active={activeIndex === u.id}
                                            >
                                                <RoleList
                                                    translate={translate}
                                                    user={u}
                                                    deleteRole={deleteRole}
                                                    changeRole={changeRole}
                                                />
                                            </Accordion.Content>
                                        </div>
                                    ))}
                            </Accordion>
                        )}
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={5} />
                    <Grid.Column width={8}>
                        {props.users.length > 20 ? (
                            <Pagination
                                activePage={activePage}
                                onPageChange={handlePaginationChange}
                                totalPages={Math.ceil(props.users.length / 20)}
                            />
                        ) : null}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Button content="Do not press!" color="red" onClick={chaosMonkey} />
        </Container>
    )
}

AdminPage.propTypes = {
    dispatchToast: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    adminGetUsers: PropTypes.func.isRequired,
    adminChangeCourseRole: PropTypes.func.isRequired,
    adminChangeGlobalRole: PropTypes.func.isRequired,
    removeCoursePerson: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    users: state.admin.users,
})

const mapDispatchToProps = (dispatch) => ({
    adminGetUsers: asyncAction(adminGetUsers, dispatch),
    adminChangeCourseRole: asyncAction(adminChangeCourseRole, dispatch),
    adminChangeGlobalRole: asyncAction(adminChangeGlobalRole, dispatch),
    dispatchToast: (data) => dispatch(data),
    removeCoursePerson: asyncAction(removeCoursePerson, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
