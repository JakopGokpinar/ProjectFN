import React from 'react';

class PropertyAnnonce extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div>
                <h3>Property Annonce Page!</h3>
            </div>
        )
    };
}

export const property = {
    name: "enebolig",
    id: 4325,
    subs: [
        {title : "kiralik", desc: "kiralik ev"},
        {title : "satilik", desc: "satilik ev"},
        {title : "komple", desc: "komple ev"},
    ]
}

export default PropertyAnnonce;