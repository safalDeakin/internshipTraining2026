import { ChevronDown } from 'lucide-react'

import {
    DateInput,
    FormField,
    FormGrid,
    FormSection,
    SelectInput,
    TextInput,
    fieldClass,
} from './FormControls'
import { FormModal } from './FormModal'
import { useRepoKeyCardHook } from '../../context/KeyCardProvider'

const accessAreas = ['Room 101', 'Gym', 'Pool', 'Room 101']

export function IssueCardForm() {
    const { closeForm, performAction } = useRepoKeyCardHook()

    return (
        <FormModal
            onCancel={closeForm}
            onSave={() => {
                performAction('issue')
                closeForm()
            }}
            size="large"
        >
            <FormSection title="Reservation & Guest Information">
                <FormGrid>
                    <FormField label="Reservation No" required>
                        <TextInput placeholder="Enter Code" required />
                    </FormField>
                    <FormField label="Guest Name" required>
                        <TextInput placeholder="Enter Name" required />
                    </FormField>
                    <FormField label="Room No" required>
                        <SelectInput required defaultValue="">
                            <option value="" disabled>
                                Select Category
                            </option>
                            <option>Room 101</option>
                            <option>Room 102</option>
                        </SelectInput>
                    </FormField>
                    <FormField label="Type" required>
                        <TextInput defaultValue="0" required />
                    </FormField>
                </FormGrid>
            </FormSection>

            <FormSection title="Key & Card Information">
                <FormGrid>
                    <FormField label="Key/Card Number">
                        <SelectInput defaultValue="">
                            <option value="" disabled>
                                Select Unit
                            </option>
                            <option>C#121</option>
                            <option>C#122</option>
                        </SelectInput>
                    </FormField>
                    <FormField label="Key/Card Type">
                        <div className={`${fieldClass} flex items-center px-0`}>
                            <span className="w-1/2 border-r border-[#d9dcde] px-3">NPR</span>
                            <span className="w-1/2 px-3">100</span>
                        </div>
                    </FormField>
                </FormGrid>

                <div className="mt-4">
                    <FormField label="Access Area">
                        <div className="flex min-h-10.75 flex-wrap items-center gap-2 rounded-lg border border-[#aeb3b7] bg-white px-5 py-2">
                            {accessAreas.map((area, index) => (
                                <span
                                    key={`${area}-${index}`}
                                    className="rounded-md border border-[#c8cfdb] bg-white px-2 py-1 text-[10px] text-[#252a2d] shadow-sm"
                                >
                                    {area}
                                </span>
                            ))}
                            <ChevronDown
                                aria-hidden="true"
                                className="ml-1 text-[#30363a]"
                                size={14}
                                strokeWidth={1.4}
                            />
                        </div>
                    </FormField>
                </div>
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

            <FormField label="Remark">
                <TextInput placeholder="Enter Note" />
            </FormField>
        </FormModal>
    )
}
