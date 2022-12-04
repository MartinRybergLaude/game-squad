import {
    Grid,
} from "@mantine/core";
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

