import Search from './components/search/search';
import './App.css';
import './index.css'
import CurrentWeather from './components/current-weather/current-weather';


export default function App() {

  //3
  const handleOnSearchChange = (searchData) => {
     console.log(searchData);
  }

  return (
  <div className="container">
     <Search onSearchChange={handleOnSearchChange}/>
     <CurrentWeather />
  </div>
  );
}





