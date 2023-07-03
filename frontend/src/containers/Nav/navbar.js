import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
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

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'home',
      language: 'fin'
    }
  }

  componentDidMount = async () => {
    const language = getLanguage()
    const path = await window.location.pathname.split('/')
    if (path.length > 1 && path[1].length > 0) {
      await this.setState({ activeItem: path[1] })
    }
    if (language) {
      this.setState({ language })
    }
  }

  componentDidUpdate = async () => {
    const path = await window.location.pathname.split('/')
    const item = path[1]
    if (item && item !== this.state.activeItem) {
      await this.setState({ activeItem: item })
    }
  }

  handleClick = (e, { name }) => {
    if (name === 'logout') {
      this.props.dispatchLogout(this.translate('logout_success'))
    }
    this.setState({ activeItem: name })
  }

  changeLanguage = async (e, { value }) => {
    await this.setState({ language: value })
    saveLanguage(this.state.language)
    this.props.setActiveLanguage(this.state.language)
    window.location.reload()
  }

  translate = id => this.props.translate(`Nav.navbar.${id}`)

  logout = async () => {
    const returnUrl = window.location.origin
    const response = await axios.delete('/api/logout/shibboleth', { data: { returnUrl } })
    window.location = response.data.logoutUrl
  }

  handleFakeUser = ({ target }) => {
    window.localStorage.setItem('fakeShibbo', target.value)
  }

  render() {
    console.log('render nav: ', process.env.NODE_ENV)
    const { activeItem, language } = this.state
    return (
      <nav>
        <Menu tabular>
          <Menu.Item
            header
            as={Link}
            to="/"
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleClick}
          >
            {this.translate('home')}
          </Menu.Item>
          {this.props.user.id ?
            <Menu.Item
              as={Link}
              to="/user"
              name="user"
              active={activeItem === 'user'}
              onClick={this.handleClick}
            >
              {this.translate('user')}
            </Menu.Item> : undefined}
          <Menu.Item
            as={Link}
            to="/courses"
            name="courses"
            active={activeItem === 'courses'}
            onClick={this.handleClick}
          >
            {this.translate('courses')}
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Dropdown
                options={languageOptions}
                value={language}
                onChange={this.changeLanguage}
              />
            </Menu.Item>
            {this.props.user.role === 'ADMIN' ?
              <Menu.Item
                as={Link}
                to="/admin"
                name="admin"
                active={activeItem === 'admin'}
                onClick={this.handleClick}
              >
                {this.translate('admin')}
              </Menu.Item>
              :
              null
            }
            <Menu.Item
              name="logout"
              active={activeItem === 'logout'}
              onClick={this.logout}
            >
              {this.translate('logout')}
            </Menu.Item> :
            {process.env.NODE_ENV === 'development' ?
              <Menu.Item >
                <Input
                  defaultValue={window.localStorage.getItem('fakeShibbo')}
                  onChange={this.handleFakeUser}
                />
              </Menu.Item> : null}
          </Menu.Menu>
        </Menu>
      </nav >
    )
  }
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

export default withLocalize(withRouter(connect(mapStateToProps, { dispatchLogout: logoutAction })(Nav)))
