import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./styles/Pokemon.css"

const Pokemon = () => {
    const [pokemon, setPokemon] = useState()

    const {id} = useParams()

    const getPercentBar = (stat) => {
        const percent = (stat * 100) / 255;
        return `${percent}%`;
    }

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
        axios
            .get(URL)
            .then((res) => setPokemon(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
    <main className='pokemon_content'>
        {/* Parte Superior */}
        <section className='pokemon_header'>
            <section>
                <div>
                    <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                </div>
            </section>
        </section>

        {/* Body*/ }
        <section className='pokemon_info'>
            <h2 className='pokemon_id'># {pokemon?.id}</h2>
            <h2 className='pokemon_name'>{pokemon?.name}</h2>

            <div>
                <div className='pokemon_weight'>
                    <h5>Weight</h5>
                    <h4>{pokemon?.weight}</h4>
                </div>
                <div className='pokemon_height'>
                    <h5>Height</h5>
                    <h4>{pokemon?.height}</h4>
                </div>
            </div>

            <div>
                <div className='pokemon_type'>
                    <h3>Type</h3>
                    <div>
                        {
                            pokemon?.types.map(type => <div key={type.type.name}><span>{type.type.name}</span></div>)
                        }
                    </div>
                </div>
            <div className='pokemon_abilities'>
                <h3>Abilities</h3>
                <div>
                    {
                        pokemon?.abilities.map(ability => <div key={ability.ability.name}><span>{ability.ability.name}</span></div>)
                    }
                </div>
                </div>
            </div>

            {/* Stats */}
            <section className='pokemon_stats'>
                <h2 className='pokemon_stats-title'>Stats</h2>
                <section className='pokemon_stats_info'>

                    {
                        pokemon?.stats.map(stat => (
                            <article className='pokemon_stat' key={stat.stat.name}>
                            <div className='pokemon_stat-header'>
                                <h4 className='pokemon_stat_name'>{stat.stat.name}</h4>
                                <h5 className='pokemon_stat-value'>{stat.base_stat}/255</h5>
                            </div>
                            <div className='pokemon_stat-bar'>
                                <div className='pokemon_stat-barGray'>
                                    <div className='pokemon_stat-barProgress' style={{width: getPercentBar(stat.base_stat)}}></div>
                                </div>
                            </div>
                            </article>
                        ))
                    }
                </section>
            </section>

        </section>
    </main>
    )
}

export default Pokemon
