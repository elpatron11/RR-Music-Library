import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'

function ArtistView(){
    const {id} =useParams()
    const [artistData, setaArtistData] = useState([])

    return(
        <div>
            <h2>Id ={id}</h2>
            <p>Artist data</p>

        </div>

    )
}

export default ArtistView