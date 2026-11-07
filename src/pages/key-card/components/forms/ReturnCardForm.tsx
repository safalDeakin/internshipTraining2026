import { useRepoKeyCardHook } from '../../context/KeyCardProvider'
import {
    DateInput,
    FormField,
    FormGrid,
    FormSection,
    SelectInput,
    TextInput,
} from './FormControls'
import { FormModal } from './FormModal'

export function ReturnCardForm() {
    const { closeForm, performAction, selectedCard } = useRepoKeyCardHook()

    return (
        <FormModal
            onCancel={closeForm}
            onSave={() => {
                performAction('return')
                closeForm()
            }}
            size="large"
        >
            <FormSection title="Key Card Detail">
                <FormField label="Key/Card No" required>
                    <TextInput defaultValue={selectedCard.cardNumber} required />
                </FormField>
                <div className="mt-3">
                    <FormGrid>
                        <FormField label="Room No" required>
                            <SelectInput defaultValue={selectedCard.currentRoom} required>
                                <option>{selectedCard.currentRoom}</option>
                                <option>102</option>
                            </SelectInput>
                        </FormField>
                        <FormField label="Guest Name">
                            <TextInput defaultValue={selectedCard.currentHolder} />
                        </FormField>
                    </FormGrid>
                </div>
            </FormSection>

            <FormSection title="Return Information">
                <FormField label="Return Date & Time">
                    <div className="grid grid-cols-[1fr_0.85fr] gap-4">
                        <DateInput />
                        <TextInput type="time" />
                    </div>
                </FormField>
                <div className="mt-3">
                    <FormField label="Condition">
                        <SelectInput defaultValue="">
                            <option value="" disabled>
                                Select
                            </option>
                            <option>Good</option>
                            <option>Damaged</option>
                        </SelectInput>
                    </FormField>
                </div>
                <div className="mt-3">
                    <FormField label="Return By">
                        <TextInput placeholder="Enter Note" />
                    </FormField>
                </div>
            </FormSection>
        </FormModal>
    )
}
