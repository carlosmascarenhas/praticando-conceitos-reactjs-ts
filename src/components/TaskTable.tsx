import styles from './TaskTable.module.css';
import {ClipboardText} from "phosphor-react";
import {TaskRow} from "./TaskRow.tsx";
import {ITask} from "../App.tsx";

interface Props {
    tasks: ITask[],
    toggleTaskStatus: ({id, value}: { id: string, value: boolean }) => void,
    removeTask: (id: string) => void
}

export function TaskTable({tasks, toggleTaskStatus, removeTask}: Props) {

    function handleToggleTask(data: { id: string, value: boolean }) {
        toggleTaskStatus(data)
    }

    function handleRemoveTask(id: string) {
        removeTask(id)
    }

    const tasksDone = tasks.filter(task => {
        return task.isChecked;
    })

    return (
        <>
            <article className={styles.article}>
                <header>
                    <p className={styles.created}>
                        Tarefas criadas
                        <span>{tasks.length}</span>
                    </p>

                    <p className={styles.done}>
                        Concluídas
                        <span>{`${tasksDone.length} de ${tasks.length}`}</span>
                    </p>
                </header>

                {
                    tasks.length > 0
                        ?
                        tasks.map(task => {
                            return <TaskRow
                                key={task.id}
                                id={task.id}
                                text={task.text}
                                isChecked={task.isChecked}
                                removeTask={handleRemoveTask}
                                toggleTaskStatus={handleToggleTask}
                            />
                        })
                        :
                        <div className={styles.empty}>
                            <ClipboardText size={100}/>
                            <p>Você ainda não tem tarefas
                                cadastradas<span>Crie tarefas e organize seus itens a fazer</span></p>
                        </div>
                }
            </article>
        </>

    )
}