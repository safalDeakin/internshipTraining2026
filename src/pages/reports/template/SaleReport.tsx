const SaleReport = () => {
  return (
    <div className="px-4 py-8 ">

      {/*Title*/}
      <h1 className="text-2xl font-bold">
        Daily Sale Report - John Doe
      </h1>


      {/*Description(Sales Information)*/}
      <div className="mt-4 grid grid-cols-2 gap-y-2 justify-between">

        <div>
          <span className="">
            Staff ID:
          </span>{"          "}
          SH-111
          {/* {report.property.name} */}
        </div>

        <div>
          <span className="">
            Status:
          </span>{"    "}
          Reviewed
          {/* {report.property.reportDate} */}
        </div>

        <div>
          <span className="">
            HOD:
          </span>{" "}
          Bhupal Karmacharya
          {/* {report.property.preparedBy} */}
        </div>

        <div>
          <span className="">
            Counter:
          </span>{" "}
          Terminal C1
          {/* {report.property.location} */}
        </div>


        <div>
          <span className="">
            Shift Time(Open-Close):
          </span>{"   "}
          8:00 - 20:00
          {/* {report.property.location} */}
        </div>

        <div>
          <span className="">
            Date:
          </span>{"     "}
          2026/12/05
          {/* {report.property.location} */}
        </div>



      </div>

    </div>
  );
};

export default SaleReport;