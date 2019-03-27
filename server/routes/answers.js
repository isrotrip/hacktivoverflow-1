const router = require('express').Router()
const AnswerController = require('../controllers/answerController')
const { authenticate, authorizeAnswer } = require('../middlewares/verify')

router.get('/:id', AnswerController.readByQuestionId)
router.use(authenticate)
router.post('/', AnswerController.create)
router.put('/votes/:id', AnswerController.voting)
router.put('/:id', authorizeAnswer, AnswerController.update)
router.delete('/:id', authorizeAnswer, AnswerController.remove)

module.exports = router