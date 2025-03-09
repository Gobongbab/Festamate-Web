import "./index.css";
import { createRoot } from "react-dom/client";
import "@stackflow/plugin-basic-ui/index.css";

import { Stack } from "@/app/stackflow";

createRoot(document.getElementById("root")!).render(<Stack />);
