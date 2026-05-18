import { useState } from "react";

export default function ExpenseForm({ addExpense }) {
  // Estado local del formulario de registro.
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "General",
    type: "Gasto",
  });

  // Actualiza cualquier campo del formulario usando su nombre.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validacion minima para evitar envios vacios.
    if (!form.description || !form.amount) return alert("Campos vacíos");

    // Convierte el monto a numero antes de propagar el registro.
    addExpense({ ...form, amount: parseFloat(form.amount) });

    // Reinicia el formulario al estado inicial.
    setForm({ description: "", amount: "", category: "General", type: "Gasto" });
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <label className="field field--wide">
        <span>Descripción</span>
        <input
          type="text"
          name="description"
          placeholder="Ej. supermercado, sueldo, café..."
          value={form.description}
          onChange={handleChange}
        />
      </label>

      <label className="field">
        <span>Monto</span>
        <input
          type="number"
          name="amount"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={form.amount}
          onChange={handleChange}
        />
      </label>

      <label className="field">
        <span>Categoría</span>
        <select name="category" value={form.category} onChange={handleChange}>
          <option>General</option>
          <option>Alimentación</option>
          <option>Transporte</option>
          <option>Entretenimiento</option>
          <option>Salud</option>
          <option>Hogar</option>
          <option>Trabajo</option>
        </select>
      </label>

      <label className="field">
        <span>Tipo</span>
        <select name="type" value={form.type} onChange={handleChange}>
          <option>Gasto</option>
          <option>Ingreso</option>
        </select>
      </label>

      <button type="submit" className="expense-form__button">
        Guardar movimiento
      </button>
    </form>
  );
}
