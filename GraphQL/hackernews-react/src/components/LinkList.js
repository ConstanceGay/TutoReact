import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

//constant that stores the query
//the gql function parses the plain string that contains the GraphQL code
const FEED_QUERY = gql`
    {
        feed {
            links{
                id
                createdAt
                url
                description
            }
        }
    }
`

class LinkList extends Component {
    render() {
        return (
            //sends query to retrieve feed
            <Query query={FEED_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    //constant tab containing the links from the feed
                    const linksToRender = data.feed.links

                    return (
                        <div>
                            {linksToRender.map(link => <Link key={link.id} link={link} />)}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default LinkList