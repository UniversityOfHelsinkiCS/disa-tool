/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable quote-props */
export default {
  "common": {
    "save": ["Save", "Tallenna"],
    "name": ["Name", "Nimi"],
    "skill_levels": ["skill levels", "taitotasot"],
    "category": ["category", "osio"],
    "objective": ["objective", "oppimistavoite"],
    "tasks": ["tasks", "tehtävät"],
    "or": ["or", "tai"],
    "cancel": ["Cancel", "Peru"],
    "open": ["open", "avoinna"],
    "closed": ["closed", "suljettu"],
    "course_matrix": ["Course-objective matrix", "Kurssin tavoitematriisi"]
  },
  /*
    InfoBox translations:
    Student cannot see infobox if there is no translation for Student.
    Teacher cannot see infobox if there is no translation for Teacher.
    Admin can always see infobox and will see the translation ID used for student and
    teacher and their translations.

    The translation ID can be for example InfoBox.UserPage.Student
    Different parts of the ID are separated with a dot.
    The first part is used by all infoboxes.
    The second part is an unique string used to identify the translation.
    The third part is either Student or Teacher and signals to who can see the translation.

    The translation can contain simple HTML <i><b><br> and **markdown**.
    You can create multiline translations by using `backticks`.
    You can leave Teacher or Student translation out completely and the infobox will not show to users.

    Here is an example of the translation structure:
    "InfoBox": {
      "UniqueString": {
        "Teacher": [
          "English translation for teachers.",
          "Suomenkielinen käännös opettajille."
        ],
        "Student": [
          "English translation for students.",
          "Suomenkielinen käännös opiskelijoille."
        ]
      },
      "AnotherUniqueString": {
        "Teacher": [
          `
Example of a multiline text.
This text is NOT on a new line.
<br />
This text IS on a new line.

This is a new paragraph.

This is **bold**, <b>so is this</b>.

This is *italic*, <i>so is this</i>.

When using backticks you can also use "quotes" and 'hyphens' in the text.
          `,
          `Esimerkki **markdown** ja <i>HTML</i>`,
        ],
      },
    },
    */
  "InfoBox": {
    "EditGradesPage": {
      "Teacher": [
        "Here you'll define the grades for the course. The 'required completion' fields in the list refer to the requirements of the final grade of the course. In the lower table you can edit grading criteria by category. If you do, remember to press the Save button when you're done.",
        "Tähän määritellään kurssin arvosanat. Jotta oppilas saa vähintään kyseisen arvosanan, täytyy hänen olla suorittanut määritelty prosenttimäärä arvosanaan liittyvistä tehtävistä, sekä kaikki vaaditut alemmat arvosanasuoritukset. Alemmassa taulukossa voit muokata osiokohtaisia arvosanarajoja. Jos muokkaat osiokohtaisia rajoja, muista painaa Tallenna -nappia muokkauksien jälkeen."
      ]
    },
  },
  "Nav": {
    "navbar": {
      "logout": ["Log out", "Kirjaudu ulos"],
      "logout_success": [
        "You have logged out successfully",
        "Olet kirjautunut ulos"
      ],
      "login": ["Log in", "Kirjaudu sisään"],
      "admin": ["Admin", "Admin"],
      "courses": ["Courses", "Kurssit"],
      "user": ["Personal page", "Oma sivu"],
      "home": ["DISA-tool", "DISA-työkalu"]
    }
  },
  "Admin": {
    "common": {
      "student_button": ["Student", "Opiskelija"],
      "teacher_button": ["Teacher", "Opettaja"]
    },
    "AddToCourseForm": {
      "header": ["Register user to a course", "Rekisteröi käyttäjä kurssille"],
      "prompt_1": ["Register user", "Rekisteröi käyttäjä"],
      "prompt_2": ["to a new course instance", "uuteen kurssi-instanssiin"],
      "trigger": ["Add to a new course", "Lisää uudelle kurssille"],
      "course": ["course", "kurssi"],
      "instance": ["course instance", "kurssi-instanssi"]
    },
    "AdminPage": {
      "delete_header": ["Remove user from course", "Poista käyttäjä kurssilta"],
      "delete_prompt_1": ["Really remove user", "Poistetaanko käyttäjä"],
      "delete_prompt_2": ["from course instance", "kurssi-instanssista"],
      "header": ["Manage users", "Hallinnoi käyttäjiä"],
      "search_button": ["Search", "Hae"],
      "get_all": ["Get all users", "Hae kaikki käyttäjät"],
      "course_roles": ["Course roles", "Roolit kursseilla"],
      "global_role_label": ["GLOBAL ROLE", "GLOBAALI ROOLI"],
      "search_placeholder": [
        "Search by name or student number",
        "Hae nimellä tai opiskelijanumerolla"
      ]
    }
  },
  "Login": {
    "LoginForm": {
      "already_logged_in": [
        "You are already logged in",
        "Olet jo kirjautunut sisään"
      ],
      "username": ["username", "käyttäjänimi"],
      "password": ["password", "salasana"],
      "login_button": ["Log in", "Kirjaudu sisään"]
    },
    "LoginPage": {
      "login": [
        "Log in with your University of Helsinki credentials",
        "Kirjaudu sisään Helsingin yliopiston tunnuksilla"
      ]
    }
  },
  "Home": {
    "HomePage": {
      "header1": ["Welcome to the DISA-tool", "Tervetuloa DISA-työkaluun"],
      "introduction": [
        "Teachers and students can create and inspect course learning objectives using the DISA-tool as well as evaluate and track the completion of those objectives. The software is a work in progress in trial use. As such some issues may come up. You can report any issues to your course teachers or straight to",
        "DISA-työkalun avulla opettajat ja opiskelijat voivat luoda ja tarkastella kurssin osaamistavoitteita sekä arvioida ja seurata näiden tavoitteiden toteutumista. Sovellus on vasta työn alla ja kokeilukäytössä, joten vikoja voi tulla vastaan. Näistä voi ilmoittaa kurssien opettajille tai suoraan"
      ],
      "developers": ["the developers", "kehittäjille"],
      "log_in_prompt": [
        "Log in using your University of Helsinki credentials",
        "Kirjaudu sisään Helsingin yliopiston tunnuksilla"
      ],
      "anon_info": [
        "Without logging in you can still browse courses and inspect their learning objectives.",
        "Kirjautumattomana voit selata kursseja ja tarkastella niiden osaamistavoitteita."
      ],
      "student_header": ["For students", "Opiskelijalle"],
      "student_info": [
        "When logged in you'll be able to register to courses. When registered, you can view your task performance and submit course self-asseessments.",
        "Kirjautuneena pääset rekisteröitymään kursseille. Kun olet rekisteröitynyt, pääset katselemaan tehtäväsuorituksiasi ja vastaamaan kurssin itsearviointeihin."
      ],
      "teacher_header": ["For teachers", "Opettajalle"],
      "teacher_info": [
        "If you wish to use the tool on your course, please ask an administrator to add you as a teacher. Afterwards, you can create objectives and tasks for your course. You can also inspect the progress of your students and give them self-asseessments to fill out.",
        "Jos haluat käyttää työkalua kurssillasi, pyydä pääkäyttäjää lisäämään sinut opettajaksi. Tämän jälkeen voit luoda kurssillesi tavoitteita ja tehtäviä. Voit myös tarkkailla opiskelijoiden edistymistä ja teettää heillä itsearviointeja."
      ],
      "background_header": ["Background", "Taustaa"],
      "background_info_1_1": [
        "DISA-tool was started due to ",
        "DISA-työkalu on saanut alkunsa matematiikan ja tilastotieteen laitoksella tehtävästä "
      ],
      "background_link_1": [
        "a study on self-asseessments",
        "itsearviointitutkimuksesta"
      ],
      "background_link_1_href": [
        "https://tuhat.helsinki.fi/portal/en/projects/digital-selfassessm(384b2b6c-1992-48cd-aa60-0e9169c2efe9).html",
        "https://tuhat.helsinki.fi/portal/fi/projects/digital-selfassessm(384b2b6c-1992-48cd-aa60-0e9169c2efe9).html"
      ],
      "background_info_1_2": [
        " conducted by the mathematics and statistics faculty. The study found that both learning objective matrices and self-asseessment exercises have positive effects on the learning strategies and motivation of students as well as their view of their own abilities.",
        ". Tutkimuksessa on havaittu, että osaamistavoitematriiseilla sekä itsearviointiharjoituksilla on myönteistä vaikutusta opiskelijoiden oppimisstrategioihin, motivaatioon ja käsitykseen omasta osaamisestaan."
      ],
      "background_info_2_1": [
        "The Centre for University Teaching and Learning ",
        "Tutkimuksessa ovat mukana Helsingin yliopiston yliopistopedagogiikan keskus "
      ],
      "background_link_2_1": [
        "https://www.helsinki.fi/en/centre-for-university-teaching-and-learning-hype",
        "https://www.helsinki.fi/fi/yliopistopedagogiikan-keskus-hype"
      ],
      "background_info_2_2": [" and ", " sekä "],
      "background_link_2_2": [
        "the Faculty of Educational Sciences",
        "kasvatustieteellinen tiedekunta"
      ],
      "background_link_2_2_href": [
        "https://www.helsinki.fi/en/faculty-of-educational-sciences",
        "https://www.helsinki.fi/fi/kasvatustieteellinen-tiedekunta"
      ],
      "background_info_2_3": [
        " are a part of the study. DISA-tool is developed by the University of Helsinki Faculty of Computer Science Software Development Academy (TOSKA) with the support of the University of Helsinki.",
        " Työkalua kehittää Helsingin yliopiston Tietojenkäsittelytieteen Osaston Sovelluskehitysakatemia (TOSKA) Helsingin yliopiston tukemana."
      ]
    }
  },
  "Course": {
    "common": {
      "types": ["Types", "Tyypit"],
      "matrix": ["Matrix", "Matriisi"]
    },
    "header": {
      "CourseHeader": {
        "back_button": ["Back to course page", "Takaisin kurssisivulle"]
      }
    },
    "navbar": {
      "Navbar": {
        "tasks": ["Tasks", "Tehtävät"],
        "grades": ["Grading criteria", "Arvosteluperusteet"]
      }
    },
    "grades": {
      "common": {
        "grade": ["Grade", "Arvosana"],
        "skill_level": ["Skill level", "Arvosanaa vastaava taitotaso"],
        "needed_for_grade": ["Required completion level", "Vaadittu suoritustaso"],
        "prerequisite": ["Prerequisite grade for earning this grade", "Vaadittu alempi arvosanasuoritus"]
      },
      "CategoryGradeTable": {
        "header": ["Edit grades by category", "Muokkaa arvosanoja osioittain"],
        "header_cell": ["Grade/Category", "Arvosana/Osio"],
        "cancel_button": ["Undo changes", "Peru muutokset"]
      },
      "CreateGradeForm": {
        "header": ["Create a new grade", "Luo uusi arvosana"]
      },
      "EditGradeForm": {
        "header": ["Edit grade", "Muokkaa arvosanaa"]
      },
      "EditGradesTab": {
        "header": [
          "Create and modify the grading criteria",
          "Lisää ja muokkaa kurssin arvosanoja"
        ]
      },
      "Grade": {
        "delete_header": ["Delete grade", "Poista arvosana"],
        "delete_prompt_1": [
          "Are you sure you want to remove the grade",
          "Poistetaanko arvosana"
        ]
      }
    },
    "matrix": {
      "CreateCategoryForm": {
        "header": ["Create a new category", "Luo uusi osio"],
        "prompt_1": ["Create a new category", "Luo uusi osio"]
      },
      "CreateLevelForm": {
        "header": ["Create a new skill level", "Luo uusi taitotaso"],
        "prompt_1": ["Create a new skill level", "Luo uusi taitotaso"]
      },
      "CreateObjectiveForm": {
        "header": ["Create a new objective", "Luo uusi oppimistavoite"],
        "prompt_1": [
          "Add a new objective to category",
          "Lisää uusi oppimistavoite osioon"
        ],
        "prompt_2": ["and level", "tasolle"]
      },
      "EditCategoryForm": {
        "header": ["Edit category", "Muokkaa osiota"]
      },
      "EditLevelForm": {
        "header": ["Edit skill level", "Muokkaa taitotasoa"]
      },
      "EditObjectiveForm": {
        "header": ["Edit objective", "Muokkaa oppimistavoitetta"]
      },
      "Matrix": {},
      "HeaderLevel": {
        "delete_header": ["Delete skill level", "Poista oppimistaso"],
        "delete_prompt_1": [
          "Really remove skill level",
          "Poistetaanko taitotaso"
        ]
      },
      "MatrixCategory": {
        "delete_header": ["Delete category", "Poista osio"],
        "delete_prompt_1": ["Really remove category", "Poistetaanko osio"]
      },
      "MatrixObjective": {
        "delete_header": ["Delete objective", "Poista oppimistavoite"],
        "delete_prompt_1": [
          "Really remove objective",
          "Poistetaanko oppimistavoite"
        ],
        "cumulative": ["Cumulative multiplier: ", "Kerroin yhteensä: "]
      }
    },
    "tasks": {
      "common": {
        "default": ["Default Multiplier", "Oletusarvoinen kerroin"],
        "description": ["description", "kuvaus"],
        "edit_multipliers_button": ["Edit multipliers", "Muokkaa kertoimia"]
      },
      "AddTaskForm": {
        "header": ["Add new task", "Lisää uusi tehtävä"],
        "prompt_1": [
          "Add a new task to the course",
          "Lisää uusi tehtävä kurssille"
        ]
      },
      "EditTaskForm": {
        "header": ["Edit task", "Muokkaa tehtävää"],
        "prompt_1": ["Edit task", "Muokkaa tehtävää"],
        "trigger": ["Edit task", "Muokkaa tehtävää"]
      },
      "EditTaskObjectivesForm": {
        "header": ["Edit multipliers", "Muokkaa kertoimia"],
        "detailed": ["Individual", "Yksittäin"],
        "all": ["All", "Kaikki"],
        "modify": ["Modify", "Muuta"]
      },
      "SelectTaskDropDown": {
        "placeholder": ["Select a task here", "Valitse tehtävä tästä"]
      },
      "Task": {
        "delete_header": ["Delete task", "Poista tehtävä"],
        "delete_prompt_1": ["Really remove task", "Poistetaanko tehtävä"],
        "max_points": ["Maximum points", "Maksimipisteet"],
        "info": ["Additional info about task", "Tehtävän lisätiedot"]
      }
    },
    "types": {
      "common": {
        "multiplier": ["multiplier", "kerroin"]
      },
      "CreateHeaderForm": {
        "header": ["Add new type header", "Lisää uusi tyyppiotsake"],
        "prompt_1": ["Add new type header", "Lisää uusi tyyppiotsake"]
      },
      "CreateTypeForm": {
        "header": ["Add new type", "Lisää uusi tyyppi"],
        "prompt_1": ["Add new type", "Lisää uusi tyyppi"]
      },
      "EditHeaderForm": {
        "header": ["Edit type header", "Muokkaa tyyppiotsaketta"]
      },
      "EditTypeForm": {
        "header": ["Edit type", "Muokkaa tyyppiä"],
        "prompt_1": ["Edit type", "Muokkaa tyyppiä"]
      },
      "Type": {
        "delete_header": ["Delete type", "Poista tyyppi"],
        "delete_prompt_1": ["Really remove type", "Poistetaanko tyyppi"]
      },
      "TypeHeader": {
        "delete_header": ["Delete type header", "Poista tyyppiotsake"],
        "delete_prompt_1": [
          "Really remove type header",
          "Poistetaanko tyyppiotsake"
        ]
      }
    }
  },
  "CreateCourse": {
    "CreateCoursePage": {
      "createCourse": ["Create a new course", "Luo uusi kurssi"],
      "create": ["Create", "Luo"],
    }
  },
  "CourseList": {
    "CreateInstanceForm": {
      "header": ["Create a new course instance", "Luo uusi kurssi-instanssi"],
      "prompt_1": ["Create a new course instance", "Luo uusi kurssi-instanssi"],
      "trigger": [
        "Create a new instance of this course",
        "Luo uusi instanssi tästä kurssista"
      ],
      "dropdown_label": [
        "Optionally choose a previous course instance to copy as a base.",
        "Voit valita aikaisemman kurssi-instanssin kopioitavaksi pohjaksi."
      ],
      "dropdown_null_value": ["No base", "Ei pohjaa"]
    },
    "EditInstanceForm": {
      "header": ["Edit course instance", "Muokkaa kurssi-instanssia"],
      "prompt_1": ["Edit course instance", "Muokkaa kurssi-instanssia"]
    },
    "EditCourseForm": {
      "rename_trigger": ["Rename the course", "Vaihda kurssin nimeä"],
      "renameCourse": ["Rename this course", "Vaihda kurssin nimeä"],
      "rename": ["Rename", "Vaihda nimi"]

    },
    "RegisterForm": {
      "unregister": ["Undo registration", "Peru rekisteröityminen"],
      "register": ["Register", "Rekisteröidy"],
      "require_login": ["requires login", "vaatii sisäänkirjautumisen"]
    },
    "CourseListPage": {
      "create_trigger": ["Add", "Lisää"],
      "state": ["This course is currently", "Tämä kurssi on tällä hetkellä"],
      "you_are": ["You are on the course", "Olet kurssilla"],
      "coursepage_button": ["To course page", "Kurssisivulle"],
      "instance_prompt": [
        "Now, choose a course instance.",
        "Valitse vielä kurssi-instanssi."
      ],
      "course_prompt": ["First, choose a course", "Valitse ensin kurssi"],
      "course_select_placeholder": ["choose course...", "valitse kurssi..."]
    }
  },
  "SelfAssessment": {
    "SelfAssessmentList": {
      "header": [
        "Self-asseessments of the selected course - click to edit",
        "Valitun kurssin itsearviot - klikkaa muokataksesi"
      ]
    },
    "AssessmentButtons": {
      "categoryButton": [
        "Category based self-asseessment",
        "Itsearvio kategorioiden pohjalta"
      ],
      "objectiveButton": [
        "Objective based self-asseessment",
        "Itsearvio tavoitteiden pohjalta"
      ]
    }
  },
  "FeedbackPage": {
    "common": {
      "selfAssessedGrade": ["Self Assessed grade", "Itsearvioitu arvosana"],
      "machineGrade": ["Machine Review", "Konearvio"]
    },
    "CategoryFeedback": {
      "message": [
        "You've already responded to this assessment. You can see your responses below",
        "Olet jo vastannut tähän itsearviointiin. Voit tarkastella vastauksiasi alla."
      ],
      "general_feedback": ["General feedback", "Yleinen palaute"],
      "explanation": ["explanation", "perustelut"],
      "feedback": ["Feedback", "Palaute"]
    },
    "ObjectivesFeedback": {
      "message": [
        "You've already responded to this assessment. You can see your responses below",
        "Olet jo vastannut tähän itsearviointiin. Voit tarkastella vastauksiasi alla."
      ],
      "objective": ["Objective", "Tavoite"],
      "assessment": ["Your assessment", "Arvio osaamisesta"],
      "objectiveAssessment": {
        "good": [
          "I know the the objectives of this category well",
          "Osaan osion tavoitteet hyvin"
        ],
        "decent": [
          "Osaan osion tavoitteet kohtalaisesti",
          "I know the the objectives of this category decently"
        ],
        "poor": [
          "Vielä selkeästi kehitettävää osion tavoitteiden suhteen",
          "I still have a lot of room for development regarding the objectives"
        ]
      }
    },
    "QuestionAndGradeFeedback": {
      "header": ["Open questions", "Avoimet kysymykset"],
      "response": ["Response", "Vastaus"],
      "grade": ["Grade", "Arvosana"],
      "explanation": ["explanation", "perustelut"]
    }
  },
  "SelfAssessmentForm": {
    "SelfAssessmentFormPage": {
      "reviewMessage": [
        "You're now reviewing the assessment. To edit it, first open it in the edit mode.",
        "Olet tarkistustilassa. Muokataksesi itsearviolomaketta, avaa se ensin muokkaustilassa."
      ],
      "previewMessage": [
        "You're now in preview mode. To save the assessment, return to the edit mode",
        "Olet nyt esikatselutilassa, tallentaaksesi itsearvion palaa muokkaustilaan"
      ],
      "notOpenMessage": [
        "The self-asseessment is not open for answering yet.",
        "Itsearviota ei ole vielä avattu vastattavaksi"
      ],
      "existingResponse": [
        "You've already responded to the assessment. The assessment is still open, so you can edit your responses.",
        "Olet jo vastannut itsearvioon, mutta arvio on vielä auki, joten voit halutessasi muokata vastauksiasi."
      ],
      "modalHeader": ["Save you response", "Tallenna vastauksesi"],
      "modalContent1": [
        "You have empty explanation text fields",
        "Sinulla on tyhjiä perustelukenttiä vastauksille"
      ],
      "modalContent2": [
        "Do you wish to save your response despite this",
        "Haluatko tallentaa vastauksesi tästä huolimatta"
      ],
      "modalButton1": ["Save", "Tallenna"],
      "modalButton2": ["Cancel", "Peru"],
      "editButton": ["Edit", "Takaisin"],
      "previewButton": ["Preview", "Esikatsele"],
      "saveButton": ["Save", "Tallenna"],
      "updateButton": ["Save changes", "Tallenna muutokset"],
      "prompt": [
        "You have unsaved changes. Are you sure you want to exit?",
        "Sinulla on tallentamattomia muutoksia. Haluatko varmasti poistua?"
      ],
      "back_button": ["Back to course page", "Takaisin kurssisivulle"],
      "defineMatrixFirstError": ["Define course-objective matrix first", "Määritä kurssin tavoitematriisi ensin"]
    },
    "QuestionModules": {
      "CategoryQuestionModule": {
        "matrix": ["Skill level matrix", "Osaamismatriisi"],
        "assessment": [
          "Assess your skills by grade",
          "Arvioi osaamisesi arvosanalla"
        ],
        "gradeSelect": ["Select a grade", "Valitse arvosana"],
        "basis": ["Explanation for grade", "Perustelut arvosanalle"],
        "writeBasis": [
          "Write an explanation for your grade",
          "Perustelut arvosanalle"
        ]
      },
      "EditCategoryModule": {
        "label": ["Explanation for grade", "Perustelut arvosanalle"],
        "includedButton": ["Included in assessment", "Mukana itsearviossa"],
        "notIncludedButton": [
          "Not included in assessment",
          "Ei mukana itsearviossa"
        ]
      },
      "OpenQuestionModule": {
        "placeholder": ["Write your response here", "Kirjoita vastaus tähän"],
        "modalHeader": ["Remove open question", "Poista avoin kysymys"],
        "modalConfirmation": [
          "Do you wish to remove the open question",
          "Haluatko poistaa avoimen kysymyksen"
        ],
        "modalCancel": ["Cancel", "Peru"],
        "popup": [
          "Remove the open question from here",
          "Poista avoin kysymys tästä"
        ]
      }
    },
    "UpOrDownToggle": {
      "downButton": ["Move category down", "Siirä kategoria alemmas"],
      "upButton": ["Move category up", "Siirrä kategoria ylemmäs"]
    },
    "addOpenQuestion": {
      "addButton": ["Add open question", "Lisää avoin kysymys"],
      "questionDisplay": ["Question", "Kysymys"]
    },
    "Header": {
      "buttonSave": ["Save", "Aseta"],
      "buttonEdit": ["Edit", "Muokkaa"]
    },
    "Sections": {
      "buttonSave": ["Save", "Aseta"],
      "buttonEdit": ["Edit", "Muokkaa"]
    }
  },
  "UserPage": {
    "common": {
      "hello": ["Hello", "Hei"],
      "tasks": ["Tasks", "Tehtävät"],
      "self_assessments": ["Self-asseessments", "Itsearvioinnit"],
      "open_task_list": ["Look at tasks", "Katso tehtävälistaa"],
      "create_self_assessment_target": [
        "Create objective based assessment",
        "Luo tavoitepohjainen itsearviointi"
      ],
      "create_self_assessment_category": [
        "Create category based assessment",
        "Luo kategoriapohjainen itsearviointi"
      ],
      "no_course_selected": ["No course selected", "Kurssia ei valittu"]
    },
    "CourseSideMenu": {
      "active_courses": ["Open courses", "Avoimet kurssit"],
      "closed_courses": ["Closed courses", "Suljetut kurssit"]
    },
    "CourseInfo": {
      "edit_self_assessments": [
        "Edit self-asseessments",
        "Muokkaa itsearviointeja"
      ],
      "edit_course": ["Edit course", "Muokkaa kurssia"],
      "close_course": ["Course open", "Kurssi avoinna"],
      "manage_course_people_tasks": [
        "Manage course people and tasks",
        "Hallinnoi kurssin osallistujia ja tehtäviä"
      ],
      "start_course": ["Course closed", "Kurssi suljettu"],
      "course_teachers": ["Course teachers", "Kurssin opettajat"],
      "this_course_is": ["This course is ", "Tämä kurssi on "],
      "Links": {
        "course_links": ["Show course links", "Näytä kurssin linkit"],
        "registration": ["Registration: ", "Rekisteröityminen: "],
        "matrix": ["Matrix: ", "Matriisi: "],
        "close": ["Close", "Sulje"],
        "course_page": ["Course page", "Kurssisivu"]
      }
    },
    "ManageCoursePeople": {
      "add_a_user": ["Add a user to the course", "Lisää käyttäjä kurssille"],
      "add_teacher": ["Add teacher", "Lisää opettaja"],
      "select_teacher": ["Select teacher(s)", "Valitse lisättävät opettajat"],
      "add_student": ["Add student to course", "Lisää opiskelija kurssille"],
      "search_student": [
        "Search people outside of course",
        "Etsiä kurssin ulkopuolisia henkilöitä"
      ],
      "teacher": ["Teacher", "Opettaja"],
      "student": ["Student", "Opiskelija"],
      "manage_course_people": [
        "Manage people on course",
        "Hallinnoi kurssin osallistujia"
      ],
      "remove_from_course": ["Remove from course", "Poista kurssilta"]
    },
    "UploadResponses": {
      "CsvTable": {
        "look_at_csv": [
          "Inspect csv file contents",
          "Katso csv-tiedoston sisältöä"
        ]
      },
      "PointMapping": {
        "point_mapping_text": [
          "Add here all non-numeric values and map them to numeric values",
          "Onko sarakkeissa arvoja, joiden pistemäärä pitää muuttaa numeraalisiksi?"
        ],
        "key": ["name", "nimi"],
        "value": ["points", "pisteet"],
        "add": ["add", "lisää"]
      }
    },
    "StudentAssesmentList": {
      "open": ["open", "avoin"],
      "answered": ["answered", "vastattu"],
      "unanswered": ["unanswered", "vastaamatta"]
    },
    "TeacherAssesmentList": {
      "open": ["open", "avoin"],
      "visible": ["visible", "näkyvissä"],
      "hidden": ["hidden", "piilotettu"],
      "preview": ["preview", "esikatsele"],
      "feedback_open": ["feedback visible", "palaute näkyy"],
      "feedback_closed": ["no feedback", "ei palautetta"],
      "delete_header": ["Remove self-asseessment", "Poista itsearviointi"],
      "delete_prompt_1": [
        "Really remove self-asseessment",
        "Poistetaanko itsearviointi"
      ],
      "cannot_edit_open_assessment": [
        "You can not edit open self-asseessment. Close or hide it first.",
        "Et voi muokata avointa itsearviointia. Sulje tai piilota se ensin."
      ]
    }
  },
  "SelfAssessmentList": {
    "SelfAssessmentListPage": {
      "back": ["Back", "Takaisin"],
      "inspect": ["Inspect", "Tarkastele"],
      "self_assessment": ["Self-asseessment", "Itsearvio"],
      "machine_review": ["Machine Review", "Konearvio"],
      "difference": ["Difference", "Erotus"],
      "final_grade": ["Final Grade", "Loppuarvosana"],
      "link": ["Link to assessment form", "Linkki vastauslomakkeeseen"],
      "generate_feedback": ["Regenerate feedbacks", "Luo palautteet uudestaan"],
      "selected_header": ["Selected self-asseessments", "Valitut itsearviot"],
      "non-selected_header": [
        "Non-selected self-asseessments",
        "Ei-valitut itsearviot"
      ]
    },
    "ResponseList": {
      "Filter": [
        "Filter by name or student number",
        "Rajaa nimen tai opiskelijanumeron avulla"
      ],
      "SelectWarning": ["Select students first", "Valitse ensin opiskelijoita"]
    },
    "SelectionButtons": {
      "select": ["select all", "valitse kaikki"],
      "deselect": ["remove selections", "poista valinnat"]
    },
    "SelfAssesmentCSVDownload": {
      "download_csv": [
        "Download responses as csv",
        "Lataa vastaukset csv-muodossa"
      ]
    }
  },
  "utils": {
    "components": {
      "DeleteForm": {
        "remove": ["Remove", "Poista"]
      },
      "MultilingualField": {
        "monolingual": ["Monolingual", "Yksikielinen"],
        "multilingual": ["Multilingual", "Monikielinen"]
      }
    }
  }
}
