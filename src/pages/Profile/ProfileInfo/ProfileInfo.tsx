import type { FC } from "react";
import type { ProfileType } from "../../../models/profile";
import defaultAvatar from "../../../assets/images/man_avatar.png";

import styles from "./ProfileInfo.module.css";
import { ProfileStatus } from "./ProfileStatus";

type ProfileInfoProps = {
  profile: ProfileType,
};

const ProfileInfo: FC<ProfileInfoProps> = ({ profile }) => {
  const avatarSrc = profile.photos.large ?? defaultAvatar;

  return (
    <div className={styles["user-profile-info"]}>
      <div>
        <img src={avatarSrc} alt="User name" width="150" height="150" />
      </div>
      <div>
        <h1>{profile?.fullName}</h1>
        <ProfileStatus status={"Hello my friends!"}/>
        {profile.lookingForAJob ?
          <>
            <p>Looking for a job: Yes</p>
            <p>{profile.lookingForAJobDescription}</p>
          </>
          :
          <p>Looking for a job: No</p>
        }
      </div>
    </div>
  );
};

export default ProfileInfo;
