import React, {Component} from 'react'

//component that needs a link in its props
//component renders the link's description and url
class Link extends Component {
    render(){
        return(
            <div>
                <div>
                    {this.props.link.description} ({this.props.link.url})
                </div>
            </div>
        )
    }
}

export default Link