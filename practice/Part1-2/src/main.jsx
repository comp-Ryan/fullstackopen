import ReactDOM from 'react-dom/client'
import noteService from './services/notes'
import App from './App'
import './index.css'

noteService.getAll().then(response => {
  ReactDOM.createRoot(document.getElementById('root')).render(<App notes={response} />)
})