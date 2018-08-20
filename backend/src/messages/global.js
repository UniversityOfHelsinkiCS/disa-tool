const messages = {
  create: {
    eng: '"Rekisteröityminen onnistui." englanniksi.',
    fin: 'Rekisteröityminen onnistui.',
    swe: '"Rekisteröityminen onnistui." ruotsiksi.'
  },
  delete: {
    eng: '"Rekisteröityminen purettu onnistuneesti." englanniksi.',
    fin: 'Rekisteröityminen purettu onnistuneesti.',
    swe: '"Rekisteröityminen purettu onnistuneesti." ruotsiksi.'
  },
  update: {
    eng: 'Role updated successfully!',
    fin: 'Käyttäjän rooli päivitetty onnistuneesti!',
    swe: 'Käyttäjän rooli päivitetty onnistuneesti! - ruotsiksi'
  }
}

const errors = {
  privilege: {
    toast: true,
    eng: '"Pääsy estetty." englanniksi.',
    fin: 'Pääsy estetty.',
    swe: '"Pääsy estetty." ruotsiksi.'
  },
  notfound: {
    toast: false,
    eng: '"Haettua tietuetta ei löytynyt." englanniksi.',
    fin: 'Haettua tietuetta ei löytynyt.',
    swe: '"Haettua tietuetta ei löytynyt." ruotsiksi.'
  },
  unexpected: {
    toast: false,
    eng: '"Yllättävä virhe tapahtui." englanniksi.',
    fin: 'Yllättävä virhe tapahtui.',
    swe: '"Yllättävä virhe tapahtui." ruotsiksi.'
  }
}

module.exports = {
  messages,
  errors
}
