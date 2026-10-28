import { RatePlanProvider } from './context/RatePlanProvider'
import { RatePlanPage } from './RatePlanPage'

const RatePlanPageRenderer = () => {
  return (
    <RatePlanProvider>
        <RatePlanPage />
    </RatePlanProvider>
  )
}

export default RatePlanPageRenderer