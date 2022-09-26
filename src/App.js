import './App.css';
import { useEffect, useState } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import {BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom'
import about from './components/about'
import other from './components/other'
import ArtistView from './components/ArtistView';
import { Fragment } from 'react/cjs/react.production.min';

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')

  useEffect(() => {
    if (searchTerm) {
      document.title=`${searchTerm} Music`
      const fetchData = async () => {
        const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}`)
        const resData = await response.json()
        if(resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
  }
  }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  return (
    <div className="App">
       {message}
      <Router>
            <div className='navBar'>
       
       <ul>
         <li><Link to= "/">Home</Link></li>
        <li><Link to= "/about">About</Link></li>
        <li><Link to= "/other">Other</Link></li>

       </ul>
       </div>
        <div className="display">
            <Routes>
                <Route path="/" element={
                  <Fragment>
                  <SearchBar handleSearch={handleSearch} />
                  <Gallery data={data} />
                  </Fragment>
                }/>
                <Route path="/artist/:id" element={<ArtistView />} />
                <Route path="/about" element={<about />} />
                <Route path="/other" element={<other />} />
            </Routes>
        </div>
    
      </Router>
    </div>
  );
}

export default App;