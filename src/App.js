import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Company from "./Components/Pages/Company";
import Contact from "./Components/Pages/Contact";
import NewProject from "./Components/Pages/NewProject";
import Projects from "./Components/Pages/Projects";
import Project from "./Components/Pages/Project";

import Container from "./Components/Layout/Container";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";

function App() {
  return (
    <Router>
      {/* <div>
        <Link to="/">Home</Link>
        <Link to="/company">Empresa</Link>
        <Link to="/contact">Contato</Link>
        <Link to="/newproject">Novo Projeto</Link>
      </div> */}
      <Navbar />
      <Switch>
        <Container customClass='min-height'>
          <Route exact path="/"> <Home /> </Route>
          <Route path="/company"> <Company /> </Route>
          <Route path="/contact"> <Contact /> </Route>
          <Route path="/newproject"> <NewProject /> </Route>
          <Route path="/projects"> <Projects /> </Route>
          <Route path="/project/:id"> <Project /> </Route>
        </Container>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
