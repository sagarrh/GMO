import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Collapse,
  IconButton
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

// Define the menu items
type MenuItem = {
  department: string;
  sub_departments?: Array<string>;
};

type MenuConfig = Array<MenuItem>;

interface ItemProps {
  item: MenuItem;
  handleSelectItem: (title: string, isSelected: boolean) => void;
  selectedItems: Set<string>;
}

const Item: React.FC<ItemProps> = ({ item, handleSelectItem, selectedItems }) => {
  const [showItem, setShowItem] = useState(false); // State to show or hide items

  const handleToggle = (): void => {
    setShowItem((prev) => !prev); // Toggle the display of sub-items
  };

  const isParentSelected = selectedItems.has(item.department);

  const handleParentCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = event.target.checked;
    console.log("Parent checkbox changed:", item.department, isSelected);
    handleSelectItem(item.department, isSelected);
    if (item.sub_departments) {
      item.sub_departments.forEach((subItem) => {
        console.log("Sub-item selection change due to parent:", subItem, isSelected);
        handleSelectItem(subItem, isSelected);
      });
    }
  };

  const handleSubItemCheckboxChange = (subItem: string, isSelected: boolean) => {
    console.log("Sub-item checkbox changed:", subItem, isSelected);
    handleSelectItem(subItem, isSelected);
    if (item.sub_departments) {
      const allSubItemsSelected = item.sub_departments.every((sd) =>
        sd === subItem ? isSelected : selectedItems.has(sd)
      );
      console.log("All sub-items selected:", allSubItemsSelected);
      handleSelectItem(item.department, allSubItemsSelected);
    }
  };

  return (
    <>
      <ListItem>
        <FormControlLabel
          control={<Checkbox checked={isParentSelected} onChange={handleParentCheckboxChange} />}
          label={item.department}
        />
        {item.sub_departments && (
          <IconButton onClick={handleToggle}>
            {showItem ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </ListItem>
      <Collapse in={showItem} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.sub_departments &&
            item.sub_departments.map((subItem, i) => (
              <ListItem key={i} sx={{ pl: 4 }}>
                <FormControlLabel
                  control={<Checkbox checked={selectedItems.has(subItem)} onChange={(e) => handleSubItemCheckboxChange(subItem, e.target.checked)} />}
                  label={subItem}
                />
              </ListItem>
            ))}
        </List>
      </Collapse>
    </>
  );
};

const ToggleList: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleSelectItem = (title: string, isSelected: boolean) => {
    console.log("Item selection changed:", title, isSelected);
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (isSelected) {
        newSelectedItems.add(title);
      } else {
        newSelectedItems.delete(title);
      }
      console.log("Updated selected items:", Array.from(newSelectedItems));
      return newSelectedItems;
    });
  };

  const menuConfig: MenuConfig = [
    {
      department: "customer_service",
      sub_departments: ["support", "customer_success"]
    },
    {
      department: "design",
      sub_departments: ["graphic_design", "product_design", "web_design"]
    }
  ];

  return (
    <>
      <h2>Departments</h2>
      <List>
        {menuConfig.map((item, i) => (
          <Item key={i} item={item} handleSelectItem={handleSelectItem} selectedItems={selectedItems} />
        ))}
      </List>
    </>
  );
};

export default ToggleList;
