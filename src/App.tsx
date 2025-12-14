import './App.css'
import NavBar from './components/NavBar/NavBar';
import Cards from './components/Cards/Cards';
import AddButton from './components/AddButton/AddButton';
import KeywordContainer from './components/KeywordContainer/KeywordContainer';

function App() {
  return (
    <>
      <NavBar />
      <Cards />
      <AddButton />
      <KeywordContainer />
    </>
  )
}

export default App