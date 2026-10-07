interface OfferPerformanceItem {
  offerName: string;
  code: string;
  usage: number;
  revenue: number;
  conversionRate: number;
}


interface OfferPerfomanceProps {
  offers?: OfferPerformanceItem[];
}

const defaultOffers: OfferPerformanceItem[] = [
  {
    offerName: "Weekend Special",
    code: "WEEKEND20",
    usage: 84,
    revenue: 68400,
    conversionRate: 18.5
  },
  {
    offerName: "Member Offer",
    code: "MEMBER10",
    usage: 67,
    revenue: 52300,
    conversionRate: 15.2
  },
  {
    offerName: "New Customer",
    code: "WELCOME15",
    usage: 41,
    revenue: 28700,
    conversionRate: 12.8
  },
];

const OfferPerfomance = ({ offers = defaultOffers }: OfferPerfomanceProps) => (
  <>


    <section className="mt-6 border-b-3 border-b-gray-300 pb-6 px-4 py-4 report-keep-together">

      <h2 className="text-sm font-bold">
        Offer Performance
      </h2>

      <div className="mt-3 overflow-x-auto">

        <table className="w-full border-collapse text-xs">

          <thead className="bg-gray-100">

            <tr >
              <th className=" px-2 py-4 text-left">
                Offer
              </th>

              <th className=" px-2 py-4 text-center">
                Code
              </th>

              <th className=" px-2 py-4 text-center">
                Usage
              </th>

              <th className=" px-2 py-4 text-right">
                Revenue
              </th>

            </tr>

          </thead>


          <tbody>

            {offers.map((offer) => (

              <tr
                key={offer.offerName}
                className="hover:bg-gray-100"
              >

                <td className=" px-2 py-4 text-left">
                  {offer.offerName}
                </td>

                <td className=" px-2 py-4 text-center">
                  {offer.code}
                </td>

                <td className=" px-2 py-4 text-center">
                  {offer.usage}
                </td>

                <td className=" px-2 py-4 text-right">
                  Rs.{" "}
                  {offer.revenue}
                </td>


              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>

  </>
);

export default OfferPerfomance;
