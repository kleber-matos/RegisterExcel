import React, { useState } from "react";
import dataUsers from "../users.json";
import { CSVLink } from "react-csv";
import "./style.scss";

// React Icons
import { FaEdit, FaTrash, FaFilter, FaShareAlt } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Swal from "sweetalert2";

export default function App() {
  // States
  const [paginacao, setPaginacao] = useState(5);
  const [users, setUsers] = useState(dataUsers);

  // Logicas dos botoes de paginação.
  const pages = (valor) => {
    const increment = valor == "+" && users.length > paginacao;
    const decrement = valor == "-" && paginacao > 5;

    if (increment) {
      setPaginacao((prev) => prev + 5);
    } else if (decrement) {
      setPaginacao((prev) => prev - 5);
    }
  };

  // O 'prev' em situações que o estado pode mudar rapidamente, garante que você sempre esteja lidando com a versão mais atualizada do estado.
  const removeUser = (id) => {
    Swal.fire({
      title: "Tem certeza que deseja apagar este usuário?",
      text: "Esta ação é permanente e todos os dados associados a este usuário serão excluídos. Por favor, confirme se deseja continuar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deletado!",
          text: "Usuário foi excluído.",
          icon: "success",
          Color: "#d33",
        });

        if (users.length > 5)
          setUsers((prev) => prev.filter((e) => e.id !== id));
      }
    });
  };

  const addUser = () => {
    //
  };

  return (
    <>
      <main>
        <section className="menu">
          <button className="addUser" onClick={() => addUser()}>
            New User
          </button>

          <div className="filter">
            <button>
              <FaFilter />
              Filter
            </button>

            <CSVLink
              className="share"
              data={users.slice(paginacao - 5, paginacao)}
            >
              <FaShareAlt />
              Export
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

            {users
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
                    <td onClick={() => removeUser(id)} className="action">
                      <FaTrash />
                    </td>
                  </tr>
                )
              )}
          </table>
          <div className="paginacao">
            <button onClick={() => pages("-")}>
              <GrFormPrevious />
            </button>
            <h2>
              {paginacao}/ {users.length}
            </h2>
            <button onClick={() => pages("+")}>
              <MdNavigateNext />
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
