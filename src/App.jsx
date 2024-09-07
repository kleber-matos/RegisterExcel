import axios from "axios";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

export default function App() {
  const [users, setUsers] = useState([]);
  const [paginacao, setPaginacao] = useState(5);

  const buscadados = async () => {
    const dados = await axios.get("../src/users.json");
    setUsers(dados.data.data);
  };

  useEffect(() => {
    buscadados();
  }, []);

  //Vou arrumar ja ja
  const pages = (valor) => {
    if (valor == "+" && users.length > paginacao) {
      setPaginacao((prev) => prev + 5);
    }
    if (valor == "-" && paginacao > 5) {
      setPaginacao((prev) => prev - 5);
    }
  };

  return (
    <>
      <h1>Lista de cadastros</h1>
      <section>
        <table>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>phone</th>
            <th>department</th>
            <th>role</th>
            <th>dateJoined</th>
          </tr>

          {users.slice(paginacao - 5, paginacao).map((e, index) => (
            <tr key={index}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.phone}</td>
              <td>{e.department}</td>
              <td>{e.role}</td>
              <td>{e.dateJoined}</td>
            </tr>
          ))}
        </table>

        {/* Export */}
        <CSVLink className="excel" data={users.slice(paginacao - 5, paginacao)}>
          Export Planilha
        </CSVLink>

        <button onClick={() => pages("-")}>
          <GrFormPrevious />
        </button>

        <button onClick={() => pages("+")}>
          <MdNavigateNext />
        </button>
      </section>
    </>
  );
}
