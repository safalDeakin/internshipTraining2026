
import { useRepoKeyCardHook } from '../../context/KeyCardProvider'
import {
    DateInput,
    FormField,
    FormGrid,
    FormSection,
    TextInput,
} from './FormControls'
import { FormModal } from './FormModal'

export function ExtendValidityForm() {
    const { closeForm, performAction, selectedCard } = useRepoKeyCardHook()

    return (
        <FormModal
            onCancel={closeForm}
            onSave={() => {
                performAction('extend')
                closeForm()
            }}
        >
            <FormSection title="Key Card Detail">
                <FormGrid>
                    <FormField label="Key/Card No" required>
                        <TextInput defaultValue={selectedCard.cardNumber} required />
                    </FormField>
                    <FormField label="Guest Name" required>
                        <TextInput defaultValue={selectedCard.currentHolder} required />
                    </FormField>
                    <FormField label="Room No" required>
                        <TextInput defaultValue={selectedCard.currentRoom} required />
                    </FormField>
                    <FormField label="Current Duration">
                        <TextInput defaultValue={selectedCard.duration} />
                    </FormField>
                </FormGrid>
            </FormSection>

            <FormSection title="Valid Date" divided>
                <FormGrid>
                    <FormField label="Valid From" required>
                        <DateInput />
                    </FormField>
                    <FormField label="Valid To" required>
                        <DateInput />
                    </FormField>
                </FormGrid>
                <div className="mt-3">
                    <FormField label="Remark">
                        <TextInput placeholder="Enter Note" />
                    </FormField>
                </div>
            </FormSection>
        </FormModal>
    )
}
