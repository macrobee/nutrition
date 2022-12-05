import { useContext } from "react";
import { UserContext } from "../../contexts/userInformation.context";

import { StyledHeader, UserIcon, Image } from "./header.styles";

const Header = () => {
  const { user } = useContext(UserContext);
  const { personName, photoUrl } = user;
  return (
    <StyledHeader>
      <h1>Welcome, {personName}</h1>
      <UserIcon>
        {personName} 
        <Image src={photoUrl} alt={personName} />
      </UserIcon>
    </StyledHeader>
  );
};

export default Header;
