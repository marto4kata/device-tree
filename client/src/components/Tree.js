import React from "react";
import { StyledTreeItem } from "./TreeItem";
import InfoIcon from "@material-ui/icons/Info";
import TreeView from "@material-ui/lab/TreeView";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

export const Tree = ({ treeItems, onInfoClick, getLabelIcon, labelProperty, keyProperty }) => {
  const getTreeItemsFromData = (treeItems) => {
    return treeItems.map(treeItemData => {
      let children = null;

      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }

      return (
        <StyledTreeItem
          key={treeItemData[keyProperty]}
          nodeId={treeItemData[keyProperty].toString()}
          labelText={treeItemData[labelProperty]}
          labelIcon={getLabelIcon(treeItemData)}
          labelInfo={<InfoIcon onClick={(e) => onInfoClick(e, treeItemData)}/>}
          children={children}
        />
      );
    });
  };

  return (
    <TreeView
      defaultCollapseIcon={<ArrowDropDownIcon/>}
      defaultExpandIcon={<ArrowRightIcon/>}
      defaultEndIcon={<div style={{ width: 24 }}/>}
    >
      {getTreeItemsFromData(treeItems)}
    </TreeView>
  );
}
