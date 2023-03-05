import './App.css';
import Input from './Components/Input';
import { Component } from 'react';
import Messages from './Components/Messages';

  const randomName = () => {
    const randomNames = ['Aviana', 'Reyna', 'Luella', 'Walter', 'Mariah', 'Foster', 'Rylan', 'Izaiah', 'Avianna', 'Eddie', 'Raelynn', 'Louis', 'Thea', 'Gary', 'Ivory', 'Heath', 'Joyce', 'Roger', 'Alaya', 'Ben', 'Remy', 'Jacoby', 'Amy', 'Emmanuel', 'Kenia', 'Russell', 'Connor', 'Celine', 'Alvin', 'Stella', 'Memphis', 'Elise', 'Jamison', 'Ivanna', 'Zakai', 'Jolene', 'Sutton', 'Sky', 'Wayne'];
    const randomSurnames = ['Mcneil', 'Keller', 'Atkinson', 'Burton', 'Warren', 'Henderson', 'Monroe', 'Mathis', 'Harris', 'Levine', 'Boyd', 'Crawford', 'Leon', 'Kim', 'Moody', 'Bautista', 'Young', 'Acosta', 'Mercado', 'Sloan', 'Howell', 'Powers', 'Sanders', 'Friedman', 'Fitzgerald', 'Ellis', 'Bradley', 'Branch', 'Middleton', 'Cameron', 'Collins', 'Shelton', 'Decker', 'Carr', 'Contreras', 'Cervantes', 'Patrick', 'Woodward', 'Jensen', 'Williamson'];
    const names = randomNames[Math.floor(Math.random() * randomNames.length)];
    const surnames = randomSurnames[Math.floor(Math.random() * randomSurnames.length)];
    return names + " " + surnames;
  }

  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    }
  }

  constructor() {
    super();
      this.drone = new window.Scaledrone('0f2lC0beWOHej42N', {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const {member} = this.state;
      member.id = this.drone.clientId;
      this.setState({member: member});
    });
    const room = this.drone.subscribe('observable-room');
    room.on('data', (message, member) => {
      const {messages} = this.state;
      messages.push({
        text: message, 
        member: member});
      this.setState({messages});
    })
  }

  render() {
    const {messages, member} = this.state;
    return(
      <div className='App'>
        <h2>Završni rad - ChatApp</h2>
        <Messages messages={messages} currentUser={member}/>
        <Input handleSubmit={this.onSendMessage}/>
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: 'observable-room',
      message: message
    });
  }
}
