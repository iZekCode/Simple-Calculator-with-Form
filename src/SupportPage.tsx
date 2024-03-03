import React from "react";
import { ISupportPageProps, ISupportPageState } from "./ISupportPage";
import './SupportPage.css';

class SupportPage extends React.Component<ISupportPageProps, ISupportPageState> {
    constructor(props: any){
        super(props);
        this.state = {
          firstName: "",
          lastName: "",
          email: "",
          topic: "",
          description: "",
          ticketIsSent: false,
          ticketNumber: 0,
          isFetching: false
        };
    }

    handleChange = (e: any) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }
    
    handleSubmit = () => {
        const { firstName, lastName, email, topic, description } = this.state;

        const formData = {
            firstName,
            lastName,
            email,
            topic,
            description,
        };

        const apiUrl = "https://jsonplaceholder.typicode.com/posts";

        this.setState({ isFetching: true });

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                this.switchTicketPage();
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to Send!");
        })
        .finally(() => {
            this.setState({ isFetching: false });
        });
    }

    switchTicketPage = () => {
        const number = Math.floor(Math.random() * 9999);
        this.setState({
            ticketIsSent: true,
            ticketNumber: number
        });
    }

    render() {
        let activePage;
        const {firstName, lastName, email, topic, isFetching} = this.state;
        const enabled = firstName.length > 0 && lastName.length > 0 && email.length > 0 && topic.length > 0

        if (this.state.ticketIsSent) {
            activePage = 
                            <div className="form-is-sent">
                                <p>Thank you for sending us your report, we will track the problem now</p>
                                <div>ticket number: <span>{this.state.ticketNumber}</span></div>
                            </div>
            ;
        } 
        else {
            activePage = 
                            <div className="form-not-send">
                                <div className="main-form">
                                    <div className="left-form">
                                        <label>Name<span>*</span></label>
                                        <br />
                                        <div className="name-section">
                                            <div className="name-section-left">
                                                <input type="text" value={this.state.firstName} name="firstName" onChange={this.handleChange} required/>
                                                <label>First</label>
                                            </div>
                                            <div className="name-section-right">
                                                <input type="text" value={this.state.lastName} name="lastName" onChange={this.handleChange} required/>
                                                <label>Last</label>
                                            </div>
                                        </div>
                                        <label>Email<span>*</span></label>
                                        <br />
                                        <input type="text" className="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                                        <br />
                                        <label>Topic<span>*</span></label>
                                        <div className="topic-section">
                                            <p>What can we help you today?</p>
                                            <input type="radio" name="topic" value="General" onChange={this.handleChange} required/>General
                                            <br />
                                            <input type="radio" name="topic" value="Bug" onChange={this.handleChange}/>Bug
                                        </div>
                                    </div>
                                    <div className="right-form">
                                        <label>Description<sup>optional</sup></label>
                                        <br />
                                        <textarea placeholder="Description Report" value={this.state.description} name="description" onChange={this.handleChange}></textarea>
                                    </div>
                                </div>
                                <div className="submit">
                                    <button disabled={!enabled || isFetching} onClick={() => this.handleSubmit()}>
                                        {isFetching ? "Sending..." : "SEND"}
                                    </button>
                                </div>
                            </div>
            ;
        }
        return (
            <div className="SupportPage">
                <form >
                    <div className="form-title">
                        <p>Support Ticket Form</p>
                    </div>
                    {activePage}
                </form>
            </div>
        )
    }
}

export default SupportPage;