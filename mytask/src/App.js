import { useState , useContext, useEffect } from 'react';
import { BsController } from 'react-icons/bs';
import './App.css'
import { boardsContext } from './Components/boardsContexts/boardsContext'
import Header from "./Components/Header/Header";
import Leftside from "./Components/Leftside/Leftside";
import BoardForm from './Components/popups/BordForm/BoardForm';
import ShowWarning from './Components/popups/ShowWarning/showWarning';
import TaskForm from './Components/popups/TaskForm/TaskForm';
import Rightside from "./Components/Rightside/Rightside";
import { getboards } from './Data/data' ;
import useLocalStorage from "use-local-storage";

function App() {
  
  const [data , setData] = useLocalStorage("data", getboards());
  if(data.length == 0){
    setData(getboards())
  }


  const [boards , setboards ] = useState(data)
  
  useEffect(()=> {
    setData(boards)
  } , [boards])

  const [defaultboard , setDefaultboard ] = useState(boards[0])


  const [theme, setTheme] = useLocalStorage('light');
  const [showBoardForm , setShowBoardForm] = useState({
    title:'' ,
    order :'',
    show:false,
  })

  const [showTaskForm , setShowTaskForm] = useState({
    title:'Add New Task' ,
    order :'add',
    show:false,
  })

  useEffect(()=> {
    let newboards = boards.map((board)=> board.id == defaultboard.id ? defaultboard : board)
    setData(newboards)
  } , [ defaultboard ])


  const [showwarning , setshowWarning ] = useState({show:false , title:'' , order:''})

  // shwoTaskForm  will be  diffirnet because it need to column and  tasks ids  for the  default board
  // ADD useeffect to update local storage with boards 

  return (
    <div className="App"  data-theme={theme}>
      <boardsContext.Provider value={{ theme, setTheme ,  showTaskForm , setShowTaskForm, showwarning ,
       setshowWarning , showBoardForm , setShowBoardForm ,  defaultboard  , setDefaultboard, boards , setboards  }}>
        <Header       /> 
        <Leftside    /> 
        <Rightside  />
        { showBoardForm.show && <BoardForm /> }
        { showwarning.show && <ShowWarning  /> }
        { showTaskForm.show && <TaskForm    />}
      </boardsContext.Provider>
    </div>
  );
}

export default App;
