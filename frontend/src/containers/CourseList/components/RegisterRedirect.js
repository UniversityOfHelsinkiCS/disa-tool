import React from 'react'
import PropTypes from 'prop-types'
import { redirect } from 'react-router-dom'

import parseQueryParams from '../../../utils/parseQueryParams'

const RegisterRedirect = (props) => {
    const queryParams = parseQueryParams(props.location).query_params

    return redirect(
        `/courses?course=${queryParams.course}&instance=${queryParams.instance}`
    )
}

RegisterRedirect.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string.isRequired,
        length: PropTypes.number.isRequired,
    }).isRequired,
}

export default RegisterRedirect
