import type { ReactNode } from 'react'

const ReportFilterField = ({ label, children }: { label: string; children: ReactNode }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            {children}
        </div>
    )
}

export default ReportFilterField