const { syncDatabase } = require('../connection')
const { Category, Course, CourseInstance, Objective, SkillLevel } = require('../models')
/* eslint-disable */
const objectives = [
  {
    eng_name: 'Osaan ratkaista ensimmäisen asteen yhtälöitä ja yhtälöpareja',
    fin_name: 'Osaan ratkaista ensimmäisen asteen yhtälöitä ja yhtälöpareja',
    swe_name: 'Osaan ratkaista ensimmäisen asteen yhtälöitä ja yhtälöpareja',
    category_id: 1,
    course_instance_id: 1,
    skill_level_id: 1
  },
  {
    eng_name: 'Osaan muokata yhtälöryhmää vastaavan matriisin alkeisrivitoimituksilla redusoiduksi porrasmatriisiksi',
    fin_name: 'Osaan muokata yhtälöryhmää vastaavan matriisin alkeisrivitoimituksilla redusoiduksi porrasmatriisiksi',
    swe_name: 'Osaan muokata yhtälöryhmää vastaavan matriisin alkeisrivitoimituksilla redusoiduksi porrasmatriisiksi',
    category_id: 1,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Osaan päätellä yhtälöryhmän ratkaisut redusoidusta porrasmatriisista',
    fin_name: 'Osaan päätellä yhtälöryhmän ratkaisut redusoidusta porrasmatriisista',
    swe_name: 'Osaan päätellä yhtälöryhmän ratkaisut redusoidusta porrasmatriisista',
    category_id: 1,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Tunnen lineaarisen yhtälöryhmän ratkaisujen lukumäärään liittyvät rajoitukset',
    fin_name: 'Tunnen lineaarisen yhtälöryhmän ratkaisujen lukumäärään liittyvät rajoitukset',
    swe_name: 'Tunnen lineaarisen yhtälöryhmän ratkaisujen lukumäärään liittyvät rajoitukset',
    category_id: 1,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan kirjoittaa lineaarisen yhtälöryhmän matriisiyhtälönä',
    fin_name: 'Osaan kirjoittaa lineaarisen yhtälöryhmän matriisiyhtälönä',
    swe_name: 'Osaan kirjoittaa lineaarisen yhtälöryhmän matriisiyhtälönä',
    category_id: 1,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan käyttää yhtälöryhmiä käytännön ongelmien mallintamiseen',
    fin_name: 'Osaan käyttää yhtälöryhmiä käytännön ongelmien mallintamiseen',
    swe_name: 'Osaan käyttää yhtälöryhmiä käytännön ongelmien mallintamiseen',
    category_id: 1,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Tunnen yhtälönratkaisun periaatteet ja tiedän, että alkeisrivitoimitukset säilyttävät yhtälöryhmien yhtäpitävyyden',
    fin_name: 'Tunnen yhtälönratkaisun periaatteet ja tiedän, että alkeisrivitoimitukset säilyttävät yhtälöryhmien yhtäpitävyyden',
    swe_name: 'Tunnen yhtälönratkaisun periaatteet ja tiedän, että alkeisrivitoimitukset säilyttävät yhtälöryhmien yhtäpitävyyden',
    category_id: 1,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Tunnen yhtälöryhmän kerroinmatriisin kääntyvyyden yhteyden yhtälöryhmän ratkaisujen lukumäärään',
    fin_name: 'Tunnen yhtälöryhmän kerroinmatriisin kääntyvyyden yhteyden yhtälöryhmän ratkaisujen lukumäärään',
    swe_name: 'Tunnen yhtälöryhmän kerroinmatriisin kääntyvyyden yhteyden yhtälöryhmän ratkaisujen lukumäärään',
    category_id: 1,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Osaan laskea tason vektoreita yhteen ja kertoa niitä luvuilla',
    fin_name: 'Osaan laskea tason vektoreita yhteen ja kertoa niitä luvuilla',
    swe_name: 'Osaan laskea tason vektoreita yhteen ja kertoa niitä luvuilla',
    category_id: 2,
    course_instance_id: 1,
    skill_level_id: 1
  },
  {
    eng_name: 'Tunnen vektorin määritelmän lukujonona ja osaan havainnollistaa tason vektoreita pisteinä tai suuntajanoina',
    fin_name: 'Tunnen vektorin määritelmän lukujonona ja osaan havainnollistaa tason vektoreita pisteinä tai suuntajanoina',
    swe_name: 'Tunnen vektorin määritelmän lukujonona ja osaan havainnollistaa tason vektoreita pisteinä tai suuntajanoina',
    category_id: 2,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Osaan laskea yhteen ja vähentää sekä kertoa skalaareilla avaruude R^n vektoreita',
    fin_name: 'Osaan laskea yhteen ja vähentää sekä kertoa skalaareilla avaruude R^n vektoreita',
    swe_name: 'Osaan laskea yhteen ja vähentää sekä kertoa skalaareilla avaruude R^n vektoreita',
    category_id: 2,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Tiedän, miltä yhden tai kahden vektorin virittämä aliavaruus näyttää',
    fin_name: 'Tiedän, miltä yhden tai kahden vektorin virittämä aliavaruus näyttää',
    swe_name: 'Tiedän, miltä yhden tai kahden vektorin virittämä aliavaruus näyttää',
    category_id: 2,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Osaan kirjoittaa vektoreiden virittämän aliavaruuden joukkomerkintää käyttäen ja luetella kyseisen joukon alkioita',
    fin_name: 'Osaan kirjoittaa vektoreiden virittämän aliavaruuden joukkomerkintää käyttäen ja luetella kyseisen joukon alkioita',
    swe_name: 'Osaan kirjoittaa vektoreiden virittämän aliavaruuden joukkomerkintää käyttäen ja luetella kyseisen joukon alkioita',
    category_id: 2,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Tiedän, miltä avaruuden R^3 aliavaruudet näyttävät',
    fin_name: 'Tiedän, miltä avaruuden R^3 aliavaruudet näyttävät',
    swe_name: 'Tiedän, miltä avaruuden R^3 aliavaruudet näyttävät',
    category_id: 2,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Tiedän, mitkä ovat suoran ja tason dimensiot',
    fin_name: 'Tiedän, mitkä ovat suoran ja tason dimensiot',
    swe_name: 'Tiedän, mitkä ovat suoran ja tason dimensiot',
    category_id: 2,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan muodostaa vektorien virittämälle aliavaruudelle kannan',
    fin_name: 'Osaan muodostaa vektorien virittämälle aliavaruudelle kannan',
    swe_name: 'Osaan muodostaa vektorien virittämälle aliavaruudelle kannan',
    category_id: 2,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Osaan selvittää vektorien virittämän aliavaruuden dimension',
    fin_name: 'Osaan selvittää vektorien virittämän aliavaruuden dimension',
    swe_name: 'Osaan selvittää vektorien virittämän aliavaruuden dimension',
    category_id: 2,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Osaan selvittää, onko vektori toisten vektorien lineaarikombinaatio',
    fin_name: 'Osaan selvittää, onko vektori toisten vektorien lineaarikombinaatio',
    swe_name: 'Osaan selvittää, onko vektori toisten vektorien lineaarikombinaatio',
    category_id: 3,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Osaan muodostaa yhtälön, jota tarvitaan sen tutkimisessa, virittävätkö annetut vektorit avaruuden',
    fin_name: 'Osaan muodostaa yhtälön, jota tarvitaan sen tutkimisessa, virittävätkö annetut vektorit avaruuden',
    swe_name: 'Osaan muodostaa yhtälön, jota tarvitaan sen tutkimisessa, virittävätkö annetut vektorit avaruuden',
    category_id: 3,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Osaan muodostaa yhtälön, jota tarvitaan vektorijonon vapauden tutkimisessa',
    fin_name: 'Osaan muodostaa yhtälön, jota tarvitaan vektorijonon vapauden tutkimisessa',
    swe_name: 'Osaan muodostaa yhtälön, jota tarvitaan vektorijonon vapauden tutkimisessa',
    category_id: 3,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Osaan soveltaa yhtälöryhmän ratkaisujen lukumäärään liittyvää päättelyä sen tutkimiseen, virittävätkö vektorit avaruuden',
    fin_name: 'Osaan soveltaa yhtälöryhmän ratkaisujen lukumäärään liittyvää päättelyä sen tutkimiseen, virittävätkö vektorit avaruuden',
    swe_name: 'Osaan soveltaa yhtälöryhmän ratkaisujen lukumäärään liittyvää päättelyä sen tutkimiseen, virittävätkö vektorit avaruuden',
    category_id: 3,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan soveltaa yhtälöryhmän ratkaisujen lukumäärään liittyvää päättelyä vektorijonon vapauden tutkimiseen',
    fin_name: 'Osaan soveltaa yhtälöryhmän ratkaisujen lukumäärään liittyvää päättelyä vektorijonon vapauden tutkimiseen',
    swe_name: 'Osaan soveltaa yhtälöryhmän ratkaisujen lukumäärään liittyvää päättelyä vektorijonon vapauden tutkimiseen',
    category_id: 3,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan selvittää, onko vektorijono kanta',
    fin_name: 'Osaan selvittää, onko vektorijono kanta',
    swe_name: 'Osaan selvittää, onko vektorijono kanta',
    category_id: 3,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan laskea vektorin koordinaatit annetun kannan suhteen sekä selvittää vektorin sen koordinaattien perusteella',
    fin_name: 'Osaan laskea vektorin koordinaatit annetun kannan suhteen sekä selvittää vektorin sen koordinaattien perusteella',
    swe_name: 'Osaan laskea vektorin koordinaatit annetun kannan suhteen sekä selvittää vektorin sen koordinaattien perusteella',
    category_id: 3,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Tiedän, miten vektorijonon vapaus liittyy vektoreista muodostettavien lineaarikombinaatioiden kertoimien yksikäsitteisyyteen',
    fin_name: 'Tiedän, miten vektorijonon vapaus liittyy vektoreista muodostettavien lineaarikombinaatioiden kertoimien yksikäsitteisyyteen',
    swe_name: 'Tiedän, miten vektorijonon vapaus liittyy vektoreista muodostettavien lineaarikombinaatioiden kertoimien yksikäsitteisyyteen',
    category_id: 3,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Osaan analysoida vektorijonon vapautta tai viritysominaisuuksia myös silloin, kun vektoreiden komponentteja ei ole annettu',
    fin_name: 'Osaan analysoida vektorijonon vapautta tai viritysominaisuuksia myös silloin, kun vektoreiden komponentteja ei ole annettu',
    swe_name: 'Osaan analysoida vektorijonon vapautta tai viritysominaisuuksia myös silloin, kun vektoreiden komponentteja ei ole annettu',
    category_id: 3,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Osaan suorittaa matriisien peruslaskutoimitukset ja tiedän, mitä ovat nolla- ja ykkösmatriisi',
    fin_name: 'Osaan suorittaa matriisien peruslaskutoimitukset ja tiedän, mitä ovat nolla- ja ykkösmatriisi',
    swe_name: 'Osaan suorittaa matriisien peruslaskutoimitukset ja tiedän, mitä ovat nolla- ja ykkösmatriisi',
    category_id: 4,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Osaan käyttää matriisien laskusääntöjä matriiseja sisältävien lausekkeiden sieventämiseen',
    fin_name: 'Osaan käyttää matriisien laskusääntöjä matriiseja sisältävien lausekkeiden sieventämiseen',
    swe_name: 'Osaan käyttää matriisien laskusääntöjä matriiseja sisältävien lausekkeiden sieventämiseen',
    category_id: 4,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Osaan laskea pienen matriisin determinantin',
    fin_name: 'Osaan laskea pienen matriisin determinantin',
    swe_name: 'Osaan laskea pienen matriisin determinantin',
    category_id: 4,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Osaan tarkistaa suoralla laskulla, onko vektori matriisin ominaisvektori',
    fin_name: 'Osaan tarkistaa suoralla laskulla, onko vektori matriisin ominaisvektori',
    swe_name: 'Osaan tarkistaa suoralla laskulla, onko vektori matriisin ominaisvektori',
    category_id: 4,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Tunnen matriisien kertolaskun eroavaisuudet reaalilukujen kertolaskuun verrattuna',
    fin_name: 'Tunnen matriisien kertolaskun eroavaisuudet reaalilukujen kertolaskuun verrattuna',
    swe_name: 'Tunnen matriisien kertolaskun eroavaisuudet reaalilukujen kertolaskuun verrattuna',
    category_id: 4,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan tarkistaa käänteismatriisin määritelmän nojalla, ovatko kaksi annettua matriisia toistensa käänteismatriiseja',
    fin_name: 'Osaan tarkistaa käänteismatriisin määritelmän nojalla, ovatko kaksi annettua matriisia toistensa käänteismatriiseja',
    swe_name: 'Osaan tarkistaa käänteismatriisin määritelmän nojalla, ovatko kaksi annettua matriisia toistensa käänteismatriiseja',
    category_id: 4,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan selvittää determinantin avulla, onko matriisi kääntyvä',
    fin_name: 'Osaan selvittää determinantin avulla, onko matriisi kääntyvä',
    swe_name: 'Osaan selvittää determinantin avulla, onko matriisi kääntyvä',
    category_id: 4,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan hyödyntää determinantin laskusääntöjä',
    fin_name: 'Osaan hyödyntää determinantin laskusääntöjä',
    swe_name: 'Osaan hyödyntää determinantin laskusääntöjä',
    category_id: 4,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan etsiä pienen matriisin ominaisarvot ja -vektorit',
    fin_name: 'Osaan etsiä pienen matriisin ominaisarvot ja -vektorit',
    swe_name: 'Osaan etsiä pienen matriisin ominaisarvot ja -vektorit',
    category_id: 4,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Tunnen ominaisvektorin geometrisen merkityksen ja osaan selvittää kuvasta, onko vektori matriisin ominaisvektori',
    fin_name: 'Tunnen ominaisvektorin geometrisen merkityksen ja osaan selvittää kuvasta, onko vektori matriisin ominaisvektori',
    swe_name: 'Tunnen ominaisvektorin geometrisen merkityksen ja osaan selvittää kuvasta, onko vektori matriisin ominaisvektori',
    category_id: 4,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan selvittää redusoimalla, onko matriisi kääntyvä',
    fin_name: 'Osaan selvittää redusoimalla, onko matriisi kääntyvä',
    swe_name: 'Osaan selvittää redusoimalla, onko matriisi kääntyvä',
    category_id: 4,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan soveltaa matriisikertolaskua ja matriisien ominaisuuksia käytännön ongelmien mallintamiseen',
    fin_name: 'Osaan soveltaa matriisikertolaskua ja matriisien ominaisuuksia käytännön ongelmien mallintamiseen',
    swe_name: 'Osaan soveltaa matriisikertolaskua ja matriisien ominaisuuksia käytännön ongelmien mallintamiseen',
    category_id: 4,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Osaan käyttää käänteismatriisia matriisiyhtälöiden ratkaisemisessa',
    fin_name: 'Osaan käyttää käänteismatriisia matriisiyhtälöiden ratkaisemisessa',
    swe_name: 'Osaan käyttää käänteismatriisia matriisiyhtälöiden ratkaisemisessa',
    category_id: 4,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Tiedän, miten käänteismatriisi liittyy alkeisrivitoimituksiin ja osaan löytää käänteismatriisin niiden avulla, jos sellainen on olemassa',
    fin_name: 'Tiedän, miten käänteismatriisi liittyy alkeisrivitoimituksiin ja osaan löytää käänteismatriisin niiden avulla, jos sellainen on olemassa',
    swe_name: 'Tiedän, miten käänteismatriisi liittyy alkeisrivitoimituksiin ja osaan löytää käänteismatriisin niiden avulla, jos sellainen on olemassa',
    category_id: 4,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Osaan tutkia, onko matriisi diagonalisoituva',
    fin_name: 'Osaan tutkia, onko matriisi diagonalisoituva',
    swe_name: 'Osaan tutkia, onko matriisi diagonalisoituva',
    category_id: 4,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Osaan piirtää suoran, kun sen yhtälö on annettu',
    fin_name: 'Osaan piirtää suoran, kun sen yhtälö on annettu',
    swe_name: 'Osaan piirtää suoran, kun sen yhtälö on annettu',
    category_id: 5,
    course_instance_id: 1,
    skill_level_id: 1
  },
  {
    eng_name: 'Osaan tarkistaa, onko annettu piste suoralla',
    fin_name: 'Osaan tarkistaa, onko annettu piste suoralla',
    swe_name: 'Osaan tarkistaa, onko annettu piste suoralla',
    category_id: 5,
    course_instance_id: 1,
    skill_level_id: 1
  },
  {
    eng_name: 'Osaan laskea tasovektorien pistetulon',
    fin_name: 'Osaan laskea tasovektorien pistetulon',
    swe_name: 'Osaan laskea tasovektorien pistetulon',
    category_id: 5,
    course_instance_id: 1,
    skill_level_id: 1
  },
  {
    eng_name: 'Osaan tutkia, ovatko kaksi vektoria yhdensuuntaiset',
    fin_name: 'Osaan tutkia, ovatko kaksi vektoria yhdensuuntaiset',
    swe_name: 'Osaan tutkia, ovatko kaksi vektoria yhdensuuntaiset',
    category_id: 5,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Tunnen suoran ja tason määritelmät vektorijoukkona ja osaan selvittää, onko annettu vektori suoran tai tason alkio',
    fin_name: 'Tunnen suoran ja tason määritelmät vektorijoukkona ja osaan selvittää, onko annettu vektori suoran tai tason alkio',
    swe_name: 'Tunnen suoran ja tason määritelmät vektorijoukkona ja osaan selvittää, onko annettu vektori suoran tai tason alkio',
    category_id: 5,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Osaan laskea avaruuden R^n vektorien pistetulon',
    fin_name: 'Osaan laskea avaruuden R^n vektorien pistetulon',
    swe_name: 'Osaan laskea avaruuden R^n vektorien pistetulon',
    category_id: 5,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Osaan laskea vektorin normin',
    fin_name: 'Osaan laskea vektorin normin',
    swe_name: 'Osaan laskea vektorin normin',
    category_id: 5,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Osaan tarkistaa pistetulon avulla, ovatko avaruuden R^n vektorit kohtisuorassa',
    fin_name: 'Osaan tarkistaa pistetulon avulla, ovatko avaruuden R^n vektorit kohtisuorassa',
    swe_name: 'Osaan tarkistaa pistetulon avulla, ovatko avaruuden R^n vektorit kohtisuorassa',
    category_id: 5,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Osaan selvittää suoran tai tason, kun on annettu riittävä määrä siihen kuuluvia vektoreita',
    fin_name: 'Osaan selvittää suoran tai tason, kun on annettu riittävä määrä siihen kuuluvia vektoreita',
    swe_name: 'Osaan selvittää suoran tai tason, kun on annettu riittävä määrä siihen kuuluvia vektoreita',
    category_id: 5,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan laskea projektion kaavan avulla',
    fin_name: 'Osaan laskea projektion kaavan avulla',
    swe_name: 'Osaan laskea projektion kaavan avulla',
    category_id: 5,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan määrittää tasovektorin projektion piirtämällä',
    fin_name: 'Osaan määrittää tasovektorin projektion piirtämällä',
    swe_name: 'Osaan määrittää tasovektorin projektion piirtämällä',
    category_id: 5,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan hyödyntää pistetulon laskusääntöjä lausekkeiden sieventämiseen',
    fin_name: 'Osaan hyödyntää pistetulon laskusääntöjä lausekkeiden sieventämiseen',
    swe_name: 'Osaan hyödyntää pistetulon laskusääntöjä lausekkeiden sieventämiseen',
    category_id: 5,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Tunnen pistetulon ja normin välisen yhteyden ja osaan laskea normin pistetulon avulla',
    fin_name: 'Tunnen pistetulon ja normin välisen yhteyden ja osaan laskea normin pistetulon avulla',
    swe_name: 'Tunnen pistetulon ja normin välisen yhteyden ja osaan laskea normin pistetulon avulla',
    category_id: 5,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Osaan selvittää suoran tai tason, kun sen yhtälö (eli normaalimuoto) on annettu',
    fin_name: 'Osaan selvittää suoran tai tason, kun sen yhtälö (eli normaalimuoto) on annettu',
    swe_name: 'Osaan selvittää suoran tai tason, kun sen yhtälö (eli normaalimuoto) on annettu',
    category_id: 5,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Osaan määrittää suoran tai tason normaalimuodon',
    fin_name: 'Osaan määrittää suoran tai tason normaalimuodon',
    swe_name: 'Osaan määrittää suoran tai tason normaalimuodon',
    category_id: 5,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Osaan syöttää annetun koodin ohjelmaan',
    fin_name: 'Osaan syöttää annetun koodin ohjelmaan',
    swe_name: 'Osaan syöttää annetun koodin ohjelmaan',
    category_id: 6,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Osaan tehdä annettuun koodiin pieniä muutoksia halutun lopputuloksen aikaansaamiseksi',
    fin_name: 'Osaan tehdä annettuun koodiin pieniä muutoksia halutun lopputuloksen aikaansaamiseksi',
    swe_name: 'Osaan tehdä annettuun koodiin pieniä muutoksia halutun lopputuloksen aikaansaamiseksi',
    category_id: 6,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Tunnen lineaarialgebraan liittyvät ohjelman peruskomennot',
    fin_name: 'Tunnen lineaarialgebraan liittyvät ohjelman peruskomennot',
    swe_name: 'Tunnen lineaarialgebraan liittyvät ohjelman peruskomennot',
    category_id: 6,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Osaan etsiä tietolähteistä tarvitsemani komennot, jos en muista tai tunne niitä',
    fin_name: 'Osaan etsiä tietolähteistä tarvitsemani komennot, jos en muista tai tunne niitä',
    swe_name: 'Osaan etsiä tietolähteistä tarvitsemani komennot, jos en muista tai tunne niitä',
    category_id: 6,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Käytän vastauksissani kurssin merkintöjä',
    fin_name: 'Käytän vastauksissani kurssin merkintöjä',
    swe_name: 'Käytän vastauksissani kurssin merkintöjä',
    category_id: 7,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Tunnen eron määritelmän, lauseen ja esimerkin välillä',
    fin_name: 'Tunnen eron määritelmän, lauseen ja esimerkin välillä',
    swe_name: 'Tunnen eron määritelmän, lauseen ja esimerkin välillä',
    category_id: 7,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Ymmärrän, että matematiikkaa lukiessa ei voi heti ymmärtää kaikkea, vaan on usein palattava takaisin tai hypättävä vaikeiden kohtien yli',
    fin_name: 'Ymmärrän, että matematiikkaa lukiessa ei voi heti ymmärtää kaikkea, vaan on usein palattava takaisin tai hypättävä vaikeiden kohtien yli',
    swe_name: 'Ymmärrän, että matematiikkaa lukiessa ei voi heti ymmärtää kaikkea, vaan on usein palattava takaisin tai hypättävä vaikeiden kohtien yli',
    category_id: 7,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Kirjoitan vastauksiini kokonaisia ja ymmärrettäviä lauseita, joista ulkopuolinen lukijakin saa selvän',
    fin_name: 'Kirjoitan vastauksiini kokonaisia ja ymmärrettäviä lauseita, joista ulkopuolinen lukijakin saa selvän',
    swe_name: 'Kirjoitan vastauksiini kokonaisia ja ymmärrettäviä lauseita, joista ulkopuolinen lukijakin saa selvän',
    category_id: 7,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Määrittelen todistuksissa käyttämäni muuttujat',
    fin_name: 'Määrittelen todistuksissa käyttämäni muuttujat',
    swe_name: 'Määrittelen todistuksissa käyttämäni muuttujat',
    category_id: 7,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan tarkistaa, että jokin konkreettinen objekti toteuttaa annetun määritelmän',
    fin_name: 'Osaan tarkistaa, että jokin konkreettinen objekti toteuttaa annetun määritelmän',
    swe_name: 'Osaan tarkistaa, että jokin konkreettinen objekti toteuttaa annetun määritelmän',
    category_id: 7,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan käyttää selittävää lukutapaa määritelmien tai todistusten ymmärtämiseksi',
    fin_name: 'Osaan käyttää selittävää lukutapaa määritelmien tai todistusten ymmärtämiseksi',
    swe_name: 'Osaan käyttää selittävää lukutapaa määritelmien tai todistusten ymmärtämiseksi',
    category_id: 7,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Kirjoitan ratkaisuja, jotka sisältävät vain olennaisen, ja käytän matemaattisia symboleita vain tarvittaessa',
    fin_name: 'Kirjoitan ratkaisuja, jotka sisältävät vain olennaisen, ja käytän matemaattisia symboleita vain tarvittaessa',
    swe_name: 'Kirjoitan ratkaisuja, jotka sisältävät vain olennaisen, ja käytän matemaattisia symboleita vain tarvittaessa',
    category_id: 7,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Osaan laatia todistuksia väitteille, jotka koskevat abstrakteja tai yleisiä objekteja',
    fin_name: 'Osaan laatia todistuksia väitteille, jotka koskevat abstrakteja tai yleisiä objekteja',
    swe_name: 'Osaan laatia todistuksia väitteille, jotka koskevat abstrakteja tai yleisiä objekteja',
    category_id: 7,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Pyrin ymmärtämään todistuksia ja käytän kynää ja paperia hankalien välivaiheiden selvittämiseksi',
    fin_name: 'Pyrin ymmärtämään todistuksia ja käytän kynää ja paperia hankalien välivaiheiden selvittämiseksi',
    swe_name: 'Pyrin ymmärtämään todistuksia ja käytän kynää ja paperia hankalien välivaiheiden selvittämiseksi',
    category_id: 7,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Puhun matemaattisista aiheista toisille',
    fin_name: 'Puhun matemaattisista aiheista toisille',
    swe_name: 'Puhun matemaattisista aiheista toisille',
    category_id: 8,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Osaan ilmaista tarvitsevani apua matemaattisen ongelman ratkaisemiseen',
    fin_name: 'Osaan ilmaista tarvitsevani apua matemaattisen ongelman ratkaisemiseen',
    swe_name: 'Osaan ilmaista tarvitsevani apua matemaattisen ongelman ratkaisemiseen',
    category_id: 8,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Käyn matemaattisia keskusteluja, joissa ilmaisen omia ajatuksiani ja kuuntelen toisen ideoita',
    fin_name: 'Käyn matemaattisia keskusteluja, joissa ilmaisen omia ajatuksiani ja kuuntelen toisen ideoita',
    swe_name: 'Käyn matemaattisia keskusteluja, joissa ilmaisen omia ajatuksiani ja kuuntelen toisen ideoita',
    category_id: 8,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Käytän keskustelussa oikeita nimityksiä matemaattisille käsitteille',
    fin_name: 'Käytän keskustelussa oikeita nimityksiä matemaattisille käsitteille',
    swe_name: 'Käytän keskustelussa oikeita nimityksiä matemaattisille käsitteille',
    category_id: 8,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan selittää, mikä kohta matemaattisen ongelman ratkaisemisessa tuottaa minulle vaikeuksia',
    fin_name: 'Osaan selittää, mikä kohta matemaattisen ongelman ratkaisemisessa tuottaa minulle vaikeuksia',
    swe_name: 'Osaan selittää, mikä kohta matemaattisen ongelman ratkaisemisessa tuottaa minulle vaikeuksia',
    category_id: 8,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Kykenen ylläpitämään matemaattista keskustelua, joka hyödyttää molempia osapuolia',
    fin_name: 'Kykenen ylläpitämään matemaattista keskustelua, joka hyödyttää molempia osapuolia',
    swe_name: 'Kykenen ylläpitämään matemaattista keskustelua, joka hyödyttää molempia osapuolia',
    category_id: 8,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Muotoilen täsmällisiä kysymyksiä saadakseni apua matemaattisiin ongelmiin',
    fin_name: 'Muotoilen täsmällisiä kysymyksiä saadakseni apua matemaattisiin ongelmiin',
    swe_name: 'Muotoilen täsmällisiä kysymyksiä saadakseni apua matemaattisiin ongelmiin',
    category_id: 8,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Luen tehtävistäni annetun palautteen ja korjaan tehtäviä palautteen perusteella',
    fin_name: 'Luen tehtävistäni annetun palautteen ja korjaan tehtäviä palautteen perusteella',
    swe_name: 'Luen tehtävistäni annetun palautteen ja korjaan tehtäviä palautteen perusteella',
    category_id: 9,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Annan vertaispalautetta toisten opiskelijoiden töistä',
    fin_name: 'Annan vertaispalautetta toisten opiskelijoiden töistä',
    swe_name: 'Annan vertaispalautetta toisten opiskelijoiden töistä',
    category_id: 9,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'En ota saamaani palautetta henkilökohtaisesti, vaan ymmärrän, että palaute on annettu, jotta oppisin lisää',
    fin_name: 'En ota saamaani palautetta henkilökohtaisesti, vaan ymmärrän, että palaute on annettu, jotta oppisin lisää',
    swe_name: 'En ota saamaani palautetta henkilökohtaisesti, vaan ymmärrän, että palaute on annettu, jotta oppisin lisää',
    category_id: 9,
    course_instance_id: 1,
    skill_level_id: 2
  },
  {
    eng_name: 'Otan saamani palautteen puheeksi ohjaajien kanssa, jos en ole varma, mitä palautteen antaja on tarkoittanut',
    fin_name: 'Otan saamani palautteen puheeksi ohjaajien kanssa, jos en ole varma, mitä palautteen antaja on tarkoittanut',
    swe_name: 'Otan saamani palautteen puheeksi ohjaajien kanssa, jos en ole varma, mitä palautteen antaja on tarkoittanut',
    category_id: 9,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Annan rakentavaa vertaispalautetta, joka tähtää toisen opiskelijan työn parantamiseen',
    fin_name: 'Annan rakentavaa vertaispalautetta, joka tähtää toisen opiskelijan työn parantamiseen',
    swe_name: 'Annan rakentavaa vertaispalautetta, joka tähtää toisen opiskelijan työn parantamiseen',
    category_id: 9,
    course_instance_id: 1,
    skill_level_id: 3
  },
  {
    eng_name: 'Osaan toimia tilanteessa, jossa saan eri lähteistä ristiriitaista palautetta',
    fin_name: 'Osaan toimia tilanteessa, jossa saan eri lähteistä ristiriitaista palautetta',
    swe_name: 'Osaan toimia tilanteessa, jossa saan eri lähteistä ristiriitaista palautetta',
    category_id: 9,
    course_instance_id: 1,
    skill_level_id: 4
  },
  {
    eng_name: 'Antaessani palautetta asetun palautteen saajan asemaan, jotta voin arvioida, millainen palaute olisi kussakin tilanteessa mahdollisimman hyödyllistä',
    fin_name: 'Antaessani palautetta asetun palautteen saajan asemaan, jotta voin arvioida, millainen palaute olisi kussakin tilanteessa mahdollisimman hyödyllistä',
    swe_name: 'Antaessani palautetta asetun palautteen saajan asemaan, jotta voin arvioida, millainen palaute olisi kussakin tilanteessa mahdollisimman hyödyllistä',
    category_id: 9,
    course_instance_id: 1,
    skill_level_id: 4
  }
]

