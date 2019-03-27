const router = require('express').Router()
const QuestionController = require('../controllers/questionController')
const { authenticate, authorize } = require('../middlewares/verify')

router.get('/update/:id', authenticate, authorize, QuestionController.readOne)
router.get('/:id', QuestionController.readOne)
router.get('/', QuestionController.read)
router.use(authenticate)
router.post('/', QuestionController.create)
router.put('/votes/:id', QuestionController.voting)
router.use('/:id', authorize)
router.put('/:id', QuestionController.update)
router.delete('/:id', QuestionController.remove)

module.exports = router
