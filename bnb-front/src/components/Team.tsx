import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { TeamCard, TeamCardProps } from "./TeamCard";
import { TeamCard2 } from "./TeamCard2";


const teamCardData: TeamCardProps[] = [
    {
        name: 'Dongjae',
        position: 'Contract/Backend',
        image: '/image/team1.png',
    },
    {
        name: 'Seongeun',
        position: 'Designer',
        image: '/image/team2.jpg',
    },
    {
        name: 'Jinhyeok',
        position: 'App/Frontend',
        image: '/image/team3.JPG',
    },
]


const Team: FC = () => {
    return (
        <Flex 
            textAlign={'center'}
            justifyContent='center'
            mb={10}
        >
            {/* <Heading mb={6}>Team</Heading> */}
            {/* <Flex> */}
                {
                    teamCardData.map((v,i)=> {
                        return (
                            <TeamCard2 
                                key={i}
                                name={v.name}
                                position={v.position}
                                image={v.image}
                            />
                        )
                    })
                }

            {/* </Flex> */}
        </Flex>
    )
}




export default Team;