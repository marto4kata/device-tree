import React, { useEffect, useState } from "react";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Typography, Card } from "@material-ui/core";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import DevicesIcon from '@material-ui/icons/Devices';
import InfoIcon from '@material-ui/icons/Info';
import { API_URL } from "../constants";

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
  treeContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: 'space-between',
  },
  card: {
    width: 400,
    height: 160,
  }
});

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

const StyledTreeItem = (props) => {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon}/>
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

const CardInfo = ({ info }) => {
  const classes = useStyles();
  const { deviceName, type, vendorId, productId, stringDescriptor } = info;
  return deviceName && (
    <Card elevation={8} className={classes.card}>
      <CardContent>
        <Typography>
          Name: {deviceName}
        </Typography>
        <Typography>
          Type: {type}
        </Typography>
        <Typography>
          Vendor Id: {vendorId}
        </Typography>
        <Typography>
          Product Id: {productId}
        </Typography>
        <Typography>
          String descriptor: {stringDescriptor}
        </Typography>
      </CardContent>
    </Card>
  )
}

const TreeItems = ({ treeItems }) => {
  const classes = useStyles();
  const initialState = {
    deviceName: '',
    type: '',
    vendorId: null,
    productId: null,
    deviceAddress: null,
    stringDescriptor: ''
  };
  const [info, setInfo] = useState(initialState);

  const getTreeItemsFromData = (treeItems) => {
    return treeItems.map(treeItemData => {
      let children = null;

      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }

      const onInfoClick = (e) => {
        e.preventDefault();

        if (info.deviceAddress === treeItemData.deviceAddress) {
          setInfo(initialState);
        } else {
          setInfo(treeItemData);
        }
      };

      return (
        <StyledTreeItem
          key={treeItemData.deviceAddress}
          nodeId={treeItemData.deviceAddress.toString()}
          labelText={treeItemData.deviceName}
          labelIcon={(treeItemData.type === 'hub' ? DeviceHubIcon : DevicesIcon)}
          labelInfo={<InfoIcon onClick={onInfoClick}/>}
          children={children}
        />
      );
    });
  };

  return (
    <div className={classes.treeContainer}>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ArrowDropDownIcon/>}
        defaultExpandIcon={<ArrowRightIcon/>}
        defaultEndIcon={<div style={{ width: 24 }}/>}
      >
        {getTreeItemsFromData(treeItems)}
      </TreeView>
      <CardInfo info={info}/>
    </div>
  );
}

export const Tree = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/tree`)
      .then((res) => res.json())
      .then((fetchedDevices) => setDevices(fetchedDevices));
  }, []);

  return (
    <TreeItems treeItems={devices}/>
  );
}
