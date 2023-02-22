import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from '../components/pokedex/PokemonCard'
import usePokedex from '../hooks/usePokedex'
import { paginationLogic } from '../utils/pagination'
import "./styles/Pokedex.css"

const Pokedex = () => {

    const nameTrainer = useSelector(store => store.nameTrainer)

    const {handleSubmit, handleChangeSelect, types, pokemonsInPage, handlePreviusPage, handleNextPage, pagesInBlock} = usePokedex()
    
    return (
    <main className='pokedex-content'>
        <p className='pokedex_text'><span>Welcome, {nameTrainer},</span> here you can find information about your favorite pokemon</p>
        <form className='pokedex_form' onSubmit={handleSubmit}>
            <div>
                <input className='pokedex_input' type="text" id='pokemonName' placeholder='search your pokemon' />
                <button className='pokedex_btn'>Search</button>
            </div>
            <select onChange={handleChangeSelect}>
                <option value="">All</option>
                {
                    types.map(type => <option key={type.url}>{type.name}</option>)
                }
            </select>
        </form>
        <section className='pokedex-separation'>
            {
                pokemonsInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
            }
        </section>
        <section className='pokedex_page'>
            <ul className='pokedex_list'>
                <li className='pokedex_previus' onClick={handlePreviusPage}>{"<<"}</li>
                <li className='pokedex_current-page' onClick={() => setCurrentPage(1)}>...</li>
                {
                    pagesInBlock.map(page => <li onClick={() => setCurrentPage(page)} key={page}>{page}</li>)
                }
                <li className='pokedex_lastpage' onClick={() => setCurrentPage(lastPage)}>...</li>
                <li className='pokedex_nextpage' onClick={handleNextPage}>{">>"}</li>
            </ul>
        </section>
    </main>
)
}

export default Pokedex
