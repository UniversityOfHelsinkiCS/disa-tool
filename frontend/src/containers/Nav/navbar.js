import React, { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Dropdown, Input } from 'semantic-ui-react'
import { func, shape, number } from 'prop-types'
import { withLocalize } from 'react-localize-redux'
import axios from 'axios'

import { logoutAction } from '../../actions/actions'
import { getLanguage, saveLanguage } from '../../utils/utils'

const languageOptions = [
  { key: 'fin', value: 'fin', text: 'Suomi' },
  { key: 'swe', value: 'swe', text: 'Svenska', disabled: true },
  { key: 'eng', value: 'eng', text: 'English' }
]

const Nav = (props) => {

    const [state, setState] = useState({activeItem: 'home',language: 'fin'})
    

    useEffect(() => {
      const language = getLanguage()
      const path = window.location.pathname.split('/')
      if (path.length > 1 && path[1].length > 0) {
         setState({ activeItem: path[1] })
      }
      if (language) {
        setState({ language })
      }
    })

  const handleClick = (e, { name }) => {
    if (name === 'logout') {
      props.dispatchLogout(translate('logout_success'))
    }
    setState({ activeItem: name })
  }

  const changeLanguage = async (e, { value }) => {
    setState({ language: value })
    saveLanguage(state.language)
    props.setActiveLanguage(state.language)
    window.location.reload()
  }

  const translate = id => props.translate(`Nav.navbar.${id}`)

  const logout = async () => {
    const returnUrl = window.location.origin
    const response = await axios.delete('/api/logout/shibboleth', { data: { returnUrl } })
    window.location = response.data.logoutUrl
  }

  const handleFakeUser = ({ target }) => {
    window.localStorage.setItem('fakeShibbo', target.value)
  }


    const { activeItem, language } = state
    return (
      <nav>
        <Menu tabular>
          <Menu.Item
            header
            as={Link}
            to="/"
            name="home"
            active={activeItem === 'home'}
            onClick={handleClick}
          >
            {translate('home')}
          </Menu.Item>
          {props.user.id ?
            <Menu.Item
              as={Link}
              to="/user"
              name="user"
              active={activeItem === 'user'}
              onClick={handleClick}
            >
              {translate('user')}
            </Menu.Item> : undefined}
          <Menu.Item
            as={Link}
            to="/courses"
            name="courses"
            active={activeItem === 'courses'}
            onClick={handleClick}
          >
            {translate('courses')}
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Dropdown
                options={languageOptions}
                value={language}
                onChange={changeLanguage}
              />
            </Menu.Item>
            {props.user.role === 'ADMIN' ?
              <Menu.Item
                as={Link}
                to="/admin"
                name="admin"
                active={activeItem === 'admin'}
                onClick={handleClick}
              >
                {translate('admin')}
              </Menu.Item>
              :
              null
            }
            <Menu.Item
              name="logout"
              active={activeItem === 'logout'}
              onClick={logout}
            >
              {translate('logout')}
            </Menu.Item> :
            {process.env.NODE_ENV === 'development' ?
              <Menu.Item >
                <Input
                  defaultValue={window.localStorage.getItem('fakeShibbo')}
                  onChange={handleFakeUser}
                />
              </Menu.Item> : null}
          </Menu.Menu>
        </Menu>
      </nav >
    )
  
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  dispatchLogout: () =>
    dispatch(logoutAction())
})

Nav.propTypes = {
  dispatchLogout: func.isRequired,
  user: shape({ id: number }).isRequired,
  translate: func.isRequired,
  setActiveLanguage: func.isRequired
}

export default withLocalize(connect(mapStateToProps, { dispatchLogout: logoutAction })(Nav))
