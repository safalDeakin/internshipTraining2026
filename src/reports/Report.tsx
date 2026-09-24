import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import ReportBuilderSidebar from "./components/ReportBuilderSidebar";
import ReportTemplateRenderer from "./ReportTemplateRenderer";
import ReportSectionRenderer from "./ReportSectionRenderer";
import ReportFilters from "./ReportFilters";

import { ReportBuilderStateHolder } from "../states/ReportBuilderStateHolder";
import { useReportBuilderState } from "../hooks/useReportBuilderState";

import { exportReportToCSV } from "./reportExport";
import type { ReportSection } from "./types/report";

type DragState = {
    section: ReportSection;
    index: number;
    hoverIndex: number;

    pointerId: number;

    // Original position of the section
    top: number;
    left: number;
    width: number;
    height: number;

    // Where inside the dragged item the pointer started
    offsetY: number;

    // Used when releasing the item
    dropping: boolean;
};

const DRAG_TRANSITION =
    "transform 260ms cubic-bezier(0.2, 0, 0, 1)";

const DROP_DURATION = 220;

const Report = () => {
    const reportBuilderState = useMemo(
        () => new ReportBuilderStateHolder(),
        []
    );

    const {
        selectedTemplate,
        selectedSections,
        period,
        startDate,
        terminal,
        setPeriod,
        setStartDate,
        setTerminal,
        reorderSections,
    } = useReportBuilderState(reportBuilderState);

    /*DRAG STATE*/
    const [dragState, setDragState] = useState<DragState | null>(null);

    /** Keeps the latest drag state in a ref.*/
    const dragStateRef = useRef<DragState | null>(null);

    /*Provides every report section a DOM ref.*/
    const sectionRefs = useRef<Partial<Record<ReportSection, HTMLDivElement | null>>>({});


    /* Floating element that follows the pointer.*/
    const dragOverlayRef = useRef<HTMLDivElement | null>(null);

    /*Animation frame used to keep pointer movement smooth.*/
    const animationFrameRef = useRef<number | null>(null);

    /*Latest pointer Y position.*/
    const pointerYRef = useRef(0);

    /*Restore body selection after dragging.*/
    const previousUserSelectRef = useRef<string>("");

    /* CSV / PRINT*/
    const handleExportCSV = () => {
        const data = selectedSections.map((section) => ({
            Template: selectedTemplate,
            Section: section,
            Period: period,
            StartDate: startDate || "All",
            Terminal: terminal || "All",
        }));

        exportReportToCSV(data);
    };

    const handlePrint = () => {
        window.print();
    };


    /* DRAG HELPERS*/
    const updateDragOverlay = (clientY: number) => {
        const current = dragStateRef.current;
        const overlay = dragOverlayRef.current;

        if (!current || !overlay) {
            return;
        }

        const top = clientY - current.offsetY;
        overlay.style.transform = `translate3d(${current.left}px, ${top}px, 0)`;
    };

    /* To find where the dragged section should be inserted.*/
    const calculateHoverIndex = (clientY: number) => {
        const current = dragStateRef.current;

        if (!current) {
            return null;
        }

        const draggedIndex = current.index;

        let insertionIndex = selectedSections.length;

        for (
            let index = 0;
            index < selectedSections.length;
            index++
        ) {
            if (index === draggedIndex) {
                continue;
            }
            const section = selectedSections[index];
            const element = sectionRefs.current[section];
            if (!element) {
                continue;
            }

            const rect = element.getBoundingClientRect();
            const center = rect.top + rect.height / 2;

            if (clientY < center) {
                insertionIndex = index;
                break;
            }
        }

        /*Because the dragged item itself is removed from the visual order, convert the physical insertion index into the final array index.*/
        if (draggedIndex < insertionIndex) {
            insertionIndex -= 1;
        }

        return Math.max(
            0,
            Math.min(
                insertionIndex,
                selectedSections.length - 1
            )
        );
    };

    /*POINTER DOWN*/
    const handlePointerDown = (
        e: ReactPointerEvent<HTMLDivElement>,
        index: number,
        section: ReportSection
    ) => {

        /*Only respond to the primary pointer.*/
        if (e.button !== 0) {
            return;
        }

        if (dragStateRef.current) {
            return;
        }

        const element = e.currentTarget;

        const rect = element.getBoundingClientRect();

        const nextDragState: DragState = {
            section,
            index,
            hoverIndex: index,

            pointerId: e.pointerId,

            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,

            offsetY: e.clientY - rect.top,
            dropping: false,
        };

        dragStateRef.current = nextDragState;

        setDragState(nextDragState);

        /* Keep receiving pointer events even when the pointer moves outside the original element.*/
        element.setPointerCapture(
            e.pointerId
        );

        /*Prevent text selection while dragging.*/
        previousUserSelectRef.current = document.body.style.userSelect;
        document.body.style.userSelect = "none";

        e.preventDefault();
    };


    /*POINTER MOVE*/
    const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        const current = dragStateRef.current;

        if (!current) {
            return;
        }

        if (
            e.pointerId !==
            current.pointerId
        ) {
            return;
        }

        pointerYRef.current = e.clientY;

        /*Update the floating item using requestAnimationFrame to render for every pointer movement.*/
        if (animationFrameRef.current === null) {
            animationFrameRef.current =
                requestAnimationFrame(() => {
                    animationFrameRef.current = null;

                    updateDragOverlay(pointerYRef.current);
                });
        }

        /*To find the section we are currently passing.*/
        const nextHoverIndex = calculateHoverIndex(e.clientY);
        if (
            nextHoverIndex === null ||
            nextHoverIndex ===
            current.hoverIndex
        ) {
            return;
        }

        /*Update the ref immediately.*/
        dragStateRef.current = {
            ...current,
            hoverIndex:
                nextHoverIndex,
        };

        setDragState({
            ...current,
            hoverIndex:
                nextHoverIndex,
        });
    };


    /*POINTER UP / DROP*/
    const finishDrop = () => {
        const current = dragStateRef.current;
        if (!current) {
            return;
        }

        const {
            section,
            index,
            hoverIndex,
        } = current;

        if (index === hoverIndex) {
            dragStateRef.current = null;
            setDragState(null);

            document.body.style.userSelect = previousUserSelectRef.current;

            return;
        }

        /*Keeps the floating element visible while the real section moves into its final position.*/
        const droppingState: DragState = {
            ...current,
            dropping: true,
        };

        dragStateRef.current = droppingState;
        setDragState(droppingState);

        /*Commit the actual array reorder.*/
        reorderSections(
            index,
            hoverIndex
        );


        /*Wait for React to render the new order.*/
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const target = sectionRefs.current[section];

                const overlay = dragOverlayRef.current;

                if (!target || !overlay) {
                    dragStateRef.current = null;
                    setDragState(null);

                    document.body.style.userSelect = previousUserSelectRef.current;

                    return;
                }
                const targetRect = target.getBoundingClientRect();


                /*Current overlay position.*/
                const currentTop = current.top +
                    (
                        pointerYRef.current -
                        current.top -
                        current.offsetY
                    );

                const deltaX = targetRect.left - current.left;
                const deltaY = targetRect.top - currentTop;

                /*
                 * Animate the floating item into the exact
                 * position occupied by the newly-rendered
                 * section.
                 */
                overlay.animate([
                    {
                        transform:
                            `translate3d(
                                    ${current.left}px,
                                    ${currentTop}px,
                                    0
                                )`,
                    },
                    {
                        transform:
                            `translate3d(
                                    ${current.left + deltaX}px,
                                    ${currentTop + deltaY}px,
                                    0
                                )`,
                    },
                ],
                    {
                        duration: DROP_DURATION,
                        easing: "cubic-bezier(0.2, 0, 0, 1)",
                        fill: "forwards",
                    }
                );

                window.setTimeout(() => {
                    dragStateRef.current = null;
                    setDragState(null);

                    document.body.style.userSelect = previousUserSelectRef.current;
                }, DROP_DURATION);
            });
        });
    };

    const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
        const current = dragStateRef.current;
        if (!current) {
            return;
        }

        if (e.pointerId !== current.pointerId) {
            return;
        }

        finishDrop();
    };


    /*POINTER CANCEL*/
    const handlePointerCancel = () => {
        dragStateRef.current = null;

        setDragState(null);

        document.body.style.userSelect =
            previousUserSelectRef.current;

        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    };


    /*CALCULATE SECTION MOVEMENT*/
    const getSectionTransform = (index: number) => {
        if (!dragState) {
            return "translate3d(0, 0, 0)";
        }

        if (dragState.dropping) {
            return "translate3d(0, 0, 0)";
        }

        const {
            index: draggedIndex,
            hoverIndex,
            height,
        } = dragState;

        if (draggedIndex === hoverIndex) {
            return "translate3d(0, 0, 0)";
        }

        const GAP = 16;
        const movement = height + GAP;

        /* Dragging DOWN*/
        if (
            draggedIndex <
            hoverIndex &&
            index >
            draggedIndex &&
            index <= hoverIndex
        ) {
            return `translate3d(0, -${movement}px, 0)`;
        }

        /*Dragging UP*/
        if (
            draggedIndex >
            hoverIndex &&
            index >= hoverIndex &&
            index <
            draggedIndex
        ) {
            return `translate3d(0, ${movement}px, 0)`;
        }

        return "translate3d(0, 0, 0)";
    };

    return (
        <div className="flex h-[calc(100vh-64px)] flex-col overflow-hidden bg-gray-50">

            {/* REPORT TOOLBAR*/}
            <header className="z-30 shrink-0 border-b border-gray-200 bg-white">
                <div className="flex min-h-14">

                    {/* Report Builder title */}
                    <div className="hidden w-56 shrink-0 items-center border-r border-gray-200 px-4 sm:flex lg:w-64">
                        <span className="text-sm font-bold text-blue-600">
                            📄 Report Builder
                        </span>
                    </div>

                    {/* Filters */}
                    <div className="min-w-0 flex-1 px-4 py-2">
                        <ReportFilters
                            period={period}
                            startDate={startDate}
                            terminal={terminal}
                            onPeriodChange={
                                setPeriod
                            }
                            onStartDateChange={
                                setStartDate
                            }
                            onTerminalChange={
                                setTerminal
                            }
                            onExportCSV={
                                handleExportCSV
                            }
                            onPrint={
                                handlePrint
                            }
                        />
                    </div>

                </div>
            </header>


            {/* REPORT WORKSPACE*/}
            <div className="flex min-h-0 flex-1">

                {/* SIDEBAR */}
                <aside className="hidden w-56 shrink-0 overflow-y-auto border-r border-gray-200 bg-white sm:block lg:w-64">
                    <ReportBuilderSidebar
                        stateHolder={
                            reportBuilderState
                        }
                    />
                </aside>

                {/* REPORT CONTENT */}
                <main className="min-w-0 flex-1 overflow-y-auto bg-gray-50">
                    <div className="p-6 lg:p-8">
                        <div
                            id="printable-report"
                            className="mx-auto w-full max-w-212.5 bg-white shadow-sm"
                        >

                            <ReportTemplateRenderer
                                template={selectedTemplate}
                            />

                            {/* SORTABLE SECTIONS*/}
                            <div className="flex flex-col gap-4 p-6">
                                {selectedSections.map((section, index) => {

                                    const isDragging = dragState?.section === section;
                                    const isDropping = isDragging && dragState?.dropping;
                                    const transform = getSectionTransform(index);

                                    return (
                                        <div
                                            key={section}
                                            ref={(element) => {
                                                sectionRefs.current[section] = element;
                                            }}
                                            style={{
                                                transform,
                                                transition:
                                                    isDragging
                                                        ? "none"
                                                        : DRAG_TRANSITION,

                                                /*Keeps the original space while the floating item moves.*/
                                                opacity: isDragging ? 0 : 1,

                                                /*Prevent the browser from trying to select text while dragging.*/
                                                touchAction: "none",
                                            }}
                                            onPointerDown={(e) =>
                                                handlePointerDown(
                                                    e,
                                                    index,
                                                    section
                                                )
                                            }
                                            onPointerMove={handlePointerMove}
                                            onPointerUp={handlePointerUp}
                                            onPointerCancel={handlePointerCancel}
                                            className={`
                                                    group
                                                    cursor-grab
                                                    select-none
                                                    rounded-lg
                                                    active:cursor-grabbing
                                                    ${isDropping
                                                    ? "opacity-0"
                                                    : ""
                                                }
                                                `}
                                        >
                                            <ReportSectionRenderer
                                                section={
                                                    section
                                                }
                                            />
                                        </div>
                                    );
                                }
                                )}

                            </div>

                        </div>

                    </div>

                </main>

            </div>


            {/* FLOATING DRAG ITEM*/}
            {dragState && (
                <div
                    ref={
                        dragOverlayRef
                    }
                    className="
                        pointer-events-none
                        fixed
                        z-9999
                        select-none
                        rounded-lg
                        bg-white
                        shadow-2xl
                        top-0
                        left-0
                        origin-top-left"
                    style={{
                        width: dragState.width,
                        transform:
                            `translate3d(
                                ${dragState.left}px,
                                ${dragState.top}px,
                                0
                            )`,

                        opacity: dragState.dropping
                            ? 1
                            : 0.96,

                        scale: dragState.dropping
                            ? "1"
                            : "1.01",

                    }}
                >
                    <ReportSectionRenderer
                        section={dragState.section}
                    />
                </div>
            )}

        </div>
    );
};

export default Report;