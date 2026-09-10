
const CancellationAnalysis = ({ data }: { data: any }) => {
    return (
        <div>
            <section className="mt-6 border-b-3 border-b-gray-300 pb-4 report-keep-together">
                <h2 className="text-sm font-bold">
                    Cancellation Reason Analysis
                </h2>

                <div className="mt-3 space-y-2 text-sm">
                    <div className="grid grid-cols-2 max-w-md ">
                        <h2>Reason</h2>
                        <h2>Count</h2>
                    </div>
                    {data.map((item: any, index: number) => (
                        <div key={index} className="grid grid-cols-2 max-w-md">

                            <span>
                                {item.reason}:
                            </span>


                            <span className="ml-3">
                                {item.count}
                            </span>
                        </div>
                    ))}



                </div>

            </section>
        </div>
    )
}

export default CancellationAnalysis