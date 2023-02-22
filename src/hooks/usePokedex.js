import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { paginationLogic } from "../utils/pagination"

const usePokedex = () => {
    const [pokemons, setPokemons] = useState([])
    const [pokemonsFilter, setPokemonsFilter] = useState([])
    const [types, setTypes] = useState([])
    const [selectType, setSelectType] = useState("")
    const [pokemonName, setPokemonName] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const handleChangeSelect = (e) => {
        setSelectType(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPokemonName(e.target.pokemonName.value)
    }

    const handleNextPage = () => {
        const  newPage = currentPage + 1
        if(newPage > lastPage){
            setCurrentPage(1)
        }else{
            setCurrentPage(newPage)
        }
    }
    
    const handlePreviusPage = () => {
        const newPage = currentPage - 1
        if(newPage < 1){
            setCurrentPage(lastPage)
        }else{
            setCurrentPage(newPage)
        }
    }
    
    const {pagesInBlock, lastPage, pokemonsInPage} = useMemo(() => {
        return paginationLogic(pokemonsFilter, currentPage)
    }, [pokemonsFilter, currentPage])


    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/${selectType ? `type/${selectType}/` : "pokemon/?limit=1279"}`
        axios.get(URL)
            .then((res) => {
                if(selectType){
                    const pokemonByType = res.data.pokemon.map(pokemon => ({
                        name: pokemon.pokemon.name,
                        url: pokemon.pokemon.url
                    }))
                    setPokemons(pokemonByType)
                }else {
                    setPokemons(res.data.results)
                }
            })
            .catch((err) => console.log(err))
    }, [selectType])

    useEffect(() => {
        const pokemonByName = pokemons.filter(pokemon => pokemon.name.includes(pokemonName.toLowerCase()))
        setPokemonsFilter(pokemonByName)
    }, [pokemonName, pokemons])

    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/type/"
        axios.get(URL)
            .then((res) => setTypes(res.data.results))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [pokemons])

    return {
        handleSubmit,
        handleChangeSelect,
        types,
        pokemonsInPage,
        handlePreviusPage,
        handleNextPage,
        pagesInBlock
    }
}

export default usePokedex
