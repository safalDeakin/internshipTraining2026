import ReusableOfferDetails from "./ReusableOfferDetails";

const OffersDetails = () => {
  return (
    <ReusableOfferDetails
      title="Weekend Special Offer"
      code="OFF#12111"
      leftInfo={[
        { label: "Offer Name", value: "Weekend Special Offer" },
        { label: "Offer Code", value: "OFF#1211" },
        { label: "Campaign", value: "Weekend Campaign" },
        { label: "Offer Type", value: "Percentage Discount" },
        { label: "Status", value: "Active" },
        { label: "Effective Period", value: "2083/02/01 To 2083/03/01" },
        { label: "Applicable Days", value: "Saturday, Sunday" },
        { label: "Applicable Time", value: "7:00 Am - 8:00 Pm" },
      ]}
      rightInfo={[
        { label: "Maximum Discount", value: "NPR- 2,000" },
        { label: "Customer Group", value: "All Customer" },
        { label: "Minimum Quantity", value: "2" },
      ]}
      posShifts={[
        [
          { label: "Active", value: 12 },
          { label: "Pending", value: 3 },
          { label: "Closed and Approved", value: 9 },
        ],
        [
          { label: "Terminal Online", value: 5 },
          { label: "Total Staffs", value: 5 },
          { label: "Total Hours", value: 10 },
        ],
      ]}
      sales={[
        [
          { label: "Total Item Sold", value: 125 },
          { label: "Net Sales", value: "Rs.30000" },
          { label: "Total Collected", value: "Rs.24000" },
        ],
        [
          { label: "Gross Sale", value: "Rs.25000" },
          { label: "Total Tax", value: "Rs.5000" },
          { label: "Total Discounts", value: "Rs.1000" },
        ],
      ]}
      shortcuts={[
        { label: "Record Unavailability", color: "bg-red-500" },
        { label: "Run Pos", color: "bg-blue-500" },
        { label: "Record Expenses", color: "bg-green-500" },
        { label: "View Pending Approval", color: "bg-orange-400" },
      ]}
      usageLimits={[
        { label: "Usage Type", value: "Once Per Customer Per Day" },
        { label: "Daily Limit", value: "100" },
        { label: "Campaign Limit", value: "250" },
        { label: "Customer Limit", value: "Unlimited" },
      ]}
      onExportCsv={() => console.log("Export CSV")}
      onDownloadPdf={() => console.log("Download PDF")}
      onEdit={() => console.log("Edit item settings")}
    />
  );
};

export default OffersDetails;
