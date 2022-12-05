import {
    Grid,
    Center,
    Card,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export default function DashboardView() {

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        },
    });

    return (
        <Grid grow>
            <Grid.Col span={1}>
                <div>
                    <Center>
                        <Card shadow="sm" withBorder>
                            Dashboard
                        </Card>
                    </Center>
                </div>
            </Grid.Col>
        </Grid>
    )
}