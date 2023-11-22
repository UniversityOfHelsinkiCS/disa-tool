import { postJson, putJson } from '../utils/utils'

export const register = (data) => postJson('/course-persons/register', data)

export const unregister = (data) => postJson('/course-persons/unregister', data)

export const changeCourseRole = (data) => putJson('/course-persons/course-role', data)

export const deleteCoursePerson = (coursePerson) => postJson('/course-persons/delete', coursePerson)

export const deleteCP = (data) => postJson('/course-persons/delete', data)
