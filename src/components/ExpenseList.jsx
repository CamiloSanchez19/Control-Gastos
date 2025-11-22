export default function ExpenseList({ expenses, deleteExpense }) {
  if (expenses.length === 0)
    return <p className="text-gray-500 text-center">Sin movimientos aún.</p>;

  return (
    <ul className="divide-y divide-gray-200">
      {expenses.map((item) => (
        <li
          key={item.id}
          className="flex justify-between items-center py-3 px-2 hover:bg-gray-50"
        >
          <div>
            <p className="font-semibold">{item.description}</p>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={
                item.type === "Ingreso"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {item.type === "Ingreso" ? "+" : "-"}${item.amount.toLocaleString()}
            </span>
            <button
              onClick={() => deleteExpense(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✖
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
