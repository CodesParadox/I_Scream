import './App.css';
import 'chart.js/auto';
import {Chart, Tooltip} from 'chart.js'
import Menu from './components/Menu';
import {useNavigate,} from 'react-router-dom';
import Router from './Router';

Chart.register(Tooltip)

function App() {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Flavors',
            command: () => {
                navigate('/flavors');
            },
        },
        {
            label: 'Branches',
            command: () => {
                navigate('/branches');
            },
        },
        {
            label: 'Train Model',
            command: () => {
                navigate('/prediction');
            },
        }
    ];

    return (
        <>
            <div className="d-flex">
                <div className="menu">
                    <Menu items={items}/>
                </div>
                <div className='flex-grow-1'>
                    <Router/>
                </div>
            </div>
        </>
    );
}

export default App;
