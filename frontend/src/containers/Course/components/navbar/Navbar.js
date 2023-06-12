import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export const Navbar = (props) => {
    const translate = (id) => props.t(`Course.navbar.Navbar.${id}`)
    const { t } = useTranslation()
    const pathName = useLocation().pathname
    return (
        <nav className="Navbar">
            <Menu pointing>
                <Menu.Item
                    className="matrixLink"
                    as={Link}
                    to={`${props.matchUrl}/matrix`}
                    active={pathName.includes('matrix')}
                >
                    <span>{t('matrix')}</span>
                </Menu.Item>
                <Menu.Item
                    className="tasksLink"
                    as={Link}
                    to={`${props.matchUrl}/tasks`}
                    active={pathName.includes('tasks')}
                >
                    <span>{t('tasks')}</span>
                </Menu.Item>
                <Menu.Item
                    className="typesLink"
                    as={Link}
                    to={`${props.matchUrl}/types`}
                    active={pathName.includes('types')}
                >
                    <span>{t('types')}</span>
                </Menu.Item>
                <Menu.Item
                    className="gradesLink"
                    as={Link}
                    to={`${props.matchUrl}/grades`}
                    active={pathName.includes('grades')}
                >
                    <span>{t('grades')}</span>
                </Menu.Item>
            </Menu>
        </nav>
    )
}

Navbar.propTypes = {
    matchUrl: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
}

export default Navbar
