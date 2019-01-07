import React, {Component} from 'react';
import './App.css';
import TextArea from '../components/TextArea';
import Button from '../components/Button';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            message: ""
        };

        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.getConference = this.getConference.bind(this);
    }

    handleTextArea(e) {
        console.log("Inside handleTextArea");
        let value = e.target.value;
        this.setState(
            prevState => ({
                value: value
            }),
            () => console.log(this.state.value)
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        let conferenceData = this.state.value;

        fetch("https://conferance-organizer-api.herokuapp.com/conferences", {
            method: "POST",
            body: JSON.stringify(conferenceData),
            headers: {"Content-Type": "text/plain"}
        })
            .then(response => { response.json()})
            .then(data => { console.log("Successful" + data) });
    }

    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            value: ""
        });
    }

    getConference(event) {
        event.preventDefault();
        fetch("https://conferance-organizer-api.herokuapp.com/conferences")
            .then(response => response.json())
            .then(result => console.log("==> Result"))
            .catch(error => console.log("==> Error: ",error))
    }

    render() {
        return (
            <div className="app col-md-6">
                <h3>Conference Form</h3>
                <form className="container-fluid" onSubmit={this.handleSubmit}>
                    <TextArea
                        title={"Conference List"}
                        rows={10}
                        value={this.state.textValue}
                        name={"currentPetInfo"}
                        handleChange={this.handleTextArea}
                        placeholder={"Please entire your presentation name and duration "}
                    />
                    <Button
                        action={this.handleFormSubmit}
                        type={"primary"}
                        title={"Submit"}
                        style={buttonStyle}
                    />{" "}
                    <Button
                        action={this.handleClearForm}
                        type={"secondary"}
                        title={"Clear"}
                        style={buttonStyle}
                    />{" "}
                    <Button
                        action={this.getConference}
                        type={"primary"}
                        title={"Call"}
                        style={buttonStyle}
                    />{" "}
                </form>
            </div>
        );
    }
}

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};

export default App;
