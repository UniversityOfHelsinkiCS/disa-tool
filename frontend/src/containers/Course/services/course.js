import { getJson } from '../../../utils/utils'

const getCourseData = data => new Promise((resolve) => {
  getJson(`/course-instances/data/${data.courseId}`).then(response =>
    resolve({
      type: 'COURSE_GET_DATA',
      response: response.data
    }))
})

module.exports = {
  getCourseData
}
