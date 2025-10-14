import type { DeleteTodoTaskBtnProps } from "./DeleteTodoTask.props";

function DeleteTodoTaskBtn({onClick} : DeleteTodoTaskBtnProps){

    return( 
        <button onClick={onClick}>Delete</button>
    )
}

export default DeleteTodoTaskBtn;