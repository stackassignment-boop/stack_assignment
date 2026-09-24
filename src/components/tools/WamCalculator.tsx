'use client';

import { useState, useMemo, useCallback } from 'react';
import { Plus, Trash2, RotateCcw, Info, Target, AlertTriangle } from 'lucide-react';

/**
 * Weighted Average Mark calculator for Australian universities.
 *
 * WAM is genuinely AU-specific — there is no direct UK equivalent — which is
 * why it is worth building properly rather than shipping a generic GPA widget
 * with the labels swapped.
 *
 * The core formula every AU institution shares:
 *
 *     WAM = Σ(mark × weight) / Σ(weight)
 *
 * What differs between institutions is (a) what counts as "weight" and (b)
 * where the grade boundaries sit. Both are exposed as options below rather
 * than hard-coded, because hard-coding one university's rule and presenting it
 * as "your WAM" would just be wrong for most visitors.
 */

interface Band {
  code: string;
  name: string;
  /** Inclusive lower bound of the band, as a percentage. */
  min: number;
  /** Grade point on the 7-point scale most AU institutions use. */
  gpa: number;
}

interface Scheme {
  label: string;
  /** Illustrative, not exhaustive — students should still check their handbook. */
  unis: string;
  /** Ordered high to low so the first match wins. */
  bands: Band[];
}

const SCHEMES: Record<string, Scheme> = {
  standard: {
    label: 'HD 80 / D 70 / C 60 / P 50',
    unis: 'Monash, Deakin, UWA, RMIT, La Trobe, Griffith, QUT, Curtin, CQU, Torrens',
    bands: [
      { code: 'HD', name: 'High Distinction', min: 80, gpa: 7 },
      { code: 'D', name: 'Distinction', min: 70, gpa: 6 },
      { code: 'C', name: 'Credit', min: 60, gpa: 5 },
      { code: 'P', name: 'Pass', min: 50, gpa: 4 },
      { code: 'N', name: 'Fail', min: 0, gpa: 0 },
    ],
  },
  raised: {
    label: 'HD 85 / D 75 / CR 65 / P 50',
    unis: 'UNSW, University of Sydney, UTS, Macquarie, Western Sydney',
    bands: [
      { code: 'HD', name: 'High Distinction', min: 85, gpa: 7 },
      { code: 'DN', name: 'Distinction', min: 75, gpa: 6 },
      { code: 'CR', name: 'Credit', min: 65, gpa: 5 },
      { code: 'PS', name: 'Pass', min: 50, gpa: 4 },
      { code: 'FL', name: 'Fail', min: 0, gpa: 0 },
    ],
  },
};

/**
 * Honours classification thresholds. Widely used but *not* universal — several
 * institutions set H1 at 85, and some award on a separate thesis mark rather
 * than the coursework WAM. Surfaced with a caveat, never as a promise.
 */
const HONOURS = [
  { min: 80, code: 'H1', name: 'First Class Honours' },
  { min: 75, code: 'H2A', name: 'Second Class Honours, Division A' },
  { min: 70, code: 'H2B', name: 'Second Class Honours, Division B' },
  { min: 65, code: 'H3', name: 'Third Class Honours' },
];

interface Unit {
  id: string;
  code: string;
  mark: string;
  credit: string;
  level: string;
  include: boolean;
}

let seq = 0;
const newUnit = (credit = '12'): Unit => ({
  id: `u${++seq}`,
  code: '',
  mark: '',
  credit,
  level: '1',
  include: true,
});

function bandFor(mark: number, scheme: Scheme): Band {
  // Bands are ordered descending, so the first satisfied bound is the match.
  return scheme.bands.find((b) => mark >= b.min) ?? scheme.bands[scheme.bands.length - 1];
}

const round = (n: number, dp = 2) =>
  (Math.round(n * 10 ** dp) / 10 ** dp).toFixed(dp);

