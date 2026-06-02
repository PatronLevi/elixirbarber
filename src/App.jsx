import './App.css'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Products from './sections/Products'
import Reviews from './sections/Reviews'
import Team from './sections/Team'
import Location from './sections/Location'
import Footer from './sections/Footer'

export default function App() {
  return (
    <main style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
      <Navbar />
      <Hero />
      <Services />
      <Products />
      <Reviews />
      <Team />
      <Location />
      <Footer />
    </main>
  )
}
