import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import styles from './Mainpage.module.css'
import socketIOClient from 'socket.io-client'



class Mainpage extends Component{

	sendLocation(){
		
		const socket = socketIOClient("http://localhost:4001")
		
        setInterval(()=>{
			
			navigator.geolocation.getCurrentPosition((position)=>{

				socket.emit('send',{latitude : position.coords.latitude,longitude : position.coords.longitude },(error)=>{
				})
				
			})
			},3000)
	}
	
	render(){
		return(
			<div className={styles.pagebody}>
				<h1 className={styles.getStarted}>Track vehicle</h1>
				<Link className={styles.butttons} to='/dashboard'>
					<button  type="button" className="btn btn-dark btn-lg" onClick = {()=>{this.sendLocation()}}>Get Started</button>
				</Link>
			</div>
		)
	}
}

export default Mainpage;