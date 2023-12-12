import {
  Avatar,
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>({
    queryKey: [`rooms`, roomPk],
    queryFn: getRoom,
  });
  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
    IReview[]
  >([`rooms`, roomPk, `reviews`], getRoomReviews);
  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Skeleton height={"43px"} width="25%" isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        gap={2}
        height="60vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              <Image
                objectFit={"cover"}
                w="100%"
                h="100%"
                src="data:image/jpeg;base64,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"
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack width={"40%"} justifyContent={"space-between"} mt={10}>
        <VStack alignItems={"flex-start"}>
          <Skeleton isLoaded={!isLoading} height={"30px"}>
            <Heading fontSize={"2xl"}>
              House hosted by {data?.owner.name}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} height={"30px"}>
            <HStack justifyContent={"flex-start"} w="100%">
              <Text>
                {data?.toilets} toliet{data?.toilets === 1 ? "" : "s"}
              </Text>
              <Text>∙</Text>
              <Text>
                {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar name={data?.owner.name} size={"xl"} src={data?.owner.avatar} />
      </HStack>
      <Box mt={10}>
        <Heading mb={5} fontSize={"2xl"}>
          <HStack>
            <FaStar /> <Text>{data?.rating}</Text>
            <Text>∙</Text>
            <Text>
              {reviewsData?.length} review{reviewsData?.length === 1 ? "" : "s"}
            </Text>
          </HStack>
        </Heading>
        <Container mt={16} maxW="container.lg" marginX="none">
          <Grid gap={10} templateColumns={"1fr 1fr"}>
            {reviewsData?.map((review, index) => (
              <VStack alignItems={"flex-start"} key={index}>
                <HStack>
                  <Avatar
                    name={review.user.name}
                    src={review.user.avatar}
                    size="md"
                  />
                  <VStack spacing={0} alignItems={"flex-start"}>
                    <Heading fontSize={"md"}>{review.user.name}</Heading>
                    <HStack spacing={1}>
                      <FaStar size="12px" />
                      <Text>{review.rating}</Text>
                    </HStack>
                  </VStack>
                </HStack>
                <Text>{review.payload}</Text>
              </VStack>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
