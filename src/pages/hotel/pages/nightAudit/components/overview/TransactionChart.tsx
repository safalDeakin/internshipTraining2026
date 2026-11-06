import type { TransactionItem } from "../../../../../../domain/nightAudit";
import CardTitle from "../shared/CardTitle";

interface TransactionChartProps {
    transactions: TransactionItem[];
    totalVariance: string;
}

export default function TransactionChart({
    transactions,
    totalVariance,
}: TransactionChartProps) {
    const maxValue = 250;

    return (
        <section className="chart-card">
            <div className="chart-heading">
                <CardTitle>Transaction</CardTitle>

                <p>
                    Total Variance: <strong>{totalVariance}</strong>
                </p>

                <label className="chart-search">
                    <span aria-hidden="true">⌕</span>
                    <input aria-label="Search products" placeholder="Products" />
                </label>
            </div>

            <div className="legend">
                <span>
                    <i className="legend-dot legend-dot--purple" />
                    Forecasted
                </span>

                <span>
                    <i className="legend-dot legend-dot--yellow" />
                    Actual Sales
                </span>
            </div>

            <div className="chart-area">
                <span className="axis-title">5 yrs Average</span>

                <div className="y-axis" aria-hidden="true">
                    {[5, 4, 3, 2, 1, 0].map((tick) => (
                        <span key={tick}>{tick}</span>
                    ))}
                </div>

                <div className="plot">
                    {transactions.map((item, index) => (
                        <div
                            className="bar-group"
                            key={`${item.category}-${index}`}
                        >
                            <div className="bars">
                                <div
                                    className="bar bar--purple"
                                    style={{
                                        height: `${(item.forecasted / maxValue) * 100}%`,
                                    }}
                                >
                                    <span>{item.forecasted}</span>
                                </div>

                                <div
                                    className="bar bar--yellow"
                                    style={{
                                        height: `${(item.actual / maxValue) * 100}%`,
                                    }}
                                >
                                    <span>{item.actual}</span>
                                </div>
                            </div>

                            <span className="bar-label">{item.category}</span>
                        </div>
                    ))}
                </div>

                <span className="x-axis-title">Category</span>
            </div>

            <p className="chart-total">Total: {totalVariance}</p>
        </section>
    );
}