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
    // unecessasry useRef just to get
    let ymap = doc.current.getMap('my map type')
    // flag to avoid the double useEffect call
    const flag = useRef(true)

    // Initialize the WebRTC connection
    function initWebrtcProvider(ydoc) {
        // Example of a static room name.
        // const roomName = 'testTodo01'
        const roomName = uuidv4()
        new WebrtcProvider(roomName, ydoc)
    }

    // mocking initial data
    function initMockData() {
        for (const [key, value] of Object.entries(todosMockDataHash)) {
            ymap.set(key, value)
        }
    }

    function getAllTodos(todosMap) {
        const tododoArray = []
        for (const value of todosMap.values()) {
            tododoArray.push(value)
        }
        return tododoArray
    }

    useEffect(() => {
        /*
        Yjs doesn't return a reference to the yjs observe handle,
        so we need a flag for the unsubscribe function
        Note that ymap has a property _eH which maps the subscriptions 
        and might be the prefered approach in this case
        */
        let observer

        if (flag.current) {
            ymap.observe((YEvent) => {
                observer = false
                const tododoArray = getAllTodos(ymap)
                setTodos(tododoArray)
            })
            initWebrtcProvider(doc.current)
            initMockData()
            flag.current = false
        }

        return () => {
            if (observer) ymap.unobserve()
        }
    }, [])

    // TODO: Refactor to a much more simple algorithm
    const addOrUpdateItemOnClick = async (item) => {
        let newTodo
        if (item.id) {
            try {
                const editedTodo = {
                    ...item,
                    editing: false,
                    updatedAt: new Date().toISOString(),
                }
                ymap.set(item.id, editedTodo)
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
            ymap.set(newTodo.id, newTodo)
        }
    }

    const toggleItem = (todo) => {
        const toggledTodo = {
            ...todo,
            state: !todo.state,
            updatedAt: new Date().toISOString(),
        }
        ymap.set(toggledTodo.id, toggledTodo)
    }

    const removeItem = (id) => {
        ymap.delete(id)
    }

    const editItem = (todo) => {
        const editedTodo = {
            ...todo,
            editing: true,
            updatedAt: new Date().toISOString(),
        }
        ymap.set(todo.id, editedTodo)
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
