import logo from './logo.svg';
import './App.css';
import SubjectList from './SubjectList'
import Header from './header/Header'



function App() {
  return (
    <>
      <Header/>
    </>
    
  );
}
// function App() {
//   const CMSCSubjects = [
//     { code: "CMSC100", description: "Web Programming", id: 1 },
//     { code: "CMSC150", description: "Scientific Computation", id: 2 },
//     { code: "CMSC22", description: "Object-Oriented Programming", id: 3 },
//   ];
  
//   const CHEMSubjects = [
//     { code: "CHEM100", description: "Introduction to Organic Chemistry", id: 1 },
//     { code: "CHEM10", description: "Chemical Kinetics", id: 2 },
//     { code: "CHEM11", description: "Introduction to Biochemistry", id: 3 },
//   ];
//   return (
//     <>
//     <div className="App">
//       Hello World
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//     </div>
//     <div>
//         <SubjectList data= {CMSCSubjects}/>
//         <SubjectList data={CHEMSubjects}/>

//     </div>
//     </>
    
//   );
// }

export default App;
