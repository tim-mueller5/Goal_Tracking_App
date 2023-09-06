

function EditGoal({ goal }) {


    if(goal) {
        return(
            <div>
                <h3>Edit Goal Component</h3>
                <p>{goal.name}</p>
            </div>
        )
    }
    
}

export default EditGoal;