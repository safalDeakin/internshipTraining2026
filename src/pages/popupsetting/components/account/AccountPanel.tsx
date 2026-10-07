import AccountSettings from "./AccountSettings"
import Contacts from "./Contacts"
import PersonalInformation from "./PersonalInformation"
import ProfileSection from "./ProfileSection"
import Verifications from "./Verifications"



const AccountPanel = () => {
    return (
        <>
            <ProfileSection />

            <PersonalInformation />

            <AccountSettings />

            <Verifications />

            <Contacts />
        </>
    )
}

export default AccountPanel