import styles from './TaskRow.module.css';
import {Check, Trash} from "phosphor-react";

interface Props {
    id: string,
    text: string,
    isChecked: boolean
    toggleTaskStatus: ({id, value}: { id: string, value: boolean }) => void,
    removeTask: (id: string) => void
}

export function TaskRow({id, text, isChecked, toggleTaskStatus, removeTask}: Props) {

    const checkBoxStyle = isChecked ? styles.checked : styles.unchecked;
    const paragraphStyle = isChecked ? styles.paragraphChecked : styles.paragraphUnchecked;

    return (
        <div className={styles.row}>
            <label onClick={() => toggleTaskStatus({id, value:!isChecked})} htmlFor="checkbox">
                <input type="checkbox"/>
                <span className={checkBoxStyle}>
                    {isChecked ? <Check size={12}/> : null}
                </span>
            </label>
            <p className={paragraphStyle}>{text}</p>
            <button onClick={() => removeTask(id)}><Trash size={16}/></button>
        </div>
    )
}