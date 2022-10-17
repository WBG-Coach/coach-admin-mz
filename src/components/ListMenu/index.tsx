import { useRef, useState } from "react";
import useOnClickOutside from "../../hooks/onClickOutside";
import { Container } from "../Container";
import { motion } from "framer-motion";
import { Text } from "../Text";
import Props from "./types";

const defaultTransitionVariant = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0 },
};

const ListMenu: React.FC<Props> = ({ options }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const boxRef = useRef<any>(null);

  useOnClickOutside(boxRef, () => setMenuIsOpen(false));

  return (
    <Container position={"relative"}>
      <Container
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        background={"#3373CC"}
        position={"relative"}
        width={"40px"}
        height={"40px"}
        borderRadius={"12px"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Container
          background={"#FFFFFF"}
          width={"4px"}
          height={"4px"}
          borderRadius={"50%"}
        />
        <Container
          mt={"4px"}
          background={"#FFFFFF"}
          width={"4px"}
          height={"4px"}
          borderRadius={"50%"}
        />
        <Container
          mt={"4px"}
          background={"#FFFFFF"}
          width={"4px"}
          height={"4px"}
          borderRadius={"50%"}
        />
      </Container>
      {menuIsOpen && (
        <Container
          ref={boxRef}
          top={48}
          right={0}
          borderRadius={"12px"}
          background={"#FFFFFF"}
          boxShadow={"0px 0px 10.0408px rgba(0, 0, 0, 0.1)"}
          position={"absolute"}
          minWidth={"160px"}
          zIndex={20}
          flexDirection={"column"}
        >
          <motion.div
            style={{ flex: 1, width: "100%" }}
            variants={defaultTransitionVariant}
            initial="hidden"
            animate="visible"
          >
            {options.map(({ label, onClick }) => (
              <Container
                p={"12px"}
                onClick={() => {
                  setMenuIsOpen(false);
                  onClick();
                }}
              >
                <Text value={label} fontWeight={400} fontSize={"14px"} />
              </Container>
            ))}
          </motion.div>
        </Container>
      )}
    </Container>
  );
};

export default ListMenu;
