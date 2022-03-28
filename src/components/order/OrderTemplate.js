import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/product-slice";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  deleteTemplate,
  getTemplate,
  getTemplates,
  templateActions,
} from "../../store/template-slice";
import { createOrder } from "../../store/order-slice";
import { orderActions } from "../../store/order-slice";
import { SkeletonLoading } from "../layout/SkeletonLoading";
import EditIcon from "@mui/icons-material/Edit";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

//this component responsible for own template list and vender template list

export const OrderTemplate = (props) => {
  const navigate = useNavigate();
  const { vendor_id, mode } = useParams(); // get mode to distinct own template and vendor list mode

  const dispatch = useDispatch();
  //const [templates, setTemplates] = useState([]);
  const templateList = useSelector((state) => state.template.templateList);
  const isLoading = useSelector((state) => state.order.isLoading); //wait for order load from create from template
  const isLoadingE = useSelector((state) => state.template.isLoading); // wait for template loading
  const orderCreated = useSelector((state) => state.order.fetchSuccess);
  const orderId = useSelector((state) => state.order.order.id);
  console.log("order create status ", orderCreated);
  const userId = useSelector((state) => state.auth.user.id);
  const templateReady = useSelector((state) => state.template.fetchSuccess);
  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 100,
    left: "auto",
    position: "fixed",
  }; //style for FAB

  const listLen = templateList.length;

  const arr = new Array(listLen);
  for (let i = 0; i < listLen; i++) {
    arr[i] = false;
  }
  // state for confirm dialogs
  const [open, setOpen] = useState(arr);
  const [currentTemplateId, setCurrentTemplateId] = useState(null);

  useEffect(() => {
    dispatch(orderActions.resetFetchFlag());
  }, []);

  useEffect(() => {
    if (orderCreated) {
      // console.log("orderId once order create->", orderId);
      if (orderId) {
        navigate(`/user/order/${orderId}`);
        dispatch(orderActions.resetFetchFlag()); // reset flag so can be use for next order
      }
    }
  }, [orderCreated, orderId]);

  //check mode / via mytemplate / or list all
  useEffect(() => {
    if (mode === "mytemplates" || mode === "neworder") {
      dispatch(getTemplates(userId, null));
    } else {
      dispatch(getProducts(vendor_id, "template"));
      dispatch(getTemplates(userId, vendor_id));
    }
  }, [mode]);

  //monitor edit mode
  useEffect(() => {
    // console.log("template ready->", templateReady);
    if (templateReady) {
      if (currentTemplateId !== null) {
        // console.log("current templateid ->", currentTemplateId);
        dispatch(templateActions.resetFetchFlag()); //once load finish reset flag for next event
        dispatch(templateActions.resetEditMode()); //reset to available for for the next edit
        navigate(`/user/${userId}/template/${currentTemplateId}/edit`);
      }
    }
  }, [templateReady, currentTemplateId]);

  const handleClickOpen = (i) => {
    setOpen((arr) => {
      let temp = [...arr];
      temp[i] = true;
      return temp;
    });
  };

  const handleClose = (i) => {
    setOpen((arr) => {
      let temp = [...arr];
      temp[i] = false;
      return temp;
    });
  };

  const handleFabClick = () => {
    //new order template to select from vendor
    navigate("/vendors");
  };

  const handleClick = (template_id, vendor_id) => {
    //handle to create new order
    dispatch(createOrder(userId, vendor_id, template_id));
    // once complete create order flag createSuccess to useEffect to lauch <Order />
  };

  const handleEdit = (uid, tid) => {
    setCurrentTemplateId(tid);
    dispatch(templateActions.setEditMode());
    dispatch(getTemplate(uid, tid));
  };

  const handleDelete = (tid) => {
    dispatch(deleteTemplate(userId, tid));
    setOpen((arr) => {
      //to adjust dialog state
      arr.pop();
      return arr;
    });
  };

  if (isLoading || isLoadingE) {
    //handle both order and template
    return <SkeletonLoading />;
  }

  return (
    <>
      <Box sx={{ width: "90%", bgcolor: "background.paper" }}>
        <List>
          <ListItemText>
            {mode === "mytemplates" ? (
              <Typography variant="h6">Order Template</Typography>
            ) : (
              <Typography variant="overline">
                Create <NoteAddIcon color={"primary"} sx={{ mb: "-0.2em" }} />
                order from the below templates
              </Typography>
            )}
          </ListItemText>
          {templateList.map((template, i) => (
            <ListItemButton key={template.id}>
              {mode === "mytemplates" ? (
                <DeleteIcon
                  color={"primary"}
                  sx={{ mr: "0.5em" }}
                  onClick={() => handleClickOpen(i)}
                />
              ) : (
                ""
              )}
              {mode === "mytemplates" ? (
                <Dialog
                  open={open[i]}
                  onClose={() => handleClose(i)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Delete this template ?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {template.name}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => handleClose(i)} autoFocus>
                      Cancel
                    </Button>
                    <Button onClick={() => handleDelete(template.id)}>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              ) : (
                ""
              )}
              {mode === "mytemplates" ? (
                <EditIcon
                  color={"primary"}
                  sx={{ mr: "0.5em" }}
                  onClick={() => handleEdit(userId, template.id)}
                />
              ) : (
                ""
              )}
              {mode === "neworder" ? (
                <NoteAddIcon
                  color={"primary"}
                  onClick={() => handleClick(template.id, template.vendor_id)}
                  sx={{ mr: "2em" }}
                />
              ) : (
                ""
              )}
              <ListItemText>{template.name}</ListItemText>
            </ListItemButton>
          ))}
        </List>
        {mode === "mytemplates" ? (
          <Fab
            size="medium"
            color="primary"
            aria-label="add"
            style={style}
            onClick={handleFabClick}
          >
            <AddIcon />
          </Fab>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};
