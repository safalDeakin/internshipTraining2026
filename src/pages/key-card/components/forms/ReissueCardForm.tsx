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

export function ReissueCardForm() {
    const { closeForm, performAction, selectedCard } = useRepoKeyCardHook()

    return (
        <FormModal
            onCancel={closeForm}
            onSave={() => {
                performAction('reissue')
                closeForm()
            }}
            size="large"
        >
            <FormSection title="Guest & Old Card Detail">
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
                        </SelectInput>
                    </FormField>
                    <FormField label="Old Card Id" required>
                        <TextInput defaultValue={selectedCard.cardNumber} required />
                    </FormField>
                </FormGrid>
            </FormSection>

            <FormSection title="New Card Detail" divided>
                <FormGrid>
                    <FormField label="Replacement Card Id">
                        <TextInput placeholder="Enter" />
                    </FormField>
                    <FormField label="Key Type">
                        <SelectInput defaultValue="">
                            <option value="" disabled>
                                Select
                            </option>
                            <option>RFID Key Card</option>
                            <option>Magnetic Card</option>
                        </SelectInput>
                    </FormField>
                    <FormField label="Replacement Reason">
                        <SelectInput defaultValue="">
                            <option value="" disabled>
                                Select
                            </option>
                            <option>Lost</option>
                            <option>Damaged</option>
                        </SelectInput>
                    </FormField>
                </FormGrid>
            </FormSection>

            <FormSection title="Valid Date">
                <FormGrid>
                    <FormField label="Valid From">
                        <DateInput />
                    </FormField>
                    <FormField label="Valid To">
                        <DateInput />
                    </FormField>
                </FormGrid>
            </FormSection>

            <FormSection title="Fee & Payment" divided>
                <FormField label="Replacement Fee">
                    <SelectInput defaultValue="NPR 500">
                        <option>NPR 500</option>
                        <option>NPR 1000</option>
                    </SelectInput>
                </FormField>
                <div className="mt-3">
                    <FormField label="Charge To">
                        <RadioGroup options={['Folio', 'Pay Now', 'No Charge']} />
                    </FormField>
                </div>
            </FormSection>

            <FormSection title="Note" divided>
                <TextInput placeholder="Enter Note" />
            </FormSection>
        </FormModal>
    )
}
