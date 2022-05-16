import WIP from "../components/wip/wip";
import PageLayout from "../components/layout/PageLayout";

export default function WorkInProgress() {
    return (
      <>
        <PageLayout
          meta={{ title: 'Work in progress…' }}
          header={false}>
          {WIP()}
        </PageLayout>
      </>
    );
}
