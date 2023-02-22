import React, { useState } from 'react'

const Superhero = (props) => {

    const [show, setShow] = useState(true)

    return (
        <div className='card' onClick={() => setShow(!show)} key={props.id} style={{backgroundImage: `url(${props.image})` }}>
            <div className='box-name'>
            <h3 className='hero-name'>{props.name}</h3>
            </div>
        
        </div>
    )
}

export default Superhero

/* {show ? <div className='box-name'>
            <h3 className='hero-name'>{props.name}</h3>
            </div>
            : <div className='box-description'>
            <h5>{props.publisher}<br/>
            {props.alterego}<br/>
            {props.firstappearance}<br/>
            {props.characters}</h5>
            </div>} */

/*    const deleteHero = async (id) => {
       const response = await axios.delete(`http://localhost:3003/superheroes/${id}`);
       if (response.status === 204) {
           let heroes = superhero.filter((hero) => hero.id !== id);
           setSuperhero(heroes)
           }
       }; */


/*     function deleteHero(id){
        fetch(`http://localhost:3003/superheroes/${id}`,{
            method:'DELETE'
        }).then((result)=>{
            result.json().then((resp)=>{
                console.warn(resp)
                getSuperhero()
            })
        })
        }; */