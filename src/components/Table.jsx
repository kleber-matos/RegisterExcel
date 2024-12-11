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
  const [modal, setModal] = useState(false);

  // Captura campos do usuario
  const [openCap, setOpenCap] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [capId, setCapId] = useState("");

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
    setModal(!modal);
  };

  const edit = (e) => {
    setOpenCap(!openCap);

    const cap = dataUsers.filter((item) => item.id === e);
    setCapId(cap[0].id);
    setRole(cap[0].role);
    setName(cap[0].name);
    setEmail(cap[0].email);
    setPhone(cap[0].phone);
    setDepartment(cap[0].department);
    setDateJoined(cap[0].dateJoined);
  };

  const saveEdit = () => {
    setOpenCap(!openCap);

    const cap = dataUsers.filter((item) => item.id === capId);
    setName(cap[0].name);
    setRole(cap[0].role);
    setEmail(cap[0].email);
    setPhone(cap[0].phone);
    setDepartment(cap[0].department);
    setDateJoined(cap[0].dateJoined);

    cap[0].name = name;
    cap[0].role = role;
    cap[0].email = email;
    cap[0].phone = phone;
    cap[0].department = department;
    cap[0].dateJoined = dateJoined;

    if (openCap || !openCap) {
      setName("");
      setEmail("");
      setPhone("");
      setDepartment("");
      setRole("");
      setDateJoined("");
    }
  };

  const newUser = () => {
    setModal(!modal);
    setName("");
    setEmail("");
    setPhone("");
    setDepartment("");
    setRole("");
    setDateJoined("");
    console.log(dataUsers);

    const verifica =
      name == "" ||
      email == "" ||
      phone == "" ||
      department == "" ||
      role == "" ||
      dateJoined == "";

    if (!verifica)
      dataUsers.push({
        id: Math.random() * 20,
        name: name,
        email: email,
        phone: phone,
        department: department,
        role: role,
        dateJoined: dateJoined,
      });

    setUsers(dataUsers);
    console.log(users);
  };

  return (
    <>
      {/* Edit Users */}
      {openCap && (
        <div className="modal">
          <div className="container">
            <h2>Contact Form</h2>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
            />

            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="tel"
            />

            <label htmlFor="department">Department</label>
            <input
              id="department"
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
              type="text"
            />

            <label htmlFor="role">Role</label>
            <input
              id="role"
              onChange={(e) => setRole(e.target.value)}
              value={role}
              type="text"
            />

            <label htmlFor="datajoined">Date</label>
            <input
              id="datajoined"
              onChange={(e) => setDateJoined(e.target.value)}
              value={dateJoined}
              type="date"
            />

            <hr />
            <div className="buttons">
              <button className="closed" onClick={() => setOpenCap(!openCap)}>
                Closed
              </button>
              <button className="save" onClick={() => saveEdit()}>
                save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/add users */}
      {modal && (
        <div className="modal">
          <div className="container">
            <h2>Modal - em construção</h2>

            <label htmlFor="name">Name</label>
            <input
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
            />

            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="tel"
            />

            <label htmlFor="department">Department</label>
            <input
              id="department"
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
              type="text"
            />

            <label htmlFor="role">Role</label>
            <input
              id="role"
              onChange={(e) => setRole(e.target.value)}
              value={role}
              type="text"
            />

            <label htmlFor="datajoined">Date</label>
            <input
              id="datajoined"
              onChange={(e) => setDateJoined(e.target.value)}
              value={dateJoined}
              type="date"
            />

            <div className="buttons">
              <button className="closed" onClick={() => addUser()}>
                Closed
              </button>
              <button className="save" onClick={() => newUser()}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <main>
        <section className="menu">
          <button className="addUser" onClick={() => newUser()}>
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
            <thead>
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
            </thead>

            <tbody>
              {users
                .slice(paginacao - 5, paginacao)
                .map(
                  ({
                    id,
                    name,
                    email,
                    phone,
                    department,
                    role,
                    dateJoined,
                  }) => (
                    <tr key={id}>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>{department}</td>
                      <td>{role}</td>
                      <td>{dateJoined}</td>
                      <td className="action" onClick={() => edit(id)}>
                        <FaEdit />
                      </td>
                      <td onClick={() => removeUser(id)} className="action">
                        <FaTrash />
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
          <h2>Total users {users.length}</h2>
          <div className="paginacao">
            <button onClick={() => pages("-")}>
              <GrFormPrevious />
            </button>

            <button onClick={() => pages("+")}>
              <MdNavigateNext />
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
