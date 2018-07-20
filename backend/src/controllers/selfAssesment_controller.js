const router = require('express').Router()

const { checkAuth } = require('../services/auth.js')

const selfAssesmentService = require('../services/selfAssesment_service.js')

router.post('/create', async (req, res) => {
  let createFormData = req.body
  const { formInfo } = createFormData.structure
  createFormData = destructureNamesAndInstructions(createFormData, formInfo)
  createFormData.structure = JSON.stringify(createFormData.structure)
  const data = await selfAssesmentService.addSelfAssesment(createFormData, req.lang)
  data.structure = JSON.parse(data.structure)

  return res.status(200).json({
    message: 'it is done my friend',
    data
  })
})

router.get('/', async (req, res) => {
  const user = await checkAuth(req)
  const data = await selfAssesmentService.getUserSelfAssesments(user, req.lang)
  //Parse structure to JS object
  data.forEach((uSA) => {
    const parsedStructure = uSA
    parsedStructure.structure = JSON.parse(uSA.structure)
    return parsedStructure
  })
  return res.status(200).json({
    data
  })
})

router.put('/update/:id', async (req, res) => {
  let data = req.body
  const { formInfo } = data.structure
  data = destructureNamesAndInstructions(data, formInfo)
  data.structure = JSON.stringify(data.structure)
  data = await selfAssesmentService.updateSelfAssesment(data, req.lang)
  data.structure = JSON.parse(data.structure)
  return res.status(200).json({
    message: 'Self assesment updated succesfully',
    data
  })
})

const destructureNamesAndInstructions = (createFormData, formInfo) => {
  const withNamesAndInstructions = createFormData
  formInfo.forEach((forminfoType) => {
    withNamesAndInstructions[forminfoType.type] = forminfoType.value
  })
  return withNamesAndInstructions
}

module.exports = router