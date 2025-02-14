import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getSingleAd from "../../services/getSingleAd";
import { Advertisement } from "../../types/types";
import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import editAd from "../../services/editAd";

export default function AdPage() {
  const { id } = useParams<{ id: string | undefined }>();
  const [ad, setAd] = useState<Advertisement>();
  const [editorMode, setEditorMode] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState<string | undefined>("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    async function setSingleAd() {
      const ad: Advertisement = await getSingleAd(id);
      setAd(ad);
      setImageUrl(ad?.imageUrl);
      setName(ad?.name);
      setPrice(String(ad?.price));
      setDescription(ad?.description);
    }
    setSingleAd();
  }, [id, editorMode]);

  function HandleEditAd() {
    editAd(id, imageUrl, name, description, price);
  }

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      height={"calc(100vh - 1.7em)"}
    >
      <Box>
        {editorMode ? (
          <>
            <Text>Картинка:</Text>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </>
        ) : (
          <Image boxSize={"auto"} src={ad?.imageUrl} alt={ad?.name} />
        )}
        {editorMode ? (
          <>
            <Text>Название:</Text>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </>
        ) : (
          <p>{ad?.name}</p>
        )}
        {editorMode ? (
          <>
            <Text>Цена:</Text>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
          </>
        ) : (
          <p>Цена: {ad?.price}</p>
        )}
        <p>Просмотры: {ad?.views}</p>
        <p>Лайки: {ad?.likes}</p>
        {editorMode ? (
          <>
            <Text>Описание:</Text>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </>
        ) : (
          <p>{ad?.description}</p>
        )}
        <p>Создано: {ad?.createdAt}</p>
        <Button onClick={() => setEditorMode((prev) => !prev)}>
          Редактировать
        </Button>
        {editorMode && (
          <Button onClick={() => HandleEditAd()}>Сохранить</Button>
        )}
      </Box>
    </Flex>
  );
}
