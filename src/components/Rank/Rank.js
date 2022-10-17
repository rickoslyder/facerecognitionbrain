/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import makeExtCall from '../../utils/makeExtCall'
// import './ImageLinkForm.css'

class Rank extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emoji: ''
        }
    }

    generateEmoji = (entries) => {
        makeExtCall('get',`https://6xqrukjaua.execute-api.us-east-1.amazonaws.com/rankHandler/emoji?rank=${entries}`)
            .then(resp => resp.json())
            .then(data => this.setState( { emoji: data.input }))
            .catch(console.log)
    }

    componentDidMount() {
        this.generateEmoji(this.props.entries) 
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.entries === this.props.entries && prevProps.name === this.props.name) {
            return null
        }
        this.generateEmoji(this.props.entries);
    }

    render() {
        const { name, entries } = this.props
        console.log("Rendering rank - user", name, "has", entries, "entries")
        return (
            <div>
                <div className='white f3 fw8'>
                {`${name}, your current entry count is...`} 
                </div>
                <div className='white f1 fw9'>
                {`${entries} ${this.state.emoji}`} 
                </div>
            </div>
        )
    }
}

export default Rank;