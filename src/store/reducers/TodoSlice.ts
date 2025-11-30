import type {UpdateTodoTaskDto, CreateTodoTaskDto, TodoTaskDto} from "../../types/TodoTask.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_BASE_URL} from "../../helpers/API.ts";



interface TodosState {
  tasks: TodoTaskDto[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
    tasks: [],
    loading: false,
    error: null
};

export const fetchTodoTasks = createAsyncThunk(
    'todos/fetchAllTodoTasks',
    async (_, thunkAPI) =>{
        try{
            const response = await axios.get<TodoTaskDto[]>(API_BASE_URL);
            return response.data;
        } catch(e){
            return thunkAPI.rejectWithValue(`Cannot load todo tasks. with message ${e}`);
        }
    }
);

export const createTodoTask = createAsyncThunk(
    'todos/createTodoTask',
    async (note: CreateTodoTaskDto, thunkAPI) => {
        try {
            const response = await axios.post<TodoTaskDto>(API_BASE_URL, note);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(`Cannot create note with message ${e}.`);
        }
    }
);

export const updateTodoTask = createAsyncThunk(
    'todos/updateTodoTask',
    async (note: UpdateTodoTaskDto,thunkAPI)=>{
        try{
            const response = await axios.put<TodoTaskDto>(API_BASE_URL, note)
            return response.data;
        } catch(e){
            return thunkAPI.rejectWithValue(`Cannot update note with message ${e}.`);
        }
    }
)

export const deleteTodoTask = createAsyncThunk(
    'todos/deleteTodoTask',
    async (id: number, thunkAPI) => {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            return id;
        } catch (e) {
            return thunkAPI.rejectWithValue(`Cannot delete note. ${e}`);
        }
    }
);


export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
            //Fetch all todos
            .addCase(fetchTodoTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodoTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks= action.payload;
            })
            .addCase(fetchTodoTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            //Create
            .addCase(createTodoTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTodoTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.unshift(action.payload);
            })
            .addCase(createTodoTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateTodoTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTodoTask.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.tasks.findIndex(n => n.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTodoTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete todos
            .addCase(deleteTodoTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTodoTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter(n => n.id !== action.payload);
            })
            .addCase(deleteTodoTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})


export default todoSlice.reducer;
