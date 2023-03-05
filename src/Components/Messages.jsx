import React from 'react';

const Messages = ({messages, currentUser}) => {

    const renderMessage = (message, index) => {
        const {text, member} = message;
        const myMessage = member.id === currentUser.id;
        const className = myMessage ?
        'Messages-message currentMember' : 'Messages-message';
        return (
            <li key={index} className={className}>
                <span 
                    className='avatar' 
                    style={{backgroundColor: member.clientData.color}} >
                       
                </span>
                <div className='Message-content'>
                    <div className='username'>{member.clientData.username}</div>
                    <div className='text'>{text}</div>
                </div>
            </li>
        );
    }

    return(
        <ul className='Messages-list'>
            {
                messages.map((message, index) => (
                  renderMessage(message, index)
                ))
            }
        </ul>
    );
}

export default Messages;