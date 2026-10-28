
import { useRepoTestHook } from './provider/RepoTestProvider';
import { type Guest } from "../../../domain/GuestModel";

function TestPage() {
    const { data, create, remove } = useRepoTestHook();
    console.log("Test Page Loading");
    const stringData = "......."

    let lists: Guest[] = []
    if (data) {
        lists = data;
    }

    const onCreate = () => {
        // return remove("12345");
        return create(
            {
                id: "3456728",
                name: "New Created On CLick",
                email: "new EMail"
            }
        )
    }

    const onDelete = () => {
        return remove("12345");
        // return create(
        //     {
        //         id: "3456728",
        //         name: "New Created On CLick",
        //         email: "new EMail"
        //     }
        // )
    }
    //JSX
    return (<div><h1>{stringData}</h1>

        <span>{lists.toString()}</span>
        <button onClick={onCreate}> Save New Item</button>
        <button onClick={onDelete}> Delete Item</button>
    </div>);
}


export default TestPage;