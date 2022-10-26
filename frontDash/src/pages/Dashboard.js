import React, {useEffect, useMemo, useState} from "react";
import {CDBContainer} from "cdbreact";
import {Pie} from "react-chartjs-2";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import "./Dashboard.css";
import axios from "axios";
import {socket} from "../services/websocket";

export const Dashboard = () => {

    const [flavors, setFlavors] = useState(null);
    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
    }), []);

    const parseData = (data) => {
        const entries = Object.entries(data);
        console.log("ENTRIES:", entries)
        setFlavors({
            labels: entries.map((entry) => entry[0]),
            datasets: [{
                label: 'Flavors',
                data: entries.map((entry) => entry[1]),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        });
    };

    useEffect(() => {
        axios.get('http://localhost:3002/api/getAllQuantity')
            .then(res => {
                console.log("Before:",res.data)
                parseData(res.data);
            });
    }, []);

    useEffect(() => {
        socket.on('update:flavors', (data) => {
            parseData(data);
        });

        return () => {
            socket.off('update:flavors');
        };
    }, []);

    return (
        <div className="dashboard d-flex">
            <div>
                <Sidebar/>
            </div>
            <div style={{flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden"}}>
                <Navbar/>
                <div style={{height: "100%"}}>
                    <div style={{height: "calc(100% - 64px)", overflowY: "scroll"}}>
                        <div className="d-flex card-section">
                            <div className="cards-container">
                                <div className="card-bg w-100 border d-flex flex-column">
                                    <div className="p-4 d-flex flex-column h-100">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4 className="m-0 h5 font-weight-bold text-dark">:מלאי כולל בסניפים</h4>
                                            <div className="px-2 py-1 bg-grey rounded-circle"><i
                                                className="fas fa-chart-line"></i></div>
                                        </div>
                                        <div className="mt-3 d-flex justify-content-between">
                                            <CDBContainer style={{width: "350px", height: "300px"}} className="p-0">
                                                <Pie data={flavors} options={chartOptions}/>
                                            </CDBContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className="footer">
                            <div className="d-flex align-items-center">
                                <span className="footer-rem" style={{
                                    fontSize: "3em",
                                    margin: "-2rem 0px -1.5rem 1rem",
                                    color: "#C4C4C4"
                                }}>&#8226;</span>
                                <small className="ml-2 mt-1">&copy; Powered By Asif Rot, Gal Braymok, Aviem
                                    Hadar.</small>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}
