import React, { Component } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

class ProfileIcon extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this)
        this.state = {
            dropdownOpen: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    } 

    render() {
    return (
        <div className="pa4 tc">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} direction={this.direction}>
            <DropdownToggle>
                <img
                    src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                    className="br-100 ba h3 w3 dib" alt="avatar" />
            </DropdownToggle>
            <DropdownMenu>
            <DropdownItem header>Account</DropdownItem>
            <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
            <DropdownItem onClick={() => this.props.onRouteChange('signout')}>Sign Out</DropdownItem>
            <DropdownItem divider />
            <DropdownItem text style={{fontSize: "0.75rem"}}><i>More options coming soon!</i></DropdownItem>
            </DropdownMenu>
        </Dropdown>
        </div>
    )
    }
}

export default ProfileIcon