
import { useContext, type ReactNode } from "react";
import RepoTestContext from "./RepoTestContext";
import { guestQueryService, guestCmdService } from '../../../../application/services';
import { type Guest } from "../../../../domain/GuestModel";
import { useSubscription } from "../../../../application/useSubscription";


// Provider
export const RepoTestProvider = ({ children }: { children: ReactNode }) => {
    //provider needs to log in, find an organization, or check authorization so ask for AuthService
    const queryService = guestQueryService;
    const cmdService = guestCmdService;

    const { data, loading, error, refresh } =
        useSubscription<Guest, string>(queryService);



    // Load the initial data from the repo and subscribe to future changes.
    // useEffect(() => {
    //     let active = true;
    //     let unsubscribe: (() => void) | undefined;

    //     async function refreshData() {
    //         try {
    //             const result = await queryService.getAll();

    //             if (active) {
    //                 setDataList(result);
    //             }
    //         } catch (error) {
    //             if (active) {
    //                 console.error("Failed to refresh guests", error);
    //             }
    //         }
    //     }

    //     async function setupSubscription() {
    //         // Load initial data.
    //         await refreshData();

    //         if (!active) return;

    //         try {
    //             const cleanup = await queryService.subscribe(() => {
    //                 if (active) {
    //                     void refreshData();
    //                 }
    //             });

    //             if (active) {
    //                 unsubscribe = cleanup;
    //             } else {
    //                 cleanup();
    //             }
    //         } catch (error) {
    //             if (active) {
    //                 console.error(
    //                     "Failed to subscribe to guest changes",
    //                     error
    //                 );
    //             }
    //         }
    //     }

    //     void setupSubscription();

    //     return () => {
    //         active = false;
    //         unsubscribe?.();
    //     };
    // }, [queryService]);

    //
    //SubscribeMethod()-EOL
    ////

    const create = async (data: Guest): Promise<boolean> => {
        try {
            return await cmdService.create(data);
        } catch (error) {
            alert(`Id:${data.id} Already Exist`);
            console.log(error)
            return false;
        }
    }

    const remove = async (ID: string): Promise<boolean> => {
        try {
            return await cmdService.delete(ID)
        } catch (error) {
            console.log(error)
            alert(`Id:${ID} Not Found`);
            return false;
        }
    }

    return (
        <RepoTestContext.Provider
            value={{
                data,
                create,
                remove
            }}
        >
            {children}
        </RepoTestContext.Provider>
    );
};

export const useRepoTestHook = () => {
    const context = useContext(RepoTestContext);
    if (!context) {
        throw new Error("must use inside provider");
    }
    return context;
}

