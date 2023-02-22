import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./styles/PokemonCard.css"

const PokemonCard = ({pokemonUrl}) => {
    const [pokemon, setPokemon] = useState()

    const navigate = useNavigate()

    const handleClickPokemon = () => {
        navigate(`/pokedex/${pokemon.id}`)
    }

    useEffect(() =>{
        axios.get(pokemonUrl)
            .then((res) => setPokemon(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <article className={`pokemonCard border-${pokemon?.types[0].type.name}`} onClick={handleClickPokemon}>
            <section className={`pokemonCard_header bg-lg-${pokemon?.types[0].type.name}`}></section>
            <section className='pokemonCard_body'>
                <div className='pokemonCard_img'>
                    <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                </div>
                <h3 className='pokemonCard_name'>{pokemon?.name}</h3>
                <h4 className='pokemonCard_types'>{pokemon?.types[0].type.name} {pokemon?.types[1] && `/ ${pokemon?.types[1].type.name}`}</h4>
                <h6 className='pokemonCard_type-subtitle'>Tipo</h6>
                <hr className='pokemonCard_line' />
                <section className='pokemonCard_stats'>
                    {
                        pokemon?.stats.map(stat => (
                            <div className='pokemonCard_stat' key={stat.stat.url}>
                                <h5 className='pokemonCard_stat-name'>{stat.stat.name}</h5>
                                <h5 className='pokemonCard_stat-value'>{stat.base_stat}</h5>
                            </div>
                        ))
                    }
                </section>
            </section>
        </article>
)
}

export default PokemonCard
