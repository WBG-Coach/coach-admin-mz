import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import { Container } from "../Container";
import { Icon } from "../Icon";
import { Image } from "../Image";
import { Modal } from "../Modal";
import { SelectProject } from "../SelectProject";
import { Text } from "../Text";

export const SelectProjectButton: React.FC<{}> = () => {
  const user = useSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container width="100%" alignItems="center" onClick={() => setOpen(true)}>
        <Container
          ml="16px"
          mr="16px"
          width="40px"
          height="40px"
          overflow="hidden"
          alignItems="center"
          borderRadius="20px"
          background="#F4F5F5"
          justifyContent="center"
        >
          {user.currentProject?.image_url ? (
            <Image src={user.currentProject?.image_url} width="40px" />
          ) : (
            <Text
              fontSize="24px"
              color="#49504C"
              value={user.currentProject?.name?.substring(0, 1)}
            />
          )}
        </Container>
        <Container flex={1} flexDirection="column">
          <Text value="Project" color="#49504C" fontSize="12px" />
          <Text
            fontSize="14px"
            lineHeight="24px"
            value={user.currentProject?.name}
          />
        </Container>
        <Icon size={24} name="angle-down" color="#000" mr="16px" />
      </Container>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <SelectProject afterSelect={() => setOpen(false)} />
      </Modal>
    </>
  );
};
