import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    Grid,
    Center,
    createStyles,
} from "@mantine/core";
import SidebarPresenter from "../../components/sidebar/presenter";
import { NavbarSimple } from "../../components/sidebar/view";

const useStyles = createStyles((theme) => ({
    formCenter: {
      height: "100vh",
      [`@media (max-width: ${theme.breakpoints.md}px)`]: {
        height: "auto",
      },
    },
}));

export default function DashboardView() {
  return (
    <Grid>
      <Grid.Col span={1}>
        <div>Dashboard</div>
      </Grid.Col>
    </Grid>
  );
}

    const { classes } = useStyles();
    
    return (
        <Grid grow>
            <Grid.Col span={1}>
                <div>
                    <NavbarSimple/>
                </div>
            </Grid.Col>
            <Grid.Col span={2}>
                <div>
                    <Center className={classes.formCenter}>
                        Component2
                    </Center>
                </div>
            </Grid.Col>
        </Grid>
    );
  }