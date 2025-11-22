import { useState } from "react";

export default function ExpenseForm({ addExpense }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "General",
    type: "Gasto",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) return alert("Campos vacíos");
    addExpense({ ...form, amount: parseFloat(form.amount) });
    setForm({ description: "", amount: "", category: "General", type: "Gasto" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-blue-50 p-4 rounded-lg"
    >
      <input
        type="text"
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        className="border p-2 rounded w-full sm:w-auto flex-1"
      />
      <input
        type="number"
        name="amount"
        placeholder="Monto"
        value={form.amount}
        onChange={handleChange}
        className="border p-2 rounded w-full sm:w-24"
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option>General</option>
        <option>Alimentación</option>
        <option>Transporte</option>
        <option>Entretenimiento</option>
        <option>Salud</option>
      </select>
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option>Gasto</option>
        <option>Ingreso</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Agregar
      </button>
    </form>
  );
}
