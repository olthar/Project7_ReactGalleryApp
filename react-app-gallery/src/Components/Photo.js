import React from 'react';
import Image from './Image'
import NoResults from './NoResults'

const Photo = (props) => {
//Topic is taken from the url
  let topic = (props.match.params.searchURL)
  let results;
  let photos;

//If the URL Parameter is in base three topics, it passes in those to results
  (props.images[topic])
  ? results = props.images[topic]
  // If not, results is given the related search images
  : results = props.search.results;

  //if there are photos, these are mapped through the image component
  if (results.length > 0){
    photos = results.map( photo => 
    <Image
      farm={photo.farm} 
      server={photo.server}
      id={photo.id}
      secret={photo.secret}
      key={photo.id}
    />
  ) 
  //Else no results will be displayed
} else {
  topic = ""
  photos = <NoResults />  
};

  return(
    <div className="photo-container">
      {/* <h2 >{word}</h2> */}
      <h2 >{topic}</h2>
        <ul>
          {photos}
        </ul>
    </div>
    );
}
  
  export default Photo;