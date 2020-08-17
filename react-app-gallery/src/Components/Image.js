import React from 'react';

//provides the individual images to the photo componant
const Image = props => (
  <li>
    <img src={`https:farm${props.farm}.staticflickr.com/${props.server}/${props.id}_${props.secret}.jpg`} alt=""/>
  </li>
);

export default Image;