export default function WamCalculator() {
  const [units, setUnits] = useState<Unit[]>([newUnit(), newUnit(), newUnit(), newUnit()]);
  const [schemeKey, setSchemeKey] = useState<keyof typeof SCHEMES | string>('standard');
  const [weighting, setWeighting] = useState<'credit' | 'level'>('credit');
  const [target, setTarget] = useState('');
  const [remainingCp, setRemainingCp] = useState('');
  const [remainingLevel, setRemainingLevel] = useState('3');

  const scheme = SCHEMES[schemeKey] ?? SCHEMES.standard;

  const update = useCallback((id: string, patch: Partial<Unit>) => {
    setUnits((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  }, []);

  const remove = useCallback((id: string) => {
    setUnits((prev) => (prev.length > 1 ? prev.filter((u) => u.id !== id) : prev));
  }, []);

  const result = useMemo(() => {
    const rows = units.map((u) => {
      const mark = parseFloat(u.mark);
      const credit = parseFloat(u.credit);
      const level = parseInt(u.level, 10) || 1;
      const valid =
        Number.isFinite(mark) && mark >= 0 && mark <= 100 && Number.isFinite(credit) && credit > 0;
      // Level weighting multiplies credit points by the unit's year level, so a
      // third-year unit moves the average three times as much as a first-year
      // one. Institutions that do this are trying to reflect that later units
      // are a better signal of final standing.
      const weight = valid ? (weighting === 'level' ? credit * level : credit) : 0;
      return { unit: u, mark, credit, level, valid, weight };
    });

    const counted = rows.filter((r) => r.valid && r.unit.include);
    const totalWeight = counted.reduce((s, r) => s + r.weight, 0);
    const totalCredit = counted.reduce((s, r) => s + r.credit, 0);

    const wam =
      totalWeight > 0
        ? counted.reduce((s, r) => s + r.mark * r.weight, 0) / totalWeight
        : null;

    // GPA conventionally uses credit points only, never year-level weighting,
    // so it is computed on its own basis rather than reusing `weight`.
    const gpa =
      totalCredit > 0
        ? counted.reduce((s, r) => s + bandFor(r.mark, scheme).gpa * r.credit, 0) / totalCredit
        : null;

    const failed = counted.filter((r) => r.mark < 50);
    const honours = wam === null ? null : HONOURS.find((h) => wam >= h.min) ?? null;

    // Projection: what average do the remaining units need to average for the
    // overall WAM to reach `target`?
    //
    //   target = (wam × W + required × R) / (W + R)
    //   required = (target × (W + R) − wam × W) / R
    //
    let projection: null | { required: number; achievable: boolean; alreadyThere: boolean } = null;
    const t = parseFloat(target);
    const rcp = parseFloat(remainingCp);
    if (wam !== null && Number.isFinite(t) && Number.isFinite(rcp) && rcp > 0 && totalWeight > 0) {
      const R =
        weighting === 'level' ? rcp * (parseInt(remainingLevel, 10) || 1) : rcp;
      const required = (t * (totalWeight + R) - wam * totalWeight) / R;
      projection = {
        required,
        achievable: required <= 100,
        alreadyThere: required <= 0,
      };
    }

    return { rows, counted, totalWeight, totalCredit, wam, gpa, failed, honours, projection };
  }, [units, weighting, scheme, target, remainingCp, remainingLevel]);

  const { wam, gpa, totalCredit, counted, failed, honours, projection, rows } = result;

  return (
    <div className="space-y-6">
      {/* ---------- Settings ---------- */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Your university&rsquo;s grade bands
          </span>
          <select
            value={schemeKey}
            onChange={(e) => setSchemeKey(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {Object.entries(SCHEMES).map(([k, s]) => (
              <option key={k} value={k}>
                {s.label}
              </option>
            ))}
          </select>
          <span className="mt-1.5 block text-xs text-slate-500 dark:text-slate-400">
            e.g. {scheme.unis}
          </span>
        </label>

        <label className="block">
          <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Weighting method
          </span>
          <select
            value={weighting}
            onChange={(e) => setWeighting(e.target.value as 'credit' | 'level')}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="credit">Credit points only (most common)</option>
            <option value="level">Credit points × year level</option>
          </select>
          <span className="mt-1.5 block text-xs text-slate-500 dark:text-slate-400">
            {weighting === 'credit'
              ? 'Every unit counts in proportion to its credit points.'
              : 'Later-year units count more. Used by Macquarie, UTS and Sydney among others.'}
          </span>
        </label>
      </div>

      {/* ---------- Units ---------- */}
      <div className="overflow-x-auto -mx-1 px-1">
        <table className="w-full min-w-[640px] border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <th className="px-3 pb-1">Unit code (optional)</th>
              <th className="px-3 pb-1 w-28">Mark %</th>
              <th className="px-3 pb-1 w-32">Credit points</th>
              {weighting === 'level' && <th className="px-3 pb-1 w-28">Year level</th>}
              <th className="px-3 pb-1 w-24">Grade</th>
              <th className="px-3 pb-1 w-20 text-center">Count</th>
              <th className="px-3 pb-1 w-12" />
            </tr>
          </thead>
          <tbody>
            {rows.map(({ unit, mark, valid }) => {
              const band = valid ? bandFor(mark, scheme) : null;
              const dim = !unit.include ? 'opacity-45' : '';
              return (
                <tr key={unit.id} className={`bg-slate-50 dark:bg-slate-800/60 ${dim}`}>
                  <td className="px-3 py-2 rounded-l-xl">
                    <input
                      type="text"
                      value={unit.code}
                      onChange={(e) => update(unit.id, { code: e.target.value })}
                      placeholder="e.g. MKT1120"
                      className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      max={100}
                      value={unit.mark}
                      onChange={(e) => update(unit.id, { mark: e.target.value })}
                      placeholder="0&ndash;100"
                      aria-label="Mark percentage"
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-2 py-1.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      value={unit.credit}
                      onChange={(e) => update(unit.id, { credit: e.target.value })}
                      aria-label="Credit points"
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-2 py-1.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
                    />
                  </td>
                  {weighting === 'level' && (
                    <td className="px-3 py-2">
                      <select
                        value={unit.level}
                        onChange={(e) => update(unit.id, { level: e.target.value })}
                        aria-label="Year level"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-2 py-1.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="1">1st</option>
                        <option value="2">2nd</option>
                        <option value="3">3rd</option>
                        <option value="4">4th</option>
                      </select>
                    </td>
                  )}
                  <td className="px-3 py-2">
                    {band ? (
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
                          mark < 50
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300'
                            : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
                        }`}
                      >
                        {band.code}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 dark:text-slate-500">&mdash;</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={unit.include}
                      onChange={(e) => update(unit.id, { include: e.target.checked })}
                      aria-label="Include this unit in the WAM"
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-3 py-2 rounded-r-xl text-center">
                    <button
                      type="button"
                      onClick={() => remove(unit.id)}
                      aria-label="Remove unit"
                      className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors disabled:opacity-30"
                      disabled={units.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setUnits((p) => [...p, newUnit(p[p.length - 1]?.credit || '12')])}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add unit
        </button>
        <button
          type="button"
          onClick={() => {
            setUnits([newUnit(), newUnit(), newUnit(), newUnit()]);
            setTarget('');
            setRemainingCp('');
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>

      {/* ---------- Result ---------- */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 sm:p-8 text-white">
        {wam === null ? (
          <p className="text-white/80">
            Enter a mark and credit points for at least one unit to see your WAM.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Your WAM
              </div>
              <div
                className="mt-1 text-5xl font-extrabold leading-none"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                {round(wam)}
              </div>
              <div className="mt-2 text-sm text-white/80">
                {bandFor(wam, scheme).name} band ({bandFor(wam, scheme).code})
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Equivalent GPA (7-point)
              </div>
              <div
                className="mt-1 text-5xl font-extrabold leading-none"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                {gpa === null ? '—' : round(gpa)}
              </div>
              <div className="mt-2 text-sm text-white/80">
                From {counted.length} unit{counted.length === 1 ? '' : 's'}, {round(totalCredit, 0)}{' '}
                credit points
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Indicative honours class
              </div>
              <div
                className="mt-1 text-3xl font-extrabold leading-tight"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                {honours ? honours.code : 'Below H3'}
              </div>
              <div className="mt-2 text-sm text-white/80">
                {honours ? honours.name : 'Most schemes award no class below 65'}
              </div>
            </div>
          </div>
        )}

        {failed.length > 0 && (
          <p className="mt-6 flex items-start gap-2 rounded-xl bg-white/15 p-3 text-sm text-white/90">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>
              {failed.length} failed unit{failed.length === 1 ? ' is' : 's are'} included above.
              That is deliberate: most Australian universities <strong>do</strong> count fails in
              your WAM, which is the single most common reason a calculated WAM comes out lower
              than students expect. Untick &ldquo;Count&rdquo; only if your handbook says a unit is
              excluded.
            </span>
          </p>
        )}
      </div>

      {/* ---------- Target projection ---------- */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100">
          <Target className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          What do I need to hit a target WAM?
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Target WAM
            </span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={100}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g. 75"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Credit points still to go
            </span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={remainingCp}
              onChange={(e) => setRemainingCp(e.target.value)}
              placeholder="e.g. 48"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
            />
          </label>
          {weighting === 'level' && (
            <label className="block">
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Level of remaining units
              </span>
              <select
                value={remainingLevel}
                onChange={(e) => setRemainingLevel(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="1">1st year</option>
                <option value="2">2nd year</option>
                <option value="3">3rd year</option>
                <option value="4">4th year</option>
              </select>
            </label>
          )}
        </div>

        {projection && (
          <div className="mt-4 rounded-xl bg-slate-50 dark:bg-slate-800 p-4 text-sm">
            {projection.alreadyThere ? (
              <p className="text-emerald-700 dark:text-emerald-400">
                You are already above {target}. Even a bare pass across your remaining units keeps
                you there.
              </p>
            ) : projection.achievable ? (
              <p className="text-slate-800 dark:text-slate-200">
                You need to average{' '}
                <strong className="text-indigo-700 dark:text-indigo-300">
                  {round(projection.required, 1)}%
                </strong>{' '}
                across your remaining {remainingCp} credit points to finish on {target}.
              </p>
            ) : (
              <p className="text-amber-700 dark:text-amber-400">
                A WAM of {target} would require averaging {round(projection.required, 1)}% across
                your remaining units, which is above 100% &mdash; so it is not reachable with the
                credit points you have left. Try a lower target, or check whether your course
                allows more units.
              </p>
            )}
          </div>
        )}
      </div>

      <p className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
        <span>
          This is an estimate, not an official result. Every Australian university sets its own
          WAM rule &mdash; which units are excluded, how cross-institutional credit is handled, and
          whether year-level weighting applies. Always check your own course rules or handbook, or
          your student portal, for the figure that counts.
        </span>
      </p>
    </div>
  );
}
