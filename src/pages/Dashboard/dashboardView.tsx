import {
    Grid,
    Center,
    createStyles,
} from "@mantine/core";
<<<<<<< HEAD
import { useForm } from "@mantine/form";
import { BadgeCard} from "../../components/gameCollection/gameCollectionView";

export default function DashboardView() {
    return <Grid>
        <Grid.Col span={4}>
            <div>Dashboard</div>
            <BadgeCard/>
        </Grid.Col>
    </Grid>
}

=======

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
                    <Center className={classes.formCenter}>
                        Navbar
                    </Center>
                </div>
            </Grid.Col>
            <Grid.Col span={2}>
                <div>
                    <Center className={classes.formCenter}>
                        Component 2
                    </Center>
                </div>
            </Grid.Col>
        </Grid>
    );
  }
>>>>>>> 891d54b35bf166fb5a0a15a236ed4266ad84f40b
