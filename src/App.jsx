import './App.css'
import AddItem from './components/AddItem'
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from 'react'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'
import { todosMockDataHash } from './data/data'

function App() {
    const doc = useRef(new Y.Doc())
    const [todos, setTodos] = useState([])
    const [editTodo, setEditTodo] = useState()
    let dbTodos = useRef(doc.current.getMap('my map type'))

    useEffect(() => {
        new WebrtcProvider(uuidv4(), doc.current)

        for (const [key, value] of Object.entries(todosMockDataHash)) {
            dbTodos.current.set(key, value)
        }
        dbTodos.current.observe((YEvent) => {
            const tododoArray = []
            for (const value of dbTodos.current.values()) {
                tododoArray.push(value)
            }
            setTodos(tododoArray)
        })
    }, [])

    const addOrUpdateItemOnClick = async (item) => {
        let newTodo
        if (item.id) {
            try {
                const editedTodo = {
                    ...item,
                    editing: false,
                    updatedAt: new Date().toISOString(),
                }
                dbTodos.current.set(item.id, editedTodo)
            } catch (error) {
                console.log('error ', error)
            }
        } else if (item.title) {
            newTodo = {
                title: item.title,
                state: false,
                id: uuidv4(),
                editing: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
            const tempDoc = dbTodos.current.set(newTodo.id, newTodo)

            tempDoc.save()
        }
    }

    const toggleItem = (todo) => {
        const toggledTodo = {
            ...todo,
            state: !todo.state,
            updatedAt: new Date().toISOString(),
        }
        dbTodos.current.set(toggledTodo.id, toggledTodo)
    }

    const removeItem = (id) => {
        dbTodos.current.delete(id)
    }

    const editItem = (todo) => {
        const editedTodo = {
            ...todo,
            editing: true,
            updatedAt: new Date().toISOString(),
        }
        dbTodos.current.set(todo.id, editedTodo)
        setEditTodo(todo)
    }

    return (
        <>
            <ul>
                {todos.map(function (item) {
                    return (
                        <li key={item.id}>
                            <span className={item.state ? 'completed' : ''}>
                                <input
                                    type="checkbox"
                                    id={item.id}
                                    checked={item.state}
                                    onChange={() => toggleItem(item)}
                                />
                                <label htmlFor={item.id}> {item.title}</label>
                            </span>
                            <label>
                                <input
                                    type="button"
                                    className="delete"
                                    onClick={() => removeItem(item.id)}
                                />
                                <span className="label icon"></span>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    className="edit"
                                    checked={item.editing}
                                    onChange={() => editItem(item)}
                                />
                                <span className="label icon"></span>
                            </label>
                        </li>
                    )
                })}
            </ul>
            <br />
            <AddItem onClick={addOrUpdateItemOnClick} editTodo={editTodo} />
        </>
    )
}

export default App
