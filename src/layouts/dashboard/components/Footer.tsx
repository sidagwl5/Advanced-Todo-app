import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IconButton, Tooltip } from "@mui/material";
import { tw } from "twind";
import InstagramIcon from "@mui/icons-material/Instagram";

const linksConfig = [
  {
    tooltip: "Creator's Linkedln",
    icon: <LinkedInIcon />,
    link: "https://www.linkedin.com/in/siddharth-agrawal-3ab8a1155/",
  },
  {
    tooltip: "Creator's Github",
    icon: <GitHubIcon />,
    link: "https://github.com/sidagwl5",
  },
  {
    tooltip: "Creator's Portfolio",
    icon: <LanguageIcon />,
    link: "https://siddharth-agrawal-portfolio.vercel.app/",
  },
  {
    tooltip: "Creator's Instagram",
    icon: <InstagramIcon />,
    link: "https://www.instagram.com/sasiddharth7/",
  },
];

const Footer = () => {
  return (
    <footer
      className={tw("w-full justify-center items-center flex gap-2 py-1")}
    >
      {linksConfig.map(({ tooltip, icon, link }) => (
        <Tooltip title={tooltip} arrow placement="top" disableInteractive>
          <IconButton onClick={() => window.open(link, "_blank")}>
            {icon}
          </IconButton>
        </Tooltip>
      ))}
    </footer>
  );
};

export default Footer;
