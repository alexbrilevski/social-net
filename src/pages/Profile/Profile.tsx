import type { FC } from "react";
import type { ProfileType } from "../../models/profile";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostListContainer from "./PostsList/PostListContainer";
import Preloader from "../../components/UI/Preloader/Preloader";

type ProfileProps = {
  profile: ProfileType | null,
  status: string,
  updateUserStatus: (status: string) => void,
};

const Profile: FC<ProfileProps> = ({ profile, status, updateUserStatus }) => {
  if (!profile) {
    return <Preloader />
  }

  return (
    <div>
      <ProfileInfo
        profile={profile}
        status={status}
        updateUserStatus={updateUserStatus}
      />
      <PostListContainer />
    </div>
  );
};

export default Profile;
