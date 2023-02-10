import "./App.scss";
import { CustomRouter, history } from "@/routes/customHistory";
import Routes from "@/routes/Index";
// import Scale from "@/components/scale/Index";

function App() {
  return (
    // <Scale>
      <CustomRouter history={history}>
        <Routes />
      </CustomRouter>
    // </Scale>
  );
}

export default App;
