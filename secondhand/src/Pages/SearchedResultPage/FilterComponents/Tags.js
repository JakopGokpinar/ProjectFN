import './Tags.css';
import { useState } from 'react';

function Tags(props) {

    return(
        <div className="filterTagsContainer">
            <span id="tag" onClick={() => props.removeTag(props.tag.key)}>
                {props.tag.key}
            </span>
          </div>
    )
}

export default Tags;