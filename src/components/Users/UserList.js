import React, { useState, useEffect } from "react";
import { getUsersList } from "../../services/GrupController";
import { deleteUser } from "../../services/UserController";

function UserList() {
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userList = await getUsersList();
        setUsers(userList);
      } catch (error) {
        console.error("Error cercant usuaris:", error);
      }
    }

    fetchUsers();
  }, []);

  async function handleDeleteUser(userId) {
    if (userToDelete === userId) {
      try {
        await deleteUser(userId);
        setUsers(users.filter((user) => user._id !== userId));
        setUserToDelete(null);
      } catch (error) {
        console.error("Error esborrant usuaris:", error);
      }
    } else {
      setUserToDelete(userId);
    }
  }

  return (
    <div>
      <h2>Llista d'usuaris</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Cognoms</th>
            <th>DNI</th>
            <th>Especialitat</th>
            <th>Accions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.nom}</td>
              <td>{user.cognom}</td>
              <td>{user.dni}</td>
              <td>{user.especialitat}</td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>
                  {userToDelete === user._id ? "Confirmar esborrat" : "Eliminar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
