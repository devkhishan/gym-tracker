import {useState} from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
const WokroutForm = () => {
    const [title,setTitle] = useState('') 
    const [load,setLoad] = useState('') 
    const [reps,setReps] = useState('') 
    const [error,setError] = useState(null)
    const {dispatch} = useWorkoutContext()
    const handleSubmit = async (e) => {
        
        e.preventDefault()
        const workout = {title,load,reps} 

        const response = await fetch('/api/workouts',{
            method: 'POST', 
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        else{
            dispatch({type: 'CREATE_WORKOUT', payload: json})
            setTitle('') 
            setLoad('') 
            setReps('') 
            setError(null)
            console.log('New workout added',json)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a Workout : </h3>

            <label>Enter Title : </label>
            <input 
                type="text"
                onChange = {(e)=>setTitle(e.target.value)}
                value= {title} /> 

            <label>Load (in Kg) : </label>
            <input 
                type="number"
                onChange = {(e)=>setLoad(e.target.value)}
                value= {load} />

            <label>Reps : </label>
            <input 
                type="number"
                onChange = {(e)=>setReps(e.target.value)}
                value= {reps} />

            <button>Add workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WokroutForm