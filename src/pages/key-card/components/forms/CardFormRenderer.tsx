
import { useRepoKeyCardHook } from '../../context/KeyCardProvider'
import { ExtendValidityForm } from './ExtendValidityForm'
import { IssueCardForm } from './IssueCardForm'
import { LostCardForm } from './LostCardForm'
import { RegisterCardForm } from './RegisterCardForm'
import { ReissueCardForm } from './ReissueCardForm'
import { ReturnCardForm } from './ReturnCardForm'

export function CardFormRenderer() {
    const { activeForm } = useRepoKeyCardHook()

    if (activeForm === 'register') return <RegisterCardForm />
    if (activeForm === 'issue') return <IssueCardForm />
    if (activeForm === 'lost') return <LostCardForm />
    if (activeForm === 'extend') return <ExtendValidityForm />
    if (activeForm === 'return') return <ReturnCardForm />
    if (activeForm === 'reissue') return <ReissueCardForm />
    return null
}
