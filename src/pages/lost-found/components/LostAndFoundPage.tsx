import { useState } from "react";
import { useRepoLostAndFoundHook } from "../context/LostAndFoundProvider";

import { OverviewPage } from "../pages/OverviewPage";
import { RegisterPage } from "../pages/RegisterPage";
import { DetailPage } from "../pages/DetailPage";
import { ClaimPage } from "../pages/ClaimPage";

type Page = "overview" | "register" | "detail" | "claim";

export default function LostAndFoundPage() {
    const { data } = useRepoLostAndFoundHook();

    const [page, setPage] = useState<Page>("overview");

    switch (page) {
        case "register":
            return (
                <RegisterPage
                    onCancel={() => setPage("overview")}
                    onSave={() => setPage("overview")}
                />
            );

        case "detail":
            return (
                <DetailPage
                    onBack={() => setPage("overview")}
                    onClaim={() => setPage("claim")}
                />
            );

        case "claim":
            return (
                <ClaimPage
                    onBack={() => setPage("detail")}
                    onCancel={() => setPage("detail")}
                />
            );

        default:
            return (
                <OverviewPage
                    items={data}
                    onAddFound={() => setPage("register")}
                    onViewItem={() => setPage("detail")}
                />
            );
    }
}