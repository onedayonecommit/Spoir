import { Card, CardBody, CardFooter, Image, Text } from "@chakra-ui/react"
import { FC } from "react"


export interface TeamCardProps {
    name: string
    position: string
    image: string
}


export const TeamCard : FC<TeamCardProps> = ({name, position, image}) => {
    return (
        <Card mr={4} size='lg'>
            <Image
                src={image}
                style={{ width:300, borderRadius: "9999px"}}
            />
            <CardBody>
                <Text textAlign={'center'} fontWeight="bold" fontSize={25}>{name}</Text>
                <Text textAlign={'center'}> {position}</Text>
            </CardBody>

        </Card>
    )
}