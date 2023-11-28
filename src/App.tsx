import './global.css';
import styles from './App.module.css';
import logoTodo from './assets/logo-todo.svg';
import {PlusCircle} from "phosphor-react";
import {TaskTable} from "./components/TaskTable.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import {v4 as uuidv4} from 'uuid';

export interface ITask {
    id: string,
    text: string,
    isChecked: boolean;
}

function App() {
    const [task, setTask] = useState('');
    const [tasks, setNewTask] = useState<ITask[]>([]);

    function handleChangeTask(e: ChangeEvent<HTMLInputElement>) {
        setTask(e.target.value);
    }

    function handleTheCreationOfNewTasks(e: FormEvent) {
        e.preventDefault();

        const newTask: ITask = {
            id: uuidv4(),
            text: task,
            isChecked: false
        };

        setNewTask([...tasks, newTask])
        setTask('');
    }

    function handleToggleTask(data: { id: string, value: boolean }) {
        const updatedTasks = tasks.map((task) => {
            if (task.id === data.id) {
                return {...task, isChecked: data.value}
            }

            return {...task}
        })

        setNewTask(updatedTasks)
    }

    function handleDeleteTask(id: string) {
        const newTasks = tasks.filter(task => {
            return task.id !== id;
        })

        setNewTask(newTasks);
    }

    return (
        <main>
            <header className={styles.header}>
                <img src={logoTodo} alt="Logo do projeto"/>
            </header>
            <div className={styles.wrapper}>
                <form onSubmit={handleTheCreationOfNewTasks}>
                    <input type="text" required placeholder="Adicione uma nova tarefa" value={task}
                           onChange={handleChangeTask}/>
                    <button>
                        Criar <PlusCircle size={20}/>
                    </button>
                </form>
                <TaskTable tasks={tasks} toggleTaskStatus={handleToggleTask} removeTask={handleDeleteTask}/>
            </div>
        </main>

    )
}

export default App
