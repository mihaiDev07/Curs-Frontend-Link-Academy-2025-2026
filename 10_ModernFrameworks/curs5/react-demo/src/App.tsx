import { useState } from 'react'
import './App.css'
import Salut from './components/Salut'
import Masina from './components/Masina'
import MyForm from './components/MyForm'

function App() {
  const [count, setCount] = useState(10)
const obj = { name: 'Alice', email: 'demo@demo.com', password: '123456', car: 'BMW', message: 'Salut' };

  return (
    <>
      <section id="center">
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <Salut name="Alice" curs="React" />
      <Salut name="Bob" curs="Vue" />
      <Salut name="Charlie" curs="Angular" />
      <Salut name="Diana" curs='' />
      <Salut name="Eve"  curs='' />

      <Masina car={{ name: 'Tesla', model: 'Model S' }} />

      <MyForm {...obj}/>
      
    </>
  )
}

export default App
