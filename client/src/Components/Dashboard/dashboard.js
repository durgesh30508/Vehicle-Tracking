import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import styles from './dashboard.module.css'
import cx from 'classnames'
import L from 'leaflet'
import {Map,TileLayer,Marker,Popup} from 'react-leaflet'
import socketIOClient from 'socket.io-client'


var myIcon = L.icon({
    iconUrl: '/img/pin3.png',
    iconSize:[25,41],
    iconAnchor:[12.5,41],
    popupAnchor:[0,-41]
})


class Dashboard extends Component{

	state={

		lat : 22.57,
		lng : 88.36,
		time : 0,
		zoom : 14,
		speed : 0,
		isStop : false,
		isOpen : false,
		busIdList : [],
		selectedBus : "",
		isStartAbled : true,
		dropDownDisplay : "SELECT TRUCK ID",
		coordinateBuffer : []
		//socket : socketIOClient("http://localhost:4001")
		
	}

	componentDidMount() {
		
		const socket = socketIOClient("http://localhost:4001");
		socket.on('display-loc',(coords)=>{
			console.log(coords)
			this.setState({
				lat : coords.latitude,
				lng : coords.longitude
			})
		})
	}
	
	

	handleOnClick(busId){

		this.setState({
			selectedBus : busId,
			isStartAbled:true,
			dropDownDisplay:busId
		})
	}
	
    startOnClick(){
		
	}

	stopOnClick = () =>{
      this.setState({
		  isStop:true
	  })
	}
	
	toggleOpen = () => this.setState({ isOpen : !this.state.isOpen });
	
	
	render(){
		const position = [this.state.lat, this.state.lng]
		const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
		const ableClass = `${this.state.isStartAbled ? "" : "disabled"}`;
		
		
		return(
			<>
			{/* NAV BEGINS */}
			<div className="row">
			<nav className="navbar navbar-expand-lg fixed-top navbar-light   navbar-dark bg-dark">
				<p className="navbar-brand text-light" >Where is my Truck</p>
				<div className="nav-item text-light info">
							<p>Speed:{this.state.speed}</p>
							<p>Time: {this.state.time}</p>
				</div>
				<div className="nav-item text-light info1">
							<p>Longitude:{this.state.lat}</p>
							<p>Latitude: {this.state.lng}</p>
				</div>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto">
						
					<li className="nav-item active">
						<Link to='/dashboard'><p className="nav-link" >HOME <span className="sr-only">(current)</span></p></Link>
					</li>
					<li className="nav-item">
						<Link to='/history'><p className="nav-link" >HISTORY</p></Link>
					</li>
					<li className="nav-item dropdown" onClick={this.toggleOpen}>
						<button className="btn  btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							{this.state.dropDownDisplay}
						</button>
						<div className={cx(menuClass,styles.menuScroll)} aria-labelledby="dropdownMenuButton">
							{ this.state.busIdList.map((busId,key)=>( <a href="/" key={key} className="dropdown-item" onClick={()=>{this.handleOnClick(busId)}} type="button">{busId}</a> )) }
						</div>
					</li>
					<li>
						<button className={cx("btn  btn-secondary",ableClass)} onClick={()=>{this.startOnClick()}}   >START</button>
					</li>
					<li>
						<button className={cx("btn  btn-secondary",ableClass)} onClick={()=>{this.stopOnClick()}}   >STOP</button>
					</li>
					
					</ul>
				</div>
				</nav>
				<br></br>
				</div>
			{/* NAV ENDS */}

			{/* MAP BEGIN */}
			 <Map className="map" center={[this.state.lat, this.state.lng]}  zoom={this.state.zoom}>
            <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                <Marker position={[this.state.lat, this.state.lng]} icon={myIcon}>
                    <Popup>
                        Reached <br /> Unloading....
                    </Popup>
                </Marker>
            </Map>
			{/* MAP ENDS */}
			</>
		)
	}
}

export default Dashboard;
