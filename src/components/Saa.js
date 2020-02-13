import React, { Component } from 'react';
import CityList from './CityList';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import '../App.css';

class Saa extends Component {
constructor(props){
    super(props);
    this.state= {userSearch:'', city:'Kaupunki' ,temp:'', weat:'', icon:'', userList: []};
}

searchCity = (event) => {
  this.setState({ [event.target.name] : event.target.value })
};

//tähän tehdä try catch ettei haeta tyhjää nyt breikkaa...
searchWeather = () => {
  let serCity = this.state.userSearch
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+serCity+'&units=metric&APPID=0707345a482e92b1b0e9043d2a6df184')
  .then((response) => {
  if(response.ok){
    return response.json()
  }else {
    throw new Error("Varmista, että olet kirjoittanut kaupungin nimen oikein.");
  }})
    .then((responseData) => {
        this.setState({
            temp: responseData.main.temp,
            weat: responseData.weather[0].main,
            icon: "http://api.openweathermap.org/img/w/" + responseData.weather[0].icon,
            userSearch: responseData.name,
            city: responseData.name
        });
    })
    .catch((error) => {
      alert(error)
      console.log(error)
    });
};

saveWeather = () => {
  let weatObjc = {'city':this.state.userSearch, 'temp': this.state.temp, 'weat': this.state.weat, 'icon': this.state.icon}
  if(weatObjc.city === ''){
    alert("Hae ensin jonkin kaupungin säätiedot!")
    return;
  }else{
  let workArr = this.state.userList.map(city => city.city)
  if(workArr.includes(weatObjc.city)){
    alert("Kaupunki on jo listalla")
  }else{
    this.setState({
      userList: [...this.state.userList, weatObjc]
    });
  }
}
  console.log(this.state.userList)
};

deleteItem = (index) => {
  //console.log("Delete called with index: " + index)
  if(window.confirm("Haluatko varmasti poistaa kaupungin ''" + this.state.userList[index].city + "'' listasta?")){
    this.setState({
      userList: this.state.userList.filter((userList, i) => i !== index)
    })
  }else {}
};

  render() {
    return (
      <div>
        <div className="userSearchmain">
        <TextField id="standard-basic" label="Kaupunki" color="secondary" name="userSearch" onChange={this.searchCity} value={this.state.userSearch}></TextField>
        <IconButton id="iconbtn" aria-label="search" onClick={() => this.searchWeather()}>
          Hae Sää <br/>
            <WbSunnyIcon id="searchbtn" fontSize="large" />
          </IconButton>
          <div className="resultsContainer">
            <div data-testid='cityTest' className="results"><h3>{this.state.city}</h3></div>
          <div data-testid='tempTest' className="results">Temperature: {this.state.temp}&#8451;</div>
          <div data-testid='weatTest' className="results">Weather: {this.state.weat}</div>
          <div data-testid='iconTest' className="results"><img src={this.state.icon}/></div>
          <IconButton aria-label="search" onClick={() => this.saveWeather()}>
              Tallenna säätieto <br/>
              <FavoriteBorderIcon id="searchbtn" fontSize="large" />
            </IconButton>
            </div>
        </div>

            {this.state.userList.length > 0 && 
              <CityList userList={this.state.userList}
                  deleteItem={this.deleteItem}>
                </CityList>}
        </div>
    );
  }
}

export default Saa;
