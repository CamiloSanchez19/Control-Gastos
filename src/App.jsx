import { useEffect, useMemo, useState } from "react"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import ExpenseChart from "./components/ExpenseChart"
import "./App.css"

// Formateadores centralizados para mantener consistencia de moneda y fecha.
const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
})

const compactCurrencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "short",
})

export default function App() {
  // Inicializa el estado leyendo del almacenamiento local del navegador.
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses")
    return saved ? JSON.parse(saved) : []
  })

  // Persiste cada cambio del listado para conservar informacion entre recargas.
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (expense) => {
    // Normaliza datos basicos para evitar registros incompletos o inconsistentes.
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      {
        ...expense,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        category: expense.category || "General",
        type: expense.type === "Ingreso" ? "Ingreso" : "Gasto",
        amount: Number(expense.amount) || 0,
        description: expense.description?.trim() || "Sin descripción",
      },
    ])
  }

  const deleteExpense = (id) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id)
    )
  }

  // Consolida metricas del dashboard en un solo calculo memorizado.
  const dashboard = useMemo(() => {
    const safeExpenses = expenses.filter(
      (item) => item && Number.isFinite(Number(item.amount)) && item.description
    )

    const income = safeExpenses.reduce(
      (accumulator, item) =>
        item.type === "Ingreso" ? accumulator + item.amount : accumulator,
      0
    )

    const expensesTotal = safeExpenses.reduce(
      (accumulator, item) =>
        item.type === "Gasto" ? accumulator + item.amount : accumulator,
      0
    )

    const balance = income - expensesTotal

    const categoryTotals = safeExpenses.reduce((accumulator, item) => {
      const categoryName = item.category || "Sin categoría"

      accumulator[categoryName] =
        (accumulator[categoryName] || 0) + Math.abs(Number(item.amount))
      return accumulator
    }, {})

    const topCategory = Object.entries(categoryTotals).sort(
      (left, right) => right[1] - left[1]
    )[0]

    const lastMovement = expenses[expenses.length - 1]

    return {
      safeExpenses,
      income,
      expensesTotal,
      balance,
      topCategory,
      lastMovement,
      movementCount: expenses.length,
    }
  }, [expenses])

  // Tarjetas principales mostradas en el encabezado del tablero.
  const heroCards = [
    {
      label: "Saldo actual",
      value: currencyFormatter.format(dashboard.balance),
      tone: dashboard.balance >= 0 ? "positive" : "negative",
      detail:
        dashboard.balance >= 0 ? "Mantienes un margen sano" : "Necesitas ajustar gastos",
    },
    {
      label: "Ingresos",
      value: compactCurrencyFormatter.format(dashboard.income),
      tone: "neutral",
      detail: "Entradas registradas en el periodo",
    },
    {
      label: "Gastos",
      value: compactCurrencyFormatter.format(dashboard.expensesTotal),
      tone: "warning",
      detail: "Salidas acumuladas en el periodo",
    },
  ]

  // Indicadores secundarios para estado general de la actividad.
  const stats = [
    {
      label: "Movimientos",
      value: dashboard.movementCount,
      detail: "Registros guardados",
    },
    {
      label: "Categoría más activa",
      value: dashboard.topCategory ? dashboard.topCategory[0] : "Sin datos",
      detail: dashboard.topCategory
        ? currencyFormatter.format(dashboard.topCategory[1])
        : "Agrega tu primer movimiento",
    },
    {
      label: "Último registro",
      value: dashboard.lastMovement
        ? dashboard.lastMovement.description
        : "Sin actividad",
      detail: dashboard.lastMovement
        ? `${dashboard.lastMovement.category} · ${dateFormatter.format(
            new Date(dashboard.lastMovement.createdAt || Date.now())
          )}`
        : "Todavía no has guardado nada",
    },
  ]

  return (
    <div className="app-shell">
      {/* Elementos decorativos de fondo */}
      <div className="app-shell__orb app-shell__orb--one" />
      <div className="app-shell__orb app-shell__orb--two" />

      <main className="dashboard">
        {/* Encabezado con propuesta de valor y metricas principales */}
        <section className="hero panel">
          <div className="hero__copy">
            <p className="eyebrow">Panel de finanzas personales</p>
            <h1>Control de Gastos Personal</h1>
            <p className="hero__text">
              Registra ingresos y gastos, revisa patrones reales y mantén una
              vista limpia de tu dinero sin una interfaz genérica.
            </p>

            <div className="hero__tags">
              <span>Saldo en vivo</span>
              <span>Historial local</span>
              <span>Resumen visual</span>
            </div>
          </div>

          <div className="hero__cards">
            {heroCards.map((card) => (
              <article key={card.label} className={`metric metric--${card.tone}`}>
                <p>{card.label}</p>
                <strong>{card.value}</strong>
                <span>{card.detail}</span>
              </article>
            ))}
          </div>
        </section>

        {/* Resumen rapido de actividad */}
        <section className="stats-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card panel">
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
              <span>{stat.detail}</span>
            </article>
          ))}
        </section>

        {/* Zona operativa: formulario y analitica por categoria */}
        <section className="dashboard-grid">
          <article className="panel panel--form">
            <div className="section-head">
              <div>
                <p className="eyebrow">Nuevo movimiento</p>
                <h2>Agregar registro</h2>
              </div>
              <span className="section-head__hint">Ingreso o gasto</span>
            </div>
            <ExpenseForm addExpense={addExpense} />
          </article>

          <article className="panel panel--chart">
            <div className="section-head">
              <div>
                <p className="eyebrow">Distribución</p>
                <h2>Resumen por categoría</h2>
              </div>
              <span className="section-head__hint">Peso relativo</span>
            </div>
            <ExpenseChart expenses={expenses} />
          </article>
        </section>

        {/* Historial de movimientos registrados */}
        <section className="panel panel--list">
          <div className="section-head">
            <div>
              <p className="eyebrow">Actividad reciente</p>
              <h2>Movimientos</h2>
            </div>
            <span className="section-head__hint">Todo tu historial</span>
          </div>
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
        </section>
      </main>
    </div>
  )
}
