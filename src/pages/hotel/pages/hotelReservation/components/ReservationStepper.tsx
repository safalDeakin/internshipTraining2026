import { Check } from 'lucide-react'
import { steps } from '../data/reservation'

export function ReservationStepper({
    currentStep,
    onStepChange,
}: {
    currentStep: number
    onStepChange: (step: number) => void
}) {
    return (
        <nav className="my-8 sm:my-10" aria-label="Reservation progress">
            <ol className="grid grid-cols-5">
                {steps.map((label, index) => {
                    const step = index + 1
                    const completed = step < currentStep
                    const active = step === currentStep
                    return (
                        <li className="relative flex flex-col items-center" key={label}>
                            {index > 0 && (
                                <span
                                    className={`absolute right-1/2 top-4 h-0.5 w-full ${step <= currentStep ? 'bg-orange-500' : 'bg-slate-200'}`}
                                />
                            )}
                            <button
                                className={`relative z-10 grid size-8 place-items-center rounded-full border-2 text-xs font-bold transition ${active
                                        ? 'border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-200'
                                        : completed
                                            ? 'border-orange-500 bg-white text-orange-600'
                                            : 'border-slate-200 bg-slate-100 text-slate-400'
                                    }`}
                                onClick={() => onStepChange(step)}
                                aria-current={active ? 'step' : undefined}
                                aria-label={`Step ${step}: ${label}`}
                            >
                                {completed ? <Check size={14} /> : step}
                            </button>
                            <span
                                className={`mt-2 hidden text-center text-xs font-medium sm:block ${active ? 'text-orange-600' : 'text-slate-500'}`}
                            >
                                {label}
                            </span>
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
