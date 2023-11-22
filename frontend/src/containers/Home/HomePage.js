import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

export const HomePage = (props) => {
  const { t, i18n } = useTranslation('translation')

  return (
    <Grid container>
      <Grid.Row>
        <Grid.Column>
          <Header as="h1">{t('home.homepage.header1')}</Header>
          <p>
            <span>{t('home.homepage.introduction')} </span>
            <a href="mailto:grp-toska@helsinki.fi">{t('home.homepage.developers')}</a>.
          </p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as="h2" content={t('home.homepage.student_header')} />
          <p>{t('home.homepage.student_info')}</p>

          <Header as="h2" content={t('home.homepage.teacher_header')} />
          <p>{t('home.homepage.teacher_info')}</p>

          <Header as="h2" content={t('home.homepage.background_header')} />
          <p>
            <span>{t('home.homepage.background_info_1_1')}</span>
            <a href={t('home.homepage.background_link_1_href')}>{t('home.homepage.background_link_1')}</a>
            <span>{t('home.homepage.background_info_1_2')}</span>
          </p>
          <p>
            <span>{t('home.homepage.background_info_2_1')}</span>
            <a href={t('home.homepage.background_link_2_1')}>(HYPE)</a>
            <span>{t('home.homepage.background_info_2_2')}</span>
            <a href={t('home.homepage.background_link_2_2_href')}>{t('home.homepage.background_link_2_2')}</a>.
            <span>{t('home.homepage.background_info_2_3')}</span>
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
/*
HomePage.propTypes = {
  t: PropTypes.func.isRequired
}*/
export default HomePage
