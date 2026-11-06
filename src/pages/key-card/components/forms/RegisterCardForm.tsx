
import { useRepoKeyCardHook } from '../../context/KeyCardProvider'
import {
    FormField,
    FormGrid,
    FormSection,
    SelectInput,
    TextInput,
} from './FormControls'
import { FormModal } from './FormModal'

export function RegisterCardForm() {
    const { closeForm, createCard } = useRepoKeyCardHook()

    return (
        <FormModal
            onCancel={closeForm}
            onSave={() => {
                createCard()
                closeForm()
            }}
            size="large"
        >
            <FormSection title="Register Key / Card">
                <FormGrid>
                    <FormField label="Key/Card ID" required>
                        <TextInput placeholder="Enter Code" required />
                    </FormField>
                    <FormField label="Key Card Type" required>
                        <SelectInput required defaultValue="">
                            <option value="" disabled>
                                Select Type
                            </option>
                            <option>RFID Key Card</option>
                            <option>Magnetic Card</option>
                        </SelectInput>
                    </FormField>
                    <FormField label="Card No / Serial No" required>
                        <SelectInput required defaultValue="">
                            <option value="" disabled>
                                Select Category
                            </option>
                            <option>Guest Room Card</option>
                            <option>Master Card</option>
                        </SelectInput>
                    </FormField>
                    <FormField label="Access Type" required>
                        <TextInput defaultValue="0" required />
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
