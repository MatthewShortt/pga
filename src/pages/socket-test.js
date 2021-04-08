import React, { useEffect, useRef, useState } from 'react';
import { io }               from 'socket.io-client';
import axios                from 'axios';
// const socket = io('ws://localhost:4000');

export default function SocketTest() {


    // axios.get('http://localhost:9000/api/users')
    const [chat, setChat] = useState([]);
    const [golfers, setGolfers] = useState([]);
    const socketRef = useRef({});

    useEffect(async () => {
        socketRef.current = io('ws://localhost:4000');
        socketRef.current.on('connect', () => {
            console.log(socketRef.current.connected); // true
        });
        socketRef.current.on('disconnect', () => {
            console.log(socketRef.current.connected); // false
        });
        socketRef.current.on('chat', ({handle, message}) => {
            setChat(chat.concat({handle, message}))
        });
        socketRef.current.on('golfers', (data) => {
            console.log('golfers', data);
        })
        socketRef.current.emit('golfers');

        return () => {
            socketRef.current.disconnect();
        };
    }, [])


    const emitEvent = (event) => {
        event.preventDefault();
        // socket.emit('chat', {
        //     handle: event.target.elements[0].value,
        //     message: event.target.elements[1].value
        // })
    }

    return (
        <div>
            <h1>Chat</h1>
            {chat.map(({handle, message}, i) => (
                <>
                    <p><strong>{handle}: </strong> {message}</p>
                </>
            ))}
            <form onSubmit={emitEvent}>
                <label>
                    Handle:
                    <input
                        name="handle"
                        type="text"
                        placeholder='name'
                        required />
                </label>
                <br/>
                <label>
                    Message:
                    <input
                        name="message"
                        type="text"
                        placeholder='message'
                        required />
                </label>
                <br/>
                <button className='uk-button' type='submit'>Emit</button>
            </form>
        </div>
    )
}
