export type RepStatus =
  | 'On Track'
  | 'At Risk'
  | 'Insufficient'
  | 'Insufficient Signal'
export type Priority = 'High' | 'Medium' | 'Low' | 'None'
export type ActionStatus = 'Proposed' | 'Needs confirmation' | 'Blocked' | 'Complete'
export type ActionOwner = 'Rep' | 'Manager' | 'Shared' | 'Unassigned'

export interface ActionItem {
  priority: number
  action: string
  why_it_matters: string
  due_date: string
  owner: ActionOwner
  completion_criteria: string
  evidence: string
  status: ActionStatus
}

export interface Rep {
  rep_name: string
  rep_status: RepStatus
  priority: Priority
  summary: string
  action_items: ActionItem[]
}

export interface ManagerSummary {
  rep_count: number | string
  open_action_count: number | string
  priority_attention_count: number | string
  summary: string
}

export interface Manager {
  manager_name: string
  manager_summary: ManagerSummary
  reps: Rep[]
}

export interface ManagerActionPlan {
  managers: Manager[]
}

export interface ManagerActionPlanProps {
  data: ManagerActionPlan
  defaultExpandedManagers?: string[]
  className?: string
}

export const demoActionPlan: ManagerActionPlan = {
  managers: [
    {
      manager_name: 'Maya Chen',
      manager_summary: {
        rep_count: 4,
        open_action_count: 5,
        priority_attention_count: 2,
        summary: 'Two sellers need near-term coverage: one has an unvalidated renewal path and one has insufficient signal to prioritize confidently.',
      },
      reps: [
        {
          rep_name: 'Abbie Gould',
          rep_status: 'At Risk',
          priority: 'High',
          summary: 'The Acme renewal has activity but no confirmed customer decision milestone.',
          action_items: [
            {
              priority: 1,
              action: 'Confirm the customer decision milestone for the Acme renewal.',
              why_it_matters: 'The opportunity lacks a validated next step, making forecast timing unreliable.',
              due_date: 'This week',
              owner: 'Rep',
              completion_criteria: 'Customer confirms the next decision milestone and the opportunity contains the agreed next step.',
              evidence: 'Current opportunity signal',
              status: 'Proposed',
            },
            {
              priority: 2,
              action: 'Review renewal coverage with the manager before the next forecast call.',
              why_it_matters: 'A second perspective can expose gaps before the renewal becomes time constrained.',
              due_date: 'Sep 29, 2026',
              owner: 'Shared',
              completion_criteria: 'Review is completed and the coverage plan is recorded.',
              evidence: 'Forecast review queue',
              status: 'Needs confirmation',
            },
          ],
        },
        {
          rep_name: 'Jordan Patel',
          rep_status: 'On Track',
          priority: 'Medium',
          summary: 'Pipeline movement is healthy, with one late-stage deal ready for a clean close plan.',
          action_items: [
            {
              priority: 1,
              action: 'Document the close plan for the Northstar opportunity.',
              why_it_matters: 'A shared close plan keeps decision owners and timing visible across the team.',
              due_date: 'Oct 2, 2026',
              owner: 'Rep',
              completion_criteria: 'Close plan includes decision makers, milestone dates, and a mutual next step.',
              evidence: 'Opportunity activity record',
              status: 'Complete',
            },
          ],
        },
        {
          rep_name: 'Luis Romero',
          rep_status: 'Insufficient Signal',
          priority: 'Low',
          summary: 'Available activity is not sufficient to identify a supported intervention.',
          action_items: [],
        },
      ],
    },
    {
      manager_name: 'Ethan Brooks',
      manager_summary: {
        rep_count: 3,
        open_action_count: 3,
        priority_attention_count: 1,
        summary: 'The team is broadly stable, but one seller has a dependency that should be resolved before additional activity is expected.',
      },
      reps: [
        {
          rep_name: 'Nina Shah',
          rep_status: 'Insufficient',
          priority: 'High',
          summary: 'The current opportunity set does not show enough validated coverage for the target period.',
          action_items: [
            {
              priority: 1,
              action: 'Reconcile the top three opportunities against the current coverage plan.',
              why_it_matters: 'The gap between reported pipeline and supported coverage needs a specific explanation.',
              due_date: 'Sep 30, 2026',
              owner: 'Manager',
              completion_criteria: 'Each opportunity has a coverage disposition and an agreed next action.',
              evidence: 'Coverage review signal',
              status: 'Blocked',
            },
          ],
        },
        {
          rep_name: 'Marcus Lee',
          rep_status: 'On Track',
          priority: 'None',
          summary: 'Signals support the current plan and no additional action is required from the available evidence.',
          action_items: [],
        },
      ],
    },
    {
      manager_name: 'Priya Nair',
      manager_summary: {
        rep_count: 2,
        open_action_count: 1,
        priority_attention_count: 0,
        summary: 'The team has clear next steps and limited open attention across the available signals.',
      },
      reps: [
        {
          rep_name: 'Sofia Martinez',
          rep_status: 'On Track',
          priority: 'Low',
          summary: 'Customer engagement is consistent and the next milestone is already visible.',
          action_items: [
            {
              priority: 1,
              action: 'Share the validated customer milestone in the team forecast note.',
              why_it_matters: 'The signal can help the wider team calibrate timing against a known milestone.',
              due_date: '',
              owner: 'Rep',
              completion_criteria: 'Forecast note includes the milestone and source context.',
              evidence: '',
              status: 'Proposed',
            },
          ],
        },
        {
          rep_name: 'Theo Grant',
          rep_status: 'On Track',
          priority: 'None',
          summary: 'No supported next action was identified from the current evidence.',
          action_items: [],
        },
      ],
    },
  ],
}
