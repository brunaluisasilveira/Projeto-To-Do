import React, { useState, useEffect, FormEvent } from "react";
import styles from '../css/style-todo.module.css';

import { FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';

type Todo={
  name: string
  checked: boolean
  date: Date
}

function ToDoList() {
  
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(getToDos());
 

  function getToDos(){
    if(typeof window !== 'undefined'){
      return JSON.parse(localStorage.getItem('toDoList') || '[]') || []
    }
    return []
  }


  const today = new Date();
  const formattedDate = format(today, 'dd/MM/yyyy');
  // Date.textContent = formattedDate;


  function itemList(event:FormEvent<HTMLFormElement>) {
    event.preventDefault(); 

    if (!value) { 
      return
    };

    const setTodosToDos = ([...todos, {name:value, checked:false, date:new Date()}])
    setTodos(setTodosToDos);
    setValue(""); 
    
    localStorage.setItem('toDoList', JSON.stringify(setTodosToDos))
  }

  
  const removeToDo = React.useCallback((todoRemove:string) => {
    let newTodos = [...todos];
    const filtered = newTodos.filter(toDo => {
      return toDo.name !== todoRemove;
    });

    setTodos(filtered);
  }, [todos]);
  
  return (
    // <div className={styles.body}>
      <div className={styles.containerGlobal}>

        <div className={styles.title}>
        <h1 className={styles.h1}>ToDo List</h1>
        </div>

        <div className={styles.divForm}>
          <form className={styles.form} onSubmit={ itemList }>
            <input id="inputToDo" className={styles.input} type="text" value={value} onChange={event => setValue(event.target.value)} required/>
            <button className={styles.btn} type="submit">Adicionar</button>
          </form>
        </div>

        <div className={styles.divList}>
          <ul className={styles.ul}>
            {todos.map((todo, index) => (
              <li className={styles.li} key={index}>
                <input className={styles.checkbox} type="checkbox" name="" id="" />
                <p className={styles.paragrafo} >{todo.name}</p>
                <p id="formatData" className={styles.data}>{formattedDate}</p>
                <div className={styles.divExcluir}>
                  <p className={styles.excluir} onClick={e => removeToDo(todo.name)}> <FiTrash2/> </p> 
                  {/* <img src="../" alt=""  className={styles.excluir} onClick={e => removeToDo(todo.name)}/> */}
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    // </div>
  );

};

export default ToDoList;
