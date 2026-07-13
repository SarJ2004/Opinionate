import React, { Suspense } from "react";
import ResetPassPage from "./components/ResetPassPage";

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassPage />
    </Suspense>
  );
}

export default page;
