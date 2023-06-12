import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid, Header } from 'semantic-ui-react'

export const HomePage = (props) => {
    const translate = (id) => props.t(`Home.HomePage.${id}`)

    return (
        <Grid container>
            <Grid.Row>
                <Grid.Column>
                    <Header as="h1">{t('header1')}</Header>
                    <p>
                        <span>{t('introduction')} </span>
                        <a href="mailto:grp-toska@helsinki.fi">
                            {t('developers')}
                        </a>
                        .
                    </p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Header as="h2" content={t('student_header')} />
                    <p>{t('student_info')}</p>

                    <Header as="h2" content={t('teacher_header')} />
                    <p>{t('teacher_info')}</p>

                    <Header as="h2" content={t('background_header')} />
                    <p>
                        <span>{t('background_info_1_1')}</span>
                        <a href={t('background_link_1_href')}>
                            {t('background_link_1')}
                        </a>
                        <span>{t('background_info_1_2')}</span>
                    </p>
                    <p>
                        <span>{t('background_info_2_1')}</span>
                        <a href={t('background_link_2_1')}>(HYPE)</a>
                        <span>{t('background_info_2_2')}</span>
                        <a href={t('background_link_2_2_href')}>
                            {t('background_link_2_2')}
                        </a>
                        .<span>{t('background_info_2_3')}</span>
                    </p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

HomePage.propTypes = {
    translate: PropTypes.func.isRequired,
}

export default HomePage
