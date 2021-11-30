import React from 'react'
import Discover from '../components/Discover'
import Navbar from '../components/Navbar'
import Scroll from '../components/Scroll'

const DiscoverPage = () => {
    return (
        <>
        <Navbar />  
            <Discover />
            <Scroll showBelow={250} />
        </>
    )
}

export default DiscoverPage
