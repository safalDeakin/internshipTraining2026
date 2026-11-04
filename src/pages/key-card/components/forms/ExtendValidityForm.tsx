
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
            <FormSection title="Key Information">
                <FormGrid>
                    <FormField label="Current Validity" required>
                        <TextInput defaultValue={selectedCard.cardNumber} required />
                    </FormField>
                </FormGrid>
            </FormSection>

            <FormSection title="Extension Detail" divided>
                <FormField label="Extension Until">
                    <div className="grid grid-cols-[1fr_0.85fr] gap-4">
                        <DateInput />
                        <TextInput type="time" />
                    </div>
                </FormField>

                <div className="mt-3">
                    <FormField label="Reason">
                        <SelectInput defaultValue="">
                            <option value="" disabled>
                                Select
                            </option>
                            <option>Expired</option>
                            <option>Lost</option>
                        </SelectInput>
                    </FormField>
                </div>

                <div className="mt-3">
                    <FormField label="Additional Note">
                        <TextInput placeholder="Enter Note" />
                    </FormField>
                </div>
            </FormSection>
        </FormModal>
    )
}
