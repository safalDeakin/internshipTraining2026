import { createContext } from "react";
import type { NightAuditData } from "../../../../../domain/nightAudit";

export type RepoNightAuditContextType = {
    data: NightAuditData[];

    create: (data: NightAuditData) => Promise<boolean>;
    remove: (id: string) => Promise<boolean>;
};

const RepoNightAuditContext =
    createContext<RepoNightAuditContextType | null>(null);

export default RepoNightAuditContext;