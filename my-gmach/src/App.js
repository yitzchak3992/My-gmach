import "./App.css";
import Filters from "./components/Filters";
import GmachList from "./components/GmachList";
import Header from "./components/Header";
import Map from "./components/Map";
import GmachApp from "./components/ניסוי";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Filters />
      <div className="flex flex-1 gap-4 p-4 h-[calc(100vh-8.5rem)]">
        <div className="flex-1 sticky top-4">
          <div className="h-[calc(100vh-8.5rem)]">
            <Map />
          </div>
        </div>
        <GmachList />
      </div>
    </div>
  );
}

export default App;

// import "./App.css";
// import Filters from "./components/Filters";
// import GmachList from "./components/GmachList";
// import Header from "./components/Header";
// import Map from "./components/Map";

// function App() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <Filters />
//       <div className="flex flex-1 gap-4 p-4">
//         <div className="flex-1 basis-1/3">
//           <Map />
//         </div>
//         <div className="basis-2/3 overflow-y-auto">
//           <GmachList />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
