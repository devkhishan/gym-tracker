import {useState} from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'
const WokroutForm = () => {
    const [title,setTitle] = useState('') 
    const [load,setLoad] = useState('') 
    const [reps,setReps] = useState('') 
    const [error,setError] = useState(null)
    const [emptyFields,setEmptyFields] = useState([])

    const {dispatch} = useWorkoutContext()
    const {user} = useAuthContext()
    const handleSubmit = async (e) => {
        
        e.preventDefault()

        if(!user){
            setError("You must be logged in")
            return
        }

        const workout = {title,load,reps} 

        const response = await fetch('http://localhost:4000/api/workouts',{
            method: 'POST', 
            body: JSON.stringify(workout),
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        else{
            setEmptyFields([])
            dispatch({type: 'CREATE_WORKOUT', payload: json})
            setTitle('') 
            setLoad('') 
            setReps('') 
            setError(null)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a Workout : </h3>

            <label>Enter Title : </label>
            <input 
                type="text"
                onChange = {(e)=>setTitle(e.target.value)}
                value= {title} 
                className = {emptyFields.includes("title")?"error":""}/> 

            <label>Load (in Kg) : </label>
            <input 
                type="number"
                onChange = {(e)=>setLoad(e.target.value)}
                value= {load} 
                className = {emptyFields.includes("load")?"error":""}/>

            <label>Reps : </label>
            <input 
                type="number"
                onChange = {(e)=>setReps(e.target.value)}
                value= {reps}
                className = {emptyFields.includes("reps")?"error":""} />

            <button>Add workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WokroutForm