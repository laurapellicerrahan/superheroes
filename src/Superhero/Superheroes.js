import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Superhero from './Superhero.js';
import Header from './Header.js';
import hero from './comic.jpg';

const Superheroes = () => {
  const [superhero, setSuperhero] = useState([])
  const [showHero, setShowHero] = useState({});
  const [layerCreate, setLayerCreate] = useState(true);
  const [layerTitle, setLayerTitle] = useState(false);
  const [layerAll, setLayerAll] = useState(false);
  const [layerButton, setLayerButton] = useState(false);
  const [name, setName] = useState("");
  const [publisher, setPublisher] = useState("");
  const [alterego, setAlterego] = useState("");
  const [firstappearance, setFirstappearance] = useState("");
  const [image, setImage] = useState("");
  const [characters, setCharacters] = useState("");
  const [heroId, setHeroId] = useState(null);
  const [layerHero, setLayerHero] = useState(false);

  useEffect(() => {
    const getSuperhero = async () => {
      const respSuperhero = await axios.get('http://localhost:3003/superheroes');
      setSuperhero(respSuperhero.data);
      setHeroId(respSuperhero.data.id);
    }
    getSuperhero();
  }, []);

  const showOneHero = async (id) => {
    const response = await axios.get(`http://localhost:3003/superheroes/${id}`)
    setHeroId(response.data.id);
    setShowHero(response.data);
  }

  const createClick = () => {
    newHero();
    setLayerCreate(true);
    setLayerAll(false)
    window.location.reload();
  }

  const newHero = async () => {
    const payload = {
      name: name,
      publisher: publisher,
      alter_ego: alterego,
      first_appearance: firstappearance,
      image: image,
      characters: characters,
      heroId: heroId
    };
    const response = await axios.post("http://localhost:3003/superheroes", payload)
      ;
    if (response.status === 201) {
      let oldHeroes = superhero;
      oldHeroes.push(response.data);
      setSuperhero([...superhero, oldHeroes]);
    }
  };

  const deleteHero = async (id) => {
    const response = await axios.delete(`http://localhost:3003/superheroes/${id}`);
    if (response.status === 204) {
      let heroes = superhero.filter((hero) => hero.id !== id);
      setSuperhero(heroes)
    }
  };

  const dataHero = (id) => {
    let hero = superhero.filter(hero => hero.id === id)[0];
    setImage(hero.image);
    setName(hero.name);
    setPublisher(hero.publisher);
    setAlterego(hero.alterego);
    setFirstappearance(hero.firstappearance);
    setCharacters(hero.characters)
    setHeroId(hero.id)
  }

  const editClick = (id) => {
    dataHero(id);
    setLayerAll(true);
    setLayerCreate(true);
    setLayerButton(true);
    showOneHero(id);
  }

  const buttonClick = () => {
    setLayerCreate(!layerCreate);
    setLayerTitle(!layerTitle)
    setLayerAll(false)
  }

  const button2Click = () => {
    setLayerCreate(true);
    setLayerAll(false);
    setLayerButton(false)
  }

  const deleteClick = (id) => {
    setLayerHero(false)
    deleteHero(id)
  }

  const updateClick = (heroId) => {
    updateHero(heroId)
    setLayerAll(false);
    setLayerCreate(true);
    window.location.reload();
  }

  const updateHero = async (heroId) => {
    const payload = {
      name: name,
      publisher: publisher,
      alter_ego: alterego,
      first_appearance: firstappearance,
      image: image,
      characters: characters,
      heroId: heroId
    };
    console.log("payload", payload)
    const response = await axios.patch(`http://localhost:3003/superheroes/${heroId}`, payload);
    if (response.status === 204) {
      const editedHero = characters.filter((heroId) => editedHero.id !== heroId)
      editedHero.push(heroId)
      setSuperhero(editedHero)
    }
  }



  return (
    <div className='page' style={{ backgroundImage: `url(${hero})` }}>
      <div className='overlay'>

        <Header />

        {layerHero ? <div className='show-hero'>
          <Superhero
            name={showHero.name}
            image={showHero.image}
            publisher={showHero.publisher}
            alterego={showHero.alter_ego}
            firstappearance={showHero.first_appearance}
            characters={showHero.characters}
            id={showHero.heroId}
          />
          <div>
            <div style={{backgroundImage: `url(${showHero.image})`}} className='hero-description'>
              <div className='overlay-card'>
              <h4>Publisher</h4>
              <h5>{showHero.publisher}</h5>
              <h4>Alter Ego</h4>
              <h5>{showHero.alter_ego}</h5>
              <h4>First Appearance</h4>
              <h5>{showHero.first_appearance}</h5>
              <h4>Characters</h4>
              <h5>{showHero.characters}</h5>
              </div>
            </div>
          </div>
        </div> : null}

        <div className='box-btn'>
          <button className='btn btn-setting' onClick={() => { buttonClick() }}>{layerTitle ? 'Show Superheroes' : 'Create Superhero'}</button>
          {layerButton ? <button className='btn btn-setting' onClick={() => { button2Click() }}>Show Superheroes</button> : null}
        </div>

        <div className='create'>{layerCreate ? null : <div className='settings'>
          <h2>Create your Superhero</h2>
          <br />
          <div className="group">
            <input value={image} onChange={(e) => setImage(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Image</label>
          </div>
          <div className="group">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Name</label>
          </div>
          <div className="group">
            <input value={publisher} onChange={(e) => setPublisher(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Publisher</label>
          </div>
          <div className="group">
            <input value={alterego} onChange={(e) => setAlterego(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Alter Ego</label>
          </div>
          <div className="group">
            <input value={firstappearance} onChange={(e) => setFirstappearance(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>First Appearance</label>
          </div>
          <div className="group">
            <input value={characters} onChange={(e) => setCharacters(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Characters</label>
          </div>
          <button className='btn-setting' onClick={() => createClick() }>Save</button>
        </div>}</div>

        {layerCreate ? <div className='all-heroes'>{layerAll ? <div className='settings'>
          <Superhero
            name={showHero.name}
            image={showHero.image}
            publisher={showHero.publisher}
            alterego={showHero.alter_ego}
            firstappearance={showHero.first_appearance}
            characters={showHero.characters}
          />
          <h2>Edit</h2>
          <br />
          <div className="group">
            <input value={image} onChange={(e) => setImage(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Image</label>
          </div>
          <div className="group">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Name</label>
          </div>
          <div className="group">
            <input value={publisher} onChange={(e) => setPublisher(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Publisher</label>
          </div>
          <div className="group">
            <input value={alterego} onChange={(e) => setAlterego(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Alter Ego</label>
          </div>
          <div className="group">
            <input value={firstappearance} onChange={(e) => setFirstappearance(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>First Appearance</label>
          </div>
          <div className="group">
            <input value={characters} onChange={(e) => setCharacters(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Characters</label>
          </div>
          <button className='btn-setting' onClick={() => updateClick(heroId)}>Update Superhero</button>
        </div> : (superhero.map((hero) =>
          <div key={hero.id}>
            <div onClick={() => { return (setLayerHero(true))(showOneHero(hero.id)) }}>
              <Superhero
                name={hero.name}
                image={hero.image}
                publisher={hero.publisher}
                alterego={hero.alter_ego}
                firstappearance={hero.first_appearance}
                characters={hero.characters}
                superhero={superhero}
                setSuperhero={setSuperhero}
              />
            </div>
            <div className='buttons'>
              <button className='btn-setting' onClick={() => deleteClick(hero.id)}>Delete</button>
              <button className='btn-setting' onClick={() => editClick(hero.id)}>Edit</button>
            </div>
          </div>
        ))}</div> : null
        }


      </div>
    </div >

  )
}

export default Superheroes

/* {layerHero ? <Superhero
  name={showHero.name}
  image={showHero.image}
  publisher={showHero.publisher}
  alterego={showHero.alter_ego}
  firstappearance={showHero.first_appearance}
  characters={showHero.characters}
/> : null} */

/* import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Superhero from './Superhero.js';
import Header from './Header.js';
import hero from './comic.jpg';

const Superheroes = () => {
  const [superhero, setSuperhero] = useState([])
  const [showHero, setShowHero] = useState({});
  const [layerCreate, setLayerCreate] = useState(true);
  const [layerTitle, setLayerTitle] = useState(false);
  const [layerSuper, setLayerSuper] = useState(true);
  const [layerAll, setLayerAll] = useState(false);
  const [name, setName] = useState("");
  const [publisher, setPublisher] = useState("");
  const [alterego, setAlterego] = useState("");
  const [firstappearance, setFirstappearance] = useState("");
  const [image, setImage] = useState("");
  const [characters, setCharacters] = useState("");
  const [heroId, setHeroId] = useState(null);
  const [header, setHeader] = useState(true);
  const [layerHero, setLayerHero] = useState(false);

  useEffect(() => {
    const getSuperhero = async () => {
      const respSuperhero = await axios.get('http://localhost:3003/superheroes');
      setSuperhero(respSuperhero.data);
      setHeroId(respSuperhero.data.id);
      console.log(respSuperhero.data)
    }
    getSuperhero();
  }, []);

  const showOneHero = async (id) => {
    const response = await axios.get(`http://localhost:3003/superheroes/${id}`)
    setHeroId(response.data.id);
    setShowHero(response.data);
  }

  const newHero = async () => {
    const payload = {
      name: name,
      publiser: publisher,
      alter_ego: alterego,
      first_appearance: firstappearance,
      image: image,
      characters: characters,
    };
    const response = await axios.post("http://localhost:3003/superheroes", payload)
      ;
    if (response.status === 201) {
      let oldHeroes = superhero;
      oldHeroes.push(response.data);
      setSuperhero([...superhero, oldHeroes]);
    }
  };

  const deleteHero = async (id) => {
    const response = await axios.delete(`http://localhost:3003/superheroes/${id}`);
    if (response.status === 204) {
      let heroes = superhero.filter((hero) => hero.id !== id);
      setSuperhero(heroes)
    }
    alert(id)
    console.log(id)
  };

  const dataHero = (id) => {
    let hero = superhero.filter(hero => hero.id === id)[0];
    setImage(hero.image);
    setName(hero.name);
    setPublisher(hero.publisher);
    setAlterego(hero.alterego);
    setFirstappearance(hero.firstappearance);
    setCharacters(hero.characters)
    setHeroId(hero.id)
    console.log(hero)
  }

  const editClick = (id) => {
    dataHero(id);
    setLayerAll(true);
    setLayerTitle(true);
    showOneHero(id);
    console.log(id)
  }

  const buttonClick = () =>{
    setLayerCreate(!layerCreate);
    setLayerTitle(!layerTitle);
    setLayerAll(false);
    setLayerSuper(!layerSuper)
  }

  const deleteClick = (id) => {
    setLayerHero(false)
    deleteHero(id)
  }

  const updateClick = (heroId) => {
    updateHero(heroId)
    setLayerAll(false);
    setLayerCreate(true)
    console.log(heroId)
  }

  const updateHero = async (heroId) => {
    const payload = {
      name: name,
      publisher: publisher,
      alter_ego: alterego,
      first_appearance: firstappearance,
      image: image,
      characters: characters,
      heroId: heroId
    };
    console.log("payload", payload)
    const response = await axios.patch(`http://localhost:3003/superheroes/${heroId}`, payload);
    if (response.status === 204) {
      const editedHero = characters.filter((heroId) => editedHero.id !== heroId)
      editedHero.push(heroId)
      setSuperhero(editedHero)
      alert(response)
    }
  }



  return (
    <div className='page' style={{ backgroundImage: `url(${hero})` }}>
      <div className='overlay'>

        {header ? <Header /> : null}

        <div className='box-btn'>
          <button className='btn btn-setting' onClick={() => { buttonClick() }}>{layerTitle ? 'Ver personajes' : 'Crear Personaje'}</button>
        </div>

        <div className='create'>{layerCreate ? null : <div className='settings'>
          <h2>Create your Superhero</h2>
          <br />
          <div className="group">
            <input value={image} onChange={(e) => setImage(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Image</label>
          </div>
          <div className="group">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Name</label>
          </div>
          <div className="group">
            <input value={publisher} onChange={(e) => setPublisher(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Publisher</label>
          </div>
          <div className="group">
            <input value={alterego} onChange={(e) => setAlterego(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Alter Ego</label>
          </div>
          <div className="group">
            <input value={firstappearance} onChange={(e) => setFirstappearance(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>First Appearance</label>
          </div>
          <div className="group">
            <input value={characters} onChange={(e) => setCharacters(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Characters</label>
          </div>
          <button className='btn-setting' onClick={() => { return (newHero())(setLayerCreate(true))(setLayerAll(false)) }}>Save</button>
        </div>}</div>

        {layerSuper ? <div className='all-heroes'>{layerAll ? <div className='settings'>
          <Superhero
            name={showHero.name}
            image={showHero.image}
            publisher={showHero.publisher}
            alterego={showHero.alter_ego}
            firstappearance={showHero.first_appearance}
            characters={showHero.characters}
          />
          <h2>Edit</h2>
          <br />
          <div className="group">
            <input value={image} onChange={(e) => setImage(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Image</label>
          </div>
          <div className="group">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Name</label>
          </div>
          <div className="group">
            <input value={publisher} onChange={(e) => setPublisher(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Publisher</label>
          </div>
          <div className="group">
            <input value={alterego} onChange={(e) => setAlterego(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Alter Ego</label>
          </div>
          <div className="group">
            <input value={firstappearance} onChange={(e) => setFirstappearance(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>First Appearance</label>
          </div>
          <div className="group">
            <input value={characters} onChange={(e) => setCharacters(e.target.value)} type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Characters</label>
          </div>
          <button className='btn-setting' onClick={() => updateClick(heroId)}>Update Superhero</button>
        </div> : (superhero.map((hero) =>
          <div key={hero.id}>
            <div onClick={() => { return (setLayerHero(true))(showOneHero(hero.id)) }}>
              <Superhero
                name={hero.name}
                image={hero.image}
                publisher={hero.publisher}
                alterego={hero.alter_ego}
                firstappearance={hero.first_appearance}
                characters={hero.characters}
                superhero={superhero}
                setSuperhero={setSuperhero}
              />
            </div>
            <div className='buttons'>
              <button className='btn-setting' onClick={() => deleteClick(hero.id)}>Delete</button>
              <button className='btn-setting' onClick={() => editClick(hero.id)}>Edit</button>
            </div>
          </div>
        ))}</div> : null
        }


      </div>
    </div >

  )
}

export default Superheroes

 */