import { getJson, postJson, putJson } from '../utils/utils'

export const getData = (data) => getJson(`/course-instances/data/${data.id}`)

export const create = (data) => postJson('/course-instances/create', data)

export const copy = (data) => postJson('/course-instances/copy', data)

export const getByCourse = (courseId) => getJson(`/courses/${courseId}`)

export const matrix = (data) => getJson(`/course-instances/matrix/${data.id}`)

export const edit = (data) =>
    putJson(`/course-instances/edit/${data.id}`, { ...data, id: undefined })

export const details = (data) => getJson(`/course-instances/edit/${data.id}`)
