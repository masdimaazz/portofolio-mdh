import { useState } from 'react';
import type { Field } from './config';
import { uploadImage } from './client';

interface Props {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
  options?: { id: string; label: string }[]; // untuk 'select'
}

const inputCls =
  'w-full rounded-lg border border-base bg-[hsl(var(--page))] px-3 py-2 text-sm outline-none focus:border-[hsl(var(--accent))]';

export default function FieldInput({ field, value, onChange, options }: Props) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr(null);
    try {
      const url = await uploadImage(file, field.imageFolder || 'misc');
      onChange(url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Upload gagal');
    } finally {
      setUploading(false);
    }
  }

  const control = (() => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            className={inputCls + ' min-h-[90px] resize-y'}
            value={(value as string) ?? ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            className={inputCls}
            value={value === null || value === undefined ? '' : String(value)}
            onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
          />
        );
      case 'boolean':
        return (
          <button
            type="button"
            onClick={() => onChange(!value)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              value ? 'bg-[hsl(var(--accent))]' : 'bg-[hsl(var(--border))]'
            }`}
            aria-pressed={Boolean(value)}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                value ? 'left-[22px]' : 'left-0.5'
              }`}
            />
          </button>
        );
      case 'color':
        return (
          <div className="flex items-center gap-2">
            <input
              type="color"
              className="h-9 w-12 cursor-pointer rounded border border-base bg-transparent"
              value={(value as string) || '#3b82f6'}
              onChange={(e) => onChange(e.target.value)}
            />
            <input
              className={inputCls}
              value={(value as string) ?? ''}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        );
      case 'tags':
        return (
          <input
            className={inputCls}
            value={Array.isArray(value) ? (value as string[]).join(', ') : ''}
            onChange={(e) =>
              onChange(
                e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          />
        );
      case 'list':
        return (
          <textarea
            className={inputCls + ' min-h-[90px] resize-y'}
            value={Array.isArray(value) ? (value as string[]).join('\n') : ''}
            onChange={(e) =>
              onChange(
                e.target.value
                  .split('\n')
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          />
        );
      case 'select':
        return (
          <select
            className={inputCls}
            value={(value as string) ?? ''}
            onChange={(e) => onChange(e.target.value || null)}
          >
            <option value="">— pilih —</option>
            {(options || []).map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        );
      case 'choice':
        return (
          <select
            className={inputCls}
            value={(value as string) ?? ''}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">— pilih —</option>
            {(field.choices || []).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        );
      case 'image':
        return (
          <div className="space-y-2">
            {value ? (
              <img
                src={value as string}
                alt=""
                className="h-28 w-full max-w-xs rounded-lg border border-base object-cover"
              />
            ) : null}
            <div className="flex items-center gap-2">
              <label className="cursor-pointer rounded-lg border border-base bg-card px-3 py-2 text-sm hover:border-[hsl(var(--accent))]">
                {uploading ? 'Mengunggah…' : 'Pilih gambar'}
                <input type="file" accept="image/*" className="hidden" onChange={onFile} />
              </label>
              {value ? (
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="text-sm text-muted hover:text-[hsl(var(--fg))]"
                >
                  Hapus
                </button>
              ) : null}
            </div>
            <input
              className={inputCls}
              placeholder="atau tempel URL"
              value={(value as string) ?? ''}
              onChange={(e) => onChange(e.target.value)}
            />
            {err ? <p className="text-xs text-red-400">{err}</p> : null}
          </div>
        );
      default:
        return (
          <input
            className={inputCls}
            value={(value as string) ?? ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );
    }
  })();

  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{field.label}</span>
      {control}
      {field.help ? <span className="mt-1 block text-xs text-muted">{field.help}</span> : null}
    </label>
  );
}
