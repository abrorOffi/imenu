export default function DashboardStats({ orders }) {
  const todayOrders = orders.filter(
    order => new Date(order.created_at).toDateString() === new Date().toDateString()
  );

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
        <p className="text-3xl font-bold">{orders.length}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Today's Orders</h2>
        <p className="text-3xl font-bold">{todayOrders.length}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
        <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
      </div>
    </div>
  );
}