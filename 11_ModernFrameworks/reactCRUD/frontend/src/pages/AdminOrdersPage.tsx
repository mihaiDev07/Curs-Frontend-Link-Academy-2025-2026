import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { getAllOrders, OrderRecord } from "../services/ordersApi";
import { resolveImageUrl } from "../utils/images";

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

function AdminOrdersPage() {
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
      const response = await getAllOrders();
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

  const totalOrders = useMemo(() => orders.length, [orders]);

  return (
    <section>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h2 className="mb-0">Toate comenzile</h2>
          <small className="text-muted">Total: {totalOrders}</small>
        </div>
        <Link className="btn btn-outline-secondary" to="/adminProducts">
          Inapoi la produse admin
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
          Nu exista comenzi inregistrate.
        </div>
      ) : (
        <div className="row g-3">
          {orders
            .slice()
            .sort(
              (left, right) =>
                new Date(right.createdAt).getTime() -
                new Date(left.createdAt).getTime(),
            )
            .map((order) => (
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
                      <div className="text-md-end">
                        <div>
                          <strong>Total:</strong> {order.totalPrice.toFixed(2)}
                        </div>
                        <div className="small text-muted">
                          <strong>Client:</strong> {order.user.name} {order.user.surname}
                        </div>
                        <div className="small text-muted">{order.user.email}</div>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-sm align-middle mb-0">
                        <thead>
                          <tr>
                            <th>Produs</th>
                            <th>Cantitate</th>
                            <th>Pret</th>
                            <th>Imagine</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item) => (
                            <tr key={`${order.orderId}-${item.id}`}>
                              <td>{item.name}</td>
                              <td>{item.quantity}</td>
                              <td>{item.price}</td>
                              <td>
                                {item.image ? (
                                  <img
                                    src={resolveImageUrl(item.image)}
                                    alt={item.name}
                                    width={48}
                                    height={48}
                                    className="rounded"
                                    style={{ objectFit: "cover" }}
                                  />
                                ) : (
                                  "-"
                                )}
                              </td>
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

export default AdminOrdersPage;