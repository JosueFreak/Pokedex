import React from 'react'
import { useDispatch } from 'react-redux';
import { setNameTrainerGlobal } from '../store/slices/nameTrainer.slice';
import "./styles/Home.css";

const Home = () => {

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        const nameTrainer = e.target.nameTrainer.value;
        dispatch(setNameTrainerGlobal(nameTrainer));
    };

    return (
    <main className='home'>
        <section className='hometwo'>
            <div>
                <img src="/images/pokedex.png" alt="" />
            </div>
            <h2 className='home_hello'>Hello Trainer!</h2>
            <p className='home_text'>Give me your name to start!</p>
            <form className='home_form' onSubmit={handleSubmit}>
                <input required id='nameTrainer' type="text" placeholder='your name...' />
                <button className='home_btn'>Start</button>
            </form>
        </section>
    </main>
    )
}

export default Home
