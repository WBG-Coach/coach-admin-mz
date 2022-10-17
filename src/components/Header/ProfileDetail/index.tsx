import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/auth";
import { Container } from "../../Container";
import { Icon } from "../../Icon";
import { Image } from "../../Image";
import { Text } from "../../Text";

const ProfileDetail: React.FC = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <Container alignItems={"center"}>
      {user.image_url ? (
        <Image
          src={user.image_url}
          width="32px"
          height="32px"
          borderRadius="50%"
        />
      ) : (
        <Container
          width="32px"
          height="32px"
          borderRadius="50%"
          background={"#E3E5E8"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Icon name={"user"} size={18} />
        </Container>
      )}
      <Text value={user.name} fontSize={"14px"} fontWeight={500} ml={"8px"} />
    </Container>
  );
};

export default ProfileDetail;
