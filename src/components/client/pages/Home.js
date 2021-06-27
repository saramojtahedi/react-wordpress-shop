import React from 'react'
import Footer from '../../Footer'
import Navbar from '../../Navbar'
import Articles from '../components/Articles'
import Header from '../components/Header'
import Product from '../components/Product'
import './Home.css'

const Home = () => {
    return (
        <div>
            <Navbar />
            <main className="main-container">
            <Header />
            <Product />
            <Articles />
            </main>
            <Footer />
        </div>
    )
}

export default Home
