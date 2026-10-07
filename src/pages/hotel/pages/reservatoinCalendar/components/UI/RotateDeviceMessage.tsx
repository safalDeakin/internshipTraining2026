interface RotateDeviceMessageProps {
    message?: string;
}
export default function RotateDeviceMessage({
    message = "Tilt your device sideways to continue.",
}: RotateDeviceMessageProps) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-white px-6">
            <div className="flex max-w-sm flex-col items-center text-center">

                {/* Device Animation */}
                <div className="mb-8 flex h-32 w-40 items-center justify-center">
                    <div className="rotate-device">
                        <div className="device">

                            {/* Speaker */}
                            <div className="device-speaker" />

                            {/* Screen */}
                            <div className="device-screen">
                                <div className="screen-content">
                                    <div className="screen-line screen-line-lg" />
                                    <div className="screen-line" />
                                    <div className="screen-line screen-line-sm" />
                                </div>
                            </div>

                            {/* Home indicator */}
                            <div className="device-indicator" />

                        </div>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold tracking-tight text-[#1a2332]"> Tilt your device </h2>


                {/* Description */}
                <p className="mt-2 max-w-xs text-sm leading-6 text-[#8a9ab0]"> {message} </p>


                {/* Orientation hint */}
                <div className="mt-5 flex items-center gap-2 text-xs font-medium text-[#00897b]">
                    <span className="orientation-dot" />
                    Landscape mode required
                </div>
            </div>

        </div>
    );
}