export default function ExpenseList({ expenses, deleteExpense }) {
  // Formateadores de salida para mostrar montos y fechas al usuario.
  const currencyFormatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

  const dateFormatter = new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Estado vacio cuando aun no hay movimientos.
  if (expenses.length === 0)
    return (
      <div className="empty-state">
        <strong>Tu tablero está limpio.</strong>
        <p>Agrega el primer ingreso o gasto para ver cómo cambia el panel.</p>
      </div>
    );

  return (
    <ul className="movement-list">
      {/* Renderiza cada registro con su categoria, fecha y accion de borrado */}
      {expenses.map((item) => (
        <li key={item.id} className="movement-card">
          <div className="movement-card__main">
            <span
              className={`movement-badge movement-badge--${
                item.type === "Ingreso" ? "income" : "expense"
              }`}
            >
              {item.type}
            </span>
            <div>
              <p className="movement-card__title">{item.description}</p>
              <p className="movement-card__meta">
                {item.category || "Sin categoría"} · {dateFormatter.format(new Date(item.createdAt || Date.now()))}
              </p>
            </div>
          </div>
          <div className="movement-card__side">
            <span
              className={
                item.type === "Ingreso"
                  ? "movement-card__amount movement-card__amount--income"
                  : "movement-card__amount movement-card__amount--expense"
              }
            >
              {item.type === "Ingreso" ? "+" : "-"}
              {currencyFormatter.format(item.amount)}
            </span>
            <button
              onClick={() => deleteExpense(item.id)}
              className="movement-card__delete"
              aria-label={`Eliminar ${item.description}`}
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
