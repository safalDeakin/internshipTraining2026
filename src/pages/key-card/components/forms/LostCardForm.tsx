
import { useRepoKeyCardHook } from '../../context/KeyCardProvider'
import {
    DateInput,
    FormField,
    FormGrid,
    FormSection,
    RadioGroup,
    SelectInput,
    TextInput,
} from './FormControls'
import { FormModal } from './FormModal'

export function LostCardForm() {
    const { closeForm, performAction, selectedCard } = useRepoKeyCardHook()

    return (
        <FormModal
            onCancel={closeForm}
            onSave={() => {
                performAction('lost')
                closeForm()
            }}
            size="large"
        >
            <FormSection title="Guest & Card Information">
                <FormGrid>
                    <FormField label="Reservation No" required>
                        <TextInput defaultValue={selectedCard.reservationNo} required />
                    </FormField>
                    <FormField label="Guest Name" required>
                        <TextInput defaultValue={selectedCard.currentHolder} required />
                    </FormField>
                    <FormField label="Room No" required>
                        <SelectInput defaultValue={selectedCard.currentRoom} required>
                            <option>{selectedCard.currentRoom}</option>
                            <option>102</option>
                            <option>103</option>
                        </SelectInput>
                    </FormField>
                    <FormField label="Key/Card Id" required>
                        <TextInput defaultValue={selectedCard.cardNumber} required />
                    </FormField>
                </FormGrid>
            </FormSection>

            <FormSection title="Report Detail">
                <FormGrid>
                    <FormField label="Issue Type">
                        <RadioGroup options={['Lost', 'Damage']} />
                    </FormField>
                    <FormField label="Reported Date & Time">
                        <DateInput />
                    </FormField>
                    <FormField label="Reported By">
                        <SelectInput defaultValue="Guest">
                            <option>Guest</option>
                            <option>Staff</option>
                        </SelectInput>
                    </FormField>
                    <FormField label="Lost Location">
                        <SelectInput defaultValue="Guest">
                            <option>Guest</option>
                            <option>Room</option>
                            <option>Lobby</option>
                        </SelectInput>
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
