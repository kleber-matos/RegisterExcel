import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import dataUsers from "../users.json";
import { FaEdit, FaTrash, FaFilter, FaShareAlt } from "react-icons/fa";

import "./style.scss";

export default function App() {
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
      <main>
        <section className="menu">
          <div className="paginacao">
            <button onClick={() => pages("-")}>
              <GrFormPrevious />
            </button>
            <h2>
              {paginacao}/ {dataUsers.length}
            </h2>
            <button onClick={() => pages("+")}>
              <MdNavigateNext />
            </button>
          </div>

          <div className="filter">
            <button>
              <FaFilter />
              Filter
            </button>

            <CSVLink
              className="share"
              data={dataUsers.slice(paginacao - 5, paginacao)}
            >
              <FaShareAlt />
              Share
            </CSVLink>
          </div>
        </section>

        <section className="tabela">
          <table>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>phone</th>
              <th>department</th>
              <th>role</th>
              <th>dateJoined</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>

            {dataUsers
              .slice(paginacao - 5, paginacao)
              .map(
                ({ id, name, email, phone, department, role, dateJoined }) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>{department}</td>
                    <td>{role}</td>
                    <td>{dateJoined}</td>
                    <td className="action">
                      <FaEdit />
                    </td>
                    <td className="action">
                      <FaTrash />
                    </td>
                  </tr>
                )
              )}
          </table>
        </section>
      </main>
    </>
  );
}
