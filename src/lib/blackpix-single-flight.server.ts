/**
 * In-process single-flight for trusted server calls. A simultaneous request with
 * the same order key shares the same promise instead of issuing a second call.
 * Not a distributed lock: multiple server instances require a shared lease.
 */
const inflight = new Map<string, Promise<unknown>>();
export function singleFlightOrder<T>(orderId: string, work: () => Promise<T>): Promise<T> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId))
    return Promise.reject(new Error("invalid_order_id"));
  const active = inflight.get(orderId);
  if (active) return active as Promise<T>;
  const task = Promise.resolve().then(work);
  inflight.set(orderId, task);
  void task.then(() => {
    if (inflight.get(orderId) === task) inflight.delete(orderId);
  }, () => {
    if (inflight.get(orderId) === task) inflight.delete(orderId);
  });
  return task;
}
