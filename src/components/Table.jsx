import React, { useState } from "react";
import dataUsers from "../users.json";
import { CSVLink } from "react-csv";
import "./style.scss";

// React Icons
import { FaEdit, FaTrash, FaFilter, FaShareAlt, FaPlus } from "react-icons/fa";
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

  // Estados para filtro e busca
  const [filterActive, setFilterActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar usuários com base no termo de busca
  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Logicas dos botoes de paginação.
  const pages = (valor) => {
    const increment = valor == "+" && filteredUsers.length > paginacao;
    const decrement = valor == "-" && paginacao > 5;

    if (increment) {
      setPaginacao((prev) => prev + 5);
    } else if (decrement) {
      setPaginacao((prev) => prev - 5);
    }
  };

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
        });

        if (users.length > 5)
          setUsers((prev) => prev.filter((e) => e.id !== id));
      }
    });
  };

  const addUser = () => {
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
  };

  const filterUser = (e) => {
    setFilterActive(!filterActive);
    let filtrado = [...users];

    if (filterActive) {
      filtrado = users.sort((a, b) => a.id - b.id);
    } else {
      filtrado = users.sort((a, b) => b.id - a.id);
    }

    setUsers(filtrado);
  };

  return (
    <>
      {/* Edit Users */}
      {openCap && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Usuário</h2>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <input
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="tel"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Departamento</label>
              <input
                id="department"
                onChange={(e) => setDepartment(e.target.value)}
                value={department}
                type="text"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Cargo</label>
              <input
                id="role"
                onChange={(e) => setRole(e.target.value)}
                value={role}
                type="text"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="datajoined">Data de Admissão</label>
              <input
                id="datajoined"
                onChange={(e) => setDateJoined(e.target.value)}
                value={dateJoined}
                type="date"
                className="form-input"
              />
            </div>

            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setOpenCap(!openCap)}
              >
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={() => saveEdit()}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/add users */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Adicionar Novo Usuário</h2>

            <div className="form-group">
              <label htmlFor="new-name">Nome</label>
              <input
                id="new-name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="form-input"
                placeholder="Digite o nome completo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-email">Email</label>
              <input
                id="new-email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="form-input"
                placeholder="exemplo@empresa.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-phone">Telefone</label>
              <input
                id="new-phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="tel"
                className="form-input"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-department">Departamento</label>
              <input
                id="new-department"
                onChange={(e) => setDepartment(e.target.value)}
                value={department}
                type="text"
                className="form-input"
                placeholder="Ex: TI, RH, Vendas"
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-role">Cargo</label>
              <input
                id="new-role"
                onChange={(e) => setRole(e.target.value)}
                value={role}
                type="text"
                className="form-input"
                placeholder="Ex: Desenvolvedor, Analista"
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-datajoined">Data de Admissão</label>
              <input
                id="new-datajoined"
                onChange={(e) => setDateJoined(e.target.value)}
                value={dateJoined}
                type="date"
                className="form-input"
              />
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => addUser()}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={() => newUser()}>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="app-container">
        <section className="controls-panel">
          <div className="left-controls">
            <button className="btn btn-primary" onClick={addUser}>
              <FaPlus /> Novo Usuário
            </button>

            <div className="search-box">
              <input
                type="text"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="right-controls">
            <button
              className={`btn btn-icon ${filterActive ? "active" : ""}`}
              onClick={() => filterUser(!filterActive)}
            >
              <FaFilter />
              {filterActive ? "Mais Relevantes" : "Menos Relevantes"}
            </button>

            <CSVLink
              className="btn btn-icon"
              data={filteredUsers.slice(paginacao - 5, paginacao)}
              filename="usuarios.csv"
            >
              <FaShareAlt />
              Exportar
            </CSVLink>
          </div>
        </section>

        <section className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Departamento</th>
                <th>Cargo</th>
                <th>Data de Admissão</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers
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
                      <td data-label="Nome">{name}</td>
                      <td data-label="Email">{email}</td>
                      <td data-label="Telefone">{phone}</td>
                      <td data-label="Departamento">{department}</td>
                      <td data-label="Cargo">{role}</td>
                      <td data-label="Data de Admissão">{dateJoined}</td>
                      <td data-label="Ações" className="actions-cell">
                        <button
                          className="btn-icon action-btn"
                          onClick={() => edit(id)}
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn-icon action-btn delete"
                          onClick={() => removeUser(id)}
                          title="Excluir"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="empty-state">
              <p>Nenhum usuário encontrado.</p>
            </div>
          )}

          <div className="table-footer">
            <div className="total-users">
              Total: {filteredUsers.length} usuário(s)
            </div>

            <div className="pagination-controls">
              <button
                onClick={() => pages("-")}
                disabled={paginacao <= 5}
                className="pagination-btn"
              >
                <GrFormPrevious />
              </button>

              <span className="pagination-info">
                Página {Math.ceil(paginacao / 5)} de{" "}
                {Math.ceil(filteredUsers.length / 5)}
              </span>

              <button
                onClick={() => pages("+")}
                disabled={paginacao >= filteredUsers.length}
                className="pagination-btn"
              >
                <MdNavigateNext />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
