import React, {Component} from 'react';
import './App.css';
import TextArea from '../components/TextArea';
import Button from '../components/Button';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            message: '',
            page: 'form',
            trackList: ''
        };

        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.getConference = this.getConference.bind(this);
        this.returnForm = this.returnForm.bind(this);
    }

    handleTextArea(e) {
        let value = e.target.value;
        this.setState(
            prevState => ({
                value: value
            })
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        let conferenceData = this.state.value;

        fetch("http://localhost:8080/conferences", {
            method: "POST",
            body: conferenceData,
            headers: {
                "Content-Type": "text/plain"
            }
        })
    }

    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            value: ''
        });
    }

    async getConference(event) {
        event.preventDefault();
        await fetch("http://localhost:8080/conferences")
            .then(response => response.json().then(body => this.setState({
                page: "tracklist",
                trackList: body.trackList
            })))
            .catch(error => console.log("==> Error: ", error));
    }

    formHtml() {
        return (
            <div>
                <h4 style={{display: "inline-block"}}>Conference List</h4>
                <Button
                    action={this.getConference}
                    type={"primary"}
                    title={"Show TrackList"}
                    style={buttonStyle2}
                />{" "}
                <form className="container-fluid" onSubmit={this.handleSubmit}>
                    <TextArea
                        title={""}
                        rows={10}
                        value={this.state.value}
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
                        type={"primary"}
                        title={"Clear"}
                        style={buttonStyle}
                    />{" "}
                </form>
            </div>
        )
    }

    returnForm(e) {
        e.preventDefault();
        this.setState({
            page: "form",
            value: ''
        })
    }

    trackList() {
        const {trackList} = this.state;
        return (
            <div>
                <div style={{paddingBottom: "10px"}}>
                    <Button
                        action={this.returnForm}
                        type={"primary"}
                        title={"Return Form"}
                        style={buttonStyle2}
                    />{" "}
                </div>
                {trackList.map((item, key) => (
                    <div key={key}>
                        <h4>{item.name}:</h4>
                        <ul className="list-group">
                            {item.morningEventList.map((m, i) => (
                                <li key={i} className="list-group-item">{m.startTime} {m.name} {m.duration + "min"}</li>
                            ))}
                            <li className="list-group-item">{"12:00PM Lunch"}</li>
                            {item.afternoonEventList.map((m, i) => (
                                <li key={i} className="list-group-item">{m.startTime} {m.name} {m.duration + "min"}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        )
    }

    render() {
        return (
            <div className="app col-md-6">
                <h3>Conference Organizer</h3>
                {this.state.page === "form" ? this.formHtml() : this.trackList()}
            </div>
        );
    }
}

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};

const buttonStyle2 = {
    margin: "10px 10px 10px 10px",
    float: "right",
};

export default App;
