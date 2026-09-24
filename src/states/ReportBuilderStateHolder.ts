
import { REPORT_SECTIONS } from "../constants/reportSections";
import type { ReportBuilderSnapshot, ReportSection, ReportTemplate } from "../reports/types/report";

export class ReportBuilderStateHolder {
    private listeners = new Set<() => void>()

    private snapshot: ReportBuilderSnapshot = {
        selectedTemplate: "sale",
        selectedSections: REPORT_SECTIONS.sale.map(
            (section) => section.value
        ),

        period: "daily",
        startDate: "",
        terminal: ""
    }


    //subscribe
    subscribe = (listener: () => void) => {
        this.listeners.add(listener)

        return () => {
            this.listeners.delete(listener)
        }

    }


    //snapshot
    getSnapshot = () => {
        return this.snapshot
    }


    //notify
    private notify() {
        this.listeners.forEach((listener) => listener())
    }


    //template
    setTemplate = (template: ReportTemplate) => {
        if (this.snapshot.selectedTemplate === template) {
            return;
        }

        const defalutSections = REPORT_SECTIONS[template].map((section) => section.value)

        this.snapshot = {
            ...this.snapshot,
            selectedTemplate: template,
            selectedSections: defalutSections
        }

        this.notify()
    }


    //Sections
    toggleSection = (section: ReportSection) => {
        const sections = this.snapshot.selectedSections

        const exists = sections.includes(section)

        const updatedSelections = exists ?
            sections.filter((item) => item !== section)
            : [...sections, section]

        this.snapshot = {
            ...this.snapshot,
            selectedSections: updatedSelections
        }

        this.notify()
    }


    //Rerecord the Section
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


    //setting the Sections
    setSections = (section: ReportSection[]) => {
        this.snapshot = {
            ...this.snapshot,
            selectedSections: section
        }

        this.notify()
    }



    //filters
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


    reset() {
        this.snapshot = {
            selectedTemplate: "sale",
            selectedSections: [],

            period: "Daily",
            startDate: "",
            terminal: "",
        }

        this.notify()
    }



}