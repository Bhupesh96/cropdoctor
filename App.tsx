import React, { useEffect } from "react";
import AppMain from "./src/app/App"
import requestAndroidPermission from "./src/core/Services/requestStoragePermission";
export default function App() {
  useEffect(() => {
    (async () => {
      const hasPermission = await requestAndroidPermission();
      if (!hasPermission) {
        console.log("⚠️ Some permissions denied");
      }
    })();
  }, []);
  return (
    <AppMain/>
  );
}
