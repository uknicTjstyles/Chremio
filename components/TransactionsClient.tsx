"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Field } from "@/components/Field";
import TransactionForm from "@/components/TransactionForm";
import { ALL_CATEGORIES } from "@/lib/categories";
import { formatDate, money } from "@/lib/format";
import type { Tx } from "@/lib/types";

const selectClass =
  "rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-base text-fg outline-none focus:border-evergreen";

function TypeBadge({ type }: { type: Tx["type"] }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
        type === "income" ? "bg-evergreen/15 text-evergreen" : "bg-danger/15 text-danger"
      }`}
    >
      {type === "income" ? "Income" : "Expense"}
    </span>
  );
}

export default function TransactionsClient() {
  const [items, setItems] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Tx | null>(null);
  const [toDelete, setToDelete] = useState<Tx | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    const params = new URLSearchParams();

    if (q.trim()) params.set("q", q.trim());
    if (type) params.set("type", type);
    if (category) params.set("category", category);

    try {
      const res = await fetch(`/api/transactions?${params.toString()}`);

      if (res.status === 401) {
        window.location.href = "/sign-in";
        return;
      }

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Could not load.");

      setItems(json.transactions);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not load transactions.", {
        toastId: "load-error",
      });
    } finally {
      setLoading(false);
    }
  }, [q, type, category]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  async function confirmDelete() {
    if (!toDelete) return;

    setDeleting(true);

    try {
      const res = await fetch(`/api/transactions/${toDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("failed");

      setItems((prev) => prev.filter((t) => t.id !== toDelete.id));
      toast.success("Transaction deleted.");
      setToDelete(null);
    } catch {
      toast.error("Could not delete. Try again.");
    } finally {
      setDeleting(false);
    }
  }

  function openAdd() {
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(tx: Tx) {
    setEditing(tx);
    setShowForm(true);
  }

  function onSaved() {
    setShowForm(false);
    setEditing(null);
    void load();
  }

  const income = items
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = items
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const card = "min-w-0 rounded-xl border border-line bg-surface p-4";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-fg">Transactions</h1>
          <p className="text-sm text-muted">Keep track of your money, always.</p>
        </div>

        <button
          onClick={openAdd}
          className="rounded-lg bg-evergreen px-4 py-2.5 text-sm font-semibold text-canvas transition hover:bg-mint"
        >
          + Add
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className={card}>
          <p className="text-sm text-muted">Total income</p>
          <p className="mt-1 break-words text-lg font-semibold text-evergreen">
            {money.format(income)}
          </p>
        </div>

        <div className={card}>
          <p className="text-sm text-muted">Total spending</p>
          <p className="mt-1 break-words text-lg font-semibold text-danger">
            {money.format(expense)}
          </p>
        </div>

        <div className={card}>
          <p className="text-sm text-muted">Net balance</p>
          <p className="mt-1 break-words text-lg font-semibold text-fg">
            {money.format(income - expense)}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <div className="w-full sm:w-auto sm:min-w-56 sm:flex-1">
          <Field
            label="Search"
            hideLabel
            icon="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search transactions"
          />
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Filter by type"
          className={`${selectClass} flex-1 sm:flex-none`}
        >
          <option value="">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
          className={`${selectClass} flex-1 sm:flex-none`}
        >
          <option value="">All categories</option>
          {ALL_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="mt-8 text-center text-sm text-muted">Loading...</p>}

      {!loading && items.length === 0 && (
        <p className="mt-8 rounded-xl border border-line bg-surface px-4 py-10 text-center text-sm text-muted">
          No transactions found. Add your first one.
        </p>
      )}

      {items.length > 0 && (
        <>
          <ul className="mt-4 space-y-3 lg:hidden">
            {items.map((t) => (
              <li key={t.id} className="rounded-xl border border-line bg-surface p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-fg">{t.description || t.category}</p>
                    <p className="text-xs text-muted">
                      {t.category} &middot; {formatDate(t.date)}
                    </p>
                  </div>

                  <p
                    className={`shrink-0 font-semibold ${
                      t.type === "income" ? "text-evergreen" : "text-danger"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {money.format(t.amount)}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <TypeBadge type={t.type} />

                  <div className="flex gap-1 text-sm">
                    <button
                      onClick={() => openEdit(t)}
                      className="px-2 py-1 text-muted underline hover:text-fg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setToDelete(t)}
                      className="px-2 py-1 text-danger underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 hidden overflow-x-auto rounded-xl border border-line bg-surface lg:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line text-xs text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 text-right font-medium">Amount</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>

              <tbody>
                {items.map((t) => (
                  <tr key={t.id} className="border-b border-line last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDate(t.date)}</td>
                    <td className="px-4 py-3 text-fg">{t.description || "-"}</td>
                    <td className="px-4 py-3 text-muted">{t.category}</td>
                    <td className="px-4 py-3">
                      <TypeBadge type={t.type} />
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-3 text-right font-medium ${
                        t.type === "income" ? "text-evergreen" : "text-danger"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"}
                      {money.format(t.amount)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <button
                        onClick={() => openEdit(t)}
                        className="mr-3 text-muted underline hover:text-fg"
                      >
                        Edit
                      </button>
                      <button onClick={() => setToDelete(t)} className="text-danger underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showForm && (
        <TransactionForm
          tx={editing}
          onClose={() => setShowForm(false)}
          onSaved={onSaved}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete transaction?"
          message={`This will remove ${toDelete.description || toDelete.category} from your records.`}
          confirmLabel="Delete"
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  );
}
