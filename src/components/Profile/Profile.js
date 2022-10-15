import React from 'react';
import { DateTime } from "luxon";
import './Profile.css'
import makeApiCall from '../../utils/makeApiCall';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

class Profile extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            updatedName: '',
            updatedAge: '',
            updatedPet: ''
        }
    }

    onNameChange = (event) => {
        this.setState({updatedName: event.target.value})
    }
    onAgeChange = (event) => {
        this.setState({updatedAge: event.target.value})
    }
    onPetChange = (event) => {
        this.setState({updatedPet: event.target.value})
    }

    onSubmitProfileUpdate = (id) => {
        console.log(this.state)
        let { updatedName, updatedAge, updatedPet } = this.state

        const token = window.sessionStorage.getItem('token')
        if (!updatedName && !updatedAge && !updatedPet) {
            return alert("No changes found - please update at least 1 field")
        }

        makeApiCall('post',`profile/${id}`, token, {
            name: updatedName,
            age: updatedAge,
            pet: updatedPet
        })
        .then(response => response.json())
        .then(user => {
            console.log("Profile update response data -", user)
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
                alert('Profile updated!')
            } else {
                return alert(user)
            }
        })
    }

    render() {
        const { isProfileOpen, toggleModal, activeUser } = this.props
        const { id, name, entries, age, pet, joined } = activeUser
        const joinDate = DateTime.fromISO(joined)
        return (
            <div className='profile-modal'>
                <main className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                <article className="pa4 black-80 w-80">
                    <img
                        src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                        className="br-100 ba h3 w3 dib" alt="avatar" />
                    <h1>{name}</h1>
                    <h4>Images Submitted: {entries}</h4>
                    <p>Member since: <br />
                    {joinDate.toLocaleString(DateTime.DATETIME_MED)} ({joinDate.toRelative()})</p>
                    <hr />
                    <label className="mt2 db fw6 lh-copy f6" htmlFor="user-name">Name</label>
                    <input 
                        onChange={this.onNameChange}
                        className="pa2 ba w-100" 
                        type="text" name="user-name"  id="name" placeholder={name}/>
                    <label className="mt2 db fw6 lh-copy f6" htmlFor="age">Age</label>
                    <input
                        onChange={this.onAgeChange} 
                        className="pa2 ba w-100" 
                        type="text" name="age"  id="age" placeholder={age ? age : 'e.g. 24'}/>
                    <label className="mt2 db fw6 lh-copy f6" htmlFor="pet">Pet</label>
                    <input 
                        onChange={this.onPetChange}
                        className="pa2 ba w-100" 
                        type="text" name="pet"  id="pet" placeholder={pet ? pet : 'e.g. Dragon'}/>
                    <div className='mt4' style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                        <button 
                            onClick={() => this.onSubmitProfileUpdate(id)}
                            className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'>
                                Save
                        </button>
                        <button 
                            className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
                            onClick={toggleModal}>
                            Cancel
                        </button>
                    </div>
                </article>
                <div className='modal-close' onClick={toggleModal}>
                    &times;
                </div>
                </main>
            </div>
        )
    }
}

export default Profile