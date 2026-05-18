import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function ExpenseChart({ expenses }) {
  // Formateador de moneda para tooltip y resumen del grafico.
  const currencyFormatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

  // Agrupa montos por categoria para construir la serie del grafico.
  const categories = {};

  expenses.forEach((e) => {
    const categoryName = e?.category || "Sin categoría";
    const amount = Number(e?.amount);

    if (!Number.isFinite(amount)) {
      return;
    }

    categories[categoryName] = (categories[categoryName] || 0) + Math.abs(amount);
  });

  // Recharts consume una lista de objetos con nombre y valor.
  const data = Object.keys(categories).map((cat) => ({
    name: cat,
    value: categories[cat],
  }));

  const total = data.reduce((accumulator, item) => accumulator + item.value, 0);

  const COLORS = ["#7dd3fc", "#34d399", "#fbbf24", "#fb7185", "#c4b5fd", "#f97316"];

  const summaryItems = data
    .map((item) => ({
      ...item,
      // Porcentaje relativo sobre el total agregado.
      percent: total > 0 ? Math.round((item.value / total) * 100) : 0,
    }))
    .sort((left, right) => right.value - left.value);

  // Estado alternativo si no existe informacion para graficar.
  if (data.length === 0)
    return (
      <div className="empty-state empty-state--chart">
        <strong>Sin distribución todavía.</strong>
        <p>Cuando agregues movimientos, aquí verás el peso de cada categoría.</p>
      </div>
    );

  return (
    <div className="chart-panel">
      <div className="chart-panel__visual">
        <ResponsiveContainer>
          <PieChart>
            {/* Donut principal con separacion visual entre segmentos */}
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={92}
              paddingAngle={3}
              stroke="rgba(15, 23, 42, 0.25)"
              strokeWidth={1}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => currencyFormatter.format(value)}
              // Se fuerza alto contraste para garantizar legibilidad del hover.
              contentStyle={{
                background: "rgba(11, 18, 32, 0.95)",
                border: "1px solid rgba(148, 163, 184, 0.18)",
                borderRadius: "16px",
                color: "#ffffff",
              }}
              labelStyle={{ color: "#ffffff", fontWeight: 700 }}
              itemStyle={{ color: "#ffffff" }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="chart-wrap__total">
          <span>Total distribuido</span>
          <strong>{currencyFormatter.format(total)}</strong>
        </div>
      </div>

      <div className="chart-breakdown" aria-label="Resumen por categoría">
        {/* Resumen textual complementario a la visualizacion circular */}
        {summaryItems.map((item, index) => (
          <div key={item.name} className="chart-breakdown__item">
            <div className="chart-breakdown__meta">
              <span
                className="chart-breakdown__dot"
                style={{ background: COLORS[index % COLORS.length] }}
              />
              <strong>{item.name}</strong>
            </div>
            <div className="chart-breakdown__values">
              <span>{item.percent}%</span>
              <strong>{currencyFormatter.format(item.value)}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
