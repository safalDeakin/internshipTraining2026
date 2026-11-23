import { Plus } from "lucide-react";

import { useGuestRequestHook } from "./provider/useGuestRequest";
import { RepoGuestRequestProvider } from "./provider/GuestRequestProvider";

import { RequestDetails } from "./components/RequestDetails";
import GuestRequestToolbar from "./components/GuestRequestToolbar";

import type { GuestRequest } from "../../../../domain/GuestRequest";

import MasterDetailView from "../../../../lib/component/MasterDetailView/MasterDetailView";
import useDialogBox from "../../../../lib/component/DialogueBox/useDialogueBox";

import PickupDetails from "./vehicle-request/PickupDetails";

import RoomServiceRequestForm from "../../dropdown/modal/RoomServiceRequestForm";

import ReusableButton from "../../../../shell/shared/components/ReusableButton";
import PickupRequestForm from "../../dropdown/modal/PickupRequestForm";
import { GuestRequestTaskProvider } from "./provider/GuestRequestTaskProvider";

/* ---------------- Request Type Selection ---------------- */

type RequestType = "room-service" | "pickup";

function RequestTypeOptions({
  onSelect,
}: {
  onSelect: (type: RequestType) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 p-5">
      <ReusableButton
        variant="secondary"
        size="md"
        onClick={() => onSelect("room-service")}
      >
        Room Service
      </ReusableButton>

      <ReusableButton
        variant="secondary"
        size="md"
        onClick={() => onSelect("pickup")}
      >
        Pick Up / Drop Off
      </ReusableButton>
    </div>
  );
}

/* ---------------- Main Guest Request ---------------- */

function GuestRequestMasterDetailView() {
  const guestRequestContext = useGuestRequestHook();

  const { showDialog, closeDialog } = useDialogBox();

  /* ---------------- Detail Content ---------------- */

  const detailContentBuilder = (selectedId: string) => {
    const request = guestRequestContext.data.find(
      (item) => item.id === selectedId,
    );

    if (!request) {
      return (
        <div className="p-4 text-sm text-slate-400">Request not found</div>
      );
    }

    if (request.requestType === "pick-up") {
      return <PickupDetails request={request} />;
    }

    return (
      <div className="w-full min-w-0">
        <GuestRequestToolbar request={request} posted={false} />
        <div className="p-1" />
        <RequestDetails request={request} />
      </div>
    );
  };

  /* ---------------- List Item ---------------- */

  const listItemBuilder = (item: GuestRequest) => (
    <div className="flex min-w-0 items-center gap-2">
      <span className="shrink-0 text-xs font-medium text-slate-600">
        {item.reservation}
      </span>

      <span className="truncate text-xs text-slate-600">{item.title}</span>
    </div>
  );

  /* ---------------- Room Service Dialog ---------------- */

  const openRoomServiceForm = () => {
    showDialog({
      title: "Request Room Service Form",
      showHeader: true,
      width: 650,
      closeOnBackdrop: false,
      content: <RoomServiceRequestForm onClose={() => closeDialog()} />,
    });
  };

  /* ---------------- Pickup / Drop Off Dialog ---------------- */

  const openPickupForm = () => {
    showDialog({
      title: "Pick Up / Drop Off",
      showHeader: true,
      width: 750,
      closeOnBackdrop: false,
      content: <PickupRequestForm onClose={() => closeDialog()} />,
    });
  };

  /* ---------------- Select Request Type ---------------- */

  const handleShowAddGuestRequest = async () => {
    const result = await showDialog<RequestType>({
      title: "Select Request Type",
      showHeader: true,
      width: 500,
      closeOnBackdrop: true,
      content: <RequestTypeOptions onSelect={(type) => closeDialog(type)} />,
    });

    if (result === "room-service") {
      openRoomServiceForm();
    }

    if (result === "pickup") {
      openPickupForm();
    }
  };

  /* ---------------- Add Button ---------------- */

  const actionButton = (
    <ReusableButton
      variant="outline"
      size="sm"
      className="h-8 w-8 !p-0"
      onClick={handleShowAddGuestRequest}
    >
      <Plus size={16} strokeWidth={2} className="text-[#0066B3]" />
    </ReusableButton>
  );

  return (
    <MasterDetailView
      items={guestRequestContext.data}
      searchQuery={guestRequestContext.searchQuery}
      onSearchChange={guestRequestContext.setSearchQuery}
      detailContentBuilder={detailContentBuilder}
      listItemBuilder={listItemBuilder}
      getId={guestRequestContext.getId}
      title={guestRequestContext.title}
      headerChildren={actionButton}
    />
  );
}

/* ---------------- Page Renderer ---------------- */

export default function GuestRequestPageRenderer() {
  return (
    <RepoGuestRequestProvider>
      <GuestRequestTaskProvider>
        <GuestRequestMasterDetailView />
      </GuestRequestTaskProvider>
    </RepoGuestRequestProvider>
  );
}
