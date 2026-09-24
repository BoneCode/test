import { ManagerActionPlan } from '@/components/manager-action-plan/ManagerActionPlan'
import { demoActionPlan } from '@/components/manager-action-plan/types'

export default function Page() {
  return <ManagerActionPlan data={demoActionPlan} defaultExpandedManagers={['Maya Chen']} />
}
