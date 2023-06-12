import React from 'react'
import { Button, Popup } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const InfoBox = ({
    translationid,
    buttonProps,
    popupProps,
    user,
    courseInstance,
    useCourseRole,
}) => {
    const { t } = useTranslation()

    const isTeacher = useCourseRole
        ? // eslint-disable-next-line react/prop-types
          courseInstance.courseRole === 'TEACHER'
        : user.role === 'TEACHER'
    const isAdmin = user.role === 'ADMIN'
    const isStudent = !isTeacher && !isAdmin

    const translateidStudent = `InfoBox.${translationid}.Student`
    const translateidTeacher = `InfoBox.${translationid}.Teacher`
    const textStudent = t(translateidStudent, null, {
        renderInnerHtml: false,
    })
    const textTeacher = t(translateidTeacher, null, {
        renderInnerHtml: false,
    })

    let text = isStudent ? textStudent : textTeacher

    if (!isAdmin) {
        if (text.match('missing translation')) return null
    } else {
        text = `<span style="color: gray;">${translateidStudent}</span><br />${textStudent}<br /><br /><span style="color: gray;">${translateidTeacher}</span><br />${textTeacher}`
    }

    return (
        <Popup
            wide="very"
            position="left center"
            trigger={<Button circular icon="info" {...buttonProps} />}
            content={<ReactMarkdown source={text} escapeHtml={false} />}
            {...popupProps}
        />
    )
}

InfoBox.propTypes = {
    translate: PropTypes.func.isRequired,
    translationid: PropTypes.string.isRequired,
    buttonProps: PropTypes.shape({}),
    popupProps: PropTypes.shape({}),
    courseInstance: PropTypes.shape({}),
    user: PropTypes.shape({
        role: PropTypes.string,
    }).isRequired,
    translateFunc: PropTypes.func,
    useCourseRole: PropTypes.bool,
}

InfoBox.defaultProps = {
    buttonProps: {},
    popupProps: {},
    courseInstance: {
        courseRole: '',
    },
    translateFunc: null,
    useCourseRole: false,
}

const mapStatetoProps = (state) => ({
    user: state.user,
    courseInstance: state.instance,
})

export default connect(mapStatetoProps)(InfoBox)
