'use client'

import { useState } from 'react'
import { AlertTriangle, CalendarDays, Check, ChevronDown, CircleHelp, Clock3, Target, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { displayValue, sortActions, sortManagers, sortReps } from './utils'
import type { ActionItem, ActionStatus, Manager, ManagerActionPlanProps, RepStatus } from './types'

const statusStyles: Record<RepStatus, string> = {
  'On Track': 'border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  'At Risk': 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  Insufficient: 'border-destructive/30 bg-destructive/10 text-destructive',
  'Insufficient Signal': 'border-slate-400/30 bg-slate-400/10 text-slate-700 dark:text-slate-300',
}

const priorityStyles = {
  High: 'border-destructive/30 bg-destructive/10 text-destructive',
  Medium: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  Low: 'border-primary/20 bg-primary/5 text-muted-foreground',
  None: 'border-border bg-muted text-muted-foreground',
}

const actionStatusStyles: Record<ActionStatus, string> = {
  Proposed: 'bg-primary/10 text-primary',
  'Needs confirmation': 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  Blocked: 'bg-destructive/10 text-destructive',
  Complete: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
}

function StatusBadge({ status }: { status: RepStatus }) {
  return <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold', statusStyles[status])}>{status}</span>
}

function PriorityBadge({ priority }: { priority: keyof typeof priorityStyles }) {
  return <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em]', priorityStyles[priority])}>{priority}</span>
}

function MetaItem({ icon: Icon, label, value }: { icon: typeof UserRound; label: string; value: string }) {
  return <div className="flex min-w-0 items-start gap-2"><Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" /><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</p><p className="truncate text-sm font-medium">{value}</p></div></div>
}

function ActionCard({ action }: { action: ActionItem }) {
  const complete = action.status === 'Complete'
  return <article className={cn('rounded-xl border bg-background p-4 shadow-sm', complete && 'opacity-70')}>
    <div className="flex gap-3"><div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{action.priority}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-2"><h4 className={cn('text-sm font-semibold leading-6', complete && 'line-through')}>{action.action}</h4><span className={cn('inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]', actionStatusStyles[action.status])}>{action.status === 'Complete' && <Check className="size-3" aria-hidden="true" />}{action.status === 'Blocked' && <AlertTriangle className="size-3" aria-hidden="true" />}{action.status}</span></div>
      <div className="mt-4 grid gap-4 md:grid-cols-4"><MetaItem icon={UserRound} label="Owner" value={action.owner} /><MetaItem icon={CalendarDays} label="Due" value={displayValue(action.due_date)} /><MetaItem icon={CircleHelp} label="Status" value={action.status} /><MetaItem icon={Target} label="Priority" value={String(action.priority)} /></div>
      <div className="mt-5 grid gap-4 border-t pt-4 md:grid-cols-3"><div><p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Why it matters</p><p className="text-sm leading-6 text-muted-foreground">{action.why_it_matters}</p></div><div><p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Completion criteria</p><p className="text-sm leading-6 text-muted-foreground">{action.completion_criteria}</p></div><div><p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Evidence</p><p className="text-sm leading-6 text-muted-foreground">{displayValue(action.evidence)}</p></div></div>
    </div></div>
  </article>
}

function RepCard({ rep }: { rep: ReturnType<typeof sortReps>[number] }) {
  const [open, setOpen] = useState(true)
  const actions = sortActions(rep.action_items)
  return <article className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5"><button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-start justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="text-base font-semibold">{rep.rep_name}</h3><StatusBadge status={rep.rep_status} /><PriorityBadge priority={rep.priority} /></div><p className="mt-2 text-sm leading-6 text-muted-foreground">{rep.summary}</p></div><ChevronDown className={cn('mt-1 size-5 shrink-0 text-muted-foreground transition-transform', !open && '-rotate-90')} aria-hidden="true" /></button>{open && <div className="mt-5 border-t pt-5"><div className="mb-3 flex items-center justify-between"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Next actions</p><span className="text-xs text-muted-foreground">{actions.length} {actions.length === 1 ? 'action' : 'actions'}</span></div>{actions.length ? <div className="flex flex-col gap-3">{actions.map((action, index) => <ActionCard key={`${rep.rep_name}-${action.priority}-${index}`} action={action} />)}</div> : <div className="rounded-xl border border-dashed bg-muted/30 p-4"><p className="text-sm font-semibold">No supported action</p><p className="mt-1 text-sm text-muted-foreground">No supported next action identified from the available evidence.</p></div>}</div>}</article>
}

function ManagerSection({ manager, expanded, onToggle }: { manager: Manager; expanded: boolean; onToggle: () => void }) {
  const reps = sortReps(manager.reps)
  return <section className="overflow-hidden rounded-2xl border bg-card shadow-sm"><button type="button" onClick={onToggle} aria-expanded={expanded} className="w-full p-4 text-left transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:p-5"><div className="flex items-start gap-3"><div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"><ChevronDown className={cn('size-4 transition-transform', !expanded && '-rotate-90')} aria-hidden="true" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Manager</p><h2 className="mt-1 text-lg font-semibold tracking-tight">{manager.manager_name}</h2></div><div className="grid grid-cols-3 gap-2 text-right sm:flex sm:items-center sm:gap-5"><div><p className="text-lg font-semibold">{displayValue(manager.manager_summary.rep_count)}</p><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Reps</p></div><div><p className="text-lg font-semibold">{displayValue(manager.manager_summary.open_action_count)}</p><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Open actions</p></div><div><p className="text-lg font-semibold text-amber-600 dark:text-amber-400">{displayValue(manager.manager_summary.priority_attention_count)}</p><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Priority attention</p></div></div></div></div></div></button>{expanded && <div className="border-t bg-muted/20 p-4 sm:p-5"><div className="rounded-xl border bg-background p-4"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Manager summary</p><p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{manager.manager_summary.summary}</p></div><div className="mt-5 flex flex-col gap-3">{reps.length ? reps.map(rep => <RepCard key={rep.rep_name} rep={rep} />) : <div className="rounded-xl border border-dashed p-5 text-sm text-muted-foreground">No reps found. No rep-level action data is available for this manager.</div>}</div></div>}</section>
}

export function ManagerActionPlan({ data, defaultExpandedManagers = [], className }: ManagerActionPlanProps) {
  const managers = sortManagers(data.managers)
  const [expanded, setExpanded] = useState<string[]>(defaultExpandedManagers)
  const toggle = (name: string) => setExpanded(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name])
  return <main className={cn('min-h-screen bg-muted/40', className)}><div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12"><header className="mb-8 flex flex-col gap-5 border-b pb-7 sm:flex-row sm:items-end sm:justify-between"><div><div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary"><span className="size-2 rounded-full bg-primary" aria-hidden="true" /> Sales operations cockpit</div><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Manager-to-Rep Action Plan</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Prioritized actions derived from available performance and operational signals.</p></div><div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock3 className="size-4" aria-hidden="true" /> Evidence-led planning</div></header>{managers.length ? <div className="flex flex-col gap-4">{managers.map(manager => <ManagerSection key={manager.manager_name} manager={manager} expanded={expanded.includes(manager.manager_name)} onToggle={() => toggle(manager.manager_name)} />)}</div> : <div className="rounded-2xl border border-dashed bg-card p-8 text-center"><p className="font-semibold">No managers found</p><p className="mt-2 text-sm text-muted-foreground">No manager-level action data is available for this population.</p></div>}</div></main>
}
