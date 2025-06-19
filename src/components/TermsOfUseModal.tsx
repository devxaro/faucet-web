import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const TermsOfUseModal = () => {
  const title1 = "h4";
  const title2 = "h5";
  const title3 = "h6";

  return (
    <Box
      sx={{
        padding: "20px",
        lineHeight: "1.8",
        borderRadius: "8px",
        textAlign: "justify",
        margin: "20px auto",
        maxWidth: "800px",
      }}
    >
      <Typography
        variant={title1}
        sx={{
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#2d2d2d",
          textAlign: "center",
        }}
      >
        Lorem Ipsum Dolor Sit Amet
      </Typography>

      <Typography
        variant={title2}
        sx={{
          marginTop: "15px",
          marginBottom: "10px",
        }}
      >
        Consectetur Adipiscing Elit
      </Typography>
      <Typography
        variant={title3}
        sx={{
          marginTop: "15px",
          marginBottom: "10px",
        }}
      >
        Integer Nec Odio
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
      </Typography>
      <Typography>
        Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos.
      </Typography>
      <Typography>
        Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
        Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at
        dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel
        nunc egestas porttitor.
      </Typography>
      <Typography>
        Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce
        ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus,
        ullamcorper vel, tincidunt sed, euismod in, nibh.
      </Typography>
    </Box>
  );
};

export default TermsOfUseModal;
