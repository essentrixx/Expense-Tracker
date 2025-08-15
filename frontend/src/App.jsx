import { useMemo, useState } from "react";
import styled from 'styled-components'
import './App.css'
import { MainLayout } from "./styles/Layouts.jsx";
import Orb from './components/Orb/Orb.jsx';
import Navigation from "./components/Navigation/Navagation.jsx";
import bg from "./assets/bg.png";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Income from "./components/Incomes/Incomes.jsx";
import Expenses from "./components/Expenses/Expenses.jsx";
import { useGlobalContext } from "./context/GlobalContext.jsx";

function App() {
    const [active, setActive] = useState(1);

    const global = useGlobalContext();
    console.log(global);

    const displayData = () => {
        switch (active) {
            case 1:
                return <Dashboard />
            case 2:
                return <Dashboard />
            case 3:
                return <Income />
            case 4:
                return <Expenses />
            default:
                return <Dashboard />
        }
    }

    const orbMemo = useMemo(() => {
        return <Orb />
    }, [])

    return (
        <AppStyled $bg={bg} className="App">
            {orbMemo}
            <MainLayout>
                <Navigation active={active} setActive={setActive} />
                <main className="main">
                    {displayData()}
                </main>
            </MainLayout>
        </AppStyled>
    )
}

const AppStyled = styled.div
    `
        height: 100vh;
        background-image: url(${props => props.bg});
        position: relative;\
        main {
            flex: 1;
            background: rgba(252, 246, 249, 0.78);
            border: 3px solid #fff;
            backdrop-filter: blur(4.5px);
            border-radius: 32px;
            overflow: auto;
            overflow-x: hidden;
            &::-webkit-scrollbar {
                width: 0;
            }
        }
    `

export default App;