const skillLevels = [{
  id: 1,
  course_instance_id: 1,
  eng_name: 'Esitiedot',
  fin_name: 'Esitiedot',
  swe_name: 'Esitiedot'
},
{
  id: 2,
  course_instance_id: 1,
  eng_name: '1-2',
  fin_name: '1-2',
  swe_name: '1-2'
},
{
  id: 3,
  course_instance_id: 1,
  eng_name: '3-4',
  fin_name: '3-4',
  swe_name: '3-4'
},
{
  id: 4,
  course_instance_id: 1,
  eng_name: '5',
  fin_name: '5',
  swe_name: '5'
}]

const categories = [{
  id: 1,
  course_instance_id: 1,
  eng_name: 'Yhtälöryhmät',
  fin_name: 'Yhtälöryhmät',
  swe_name: 'Yhtälöryhmät'
},
{
  id: 2,
  course_instance_id: 1,
  eng_name: 'Vektoriavaruudet',
  fin_name: 'Vektoriavaruudet',
  swe_name: 'Vektoriavaruudet'
},
{
  id: 3,
  course_instance_id: 1,
  eng_name: 'Virittäminen ja vapaus',
  fin_name: 'Virittäminen ja vapaus',
  swe_name: 'Virittäminen ja vapaus'
},
{
  id: 4,
  course_instance_id: 1,
  eng_name: 'Matriisit',
  fin_name: 'Matriisit',
  swe_name: 'Matriisit'
},
{
  id: 5,
  course_instance_id: 1,
  eng_name: 'Geometria',
  fin_name: 'Geometria',
  swe_name: 'Geometria'
},
{
  id: 6,
  course_instance_id: 1,
  eng_name: 'Matlab-tyyppisen ohjelman käyttäminen',
  fin_name: 'Matlab-tyyppisen ohjelman käyttäminen',
  swe_name: 'Matlab-tyyppisen ohjelman käyttäminen'
},
{
  id: 7,
  course_instance_id: 1,
  eng_name: 'Matematiikan lukeminen ja kirjoittaminen',
  fin_name: 'Matematiikan lukeminen ja kirjoittaminen',
  swe_name: 'Matematiikan lukeminen ja kirjoittaminen'
},
{
  id: 8,
  course_instance_id: 1,
  eng_name: 'Matemaattinen keskustelu',
  fin_name: 'Matemaattinen keskustelu',
  swe_name: 'Matemaattinen keskustelu'
},
{
  id: 9,
  course_instance_id: 1,
  eng_name: 'Palautteen antaminen ja vastaanottaminen',
  fin_name: 'Palautteen antaminen ja vastaanottaminen',
  swe_name: 'Palautteen antaminen ja vastaanottaminen'
}]

const course = {
  id: 1,
  eng_name: 'Lineaarialgebra ja matriisilaskenta I',
  fin_name: 'Lineaarialgebra ja matriisilaskenta I',
  swe_name: 'Lineaarialgebra ja matriisilaskenta I'
}

const courseInstance = {
  id: 1,
  eng_name: 'Lineaarialgebra ja matriisilaskenta I syksy 2018',
  fin_name: 'Lineaarialgebra ja matriisilaskenta I syksy 2018',
  swe_name: 'Lineaarialgebra ja matriisilaskenta I syksy 2018',
  active: false,
  course_id: 1
}
/* eslint-enable */

const createDataForPilotCourse = async () => {
  syncDatabase()
  await Course.create(course)
  await CourseInstance.create(courseInstance)
  await Category.bulkCreate(categories)
  await SkillLevel.bulkCreate(skillLevels)
  await Objective.bulkCreate(objectives)
  process.exit()
}

createDataForPilotCourse()
