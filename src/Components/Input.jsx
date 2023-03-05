import { useState } from 'react';

const Input = ({handleSubmit}) => {
    const [message, setMessage] = useState('');

    const onChange = (e) => {
      setMessage(e.target.value);
  }

  const onSubmit = (e) => {
      e.preventDefault();
      setMessage('')
      handleSubmit(message);
  }
    
    return(
      
        <form className='input-form' onSubmit={onSubmit}>
            <input className='message-input' onChange={onChange} value={message} type='text' placeholder='Unesite vašu poruku:' autoFocus={true}/>
            <button type='submit' className='add-btn'>Send</button>
        </form>
    );
}
 
export default Input;




