import React, { useState, useEffect } from "react";
import { getConvocatorias } from "../../services/ConvocatoriaController";
import { Link } from "react-router-dom";
import ConvocatoriaDelete from "./ConvocatoriaDelete";

export default function ConvocatoriaList() {
  const [convocatorias, setConvocatorias] = useState([]);

  useEffect(() => {
    fetchConvocatorias();
  }, []);

  async function fetchConvocatorias() {
    try {
      const convocatorias = await getConvocatorias();
      console.log(convocatorias)
      setConvocatorias(convocatorias);
    } catch (error) {
      console.error("Error fetching convocatorias:", error);
    }
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Data</th>
            <th>Hora Inici</th>
            <th>Durada</th>
            <th>Lloc</th>
            <th>Punts del Dia</th>
            <th>Convocats</th>
            <th>Plantilla Punts</th>
            <th>Responsable</th>
            <th>Creador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {convocatorias.map((convocatoria) => (
            <tr key={convocatoria._id}>
              <td>{convocatoria.nom}</td>
              <td>{convocatoria.data}</td>
              <td>{convocatoria.horaInici}</td>
              <td>{convocatoria.durada}</td>
              <td>{convocatoria.lloc}</td>
              <td>
                {convocatoria.puntsOrdreDia.map((punts) => (
                  <li key={punts}>{punts}</li>
                ))}
              </td>
              <td>
                {convocatoria.convocats.map((grup) => (
                  <ul key={grup._id}>
                    {grup.membres.map((user) => (
                      <li key={user._id}>{user.nom}</li>
                    ))}
                  </ul>
                ))}
              </td>
              <td>
                {convocatoria.plantilla.puntsOrdreDia.map((punts) => (
                  <li key={punts}>{punts}</li>
                ))}
              </td>
              <td>{convocatoria.responsable.nom}</td>
              <td>{convocatoria.creador ? convocatoria.creador.nom : "null"}</td>
              <td>
                <Link
                  className="plantilla-page-link"
                  to={`/convocatorias/edit/${convocatoria._id}`}
                >
                  Editar
                </Link>{" "}
                {/* Agrega esta línea */}
                <ConvocatoriaDelete
                  className="plantilla-delete"
                  convocatoriaId={convocatoria._id}
                  onUpdate={fetchConvocatorias}
                />{" "}
                {/* Agrega esta línea */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
