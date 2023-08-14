import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect,useDispatch, useSelector } from 'react-redux'
import { Menu, Dropdown, Input } from 'semantic-ui-react'
import { setActiveLanguage } from 'react-localize-redux'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

import { logoutAction } from '../../actions/actions'
import { getLanguage, saveLanguage } from '../../utils/utils'


const languageOptions = [
  { key: 'fin', value: 'fin', text: 'Suomi' },
  { key: 'swe', value: 'swe', text: 'Svenska', disabled: true },
  { key: 'eng', value: 'eng', text: 'English' }
]

const Nav = (props) => {
  const [activeItem, setActiveItem] = useState('home')
  const [language, setLanguage] = useState("fin")
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'nav.navbar',
})
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const asyncFunc = async () => {
      const language = getLanguage()
    const path = window.location.pathname.split('/')
    if (path.length > 1 && path[1].length > 0) {
      setActiveItem(path[1])
    }
    if (language) {
      setLanguage(language)
      let languageSplit = language === "fin" ? "fi" : language
      if(languageSplit === "eng") {
        languageSplit = "en"
      }
    i18n.changeLanguage(languageSplit)
    }
  }
    asyncFunc()
  }, [])

 const handleClick = (e, { name }) => {
    if (name === 'logout') {
      dispatch(logoutAction(t('logout_success')))
    }
    setActiveItem(name)
  }

  const changeLanguage = async (e, { value }) => {
    setLanguage(value)
    saveLanguage(value)
    setActiveItem(value)
    let languageSplit = value === "fin" ? "fi" : value
    if(languageSplit === "eng") {
      languageSplit = "en"
    }
    i18n.changeLanguage(languageSplit)
  }

  const logout = async () => {
    const returnUrl = window.location.origin
    const response = await axios.delete('/api/logout/shibboleth', { data: { returnUrl } })
    window.location = response.data.logoutUrl
  }

  const handleFakeUser = ({ target }) => {
    window.localStorage.setItem('fakeShibbo', target.value)
  }
    return (
      <nav data-testid="navbar">
        <Menu tabular>
          <Menu.Item
            header
            as={Link}
            to="/"
            name="home"
            active={activeItem === 'home'}
            onClick={handleClick}
          >
            {t('home')}
          </Menu.Item>
          {user.id ?
            <Menu.Item
              as={Link}
              to="/user"
              name="user"
              active={activeItem === 'user'}
              onClick={handleClick}
            >
              {t('user')}
            </Menu.Item> : undefined}
          <Menu.Item
            as={Link}
            to="/courses"
            name="courses"
            active={activeItem === 'courses'}
            onClick={handleClick}
          >
            {t('courses')}
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Dropdown
                options={languageOptions}
                value={language}
                onChange={changeLanguage}
              />
            </Menu.Item>
            {user.role === 'ADMIN' ?
              <Menu.Item
                as={Link}
                to="/admin"
                name="admin"
                active={activeItem === 'admin'}
                onClick={handleClick}
              >
                {t('admin')}
              </Menu.Item>
              :
              null
            }
            <Menu.Item
              name="logout"
              active={activeItem === 'logout'}
              onClick={logout}
            >
              {t('logout')}
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
/*
const mapStateToProps = state => ({
  user: state.user
})
*/
/*
Nav.propTypes = {
  dispatchLogout: func.isRequired,
 // user: shape({ id: number }).isRequired,
  translate: func.isRequired,
  setActiveLanguage: func.isRequired
}
*/
export default withRouter(connect()(Nav))
