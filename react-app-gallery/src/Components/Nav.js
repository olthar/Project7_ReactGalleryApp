import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

const Nav = (props) => {
 //Dynamically labeled buttons reflecting the current three topics
    let threeTopics = Object.keys(props.images)
   
    return(    
        <React.Fragment>
            <nav className="main-nav">
                <ul>
                    <li><NavLink to={`/photo/${threeTopics[0]}`}>{threeTopics[0]}</NavLink></li>
                    <li><NavLink to={`/photo/${threeTopics[1]}`}>{threeTopics[1]}</NavLink></li>
                    <li><NavLink to={`/photo/${threeTopics[2]}`}>{threeTopics[2]}</NavLink></li>
                </ul>
            </nav>
        </React.Fragment>
   )
}

export default withRouter(Nav);