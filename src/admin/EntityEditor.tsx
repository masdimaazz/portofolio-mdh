import { useCallback, useEffect, useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, X, Loader2 } from 'lucide-react';
import type { Entity } from './config';
import { client } from './client';
import FieldInput from './FieldInput';

type Row = Record<string, unknown> & { id?: string | number };

export default function EntityEditor({ entity }: { entity: Entity }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);
  const [options, setOptions] = useState<Record<string, { id: string; label: string }[]>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const c = await client();
      // opsi dropdown untuk field select
      for (const f of entity.fields) {
        if (f.type === 'select' && f.optionsFrom) {
          const { data } = await c.from(f.optionsFrom).select('*').order('sort_order');
          setOptions((o) => ({
            ...o,
            [f.optionsFrom!]: (data || []).map((r: Row) => ({
              id: String(r.id),
              label: String(r[f.optionLabel || 'name'] ?? r.id),
            })),
          }));
        }
      }

      if (entity.single) {
        const { data } = await c.from(entity.table).select('*').eq('id', 1).maybeSingle();
        setEditing({ ...entity.defaultRow, ...(data || {}) });
        setRows([]);
      } else {
        const { data, error } = await c.from(entity.table).select('*').order('sort_order');
        if (error) throw error;
        setRows((data as Row[]) || []);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal memuat data');
    } finally {
      setLoading(false);
    }
  }, [entity]);

  useEffect(() => {
    load();
  }, [load]);

  // Susun payload hanya dari kolom yang dikelola field (hindari kirim created_at dll)
  function payloadOf(row: Row): Row {
    const out: Row = {};
    for (const f of entity.fields) out[f.key] = row[f.key];
    return out;
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      const c = await client();
      if (entity.single) {
        const { error } = await c
          .from(entity.table)
          .upsert({ id: 1, ...payloadOf(editing) }, { onConflict: 'id' });
        if (error) throw error;
      } else if (editing.id) {
        const { error } = await c.from(entity.table).update(payloadOf(editing)).eq('id', editing.id);
        if (error) throw error;
      } else {
        const nextOrder = rows.reduce((m, r) => Math.max(m, Number(r.sort_order) || 0), 0) + 1;
        const { error } = await c
          .from(entity.table)
          .insert({ ...payloadOf(editing), sort_order: nextOrder });
        if (error) throw error;
      }
      setEditing(entity.single ? editing : null);
      if (!entity.single) await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  }

  async function remove(row: Row) {
    if (!confirm('Hapus item ini? Tindakan tidak bisa dibatalkan.')) return;
    try {
      const c = await client();
      const { error } = await c.from(entity.table).delete().eq('id', row.id);
      if (error) throw error;
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal menghapus');
    }
  }

  async function reorder(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= rows.length) return;
    const a = rows[index];
    const b = rows[target];
    try {
      const c = await client();
      await Promise.all([
        c.from(entity.table).update({ sort_order: b.sort_order }).eq('id', a.id),
        c.from(entity.table).update({ sort_order: a.sort_order }).eq('id', b.id),
      ]);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal mengubah urutan');
    }
  }

  async function togglePublish(row: Row) {
    if (!entity.publishKey) return;
    try {
      const c = await client();
      await c
        .from(entity.table)
        .update({ [entity.publishKey]: !row[entity.publishKey] })
        .eq('id', row.id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal mengubah status');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted">
        <Loader2 className="h-4 w-4 animate-spin" /> Memuat {entity.label}…
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{entity.label}</h1>
          {!entity.single && (
            <p className="text-sm text-muted">{rows.length} item · urut dari atas ke bawah</p>
          )}
        </div>
        {!entity.single && (
          <button
            onClick={() => setEditing({ ...entity.defaultRow })}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[hsl(var(--accent))] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Tambah
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Form (single langsung tampil; list muncul saat editing) */}
      {editing && (
        <div className="mb-6 rounded-xl border border-base bg-card p-5">
          {!entity.single && (
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">{editing.id ? 'Edit item' : 'Item baru'}</h2>
              <button onClick={() => setEditing(null)} className="text-muted hover:text-[hsl(var(--fg))]">
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {entity.fields.map((f) => (
              <div key={f.key} className={f.type === 'textarea' || f.type === 'list' || f.type === 'image' ? 'sm:col-span-2' : ''}>
                <FieldInput
                  field={f}
                  value={editing[f.key]}
                  onChange={(v) => setEditing((cur) => (cur ? { ...cur, [f.key]: v } : cur))}
                  options={f.optionsFrom ? options[f.optionsFrom] : undefined}
                />
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2">
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[hsl(var(--accent))] px-5 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />} Simpan
            </button>
            {!entity.single && (
              <button
                onClick={() => setEditing(null)}
                className="rounded-lg border border-base px-4 py-2 text-sm hover:border-[hsl(var(--accent))]"
              >
                Batal
              </button>
            )}
          </div>
        </div>
      )}

      {/* Daftar item */}
      {!entity.single && (
        <div className="space-y-2">
          {rows.map((row, i) => (
            <div
              key={String(row.id)}
              className="flex items-center gap-3 rounded-xl border border-base bg-card px-4 py-3"
            >
              <div className="flex flex-col">
                <button
                  onClick={() => reorder(i, -1)}
                  disabled={i === 0}
                  className="text-muted hover:text-[hsl(var(--fg))] disabled:opacity-25"
                  aria-label="Naik"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => reorder(i, 1)}
                  disabled={i === rows.length - 1}
                  className="text-muted hover:text-[hsl(var(--fg))] disabled:opacity-25"
                  aria-label="Turun"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                  {String(row[entity.titleKey || 'id'] ?? '(tanpa judul)')}
                </p>
                {entity.subtitleKey && (
                  <p className="truncate text-sm text-muted">{String(row[entity.subtitleKey] ?? '')}</p>
                )}
              </div>

              {entity.publishKey && (
                <button
                  onClick={() => togglePublish(row)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    row[entity.publishKey]
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-[hsl(var(--border))] text-muted'
                  }`}
                >
                  {row[entity.publishKey] ? 'Published' : 'Draft'}
                </button>
              )}

              <button
                onClick={() => setEditing({ ...row })}
                className="rounded-lg border border-base px-3 py-1.5 text-sm hover:border-[hsl(var(--accent))]"
              >
                Edit
              </button>
              <button
                onClick={() => remove(row)}
                className="rounded-lg p-1.5 text-muted hover:text-red-400"
                aria-label="Hapus"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {rows.length === 0 && (
            <p className="rounded-xl border border-dashed border-base px-4 py-8 text-center text-sm text-muted">
              Belum ada item. Klik "Tambah" untuk membuat.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
