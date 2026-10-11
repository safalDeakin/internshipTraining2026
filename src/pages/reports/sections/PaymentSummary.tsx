
interface PaymentMethod {
    method: string;
    transactions: number;
    amount: number;
}
interface PaymentSummaryProps {
    payments?: PaymentMethod[];
}

const defaultPayments: PaymentMethod[] = [
    {
        method: "Cash",
        transactions: 54,
        amount: 78400
    },
    {
        method: "Card",
        transactions: 38,
        amount: 96500
    },
    {
        method: "Digital Wallet",
        transactions: 31,
        amount: 57200
    },
    {
        method: "Cheque",
        transactions: 2,
        amount: 3500
    },
];

const PaymentSummary = ({ payments = defaultPayments }: PaymentSummaryProps) => (
    <div >
        <section className="mt-6 border-b-3 border-b-gray-300 pb-6 px-4 py-4 report-keep-together">
            <h2 className="text-sm font-bold">
                Payment Summary
            </h2>

            <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                    <thead className="bg-gray-100">

                        <tr >
                            <th className=" px-2 py-4 text-left">
                                Method
                            </th>

                            <th className=" px-2 py-4 text-center">
                                Transactions
                            </th>

                            <th className=" px-2 py-4 text-right">
                                Amount
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.method}
                                className="hover:bg-gray-100"
                            >
                                <td className=" px-2 py-4">
                                    {payment.method}
                                </td>

                                <td className=" px-2 py-4 text-center">
                                    {payment.transactions}
                                </td>

                                <td className=" px-2 py-4 text-right">
                                    Rs.{" "}{payment.amount}
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>

        </section>
    </div>
);

export default PaymentSummary;
