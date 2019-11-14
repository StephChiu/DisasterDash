import React, { useEffect, useState } from 'react'

//Note the <React.Fragment> it's utilized instead of a <div>
// this allows for multiple items to be part of the render without the surrounding "holder" to be rendered in too
//because they're not rendered, we can't style them, so all selectors have to be initiated on our parent component

//this message component was built for the purpose of having an internal messaging board
//this could be tied to authentication for identification

const Messages = (props) => {
    //This hook was built to receive and show messages
    const [messages, setMessages]= useState([])
    //this hook was built to take in user input and utilize it to show messages sent
    // const [input, setInput]= useState('')

    const displayMessages = messages.map((msg, i) => {
        return <p key={i}>{msg}</p>;
    })

    //use effects mimics lifecycle methods, the second parameter being an empty array mimics componentDidMount
    useEffect(() => {
        socket.on('chat', (data) => {
            console.log(data.message);
            setMessages([data.message].concat(messages))
            console.log('msgs -> ', messages);
        });
    })

    //hooks are simplified by making methods with hooks built into them
    //Think of the method that is paired in the hook ('setInput') here as another form of this.setState
    // const handleType = e => {
    //     setInput(e.target.value)
    // };

    const handleClick = () => {        
        socket.emit('chat', {
            message: message.value
        })
    }

    return ( 
        <React.Fragment>
            <div id="input-field">
                <input id="message" type="text" placeholder="Enter message here" autoComplete="off"/>
                <input id="send" type="button" value="Send" onClick={handleClick} />
            </div>
            {displayMessages}
        </React.Fragment>
        
     );
}
 
export default Messages;