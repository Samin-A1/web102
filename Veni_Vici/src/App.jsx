import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [catData, setCatData] = useState({
    image: '',
    origin: '',
    weight: '',
    life_span: ''
  });

  const [banned, setBanned] = useState([]);
  const [discoveredCats, setDiscoveredCats] = useState([]);

  const APIKey = 'live_6QQ05SYtYbsBR5ZKGSnOLSuVEhUm9VM0b6zVkYcieRgoRENtotvZkCoECBIDrZ8R'
  const URL = `https://api.thecatapi.com/v1/breeds?api_key=live_6QQ05SYtYbsBR5ZKGSnOLSuVEhUm9VM0b6zVkYcieRgoRENtotvZkCoECBIDrZ8R`;

  const fetchCatData = () => {
    fetch(URL)
    .then(response => response.json())
    .then(data => {
      const filteredCats = data.filter(cat => {
        return !banned.some(descriptor => {
          return cat.origin.toLowerCase().includes(descriptor.toLowerCase()) ||
                 cat.weight.metric.toLowerCase().includes(descriptor.toLowerCase()) ||
                 cat.life_span.toLowerCase().includes(descriptor.toLowerCase())
        });
      });
      if (filteredCats.length > 0) {
        const index = Math.floor(Math.random() * filteredCats.length);
        const newCat = {
          name: filteredCats[index].name,
          image: filteredCats[index].image.url,
          origin: filteredCats[index].origin,
          weight: filteredCats[index].weight.metric,
          life_span: filteredCats[index].life_span
        };
        setCatData(newCat);
        setDiscoveredCats(prevCats => [...prevCats, newCat]);
      }
    })
    .catch(error => console.error(error));
  };

  const randomCat = () => {
    fetchCatData();
  }

  const banDescriptor = (descriptor) => {
    setBanned([...banned, descriptor]);
  }

  return (
    <>
    <div className='main-container'>
      
      <div className='seen-list'>
        <h2>Discovered:</h2>
        {discoveredCats.map((cat, index) => (
          <div key={index}>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      <div className='random'>
        <h1>Cat Randomizer!</h1>
        <h3>Explore and discover some new cats!</h3>
        <h2>{catData.name}</h2>
        
        <div className='cat-info'>
          <div className='image-container'>
            <img className='image' src={catData.image} alt='Cat' />
          </div>

          <h3>Click a descriptor if you don't want to see it again!</h3>
          {catData.origin && (
            <button onClick={() => banDescriptor(catData.origin)}>Origin: {catData.origin}</button>
          )}
          {catData.weight && (
            <button onClick={() => banDescriptor(catData.weight)}>Weight: {catData.weight}</button>
          )}
          {catData.life_span && (
            <button onClick={() => banDescriptor(catData.life_span)}>Life Span: {catData.life_span}</button>
          )}
        </div>
        
        <button onClick={randomCat}>🔀 Discover!</button>

      </div>

      <div className='ban-list'>
        <h2>Banned:</h2>
        {banned.map((descriptor, index) => (
          <p key={index}>{descriptor}</p>
        ))}
      </div>
    </div>
    </>
  )
}

export default App
