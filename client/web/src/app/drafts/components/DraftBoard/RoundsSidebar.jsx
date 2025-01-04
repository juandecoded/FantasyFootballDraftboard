// a sidebar to go next to the draft board gride that shows the crrent round. The round lights up a golden color in te curret round as well as the cell which is the current pick

import { Box, Flex, Grid, Heading, Text } from '@/components/ui';

export const RoundsSidebar = () => {
    const rosterSize = 16;
    
    return (
        <Grid
            rows={`${rosterSize}`}
            columns="1"
            gap="1"
        >
            <Box 
                align="center"
                justify="center"
                style={{border: '1px solid black',
                    // height: '30px',
                // backgroundColor: 'lightgray'
                padding: '0px',
                margin: '0px',
                
            }}>
                <Heading>Round</Heading>
                {/* <Separator /> */}
            </Box>
            {Array.from({ length: rosterSize }, (_, i) => (
                    <Box
                        key={i}
                        style={{backgroundColor: i % 2 === 0 ? 'lightgray' : 'darkgray'}}
                        align="center"
                        justify="center"
                    >
                        <Text>{i + 1}</Text>
                    </Box>
            ))}
        </Grid>
    )
}