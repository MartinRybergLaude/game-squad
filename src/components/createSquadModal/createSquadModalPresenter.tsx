import CreateSquadModalView from "./createSquadModalView";

export interface CreateSquadFormValues {
  name: string;
}

export default function CreateSquadModalPresenter() {
  function handleCreateSquad(values: CreateSquadFormValues) {
    console.log(values);
  }

  return <CreateSquadModalView onSubmit={handleCreateSquad} />;
}
