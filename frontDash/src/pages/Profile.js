import React from "react";
import { CDBBtn, CDBIframe, CDBView } from "cdbreact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import "./Profile.css"

export const Profile = () => {

	return (
		<div className="d-flex profile">
			<div>
      	<Sidebar/>
			</div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
      	<Navbar/>
      	<div style={{height:"100%"}}>
					<div style={{height:"calc(100% - 64px)", padding:"20px 5%", overflowY:"scroll"}}>
						<div style={{margin:"0 auto", maxWidth:"1320px"}}>
			        <footer className="d-flex mx-auto py-4">
			          <small className="mx-auto my-1 text-center">&copy; Powered By Asif Rot, Gal Braymok, Aviem Hadar</small>
			        </footer>
				    </div>
					</div>
				</div>
			</div>
		</div>

	);
}