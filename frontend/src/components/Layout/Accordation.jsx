import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ControlledAccordions({ des, mat, size }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const materialArray = Array.isArray(mat) ? mat : [mat];
  const sizeArray = Array.isArray(size) ? size : [size];
  console.log(sizeArray);
  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Mô tả</Typography>
        </AccordionSummary>
        <AccordionDetails className="h-[40vh] overflow-hidden">
          <Typography className="">{des}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Chất liệu
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {materialArray?.map((nestedArray, index) => (
            <div key={index}>
              {nestedArray?.map((material, innerIndex) => (
                <Typography key={innerIndex}>* {material.itemMat}</Typography>
              ))}
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "63%", flexShrink: 0 }}>
            Kích thước
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {sizeArray?.map((nestedArray, index) => (
            <div key={index}>
              {nestedArray?.map((sizeItem, innerIndex) => (
                <Typography
                  key={innerIndex}
                  sx={{ width: "100%", border: "black", height: "20px" }}
                >
                  * {sizeItem.itemSize}
                </Typography>
              ))}
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
