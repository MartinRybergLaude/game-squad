import { Grid, Center, createStyles } from "@mantine/core";
import { GameCollectionView } from "../../components/gameCollection/gameCollectionView";
import { NavbarSimple } from "../../components/sidebar/sidebarView";

const useStyles = createStyles((theme) => ({
    formCenter: {
        height: "100vh",
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            height: "auto",
        },
    },
}));

export default function DashboardView() {
    const { classes } = useStyles();

    return (
        <Grid grow>
            <Grid.Col span={1}>
                <div>
                    <Center inline className={classes.formCenter}>
                        <NavbarSimple />
                    </Center>
                </div>
            </Grid.Col>
            <Grid.Col span={2}>
                <div>
                    <Center className={classes.formCenter}>
                        <GameCollectionView />
                    </Center>
                </div>
            </Grid.Col>
        </Grid>
    );
}
