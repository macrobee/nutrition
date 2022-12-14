import { useContext } from "react";
import { UserContext } from "../../contexts/userInformation.context";

import Profile from "./profile";

import { StyledHeader, UserIcon, Image } from "./header.styles";

const Header = () => {
  const { user, profileIsOpen, setProfileIsOpen, userPhysicalInfo } = useContext(UserContext);
  const { personName, photoUrl } = user;

  // useEffect(() => {
  //   console.log(profileIsOpen);
  // }, [profileIsOpen])

  const toggleProfile = () => {
    console.log(userPhysicalInfo);
    setProfileIsOpen(!profileIsOpen);
  };

  return (
    <StyledHeader>
      <h1>Welcome, {personName}</h1>
      <UserIcon onClick={toggleProfile} className="icon">
        Edit profile information
      </UserIcon>
      {profileIsOpen && <Profile />}
    </StyledHeader>
  );
};

export default Header;
