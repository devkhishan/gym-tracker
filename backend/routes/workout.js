const express = require('express') 
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout } = require('../controllers/workoutControllers')

const requireAuth = require('../middlewares/requireAuth')

const router = express.Router() 


router.use(requireAuth)

// Get all workouts
router.get('/', getWorkouts)

// Get workout with ID
router.get('/:id', getWorkout)

// Create a new workout
router.post('/', createWorkout)

// Delete a workout
router.delete('/:id', deleteWorkout)

// Update a workout
router.patch('/:id', updateWorkout)

module.exports = router
