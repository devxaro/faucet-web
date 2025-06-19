import Avatar from "@mui/material/Avatar";
import { GridRenderCellParams } from "@mui/x-data-grid";

export const CustomAvatar = (
  params: GridRenderCellParams<
    { name: string; color: string; textSize?: string; size: number },
    any,
    any
  >,
) => {
  if (params.value == null) {
    return "";
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Avatar
        sx={{
          backgroundColor: params.value.color,
          height: params.value.size || 30,
          width: params.value.size || 30,
          ...(params.value.textSize && { fontSize: params.value.textSize }),
        }}
      >
        {params.value.name}
      </Avatar>
    </div>
  );
};
