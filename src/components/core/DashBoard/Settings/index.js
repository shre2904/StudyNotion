
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
import DeleteAccount from "./DeleteAccount"
import ChangeProfilePicture from "./ChangeProfilePicture"



export default function Settings() {
            return(
                <>
                    <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                        Edit profile
                    </h1>
                    <ChangeProfilePicture/>
                    <EditProfile/>
                    <UpdatePassword/>
                    <DeleteAccount/>
                </>
            )
}