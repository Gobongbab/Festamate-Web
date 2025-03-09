import { type ActivityComponentType } from "@stackflow/react";
import { AppScreen } from "@stackflow/plugin-basic-ui";

const HomeScreen: ActivityComponentType = () => {
  return (
    <AppScreen appBar={{ title: "My Activity" }}>
      <div>My Activity</div>
    </AppScreen>
  );
};

export default HomeScreen;
