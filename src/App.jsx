import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import "./App.css";



export default function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { id: Date.now(), ...expense }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const total = expenses.reduce(
    (acc, item) =>
      item.type === "Ingreso" ? acc + item.amount : acc - item.amount,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          💰 Control de Gastos Personales
        </h1>

        <ExpenseForm addExpense={addExpense} />

        <h2 className="text-xl font-semibold mt-6 mb-2">Resumen</h2>
        <ExpenseChart expenses={expenses} />

        <h2 className="text-xl font-semibold mt-6 mb-2">Movimientos</h2>
        <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />

        <div className="mt-6 p-4 text-center bg-blue-50 rounded-lg font-bold text-lg">
          Total actual:{" "}
          <span className={total >= 0 ? "text-green-600" : "text-red-600"}>
            ${total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
