import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Importa BrowserRouter
import InicioComponente from "./usercomponente/inicioComponente/inicioComponente";
import StudenForm from "./usercomponente/studentForm/StudentForm";
import StudentList from "./usercomponente/studentList/studentList";
import EditForm from "./usercomponente/editForm/editForm";
import EliminarUsuario from "./usercomponente/eliminarUsuario/eliminarUsuario";
// import ActualizarEstudiantes from "./usercomponente/actualizarForm/actualizarDatos";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InicioComponente />} />
          <Route path="/user" element={<StudenForm />} />
          <Route path="/userList" element={<StudentList />} />
          <Route path="/userEdit" element={<EditForm />} />
          <Route path="/eliminarUsuario" element={<EliminarUsuario />} />
          {/* <Route path="/actualizarEstudiantes" element={<ActualizarEstudiantes />} */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
