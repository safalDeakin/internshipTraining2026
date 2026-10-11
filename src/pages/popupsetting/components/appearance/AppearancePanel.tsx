import ThemeSection from "./ThemeSection";
import OrientationSection from "./OrientationSection";
import TextSizeSection from "./TextSizeSection";

export default function AppearancePanel() {
    return (
        <section className="space-y-4.5 ">
            <ThemeSection />

            <OrientationSection />

            <TextSizeSection />
        </section>
    );
}