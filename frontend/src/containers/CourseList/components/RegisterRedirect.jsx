import React from 'react'
import { withRouter, Redirect,useLocation } from 'react-router-dom'
import parseQueryParams from '../../../utils/parseQueryParams'

const RegisterRedirect = (props) => {
  const {search} = useLocation()

  const queryParams = parseQueryParams(search).query_params

  return (<Redirect
    to={`/courses?course=${queryParams.course}&instance=${queryParams.instance}`}
  />)
}
/*
RegisterRedirect.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired
  }).isRequired
}
*/
export default withRouter(RegisterRedirect)
