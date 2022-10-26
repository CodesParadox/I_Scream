import React from "react";
import { Header } from "./Navbar.style";
import { CDBNavbar, CDBInput } from "cdbreact";

const Navbar = () => {

	return (
        <Header style={{background:"#333", color:"#fff"}}>
          <CDBNavbar dark expand="md" scrolling className="justify-content-start">
            <div className="ml-auto">
            </div>
          </CDBNavbar>
        </Header>
	);
}

export default Navbar;
