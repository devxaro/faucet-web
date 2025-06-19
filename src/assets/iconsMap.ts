import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArticleIcon from "@mui/icons-material/Article";
import BusinessIcon from "@mui/icons-material/Business";
import DeleteIcon from "@mui/icons-material/Delete";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GroupIcon from "@mui/icons-material/Group";
import ListIcon from "@mui/icons-material/List";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ReplayIcon from "@mui/icons-material/Replay";
import SaveIcon from "@mui/icons-material/Save";
import StyleIcon from "@mui/icons-material/Style";
import CoinIcon from "@components/icons/CoinIcon";

const icons: any = {
  ArrowCircleLeftIcon,
  AddCircleIcon,
  coinIcon: CoinIcon,
  EmojiEventsIcon: EmojiEventsIcon,
  addCircleOutline: AddCircleOutlineIcon,
  AddPhotoAlternateIcon,
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  ArticleIcon,
  BusinessIcon,
  categories: StyleIcon,
  delete: DeleteIcon,
  FilterAltIcon,
  ListIcon,
  LocalOfferIcon,
  SaveIcon,
  users: GroupIcon,
  ReplayIcon,
};

export const getIcon = (iconName: string) => {
  return icons[iconName];
};
