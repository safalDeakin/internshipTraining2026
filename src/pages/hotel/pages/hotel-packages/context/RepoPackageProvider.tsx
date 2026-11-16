
import { useContext, useMemo, useState, type ReactNode } from "react";
import RepoPackageContext from "./RepoPackageContext";
import { packageCmdService, packageQueryService } from "../../../../../application/services";
import type { HotelPackage } from "../../../../../domain/hotel-package";
import { useSubscription } from "../../../../../application/useSubscription";



// Provider
export const RepoPackageProvider = ({ children }: { children: ReactNode }) => {


    const [searchQuery, setSearchQuery] = useState("");

    const title = "Hotel Package";

    const queryService = packageQueryService;
    const cmdService = packageCmdService;

    const { data } = useSubscription<HotelPackage, string>(queryService);



    const filteredData = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return data;
        }

        return data.filter((item) =>
            [
                item.name,
                item.id,
                item.code,
            ].some((value) =>
                value.toLowerCase().includes(query),
            ),
        );
    }, [data, searchQuery]);


    const create = async (data: HotelPackage): Promise<boolean> => {
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



    const value = useMemo(
        () => ({
            title,
            data: filteredData,
            searchQuery,
            setSearchQuery,
            getId: (item: HotelPackage) => item.id,
            create,
            remove
        }),
        [filteredData, searchQuery],
    )

    return (
        <RepoPackageContext.Provider
            value={value}
        >
            {children}
        </RepoPackageContext.Provider>
    );
};

export const useRepoPackageHook = () => {
    const context = useContext(RepoPackageContext);

    if (!context) {
        throw new Error("must use inside provider");
    }
    return context;
}

