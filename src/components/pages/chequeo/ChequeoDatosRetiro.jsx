import { useState } from "react";

const CheckoutDatosRetiro = ({ onConfirm, onClose }) => {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [horario, setHorario] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !fecha || !horario) {
      alert("Todos los campos son obligatorios");
      return;
    }

    onConfirm({ nombre, fecha, horario });
  };

  return (
    <div>
      <h4 className="mb-4">Datos para el Retiro</h4>

      <form onSubmit={manejarSubmit}>
        {/* Nombre */}
        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Nombre completo:</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Cristian Díaz"
          />
        </div>

        {/* Fecha */}
        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Fecha de retiro:</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        {/* Horario */}
        <div className="mb-4 text-start">
          <label className="form-label fw-bold">Horario de retiro:</label>
          <input
            type="time"
            className="form-control"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
          />
        </div>

        {/* Botones */}
        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
          >
            ← Volver
          </button>

          <button type="submit" className="btn btn-primary">
            Continuar →
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutDatosRetiro;
