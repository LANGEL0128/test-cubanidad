import './App.css'
import { Questions } from './components/Questions'
import { questions } from './helpers/questions'

function App() {
  
  return (
    <div className='container p-5'>
      <h1>Test de Cubanidad</h1>
      <p>Este es un ejercicio de prueba para practicar conocimientos de React. Espero que disfrute resolviendo el test!.</p>
      <hr />
      <Questions questions={questions} />
    </div>
  )
}

export default App
