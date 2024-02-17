import { useContext } from 'react' 
import { WorkoutContext } from '../context/WorkoutContext'

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext)

    if(!context){
        throw Error('useWorkoutContext will only work inside WorkoutContextProvider')
    }

    return context
}