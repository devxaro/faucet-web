import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";

interface AccordionProps {
  items: { title: string; description: string; link?: any }[];
  expanded?: boolean;
  singleExpand?: boolean;
}

const CustomAccordion = ({
  items,
  expanded = false,
  singleExpand = false,
}: AccordionProps): JSX.Element => {
  const [expandedIndex, setExpandedIndex] = useState<number | false>(
    expanded ? 0 : false,
  );

  const handleChange =
    (index: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      if (singleExpand) {
        setExpandedIndex(newExpanded ? index : false);
      } else {
        setExpandedIndex(newExpanded ? index : expandedIndex);
      }
    };

  return (
    <>
      {items.map((item, index) => (
        <Accordion
          key={index}
          expanded={expandedIndex === index}
          onChange={handleChange(index)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 500 }}>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                whiteSpace: "nowrap",
                alignItems: "center",
              }}
            >
              {item.description && (
                <Box sx={{ flexShrink: 0, whiteSpace: "normal", width: "fit-content" }}>
                  {item.description}
                </Box>
              )}
              {item.link && (
                <Box sx={{ whiteSpace: "normal" }}>{item.link}</Box>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default CustomAccordion;
