import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userInformation.context";

import Profile from "./profile";

import { StyledHeader, UserIcon, Image } from "./header.styles";

const Header = () => {
  const { user, profileIsOpen, setProfileIsOpen } = useContext(UserContext);
  const { personName, photoUrl } = user;

  // useEffect(() => {
  //   console.log(profileIsOpen);
  // }, [profileIsOpen])

  const toggleProfile = () => {
    setProfileIsOpen(!profileIsOpen);
  };

  return (
    <StyledHeader>
      <h1>Welcome, {personName}</h1>
      <UserIcon onClick={toggleProfile} className="icon">
        {personName}
        <Image src={photoUrl} alt={personName} />
      </UserIcon>
      {profileIsOpen && <Profile />}
    </StyledHeader>
  );
};

export default Header;
