import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ExpenseChart({ expenses }) {
  const categories = {};

  expenses.forEach((e) => {
    const value = e.type === "Ingreso" ? e.amount : -e.amount;
    categories[e.category] = (categories[e.category] || 0) + value;
  });

  const data = Object.keys(categories).map((cat) => ({
    name: cat,
    value: categories[cat],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D14E4E"];

  if (data.length === 0)
    return <p className="text-gray-500 text-center">Sin datos para graficar.</p>;

  return (
    <div className="h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
