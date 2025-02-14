import { Box, Image } from "@chakra-ui/react";
import { Advertisement } from "../../types/types";
import { Link } from "react-router-dom";

export default function AdCard({ ad }: { ad: Advertisement }) {
  const { id, name, price, views, likes, imageUrl } = ad;

  return (
    <Link to={`${id}`}>
      <Box
        bg={"blanchedalmond"}
        border={"1px solid white"}
        borderRadius={"2%"}
        padding={".5em .5em"}
        height={"250px"}
        _hover={{ filter: "saturate(30%)" }}
      >
        <Image boxSize="100px" src={imageUrl} alt={name} />
        <p>{name}</p>
        <p>Цена: {price}</p>
        <p>Просмотры: {views}</p>
        <p>Лайки: {likes}</p>
      </Box>
    </Link>
  );
}
