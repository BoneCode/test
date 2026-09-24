import type { ActionItem, Manager, Rep } from './types'

const priorityRank = { High: 0, Medium: 1, Low: 2, None: 3 } as const

export function sortActions(actions: ActionItem[]) {
  return [...actions].sort((a, b) => a.priority - b.priority)
}

export function sortReps(reps: Rep[]) {
  return [...reps].sort((a, b) => {
    const priorityDifference = priorityRank[a.priority] - priorityRank[b.priority]
    return priorityDifference || a.rep_name.localeCompare(b.rep_name)
  })
}

export function sortManagers(managers: Manager[]) {
  return [...managers].sort((a, b) => {
    const attentionDifference = Number(b.manager_summary.priority_attention_count) - Number(a.manager_summary.priority_attention_count)
    return attentionDifference || a.manager_name.localeCompare(b.manager_name)
  })
}

export function displayValue(value: string | number | undefined) {
  return value === undefined || value === '' ? 'Not provided' : String(value)
}
