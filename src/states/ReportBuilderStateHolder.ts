import { REPORT_SECTIONS } from "../pages/reports/constants/reportSections";
import type {
    ReportBuilderSnapshot,
    ReportSection,
    ReportTemplate,
} from "../pages/reports/types/report";

export class ReportBuilderStateHolder {
    private listeners = new Set<() => void>();

    private snapshot: ReportBuilderSnapshot = {
        selectedTemplate: "sale",
        selectedSections: REPORT_SECTIONS.sale.map(
            (section) => section.value
        ),
        period: "daily",
        startDate: "",
        terminal: "",
    };

    subscribe = (listener: () => void) => {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };
    };

    getSnapshot = () => {
        return this.snapshot;
    };

    private notify() {
        this.listeners.forEach((listener) => listener());
    }

    setTemplate = (template: ReportTemplate) => {
        if (this.snapshot.selectedTemplate === template) {
            return;
        }

        const defaultSections = REPORT_SECTIONS[template].map(
            (section) => section.value
        );

        this.snapshot = {
            ...this.snapshot,
            selectedTemplate: template,
            selectedSections: defaultSections,
        };

        this.notify();
    };

    toggleSection = (section: ReportSection) => {
        const sections = this.snapshot.selectedSections;

        const exists = sections.includes(section);

        const updatedSections = exists
            ? sections.filter((item) => item !== section)
            : [...sections, section];

        this.snapshot = {
            ...this.snapshot,
            selectedSections: updatedSections,
        };

        this.notify();
    };

    reorderSections = (fromIndex: number, toIndex: number) => {
        const sections = [...this.snapshot.selectedSections];

        const [movedSection] = sections.splice(fromIndex, 1);

        sections.splice(toIndex, 0, movedSection);

        this.snapshot = {
            ...this.snapshot,
            selectedSections: sections,
        };

        this.notify();
    };

    setSections = (sections: ReportSection[]) => {
        this.snapshot = {
            ...this.snapshot,
            selectedSections: sections,
        };

        this.notify();
    };

    setPeriod = (period: string) => {
        this.snapshot = {
            ...this.snapshot,
            period,
        };

        this.notify();
    };

    setStartDate = (startDate: string) => {
        this.snapshot = {
            ...this.snapshot,
            startDate,
        };

        this.notify();
    };

    setTerminal = (terminal: string) => {
        this.snapshot = {
            ...this.snapshot,
            terminal,
        };

        this.notify();
    };

    reset = () => {
        this.snapshot = {
            selectedTemplate: "sale",
            selectedSections: REPORT_SECTIONS.sale.map(
                (section) => section.value
            ),
            period: "daily",
            startDate: "",
            terminal: "",
        };

        this.notify();
    };
}