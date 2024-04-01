import React from "react";
import { Helmet } from "react-helmet";

function Preview({ username }) {
  console.log(username);
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <iframe
        width="317"
        height="667"
        sandbox="allow-scripts allow-same-origin"
        className="previewFrame"
        src={`/${username}`}
        title="preview"
      />
    </>
  );
}

export default Preview;
