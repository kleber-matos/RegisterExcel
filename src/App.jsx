import axios from "axios";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import dataUsers from "./users.json";

export default function App() {
  const [users, setUsers] = useState([]);
  const [paginacao, setPaginacao] = useState(5);

  //Vou arrumar ja ja
  const pages = (valor) => {
    if (valor == "+" && dataUsers.length > paginacao) {
      setPaginacao((prev) => prev + 5);
    }
    if (valor == "-" && paginacao > 5) {
      setPaginacao((prev) => prev - 5);
    }
  };

  return (
    <>
      <section></section>

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

          {dataUsers
            .slice(paginacao - 5, paginacao)
            .map(({ id, name, email, phone, department, role, dateJoined }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{department}</td>
                <td>{role}</td>
                <td>{dateJoined}</td>
              </tr>
            ))}
        </table>

        {/* Export */}
        <CSVLink
          className="excel"
          data={dataUsers.slice(paginacao - 5, paginacao)}
        >
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
