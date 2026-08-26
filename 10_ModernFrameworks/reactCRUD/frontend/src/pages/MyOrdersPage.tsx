import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { getMyOrders, OrderRecord } from "../services/ordersApi";

function formatDate(dateValue: string): string {
  const parsed = new Date(dateValue);

  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return parsed.toLocaleString("ro-RO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MyOrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadOrders();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  async function loadOrders(): Promise<void> {
    setLoading(true);
    setError("");

    try {
      const response = await getMyOrders();
      setOrders(response);
    } catch (err) {
      const axiosError = err as AxiosError;
      const status = axiosError.response?.status
        ? ` (status ${axiosError.response.status})`
        : "";
      setError(`Nu s-au putut incarca comenzile${status}.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h2 className="mb-0">Comenzile mele</h2>
          <small className="text-muted">Total: {orders.length}</small>
        </div>
        <Link className="btn btn-outline-secondary" to="/productsList">
          Inapoi la produse
        </Link>
      </div>

      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : !orders.length ? (
        <div className="alert alert-secondary" role="alert">
          Nu ai comenzi inregistrate.
        </div>
      ) : (
        <div className="row g-3">
          {orders.map((order) => (
            <div key={order.orderId} className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
                    <div>
                      <h5 className="card-title mb-1">{order.orderId}</h5>
                      <small className="text-muted">
                        {formatDate(order.createdAt)}
                      </small>
                    </div>
                    <div>
                      <strong>Total:</strong> {order.totalPrice.toFixed(2)}
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-sm align-middle mb-0">
                      <thead>
                        <tr>
                          <th>Produs</th>
                          <th>Cantitate</th>
                          <th>Pret</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item) => (
                          <tr key={`${order.orderId}-${item.id}`}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyOrdersPage;