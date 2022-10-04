import React, { useState, useEffect } from "react";
import {
  Grid,
  Menu,
  MenuItem,
  Box,
  Typography,
  Avatar,
  AvatarGroup,
  IconButton,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useQuery } from "@apollo/client";
// Select
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
// ENd Select
import "./selectusers.scss";
import { GET_EMPLOYEE_WITH_PAGINATION } from "../../Schema/Employee";

// Select
const Root = styled("div")(
  ({ theme }) => `
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    font-size: 14px;
  `
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
    border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    border-radius: 4px;
    padding: 1px;
    display: flex;
    flex-wrap: wrap;
  
    &:hover {
      border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    }
  
    &.focused {
      border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  
    & input {
      background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
      color: ${
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.65)"
          : "rgba(0,0,0,.85)"
      };
      height: 30px;
      box-sizing: border-box;
      padding: 4px 6px;
      width: 0;
      min-width: 30px;
      flex-grow: 1;
      border: 0;
      margin: 0;
      outline: 0;
    }
  `
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    height: 24px;
    margin: 2px;
    line-height: 22px;
    background-color: ${
      theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
    };
    border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
    border-radius: 2px;
    box-sizing: content-box;
    padding: 0 4px 0 10px;
    outline: 0;
    overflow: hidden;
  
    &:focus {
      border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
      background-color: ${
        theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"
      };
    }
  
    & span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  
    & svg {
      font-size: 12px;
      cursor: pointer;
      padding: 4px;
    }
  `
);

const Listbox = styled("ul")(
  ({ theme }) => `
    margin: 2px 0 0;
    padding: 0;   
    list-style: none;   
    overflow: auto;
    max-height: 250px;
    
    & li {
      padding: 5px 12px;
      display: flex;
  
      & span {
        flex-grow: 1;
      }
  
      & svg {
        color: transparent;
      }
    }
  
    & li[aria-selected='true'] {
      background-color: ${
        theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"
      };
      font-weight: 600;
  
      & svg {
        color: #1890ff;
      }
    }
  
    & li[data-focus='true'] {
      background-color: ${
        theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"
      };
      cursor: pointer;
  
      & svg {
        color: currentColor;
      }
    }
  `
);

// End Select

export default function SelectDepartment({ setAsignDepartment }) {
  const [userData, setUserData] = useState([]);
  const [anchorEll, setAnchorEll] = useState(null);
  const open = Boolean(anchorEll);
  const handleClick = (event) => {
    setAnchorEll(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEll(null);
  };

  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //get employeee
  const { data, refetch } = useQuery(GET_EMPLOYEE_WITH_PAGINATION, {
    variables: {
      // page: 1,
      // limit: limit,
      keyword: "",
      pagination: false,
    },
    onCompleted: ({ getEmployeePagination }) => {
      console.log("getEmployeePagination::: ", getEmployeePagination);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  // console.log("data:->", data);

  useEffect(() => {
    if (data) {
      // console.log(data?.readUsers?.users, "user");
      let rows = [];
      data?.getEmployeePagination?.data?.map((element) => {
        let allrow = {
          id: element?._id,
          title:
            element?.latin_name?.first_name +
            " " +
            element?.latin_name?.last_name,
          image: element?.image?.src,
        };
        rows.push(allrow);
        setUserData(rows);
      });
    }
  }, [data]);

  //   console.log("userData::->", userData);
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    options: userData,
    getOptionLabel: (option) => option.title,
  });
  // End select

  React.useEffect(() => {
    setAsignDepartment(value);
  }, [value]);

  return (
    <Box className="select-muti-user">
      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <IconButton onClick={handleClick} sx={{ marginTop: "5px" }}>
            <PersonAddAlt1Icon
              className="card-icon"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              className="assign-team-icon"
            />
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={anchorEll}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{ height: "500px" }}
          >
            <MenuItem>
              <Box sx={{ width: "200px" }}>
                <Typography>Team Assigned</Typography>
                {value.map((option, index) => (
                  <StyledTag label={option.title} {...getTagProps({ index })} />
                ))}
              </Box>
            </MenuItem>
            <MenuItem>
              {/* select */}
              <Box sx={{ width: "100%" }}>
                <Root>
                  <div {...getRootProps()}>
                    <InputWrapper
                      ref={setAnchorEl}
                      className={focused ? "focused" : ""}
                    >
                      <input placeholder="Type name" {...getInputProps()} />
                    </InputWrapper>
                  </div>
                </Root>
              </Box>
              {/* end select */}
            </MenuItem>
            <MenuItem>
              {groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()}>
                  {groupedOptions.map((option, index) => (
                    <li {...getOptionProps({ option, index })}>
                      <span>
                        <Avatar
                          sx={{ width: "30px", height: "30px" }}
                          alt={`${option.title}`}
                          src={option?.image}
                        />
                      </span>
                      <span style={{ margin: "4px 0px 0px 5px" }}>
                        {option.title}
                      </span>
                      <CheckIcon fontSize="small" />
                    </li>
                  ))}
                </Listbox>
              ) : null}
            </MenuItem>
          </Menu>
        </Grid>
        <Grid item xs={10}>
          <Box className="avatar-display-group">
            <AvatarGroup max={4}>
              {value.map((option, index) => (
                <Avatar
                  className="avatar"
                  alt={`${option.title}`}
                  src={option?.image}
                />
              ))}
            </AvatarGroup>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
