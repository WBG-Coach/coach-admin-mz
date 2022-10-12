import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "../Container";
import { Icon } from "../Icon";
import { Image } from "../Image";
import { LoadingDots } from "../LoadingDots";
import { Text } from "../Text";
import { Props } from "./types";

const PicSelect: React.FC<Props> = ({
  imageUrl,
  onSelectImage,
  defaultIconName,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const handleSelectImage = (file: File) => {
    setIsLoading(true);
    onSelectImage(file);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [imageUrl]);

  return (
    <Container mb="40px" flexDirection="column" alignItems="center">
      <Container
        width="120px"
        height="120px"
        overflow="hidden"
        borderRadius="60px"
        alignItems="center"
        background="#E3E5E8"
        justifyContent="center"
      >
        {isLoading ? (
          <LoadingDots />
        ) : imageUrl ? (
          <Image
            src={imageUrl}
            width="120px"
            height="120px"
            borderRadius="60px"
          />
        ) : (
          <Icon name={defaultIconName} size={60} />
        )}
      </Container>
      <Container mt="16px">
        <label htmlFor="file" style={{ cursor: "pointer" }}>
          <Text
            fontSize="14px"
            color="primary"
            value={t("Schools.change-photo")}
          />
        </label>
      </Container>

      <input
        id="file"
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          handleSelectImage(e.target.files?.item(0) as File);
        }}
      />
    </Container>
  );
};

export default PicSelect;
