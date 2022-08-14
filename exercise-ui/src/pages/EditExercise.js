import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditExercise = ({ exerciseToEdit }) => {
 
    const [name, setName]       = useState(exerciseToEdit.name);
    const [reps, setReps]         = useState(exerciseToEdit.reps);
    const [weight, setWeight]   = useState(exerciseToEdit.weight);
    const [unit, setUnit]       = useState(exerciseToEdit.unit);
    const [date, setDate]       = useState(exerciseToEdit.date);
    
    const history = useHistory();

    const editExer = async () => {
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name, 
                reps: reps, 
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Successfully edited exercise!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update exercise. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    }

    return (
        <>
        <article>
            <h2>Edit an exercise in the collection</h2>
            <p>Edit values for the exercise.</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Which exercise are you adding?</legend>
                    <label for="name">Exercise Name</label>
                    <input required="required"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" />
                    
                    <label for="reps">Reps</label>
                    <input required="required"
                        type="number"
                        min="0"
                        value={reps}
                        onChange={e => setReps(e.target.value)} 
                        id="reps" />

                    <label for="weight">Weight</label>
                    <input required="required"
                        type="number"
                        min="0"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} 
                        id="weight" />
                        
                    <label for="unit">Unit</label>
                    <select id="unit" value={unit} onChange={e => setUnit(e.target.value)}>
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                    </select>

                    <label for="date">Date</label>
                    <input required="required"
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)} 
                        id="date" /> 

                    <label for="submit">
                    <button
                        onClick={editExer}
                        id="submit"
                    >Save</button> </label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default EditExercise;